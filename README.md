# Tómbola DHF

La pàgina de venda de números i el panell d'organització, per posar a Vercel.

La diferència amb la versió de Claude: aquí, **quan algú prem "Ja he pagat", la comanda
us arriba sola al panell**. El navegador de qui compra parla amb el vostre servidor, i
és el servidor qui escriu a la base de dades. Per això funciona per a tothom, tingui o
no cap compte enlloc.

- `index.html` — la pàgina pública (la comanda, el pagament, la confirmació)
- `admin.html` — el panell d'organització, protegit amb contrasenya
- `api/comanda.js` — el que crida la pàgina pública
- `api/admin.js` — el que crida el panell
- `lib/db.js` — la base de dades, els preus, els trams de números i les formes de pagament

---

## Posar-ho en marxa

### 1. Puja el codi a GitHub

1. Entra a [github.com](https://github.com) i crea un compte si no en tens.
2. Botó **+** (a dalt a la dreta) → **New repository**.
3. Nom: `tombola-dhf`. Deixa'l **Private**. Crea'l.
4. A la pàgina del repositori buit, prem **uploading an existing file**.
5. Arrossega-hi **tot el contingut d'aquesta carpeta** (els fitxers i les carpetes
   `api/` i `lib/`). Si el navegador no et deixa arrossegar carpetes, arrossega primer
   els fitxers solts i després entra a `api/` i `lib/` amb "Add file → Upload files"
   escrivint `api/` davant del nom.
6. Prem **Commit changes**.

### 2. Importa'l a Vercel

1. Entra a [vercel.com](https://vercel.com) i registra't **amb el compte de GitHub**.
2. **Add New → Project** → tria `tombola-dhf` → **Import**.
3. No toquis cap opció de build. Prem **Deploy**.
4. Quan acabi, et donarà una adreça tipus `tombola-dhf.vercel.app`. Encara no
   funcionarà: li falta la base de dades.

### 3. Enganxa-hi la base de dades

1. Dins del projecte, pestanya **Storage** → **Create Database**.
2. Tria **Neon (Postgres)**, pla **Free**. Accepta.
3. Comprova que queda **connectada a aquest projecte** (Vercel hi posa sol la variable
   `DATABASE_URL`). No has de copiar cap clau.

### 4. Posa la contrasenya del panell

1. Pestanya **Settings → Environment Variables**.
2. Nom: `CLAU_PANELL`. Valor: la contrasenya que vulguis (llarga, que no sigui
   "tombola"). Marca els tres entorns. **Save**.

### 5. Torna a desplegar i prova-ho

1. Pestanya **Deployments** → al desplegament de dalt, menú **···** → **Redeploy**.
   Cal fer-ho perquè les variables noves s'apliquin.
2. Obre `https://el-teu-projecte.vercel.app` i fes una comanda de prova.
3. Obre `https://el-teu-projecte.vercel.app/admin`, posa la contrasenya i mira que la
   comanda hi sigui.
4. Confirma-la i comprova que li assigna els números 1 i 2.
5. Esborra la comanda de prova amb "Allibera els números".

Les taules de la base de dades es creen soles la primera vegada que algú entra a la
pàgina. No has d'executar cap SQL.

---

## Les adreces

| Adreça | Qui hi entra |
|---|---|
| `/` | Tothom. És la que reparteixes. |
| `/admin` | Només vosaltres, amb la contrasenya. |

El panell porta `noindex`, així que no sortirà a Google. Tot i això, **la seva
protecció és la contrasenya**: si la compartiu per un grup de WhatsApp gran, doneu per
fet que algú altre la tindrà.

---

## Canviar coses

Tot el que es toca sovint és a **`lib/db.js`**, a dalt de tot:

- `PREU` — el preu per número (ara 5).
- `RANGS` — els trams: internet 1–700, en mà 701–1500.
- `METODES` — les formes de pagament i a nom de qui van.
- `MAX_PER_COMANDA` — el màxim de números per comanda (ara 20).

Si canvies els noms o els telèfons, canvia'ls **també** al bloc `CONFIG` de dalt de tot
del `<script>` de `index.html`, que és el que veu qui compra.

Per publicar un canvi: edita el fitxer a GitHub i prem Commit. Vercel ho desplega sol
en un minut.

---

## Com està fet, pel que pugui passar

- **Un número no es pot donar dues vegades.** No ho vigila el codi: la taula `numeros`
  té el número com a clau primària, i la base de dades rebutja qualsevol repetició. Si
  dues persones confirmen alhora, una de les dues operacions falla i es reintenta amb
  els números següents.
- **El concepte de pagament el genera el servidor**, mai el navegador, perquè no hi pugui
  haver dues comandes amb el mateix concepte.
- **Esborrar una comanda allibera els seus números** (`ON DELETE CASCADE`), i tornen a
  estar disponibles per al següent.
- **Les comandes que algú comença i no acaba** queden com a `iniciada` i no surten al
  panell. L'acció `neteja` de l'API les esborra quan tenen més d'un dia.
- **Fre contra l'spam**: un mateix correu no pot obrir més de 30 comandes al dia.

---

## El que encara no hi ha: el correu automàtic

Ara el panell et dona el correu escrit i tu l'envies. Per enviar-lo sol, cal afegir-hi
un servei de correu. La via més senzilla amb un Gmail:

1. Activa la verificació en dos passos al compte de Google.
2. Crea una **contrasenya d'aplicació** (Compte de Google → Seguretat → Contrasenyes
   d'aplicacions).
3. Afegeix-la a Vercel com a `GMAIL_USUARI` i `GMAIL_CLAU`.
4. Demana-m'ho i t'escric la funció que envia els correus de la cua.

Amb això, marcar una comanda com a pagada enviaria el correu amb els números sense que
hi toquessis res.
