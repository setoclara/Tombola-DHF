import { neon } from "@neondatabase/serverless";

// Vercel injecta la connexió quan hi enganxes la base de dades Neon.
// Segons com es crei, la variable es diu DATABASE_URL o POSTGRES_URL.
const URL_BD = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!URL_BD) {
  console.error("Falta DATABASE_URL (o POSTGRES_URL). Enganxa la base de dades al projecte a Vercel > Storage.");
}

export const sql = neon(URL_BD);

export const PREU = 5;

export const RANGS = {
  online: [1, 700],
  presencial: [701, 1500]
};

export const METODES = {
  revolut: { via: "Revolut", nom: "Maria Gessti", curt: "Revolut (Maria)" },
  bizum_maria: { via: "Bizum", nom: "Maria Gessti", curt: "Bizum (Maria)" },
  bizum_gabi: { via: "Bizum", nom: "Gabriela Pérez", curt: "Bizum (Gabi)" }
};

export const MAX_PER_COMANDA = 20;

let esquemaFet = false;

// Es crea sol el primer cop que arriba una petició. No has d'executar cap SQL a mà.
export async function assegurarEsquema() {
  if (esquemaFet) return;
  await sql`
    CREATE TABLE IF NOT EXISTS comandes (
      id          BIGSERIAL PRIMARY KEY,
      ref         TEXT NOT NULL UNIQUE,
      email       TEXT NOT NULL,
      quantitat   INTEGER NOT NULL CHECK (quantitat > 0),
      canal       TEXT NOT NULL DEFAULT 'online',
      metode      TEXT NOT NULL DEFAULT '',
      estat       TEXT NOT NULL DEFAULT 'iniciada',
      correu_estat TEXT NOT NULL DEFAULT '',
      creat_el    TIMESTAMPTZ NOT NULL DEFAULT now(),
      pagat_el    TIMESTAMPTZ
    )`;
  // Un número no es pot donar dues vegades: ho garanteix la clau primària,
  // no el codi. Si dues confirmacions coincideixen, una falla i es reintenta.
  await sql`
    CREATE TABLE IF NOT EXISTS numeros (
      num        INTEGER PRIMARY KEY CHECK (num BETWEEN 1 AND 1500),
      comanda_id BIGINT NOT NULL REFERENCES comandes(id) ON DELETE CASCADE,
      assignat_el TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
  await sql`CREATE INDEX IF NOT EXISTS numeros_comanda ON numeros (comanda_id)`;
  await sql`CREATE INDEX IF NOT EXISTS comandes_estat ON comandes (estat, creat_el)`;
  esquemaFet = true;
}

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export function emailValid(x) {
  return typeof x === "string" && x.length <= 254 && RE_EMAIL.test(x.trim());
}

// La referència la genera el servidor, mai el navegador: així no hi pot
// haver dues comandes diferents amb el mateix concepte de pagament.
export function novaRef() {
  const lletres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sense I, O, 0, 1
  let s = "";
  for (let i = 0; i < 6; i++) s += lletres[Math.floor(Math.random() * lletres.length)];
  return "TOMBOLA-" + s;
}

export function jsonComanda(fila, numeros) {
  return {
    id: String(fila.id),
    ref: fila.ref,
    email: fila.email,
    quantitat: fila.quantitat,
    import: fila.quantitat * PREU,
    canal: fila.canal,
    metode: fila.metode,
    metodeCurt: METODES[fila.metode] ? METODES[fila.metode].curt : "",
    estat: fila.estat,
    correuEstat: fila.correu_estat,
    creatEl: fila.creat_el,
    pagatEl: fila.pagat_el,
    numeros: numeros || []
  };
}
