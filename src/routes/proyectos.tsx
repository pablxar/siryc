import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  Landmark,
  ShoppingBag,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/site/FadeIn";
import { cn } from "@/lib/utils";
import bannerWeb from "@/assets/banner-web-siryc.png.asset.json";
import imgClimatizacion from "@/assets/climatizacion.png.asset.json";
import imgElectricidad from "@/assets/electricidad.png.asset.json";
import imgRefrigeracion from "@/assets/refrigeracion.png.asset.json";

export const Route = createFileRoute("/proyectos")({
  head: () => ({
    meta: [
      { title: "Proyectos de ingeniería ejecutados | SIRYC" },
      {
        name: "description",
        content:
          "Proyectos SIRYC de climatización, refrigeración y electricidad para empresas, instituciones, educación y comercio en Chile.",
      },
      { property: "og:title", content: "Proyectos de ingeniería ejecutados | SIRYC" },
      {
        property: "og:description",
        content: "Ingeniería SIRYC aplicada en terreno, con alcance técnico, ejecución y respaldo documentado.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/proyectos" }],
  }),
  component: ProyectosPage,
});

const categories = [
  { id: "todos", label: "Todos" },
  { id: "corporativo", label: "Corporativo" },
  { id: "gobierno", label: "Gobierno y FFAA" },
  { id: "educacion", label: "Educación" },
  { id: "centro_comercial", label: "Centros comerciales" },
];

const categoryLabels: Record<string, string> = {
  corporativo: "Corporativo",
  gobierno: "Gobierno y FFAA",
  educacion: "Educación",
  centro_comercial: "Centros comerciales",
};

const fallbackImages = [
  imgClimatizacion.url,
  imgRefrigeracion.url,
  imgElectricidad.url,
  bannerWeb.url,
];

const sectors: Array<{ title: string; description: string; icon: LucideIcon }> = [
  { title: "Corporativo", description: "Edificios e instalaciones de trabajo.", icon: Building2 },
  { title: "Gobierno y FFAA", description: "Infraestructura institucional.", icon: Landmark },
  { title: "Educación", description: "Espacios para aprender.", icon: GraduationCap },
  { title: "Centros comerciales", description: "Operaciones comerciales.", icon: ShoppingBag },
];

const processSteps = [
  { title: "Alcance técnico", description: "Definimos el trabajo y sus alcances.", icon: ClipboardCheck },
  { title: "Intervención", description: "Ejecutamos con personal especializado.", icon: Wrench },
  { title: "Seguimiento", description: "Entregamos información detallada del servicio.", icon: FileCheck2 },
];

