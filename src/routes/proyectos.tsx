import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
import { FadeIn } from "@/components/site/FadeIn";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/proyectos")({
  head: () => ({
    meta: [
      { title: "Proyectos — SIRYC" },
      {
        name: "description",
        content:
          "Proyectos ejecutados por SIRYC en centros comerciales, edificios corporativos, instituciones educacionales y FFAA.",
      },
      { property: "og:title", content: "Proyectos — SIRYC" },
      { property: "og:description", content: "Casos reales de ingeniería en Chile." },
    ],
    links: [{ rel: "canonical", href: "/proyectos" }],
  }),
  component: ProyectosPage,
});

const CATS = [
  { id: "todos", label: "Todos" },
  { id: "corporativo", label: "Corporativo" },
  { id: "gobierno", label: "Gobierno y FFAA" },
  { id: "educacion", label: "Educación" },
  { id: "centro_comercial", label: "Centros comerciales" },
];

const catColor: Record<string, string> = {
  corporativo: "bg-[color:var(--color-siryc-blue)]",
  gobierno: "bg-[color:var(--color-siryc-red)]",
  educacion: "bg-[color:var(--color-siryc-gray)]",
  centro_comercial: "bg-[color:var(--color-siryc-dark)]",
};
const catLabel: Record<string, string> = {
  corporativo: "Corporativo",
  gobierno: "Gobierno y FFAA",
  educacion: "Educación",
  centro_comercial: "Centro comercial",
};

function ProyectosPage() {
  const [filter, setFilter] = useState("todos");

  const { data } = useQuery({
    queryKey: ["proyectos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("proyectos")
        .select("*")
        .order("anio", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filtered = (data ?? []).filter((p) => filter === "todos" || p.categoria === filter);

  return (
    <div>
      <PageHero
        title="Proyectos"
        subtitle="Casos de ingeniería documentada. Datos técnicos, alcance y resultados."
      />

      <section className="bg-white py-16">
        <div className="container-siryc">
          <div className="mb-10 flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  filter === c.id
                    ? "bg-[color:var(--color-siryc-dark)] text-white"
                    : "bg-[color:var(--color-siryc-light)]/30 text-[color:var(--color-siryc-dark)] hover:bg-[color:var(--color-siryc-light)]/60",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.05}>
                <article className="group h-full overflow-hidden rounded-2xl border border-black/5 bg-white transition-all hover:shadow-lg">
                  <div className="aspect-[16/10] overflow-hidden">
                    {p.imagen_principal_url && (
                      <img
                        src={p.imagen_principal_url}
                        alt={p.titulo}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <span
                      className={cn(
                        "inline-block rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white",
                        p.categoria ? catColor[p.categoria] : "bg-[color:var(--color-siryc-gray)]",
                      )}
                    >
                      {p.categoria ? catLabel[p.categoria] : ""}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-[color:var(--color-siryc-dark)]">
                      {p.titulo}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-[color:var(--color-siryc-gray)]">
                      {p.descripcion}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4 border-t border-black/5 pt-3 text-xs text-[color:var(--color-siryc-gray)]">
                      {p.metros_cuadrados && <span>{p.metros_cuadrados.toLocaleString("es-CL")} m²</span>}
                      {p.cantidad_equipos && <span>{p.cantidad_equipos} equipos</span>}
                      {p.anio && <span>{p.anio}</span>}
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-[color:var(--color-siryc-gray)]">
              No hay proyectos en esta categoría por ahora.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
