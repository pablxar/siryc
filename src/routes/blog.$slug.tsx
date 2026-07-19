import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FadeIn } from "@/components/site/FadeIn";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("publicado", true)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw notFound();
      return data;
    },
  });

  if (isLoading) {
    return <div className="container-siryc py-24 text-center text-[color:var(--color-siryc-gray)]">Cargando…</div>;
  }
  if (error || !data) {
    return <div className="container-siryc py-24 text-center">Artículo no encontrado.</div>;
  }

  return (
    <article className="bg-white">
      <div className="bg-[color:var(--color-siryc-dark)] text-white">
        <div className="container-siryc py-16 md:py-20">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white">
            <ArrowLeft size={14} /> Volver al blog
          </Link>
          <div className="mt-6 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-siryc-red)]">
              {data.categoria}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">
              {data.titulo}
            </h1>
            <p className="mt-3 text-sm text-white/60">
              {new Date(data.created_at ?? "").toLocaleDateString("es-CL", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {data.imagen_url && (
        <div className="container-siryc -mt-8 md:-mt-12">
          <img
            src={data.imagen_url}
            alt={data.titulo}
            className="aspect-[16/8] w-full rounded-lg object-cover shadow-xl"
          />
        </div>
      )}

      <div className="container-siryc py-16">
        <FadeIn>
          <div className="prose mx-auto max-w-3xl">
            {(data.contenido ?? "").split("\n\n").map((p, i) => (
              <p key={i} className="mb-5 text-[color:var(--color-siryc-dark)] leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
