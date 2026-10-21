import { timingSafeEqual } from "node:crypto";
import {
  sql, assegurarEsquema, emailValid, novaRef,
  RANGS, METODES, PREU, jsonComanda
} from "../lib/db.js";

// Tot el que fa l'organització passa per aquí i demana la contrasenya
// del panell (variable CLAU_PANELL a Vercel).
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  if (!clauCorrecta(req.headers["x-clau"])) {
    // "configurada" diu si la variable CLAU_PANELL existeix en aquest
    // desplegament. No revela la contrasenya, i permet distingir
    // "l'has escrita malament" de "la variable no hi arriba".
    res.status(401).json({
      error: "clau_incorrecta",
      configurada: Boolean((process.env.CLAU_PANELL || "").trim())
    });
    return;
  }

  let cos;
  try {
    cos = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  } catch (e) {
    res.status(400).json({ error: "json_invalid" });
    return;
  }

  try {
    await assegurarEsquema();
    switch (cos.accio) {
      case "llista": return await llista(res);
      case "confirma": return await confirma(cos, res);
      case "elimina": return await elimina(cos, res);
      case "correu": return await marcaCorreu(cos, res);
      case "alta": return await alta(cos, res);
      case "neteja": return await neteja(res);
      default:
        res.status(400).json({ error: "accio_desconeguda" });
    }
  } catch (e) {
    console.error("admin:", e);
    res.status(500).json({ error: "error_servidor", detall: String(e && e.message || e) });
  }
}

