import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
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
    const { error } = await supabase.from("leads").insert({
      nombre: values.nombre,
      empresa: values.empresa || null,
      cargo: values.cargo || null,
      email: values.email,
      telefono: values.telefono || null,
      tipo_servicio: values.tipo_servicio,
      segmento: values.segmento,
      mensaje: values.mensaje || null,
      origen_pagina: typeof window !== "undefined" ? window.location.pathname : null,
    });
    if (error) {
      toast.error("No pudimos enviar tu solicitud. Intenta nuevamente.");
      return;
    }
    setSent(true);
    reset();
    toast.success("Solicitud enviada. Te contactaremos a la brevedad.");
  };

  return (
    <div>
      <PageHero
        title="Contacto"
        subtitle="Solicita una cotización técnica documentada. Nuestro equipo evalúa tu instalación y entrega una propuesta."
      >
        <p className="mt-6 font-display text-lg font-semibold text-[color:var(--color-siryc-red)]">
          Tu clima, nuestra ingeniería.
        </p>
      </PageHero>

      <section className="bg-white py-16">
        <div className="container-siryc grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <FadeIn>
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg border border-black/5 bg-white p-6 md:p-8">
              <h2 className="mb-6 font-display text-2xl font-bold text-[color:var(--color-siryc-dark)]">
                Solicitud de cotización
              </h2>
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
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-[color:var(--color-siryc-red)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting ? "Enviando…" : "Enviar solicitud"}
              </button>
              {sent && (
                <p className="mt-4 text-sm text-[color:var(--color-siryc-blue)]">
                  Recibimos tu solicitud. Te contactaremos a la brevedad.
                </p>
              )}
            </form>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-6">
              <div className="rounded-lg bg-[color:var(--color-siryc-dark)] p-6 text-white">
                <h3 className="font-display text-lg font-semibold">Contacto directo</h3>
                <ul className="mt-4 space-y-3 text-sm text-white/85">
                  <li className="flex items-start gap-2"><Phone size={16} className="mt-0.5" /> +56 32 000 0000</li>
                  <li className="flex items-start gap-2"><Mail size={16} className="mt-0.5" /> contacto@siryc.cl</li>
                  <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5" /> V Región, Chile</li>
                  <li className="flex items-start gap-2"><Clock size={16} className="mt-0.5" /> Lun a Vie · 08:30 – 18:00</li>
                </ul>
              </div>

              <div className="overflow-hidden rounded-lg border border-black/5">
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
      </section>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-black/10 bg-white px-3 py-2.5 text-sm text-[color:var(--color-siryc-dark)] outline-none transition-colors focus:border-[color:var(--color-siryc-blue)] focus:ring-2 focus:ring-[color:var(--color-siryc-blue)]/20";

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
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[color:var(--color-siryc-gray)]">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-[color:var(--color-siryc-red)]">{error}</span>}
    </label>
  );
}
