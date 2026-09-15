import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpen, Snowflake, ThermometerSnowflake, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/site/FadeIn";
import imgRefrigeracion from "@/assets/refrigeracion.png.asset.json";
import imgClimatizacion from "@/assets/climatizacion.png.asset.json";
import imgElectricidad from "@/assets/electricidad.png.asset.json";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog técnico de climatización | SIRYC" },
      {
        name: "description",
        content:
          "Análisis técnico sobre climatización industrial, normativa chilena, eficiencia energética y mantención preventiva.",
      },
      { property: "og:title", content: "Blog técnico de climatización | SIRYC" },
      {
        property: "og:description",
        content: "Conocimiento técnico para una mejor operación de edificios e instalaciones.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

const fallbackImages = [imgRefrigeracion.url, imgClimatizacion.url, imgElectricidad.url];

function formatDate(value: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function BlogIndex() {
  const reduceMotion = useReducedMotion();
  const { data, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("publicado", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const posts = data ?? [];
  const featured = posts[0];
  const rest = posts.slice(1, 4);

  return (
    <div className="overflow-x-clip bg-background">
      <section className="relative overflow-hidden bg-secondary/70 pb-12 pt-32 md:pb-16 md:pt-40">
        <div
          aria-hidden
          className="absolute inset-0 opacity-55 [background-image:linear-gradient(to_right,color-mix(in_oklab,var(--border)_65%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--border)_65%,transparent)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <div className="container-siryc relative">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel label="Blog técnico · SIRYC" />
            <div className="mt-5 grid items-end gap-6 border-b border-primary/25 pb-7 md:grid-cols-[1.35fr_0.65fr] md:gap-16 md:pb-9">
              <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.02] text-foreground md:text-6xl">
                Conocimiento para una mejor operación.
              </h1>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground md:pb-1 md:text-lg">
                Análisis y criterios técnicos para quienes administran edificios e instalaciones.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span>Refrigeración</span><span aria-hidden>/</span>
              <span>Climatización</span><span aria-hidden>/</span>
              <span>Electricidad</span>
            </div>
          </motion.div>
        </div>
      </section>

      <main>
        <section className="py-16 md:py-24">
          <div className="container-siryc">
            <SectionLabel index="01" label="Lectura destacada" />
            {isLoading ? (
              <div className="mt-8 grid animate-pulse gap-8 md:grid-cols-[1.35fr_0.75fr]">
                <div className="aspect-[4/3] rounded-lg bg-secondary" />
                <div className="h-64 rounded-lg bg-secondary" />
              </div>
            ) : featured ? (
              <Link
                to="/blog/$slug"
                params={{ slug: featured.slug }}
                className="group mt-8 grid items-center gap-9 md:grid-cols-[1.3fr_0.7fr] md:gap-12"
              >
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, x: -26 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden rounded-lg bg-secondary"
                >
                  <img
                    src={featured.imagen_url || fallbackImages[0]}
                    alt={featured.titulo}
                    onError={(event) => {
                      event.currentTarget.src = fallbackImages[0];
                    }}
                    className="aspect-[16/11] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-foreground backdrop-blur-md">
                    Destacado
                  </span>
                </motion.div>
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.65, delay: 0.1 }}
                >
                  <ArticleMeta category={featured.categoria} date={featured.created_at} />
                  <h2 className="mt-4 font-display text-3xl font-bold leading-[1.08] text-foreground md:text-4xl">
                    {featured.titulo}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                    {featured.extracto}
                  </p>
                  <ReadMore />
                </motion.div>
              </Link>
            ) : (
              <p className="mt-8 border-y py-12 text-muted-foreground">No hay artículos publicados por ahora.</p>
            )}
          </div>
        </section>

        {rest.length > 0 && (
          <section className="bg-secondary/55 py-16 md:py-24">
            <div className="container-siryc">
              <SectionLabel index="02" label="Artículos" />
              <FadeIn>
                <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-5xl">
                  Más lecturas técnicas.
                </h2>
              </FadeIn>
              <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-0">
                {rest.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    className="group md:border-r md:px-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                  >
                    <Link to="/blog/$slug" params={{ slug: post.slug }} className="block">
                      <div className="overflow-hidden rounded-md bg-secondary">
                        <img
                          src={post.imagen_url || fallbackImages[index % fallbackImages.length]}
                          alt={post.titulo}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.src = fallbackImages[index % fallbackImages.length];
                          }}
                          className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                        />
                      </div>
                      <ArticleMeta category={post.categoria} date={post.created_at} className="mt-5" />
                      <h3 className="mt-3 font-display text-2xl font-bold leading-[1.08] text-foreground">
                        {post.titulo}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {post.extracto}
                      </p>
                      <ReadMore />
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-y bg-background py-12 md:py-16">
          <div className="container-siryc grid items-center gap-7 md:grid-cols-[180px_1fr] md:gap-12">
            <div className="flex items-center justify-center border-primary/25 text-primary md:border-r md:py-3">
              <BookOpen size={92} strokeWidth={1.25} aria-hidden />
            </div>
            <FadeIn>
              <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight text-foreground md:text-5xl">
                Entender tu instalación también es cuidarla.
              </h2>
              <p className="mt-3 text-base text-muted-foreground md:text-lg">
                Conocimiento técnico aplicado a las decisiones de cada día.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="relative overflow-hidden bg-primary py-12 text-primary-foreground md:py-16">
          <div aria-hidden className="absolute -right-14 -top-16 opacity-15">
            <div className="grid grid-cols-3 gap-7">
              <Snowflake size={90} strokeWidth={1} />
              <ThermometerSnowflake size={90} strokeWidth={1} />
              <Zap size={90} strokeWidth={1} />
            </div>
          </div>
          <div className="container-siryc relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold">¿Necesitas llevarlo a la práctica?</h2>
              <p className="mt-2 text-primary-foreground/80">Conversemos sobre las necesidades de tu instalación.</p>
            </div>
            <Button asChild size="lg" variant="secondary" className="h-12 rounded-lg px-6 text-primary shadow-none">
              <Link to="/contacto">
                Solicitar cotización <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

function SectionLabel({ index, label }: { index?: string; label: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
      <span className="h-[3px] w-7 bg-destructive" />
      {index && <span className="text-primary">{index}</span>}
      <span>{label}</span>
    </div>
  );
}

function ArticleMeta({ category, date, className = "" }: { category: string | null; date: string | null; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] font-bold uppercase tracking-[0.13em] ${className}`}>
      <span className="text-primary">{category || "Actualidad técnica"}</span>
      <span className="text-muted-foreground">{formatDate(date)}</span>
    </div>
  );
}

function ReadMore() {
  return (
    <span className="mt-7 inline-flex items-center gap-2 border-b border-primary pb-1 text-sm font-semibold text-primary">
      Leer artículo
      <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </span>
  );
}