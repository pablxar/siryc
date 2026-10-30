// Recibe el formulario de contacto (única ruta que corre en el Worker; el resto es estático).
// 1) valida, 2) guarda el lead en Supabase (inserción pública permitida por RLS, solo insertar),
// 3) avisa a ventas por Resend. Si el correo falla, el lead ya quedó guardado y no se bloquea al usuario.
// Con JS responde JSON; sin JS (envío nativo del formulario) redirige a /contacto/enviado.
// Astro rechaza envíos de otros sitios (security.checkOrigin, activo por defecto).
import type { APIRoute } from "astro";
import { RESEND_API_KEY } from "astro:env/server";
import { correoLead, leerLead, type Lead } from "../../lib/leads";

export const prerender = false;

const URL_BASE = import.meta.env.PUBLIC_SUPABASE_URL;
const CLAVE = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

async function guardar(lead: Lead) {
  const r = await fetch(`${URL_BASE}/rest/v1/leads`, {
    method: "POST",
    headers: { apikey: CLAVE, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify(lead),
  });
  if (!r.ok) throw new Error(`Supabase ${r.status}: ${await r.text()}`);
}

async function avisar(lead: Lead) {
  if (!RESEND_API_KEY) {
    console.warn("contacto: falta RESEND_API_KEY; lead guardado sin correo");
    return;
  }
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
    body: JSON.stringify({
      from: "SIRYC Web <no-reply@siryc.cl>",
      to: ["ventas@siryc.cl"],
      reply_to: lead.email,
      subject: `Nuevo lead · ${lead.tipo_servicio} · ${lead.nombre}${lead.empresa ? ` (${lead.empresa})` : ""}`,
      html: correoLead(lead),
    }),
  });
  if (!r.ok) console.error(`contacto: Resend ${r.status}: ${await r.text()}`);
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const quiereJson = request.headers.get("accept")?.includes("application/json");
  const responder = (ok: boolean, estado = 200, errores = {}) =>
    quiereJson ? Response.json({ ok, errores }, { status: estado }) : redirect(ok ? "/contacto/enviado" : "/contacto?error=1#formulario", 303);

  let datos: FormData;
  try {
    datos = await request.formData();
  } catch {
    return responder(false, 400);
  }
  // Trampa para robots: campo oculto que una persona no llena. Se responde como si todo saliera bien.
  if (typeof datos.get("sitio") === "string" && datos.get("sitio") !== "") return responder(true);

  const { lead, errores } = leerLead(datos);
  if (!lead) return responder(false, 422, errores);

  try {
    await guardar(lead);
  } catch (e) {
    console.error("contacto:", e);
    return responder(false, 502);
  }
  try {
    await avisar(lead);
  } catch (e) {
    console.error("contacto: aviso por correo", e);
  }
  return responder(true);
};
