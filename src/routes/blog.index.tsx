import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { EditorialHero } from "@/components/site/EditorialHero";
import { SectionMarker } from "@/components/site/Parallax";
import imgRefrigeracion from "@/assets/refrigeracion.png.asset.json";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog técnico — SIRYC" },
      {
        name: "description",
        content:
          "Análisis técnico sobre climatización industrial, normativa chilena de refrigerantes, eficiencia energética y mantención preventiva.",
      },
      { property: "og:title", content: "Blog técnico — SIRYC" },
      { property: "og:description", content: "Actualidad técnica para operaciones." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { data } = useQuery({
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
  const rest = posts.slice(1);

  return (
    <div>
      <EditorialHero
        index="01"
        eyebrow="Blog técnico"
        title="Actualidad técnica para operaciones."
        subtitle="Análisis, normativa y casos técnicos para administradores de edificios y responsables de operaciones."
        image={imgRefrigeracion.url}
      />

      {/* Featured */}
      {featured && (
        <section className="bg-white py-20">
          <div className="container-siryc">
            <SectionMarker index="02" label="Artículo destacado" />
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="group grid gap-10 md:grid-cols-2 md:gap-16"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[color:var(--color-siryc-dark)]">
                {featured.imagen_url && (
                  <img
                    src={featured.imagen_url}
                    alt={featured.titulo}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur-md">
                  Destacado
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest">
                  <span className="text-[color:var(--color-siryc-red)]">{featured.categoria}</span>
                  <span className="text-[color:var(--color-siryc-gray)]">
                    {new Date(featured.created_at ?? "").toLocaleDateString("es-CL", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[color:var(--color-siryc-dark)] md:text-5xl">
                  {featured.titulo}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-[color:var(--color-siryc-gray)]">
                  {featured.extracto}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--color-siryc-blue)]">
                  Leer artículo
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Editorial index */}
      <section className="bg-[color:var(--color-siryc-light)]/25 py-20">
        <div className="container-siryc">
          <SectionMarker index="03" label="Todos los artículos" />
          <div className="border-t border-black/10">
            {rest.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group grid items-center gap-6 border-b border-black/10 py-8 transition-colors hover:bg-white md:grid-cols-[auto_1fr_auto_auto] md:gap-10 md:px-6"
                >
                  <span className="font-mono text-xs tracking-[0.3em] text-[color:var(--color-siryc-red)]">
                    {String(i + 2).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <h3 className="font-display text-2xl font-semibold leading-snug text-[color:var(--color-siryc-dark)] transition-transform duration-500 md:text-3xl md:group-hover:translate-x-2">
                      {p.titulo}
                    </h3>
                    <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-[color:var(--color-siryc-gray)]">
                      {p.extracto}
                    </p>
                  </div>

                  <div className="hidden h-20 w-32 overflow-hidden rounded-2xl bg-[color:var(--color-siryc-light)]/40 opacity-0 transition-all duration-500 group-hover:opacity-100 lg:block">
                    {p.imagen_url && (
                      <img
                        src={p.imagen_url}
                        alt={p.titulo}
                        loading="lazy"
                        className="h-full w-full scale-110 object-cover transition-transform duration-700 group-hover:scale-100"
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="text-right font-mono text-[10px] uppercase tracking-widest">
                      <div className="text-[color:var(--color-siryc-red)]">{p.categoria}</div>
                      <div className="mt-1 text-[color:var(--color-siryc-gray)]">
                        {new Date(p.created_at ?? "").toLocaleDateString("es-CL", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-black/10 text-[color:var(--color-siryc-dark)] transition-all duration-500 group-hover:border-transparent group-hover:bg-[color:var(--color-siryc-red)] group-hover:text-white">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
