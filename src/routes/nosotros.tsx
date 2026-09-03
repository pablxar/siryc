import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, X, Award, ShieldCheck, Zap } from "lucide-react";
import { EditorialHero } from "@/components/site/EditorialHero";
import { SectionMarker } from "@/components/site/Parallax";
import { FadeIn, RevealGroup, RevealItem } from "@/components/site/FadeIn";
import { WordReveal } from "@/components/site/WordReveal";
import { KineticMarquee } from "@/components/site/KineticMarquee";
import bannerWeb from "@/assets/banner-web-siryc.png.asset.json";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
      <EditorialHero
        index="01"
        eyebrow="Sobre SIRYC"
        title="Dos décadas sosteniendo la operación técnica."
        subtitle="Una empresa chilena de ingeniería que documenta cada intervención, dimensiona cada instalación y responde por cada m² de operación."
        image={bannerWeb.url}
      >
        <div className="grid grid-cols-3 gap-6 text-white/60 md:gap-8">
          {[
            { v: "20+", l: "Años" },
            { v: "250+", l: "Proyectos" },
            { v: "ISO", l: "9001:2015" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-2xl font-bold text-white md:text-3xl">{s.v}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em]">{s.l}</div>
            </div>
          ))}
        </div>
      </EditorialHero>

      <KineticMarquee
        items={["Trazabilidad", "Ingeniería", "Continuidad operativa", "Norma SEC", "ISO 9001"]}
        tone="dark"
        direction={-1}
      />

      {/* Historia — sticky scrollytelling */}
      <TimelineSection />

      {/* Esencia */}
      <section className="bg-[color:var(--color-siryc-light)]/25 py-24">
        <div className="container-siryc">
          <SectionMarker index="03" label="Esencia" />
          <FadeIn>
            <h2 className="mb-12 max-w-3xl font-display text-4xl font-bold leading-tight text-[color:var(--color-siryc-dark)] md:text-5xl">
              Qué somos <span className="text-[color:var(--color-siryc-blue)]">y qué no somos.</span>
            </h2>
          </FadeIn>
          <RevealGroup inView className="grid gap-6 md:grid-cols-2">
            <RevealItem>
              <div className="h-full rounded-3xl border border-black/5 bg-white p-10 shadow-[0_20px_60px_-30px_rgba(20,57,142,0.35)]">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-[3px] w-10 bg-[color:var(--color-siryc-blue)]" />
                  <h3 className="font-display text-2xl font-bold text-[color:var(--color-siryc-blue)]">
                    SIRYC es
                  </h3>
                </div>
                <ul className="space-y-4">
                  {siRyc.map((s) => (
                    <li key={s} className="flex items-start gap-3">
                      <Check size={18} className="mt-1 flex-shrink-0 text-[color:var(--color-siryc-blue)]" strokeWidth={3} />
                      <span className="text-[color:var(--color-siryc-dark)]">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
            <RevealItem>
              <div className="h-full rounded-3xl border border-black/5 bg-white p-10 shadow-[0_20px_60px_-30px_rgba(227,6,19,0.25)]">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-[3px] w-10 bg-[color:var(--color-siryc-red)]" />
                  <h3 className="font-display text-2xl font-bold text-[color:var(--color-siryc-red)]">
                    SIRYC no es
                  </h3>
                </div>
                <ul className="space-y-4">
                  {noRyc.map((s) => (
                    <li key={s} className="flex items-start gap-3">
                      <X size={18} className="mt-1 flex-shrink-0 text-[color:var(--color-siryc-red)]" strokeWidth={3} />
                      <span className="text-[color:var(--color-siryc-dark)]">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Manifiesto */}
      <ManifestoSection />

      {/* Equipo */}
      <section className="bg-white py-24">
        <div className="container-siryc">
          <SectionMarker index="05" label="Equipo" />
          <FadeIn>
            <WordReveal
              text="Estructura técnica y operacional."
              className="mb-12 max-w-3xl font-display text-4xl font-bold text-[color:var(--color-siryc-dark)] md:text-5xl"
            />
          </FadeIn>
          <RevealGroup inView className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {equipo.map((m) => (
              <RevealItem key={m.nombre}>
                <div className="group h-full rounded-2xl border border-black/5 bg-white p-8 transition-all hover:border-[color:var(--color-siryc-blue)]/30 hover:shadow-[0_20px_50px_-25px_rgba(20,57,142,0.35)]">
                  <div className="relative mx-auto h-24 w-24">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[color:var(--color-siryc-blue)]/20 to-[color:var(--color-siryc-light)]/20" />
                    <div className="absolute inset-2 rounded-full bg-[color:var(--color-siryc-light)]/30 transition-transform group-hover:scale-95" />
                  </div>
                  <h3 className="mt-6 text-center font-display text-base font-semibold text-[color:var(--color-siryc-dark)]">
                    {m.nombre}
                  </h3>
                  <p className="mt-2 text-center text-xs text-[color:var(--color-siryc-gray)]">{m.cargo}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Certificaciones */}
      <section className="bg-[color:var(--color-siryc-light)]/25 py-24">
        <div className="container-siryc">
          <SectionMarker index="06" label="Certificaciones" />
          <FadeIn>
            <WordReveal
              text="Certificaciones y normativa."
              className="mb-12 max-w-3xl font-display text-4xl font-bold text-[color:var(--color-siryc-dark)] md:text-5xl"
            />
          </FadeIn>
          <RevealGroup inView className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Award, t: "ISO 9001:2015", d: "Gestión de calidad en procesos técnicos y de servicio." },
              { icon: Zap, t: "SEC — Instalaciones eléctricas", d: "Cumplimiento normativo en obras eléctricas." },
              { icon: ShieldCheck, t: "Refrigerantes", d: "Manejo conforme a normativa chilena y Protocolo de Montreal." },
            ].map(({ icon: Icon, t, d }) => (
              <RevealItem key={t}>
                <div className="h-full rounded-2xl bg-white p-8 shadow-sm">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-siryc-blue)]/10 text-[color:var(--color-siryc-blue)]">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-[color:var(--color-siryc-dark)]">{t}</h3>
                  <p className="mt-2 text-sm text-[color:var(--color-siryc-gray)]">{d}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </div>
  );
}

function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-white py-24">
      <div className="container-siryc">
        <SectionMarker index="02" label="Historia" />
        <FadeIn>
          <h2 className="mb-16 max-w-3xl font-display text-4xl font-bold leading-tight text-[color:var(--color-siryc-dark)] md:text-5xl">
            Desde <span className="text-[color:var(--color-siryc-blue)]">2004</span> sosteniendo la operación técnica de nuestros clientes.
          </h2>
        </FadeIn>

        <div ref={ref} className="relative grid gap-12 md:grid-cols-[1fr_2fr]">
          {/* Sticky year column */}
          <div className="hidden md:block">
            <div className="sticky top-32">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--color-siryc-gray)]">
                Línea de tiempo
              </div>
              <div className="mt-4 font-display text-[8rem] font-black leading-none tracking-tighter text-[color:var(--color-siryc-blue)]/10">
                {hitos.length}
              </div>
              <div className="mt-2 max-w-[240px] text-sm text-[color:var(--color-siryc-gray)]">
                Hitos que resumen la evolución de la compañía y su continuidad operativa.
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative pl-8">
            <div className="absolute left-2 top-0 h-full w-px bg-black/10" />
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-2 top-0 w-px bg-gradient-to-b from-[color:var(--color-siryc-red)] via-[color:var(--color-siryc-blue)] to-[color:var(--color-siryc-blue)]"
            />
            {hitos.map((h, i) => (
              <motion.div
                key={h.anio}
                initial={{ opacity: 0, x: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative mb-14 last:mb-0"
              >
                <div className="absolute -left-[27px] top-3 flex h-4 w-4 items-center justify-center rounded-full bg-white ring-2 ring-[color:var(--color-siryc-blue)]">
                  <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-siryc-red)]" />
                </div>
                <div className="font-mono text-xs tracking-[0.3em] text-[color:var(--color-siryc-red)]">
                  HITO {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 font-display text-4xl font-bold text-[color:var(--color-siryc-blue)] md:text-5xl">
                  {h.anio}
                </div>
                <p className="mt-3 max-w-xl text-lg leading-relaxed text-[color:var(--color-siryc-dark)]">
                  {h.texto}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ManifestoSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[color:var(--color-siryc-dark)] py-32 text-white"
    >
      <motion.div
        aria-hidden
        style={{ y }}
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-siryc-blue) 55%, transparent) 0%, transparent 65%)",
        }}
      />
      <div className="container-siryc relative">
        <div className="mb-8 flex items-center gap-4">
          <span className="font-mono text-xs tracking-[0.3em] text-[color:var(--color-siryc-red)]">
            04 / MANIFIESTO
          </span>
          <div className="h-px flex-1 bg-white/20" />
        </div>
        <FadeIn>
          <p className="max-w-5xl font-display text-3xl font-medium leading-[1.2] tracking-tight md:text-5xl">
            Existen empresas que instalan equipos. <span className="text-white/50">Nosotros hacemos ingeniería.</span> Documentamos cada intervención, dimensionamos cada instalación y respondemos por cada m² de operación.
          </p>
        </FadeIn>
        <div className="mt-12 flex items-center gap-3">
          <div className="h-[3px] w-12 bg-[color:var(--color-siryc-red)]" />
          <p className="font-display text-xl font-semibold text-[color:var(--color-siryc-red)]">
            Tu clima, nuestra ingeniería.
          </p>
        </div>
      </div>
    </section>
  );
}
