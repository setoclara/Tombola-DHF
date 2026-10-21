[Tómbola DHF.html](https://github.com/user-attachments/files/33763862/Tombola.DHF.html)
# Tombola-DHF
<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}html{scroll-padding-top:env(safe-area-inset-top,0px)}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#fff;color:#000}img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}</style></head><body>
<title>Tómbola DHF</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@500;600;700&family=Bodoni+Moda:ital,opsz,wght@1,6..96,700..900&family=Caveat:wght@500;600&display=swap">
<style>
  /* Layout: nit del camp d'hoquei — hèroi de nit, el bitllet blau com a
     formulari, el repartiment de números i el panell d'organització al peu. Tema únic fosc. */
  :root {
    --nit: #0B131F;
    --nit-2: #111C2A;
    --vora: #22324A;
    --gel: #A9C2EA;
    --gel-pal: #DCE7F8;
    --gel-fosc: #6E8CC4;
    --rei: #2B3EA0;
    --blanc: #F3F6FB;
    --boira: #93A5BE;
    --cobrat: #4FC08D;
    --pendent: #E3A742;
    --roig: #FF8A80;

    --titol: "Bodoni Moda", "Didot", "Playfair Display", Georgia, serif;
    --condensada: "Barlow Condensed", "Arial Narrow", Helvetica, sans-serif;
    --cos: "Barlow", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    --ma: "Caveat", "Segoe Script", cursive;
    color-scheme: dark;
  }

  *, *::before, *::after { box-sizing: border-box; }
  [hidden] { display: none !important; }

  body {
    background: var(--nit);
    color: var(--blanc);
    font-family: var(--cos);
    font-size: 16px;
    line-height: 1.55;
    padding: 0;
    -webkit-text-size-adjust: 100%;
  }
  .gutter {
    padding-left: max(16px, env(safe-area-inset-left, 0px));
    padding-right: max(16px, env(safe-area-inset-right, 0px));
  }
  .centre { max-width: 720px; margin: 0 auto; }
  .ample { max-width: 1040px; margin: 0 auto; }
  .pila { display: flex; flex-direction: column; }

  h1, h2, h3 { margin: 0; font-weight: 400; text-wrap: balance; }
  p { margin: 0; }
  a { color: var(--gel); }

  .sobretitol {
    font-family: var(--condensada); font-weight: 600; font-size: 0.9rem;
    letter-spacing: 0.22em; text-transform: uppercase; color: var(--gel);
  }
  .plom { color: var(--boira); max-width: 56ch; }
  .ma { font-family: var(--ma); font-size: 1.35rem; line-height: 1.25; color: var(--gel); }
  .fletxa { width: 56px; height: 36px; color: var(--gel); flex: none; }

  /* ---------- hèroi ---------- */
  .heroi { position: relative; overflow: hidden; padding-block: 56px 48px; }
  .heroi-fons {
    position: absolute; inset: 0;
    background:
      radial-gradient(125% 95% at 50% 0%, rgba(43,62,160,0.42) 0%, rgba(11,19,31,0) 62%),
      radial-gradient(80% 65% at 88% 18%, rgba(169,194,234,0.16) 0%, rgba(11,19,31,0) 72%),
      repeating-linear-gradient(104deg, rgba(169,194,234,0.05) 0px, rgba(169,194,234,0.05) 1px, transparent 1px, transparent 48px);
  }
  .heroi-vel {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(11,19,31,0.72) 0%, rgba(11,19,31,0.58) 45%, var(--nit) 100%);
  }
  .heroi-dins { position: relative; display: flex; flex-direction: column; gap: 22px; }

  h1 { font-family: var(--titol); font-style: italic; font-weight: 900; text-transform: uppercase; line-height: 0.84; letter-spacing: -0.015em; }
  h1 span { display: block; }
  .t-tombola { font-size: clamp(3.1rem, 15.5vw, 6.4rem); }
  .t-dhf { font-size: clamp(3.4rem, 17vw, 7rem); margin-left: 0.06em; }
  .data {
    font-family: var(--condensada); font-weight: 700; font-size: clamp(1.1rem, 4.6vw, 1.6rem);
    letter-spacing: 0.06em; text-transform: uppercase;
  }

  .preu-bitllet {
    align-self: flex-start; display: flex; align-items: stretch; gap: 0;
    background: var(--gel); color: var(--nit); border-radius: 13px; overflow: hidden;
    box-shadow: 0 14px 30px rgba(0,0,0,0.42);
  }
  .preu-xifra {
    font-family: var(--titol); font-style: italic; font-weight: 700;
    font-size: 2.3rem; line-height: 1; padding: 13px 18px 15px;
  }
  .preu-tall { border-left: 2px dashed rgba(11,19,31,0.42); }
  .preu-mot {
    font-family: var(--condensada); font-weight: 700; font-size: 0.78rem;
    letter-spacing: 0.2em; text-transform: uppercase;
    display: grid; place-items: center; padding: 0 14px;
  }

  /* ---------- el bitllet (formulari) ---------- */
  .bitllet {
    --txt: #0B131F; --suau: #4A5B74; --vora-loc: #94ACD6; --camp: #FFFFFF;
    position: relative; color: var(--txt);
    background: linear-gradient(165deg, var(--gel-pal) 0%, var(--gel) 100%);
    border-radius: 16px; box-shadow: 0 18px 44px rgba(0,0,0,0.45);
  }
  .bitllet-banda {
    display: flex; justify-content: space-between; align-items: baseline; gap: 12px;
    padding: 13px 20px; border-bottom: 1px solid rgba(11,19,31,0.14);
    font-family: var(--condensada); font-weight: 700; font-size: 0.82rem;
    letter-spacing: 0.16em; text-transform: uppercase;
  }
  .bitllet-cos { padding: 22px 20px; display: flex; flex-direction: column; gap: 20px; }

  .camp { display: flex; flex-direction: column; gap: 7px; }
  .camp label { font-weight: 600; font-size: 0.95rem; }
  .pista { font-size: 0.84rem; color: var(--suau); }
  .bitllet input, .bitllet select, .bitllet textarea {
    font-family: var(--cos); font-size: 1rem; color: var(--txt); background: var(--camp);
    border: 1px solid var(--vora-loc); border-radius: 9px; padding: 11px 13px; width: 100%; min-width: 0;
  }
  .bitllet input::placeholder { color: #8395AE; }
  input:focus-visible, select:focus-visible, textarea:focus-visible, button:focus-visible, a:focus-visible {
    outline: 2px solid var(--rei); outline-offset: 2px;
  }

  .comptador { display: flex; align-items: center; gap: 9px; flex-wrap: wrap; }
  .pas {
    width: 44px; height: 44px; flex: none; border-radius: 9px; cursor: pointer;
    border: 1px solid var(--vora-loc); background: var(--camp); color: var(--txt);
    font-size: 1.35rem; line-height: 1;
  }
  .pas:hover { border-color: var(--rei); color: var(--rei); }
  #cantidad { width: 88px; text-align: center; font-weight: 600; font-size: 1.1rem; font-variant-numeric: tabular-nums; }
  .dreceres { display: flex; gap: 6px; flex-wrap: wrap; }
  .drecera {
    font-family: var(--condensada); font-weight: 600; font-size: 0.95rem; letter-spacing: 0.04em;
    padding: 8px 13px; cursor: pointer; border: 1px solid var(--vora-loc);
    border-radius: 999px; background: transparent; color: var(--suau);
  }
  .drecera:hover { border-color: var(--rei); color: var(--rei); }
  .drecera[aria-pressed="true"] { background: var(--rei); border-color: var(--rei); color: #FFF; }


  .etiqueta-grup { font-weight: 600; font-size: 0.95rem; }
  .troquel { position: relative; height: 1px; border-top: 2px dashed rgba(11,19,31,0.3); margin: 0 -20px; }
  .troquel::before, .troquel::after {
    content: ""; position: absolute; top: -10px; width: 20px; height: 20px;
    border-radius: 50%; background: var(--nit);
  }
  .troquel::before { left: -10px; }
  .troquel::after { right: -10px; }

  .total { display: flex; align-items: flex-end; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
  .total-mot { font-family: var(--condensada); font-weight: 600; font-size: 0.85rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--suau); }
  .total-xifra { font-family: var(--titol); font-style: italic; font-weight: 900; font-size: clamp(2.3rem, 10vw, 3.1rem); line-height: 0.95; font-variant-numeric: tabular-nums; }
  .total-detall { font-size: 0.85rem; color: var(--suau); }
  .anotacio { display: flex; align-items: center; gap: 6px; }
  .anotacio .ma { color: var(--rei); font-size: 1.2rem; }
  .anotacio .fletxa { color: var(--rei); width: 44px; height: 30px; transform: scaleY(-1); }

  .boto {
    font-family: var(--condensada); font-weight: 700; font-size: 1.15rem; letter-spacing: 0.08em;
    text-transform: uppercase; cursor: pointer; background: var(--rei); color: #FFF;
    border: 1px solid var(--rei); border-radius: 10px; padding: 14px 20px; width: 100%;
    text-align: center; text-decoration: none;
  }
  a.boto { display: inline-block; }
  .boto:hover { background: #22328A; }
  .boto-contorn { background: transparent; color: #0B131F; border-color: #0B131F; }
  .boto-contorn:hover { background: rgba(11,19,31,0.08); color: #0B131F; }
  .boto-pla {
    font-family: var(--cos); font-weight: 600; font-size: 0.9rem; cursor: pointer;
    background: transparent; color: inherit; border: 1px solid currentColor;
    border-radius: 9px; padding: 10px 15px; opacity: 0.82;
  }
  .boto-pla:hover { opacity: 1; }
  .error { color: #A8201A; font-size: 0.88rem; font-weight: 600; }

  /* ---------- resguard ---------- */
  .resguard { display: flex; flex-direction: column; gap: 18px; }
  .resguard h2 { font-family: var(--titol); font-style: italic; font-weight: 700; font-size: 1.7rem; }
  .dada {
    display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap;
    padding: 12px 14px; background: rgba(255,255,255,0.58); border: 1px solid var(--vora-loc); border-radius: 10px;
  }
  .dada-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
  .dada-clau { font-family: var(--condensada); font-weight: 600; font-size: 0.78rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--suau); }
  .dada-valor { font-size: 1.1rem; font-weight: 600; font-variant-numeric: tabular-nums; word-break: break-word; }
  .dada-valor.ref { font-family: var(--condensada); letter-spacing: 0.08em; color: var(--rei); }
  .passos { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 13px; counter-reset: pas; }
  .passos li { display: grid; grid-template-columns: 28px 1fr; gap: 12px; align-items: start; }
  .passos li::before {
    counter-increment: pas; content: counter(pas);
    font-family: var(--condensada); font-weight: 700; font-size: 0.9rem;
    width: 26px; height: 26px; display: grid; place-items: center;
    border: 1.5px solid var(--rei); color: var(--rei); border-radius: 50%;
  }
  .enrere {
    align-self: flex-start; display: inline-flex; align-items: center; gap: 7px;
    background: rgba(255,255,255,0.45); border: 1px solid var(--vora-loc); border-radius: 999px;
    padding: 8px 16px 8px 12px; cursor: pointer; color: #0B131F;
    font-family: var(--cos); font-weight: 600; font-size: 0.92rem;
  }
  .enrere:hover { border-color: var(--rei); color: var(--rei); background: #FFF; }
  .enrere svg { width: 16px; height: 16px; flex: none; }

  .bitllet .mini { color: #0B131F; border-color: var(--vora-loc); align-self: flex-start; }
  .bitllet .mini:hover { border-color: var(--rei); color: var(--rei); }

  .pagaments { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
  @media (max-width: 620px) { .pagaments { grid-template-columns: 1fr; } }
  .pagament {
    display: flex; flex-direction: column; gap: 7px; padding: 12px;
    background: rgba(255,255,255,0.58); border: 1px solid var(--vora-loc); border-radius: 11px;
  }
  .pagament .boto { font-size: 0.92rem; letter-spacing: 0.04em; padding: 10px 8px; }
  .pagament .dada-valor { font-size: 0.95rem; }
  .pagament .mini { font-size: 0.76rem; padding: 4px 9px; }
  .pagament.es-triat { border: 2px solid var(--rei); background: rgba(255,255,255,0.82); }
  .pagament-dalt { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
  .triat {
    font-family: var(--condensada); font-weight: 700; font-size: 0.72rem; letter-spacing: 0.14em;
    text-transform: uppercase; color: #FFF; background: var(--rei); border-radius: 999px; padding: 2px 9px;
  }
  .pagament-qui { font-weight: 600; font-size: 0.95rem; }
  .pagament-lletra { font-size: 0.82rem; color: var(--suau); overflow-wrap: break-word; }
  .contacte { font-size: 0.98rem; white-space: nowrap; }
  .resultat-registre {
    font-size: 0.9rem; font-weight: 600; color: var(--rei);
    background: rgba(43,62,160,0.08); border: 1px solid var(--rei);
    border-radius: 9px; padding: 9px 12px;
  }
  .resum-caixa {
    font-family: var(--cos); font-size: 0.92rem; line-height: 1.6;
    background: var(--camp); resize: vertical; min-height: 150px;
  }

  .passos strong, .passos span { grid-column: 2; }
  .passos span { font-size: 0.9rem; color: var(--suau); }
  .accions { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
  .accions .boto { width: auto; }

  /* ---------- seccions fosques ---------- */
  .seccio { display: flex; flex-direction: column; gap: 18px; }
  h2.titol-seccio { font-family: var(--titol); font-style: italic; font-weight: 700; font-size: clamp(1.8rem, 7vw, 2.6rem); text-transform: uppercase; line-height: 0.95; }
  h3 { font-family: var(--condensada); font-weight: 700; font-size: 1.05rem; letter-spacing: 0.08em; text-transform: uppercase; }

  .barra-tram { display: flex; height: 58px; border-radius: 11px; overflow: hidden; }
  .tram { display: grid; place-items: center; text-align: center; padding: 0 8px; font-family: var(--condensada); font-weight: 600; font-size: 0.92rem; letter-spacing: 0.04em; text-transform: uppercase; }
  .tram-online { background: var(--gel); color: var(--nit); }
  .tram-ma { background: var(--nit-2); color: var(--boira); border: 1px solid var(--vora); border-left: none; }
  .notes { display: grid; gap: 11px; }
  .nota { font-size: 0.93rem; color: var(--boira); display: grid; grid-template-columns: 12px 1fr; gap: 11px; align-items: start; }
  .nota strong { color: var(--blanc); font-weight: 600; }
  .punt { width: 10px; height: 10px; border-radius: 3px; margin-top: 7px; }
  .punt-online { background: var(--gel); }
  .punt-ma { background: var(--nit-2); border: 1px solid var(--vora); }
  .anotacio-ma { display: flex; align-items: flex-start; gap: 10px; padding-left: 4px; }
  .anotacio-ma .fletxa { transform: rotate(8deg); }

  .legal { font-size: 0.86rem; color: var(--boira); border-top: 1px solid var(--vora); padding-top: 18px; }

  /* ---------- panell ---------- */
  .panell { border-top: 1px solid var(--vora); padding-top: 34px; display: flex; flex-direction: column; gap: 20px; }
  .marcadors { display: grid; grid-template-columns: repeat(auto-fit, minmax(145px, 1fr)); gap: 12px; }
  .marcador { background: var(--nit-2); border: 1px solid var(--vora); border-radius: 11px; padding: 14px; display: flex; flex-direction: column; gap: 4px; }
  .marcador-valor { font-family: var(--condensada); font-weight: 700; font-size: 1.6rem; line-height: 1.05; font-variant-numeric: tabular-nums; }
  .marcador-clau { font-family: var(--condensada); font-weight: 600; font-size: 0.76rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--boira); }
  .medidor { height: 5px; border-radius: 999px; background: var(--vora); overflow: hidden; margin-top: 5px; }
  .medidor i { display: block; height: 100%; background: var(--gel); }

  .caixa { background: var(--nit-2); border: 1px solid var(--vora); border-radius: 12px; padding: 18px; display: flex; flex-direction: column; gap: 14px; }
  .caixa input, .caixa select, .caixa textarea {
    font-family: var(--cos); font-size: 1rem; color: var(--blanc); background: var(--nit);
    border: 1px solid var(--vora); border-radius: 9px; padding: 11px 13px; width: 100%; min-width: 0;
  }
  .caixa textarea { font-family: var(--cos); font-size: 0.92rem; line-height: 1.5; resize: vertical; }
  .caixa .pista { color: var(--boira); }
  .caixa .boto { width: auto; }
  .reixa { display: grid; grid-template-columns: repeat(auto-fit, minmax(165px, 1fr)); gap: 12px; }
  .resultat { font-size: 0.9rem; color: var(--boira); }
  .resultat.be { color: var(--cobrat); }
  .resultat.mal { color: var(--pendent); }

  .taula-caixa { overflow-x: auto; border: 1px solid var(--vora); border-radius: 12px; background: var(--nit-2); }
  table { border-collapse: collapse; width: 100%; font-size: 0.9rem; }
  th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--vora); vertical-align: top; }
  th { font-family: var(--condensada); font-weight: 600; font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--boira); white-space: nowrap; }
  tbody tr:last-child td { border-bottom: none; }
  .nums { font-weight: 600; font-variant-numeric: tabular-nums; color: var(--gel); }
  .correu { word-break: break-word; min-width: 150px; }
  .xifra { font-variant-numeric: tabular-nums; white-space: nowrap; }
  .pastilla {
    display: inline-block; font-family: var(--condensada); font-weight: 600; font-size: 0.78rem;
    letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 10px; border-radius: 999px; white-space: nowrap;
  }
  .pastilla-pagat { color: var(--cobrat); border: 1px solid var(--cobrat); background: rgba(79,192,141,0.1); }
  .pastilla-pendent { color: var(--pendent); border: 1px solid var(--pendent); background: rgba(227,167,66,0.1); }
  .pastilla-correu { color: var(--gel); border: 1px solid var(--gel-fosc); background: rgba(169,194,234,0.09); }
  .pastilla-enviat { color: var(--cobrat); border: 1px solid var(--cobrat); background: rgba(79,192,141,0.1); }
  .compte {
    font-family: var(--condensada); font-weight: 700; font-size: 0.85rem; letter-spacing: 0;
    background: var(--gel); color: var(--nit); border-radius: 999px; padding: 1px 10px; margin-left: 8px;
  }
  .compte[data-zero="true"] { background: var(--vora); color: var(--boira); }
  .caixa-cap { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
  .mini {
    font-family: var(--cos); font-size: 0.82rem; cursor: pointer; background: transparent;
    border: 1px solid var(--vora); border-radius: 7px; padding: 5px 10px; color: var(--blanc); white-space: nowrap;
  }
  .mini:hover { border-color: var(--gel); color: var(--gel); }
  .mini.perill:hover { border-color: var(--roig); color: var(--roig); }
  .cel-accions { display: flex; gap: 6px; flex-wrap: wrap; }
  .buit { padding: 26px 16px; text-align: center; color: var(--boira); font-size: 0.92rem; }

  @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
</style>

<header class="heroi">
  <div class="heroi-fons" aria-hidden="true"></div>
  <div class="heroi-vel" aria-hidden="true"></div>
  <div class="heroi-dins gutter centre">
    <p class="sobretitol">1.500 números a la venda</p>
    <h1><span class="t-tombola">Tómbola</span><span class="t-dhf">DHF</span></h1>
    <p class="data">20–21 novembre 2026</p>
    <div class="preu-bitllet">
      <span class="preu-xifra" data-preu-euros>5 €</span>
      <span class="preu-tall"></span>
      <span class="preu-mot">número</span>
    </div>
    <p class="plom">Tria quants números vols, paga amb Revolut o Bizum i t'assignem els teus números del sorteig. Els premis els posen els comerços que ens fan costat.</p>
  </div>
</header>

<main class="gutter centre pila" style="gap: 44px; padding-block: 8px 56px;">

  <!-- el bitllet -->
  <section class="bitllet" aria-labelledby="titolBitllet">
    <div class="bitllet-banda">
      <span id="titolBitllet">La teva comanda</span>
      <span data-preu-cadascun>5,00 € c/u</span>
    </div>

    <div class="bitllet-cos" id="zonaPedido">
      <div class="camp">
        <label for="email">El teu correu electrònic</label>
        <input type="email" id="email" name="email" placeholder="nom@correu.com" autocomplete="email" inputmode="email" spellcheck="false">
        <span class="pista">Aquí t'enviem els números que et toquin.</span>
      </div>

      <div class="camp">
        <label for="cantidad">Quants números vols?</label>
        <div class="comptador">
          <button type="button" class="pas" id="menos" aria-label="Treure un número">−</button>
          <input type="number" id="cantidad" name="cantidad" value="1" min="1" max="20" step="1" inputmode="numeric">
          <button type="button" class="pas" id="mas" aria-label="Afegir un número">+</button>
          <div class="dreceres" id="atajos">
            <button type="button" class="drecera" data-n="1">1</button>
            <button type="button" class="drecera" data-n="2">2</button>
            <button type="button" class="drecera" data-n="5">5</button>
            <button type="button" class="drecera" data-n="10">10</button>
          </div>
        </div>
        <span class="pista">Màxim 20 per comanda. Si en vols més, escriu-nos.</span>
      </div>

      <div class="troquel"></div>

      <div class="total">
        <div>
          <p class="total-mot">Total a pagar</p>
          <p class="total-xifra" id="importe">5,00 €</p>
          <p class="total-detall" id="desglose">1 número × 5,00 €</p>
        </div>
        <p class="anotacio">
          <svg class="fletxa" viewBox="0 0 80 50" aria-hidden="true"><path d="M6 8 C 32 4, 62 12, 71 37" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M63 31 L72 39 L61 42" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span class="ma">3 números,<br>3 oportunitats</span>
        </p>
      </div>

      <p class="error" id="errorPedido" hidden></p>
      <button type="button" class="boto" id="generar">Continua al pagament</button>
    </div>

    <div class="bitllet-cos resguard" id="zonaResguardo" hidden>
      <button type="button" class="enrere" id="enrere">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 5.5 L8 12 l6.5 6.5" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Tornar enrere
      </button>
      <div>
        <p class="total-mot">Paga la comanda</p>
        <h2>Resguard de la comanda</h2>
      </div>

      <div class="dada">
        <div class="dada-text">
          <span class="dada-clau">Import exacte</span>
          <span class="dada-valor" id="resImporte">5,00 €</span>
        </div>
        <button type="button" class="mini" data-copiar="resImporte">Copia</button>
      </div>

      <div class="dada">
        <div class="dada-text">
          <span class="dada-clau">Concepte del pagament</span>
          <span class="dada-valor ref" id="resRef">TOMBOLA-000000</span>
        </div>
        <button type="button" class="mini" data-copiar="resRef">Copia</button>
      </div>

      <span class="etiqueta-grup">Per on pagues?</span>
      <div class="pagaments" id="pagaments"></div>

      <ol class="passos">
        <li><strong>Tria per on pagues</strong><span>Una de les tres opcions de dalt.</span></li>
        <li><strong>Fes el pagament</strong><span>Per l'import exacte i, si l'app t'ho deixa, posant-hi el concepte.</span></li>
        <li><strong>Torna aquí i prem "Ja he pagat"</strong><span>T'hi donarem el resum per enviar-nos, que és com trobem el teu pagament.</span></li>
      </ol>

      <div class="accions">
        <button type="button" class="boto" id="jaPagat">Ja he pagat</button>
        <button type="button" class="boto-pla" id="otroPedido">Fer una altra comanda</button>
      </div>
      <p class="pista" id="estadoCopia" role="status" aria-live="polite"></p>
    </div>

    <div class="bitllet-cos resguard" id="zonaFet" hidden>
      <div>
        <p class="total-mot">Últim pas</p>
        <h2>Envia'ns la comanda</h2>
      </div>
      <p class="pista">Copia aquest resum i fes-nos-el arribar. És com trobem el teu pagament i sabem a qui pertoquen els números.</p>

      <textarea id="fetResum" class="resum-caixa" rows="7" readonly spellcheck="false"></textarea>

      <div class="accions">
        <button type="button" class="boto" id="copiarResum">Copia el resum</button>
        <a class="boto boto-contorn" id="enllacWhatsapp2" href="#" target="_blank" rel="noopener">Enviar per WhatsApp</a>
      </div>
      <p class="resultat-registre" id="estatRegistre" role="status" aria-live="polite" hidden></p>
      <p class="pista">Si ho envies per un altre canal, el nostre número és el <span class="dada-valor contacte" id="contacteWa">+34 697 78 12 97</span>
        <button type="button" class="mini" data-copiar="contacteWa">Copia el número</button>
      </p>

      <div class="troquel"></div>

      <p class="pista">Comprovem els pagaments un per un. En les pròximes 24 hores rebràs un correu a <strong id="fetCorreu">el teu correu</strong> amb els números que t'han tocat.</p>
      <div class="accions">
        <button type="button" class="boto-pla" id="tornar">Fer una altra comanda</button>
      </div>
      <p class="pista" id="estadoCopia2" role="status" aria-live="polite"></p>
    </div>
  </section>

  <!-- repartiment de números -->
  <section class="seccio">
    <h2 class="titol-seccio">Com es reparteixen els números</h2>
    <div class="barra-tram" role="img" aria-label="De l'1 al 700 es venen per internet; del 701 al 1500, en mà.">
      <div class="tram tram-online" style="flex: 700 0 0;"><span>1 – 700<br>internet</span></div>
      <div class="tram tram-ma" style="flex: 800 0 0;"><span>701 – 1.500<br>en mà</span></div>
    </div>
    <div class="notes">
      <p class="nota"><span class="punt punt-online"></span><span>Les comandes d'aquesta pàgina reben números de l'<strong>1 al 700</strong>, per ordre d'arribada. Si en demanes 3, et toquen 3 números diferents.</span></p>
      <p class="nota"><span class="punt punt-ma"></span><span>Del <strong>701 al 1.500</strong> es reserven per a la venda en mà, en paper.</span></p>
    </div>
    <p class="anotacio-ma">
      <svg class="fletxa" viewBox="0 0 80 50" aria-hidden="true"><path d="M8 42 C 24 16, 50 6, 72 10" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M63 4 L73 10 L64 17" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span class="ma">cada número només<br>es dóna una vegada</span>
    </p>
  </section>

  <section class="seccio">
    <p class="legal">El teu correu només s'utilitza per enviar-te els números i avisar-te del resultat. Els números queden confirmats quan comprovem el pagament. La tómbola es fa el 20 i 21 de novembre de 2026.</p>
  </section>

  <!-- panell -->
  <section class="panell ample" id="panel" hidden aria-labelledby="titolPanell">
    <div>
      <p class="sobretitol">Només ho veus tu</p>
      <h2 class="titol-seccio" id="titolPanell">Panell d'organització</h2>
    </div>

    <div class="marcadors">
      <div class="marcador">
        <span class="marcador-clau">Internet · 1–700</span>
        <span class="marcador-valor" id="mOnline">0</span>
        <div class="medidor"><i id="barraOnline" style="width:0%"></i></div>
      </div>
      <div class="marcador">
        <span class="marcador-clau">En mà · 701–1500</span>
        <span class="marcador-valor" id="mMano">0</span>
        <div class="medidor"><i id="barraMano" style="width:0%"></i></div>
      </div>
      <div class="marcador">
        <span class="marcador-clau">Cobrat</span>
        <span class="marcador-valor" id="mCobrado">0 €</span>
      </div>
      <div class="marcador">
        <span class="marcador-clau">Per comprovar</span>
        <span class="marcador-valor" id="mPendiente">0 €</span>
      </div>
      <div class="marcador">
        <span class="marcador-clau">Correus per enviar</span>
        <span class="marcador-valor" id="mCorreus">0</span>
      </div>
    </div>

    <!-- 1. comandes per comprovar -->
    <div class="caixa">
      <h3>Comandes per comprovar <span class="compte" id="compPendents" data-zero="true">0</span></h3>
      <p class="pista">Mira si el pagament hi és, al Revolut o al Bizum. Quan el trobis, confirma la comanda: s'assignen els números lliures i el correu queda a la cua d'enviament.</p>
      <div class="taula-caixa">
        <table>
          <thead>
            <tr><th>Concepte</th><th>Correu</th><th>Quants</th><th>Import</th><th>Pagament</th><th>Rebuda</th><th></th></tr>
          </thead>
          <tbody id="cosPendents">
            <tr><td colspan="7" class="buit" id="buitPendents">Carregant…</td></tr>
          </tbody>
        </table>
      </div>
      <p class="resultat" id="avisPendents" role="status" aria-live="polite"></p>
    </div>

    <!-- 2. afegir comandes -->
    <div class="caixa">
      <h3>Afegir comandes rebudes</h3>
      <p class="pista">Enganxa aquí els missatges de WhatsApp que t'arriben, tants com vulguis de cop. També entén línies soltes del tipus <span class="nums">anna@correu.com, 3</span>.</p>
      <textarea id="aLote" rows="5" placeholder="Comanda per a la Tómbola DHF&#10;Concepte: TOMBOLA-ABC123&#10;Correu: anna@correu.com&#10;Números: 3&#10;Import: 15,00 €&#10;Pagament: Bizum a Maria Gessti"></textarea>
      <div class="accions">
        <button type="button" class="boto" id="afegirLot">Afegeix per comprovar</button>
      </div>
      <p class="resultat" id="avisoLote" role="status" aria-live="polite"></p>
    </div>

    <!-- 3. alta manual / venda en mà -->
    <div class="caixa">
      <h3>Venda en mà o alta manual</h3>
      <div class="reixa">
        <div class="camp">
          <label for="aEmail">Correu</label>
          <input type="email" id="aEmail" placeholder="nom@correu.com" spellcheck="false">
        </div>
        <div class="camp">
          <label for="aCantidad">Números</label>
          <input type="number" id="aCantidad" value="1" min="1" max="100" step="1">
        </div>
        <div class="camp">
          <label for="aCanal">Venda</label>
          <select id="aCanal">
            <option value="presencial">En mà (701–1500)</option>
            <option value="online">Internet (1–700)</option>
          </select>
        </div>
        <div class="camp">
          <label for="aEstado">Cobrament</label>
          <select id="aEstado">
            <option value="pagat">Ja pagat — assigna els números</option>
            <option value="pendent">Per comprovar</option>
          </select>
        </div>
      </div>
      <div class="accions">
        <button type="button" class="boto" id="asignar">Dona-la d'alta</button>
      </div>
      <p class="resultat" id="avisoAlta" role="status" aria-live="polite"></p>
    </div>

    <!-- 4. números assignats -->
    <div class="caixa">
      <div class="caixa-cap">
        <h3>Números assignats <span class="compte" id="compAssignats" data-zero="true">0</span></h3>
        <div class="accions">
          <input type="text" id="filtro" placeholder="Cerca correu o número" style="width:210px;" spellcheck="false">
          <button type="button" class="boto-pla" id="copiarCorreus">Copia els correus per enviar</button>
          <button type="button" class="boto-pla" id="exportar" hidden>Baixa el CSV</button>
        </div>
      </div>
      <div class="taula-caixa">
        <table>
          <thead>
            <tr><th>Números</th><th>Correu</th><th>Quants</th><th>Import</th><th>Venda</th><th>Correu</th><th>Confirmada</th><th></th></tr>
          </thead>
          <tbody id="cuerpoTabla">
            <tr><td colspan="8" class="buit" id="celdaVacia">Carregant el registre…</td></tr>
          </tbody>
        </table>
      </div>
      <p class="resultat" id="avisAssignats" role="status" aria-live="polite"></p>
    </div>
  </section>
</main>


<script>
(function () {
  "use strict";

  var CONFIG = {
    precio: 5,
    maxPorPedido: 20,
    // Les opcions de pagament: l'ordre d'aquesta llista és el que es veu a la pàgina.
    pagament: {
      revolut: {
        etiqueta: "Revolut", via: "Revolut", curt: "Revolut (Maria)",
        nom: "Maria Gessti", enllac: "https://revolut.me/mariagessti"
      },
      bizum_maria: {
        etiqueta: "Bizum · Maria", via: "Bizum", curt: "Bizum (Maria)",
        nom: "Maria Gessti", telefon: "+34 697 78 12 97",
        nota: "Des de l'app del teu banc, a Bizum."
      },
      bizum_gabi: {
        etiqueta: "Bizum · Gabi", via: "Bizum", curt: "Bizum (Gabi)",
        nom: "Gabriela Pérez", telefon: "+34 637 67 00 30",
        nota: "Des de l'app del teu banc, a Bizum."
      }
    },
    whatsapp: "34697781297",           // ← on arriben els avisos per WhatsApp
    whatsappVisible: "+34 697 78 12 97",
    rangos: { online: [1, 700], presencial: [701, 1500] }
  };

  var eurFmt = new Intl.NumberFormat("ca-ES", { style: "currency", currency: "EUR" });
  var numFmt = new Intl.NumberFormat("ca-ES");
  var eur = function (n) { return eurFmt.format(n); };
  var $ = function (id) { return document.getElementById(id); };
  var RE_EMAIL = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  /* ---------- part pública ---------- */

  var elEmail = $("email"), elCantidad = $("cantidad"), elImporte = $("importe"),
      elDesglose = $("desglose"), elError = $("errorPedido"),
      zonaPedido = $("zonaPedido"), zonaResguardo = $("zonaResguardo");

  document.querySelectorAll("[data-preu-euros]").forEach(function (n) { n.textContent = CONFIG.precio + " €"; });
  document.querySelectorAll("[data-preu-cadascun]").forEach(function (n) { n.textContent = eur(CONFIG.precio) + " c/u"; });
  $("contacteWa").textContent = CONFIG.whatsappVisible;

  var METODE_PER_DEFECTE = Object.keys(CONFIG.pagament)[0];

  // Canvia la forma de pagament des del resguard mateix.
  function canviarMetode(id) {
    if (!pedidoActual || !CONFIG.pagament[id] || pedidoActual.metode === id) return;
    pedidoActual.metode = id;
    try { localStorage.setItem("comandaTombolaDHF", JSON.stringify(pedidoActual)); } catch (e) {}
    omplirResguard(pedidoActual);
  }

  // Les targetes del resguard; la triada es marca amb "El teu".
  function pintarPagaments(triat) {
    var cont = $("pagaments");
    cont.textContent = "";
    Object.keys(CONFIG.pagament).forEach(function (id) {
      var m = CONFIG.pagament[id];
      var card = document.createElement("div");
      card.className = "pagament" + (id === triat ? " es-triat" : "");

      var dalt = document.createElement("div");
      dalt.className = "pagament-dalt";
      var clau = document.createElement("span");
      clau.className = "dada-clau";
      clau.textContent = m.via;
      dalt.appendChild(clau);
      if (id === triat) {
        var marca = document.createElement("span");
        marca.className = "triat";
        marca.textContent = "El teu";
        dalt.appendChild(marca);
      } else {
        var tria = document.createElement("button");
        tria.type = "button";
        tria.className = "mini";
        tria.textContent = "Triar";
        tria.addEventListener("click", function () { canviarMetode(id); });
        dalt.appendChild(tria);
      }
      card.appendChild(dalt);

      var qui = document.createElement("p");
      qui.className = "pagament-qui";
      qui.textContent = m.nom;
      card.appendChild(qui);

      if (m.enllac) {
        var a = document.createElement("a");
        a.className = "boto";
        a.href = m.enllac;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = "Obrir " + m.via;
        a.addEventListener("click", function () { canviarMetode(id); });
        card.appendChild(a);
      }

      var desti = document.createElement("p");
      desti.className = m.telefon ? "dada-valor" : "pagament-lletra";
      desti.textContent = m.telefon || m.enllac.replace(/^https?:\/\//, "");
      card.appendChild(desti);

      if (m.nota) {
        var nota = document.createElement("p");
        nota.className = "pagament-lletra";
        nota.textContent = m.nota;
        card.appendChild(nota);
      }

      var boto = document.createElement("button");
      boto.type = "button";
      boto.className = "mini";
      boto.textContent = m.telefon ? "Copia el número" : "Copia l'enllaç";
      boto.addEventListener("click", function () {
        copiar(desti.textContent, desti);
        canviarMetode(id);
      });
      card.appendChild(boto);

      cont.appendChild(card);
    });
  }

  function cantidadActual() {
    var n = parseInt(elCantidad.value, 10);
    if (!isFinite(n) || n < 1) n = 1;
    if (n > CONFIG.maxPorPedido) n = CONFIG.maxPorPedido;
    return n;
  }

  function pintarTotal() {
    var n = cantidadActual();
    elImporte.textContent = eur(n * CONFIG.precio);
    elDesglose.textContent = n + (n === 1 ? " número × " : " números × ") + eur(CONFIG.precio);
    var botones = document.querySelectorAll("#atajos .drecera");
    for (var i = 0; i < botones.length; i++) {
      botones[i].setAttribute("aria-pressed", String(parseInt(botones[i].dataset.n, 10) === n));
    }
  }

  elCantidad.addEventListener("input", pintarTotal);
  elCantidad.addEventListener("change", function () { elCantidad.value = cantidadActual(); pintarTotal(); });
  $("menos").addEventListener("click", function () { elCantidad.value = Math.max(1, cantidadActual() - 1); pintarTotal(); });
  $("mas").addEventListener("click", function () { elCantidad.value = Math.min(CONFIG.maxPorPedido, cantidadActual() + 1); pintarTotal(); });
  $("atajos").addEventListener("click", function (e) {
    var b = e.target.closest(".drecera");
    if (!b) return;
    elCantidad.value = b.dataset.n;
    pintarTotal();
  });
  pintarTotal();

  function referencia(email) {
    var h = 5381, txt = email.toLowerCase();
    for (var i = 0; i < txt.length; i++) h = ((h * 33) ^ txt.charCodeAt(i)) >>> 0;
    var a = ("000" + h.toString(36).toUpperCase()).slice(-3);
    // Cua llarga i aleatòria: dues comandes no poden compartir concepte.
    var b = "";
    for (var k = 0; k < 5; k++) b += "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)];
    return ("TOMBOLA-" + a + b).replace(/[^A-Z0-9-]/g, "X");
  }

  function resumen(pedido) {
    var m = CONFIG.pagament[pedido.metode] || CONFIG.pagament.revolut;
    var com = m.via + " a " + m.nom + " (" + (m.telefon || m.enllac) + ")";
    return [
      "Comanda per a la Tómbola DHF",
      "Concepte: " + pedido.ref,
      "Correu: " + pedido.email,
      "Números: " + pedido.cantidad,
      "Import: " + eur(pedido.cantidad * CONFIG.precio),
      "Pagament: " + com
    ].join("\n");
  }

  var pedidoActual = null;

  function omplirResguard(pedido) {
    $("resImporte").textContent = eur(pedido.cantidad * CONFIG.precio);
    $("resRef").textContent = pedido.ref;
    pintarPagaments(pedido.metode);
  }

  function mostrarResguardo(pedido) {
    pedidoActual = pedido;
    omplirResguard(pedido);
    zonaPedido.hidden = true;
    zonaResguardo.hidden = false;
  }

  $("generar").addEventListener("click", function () {
    var email = elEmail.value.trim();
    if (!RE_EMAIL.test(email)) {
      elError.textContent = "Escriu un correu vàlid per poder enviar-te els números.";
      elError.hidden = false;
      elEmail.focus();
      return;
    }
    elError.hidden = true;
    var pedido = { email: email, cantidad: cantidadActual(), ref: referencia(email), metode: METODE_PER_DEFECTE };
    try { localStorage.setItem("comandaTombolaDHF", JSON.stringify(pedido)); } catch (e) {}
    mostrarResguardo(pedido);
    zonaResguardo.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  function tornarAlFormulari(netejar) {
    try { localStorage.removeItem("comandaTombolaDHF"); } catch (e) {}
    pedidoActual = null;
    zonaResguardo.hidden = true;
    $("zonaFet").hidden = true;
    zonaPedido.hidden = false;
    $("estadoCopia").textContent = "";
    avisRegistre("");
    if (netejar) {
      elEmail.value = "";
      elCantidad.value = "1";
      pintarTotal();
      elEmail.focus();
    } else {
      zonaPedido.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function reiniciar() { tornarAlFormulari(true); }

  function mostrarFet(pedido) {
    avisRegistre("");
    $("fetCorreu").textContent = pedido.email;
    $("fetResum").value = resumen(pedido);
    $("enllacWhatsapp2").href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(resumen(pedido));
    zonaPedido.hidden = true;
    zonaResguardo.hidden = true;
    $("zonaFet").hidden = false;
    pedidoActual = pedido;
  }

  $("jaPagat").addEventListener("click", function () {
    if (!pedidoActual) return;
    var fet = { email: pedidoActual.email, cantidad: pedidoActual.cantidad, ref: pedidoActual.ref, metode: pedidoActual.metode, fet: true };
    try { localStorage.setItem("comandaTombolaDHF", JSON.stringify(fet)); } catch (e) {}
    mostrarFet(fet);
    $("zonaFet").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  $("enrere").addEventListener("click", function () { tornarAlFormulari(false); });
  $("otroPedido").addEventListener("click", reiniciar);
  $("tornar").addEventListener("click", reiniciar);

  function avisarCopia(txt) {
    ["estadoCopia", "estadoCopia2"].forEach(function (id) {
      var n = $(id);
      if (n) n.textContent = txt;
    });
    setTimeout(function () {
      ["estadoCopia", "estadoCopia2"].forEach(function (id) {
        var n = $(id);
        if (n) n.textContent = "";
      });
    }, 3000);
  }

  function copiar(texto, nodo) {
    var ok = function () { avisarCopia("Copiat."); };
    var falla = function () {
      if (nodo) {
        var r = document.createRange();
        r.selectNodeContents(nodo);
        var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(r);
        avisarCopia("Selecciona'l i copia'l a mà.");
      } else {
        avisarCopia("No s'ha pogut copiar.");
      }
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(ok, falla);
      } else { falla(); }
    } catch (e) { falla(); }
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-copiar]");
    if (!b) return;
    var nodo = $(b.dataset.copiar);
    copiar(nodo.textContent, nodo);
  });

  // Qui pot editar l'artifact (l'organització) també desa la comanda al panell
  // en prémer el botó. Un visitant anònim no pot escriure-hi: només copia.
  async function registrarDesDeLaPagina(pedido) {
    if (!db) return "sense-permis";
    if (!/^[A-Za-z0-9-]{1,60}$/.test(pedido.ref || "")) return "error";
    try {
      // El concepte és l'identificador del document: si es prem dues vegades,
      // s'escriu a la mateixa fila i no es pot duplicar mai.
      var doc = db.collection("pedidos").doc(pedido.ref);
      var actual = await doc.get();
      if (actual.exists) return "ja-hi-era";
      await doc.set({
        email: pedido.email,
        cantidad: pedido.cantidad,
        canal: "online",
        metode: pedido.metode || "",
        ref: pedido.ref || "",
        estado: "pendent",
        numeros: [],
        correu: "",
        creado: new Date().toISOString()
      });
      return "desada";
    } catch (e) {
      return "error";
    }
  }

  function avisRegistre(txt) {
    var n = $("estatRegistre");
    n.textContent = txt;
    n.hidden = !txt;
  }

  $("copiarResum").addEventListener("click", async function () {
    var caixa = $("fetResum");
    if (!caixa.value) return;
    try { caixa.select(); } catch (e) {}
    copiar(caixa.value, null);
    if (!pedidoActual) return;
    var r = await registrarDesDeLaPagina(pedidoActual);
    if (r === "desada") avisRegistre("Registrada al panell com a pendent de comprovar (" + pedidoActual.ref + ").");
    else if (r === "ja-hi-era") avisRegistre("Aquesta comanda ja constava al panell (" + pedidoActual.ref + ").");
    else if (r === "error") avisRegistre("No s'ha pogut desar al panell. Enganxa-hi el resum a mà.");
  });

  try {
    var guardado = JSON.parse(localStorage.getItem("comandaTombolaDHF") || "null");
    if (guardado && RE_EMAIL.test(guardado.email || "")) {
      elEmail.value = guardado.email;
      elCantidad.value = guardado.cantidad;
      if (!CONFIG.pagament[guardado.metode]) guardado.metode = METODE_PER_DEFECTE;
      pintarTotal();
      if (guardado.fet) mostrarFet(guardado); else mostrarResguardo(guardado);
    }
  } catch (e) {}

  /* ---------- panell d'organització ---------- */

  var db = null, descargas = null, pedidos = [];
  var holder = "h" + Math.random().toString(36).slice(2, 10);

  function usados(lista) {
    var s = Object.create(null);
    lista.forEach(function (p) { (p.numeros || []).forEach(function (n) { s[n] = true; }); });
    return s;
  }

  function libres(tomados, canal, cuantos) {
    var r = CONFIG.rangos[canal], out = [];
    for (var n = r[0]; n <= r[1] && out.length < cuantos; n++) {
      if (!tomados[n]) out.push(n);
    }
    return out;
  }

  function cuentaEnRango(lista, canal) {
    var r = CONFIG.rangos[canal], total = 0;
    lista.forEach(function (p) {
      (p.numeros || []).forEach(function (n) { if (n >= r[0] && n <= r[1]) total++; });
    });
    return total;
  }

  function esPagat(p) { return p.estado === "pagat"; }
  function pendents() { return pedidos.filter(function (p) { return !esPagat(p); }); }
  function assignats() { return pedidos.filter(esPagat); }
  function perEnviar() { return assignats().filter(function (p) { return p.correu !== "enviat"; }); }

  function aviso(nodo, txt, be) {
    nodo.textContent = txt;
    nodo.className = "resultat " + (be ? "be" : "mal");
  }

  function celda(tr, txt, clase) {
    var td = document.createElement("td");
    if (clase) td.className = clase;
    td.textContent = txt;
    tr.appendChild(td);
    return td;
  }

  function botoMini(txt, classe, fn) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "mini" + (classe ? " " + classe : "");
    b.textContent = txt;
    b.addEventListener("click", fn);
    return b;
  }

  function botoDosPassos(txt, txtConfirma, classe, fn) {
    var b = document.createElement("button"), armat = false, rellotge = null;
    b.type = "button";
    b.className = "mini" + (classe ? " " + classe : "");
    b.textContent = txt;
    b.addEventListener("click", function () {
      if (!armat) {
        armat = true;
        b.textContent = txtConfirma;
        rellotge = setTimeout(function () { armat = false; b.textContent = txt; }, 4000);
        return;
      }
      clearTimeout(rellotge);
      fn();
    });
    return b;
  }

  function pastilla(txt, classe) {
    var s = document.createElement("span");
    s.className = "pastilla " + classe;
    s.textContent = txt;
    return s;
  }

  function dataCurta(iso) {
    return iso ? new Date(iso).toLocaleDateString("ca-ES", { day: "2-digit", month: "short" }) : "—";
  }
  function nomMetode(m) {
    if (CONFIG.pagament[m]) return CONFIG.pagament[m].curt;
    return m === "bizum" ? "Bizum" : "—";
  }
  function nomCanal(c) { return c === "presencial" ? "En mà" : "Internet"; }

  function pintarMarcadors() {
    var on = cuentaEnRango(pedidos, "online"), mano = cuentaEnRango(pedidos, "presencial");
    var topeOn = CONFIG.rangos.online[1] - CONFIG.rangos.online[0] + 1;
    var topeMano = CONFIG.rangos.presencial[1] - CONFIG.rangos.presencial[0] + 1;
    $("mOnline").textContent = numFmt.format(on) + " / " + numFmt.format(topeOn);
    $("mMano").textContent = numFmt.format(mano) + " / " + numFmt.format(topeMano);
    $("barraOnline").style.width = (on / topeOn * 100) + "%";
    $("barraMano").style.width = (mano / topeMano * 100) + "%";
    var cobrat = 0, perComprovar = 0;
    pedidos.forEach(function (p) {
      var imp = (p.cantidad || 0) * CONFIG.precio;
      if (esPagat(p)) cobrat += imp; else perComprovar += imp;
    });
    $("mCobrado").textContent = eur(cobrat);
    $("mPendiente").textContent = eur(perComprovar);
    $("mCorreus").textContent = String(perEnviar().length);
  }

  /* --- correu que rep el comprador --- */

  var ASSUMPTE = "Els teus números de la Tómbola DHF";

  function cosCorreu(p) {
    return [
      "Hola!",
      "",
      "Hem comprovat el teu pagament de " + eur((p.cantidad || 0) * CONFIG.precio) + " per a la Tómbola DHF.",
      "",
      "Els teus números són: " + (p.numeros || []).join(", "),
      "",
      "Guarda aquest correu. La tómbola es fa el 20 i 21 de novembre de 2026 i t'avisem si et toca algun premi.",
      "",
      "Gràcies per col·laborar!",
      "Tómbola DHF"
    ].join("\n");
  }

  function correuComText(p) {
    return ["Per a: " + p.email, "Assumpte: " + ASSUMPTE, "", cosCorreu(p)].join("\n");
  }

  /* --- taula de comandes per comprovar --- */

  function pintarPendents() {
    var cos = $("cosPendents");
    cos.textContent = "";
    var lista = pendents().slice().sort(function (a, b) {
      return String(a.creado || "").localeCompare(String(b.creado || ""));
    });
    $("compPendents").textContent = String(lista.length);
    $("compPendents").dataset.zero = String(lista.length === 0);

    if (!lista.length) {
      var tr0 = document.createElement("tr");
      celda(tr0, "Cap comanda per comprovar. Quan te n'arribi una per WhatsApp, enganxa-la aquí sota.", "buit").colSpan = 7;
      cos.appendChild(tr0);
      return;
    }

    lista.forEach(function (p) {
      var tr = document.createElement("tr");
      celda(tr, p.ref || "—", "nums");
      celda(tr, p.email || "—", "correu");
      celda(tr, String(p.cantidad || 0), "xifra");
      celda(tr, eur((p.cantidad || 0) * CONFIG.precio), "xifra");
      celda(tr, nomMetode(p.metode));
      celda(tr, dataCurta(p.creado), "xifra");

      var td = document.createElement("td");
      td.className = "cel-accions";
      td.appendChild(botoMini("Confirma el pagament", "", function () { confirmarPagament(p); }));
      td.appendChild(botoDosPassos("Elimina", "Segur?", "perill", function () { esborrar(p, $("avisPendents")); }));
      tr.appendChild(td);
      cos.appendChild(tr);
    });
  }

  /* --- taula de números assignats --- */

  function filtrados() {
    var q = $("filtro").value.trim().toLowerCase();
    var base = assignats();
    if (!q) return base;
    var comNum = parseInt(q, 10);
    return base.filter(function (p) {
      if ((p.email || "").toLowerCase().indexOf(q) !== -1) return true;
      if (isFinite(comNum) && (p.numeros || []).indexOf(comNum) !== -1) return true;
      return false;
    });
  }

  function pintarAssignats() {
    var cos = $("cuerpoTabla");
    cos.textContent = "";
    var tots = assignats();
    $("compAssignats").textContent = String(tots.length);
    $("compAssignats").dataset.zero = String(tots.length === 0);

    var lista = filtrados().slice().sort(function (a, b) {
      return String(b.pagat_el || b.creado || "").localeCompare(String(a.pagat_el || a.creado || ""));
    });

    if (!lista.length) {
      var tr0 = document.createElement("tr");
      celda(tr0, tots.length ? "Cap comanda coincideix amb la cerca." : "Encara no hi ha números assignats. Confirma una comanda i hi apareixerà.", "buit").colSpan = 8;
      cos.appendChild(tr0);
      return;
    }

    lista.forEach(function (p) {
      var tr = document.createElement("tr");
      celda(tr, (p.numeros || []).join(", "), "nums");
      celda(tr, p.email || "—", "correu");
      celda(tr, String(p.cantidad || 0), "xifra");
      celda(tr, eur((p.cantidad || 0) * CONFIG.precio), "xifra");
      celda(tr, nomCanal(p.canal));

      var tdCorreu = document.createElement("td");
      var enviat = p.correu === "enviat";
      tdCorreu.appendChild(pastilla(enviat ? "Enviat" : "Per enviar", enviat ? "pastilla-enviat" : "pastilla-correu"));
      tr.appendChild(tdCorreu);

      celda(tr, dataCurta(p.pagat_el || p.creado), "xifra");

      var td = document.createElement("td");
      td.className = "cel-accions";
      td.appendChild(botoMini("Copia el correu", "", function () {
        copiar(correuComText(p), null);
        aviso($("avisAssignats"), "Correu de " + p.email + " copiat. Enganxa'l al teu gestor de correu i després marca'l com a enviat.", true);
      }));
      td.appendChild(botoMini(enviat ? "Marca per enviar" : "Marca enviat", "", function () {
        marcarCorreu(p, enviat ? "per_enviar" : "enviat");
      }));
      td.appendChild(botoDosPassos("Allibera els números", "Segur?", "perill", function () { esborrar(p, $("avisAssignats")); }));
      tr.appendChild(td);
      cos.appendChild(tr);
    });
  }

  function pintarPanel() { pintarMarcadors(); pintarPendents(); pintarAssignats(); }

  $("filtro").addEventListener("input", pintarAssignats);

  /* --- escriptures --- */

  function nuevoId() {
    return "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  async function esborrar(p, nodo) {
    if (!db) return;
    try {
      await db.collection("pedidos").doc(p.id).delete();
      aviso(nodo, "Comanda de " + p.email + " eliminada.", true);
    } catch (e) {
      aviso(nodo, "No s'ha pogut eliminar: " + (e && e.message ? e.message : "error"), false);
    }
  }

  async function marcarCorreu(p, estat) {
    if (!db) return;
    try { await db.collection("pedidos").doc(p.id).update({ correu: estat }); }
    catch (e) { aviso($("avisAssignats"), "No s'ha pogut canviar l'estat del correu: " + (e && e.message ? e.message : "error"), false); }
  }

  // Assigna els números lliures d'un tram a una comanda ja existent i la deixa com a pagada.
  async function confirmarPagament(p, nodoAviso) {
    var nodo = nodoAviso || $("avisPendents");
    if (!db) { aviso(nodo, "El registre no està disponible en aquesta vista.", false); return false; }
    aviso(nodo, "Assignant els números…", true);

    var cerradura = db.doc("estado/asignacion");
    try {
      var lease = await cerradura.acquire({ holder: holder, ttlMs: 10000 });
      if (lease && lease.acquired === false) {
        aviso(nodo, "Algú està assignant números ara mateix. Espera uns segons i torna-ho a provar.", false);
        return false;
      }
    } catch (e) { /* sense pany: mana la lectura següent */ }

    var tomados;
    try {
      var snap = await db.collection("pedidos").get();
      tomados = usados(snap.docs.map(function (d) { var o = d.data() || {}; o.id = d.id; return o; }));
    } catch (e) {
      aviso(nodo, "No s'ha pogut llegir el registre: " + (e && e.message ? e.message : "error"), false);
      return false;
    }

    var canal = p.canal === "presencial" ? "presencial" : "online";
    var quants = p.cantidad || 1;
    var nums = libres(tomados, canal, quants);
    if (nums.length < quants) {
      aviso(nodo, "No queden " + quants + " números lliures al tram de " + nomCanal(canal).toLowerCase() + ".", false);
      return false;
    }

    try {
      await db.collection("pedidos").doc(p.id).update({
        estado: "pagat",
        numeros: nums,
        pagat_el: new Date().toISOString(),
        correu: "per_enviar"
      });
      aviso(nodo, "Confirmada: " + p.email + " → " + nums.join(", ") + ". El correu queda a la cua d'enviament.", true);
      return true;
    } catch (e) {
      aviso(nodo, "No s'ha pogut confirmar: " + (e && e.message ? e.message : "error"), false);
      return false;
    }
  }

  async function crearComanda(entrada, canal) {
    var doc = db.collection("pedidos").doc(nuevoId());
    await doc.set({
      email: entrada.email,
      cantidad: entrada.cantidad,
      canal: canal,
      metode: entrada.metode || "",
      ref: entrada.ref || "",
      estado: "pendent",
      numeros: [],
      correu: "",
      creado: new Date().toISOString()
    });
    return doc.id;
  }

  /* --- enganxar comandes rebudes --- */

  function llegirComandes(text) {
    var bones = [], dolentes = [];
    var trossos;
    if (/Concepte\s*:/i.test(text)) {
      trossos = text.split(/(?=Concepte\s*:)/i).filter(function (t) { return /Concepte\s*:/i.test(t); });
    } else {
      trossos = text.split("\n");
    }
    trossos.forEach(function (tros) {
      var t = tros.trim();
      if (!t) return;
      var email = (t.match(/[\w.!#$%&'*+/=?^`{|}~-]+@[\w-]+(?:\.[\w-]+)+/) || [])[0];
      var ref = (t.match(/Concepte\s*:\s*([A-Za-z0-9-]+)/i) || [])[1] || "";
      var quants = (t.match(/N[úu]meros?\s*:\s*(\d+)/i) || [])[1];
      if (!quants) {
        var solt = t.match(/[,;\s]+(\d+)\s*$/);
        quants = solt ? solt[1] : null;
      }
      var n = parseInt(quants || "1", 10);
      var metode = "";
      if (/\bRevolut\b/i.test(t)) metode = "revolut";
      else if (/\bBizum\b/i.test(t)) metode = /gabi|gabriela|637/i.test(t) ? "bizum_gabi" : "bizum_maria";
      if (!email || !isFinite(n) || n < 1) { dolentes.push(t.split("\n")[0].slice(0, 60)); return; }
      bones.push({ email: email, cantidad: n, ref: ref, metode: metode });
    });
    return { bones: bones, dolentes: dolentes };
  }

  $("afegirLot").addEventListener("click", async function () {
    if (!db) { aviso($("avisoLote"), "El registre no està disponible en aquesta vista.", false); return; }
    var llegit = llegirComandes($("aLote").value);
    if (!llegit.bones.length) {
      aviso($("avisoLote"), "No he entès cap comanda. Enganxa el missatge sencer de WhatsApp, o una línia per comanda amb el correu i la quantitat.", false);
      return;
    }
    aviso($("avisoLote"), "Afegint…", true);
    var fets = 0, errors = [];
    for (var i = 0; i < llegit.bones.length; i++) {
      try { await crearComanda(llegit.bones[i], "online"); fets++; }
      catch (e) { errors.push(llegit.bones[i].email); }
    }
    var txt = fets + (fets === 1 ? " comanda afegida" : " comandes afegides") + " a la llista per comprovar.";
    if (errors.length) txt += " No s'han pogut desar: " + errors.join(", ") + ".";
    if (llegit.dolentes.length) txt += " Línies no enteses: " + llegit.dolentes.join(" | ") + ".";
    aviso($("avisoLote"), txt, !errors.length && !llegit.dolentes.length);
    if (fets) $("aLote").value = "";
  });

  /* --- alta manual --- */

  $("asignar").addEventListener("click", async function () {
    if (!db) { aviso($("avisoAlta"), "El registre no està disponible en aquesta vista.", false); return; }
    var email = $("aEmail").value.trim();
    var quants = parseInt($("aCantidad").value, 10);
    var canal = $("aCanal").value;
    var cobrament = $("aEstado").value;
    if (!RE_EMAIL.test(email)) { aviso($("avisoAlta"), "Aquest correu no és vàlid.", false); return; }
    if (!isFinite(quants) || quants < 1) { aviso($("avisoAlta"), "Indica quants números són.", false); return; }

    var repetit = pedidos.filter(function (p) { return (p.email || "").toLowerCase() === email.toLowerCase(); });
    var id;
    try {
      id = await crearComanda({ email: email, cantidad: quants, metode: "", ref: "" }, canal);
    } catch (e) {
      aviso($("avisoAlta"), "No s'ha pogut desar: " + (e && e.message ? e.message : "error"), false);
      return;
    }

    if (cobrament === "pagat") {
      await confirmarPagament({ id: id, email: email, cantidad: quants, canal: canal }, $("avisoAlta"));
    } else {
      aviso($("avisoAlta"), "Afegida a la llista per comprovar.", true);
    }
    if (repetit.length) {
      $("avisoAlta").textContent += " Atenció: aquest correu ja hi constava (" +
        repetit.map(function (p) { return (p.numeros || []).length ? (p.numeros || []).join(", ") : "per comprovar"; }).join(" / ") + ").";
    }
    $("aEmail").value = "";
    $("aCantidad").value = "1";
    $("aEmail").focus();
  });

  /* --- copiar tots els correus pendents --- */

  $("copiarCorreus").addEventListener("click", function () {
    var cua = perEnviar();
    if (!cua.length) { aviso($("avisAssignats"), "No hi ha cap correu pendent d'enviar.", true); return; }
    var txt = cua.map(correuComText).join("\n\n———\n\n");
    copiar(txt, null);
    aviso($("avisAssignats"), cua.length + (cua.length === 1 ? " correu copiat." : " correus copiats.") + " Quan els hagis enviat, marca'ls com a enviats.", true);
  });

  /* --- CSV --- */

  function csv() {
    var filas = [["numero", "correu", "venda", "cobrament", "correu_enviat", "confirmada"]];
    var sueltos = [];
    pedidos.forEach(function (p) {
      (p.numeros || []).forEach(function (n) {
        sueltos.push([n, p.email || "", nomCanal(p.canal), esPagat(p) ? "pagat" : "per comprovar", p.correu === "enviat" ? "si" : "no", p.pagat_el || ""]);
      });
    });
    sueltos.sort(function (a, b) { return a[0] - b[0]; });
    filas = filas.concat(sueltos);
    return filas.map(function (f) {
      return f.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(",");
    }).join("\r\n");
  }

  $("exportar").addEventListener("click", async function () {
    if (!descargas) return;
    try { await descargas.save({ filename: "tombola-dhf-numeros.csv", data: csv() }); }
    catch (e) {
      if (e && e.code !== "declined") aviso($("avisAssignats"), "No s'ha pogut baixar: " + (e.message || e.code), false);
    }
  });

  /* ---------- arrencada de les capacitats ---------- */

  (async function () {
    if (!window.claude || typeof window.claude.use !== "function") return;

    var user = await window.claude.use("user");
    var puedeEditar = user ? await user.canEdit() : false;
    if (!puedeEditar) return;

    $("panel").hidden = false;

    db = await window.claude.use("db");
    if (!db) {
      $("celdaVacia").textContent = "El registre no està disponible en aquesta vista.";
      return;
    }

    descargas = await window.claude.use("downloads");
    if (descargas) $("exportar").hidden = false;

    db.collection("pedidos").onSnapshot(function (snap) {
      pedidos = snap.docs.map(function (d) { var o = d.data() || {}; o.id = d.id; return o; });
      pintarPanel();
    }, function (err) {
      $("celdaVacia").textContent = "S'ha tallat la connexió amb el registre (" + err.code + "). Torna a carregar la pàgina.";
    });
  })();
})();
</script>

</body></html>
