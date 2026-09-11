import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  IconSettings,
  IconFileDescription,
  IconUsersGroup,
  IconCertificate,
  IconBolt,
  IconSnowflake,
  IconShieldCheck,
  IconBriefcase,
  IconTool,
  IconHelmet,
  IconHeadset,
  IconArrowUpRight,
  IconArrowDown,
  type IconProps,
} from "@tabler/icons-react";
import { FadeIn, RevealGroup, RevealItem } from "@/components/site/FadeIn";
import bannerWeb from "@/assets/banner-web-siryc.png.asset.json";
import imgElectricidad from "@/assets/electricidad.png.asset.json";
import imgHistoria from "@/assets/nosotros-historia.jpg";
import imgEquipo from "@/assets/nosotros-equipo.jpg";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros — SIRYC" },
      {
        name: "description",
        content:
          "Desde 2004 entregando ingeniería en refrigeración, climatización y electricidad. Conoce nuestra historia, equipo y estándar de trabajo.",
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

const compromisos: { titulo: string; desc: string; Icon: React.ComponentType<IconProps> }[] = [
  {
    titulo: "Rigor técnico",
    desc: "Planificamos cada trabajo según las necesidades de la instalación.",
    Icon: IconSettings,
  },
  {
    titulo: "Trazabilidad",
    desc: "Documentamos las intervenciones y su seguimiento.",
    Icon: IconFileDescription,
  },
  {
    titulo: "Continuidad",
    desc: "Construimos relaciones de trabajo a largo plazo.",
    Icon: IconUsersGroup,
  },
];

const equipo = [
  { nombre: "Gerencia general", cargo: "Dirección y coordinación.", Icon: IconBriefcase },
  { nombre: "Jefatura técnica", cargo: "Planificación e ingeniería.", Icon: IconTool },
  { nombre: "Supervisión en terreno", cargo: "Ejecución y control.", Icon: IconHelmet },
  { nombre: "Servicio al cliente", cargo: "Seguimiento y atención.", Icon: IconHeadset },
];

const estandares: {
  titulo: string;
  desc: string;
  etiqueta: string;
  Icon: React.ComponentType<IconProps>;
}[] = [
  {
    titulo: "Gestión de calidad",
    etiqueta: "ISO 9001:2015",
    desc: "Procedimientos documentados, control de obra y registros entregables en cada intervención.",
    Icon: IconCertificate,
  },
  {
    titulo: "Instalaciones eléctricas",
    etiqueta: "Normativa SEC",
    desc: "Diseño, ejecución y declaración conforme a los requisitos aplicables a cada proyecto.",
    Icon: IconBolt,
  },
  {
    titulo: "Refrigeración responsable",
    etiqueta: "Protocolo de Montreal",
    desc: "Manejo de refrigerantes y mantención según la normativa chilena vigente.",
    Icon: IconSnowflake,
  },
  {
    titulo: "Seguridad y prevención",
    etiqueta: "Mutual de seguridad",
    desc: "Personal capacitado, trabajos en altura y procedimientos de prevención de riesgos.",
    Icon: IconShieldCheck,
  },
];

function Eyebrow({ index, label, tone = "light" }: { index?: string; label: string; tone?: "light" | "dark" }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-[2px] w-6 bg-[color:var(--color-siryc-red)]" />
      <span
        className={`font-mono text-[11px] uppercase tracking-[0.3em] ${
          tone === "dark" ? "text-white/60" : "text-[color:var(--color-siryc-gray)]"
        }`}
      >
        {index ? `${index} / ${label}` : label}
      </span>
    </div>
  );
}

