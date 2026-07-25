import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Snowflake, Wind, Zap, Check, ArrowRight, Play, Settings } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FadeIn } from "@/components/site/FadeIn";
import { cn } from "@/lib/utils";




export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SIRYC — Ingeniería en refrigeración, climatización y electricidad" },
      {
        name: "description",
        content:
          "Más de 20 años en refrigeración industrial, climatización y electricidad para centros comerciales, edificios corporativos e instituciones en Chile.",
      },
      { property: "og:title", content: "SIRYC — Tu clima, nuestra ingeniería." },
      {
        property: "og:description",
        content:
          "Ingeniería que sostiene la operación de tu edificio. Refrigeración, climatización y electricidad.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const especialidades = [
  {
    icon: Snowflake,
    titulo: "Refrigeración industrial",
    desc: "Mantención preventiva y correctiva, plantas de agua fría, sistemas para data centers y salas eléctricas.",
    href: "/servicios",
  },
  {
    icon: Wind,
    titulo: "Climatización y aire acondicionado",
    desc: "Sistemas VRF, proyectos llave en mano y ventilación industrial para centros comerciales y oficinas.",
    href: "/servicios",
  },
  {
    icon: Zap,
    titulo: "Electricidad industrial",
    desc: "Instalaciones, tableros, sistemas de control centralizado y mantención eléctrica preventiva.",
    href: "/servicios",
  },
];

const razones = [
  "Ingeniería documentada en cada proyecto",
  "Equipos certificados y personal capacitado",
  "Experiencia en sectores exigentes: gobierno, FFAA, corporativo",
  "Respuesta técnica garantizada",
  "Más de dos décadas de continuidad operativa",
];