function ProyectosPage() {
  const [filter, setFilter] = useState("todos");
  const reduceMotion = useReducedMotion();
  const { data } = useQuery({
    queryKey: ["proyectos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("proyectos")
        .select(
          "id, titulo, categoria, descripcion, metros_cuadrados, cantidad_equipos, anio, imagen_principal_url, galeria, mostrar_cliente, cliente_nombre_publico, created_at",
        )
        .order("anio", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const projects = data ?? [];
  const filtered = projects.filter((project) => filter === "todos" || project.categoria === filter);

  return (
    <div className="overflow-x-clip bg-background">
      <section className="relative min-h-[590px] overflow-hidden bg-[color:var(--color-siryc-dark)] text-primary-foreground md:min-h-[700px]">
        <motion.img
          src={bannerWeb.url}
          alt="Instalación industrial de climatización ejecutada por SIRYC"
          initial={reduceMotion ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover object-[62%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-siryc-dark)] via-[color:var(--color-siryc-dark)]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-siryc-dark)]/70 via-transparent to-[color:var(--color-siryc-dark)]/25" />

        <div className="container-siryc relative flex min-h-[590px] items-end pb-16 pt-32 md:min-h-[700px] md:items-center md:pb-20 md:pt-40">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[3px] w-8 bg-[color:var(--color-siryc-red)]" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-primary-foreground/75">
                Proyectos · SIRYC
              </span>
            </div>
            <h1 className="max-w-xl font-display text-4xl font-bold leading-[1.02] md:text-6xl">
              Nuestra ingeniería, en terreno.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              Proyectos de climatización, refrigeración y electricidad ejecutados en distintos sectores.
            </p>
            <Button asChild variant="outline" size="lg" className="mt-8 h-12 rounded-full border-primary-foreground/35 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
              <a href="#proyectos-seleccionados">
                Explorar proyectos <ArrowDown />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <main>
        <section id="proyectos-seleccionados" className="scroll-mt-28 py-20 md:py-28">
          <div className="container-siryc">
            <SectionLabel index="01" label="Proyectos seleccionados" />
            <FadeIn>
              <h2 className="max-w-4xl font-display text-3xl font-bold leading-tight text-foreground md:text-5xl">
                Cada instalación tiene una historia.
              </h2>
            </FadeIn>

            <div className="-mx-5 mt-8 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0">
              <div className="flex min-w-max gap-2" role="group" aria-label="Filtrar proyectos por sector">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    type="button"
                    variant={filter === category.id ? "default" : "outline"}
                    onClick={() => setFilter(category.id)}
                    aria-pressed={filter === category.id}
                    className="h-10 rounded-full px-5 shadow-none"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            <motion.div layout className="mt-10 grid gap-x-7 gap-y-12 md:grid-cols-2">
              {filtered.map((project, index) => (
                <motion.article
                  layout
                  key={project.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group"
                >
                  <div className="overflow-hidden rounded-lg bg-secondary">
                    <img
                      src={project.imagen_principal_url || fallbackImages[index % fallbackImages.length]}
                      alt={project.titulo}
                      loading="lazy"
                      className="aspect-[16/10] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-5 pt-5">
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                        {project.categoria ? categoryLabels[project.categoria] : "Proyecto ejecutado"}
                        {project.anio ? ` · ${project.anio}` : ""}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-bold leading-tight text-foreground md:text-2xl">
                        {project.titulo}
                      </h3>
                      {project.descripcion && (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {project.descripcion}
                        </p>
                      )}
                    </div>
                    <Button asChild variant="outline" size="icon" className="mt-1 h-10 w-10 shrink-0 rounded-full border-primary text-primary shadow-none transition-colors hover:bg-primary hover:text-primary-foreground">
                      <Link to="/contacto" aria-label={`Consultar por ${project.titulo}`}>
                        <ArrowUpRight />
                      </Link>
                    </Button>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {filtered.length === 0 && (
              <p className="border-y py-14 text-center text-muted-foreground">
                No hay proyectos publicados en esta categoría por ahora.
              </p>
            )}
          </div>
        </section>

        <FeaturedCase />

        <section className="bg-secondary/55 py-20 md:py-24">
          <div className="container-siryc">
            <SectionLabel index="03" label="Sectores" />
            <FadeIn>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-5xl">
                Experiencia en distintos entornos.
              </h2>
            </FadeIn>
            <div className="mt-12 grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-0">
              {sectors.map((sector, index) => {
                const Icon = sector.icon;
                return (
                  <motion.div
                    key={sector.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="px-3 text-center md:border-r md:px-8 md:last:border-r-0"
                  >
                    <Icon className="mx-auto text-primary" size={36} strokeWidth={1.6} aria-hidden />
                    <h3 className="mt-5 font-display text-base font-bold text-foreground md:text-lg">{sector.title}</h3>
                    <p className="mx-auto mt-2 max-w-44 text-sm leading-relaxed text-muted-foreground">{sector.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container-siryc grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <SectionLabel index="04" label="El respaldo detrás de cada proyecto" />
              <FadeIn>
                <h2 className="max-w-xl font-display text-3xl font-bold leading-tight text-foreground md:text-5xl">
                  El trabajo termina con claridad.
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                  Alcance, intervención y seguimiento: información para conocer el estado de cada instalación.
                </p>
              </FadeIn>
              <div className="mt-10 grid gap-7 sm:grid-cols-3">
                {processSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <FadeIn key={step.title} delay={index * 0.08}>
                      <div className="border-t-2 border-primary pt-5">
                        <div className="flex items-center justify-between text-primary">
                          <Icon size={23} strokeWidth={1.7} aria-hidden />
                          <span className="font-mono text-[10px] font-bold">0{index + 1}</span>
                        </div>
                        <h3 className="mt-4 font-display font-bold text-foreground">{step.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
            <FadeIn delay={0.12}>
              <div className="overflow-hidden rounded-lg bg-secondary">
                <img
                  src={imgElectricidad.url}
                  alt="Revisión técnica y respaldo documental de una instalación eléctrica"
                  loading="lazy"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="relative overflow-hidden bg-primary py-14 text-primary-foreground md:py-18">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 border-l border-primary-foreground/10 opacity-25 md:block" aria-hidden />
          <div className="container-siryc relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="max-w-xl font-display text-3xl font-bold md:text-5xl">Tu próximo proyecto comienza aquí.</h2>
              <p className="mt-3 text-primary-foreground/75">Cuéntanos qué necesita tu instalación.</p>
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

function FeaturedCase() {
  return (
    <section className="bg-[color:var(--color-siryc-dark)] py-20 text-primary-foreground md:py-24">
      <div className="container-siryc grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <FadeIn>
          <SectionLabel index="02" label="Caso destacado" inverted />
          <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">Armada de Chile.</h2>
          <p className="mt-3 font-display text-xl font-medium text-primary-foreground/85 md:text-2xl">
            Mantención para instalaciones institucionales.
          </p>
          <p className="mt-5 max-w-lg leading-relaxed text-primary-foreground/65">
            Un trabajo técnico centrado en la planificación, la documentación y el seguimiento de cada intervención.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary px-4 py-2 text-xs font-semibold">Climatización</span>
            <span className="rounded-full border border-primary-foreground/20 px-4 py-2 text-xs font-semibold">Refrigeración</span>
          </div>
          <Button asChild variant="outline" size="lg" className="mt-8 h-12 rounded-full border-primary-foreground/30 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
            <Link to="/contacto">
              Consultar por mantención <ArrowUpRight />
            </Link>
          </Button>
        </FadeIn>
        <FadeIn delay={0.12}>
          <div className="overflow-hidden rounded-lg bg-secondary">
            <img
              src={imgRefrigeracion.url}
              alt="Equipo técnico SIRYC en labores de mantención industrial"
              loading="lazy"
              className="aspect-[16/10] h-full w-full object-cover"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function SectionLabel({ index, label, inverted = false }: { index: string; label: string; inverted?: boolean }) {
  return (
    <div className={cn("mb-5 flex items-center gap-3 font-mono text-[9px] font-bold uppercase tracking-[0.24em]", inverted ? "text-primary-foreground/60" : "text-muted-foreground")}>
      <span className="h-[2px] w-7 bg-[color:var(--color-siryc-red)]" />
      <span>{index} / {label}</span>
    </div>
  );
}