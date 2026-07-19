import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { FadeIn } from "@/components/site/FadeIn";
import { Quote } from "lucide-react";

export const Route = createFileRoute("/clientes")({
  head: () => ({
    meta: [
      { title: "Clientes e instituciones — SIRYC" },
      {
        name: "description",
        content:
          "Centros comerciales, edificios corporativos, instituciones educacionales y la Armada de Chile confían en SIRYC.",
      },
      { property: "og:title", content: "Clientes — SIRYC" },
      { property: "og:description", content: "Confianza institucional de largo plazo." },
    ],
    links: [{ rel: "canonical", href: "/clientes" }],
  }),
  component: ClientesPage,
});

const segmentos = [
  { titulo: "Corporativo", clientes: ["Grupo Corporativo Regional", "Edificio Corporativo", "Oficinas Ejecutivas", "Corporación Regional"] },
  { titulo: "Gobierno y Fuerzas Armadas", clientes: ["Armada de Chile", "Institución Pública", "Organismo Estatal"] },
  { titulo: "Educación", clientes: ["Colegio V Región", "Establecimiento Educacional", "Instituto Técnico"] },
  { titulo: "Centros comerciales", clientes: ["Centro Comercial V Región", "Mall Regional", "Retail Corporativo"] },
];

const testimonios = [
  { quote: "SIRYC lleva más de cinco años sosteniendo la operación de nuestra climatización. Los informes técnicos son claros y los plazos se cumplen.", nombre: "Administración de Edificio", cargo: "Gerente de operaciones", empresa: "Edificio corporativo V Región" },
  { quote: "El contrato de mantención con SIRYC nos entrega trazabilidad completa de cada intervención. Es lo que necesita una institución.", nombre: "Jefatura Técnica", cargo: "Encargado de infraestructura", empresa: "Institución educacional" },
];

function ClientesPage() {
  return (
    <div>
      <PageHero
        title="Clientes e instituciones"
        subtitle="Empresas y organismos que confían en SIRYC para sostener su operación técnica."
      />

      {segmentos.map((seg, i) => (
        <section key={seg.titulo} className={i % 2 === 0 ? "bg-white py-16" : "bg-[color:var(--color-siryc-light)]/25 py-16"}>
          <div className="container-siryc">
            <FadeIn>
              <h2 className="mb-8 font-display text-2xl font-bold text-[color:var(--color-siryc-dark)] md:text-3xl">
                {seg.titulo}
              </h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {seg.clientes.map((c) => (
                  <div
                    key={c}
                    className="flex aspect-[3/2] items-center justify-center rounded-md border border-black/5 bg-white p-4 text-center text-[10px] font-semibold uppercase tracking-wider text-[color:var(--color-siryc-gray)]"
                  >
                    {c}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      ))}

      <section className="bg-[color:var(--color-siryc-dark)] py-20 text-white">
        <div className="container-siryc max-w-3xl">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-siryc-red)]">
              Confianza institucional
            </p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Armada de Chile
            </h2>
            <p className="mt-4 text-white/80">
              Desde 2018 mantenemos contrato vigente con la Armada de Chile para
              la mantención preventiva y correctiva de sistemas de climatización
              y refrigeración en instalaciones institucionales. Una relación de
              largo plazo que refleja el estándar técnico y la continuidad
              operativa que exige el sector.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-siryc">
          <FadeIn>
            <h2 className="mb-10 font-display text-3xl font-bold text-[color:var(--color-siryc-dark)] md:text-4xl">
              Lo que dicen nuestros clientes
            </h2>
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonios.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="h-full rounded-lg border border-black/5 bg-[color:var(--color-siryc-light)]/25 p-8">
                  <Quote className="text-[color:var(--color-siryc-blue)]" />
                  <p className="mt-4 text-[color:var(--color-siryc-dark)]">"{t.quote}"</p>
                  <div className="mt-6 border-t border-black/10 pt-4">
                    <div className="font-semibold text-[color:var(--color-siryc-dark)]">{t.nombre}</div>
                    <div className="text-sm text-[color:var(--color-siryc-gray)]">{t.cargo} — {t.empresa}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