function HomePage() {
  const { data: posts } = useQuery({
    queryKey: ["home-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id,titulo,slug,extracto,imagen_url,categoria,created_at")
        .eq("publicado", true)
        .order("created_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  return (
    <div>
      {/* HERO */}
      <section className="relative flex flex-col border-b border-black/5 bg-white lg:flex-row lg:min-h-[640px]">
        {/* Left: content */}
        <div className="flex flex-1 flex-col justify-center px-6 py-16 md:px-12 lg:py-24 lg:pl-16 xl:pl-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-xl"
          >
            <div className="mb-7 inline-flex items-center gap-3">
              <span className="h-[3px] w-12 bg-[color:var(--color-siryc-red)]" />
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--color-siryc-blue)]">
                Tu clima, nuestra ingeniería
              </span>
            </div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-[color:var(--color-siryc-dark)] md:text-6xl lg:text-7xl">
              Ingeniería de{" "}
              <span className="text-[color:var(--color-siryc-blue)]">Precisión</span>{" "}
              Térmica.
            </h1>
            <p className="mt-7 max-w-lg text-lg font-light leading-relaxed text-[color:var(--color-siryc-gray)]">
              Más de 20 años liderando proyectos de refrigeración, climatización
              y electricidad con estándares{" "}
              <span className="font-semibold text-[color:var(--color-siryc-dark)]">
                ISO 9001
              </span>{" "}
              en todo Chile.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                to="/servicios"
                className="bg-[color:var(--color-siryc-blue)] px-10 py-5 text-xs font-bold uppercase tracking-widest text-white shadow-[0_20px_40px_-15px_rgba(20,57,142,0.5)] transition-all hover:shadow-[0_25px_50px_-10px_rgba(20,57,142,0.6)]"
              >
                Explorar Servicios
              </Link>
              <Link to="/nosotros" className="group flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-black/10 transition-colors group-hover:border-[color:var(--color-siryc-blue)]">
                  <Play
                    size={18}
                    className="ml-0.5 fill-[color:var(--color-siryc-blue)] text-[color:var(--color-siryc-blue)]"
                  />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--color-siryc-gray)]">
                  Ver trayectoria
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right: visual */}
        <div className="relative flex-1 bg-[color:var(--color-siryc-light)]/20 min-h-[420px] lg:min-h-0">
          <img
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1400&q=80"
            alt="Sistemas HVAC industriales instalados por SIRYC"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent lg:from-white/60" />
          <FadeIn
            delay={0.25}
            className="absolute bottom-8 right-6 max-w-xs bg-white p-7 shadow-[0_20px_50px_rgba(20,57,142,0.18)] md:bottom-12 md:right-12"
          >
            <div className="h-1 w-12 bg-[color:var(--color-siryc-blue)]" />
            <div className="mt-4 font-display text-4xl font-bold text-[color:var(--color-siryc-blue)]">
              +20
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[color:var(--color-siryc-gray)]">
              Años de Experiencia
            </div>
            <p className="mt-4 text-xs leading-relaxed text-[color:var(--color-siryc-gray)]">
              Garantizamos la continuidad operativa de sus procesos con
              ingeniería de alto estándar.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* PILARES */}
      <section className="grid grid-cols-1 bg-[color:var(--color-siryc-blue)] md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: Settings,
            titulo: "Ingeniería",
            desc: "Diseño conceptual y de detalle para soluciones termodinámicas complejas.",
          },
          {
            icon: Zap,
            titulo: "Electricidad",
            desc: "Instalaciones de fuerza, control y automatización bajo normativa SEC.",
          },
          {
            icon: Snowflake,
            titulo: "Refrigeración",
            desc: "Sistemas de frío industrial y comercial con máxima eficiencia energética.",
          },
          {
            icon: Wind,
            titulo: "Climatización",
            desc: "Soluciones HVAC personalizadas para edificios y centros industriales.",
          },
        ].map((p, i, arr) => (
          <FadeIn
            key={p.titulo}
            delay={i * 0.08}
            className={cn(
              "group cursor-default p-10 transition-colors hover:bg-[#0e2a6d] lg:p-12",
              i < arr.length - 1 && "lg:border-r lg:border-white/10",
            )}
          >
            <div className="mb-6 h-12 w-12 text-white transition-transform group-hover:scale-110">
              <p.icon strokeWidth={1.5} className="h-full w-full" />
            </div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
              {p.titulo}
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-white/70">
              {p.desc}
            </p>
          </FadeIn>
        ))}
      </section>


      {/* ESPECIALIDADES */}
      <section className="bg-white py-20">
        <div className="container-siryc">
          <FadeIn>
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-siryc-blue)]">
                Especialidades
              </p>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Tres líneas técnicas, una sola ingeniería.
              </h2>
            </div>
          </FadeIn>
          <div className="grid gap-8 md:grid-cols-3">
            {especialidades.map((e, i) => (
              <FadeIn key={e.titulo} delay={i * 0.1}>
                <div className="group h-full rounded-lg border border-black/5 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(20,57,142,0.08)]">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-md bg-[color:var(--color-siryc-blue)] text-white">
                    <e.icon size={22} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[color:var(--color-siryc-dark)]">
                    {e.titulo}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-siryc-gray)]">
                    {e.desc}
                  </p>
                  <Link
                    to={e.href}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--color-siryc-blue)]"
                  >
                    Ver más <ArrowRight size={14} />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUÉ SIRYC */}
      <section className="bg-[color:var(--color-siryc-light)]/40 py-20">
        <div className="container-siryc grid items-center gap-12 md:grid-cols-2">
          <FadeIn>
            <img
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1000&q=80"
              alt="Técnico SIRYC en terreno realizando mantención"
              className="rounded-lg object-cover shadow-lg"
              loading="lazy"
            />
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-siryc-blue)]">
              Por qué SIRYC
            </p>
            <h2 className="font-display text-3xl font-bold text-[color:var(--color-siryc-dark)] md:text-4xl">
              Continuidad operativa, sin improvisación.
            </h2>
            <ul className="mt-6 space-y-3">
              {razones.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[color:var(--color-siryc-dark)]">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--color-siryc-blue)] text-white">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-sm md:text-base">{r}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* CLIENTES */}
      <section className="bg-white py-16">
        <div className="container-siryc">
          <FadeIn>
            <h2 className="mb-10 text-center font-display text-2xl font-bold text-[color:var(--color-siryc-dark)] md:text-3xl">
              Empresas e instituciones que confían en SIRYC
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {["Armada de Chile", "Centro Comercial", "Corporativo", "Colegio", "Institución", "Corporativo"].map((c, i) => (
              <div
                key={i}
                className="flex aspect-[3/2] items-center justify-center rounded-md border border-black/5 bg-[color:var(--color-siryc-light)]/25 p-4 text-center text-[10px] font-semibold uppercase tracking-wider text-[color:var(--color-siryc-gray)]"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROYECTO DESTACADO */}
      <section className="bg-[color:var(--color-siryc-dark)] py-20 text-white">
        <div className="container-siryc grid items-center gap-10 md:grid-cols-2">
          <FadeIn>
            <img
              src="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=80"
              alt="Proyecto destacado SIRYC"
              className="aspect-[4/3] w-full rounded-lg object-cover"
              loading="lazy"
            />
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-siryc-red)]">
              Proyecto destacado
            </p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Climatización integral de 12.000 m² en centro comercial.
            </h2>
            <p className="mt-4 text-white/70">
              48 unidades instaladas, sistema VRF y ventilación mecánica.
              Contrato de mantención anual vigente desde 2020.
            </p>
            <Link
              to="/proyectos"
              className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Ver todos los proyectos <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="bg-white py-20">
        <div className="container-siryc">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-siryc-blue)]">
                Actualidad técnica
              </p>
              <h2 className="font-display text-3xl font-bold text-[color:var(--color-siryc-dark)] md:text-4xl">
                Análisis y normativa para operaciones.
              </h2>
            </div>
            <Link
              to="/blog"
              className="text-sm font-semibold text-[color:var(--color-siryc-blue)]"
            >
              Ver todos →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {(posts ?? []).map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.1}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group block overflow-hidden rounded-lg border border-black/5 transition-all hover:shadow-lg"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[color:var(--color-siryc-light)]/30">
                    {p.imagen_url && (
                      <img
                        src={p.imagen_url}
                        alt={p.titulo}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[color:var(--color-siryc-red)]">
                      {p.categoria}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-[color:var(--color-siryc-dark)]">
                      {p.titulo}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-[color:var(--color-siryc-gray)]">
                      {p.extracto}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-[color:var(--color-siryc-blue)] py-16 text-white">
        <div className="container-siryc text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            ¿Necesitas una cotización técnica?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Nuestro equipo evalúa tu instalación y entrega una propuesta
            documentada.
          </p>
          <Link
            to="/contacto"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-7 py-3.5 text-sm font-semibold text-[color:var(--color-siryc-blue)] transition-opacity hover:opacity-90"
          >
            Contactar a SIRYC <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
