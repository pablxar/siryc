import { createFileRoute } from "@tanstack/react-router";
import { Check, X, Award, ShieldCheck, Zap } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { FadeIn } from "@/components/site/FadeIn";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros — SIRYC" },
      {
        name: "description",
        content:
          "Desde 2004 entregando ingeniería en refrigeración, climatización y electricidad. Conoce nuestra historia, equipo y certificaciones.",
      },
      { property: "og:title", content: "Nosotros — SIRYC" },
      { property: "og:description", content: "Más de 20 años de trayectoria técnica en Chile." },
    ],
    links: [{ rel: "canonical", href: "/nosotros" }],
  }),
  component: NosotrosPage,
});

const hitos = [
  { anio: "2004", texto: "Fundación como INGEMI. Primeros contratos de mantención en la V Región." },
  { anio: "2010", texto: "Expansión a proyectos corporativos y centros comerciales." },
  { anio: "2015", texto: "Certificación ISO 9001 y consolidación del equipo técnico." },
  { anio: "2018", texto: "Inicio del contrato de mantención con la Armada de Chile." },
  { anio: "2022", texto: "Evolución a SIRYC. Integración formal de la línea de electricidad." },
  { anio: "2026", texto: "Más de 250 proyectos ejecutados y contratos institucionales vigentes." },
];

const siRyc = [
  "Empresa de ingeniería con procedimientos documentados",
  "Equipo técnico capacitado y certificado",
  "Contratos de largo plazo con clientes institucionales",
  "Respuesta técnica con trazabilidad",
];
const noRyc = [
  "Servicio improvisado o sin registro",
  "Instalador sin ingeniería de respaldo",
  "Prestador ocasional sin continuidad",
  "Intervenciones sin documentación técnica",
];

const equipo = [
  { nombre: "Gerencia General", cargo: "Dirección estratégica y comercial" },
  { nombre: "Jefatura Técnica", cargo: "Ingeniería y especificación de proyectos" },
  { nombre: "Supervisión de Terreno", cargo: "Ejecución y control de obra" },
  { nombre: "Servicio al Cliente", cargo: "Contratos y postventa institucional" },
];

