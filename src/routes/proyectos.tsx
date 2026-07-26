import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { EditorialHero } from "@/components/site/EditorialHero";
import { SectionMarker } from "@/components/site/Parallax";
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
  const total = data?.length ?? 0;

  return (
    <div>
      <EditorialHero
        index="01"
        eyebrow="Casos ejecutados"
        title="Ingeniería documentada, obra por obra."
        subtitle="Datos técnicos, alcance y resultados de proyectos ejecutados en sectores exigentes."
      >
        <div className="mt-8 flex flex-wrap items-baseline gap-8 text-white/70">
          <div>
            <div className="font-display text-5xl font-bold text-white md:text-6xl">
              {total}
            </div>
            <div className="mt-1 font-mono text-xs uppercase tracking-[0.3em]">
              Proyectos publicados
            </div>
          </div>
          <div>
            <div className="font-display text-5xl font-bold text-white md:text-6xl">
              20+
            </div>
            <div className="mt-1 font-mono text-xs uppercase tracking-[0.3em]">
              Años de trayectoria
            </div>
          </div>
        </div>
      </EditorialHero>

      <section className="bg-white py-20">
        <div className="container-siryc">
          <SectionMarker index="02" label="Catálogo" />

          {/* Filter chips */}
          <div className="mb-12 flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-sm font-medium transition-all",
                  filter === c.id
                    ? "border-[color:var(--color-siryc-dark)] bg-[color:var(--color-siryc-dark)] text-white shadow-[0_10px_25px_-10px_rgba(27,35,44,0.5)]"
                    : "border-black/10 bg-white text-[color:var(--color-siryc-gray)] hover:border-[color:var(--color-siryc-dark)]/40 hover:text-[color:var(--color-siryc-dark)]",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-black/5 bg-white"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-siryc-dark)]">
                  {p.imagen_principal_url && (
                    <img
                      src={p.imagen_principal_url}
                      alt={p.titulo}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-siryc-dark)]/90 via-[color:var(--color-siryc-dark)]/20 to-transparent" />

                  {/* Category badge */}
                  <div className="absolute left-5 top-5">
                    <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur-md">
                      {p.categoria ? catLabel[p.categoria] : "Proyecto"}
                    </span>
                  </div>

                  {/* Year top-right */}
                  {p.anio && (
                    <div className="absolute right-5 top-5 font-mono text-xs text-white/70">
                      {p.anio}
                    </div>
                  )}

                  {/* Bottom content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="font-display text-xl font-semibold leading-tight">
                      {p.titulo}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-white/75">
                      {p.descripcion}
                    </p>
                    <div className="mt-4 flex items-center gap-4 border-t border-white/15 pt-3 font-mono text-[11px] uppercase tracking-widest text-white/70">
                      {p.metros_cuadrados && (
                        <span>{p.metros_cuadrados.toLocaleString("es-CL")} m²</span>
                      )}
                      {p.cantidad_equipos && <span>{p.cantidad_equipos} eq.</span>}
                    </div>
                  </div>

                  <div className="absolute right-5 bottom-5 flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-siryc-red)] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 translate-y-2">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-[color:var(--color-siryc-gray)]">
              No hay proyectos en esta categoría por ahora.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