function NosotrosPage() {
  return (
    <div>
      <NosotrosHero />

      {/* 01 — Historia */}
      <section id="historia" className="scroll-mt-24 bg-[color:var(--color-siryc-light)]/15 py-20 lg:py-24">
        <div className="container-siryc">
          <Eyebrow index="01" label="Nuestra historia" />
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <FadeIn>
                <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-[color:var(--color-siryc-dark)] md:text-5xl">
                  Una historia que
                  <br />
                  sigue en marcha.
                </h2>
                <p className="mt-5 max-w-md text-[color:var(--color-siryc-gray)]">
                  Crecimos en terreno. Hoy integramos refrigeración, climatización y electricidad
                  bajo una misma forma de trabajar.
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="relative mt-10 overflow-hidden rounded-2xl">
                  <img
                    src={imgHistoria}
                    alt="Técnico SIRYC revisando planos en terreno"
                    loading="lazy"
                    className="h-72 w-full object-cover lg:h-80"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/80">
                      Desde 2004 / V Región
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>

            <Timeline />
          </div>
        </div>
      </section>

      {/* 02 — Forma de trabajar */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container-siryc">
          <Eyebrow index="02" label="Nuestra forma de trabajar" />
          <FadeIn>
            <h2 className="max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-[color:var(--color-siryc-dark)] md:text-4xl">
              El compromiso se demuestra en cada intervención.
            </h2>
          </FadeIn>
          <RevealGroup inView className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-0">
            {compromisos.map(({ titulo, desc, Icon }, i) => (
              <RevealItem key={titulo}>
                <div
                  className={`relative grid min-h-32 grid-cols-[3rem_minmax(0,1fr)] gap-4 overflow-hidden rounded-lg border border-border bg-secondary/55 p-5 md:block md:min-h-0 md:rounded-none md:border-y-0 md:border-r-0 md:bg-transparent md:px-8 md:py-0 ${i > 0 ? "md:border-l" : "md:border-l-0 md:pl-0"}`}
                >
                  <span className="absolute inset-y-0 left-0 w-1 bg-primary md:hidden" aria-hidden />
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-background text-primary shadow-sm md:mb-4 md:bg-secondary md:shadow-none">
                    <Icon size={25} stroke={1.6} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold text-foreground">{titulo}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:max-w-[26ch]">{desc}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 03 — Banda oscura */}
      <section className="relative overflow-hidden bg-[color:var(--color-siryc-dark)] py-20 text-white lg:py-24">
        <img
          src={imgElectricidad.url}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, var(--color-siryc-dark) 20%, color-mix(in oklab, var(--color-siryc-dark) 70%, transparent) 60%, transparent 105%)",
          }}
        />
        <div className="container-siryc relative">
          <Eyebrow label="" tone="dark" />
          <FadeIn>
            <h2 className="max-w-2xl font-display text-3xl font-extrabold leading-[1.1] tracking-tight md:text-[2.75rem]">
              Conocemos tu instalación.
              <br />
              Entendemos tu operación.
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              El respaldo de un equipo que planifica, documenta y acompaña.
            </p>
            <div className="mt-10 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[color:var(--color-siryc-red)]" />
              <span className="font-display text-sm font-semibold text-[color:var(--color-siryc-red)]">
                Tu clima, nuestra ingeniería.
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 04 — Equipo */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container-siryc">
          <Eyebrow index="03" label="Nuestro equipo" />
          <FadeIn>
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-[color:var(--color-siryc-dark)] md:text-4xl">
              Personas que hacen que todo funcione.
            </h2>
            <p className="mt-3 text-[color:var(--color-siryc-gray)]">
              Coordinación técnica y acompañamiento en cada etapa.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-10 overflow-hidden rounded-2xl">
              <img
                src={imgEquipo}
                alt="Equipo técnico de SIRYC coordinando una intervención"
                loading="lazy"
                className="h-64 w-full object-cover md:h-96"
              />
            </div>
          </FadeIn>
          <RevealGroup inView className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 md:mt-10 md:gap-8 lg:grid-cols-4">
            {equipo.map((m) => (
              <RevealItem key={m.nombre}>
                <div className="h-full border-t-2 border-primary bg-secondary/40 px-4 py-5 md:border-t md:border-border md:bg-transparent md:px-0">
                  <div className="mb-5 grid h-10 w-10 place-items-center rounded-md bg-background text-primary shadow-sm md:bg-secondary md:shadow-none">
                    <m.Icon size={22} stroke={1.6} />
                  </div>
                  <h3 className="font-display text-base font-semibold leading-snug text-foreground">
                    {m.nombre}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.cargo}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 05 — Estándar */}
      <section className="bg-[color:var(--color-siryc-light)]/15 py-20 lg:py-24">
        <div className="container-siryc">
          <Eyebrow index="04" label="Respaldo técnico" />
          <FadeIn>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-[color:var(--color-siryc-dark)] md:text-4xl">
                Un estándar de trabajo claro.
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-[color:var(--color-siryc-gray)]">
                Cada intervención se ejecuta bajo procedimientos, normativa vigente y personal
                acreditado, con respaldo documental entregable al cliente.
              </p>
            </div>
          </FadeIn>
          <RevealGroup inView className="mt-8 overflow-hidden rounded-lg border border-border bg-secondary/45 p-3 md:mt-10 md:rounded-none md:border-x-0 md:bg-transparent md:p-0">
            {estandares.map(({ titulo, desc, etiqueta, Icon }, i) => (
              <RevealItem key={titulo}>
                <div className="group grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-4 border-b border-border px-2 py-5 transition-colors last:border-b-0 md:grid-cols-[auto_auto_1fr_1.2fr] md:items-center md:gap-8 md:px-0 md:py-7 md:hover:bg-background/60">
                  <span className="hidden font-mono text-[11px] tracking-[0.25em] text-primary/40 md:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-background text-primary shadow-sm md:contents">
                    <Icon size={24} stroke={1.6} className="md:text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {titulo}
                    </h3>
                    <span className="mt-1 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-destructive">
                      {etiqueta}
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:hidden">{desc}</p>
                  </div>
                  <p className="hidden text-sm leading-relaxed text-muted-foreground md:block">{desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[color:var(--color-siryc-blue)] py-16 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="container-siryc relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-extrabold leading-tight md:text-4xl">
              Conversemos sobre
              <br />
              tu operación.
            </h2>
            <p className="mt-3 text-white/75">Cuéntanos qué necesita tu instalación.</p>
          </div>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 self-start rounded-full bg-white px-7 py-3.5 font-semibold text-[color:var(--color-siryc-blue)] transition-transform hover:-translate-y-0.5"
          >
            Solicitar cotización
            <IconArrowUpRight size={18} stroke={2} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function NosotrosHero() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-siryc-dark)] text-white">
      <img
        src={bannerWeb.url}
        alt="Equipo técnico de SIRYC revisando planos en una instalación industrial"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(95deg, var(--color-siryc-dark) 12%, color-mix(in oklab, var(--color-siryc-dark) 78%, transparent) 48%, transparent 92%)",
        }}
      />
      <div className="container-siryc relative flex min-h-[62vh] flex-col justify-end pb-14 pt-36 md:min-h-[68vh] md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[2px] w-6 bg-[color:var(--color-siryc-red)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/70">
              Nosotros / SIRYC
            </span>
          </div>
          <h1 className="max-w-[14ch] font-display text-[clamp(2.4rem,6vw,4.25rem)] font-extrabold leading-[1.02] tracking-tight">
            La ingeniería tiene un equipo detrás.
          </h1>
          <p className="mt-5 max-w-lg text-white/75">
            Desde 2004, acompañamos la operación de nuestros clientes con experiencia en terreno y
            respaldo técnico.
          </p>
          <button
            type="button"
            onClick={() =>
              document.getElementById("historia")?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="group mt-8 inline-flex items-center gap-2 border-b border-white/40 pb-1 text-sm text-white/85 transition-colors hover:border-white hover:text-white"
          >
            Conoce nuestra historia
            <IconArrowDown
              size={16}
              stroke={2}
              className="transition-transform group-hover:translate-y-0.5"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative pl-8">
      <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-black/10" />
      <motion.div
        style={{ height: lineHeight }}
        className="absolute left-[7px] top-2 w-px bg-[color:var(--color-siryc-blue)]"
      />
      {hitos.map((h, i) => (
        <motion.div
          key={h.anio}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid grid-cols-1 items-baseline gap-1 border-b border-black/5 py-5 last:border-b-0 sm:grid-cols-[auto_1fr] sm:gap-8"
        >
          <span
            className={`absolute -left-8 top-7 h-[15px] w-[15px] rounded-full border-2 bg-white ${
              i === hitos.length - 1
                ? "border-[color:var(--color-siryc-red)]"
                : "border-[color:var(--color-siryc-blue)]"
            }`}
          >
            {i === hitos.length - 1 && (
              <span className="absolute inset-[3px] rounded-full bg-[color:var(--color-siryc-red)]" />
            )}
          </span>
          <span className="font-display text-3xl font-extrabold tabular-nums text-[color:var(--color-siryc-blue)] md:text-4xl">
            {h.anio}
          </span>
          <p className="text-sm text-[color:var(--color-siryc-gray)]">{h.texto}</p>
        </motion.div>
      ))}
    </div>
  );
}
