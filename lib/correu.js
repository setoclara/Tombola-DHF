import nodemailer from "nodemailer";

// Els correus surten del compte del club per SMTP, no pas del navegador de qui
// prem el botó: així van sempre des de la mateixa adreça, encara que qui els
// enviï no hi tingui la sessió oberta (o ni tan sols tingui Gmail al mòbil).
//
// A Vercel calen dues variables:
//   GMAIL_USUARI — juniordhfemeni@gmail.com
//   GMAIL_CLAU   — una contrasenya d'aplicació del compte (no la del correu!)
const USUARI = (process.env.GMAIL_USUARI || "").trim();
const CLAU = (process.env.GMAIL_CLAU || "").replace(/\s+/g, "");

export function correuConfigurat() {
  return Boolean(USUARI && CLAU);
}

export function deQui() {
  return USUARI;
}

let transport = null;

function elTransport() {
  if (!transport) {
    transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: USUARI, pass: CLAU }
    });
  }
  return transport;
}

// Envia i torna l'identificador que dona Gmail, que queda al registre de Vercel
// per si algun dia s'ha de seguir la pista d'un correu.
export async function enviaCorreu({ per, assumpte, cos }) {
  if (!correuConfigurat()) throw new Error("correu_no_configurat");
  const resposta = await elTransport().sendMail({
    from: { name: "Sorteig DHF", address: USUARI },
    to: per,
    replyTo: USUARI,
    subject: assumpte,
    text: cos
  });
  return resposta && resposta.messageId;
}
