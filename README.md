# Sorteig DHF

La pàgina de venda de números i el panell d'organització, per posar a Vercel.

La diferència amb la versió de Claude: aquí, **quan algú prem "Ja he pagat", la comanda
us arriba sola al panell**. El navegador de qui compra parla amb el vostre servidor, i
és el servidor qui escriu a la base de dades. Per això funciona per a tothom, tingui o
no cap compte enlloc.

- `index.html` — la pàgina pública (la comanda, el pagament, la confirmació)
- `admin.html` — el panell d'organització, protegit amb contrasenya
- `team.html` — la pàgina de l'equip (/team): només dona altes de venda en mà
- `api/comanda.js` — el que crida la pàgina pública
- `api/admin.js` — el que crida el panell
- `api/export.js` — només llegeix: d'aquí surt la còpia al full de càlcul
- `lib/db.js` — la base de dades, els preus, els trams de números i les formes de pagament
- `premis.jpg` — el cartell dels premis, el que surt al pop-up

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

### 4. Posa les contrasenyes

1. Pestanya **Settings → Environment Variables**.
2. Nom: `CLAU_PANELL`. Valor: la contrasenya que vulguis (llarga, que no sigui
   "tombola"). Marca els tres entorns. **Save**. És la de `/admin`, només per a
   l'organització.
3. **Afegeix-ne una altra** (no toquis la primera): `CLAU_EQUIP`, la de `/team`,
   la que té tot l'equip. Marca també els tres entorns.

### 5. Torna a desplegar i prova-ho

1. Pestanya **Deployments** → al desplegament de dalt, menú **···** → **Redeploy**.
   Cal fer-ho perquè les variables noves s'apliquin.
2. Obre `https://el-teu-projecte.vercel.app` i fes una comanda de prova.
3. Obre `https://el-teu-projecte.vercel.app/admin`, posa la contrasenya i mira que la
   comanda hi sigui.
4. Confirma-la i comprova que li assigna dos números del tram d'internet (són a
   l'atzar, així que no seran els mateixos cada vegada).
5. Esborra la comanda de prova amb "Allibera els números".

Les taules de la base de dades es creen soles la primera vegada que algú entra a la
pàgina. No has d'executar cap SQL.

---

## La còpia al full de càlcul

`/api/export` torna totes les comandes en JSON i **no pot canviar res**. D'aquí baixa
la còpia horària al Google Sheet.

Va protegit amb una clau pròpia, `CLAU_EXPORT`: **afegeix-la com a variable nova**
(Settings → Environment Variables, els tres entorns), sense tocar `CLAU_PANELL`. Han
de quedar-hi les dues. És a part de la del panell a propòsit: si algun dia s'ha de
canviar, es canvia sense tocar la contrasenya amb què entreu vosaltres.

La contrasenya del panell **no** serveix per a `/api/export`, i és volgut: si es fes
servir de recanvi, una variable mal posada funcionaria igualment i no us n'adonaríeu.

La clau va sempre a la capçalera `x-clau`, mai a l'adreça, perquè no quedi escrita
als registres de Vercel:

```
curl -s https://tombola-dhf.vercel.app/api/export -H "x-clau: LA-CLAU"
```

Qui tingui aquesta clau pot **llegir** els noms, els correus i els números de
tothom. No pot esborrar res ni assignar números.

---

## Les adreces

| Adreça | Qui hi entra | Què hi pot fer |
|---|---|---|
| `/` | Tothom. És la que reparteixes. | Comprar números. |
| `/admin` | L'organització, amb `CLAU_PANELL`. | Tot: confirmar, assignar, esborrar, correus. |
| `/team` | L'equip, amb `CLAU_EQUIP`. | Només donar d'alta vendes en mà. |

La pàgina `/team` està pensada per al dia a dia: es fa servir des de molts mòbils
alhora i la contrasenya la té molta gent, així que **des d'allà no es pot veure ni
tocar cap comanda**. El servidor no només amaga els botons: rebutja qualsevol acció
que no sigui una alta, i a les altes de l'equip els imposa la venda en mà i un màxim
de 20 números. Si dues persones donen d'alta alhora, cap número no es repeteix: ho
impedeix la clau primària de la taula, igual que a la venda per internet.

El panell porta `noindex`, així que no sortirà a Google. Tot i això, **la seva
protecció és la contrasenya**: si la compartiu per un grup de WhatsApp gran, doneu per
fet que algú altre la tindrà.

---

## Canviar coses

Tot el que es toca sovint és a **`lib/db.js`**, a dalt de tot:

- `PREU` — el preu per número (ara 3).
- `RANGS` — els trams: internet 1–400, en mà 401–800. Si els canvies, el panell
  agafa sol les etiquetes noves; no s'han de tocar enlloc més.
- `METODES` — les formes de pagament, a nom de qui van i on es paga (`detall`, que és
  el que surt escrit als recordatoris que envia el panell).
- `MAX_PER_COMANDA` — el màxim de números per comanda (ara 20).

Si canvies els noms o els telèfons, canvia'ls **també** al bloc `CONFIG` de dalt de tot
del `<script>` de `index.html`, que és el que veu qui compra.

Per publicar un canvi: edita el fitxer a GitHub i prem Commit. Vercel ho desplega sol
en un minut.

---

## Com està fet, pel que pugui passar

- **Els números es reparteixen a l'atzar dins del tram**, no per ordre de compra: qui
  compra primer no es queda els números baixos. Els tria la base de dades
  (`ORDER BY random()`) d'entre els que queden lliures, i al correu i al panell
  surten ordenats de petit a gran.
- **Un número no es pot donar dues vegades.** No ho vigila el codi: la taula `numeros`
  té el número com a clau primària, i la base de dades rebutja qualsevol repetició. Si
  dues persones confirmen alhora, una de les dues operacions falla i es reintenta amb
  els números següents.
- **El concepte de pagament el genera el servidor**, mai el navegador, perquè no hi pugui
  haver dues comandes amb el mateix concepte. Des del canvi de nom són `SORTEIG-XXXXXX`;
  l'API segueix acceptant els `TOMBOLA-XXXXXX` d'abans, per si algú tenia una comanda a
  mig fer al navegador.
- **Esborrar una comanda allibera els seus números** (`ON DELETE CASCADE`), i tornen a
  estar disponibles per al següent.
- **Les comandes que algú comença i no acaba** queden com a `iniciada` i no surten al
  panell. L'acció `neteja` de l'API les esborra quan tenen més d'un dia.
- **Fre contra l'spam**: un mateix correu no pot obrir més de 30 comandes al dia.

---

## Els correus

El panell no envia res sol: obre el Gmail amb el correu ja escrit i l'envies tu. Totes
dues finestres s'obren amb `authuser=juniordhfemeni@gmail.com`, o sigui que surten del
compte del club si hi tens la sessió oberta; si no, el Gmail te la demanarà.

- **Enviar correu**, a les comandes ja confirmades: els números i la llista de premis.
- **Recordatori de pagament**, a les comandes per comprovar: el concepte, l'import i les
  dues maneres de pagar. Per a qui ha fet la comanda i encara no li hem trobat el diner.

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
