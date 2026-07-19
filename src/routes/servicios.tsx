import { createFileRoute, Link } from "@tanstack/react-router";
import { Snowflake, Wind, Zap, ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { FadeIn } from "@/components/site/FadeIn";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — Refrigeración, climatización y electricidad | SIRYC" },
      {
        name: "description",
        content:
          "Refrigeración industrial, climatización, sistemas VRF, electricidad industrial y contratos de mantención para clientes corporativos e institucionales.",
      },
      { property: "og:title", content: "Servicios — SIRYC" },
      { property: "og:description", content: "Tres líneas técnicas para operaciones exigentes." },
    ],
    links: [{ rel: "canonical", href: "/servicios" }],
  }),
  component: ServiciosPage,
});

const servicios = [
  {
    id: "refrigeracion",
    icon: Snowflake,
    titulo: "Refrigeración industrial",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80",
    items: [
      "Mantención preventiva y correctiva",
      "Cambio de compresores y componentes críticos",
      "Reparación de fugas de refrigerante",
      "Plantas de agua fría (chillers)",
      "Sistemas para data centers y salas eléctricas",
      "Migración a refrigerantes ecológicos",
    ],
  },
  {
    id: "climatizacion",
    icon: Wind,
    titulo: "Climatización y aire acondicionado",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&q=80",
    items: [
      "Instalación residencial y comercial",
      "Sistemas VRF de volumen variable",
      "Proyectos llave en mano",
      "Climatización de centros comerciales y oficinas",
      "Sistemas de ventilación industrial",
      "Control de calidad de aire interior",
    ],
  },
  {
    id: "electricidad",
    icon: Zap,
    titulo: "Electricidad industrial",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    items: [
      "Instalaciones eléctricas industriales y comerciales",
      "Sistemas de control centralizado",
      "Tableros y paneles de distribución",
      "Mantención eléctrica preventiva",
      "Cumplimiento normativa SEC",
    ],
  },
];

function ServiciosPage() {
  return (
    <div>
      <PageHero
        title="Servicios"
        subtitle="Tres líneas técnicas integradas bajo una misma ingeniería, con procedimientos documentados y personal certificado."
      />

      {servicios.map((s, idx) => (
        <section
          key={s.id}
          id={s.id}
          className={idx % 2 === 0 ? "bg-white py-20" : "bg-[color:var(--color-siryc-light)]/30 py-20"}
        >
          <div className="container-siryc">
            <div
              className={`grid items-center gap-12 md:grid-cols-2 ${
                idx % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <FadeIn>
                <img
                  src={s.img}
                  alt={s.titulo}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-lg object-cover shadow-lg"
                />
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-[color:var(--color-siryc-blue)] text-white">
                  <s.icon size={22} />
                </div>
                <h2 className="font-display text-3xl font-bold text-[color:var(--color-siryc-dark)] md:text-4xl">
                  {s.titulo}
                </h2>
                <ul className="mt-6 space-y-2.5">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-3">
                      <Check size={16} strokeWidth={3} className="mt-1 flex-shrink-0 text-[color:var(--color-siryc-blue)]" />
                      <span className="text-[color:var(--color-siryc-dark)]">{it}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contacto"
                  search={{ servicio: s.id }}
                  className="mt-8 inline-flex items-center gap-2 rounded-md bg-[color:var(--color-siryc-red)] px-5 py-3 text-sm font-semibold text-white"
                >
                  Solicitar cotización de {s.titulo.toLowerCase()} <ArrowRight size={16} />
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-[color:var(--color-siryc-dark)] py-20 text-white">
        <div className="container-siryc max-w-3xl">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-siryc-red)]">
              Modalidad institucional
            </p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Contratos de mantención
            </h2>
            <p className="mt-5 text-white/80">
              Modalidad de contrato anual o semestral con visitas técnicas
              programadas, informes documentados y respuesta técnica
              garantizada. Dirigido a clientes corporativos, gobierno,
              instituciones educacionales y Fuerzas Armadas.
            </p>
            <Link
              to="/contacto"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-[color:var(--color-siryc-red)] px-6 py-3 text-sm font-semibold"
            >
              Solicitar propuesta de contrato <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
