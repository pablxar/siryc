import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ClipboardCheck,
  FileText,
  Snowflake,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/site/FadeIn";
import imgRefrigeracion from "@/assets/refrigeracion.png.asset.json";
import imgClimatizacion from "@/assets/climatizacion.png.asset.json";
import imgElectricidad from "@/assets/electricidad.png.asset.json";
import bannerWeb from "@/assets/banner-web-siryc.png.asset.json";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios de ingeniería técnica | SIRYC" },
      {
        name: "description",
        content:
          "Refrigeración industrial, climatización, electricidad y contratos de mantención para operaciones corporativas e institucionales.",
      },
      { property: "og:title", content: "Servicios de ingeniería técnica | SIRYC" },
      {
        property: "og:description",
        content: "Tres especialidades técnicas y una solución integral para operaciones exigentes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/servicios" }],
  }),
  component: ServiciosPage,
});

type Servicio = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageCaption: string;
  icon: LucideIcon;
  items: string[];
};

const servicios: Servicio[] = [
  {
    id: "refrigeracion",
    label: "Refrigeración",
    title: "El frío que tu operación necesita.",
    subtitle: "Refrigeración industrial",
    description: "Instalamos, mantenemos y reparamos sistemas que sostienen la continuidad de cada proceso.",
    image: imgRefrigeracion.url,
    imageCaption: "Sistemas de frío industrial y comercial",
    icon: Snowflake,
    items: [
      "Mantención preventiva y correctiva",
      "Cambio de compresores y componentes críticos",
      "Detección y reparación de fugas",
      "Plantas de agua fría (chillers)",
      "Sistemas para data centers y salas eléctricas",
      "Migración a refrigerantes ecológicos",
    ],
  },
  {
    id: "climatizacion",
    label: "Climatización",
    title: "El ambiente adecuado, en cada espacio.",
    subtitle: "Climatización y aire acondicionado",
    description: "Soluciones eficientes para espacios residenciales, comerciales e industriales.",
    image: imgClimatizacion.url,
    imageCaption: "Climatización comercial y sistemas VRF",
    icon: Wind,
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
    label: "Electricidad",
    title: "Energía para seguir operando.",
    subtitle: "Electricidad industrial",
    description: "Instalaciones y mantención eléctrica para cada etapa de un proyecto.",
    image: imgElectricidad.url,
    imageCaption: "Instalaciones y control eléctrico",
    icon: Zap,
    items: [
      "Instalaciones eléctricas industriales y comerciales",
      "Tableros y paneles de distribución",
      "Sistemas de control centralizado",
      "Mantención eléctrica preventiva",
      "Cumplimiento normativa SEC",
    ],
  },
];

const maintenancePoints = [
  { title: "Planificación de visitas", icon: CalendarDays },
  { title: "Informes de cada intervención", icon: FileText },
  { title: "Seguimiento de la instalación", icon: ClipboardCheck },
];

function ServiciosPage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-x-clip bg-background">
      <section className="relative min-h-[570px] overflow-hidden bg-[color:var(--color-siryc-dark)] text-primary-foreground md:min-h-[680px]">
        <motion.img
          src={bannerWeb.url}
          alt="Técnico SIRYC supervisando una instalación de climatización"
          initial={reduceMotion ? false : { scale: 1.07 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover object-[68%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-siryc-dark)] via-[color:var(--color-siryc-dark)]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-siryc-dark)]/75 via-transparent to-[color:var(--color-siryc-dark)]/20" />

        <div className="container-siryc relative flex min-h-[570px] items-end pb-16 pt-32 md:min-h-[680px] md:items-center md:pb-20 md:pt-40">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[3px] w-8 bg-[color:var(--color-siryc-red)]" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-foreground/75">
                Servicios · SIRYC
              </span>
            </div>
            <h1 className="max-w-xl font-display text-4xl font-bold leading-[1.02] md:text-6xl">
              Tres especialidades. Una solución integral.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              Ingeniería, instalación y mantención en refrigeración, climatización y electricidad.
            </p>
            <Button asChild size="lg" className="mt-8 h-12 rounded-full px-6">
              <Link to="/contacto">
                Solicitar cotización <ArrowRight />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <nav aria-label="Áreas de servicio" className="border-b bg-background">
        <div className="container-siryc overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max md:grid md:min-w-0 md:grid-cols-4">
            {servicios.map((servicio, index) => (
              <a
                key={servicio.id}
                href={`#${servicio.id}`}
                className="group flex min-h-16 items-center gap-3 border-b-2 border-transparent px-5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary md:justify-center md:border-r md:border-b-0 md:px-3"
              >
                <span className="font-mono text-[10px] font-bold text-primary">0{index + 1}</span>
                <span className="font-semibold">{servicio.label}</span>
              </a>
            ))}
            <a
              href="#mantencion"
              className="group flex min-h-16 items-center gap-3 border-b-2 border-transparent px-5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary md:justify-center md:border-b-0 md:px-3"
            >
              <span className="font-mono text-[10px] font-bold text-primary">04</span>
              <span className="font-semibold">Mantención</span>
            </a>
          </div>
        </div>
      </nav>

      <main>
        {servicios.map((servicio, index) => (
          <ServiceSection key={servicio.id} servicio={servicio} index={index} />
        ))}
        <MaintenanceSection />
        <section className="bg-primary py-12 text-primary-foreground md:py-16">
          <div className="container-siryc flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">¿Qué necesita tu instalación?</h2>
              <p className="mt-2 text-primary-foreground/75">Cuéntanos tu requerimiento. Nuestro equipo te orientará.</p>
            </div>
            <Button asChild size="lg" variant="secondary" className="h-12 rounded-full px-6 text-primary">
              <Link to="/contacto">
                Solicitar cotización <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

