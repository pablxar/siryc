import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  nombre: z.string().trim().min(2).max(120),
  empresa: z.string().trim().max(200).optional().nullable(),
  cargo: z.string().trim().max(120).optional().nullable(),
  email: z.string().trim().email().max(200),
  telefono: z.string().trim().max(40).optional().nullable(),
  tipo_servicio: z.string().trim().min(1).max(120),
  segmento: z.string().trim().min(1).max(120),
  mensaje: z.string().trim().max(2000).optional().nullable(),
  origen_pagina: z.string().trim().max(200).optional().nullable(),
});

type Lead = z.infer<typeof leadSchema>;

const esc = (v?: string | null) =>
  (v ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function buildHtml(lead: Lead) {
  const row = (label: string, value?: string | null) => `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #eceef1;font-family:Inter,Arial,sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#8a8f96;width:180px;">${esc(label)}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #eceef1;font-family:Inter,Arial,sans-serif;font-size:14px;color:#1B232C;">${esc(value)}</td>
    </tr>`;

  return `<!doctype html>
<html lang="es"><body style="margin:0;background:#ffffff;padding:24px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;border:1px solid #eceef1;border-radius:16px;overflow:hidden;">
    <tr>
      <td style="background:#14398E;padding:28px 24px;">
        <div style="font-family:Inter,Arial,sans-serif;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:rgba(255,255,255,.65);">SIRYC · Nuevo lead</div>
        <div style="margin-top:8px;font-family:Inter,Arial,sans-serif;font-size:24px;font-weight:700;color:#ffffff;">${esc(lead.nombre)}</div>
        <div style="margin-top:6px;height:3px;width:48px;background:#E30613;"></div>
      </td>
    </tr>
    <tr><td>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row("Empresa", lead.empresa)}
        ${row("Cargo", lead.cargo)}
        ${row("Email", lead.email)}
        ${row("Teléfono", lead.telefono)}
        ${row("Tipo de servicio", lead.tipo_servicio)}
        ${row("Segmento", lead.segmento)}
        ${row("Origen", lead.origen_pagina)}
      </table>
    </td></tr>
    <tr><td style="padding:20px 16px;">
      <div style="font-family:Inter,Arial,sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#8a8f96;">Detalle del requerimiento</div>
      <div style="margin-top:8px;font-family:Inter,Arial,sans-serif;font-size:14px;line-height:1.6;color:#1B232C;white-space:pre-wrap;">${esc(lead.mensaje)}</div>
    </td></tr>
    <tr><td style="padding:18px 16px;background:#f6f7f9;font-family:Inter,Arial,sans-serif;font-size:12px;color:#484A4C;">
      Tu clima, nuestra ingeniería. · siryc.cl
    </td></tr>
  </table>
</body></html>`;
}

export const notifyLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const resendKey = process.env.RESEND_API_KEY;
    if (!lovableKey || !resendKey) {
      console.error("notifyLead: missing LOVABLE_API_KEY or RESEND_API_KEY");
      return { sent: false as const };
    }

    const response = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": resendKey,
      },
      body: JSON.stringify({
        from: "SIRYC Web <no-reply@siryc.cl>",
        to: ["ventas@siryc.cl"],
        reply_to: data.email,
        subject: `Nuevo lead · ${data.tipo_servicio} · ${data.nombre}${data.empresa ? ` (${data.empresa})` : ""}`,
        html: buildHtml(data),
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`Resend request failed [${response.status}]: ${body}`);
      return { sent: false as const };
    }

    return { sent: true as const };
  });
