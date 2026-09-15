import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { notifyLead } from "@/lib/leads.functions";

import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { FadeIn } from "@/components/site/FadeIn";

type ContactoSearch = { servicio?: string };

export const Route = createFileRoute("/contacto")({
  validateSearch: (search): ContactoSearch => ({
    servicio: typeof search.servicio === "string" ? search.servicio : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contacto — Solicita cotización | SIRYC" },
      {
        name: "description",
        content:
          "Solicita cotización técnica a SIRYC. Refrigeración, climatización, electricidad industrial y contratos de mantención en la Región de Valparaíso, Chile.",
      },
      { property: "og:title", content: "Contacto — SIRYC" },
      { property: "og:description", content: "Tu clima, nuestra ingeniería." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: ContactoPage,
});

const schema = z.object({
  nombre: z.string().trim().min(2, "Ingresa tu nombre").max(120),
  empresa: z.string().trim().max(200).optional().or(z.literal("")),
  cargo: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Email inválido").max(200),
  telefono: z.string().trim().max(40).optional().or(z.literal("")),
  tipo_servicio: z.string().min(1, "Selecciona un servicio"),
  segmento: z.string().min(1, "Selecciona un sector"),
  mensaje: z.string().trim().max(2000).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

const servicioMap: Record<string, string> = {
  refrigeracion: "Refrigeración",
  climatizacion: "Climatización",
  electricidad: "Electricidad",
};

/** Encuadre que cubre toda la Región de Valparaíso (V Región), no solo la ciudad. */
const MAPA_V_REGION =
  "https://www.google.com/maps?q=Regi%C3%B3n+de+Valpara%C3%ADso,+Chile&z=8&output=embed";
const MAPA_V_REGION_LINK = "https://www.google.com/maps/place/Regi%C3%B3n+de+Valpara%C3%ADso,+Chile";

function ContactoPage() {
  const { servicio } = Route.useSearch();
  const [sent, setSent] = useState(false);
  const sendLeadNotification = useServerFn(notifyLead);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      tipo_servicio: servicio ? (servicioMap[servicio] ?? "") : "",
      segmento: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const origen_pagina = typeof window !== "undefined" ? window.location.pathname : null;
    const { error } = await supabase.from("leads").insert({
      nombre: values.nombre,
      empresa: values.empresa || null,
      cargo: values.cargo || null,
      email: values.email,
      telefono: values.telefono || null,
      tipo_servicio: values.tipo_servicio,
      segmento: values.segmento,
      mensaje: values.mensaje || null,
      origen_pagina,
    });
    if (error) {
      toast.error("No pudimos enviar tu solicitud. Intenta nuevamente.");
      return;
    }
    try {
      await sendLeadNotification({
        data: {
          nombre: values.nombre,
          empresa: values.empresa || null,
          cargo: values.cargo || null,
          email: values.email,
          telefono: values.telefono || null,
          tipo_servicio: values.tipo_servicio,
          segmento: values.segmento,
          mensaje: values.mensaje || null,
          origen_pagina,
        },
      });
    } catch {
      // El lead ya quedó registrado; la notificación no bloquea al usuario.
    }
    setSent(true);
    reset();
    toast.success("Solicitud enviada. Te contactaremos a la brevedad.");
  };

  return (
    <div className="bg-[#f6f7f9]">
      {/* Portada clara */}
      <section className="relative overflow-hidden bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-siryc-blue) 1px, transparent 1px), linear-gradient(to bottom, var(--color-siryc-blue) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(90% 80% at 80% 40%, #000 20%, transparent 80%)",
          }}
        />
        <div className="container-siryc relative pb-14 pt-28 md:pb-16 md:pt-32">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[3px] w-8 bg-[color:var(--color-siryc-red)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-siryc-gray)]">
              Contacto / SIRYC
            </span>
          </div>
          <h1 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-bold leading-[1.03] tracking-tight text-[color:var(--color-siryc-dark)]">
            Hablemos de tu operación.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--color-siryc-gray)]">
            Cuéntanos qué necesita tu instalación y nuestro equipo revisará tu requerimiento.
          </p>
        </div>
      </section>

      {/* Formulario + contacto directo */}
      <section className="pb-20 pt-10 md:pt-12">
        <div className="container-siryc">
          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            <FadeIn>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_30px_80px_-45px_rgba(20,57,142,0.35)] md:p-10"
              >
                <div className="flex items-center gap-3">
                  <div className="h-[3px] w-8 bg-[color:var(--color-siryc-red)]" />
                  <h2 className="font-display text-2xl font-bold text-[color:var(--color-siryc-dark)] md:text-3xl">
                    Solicitud de cotización
                  </h2>
                </div>
                <p className="mb-8 mt-2 text-sm text-[color:var(--color-siryc-gray)]">
                  Los campos con <span className="text-[color:var(--color-siryc-red)]">*</span> son obligatorios.
                </p>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Nombre completo" required error={errors.nombre?.message}>
                    <input
                      {...register("nombre")}
                      placeholder="Ingresa tu nombre completo"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Email" required error={errors.email?.message}>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Ingresa tu email"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Empresa / institución" error={errors.empresa?.message}>
                    <input
                      {...register("empresa")}
                      placeholder="Nombre de tu empresa o institución"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Cargo" error={errors.cargo?.message}>
                    <input {...register("cargo")} placeholder="Tu cargo" className={inputCls} />
                  </Field>
                  <Field label="Teléfono" error={errors.telefono?.message}>
                    <input
                      {...register("telefono")}
                      placeholder="Ingresa tu teléfono"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Tipo de servicio" required error={errors.tipo_servicio?.message}>
                    <select {...register("tipo_servicio")} className={inputCls}>
                      <option value="">Selecciona un servicio</option>
                      <option>Refrigeración</option>
                      <option>Climatización</option>
                      <option>Electricidad</option>
                      <option>Mantención</option>
                      <option>Proyecto integral</option>
                    </select>
                  </Field>
                  <Field label="Sector" required error={errors.segmento?.message} className="md:col-span-2">
                    <select {...register("segmento")} className={inputCls}>
                      <option value="">Selecciona un sector</option>
                      <option>Corporativo</option>
                      <option>Gobierno / FFAA</option>
                      <option>Educación</option>
                      <option>Otro</option>
                    </select>
                  </Field>
                  <Field label="Detalle del requerimiento" error={errors.mensaje?.message} className="md:col-span-2">
                    <textarea
                      rows={5}
                      {...register("mensaje")}
                      placeholder="Describe el servicio y dónde se necesita."
                      className={inputCls}
                    />
                  </Field>
                </div>

                <p className="mt-6 text-xs text-[color:var(--color-siryc-gray)]">
                  Usaremos tus datos para responder esta solicitud.{" "}
                  <Link
                    to="/privacidad"
                    className="font-semibold text-[color:var(--color-siryc-blue)] underline underline-offset-4"
                  >
                    Política de privacidad
                  </Link>
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-siryc-blue)] px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_45px_-18px_rgba(20,57,142,0.75)] transition-all hover:brightness-110 disabled:opacity-50"
                >
                  {isSubmitting ? "Enviando…" : "Enviar solicitud"}
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </button>
                {sent && (
                  <p className="mt-5 text-sm text-[color:var(--color-siryc-blue)]">
                    Recibimos tu solicitud. Te contactaremos a la brevedad.
                  </p>
                )}
              </form>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-6">
                <div className="relative overflow-hidden rounded-3xl bg-[color:var(--color-siryc-dark)] p-7 text-white shadow-[0_30px_80px_-40px_rgba(27,35,44,0.7)] md:p-9">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: "radial-gradient(circle at center, #ffffff 1px, transparent 1px)",
                      backgroundSize: "18px 18px",
                    }}
                  />
                  <div className="relative">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="h-[3px] w-8 bg-[color:var(--color-siryc-red)]" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/60">
                        Contacto directo
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold leading-tight md:text-3xl">
                      También puedes escribirnos.
                    </h3>
                    <ul className="mt-7 space-y-1">
                      <ContactRow
                        icon={Mail}
                        label="Email"
                        value="ventas@siryc.cl"
                        href="mailto:ventas@siryc.cl"
                      />
                      <ContactRow icon={MapPin} label="Ubicación" value="V Región, Chile" />
                      <ContactRow icon={Clock} label="Horario de atención" value="Lun a vie · 08:30–18:00" />
                    </ul>
                    <div className="mt-7 border-t border-white/10 pt-5 text-sm text-white/70">
                      Tu clima, nuestra ingeniería.
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_25px_60px_-40px_rgba(27,35,44,0.6)]">
                  <iframe
                    title="Región de Valparaíso, Chile — zona de operación SIRYC"
                    src={MAPA_V_REGION}
                    className="aspect-[4/3] w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="flex items-center justify-between gap-4 px-5 py-4">
                    <span className="text-sm font-semibold text-[color:var(--color-siryc-dark)]">
                      Región de Valparaíso, Chile
                    </span>
                    <a
                      href={MAPA_V_REGION_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--color-siryc-blue)]"
                    >
                      Ver ubicación
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[color:var(--color-siryc-dark)] outline-none transition-all placeholder:text-black/35 focus:border-[color:var(--color-siryc-blue)] focus:ring-4 focus:ring-[color:var(--color-siryc-blue)]/10";

function Field({
  label,
  required,
  error,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-2 block text-sm font-medium text-[color:var(--color-siryc-dark)]">
        {label} {required && <span className="text-[color:var(--color-siryc-red)]">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-[color:var(--color-siryc-red)]">{error}</span>}
    </label>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <li className="flex items-center gap-4 border-b border-white/10 py-4 last:border-0">
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5">
        <Icon size={17} />
      </div>
      <div>
        <div className="text-xs text-white/50">{label}</div>
        {href ? (
          <a
            href={href}
            className="mt-0.5 inline-flex items-center gap-1 text-base font-semibold text-white hover:text-white/80"
          >
            {value}
            <ArrowUpRight size={14} />
          </a>
        ) : (
          <div className="mt-0.5 text-base font-semibold text-white">{value}</div>
        )}
      </div>
    </li>
  );
}
