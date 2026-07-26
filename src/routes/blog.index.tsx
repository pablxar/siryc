import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { EditorialHero } from "@/components/site/EditorialHero";
import { SectionMarker } from "@/components/site/Parallax";

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

      {/* Grid */}
      <section className="bg-[color:var(--color-siryc-light)]/25 py-20">
        <div className="container-siryc">
          <SectionMarker index="03" label="Todos los artículos" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group block h-full overflow-hidden rounded-3xl border border-black/5 bg-white transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_rgba(20,57,142,0.35)]"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[color:var(--color-siryc-light)]/30">
                    {p.imagen_url && (
                      <img
                        src={p.imagen_url}
                        alt={p.titulo}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest">
                      <span className="text-[color:var(--color-siryc-red)]">{p.categoria}</span>
                      <span className="text-[color:var(--color-siryc-gray)]">
                        {new Date(p.created_at ?? "").toLocaleDateString("es-CL", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-[color:var(--color-siryc-dark)]">
                      {p.titulo}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm text-[color:var(--color-siryc-gray)]">
                      {p.extracto}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-siryc-blue)]">
                      Leer
                      <ArrowUpRight
                        size={12}
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>
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