function ServiceSection({ servicio, index }: { servicio: Servicio; index: number }) {
  const Icon = servicio.icon;
  const reversed = index % 2 === 1;

  return (
    <section id={servicio.id} className={index === 1 ? "scroll-mt-28 bg-secondary/55 py-20 md:py-28" : "scroll-mt-28 py-20 md:py-28"}>
      <div className="container-siryc">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <FadeIn className={reversed ? "lg:order-2" : ""}>
            <div className="relative overflow-hidden rounded-lg bg-secondary">
              <img
                src={servicio.image}
                alt={servicio.subtitle}
                loading="lazy"
                className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 hover:scale-[1.025]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color:var(--color-siryc-dark)]/75 to-transparent px-5 pb-5 pt-16">
                <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-primary-foreground/85">
                  {servicio.imageCaption}
                </span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.12} className={reversed ? "lg:order-1" : ""}>
            <div className="flex items-center gap-4 text-primary">
              <Icon size={34} strokeWidth={1.7} aria-hidden />
              <span className="h-[2px] w-9 bg-[color:var(--color-siryc-red)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                0{index + 1} / {servicio.label}
              </span>
            </div>
            <h2 className="mt-6 max-w-xl font-display text-4xl font-bold leading-[1.05] text-[color:var(--color-siryc-dark)] md:text-5xl">
              {servicio.title}
            </h2>
            <p className="mt-3 font-display text-base font-semibold text-primary">{servicio.subtitle}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">{servicio.description}</p>

            <ul className="mt-7 divide-y border-y">
              {servicio.items.map((item) => (
                <li key={item} className="flex items-start gap-3 py-3 text-sm text-foreground">
                  <Check size={15} strokeWidth={2.5} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="mt-8 h-12 rounded-full px-6">
              <Link to="/contacto" search={{ servicio: servicio.id }}>
                Cotizar {servicio.label.toLowerCase()} <ArrowRight />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function MaintenanceSection() {
  return (
    <section id="mantencion" className="scroll-mt-28 bg-[color:var(--color-siryc-dark)] py-20 text-primary-foreground md:py-28">
      <div className="container-siryc">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <FadeIn>
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-9 bg-[color:var(--color-siryc-red)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary-foreground/60">
                04 / Contratos de mantención
              </span>
            </div>
            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] md:text-5xl">La continuidad se planifica.</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-primary-foreground/70">
              Contratos anuales o semestrales con visitas programadas, trazabilidad técnica y respuesta garantizada para empresas e instituciones.
            </p>
            <ul className="mt-8 divide-y divide-primary-foreground/15 border-y border-primary-foreground/15">
              {maintenancePoints.map(({ title, icon: Icon }) => (
                <li key={title} className="flex items-center gap-4 py-4 text-sm text-primary-foreground/85">
                  <Icon className="text-primary-foreground/65" size={19} aria-hidden />
                  {title}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" variant="outline" className="mt-8 h-12 rounded-full border-primary-foreground/35 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link to="/contacto">
                Solicitar propuesta <ArrowRight />
              </Link>
            </Button>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={bannerWeb.url}
                alt="Técnico SIRYC documentando una intervención"
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-siryc-dark)]/45 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 overflow-hidden rounded-md bg-background text-foreground shadow-xl md:inset-x-8 md:bottom-8">
                <div className="flex items-center gap-3 border-r p-4 md:p-6">
                  <CalendarDays className="shrink-0 text-primary" />
                  <span className="text-xs font-semibold md:text-sm">Visitas programadas</span>
                </div>
                <div className="flex items-center gap-3 p-4 md:p-6">
                  <FileText className="shrink-0 text-primary" />
                  <span className="text-xs font-semibold md:text-sm">Respaldo documentado</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}