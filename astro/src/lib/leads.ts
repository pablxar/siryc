// Lead del formulario de contacto: opciones, validación (las mismas reglas que la política RLS de `leads`)
// y el correo de aviso a ventas. Se usa en el servidor (/api/contacto) y las opciones también en la página.

export const SERVICIOS = [
  { id: "refrigeracion", texto: "Refrigeración" },
  { id: "climatizacion", texto: "Climatización" },
  { id: "electricidad", texto: "Electricidad" },
  { id: "mantencion", texto: "Mantención" },
  { id: "integral", texto: "Proyecto integral" },
] as const;

export const SECTORES = [
  { id: "corporativo", texto: "Corporativo" },
  { id: "gobierno", texto: "Gobierno / FFAA" },
  { id: "educacion", texto: "Educación" },
  { id: "centro_comercial", texto: "Centro comercial" },
  { id: "otro", texto: "Otro" },
] as const;

export type Lead = {
  nombre: string;
  empresa: string | null;
  cargo: string | null;
  email: string;
  telefono: string | null;
  tipo_servicio: string;
  segmento: string;
  mensaje: string | null;
  origen_pagina: string | null;
};

export type Errores = Partial<Record<keyof Lead, string>>;

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const texto = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");
const opcional = (v: string) => v || null;

/** Lee y valida el formulario. Guarda los textos visibles (no los id) como hacía el sitio anterior. */
export function leerLead(datos: FormData): { lead?: Lead; errores: Errores } {
  const servicio = SERVICIOS.find((s) => s.id === texto(datos.get("tipo_servicio")));
  const sector = SECTORES.find((s) => s.id === texto(datos.get("segmento")));
  const lead: Lead = {
    nombre: texto(datos.get("nombre")),
    empresa: opcional(texto(datos.get("empresa"))),
    cargo: opcional(texto(datos.get("cargo"))),
    email: texto(datos.get("email")),
    telefono: opcional(texto(datos.get("telefono"))),
    tipo_servicio: servicio?.texto ?? "",
    segmento: sector?.texto ?? "",
    mensaje: opcional(texto(datos.get("mensaje"))),
    origen_pagina: opcional(texto(datos.get("origen_pagina")).slice(0, 200)),
  };

  const errores: Errores = {};
  if (lead.nombre.length < 2 || lead.nombre.length > 120) errores.nombre = "Escribe tu nombre.";
  if (!EMAIL.test(lead.email) || lead.email.length < 5 || lead.email.length > 200) errores.email = "Revisa el correo: falta algo.";
  if ((lead.empresa?.length ?? 0) > 200) errores.empresa = "Máximo 200 caracteres.";
  if ((lead.cargo?.length ?? 0) > 120) errores.cargo = "Máximo 120 caracteres.";
  if ((lead.telefono?.length ?? 0) > 40) errores.telefono = "Máximo 40 caracteres.";
  if (!servicio) errores.tipo_servicio = "Elige el tipo de servicio.";
  if (!sector) errores.segmento = "Elige el sector.";
  if ((lead.mensaje?.length ?? 0) > 2000) errores.mensaje = "Máximo 2.000 caracteres.";

  return Object.keys(errores).length ? { errores } : { lead, errores };
}

const esc = (v?: string | null) =>
  (v ?? "—").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Correo a ventas con la marca: papel, tinta, azul y el filete partido (sin blanco puro ni esquinas redondas). */
export function correoLead(lead: Lead) {
  const fila = (rotulo: string, valor?: string | null) => `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #e3e7ea;font-family:Inter,Arial,sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#5e6670;width:170px;">${esc(rotulo)}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #e3e7ea;font-family:Inter,Arial,sans-serif;font-size:14px;color:#1b232c;">${esc(valor)}</td>
    </tr>`;
  return `<!doctype html>
<html lang="es"><body style="margin:0;background:#eef0f2;padding:24px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#f6f7f8;">
    <tr><td style="background:#14398e;padding:28px 24px;">
      <div style="font-family:Inter,Arial,sans-serif;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:#b0bec5;">SIRYC · Nueva solicitud</div>
      <div style="margin-top:8px;font-family:Inter,Arial,sans-serif;font-size:24px;font-weight:700;color:#eef0f2;">${esc(lead.nombre)}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:12px;"><tr>
        <td style="width:28px;height:3px;background:#e30613;font-size:0;line-height:0;">&nbsp;</td>
        <td style="width:6px;font-size:0;line-height:0;">&nbsp;</td>
        <td style="width:28px;height:3px;background:#eef0f2;font-size:0;line-height:0;">&nbsp;</td>
      </tr></table>
    </td></tr>
    <tr><td>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${fila("Empresa", lead.empresa)}
        ${fila("Cargo", lead.cargo)}
        ${fila("Email", lead.email)}
        ${fila("Teléfono", lead.telefono)}
        ${fila("Tipo de servicio", lead.tipo_servicio)}
        ${fila("Sector", lead.segmento)}
        ${fila("Origen", lead.origen_pagina)}
      </table>
    </td></tr>
    <tr><td style="padding:20px 16px;">
      <div style="font-family:Inter,Arial,sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#5e6670;">Detalle del requerimiento</div>
      <div style="margin-top:8px;font-family:Inter,Arial,sans-serif;font-size:14px;line-height:1.6;color:#1b232c;white-space:pre-wrap;">${esc(lead.mensaje)}</div>
    </td></tr>
    <tr><td style="padding:18px 16px;background:#1b232c;font-family:Inter,Arial,sans-serif;font-size:12px;color:#b0bec5;">
      Tu clima, nuestra ingeniería. · siryc.cl
    </td></tr>
  </table>
</body></html>`;
}
