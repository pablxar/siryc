import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
import { FadeIn } from "@/components/site/FadeIn";

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

  return (
    <div>
      <PageHero
        title="Blog técnico"
        subtitle="Análisis, normativa y casos técnicos para administradores de edificios y responsables de operaciones."
      />

      <section className="bg-white py-16">
        <div className="container-siryc">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(data ?? []).map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.05}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group block h-full overflow-hidden rounded-2xl border border-black/5 transition-all hover:shadow-lg"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[color:var(--color-siryc-light)]/30">
                    {p.imagen_url && (
                      <img
                        src={p.imagen_url}
                        alt={p.titulo}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider">
                      <span className="text-[color:var(--color-siryc-red)]">{p.categoria}</span>
                      <span className="text-[color:var(--color-siryc-gray)]">
                        {new Date(p.created_at ?? "").toLocaleDateString("es-CL", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-lg font-semibold leading-snug text-[color:var(--color-siryc-dark)]">
                      {p.titulo}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm text-[color:var(--color-siryc-gray)]">
                      {p.extracto}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