function clauCorrecta(rebuda) {
  // Es neteja als dos costats: enganxant la contrasenya a Vercel és fàcil
  // que s'hi coli un espai o un salt de línia al final.
  const bona = (process.env.CLAU_PANELL || "").trim();
  const dita = typeof rebuda === "string" ? rebuda.trim() : "";
  if (!bona || !dita) return false;
  const a = Buffer.from(dita);
  const b = Buffer.from(bona);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

async function llista(res) {
  const files = await sql`
    SELECT c.id, c.ref, c.email, c.quantitat, c.canal, c.metode, c.estat,
           c.correu_estat, c.creat_el, c.pagat_el,
           COALESCE(array_agg(n.num ORDER BY n.num) FILTER (WHERE n.num IS NOT NULL), '{}') AS numeros
    FROM comandes c
    LEFT JOIN numeros n ON n.comanda_id = c.id
    GROUP BY c.id
    ORDER BY c.creat_el DESC`;

  const [comptes] = await sql`
    SELECT
      (SELECT count(*)::int FROM numeros WHERE num BETWEEN ${RANGS.online[0]} AND ${RANGS.online[1]}) AS online,
      (SELECT count(*)::int FROM numeros WHERE num BETWEEN ${RANGS.presencial[0]} AND ${RANGS.presencial[1]}) AS presencial`;

  res.status(200).json({
    ok: true,
    preu: PREU,
    rangs: RANGS,
    metodes: METODES,
    numerosAssignats: comptes,
    comandes: files.map(function (f) { return jsonComanda(f, f.numeros); })
  });
}

// Assigna els números lliures més baixos del tram i deixa la comanda pagada.
// Si dues confirmacions coincideixen en el mateix número, la clau primària
// de la taula "numeros" en fa fallar una i es reintenta amb els següents.
async function confirma(cos, res) {
  const id = String(cos.id || "");
  if (!/^\d+$/.test(id)) {
    res.status(400).json({ error: "id_invalida" });
    return;
  }

  const [comanda] = await sql`SELECT id, estat, quantitat, canal FROM comandes WHERE id = ${id}`;
  if (!comanda) {
    res.status(404).json({ error: "comanda_no_trobada" });
    return;
  }
  if (comanda.estat === "pagat") {
    res.status(200).json({ ok: true, jaEstava: true });
    return;
  }

  const rang = RANGS[comanda.canal] || RANGS.online;

  for (let intent = 0; intent < 5; intent++) {
    const lliures = await sql`
      SELECT g AS num
      FROM generate_series(${rang[0]}, ${rang[1]}) g
      WHERE NOT EXISTS (SELECT 1 FROM numeros n WHERE n.num = g)
      ORDER BY g
      LIMIT ${comanda.quantitat}`;

    if (lliures.length < comanda.quantitat) {
      res.status(409).json({ error: "no_queden_numeros", lliures: lliures.length });
      return;
    }

    const nums = lliures.map(function (f) { return f.num; });
    try {
      await sql.transaction([
        sql`INSERT INTO numeros (num, comanda_id)
            SELECT u, ${id} FROM unnest(${nums}::int[]) AS u`,
        sql`UPDATE comandes
            SET estat = 'pagat', pagat_el = now(), correu_estat = 'per_enviar'
            WHERE id = ${id}`
      ]);
      res.status(200).json({ ok: true, numeros: nums });
      return;
    } catch (e) {
      if (e && e.code === "23505") continue; // algú ha agafat un número: reintentem
      throw e;
    }
  }
  res.status(409).json({ error: "massa_intents" });
}

async function elimina(cos, res) {
  const id = String(cos.id || "");
  if (!/^\d+$/.test(id)) {
    res.status(400).json({ error: "id_invalida" });
    return;
  }
  // Els números tornen a quedar lliures (ON DELETE CASCADE).
  const files = await sql`DELETE FROM comandes WHERE id = ${id} RETURNING ref`;
  if (!files.length) {
    res.status(404).json({ error: "comanda_no_trobada" });
    return;
  }
  res.status(200).json({ ok: true, ref: files[0].ref });
}

async function marcaCorreu(cos, res) {
  const id = String(cos.id || "");
  const estat = cos.estat === "enviat" ? "enviat" : "per_enviar";
  if (!/^\d+$/.test(id)) {
    res.status(400).json({ error: "id_invalida" });
    return;
  }
  const files = await sql`
    UPDATE comandes SET correu_estat = ${estat} WHERE id = ${id} RETURNING ref`;
  if (!files.length) {
    res.status(404).json({ error: "comanda_no_trobada" });
    return;
  }
  res.status(200).json({ ok: true });
}

// Alta manual: venda en mà, o una comanda que us arriba per un altre canal.
async function alta(cos, res) {
  const email = String(cos.email || "").trim().toLowerCase();
  const quantitat = Number.parseInt(cos.quantitat, 10);
  const canal = RANGS[cos.canal] ? cos.canal : "presencial";
  const metode = METODES[cos.metode] ? cos.metode : "";

  if (!emailValid(email)) {
    res.status(400).json({ error: "correu_invalid" });
    return;
  }
  if (!Number.isFinite(quantitat) || quantitat < 1 || quantitat > 100) {
    res.status(400).json({ error: "quantitat_invalida" });
    return;
  }

  let creada = null;
  for (let intent = 0; intent < 5 && !creada; intent++) {
    try {
      const files = await sql`
        INSERT INTO comandes (ref, email, quantitat, canal, metode, estat)
        VALUES (${novaRef()}, ${email}, ${quantitat}, ${canal}, ${metode}, 'pendent')
        RETURNING id, ref`;
      creada = files[0];
    } catch (e) {
      if (e && e.code === "23505") continue;
      throw e;
    }
  }
  if (!creada) {
    res.status(500).json({ error: "no_s_ha_pogut_crear" });
    return;
  }

  if (cos.pagat) {
    return await confirma({ id: String(creada.id) }, res);
  }
  res.status(200).json({ ok: true, ref: creada.ref, id: String(creada.id) });
}

// Treu les comandes que algú va començar i no va acabar mai (més d'un dia).
async function neteja(res) {
  const files = await sql`
    DELETE FROM comandes
    WHERE estat = 'iniciada' AND creat_el < now() - interval '24 hours'
    RETURNING id`;
  res.status(200).json({ ok: true, esborrades: files.length });
}
