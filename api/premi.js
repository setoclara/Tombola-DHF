import { sql, assegurarEsquema, TOTS, vendaOberta } from "../lib/db.js";
import { PREMIS } from "../lib/premis.js";

// Públic i de només lectura: algú escriu el seu número i se li diu si li ha
// tocat res. No demana cap dada, i el resultat del sorteig és públic de totes
// maneres, així que no hi ha res a protegir aquí.
export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  let num;
  if (req.method === "GET") {
    num = Number.parseInt(req.query && req.query.num, 10);
  } else {
    let cos;
    try {
      cos = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    } catch (e) {
      res.status(400).json({ error: "json_invalid" });
      return;
    }
    num = Number.parseInt(cos.num, 10);
  }

  // El sostre és el de la taula de números, no el dels 600: passats els 600
  // la venda continua i aquells números també poden tocar.
  if (!Number.isFinite(num) || num < TOTS[0] || num > 1500) {
    res.status(400).json({ error: "numero_invalid", min: TOTS[0] });
    return;
  }

  try {
    await assegurarEsquema();

    const premi = Object.prototype.hasOwnProperty.call(PREMIS, num) ? PREMIS[num] : null;
    const [venut] = await sql`SELECT 1 AS hi_es FROM numeros WHERE num = ${num}::int`;

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({
      ok: true,
      num: num,
      premi: premi,
      venut: Boolean(venut),
      // Si encara no s'ha entrat cap premi, el sorteig no s'ha fet: val més
      // dir-ho que deixar que algú entengui que no li ha tocat res.
      hiHaPremis: Object.keys(PREMIS).length > 0,
      vendaOberta: await vendaOberta()
    });
  } catch (e) {
    console.error("premi:", e);
    res.status(500).json({ error: "error_servidor" });
  }
}
