import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { EditorialHero } from "@/components/site/EditorialHero";
import { SectionMarker } from "@/components/site/Parallax";
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
          "Solicita cotización técnica a SIRYC. Refrigeración, climatización, electricidad industrial y contratos de mantención en Chile.",
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
  segmento: z.string().min(1, "Selecciona un segmento"),
  mensaje: z.string().trim().max(2000).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

const servicioMap: Record<string, string> = {
  refrigeracion: "Refrigeración",
  climatizacion: "Climatización",
  electricidad: "Electricidad",
};

function ContactoPage() {
  const { servicio } = Route.useSearch();
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      tipo_servicio: servicio ? servicioMap[servicio] ?? "" : "",
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
    <div>
      <EditorialHero
        index="01"
        eyebrow="Contacto"
        title="Hablemos de tu operación."
        subtitle="Solicita una cotización técnica documentada. Nuestro equipo evalúa tu instalación y entrega una propuesta."
      >
        <div className="mt-6 flex items-center gap-3">
          <div className="h-[3px] w-10 bg-[color:var(--color-siryc-red)]" />
          <p className="font-display text-lg font-semibold text-[color:var(--color-siryc-red)]">
            Tu clima, nuestra ingeniería.
          </p>
        </div>
      </EditorialHero>

      <section className="bg-white py-20">
        <div className="container-siryc">
          <SectionMarker index="02" label="Solicitud" />
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <FadeIn>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_30px_80px_-30px_rgba(20,57,142,0.25)] md:p-12"
              >
                <div className="mb-8 flex items-center gap-3">
                  <div className="h-[3px] w-8 bg-[color:var(--color-siryc-blue)]" />
                  <h2 className="font-display text-2xl font-bold text-[color:var(--color-siryc-dark)] md:text-3xl">
                    Solicitud de cotización
                  </h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Nombre completo *" error={errors.nombre?.message}>
                    <input {...register("nombre")} className={inputCls} />
                  </Field>
                  <Field label="Empresa / Institución" error={errors.empresa?.message}>
                    <input {...register("empresa")} className={inputCls} />
                  </Field>
                  <Field label="Cargo" error={errors.cargo?.message}>
                    <input {...register("cargo")} className={inputCls} />
                  </Field>
                  <Field label="Email *" error={errors.email?.message}>
                    <input type="email" {...register("email")} className={inputCls} />
                  </Field>
                  <Field label="Teléfono" error={errors.telefono?.message}>
                    <input {...register("telefono")} className={inputCls} />
                  </Field>
                  <Field label="Tipo de servicio *" error={errors.tipo_servicio?.message}>
                    <select {...register("tipo_servicio")} className={inputCls}>
                      <option value="">Selecciona…</option>
                      <option>Refrigeración</option>
                      <option>Climatización</option>
                      <option>Electricidad</option>
                      <option>Mantención</option>
                      <option>Proyecto integral</option>
                    </select>
                  </Field>
                  <Field label="Segmento *" error={errors.segmento?.message} className="md:col-span-2">
                    <select {...register("segmento")} className={inputCls}>
                      <option value="">Selecciona…</option>
                      <option>Corporativo</option>
                      <option>Gobierno / FFAA</option>
                      <option>Educación</option>
                      <option>Otro</option>
                    </select>
                  </Field>
                  <Field label="Detalle del requerimiento" error={errors.mensaje?.message} className="md:col-span-2">
                    <textarea rows={5} {...register("mensaje")} className={inputCls} />
                  </Field>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[color:var(--color-siryc-red)] px-8 py-4 text-sm font-semibold text-white shadow-[0_15px_40px_-15px_rgba(227,6,19,0.55)] transition-all hover:shadow-[0_20px_50px_-15px_rgba(227,6,19,0.7)] disabled:opacity-50"
                >
                  {isSubmitting ? "Enviando…" : "Enviar solicitud"}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
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
                <div className="relative overflow-hidden rounded-3xl bg-[color:var(--color-siryc-dark)] p-8 text-white shadow-[0_30px_80px_-30px_rgba(27,35,44,0.6)]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at center, #ffffff 1px, transparent 1px)",
                      backgroundSize: "18px 18px",
                    }}
                  />
                  <div className="relative">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="h-[3px] w-8 bg-[color:var(--color-siryc-red)]" />
                      <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">
                        Directo
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold">Contáctanos</h3>
                    <ul className="mt-6 space-y-4 text-sm text-white/85">
                      <ContactRow icon={Phone} label="Teléfono" value="+56 32 000 0000" />
                      <ContactRow icon={Mail} label="Email" value="contacto@siryc.cl" />
                      <ContactRow icon={MapPin} label="Ubicación" value="V Región, Chile" />
                      <ContactRow icon={Clock} label="Horario" value="Lun a Vie · 08:30 – 18:00" />
                    </ul>
                  </div>
                </div>

                <div className="overflow-hidden rounded-3xl border border-black/5 shadow-lg">
                  <iframe
                    title="Ubicación SIRYC"
                    src="https://www.google.com/maps?q=Valpara%C3%ADso,+Chile&output=embed"
                    className="aspect-[4/3] w-full"
                    loading="lazy"
                  />
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
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[color:var(--color-siryc-dark)] outline-none transition-all focus:border-[color:var(--color-siryc-blue)] focus:ring-4 focus:ring-[color:var(--color-siryc-blue)]/10";

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-siryc-gray)]">
        {label}
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
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-start gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
      <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
        <Icon size={15} />
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">
          {label}
        </div>
        <div className="mt-0.5 text-sm text-white">{value}</div>
      </div>
    </li>
  );
}
