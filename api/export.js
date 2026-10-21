import { timingSafeEqual } from "node:crypto";
import { sql, assegurarEsquema, RANGS, PREU, jsonComanda } from "../lib/db.js";

// Només llegeix. És el que fa servir la còpia horària al full de càlcul:
// demana la llista de comandes i no pot tocar res.
//
// Clau: la variable CLAU_EXPORT (o, si no hi és, la del panell). Va a la
// capçalera "x-clau", mai a l'adreça, perquè no quedi escrita als registres.
export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  if (!clauCorrecta(req.headers["x-clau"])) {
    // "configurada" parla només de CLAU_EXPORT, perquè la còpia horària
    // pugui distingir "la clau no hi és" de "la clau no és aquesta".
    res.status(401).json({
      error: "clau_incorrecta",
      configurada: Boolean((process.env.CLAU_EXPORT || "").trim())
    });
    return;
  }

  try {
    await assegurarEsquema();
    // Les comandes "iniciada" són carros abandonats: algú va prémer
    // "Continua al pagament" i no va tornar mai. No van al full.
    const files = await sql`
      SELECT c.id, c.ref, c.email, c.nom, c.quantitat, c.canal, c.metode, c.estat,
             c.correu_estat, c.creat_el, c.pagat_el,
             COALESCE(array_agg(n.num ORDER BY n.num) FILTER (WHERE n.num IS NOT NULL), '{}') AS numeros
      FROM comandes c
      LEFT JOIN numeros n ON n.comanda_id = c.id
      WHERE c.estat <> 'iniciada'
      GROUP BY c.id
      ORDER BY c.creat_el ASC`;

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({
      ok: true,
      generat: new Date().toISOString(),
      preu: PREU,
      rangs: RANGS,
      comandes: files.map(function (f) { return jsonComanda(f, f.numeros); })
    });
  } catch (e) {
    console.error("export:", e);
    res.status(500).json({ error: "error_servidor", detall: String(e && e.message || e) });
  }
}

function clauBona() {
  return (process.env.CLAU_EXPORT || process.env.CLAU_PANELL || "").trim();
}

function clauCorrecta(rebuda) {
  const bona = clauBona();
  const dita = typeof rebuda === "string" ? rebuda.trim() : "";
  if (!bona || !dita) return false;
  const a = Buffer.from(dita);
  const b = Buffer.from(bona);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