function NosotrosPage() {
  return (
    <div>
      <PageHero
        title="Nosotros"
        subtitle="Una empresa chilena de ingeniería con más de dos décadas de continuidad operativa."
      />

      {/* Historia */}
      <section className="bg-white py-20">
        <div className="container-siryc">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-siryc-blue)]">
              Nuestra historia
            </p>
            <h2 className="mb-12 max-w-2xl font-display text-3xl font-bold text-[color:var(--color-siryc-dark)] md:text-4xl">
              Desde 2004 sosteniendo la operación técnica de nuestros clientes.
            </h2>
          </FadeIn>
          <div className="relative border-l-2 border-[color:var(--color-siryc-blue)]/20 pl-8">
            {hitos.map((h, i) => (
              <FadeIn key={h.anio} delay={i * 0.05}>
                <div className="relative mb-8 last:mb-0">
                  <div className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--color-siryc-red)] ring-4 ring-white" />
                  <div className="font-display text-2xl font-bold text-[color:var(--color-siryc-blue)]">
                    {h.anio}
                  </div>
                  <p className="mt-1 text-[color:var(--color-siryc-gray)]">{h.texto}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Esencia */}
      <section className="bg-[color:var(--color-siryc-light)]/30 py-20">
        <div className="container-siryc">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-siryc-blue)]">
              Esencia
            </p>
            <h2 className="mb-10 font-display text-3xl font-bold text-[color:var(--color-siryc-dark)] md:text-4xl">
              Qué somos y qué no somos.
            </h2>
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-2">
            <FadeIn>
              <div className="h-full rounded-lg border-t-4 border-[color:var(--color-siryc-blue)] bg-white p-8">
                <h3 className="mb-5 font-display text-xl font-bold text-[color:var(--color-siryc-blue)]">
                  SIRYC es
                </h3>
                <ul className="space-y-3">
                  {siRyc.map((s) => (
                    <li key={s} className="flex items-start gap-3">
                      <Check size={18} className="mt-0.5 flex-shrink-0 text-[color:var(--color-siryc-blue)]" strokeWidth={3} />
                      <span className="text-[color:var(--color-siryc-dark)]">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="h-full rounded-lg border-t-4 border-[color:var(--color-siryc-red)] bg-white p-8">
                <h3 className="mb-5 font-display text-xl font-bold text-[color:var(--color-siryc-red)]">
                  SIRYC no es
                </h3>
                <ul className="space-y-3">
                  {noRyc.map((s) => (
                    <li key={s} className="flex items-start gap-3">
                      <X size={18} className="mt-0.5 flex-shrink-0 text-[color:var(--color-siryc-red)]" strokeWidth={3} />
                      <span className="text-[color:var(--color-siryc-dark)]">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Manifiesto */}
      <section className="bg-[color:var(--color-siryc-dark)] py-24 text-white">
        <div className="container-siryc max-w-3xl text-center">
          <div className="mx-auto mb-6 flex justify-center gap-1">
            <div className="h-[3px] w-12 bg-[color:var(--color-siryc-red)]" />
            <div className="h-[3px] w-12 bg-[color:var(--color-siryc-blue)]" />
          </div>
          <FadeIn>
            <p className="font-display text-2xl leading-relaxed md:text-3xl">
              Existen empresas que instalan equipos. Nosotros hacemos ingeniería.
              Documentamos cada intervención, dimensionamos cada instalación y
              respondemos por cada m² de operación. Más de dos décadas nos han
              enseñado que la continuidad no se improvisa: se planifica, se
              ejecuta y se mantiene.
            </p>
          </FadeIn>
          <p className="mt-8 font-display text-lg font-semibold text-[color:var(--color-siryc-red)]">
            Tu clima, nuestra ingeniería.
          </p>
        </div>
      </section>

      {/* Equipo */}
      <section className="bg-white py-20">
        <div className="container-siryc">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-siryc-blue)]">
              Equipo
            </p>
            <h2 className="mb-10 font-display text-3xl font-bold text-[color:var(--color-siryc-dark)] md:text-4xl">
              Estructura técnica y operacional.
            </h2>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {equipo.map((m, i) => (
              <FadeIn key={m.nombre} delay={i * 0.08}>
                <div className="rounded-lg border border-black/5 p-6 text-center">
                  <div className="mx-auto h-20 w-20 rounded-full bg-[color:var(--color-siryc-light)]/40" />
                  <h3 className="mt-4 font-display font-semibold text-[color:var(--color-siryc-dark)]">
                    {m.nombre}
                  </h3>
                  <p className="mt-1 text-xs text-[color:var(--color-siryc-gray)]">{m.cargo}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Certificaciones */}
      <section className="bg-[color:var(--color-siryc-light)]/30 py-20">
        <div className="container-siryc">
          <FadeIn>
            <h2 className="mb-10 font-display text-3xl font-bold text-[color:var(--color-siryc-dark)] md:text-4xl">
              Certificaciones y normativa
            </h2>
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Award, t: "ISO 9001:2015", d: "Gestión de calidad en procesos técnicos y de servicio." },
              { icon: Zap, t: "SEC — Instalaciones eléctricas", d: "Cumplimiento normativo en obras eléctricas." },
              { icon: ShieldCheck, t: "Refrigerantes", d: "Manejo conforme a normativa chilena y Protocolo de Montreal." },
            ].map(({ icon: Icon, t, d }, i) => (
              <FadeIn key={t} delay={i * 0.08}>
                <div className="rounded-lg bg-white p-6">
                  <Icon className="text-[color:var(--color-siryc-blue)]" size={28} />
                  <h3 className="mt-4 font-display font-semibold text-[color:var(--color-siryc-dark)]">{t}</h3>
                  <p className="mt-2 text-sm text-[color:var(--color-siryc-gray)]">{d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
