import {
  sql, assegurarEsquema, emailValid, novaRef,
  METODES, MAX_PER_COMANDA, PREU
} from "../lib/db.js";

// Punt d'entrada públic: el navegador de qui compra hi escriu directament.
// Aquí sí que es pot, perquè qui escriu a la base de dades és el servidor
// amb les seves pròpies claus, no el visitant.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
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
    if (cos.accio === "inicia") return await inicia(cos, res);
    if (cos.accio === "he-pagat") return await hePagat(cos, res);
    res.status(400).json({ error: "accio_desconeguda" });
  } catch (e) {
    console.error("comanda:", e);
    res.status(500).json({ error: "error_servidor" });
  }
}

// Es crida quan algú prem "Continua al pagament". Desa la comanda com a
// "iniciada" i li torna el concepte de pagament, que genera el servidor.
async function inicia(cos, res) {
  const email = String(cos.email || "").trim().toLowerCase();
  const quantitat = Number.parseInt(cos.quantitat, 10);
  const metode = METODES[cos.metode] ? cos.metode : "revolut";

  if (!emailValid(email)) {
    res.status(400).json({ error: "correu_invalid" });
    return;
  }
  if (!Number.isFinite(quantitat) || quantitat < 1 || quantitat > MAX_PER_COMANDA) {
    res.status(400).json({ error: "quantitat_invalida", max: MAX_PER_COMANDA });
    return;
  }

  // Fre senzill contra l'spam: ningú no pot obrir més de 30 comandes al dia
  // amb el mateix correu.
  const [{ count }] = await sql`
    SELECT count(*)::int AS count FROM comandes
    WHERE email = ${email} AND creat_el > now() - interval '24 hours'`;
  if (count >= 30) {
    res.status(429).json({ error: "massa_comandes" });
    return;
  }

  for (let intent = 0; intent < 5; intent++) {
    const ref = novaRef();
    try {
      const files = await sql`
        INSERT INTO comandes (ref, email, quantitat, canal, metode, estat)
        VALUES (${ref}, ${email}, ${quantitat}, 'online', ${metode}, 'iniciada')
        RETURNING ref`;
      res.status(200).json({ ok: true, ref: files[0].ref, import: quantitat * PREU });
      return;
    } catch (e) {
      if (e && e.code === "23505") continue; // concepte repetit: en provem un altre
      throw e;
    }
  }
  res.status(500).json({ error: "no_s_ha_pogut_generar_concepte" });
}

// Es crida quan premen "Ja he pagat". Passa la comanda a "per comprovar",
// que és el que us surt al panell. Es pot cridar dues vegades sense problema.
async function hePagat(cos, res) {
  const ref = String(cos.ref || "").trim().toUpperCase();
  const metode = METODES[cos.metode] ? cos.metode : null;

  if (!/^TOMBOLA-[A-Z0-9]{4,12}$/.test(ref)) {
    res.status(400).json({ error: "ref_invalida" });
    return;
  }

  const files = metode
    ? await sql`
        UPDATE comandes
        SET estat = CASE WHEN estat = 'iniciada' THEN 'pendent' ELSE estat END,
            metode = ${metode}
        WHERE ref = ${ref}
        RETURNING ref, estat`
    : await sql`
        UPDATE comandes
        SET estat = CASE WHEN estat = 'iniciada' THEN 'pendent' ELSE estat END
        WHERE ref = ${ref}
        RETURNING ref, estat`;

  if (!files.length) {
    res.status(404).json({ error: "comanda_no_trobada" });
    return;
  }
  res.status(200).json({ ok: true, ref: files[0].ref, estat: files[0].estat });
}
