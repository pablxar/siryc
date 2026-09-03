import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Snowflake, Wind, Zap, ArrowRight, Check } from "lucide-react";
import { EditorialHero } from "@/components/site/EditorialHero";
import { SectionMarker } from "@/components/site/Parallax";
import { FadeIn } from "@/components/site/FadeIn";
import { WordReveal } from "@/components/site/WordReveal";
import { KineticMarquee } from "@/components/site/KineticMarquee";
import imgRefrigeracion from "@/assets/refrigeracion.png.asset.json";
import imgClimatizacion from "@/assets/climatizacion.png.asset.json";
import imgElectricidad from "@/assets/electricidad.png.asset.json";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
    img: imgRefrigeracion.url,
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
    img: imgClimatizacion.url,
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
    img: imgElectricidad.url,
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
      <EditorialHero
        index="01"
        eyebrow="Servicios"
        title="Tres líneas técnicas, una misma ingeniería."
        subtitle="Procedimientos documentados y personal certificado para refrigeración industrial, climatización y electricidad."
        image={imgClimatizacion.url}
      >
        <nav className="flex flex-col gap-2">
          {servicios.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group flex items-center gap-4 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 backdrop-blur-md transition-colors hover:border-white/40"
            >
              <span className="font-mono text-[10px] tracking-[0.25em] text-[color:var(--color-siryc-red)]">
                0{i + 1}
              </span>
              <span className="text-sm font-medium text-white/85 group-hover:text-white">
                {s.titulo}
              </span>
            </a>
          ))}
        </nav>
      </EditorialHero>

      <KineticMarquee
        items={["Refrigeración industrial", "Climatización VRF", "Electricidad", "Mantención 24/7"]}
        tone="light"
      />

      {servicios.map((s, idx) => (
        <ServiceBlock key={s.id} servicio={s} index={idx} />
      ))}

      <ContratosSection />
    </div>
  );
}

function ServiceBlock({
  servicio,
  index,
}: {
  servicio: (typeof servicios)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);

  const reverse = index % 2 === 1;
  const Icon = servicio.icon;

  return (
    <section
      ref={ref}
      id={servicio.id}
      className={`relative overflow-hidden py-24 md:py-32 ${
        index % 2 === 0 ? "bg-white" : "bg-[color:var(--color-siryc-light)]/25"
      }`}
    >
      <div className="container-siryc">
        <SectionMarker
          index={`0${index + 2}`}
          label={servicio.titulo}
        />
        <div
          className={`grid items-center gap-12 md:gap-16 md:grid-cols-2 ${
            reverse ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Image with parallax */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-black/10 shadow-[0_40px_100px_-40px_rgba(20,57,142,0.5)]">
              <motion.img
                src={servicio.img}
                alt={servicio.titulo}
                loading="lazy"
                style={{ y: imgY, scale: imgScale }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-siryc-dark)]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div className="font-mono text-xs tracking-[0.3em] text-white/70">
                  {String(index + 1).padStart(2, "0")} / 0{servicios.length}
                </div>
                <div className="font-display text-sm font-semibold uppercase tracking-widest">
                  {servicio.id}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <FadeIn>
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--color-siryc-blue)] text-white shadow-[0_15px_40px_-15px_rgba(20,57,142,0.55)]">
              <Icon size={24} />
            </div>
            <h2 className="font-display text-4xl font-bold leading-tight text-[color:var(--color-siryc-dark)] md:text-5xl">
              {servicio.titulo}
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {servicio.items.map((it, i) => (
                <motion.div
                  key={it}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex items-start gap-3 rounded-xl border border-black/5 bg-white/60 px-4 py-3 backdrop-blur-sm"
                >
                  <Check
                    size={16}
                    strokeWidth={3}
                    className="mt-1 flex-shrink-0 text-[color:var(--color-siryc-blue)]"
                  />
                  <span className="text-sm text-[color:var(--color-siryc-dark)]">{it}</span>
                </motion.div>
              ))}
            </div>
            <Link
              to="/contacto"
              search={{ servicio: servicio.id }}
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[color:var(--color-siryc-red)] px-7 py-4 text-sm font-semibold text-white shadow-[0_15px_40px_-15px_rgba(227,6,19,0.55)] transition-all hover:shadow-[0_20px_50px_-15px_rgba(227,6,19,0.7)]"
            >
              Solicitar cotización
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ContratosSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bigY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[color:var(--color-siryc-dark)] py-32 text-white"
    >
      <motion.div
        aria-hidden
        style={{ y: bigY }}
        className="pointer-events-none absolute -right-10 top-10 select-none font-display text-[18rem] font-black leading-none tracking-tighter text-white/[0.04] md:text-[26rem]"
      >
        05
      </motion.div>
      <div className="container-siryc relative max-w-4xl">
        <SectionMarker index="05" label="Contratos de mantención" />
        <FadeIn>
          <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
            Contratos de <span className="text-[color:var(--color-siryc-red)]">mantención</span> institucional.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75">
            Modalidad de contrato anual o semestral con visitas técnicas
            programadas, informes documentados y respuesta técnica
            garantizada. Dirigido a clientes corporativos, gobierno,
            instituciones educacionales y Fuerzas Armadas.
          </p>
          <Link
            to="/contacto"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[color:var(--color-siryc-red)] px-7 py-4 text-sm font-semibold text-white shadow-[0_15px_40px_-15px_rgba(227,6,19,0.55)] transition-all hover:shadow-[0_20px_50px_-15px_rgba(227,6,19,0.7)]"
          >
            Solicitar propuesta de contrato
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
