import { neon } from "@neondatabase/serverless";

// Vercel injecta la connexió quan hi enganxes la base de dades Neon.
// Segons com es crei, la variable es diu DATABASE_URL o POSTGRES_URL.
const URL_BD = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!URL_BD) {
  console.error("Falta DATABASE_URL (o POSTGRES_URL). Enganxa la base de dades al projecte a Vercel > Storage.");
}

export const sql = neon(URL_BD);

export const PREU = 3;

export const RANGS = {
  online: [1, 300],
  presencial: [301, 600]
};

// "detall" és on es paga: el panell el fa servir per escriure els recordatoris.
// Si el canvies, canvia'l també al bloc CONFIG d'index.html.
export const METODES = {
  revolut: { via: "Revolut", nom: "Maria Gessti", curt: "Revolut (Maria)", detall: "https://revolut.me/mariagessti" },
  bizum_berta: { via: "Bizum", nom: "Berta Serrahima", curt: "Bizum (Berta)", detall: "+34 628 50 40 46" }
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
      nom         TEXT NOT NULL DEFAULT '',
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
  // El límit de 1500 és el de la taula tal com es va crear: canviar-lo aquí no
  // el canvia a una base de dades que ja existeix. Mentre els trams de RANGS
  // hi càpiguen, no cal tocar res; per passar-hi de llarg caldria un ALTER.
  await sql`
    CREATE TABLE IF NOT EXISTS numeros (
      num        INTEGER PRIMARY KEY CHECK (num BETWEEN 1 AND 1500),
      comanda_id BIGINT NOT NULL REFERENCES comandes(id) ON DELETE CASCADE,
      assignat_el TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
  // La columna del nom va arribar més tard que la taula: a les bases de dades
  // que ja existien s'hi afegeix aquí.
  await sql`ALTER TABLE comandes ADD COLUMN IF NOT EXISTS nom TEXT NOT NULL DEFAULT ''`;
  await sql`CREATE INDEX IF NOT EXISTS numeros_comanda ON numeros (comanda_id)`;
  await sql`CREATE INDEX IF NOT EXISTS comandes_estat ON comandes (estat, creat_el)`;
  esquemaFet = true;
}

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export function emailValid(x) {
  return typeof x === "string" && x.length <= 254 && RE_EMAIL.test(x.trim());
}

// El nom i cognom serveix per reconèixer el pagament quan algú s'oblida de
// posar-hi el concepte. Demanem dues paraules, res més.
export function nomValid(x) {
  if (typeof x !== "string") return false;
  const net = x.trim();
  return net.length >= 4 && net.length <= 80 && /\s/.test(net);
}

// La referència la genera el servidor, mai el navegador: així no hi pot
// haver dues comandes diferents amb el mateix concepte de pagament.
export function novaRef() {
  const lletres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sense I, O, 0, 1
  let s = "";
  for (let i = 0; i < 6; i++) s += lletres[Math.floor(Math.random() * lletres.length)];
  return "SORTEIG-" + s;
}

export function jsonComanda(fila, numeros) {
  return {
    id: String(fila.id),
    ref: fila.ref,
    email: fila.email,
    nom: fila.nom || "",
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
