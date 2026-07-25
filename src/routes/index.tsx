import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Snowflake, Wind, Zap, Check, ArrowRight, Play, Settings, Thermometer } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FadeIn } from "@/components/site/FadeIn";


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
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-[color:var(--color-siryc-dark)] text-white">
        {/* TODO: reemplazar imagen de fondo por video industrial en loop */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[color:var(--color-siryc-dark)]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[color:var(--color-siryc-dark)]" />

        <div className="absolute right-5 top-5 hidden rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-wider backdrop-blur md:flex md:items-center md:gap-2">
          <ShieldCheck size={14} />
          Certificación ISO 9001:2015
        </div>

        <div className="container-siryc relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="mb-6 flex gap-1">
              <div className="h-1 w-12 bg-[color:var(--color-siryc-red)]" />
              <div className="h-1 w-12 bg-[color:var(--color-siryc-blue)]" />
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Ingeniería que sostiene la operación de tu edificio.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
              Más de 20 años en refrigeración, climatización y electricidad para
              centros comerciales, edificios corporativos, instituciones
              educacionales y las Fuerzas Armadas de Chile.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 rounded-md bg-[color:var(--color-siryc-red)] px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Solicitar cotización <ArrowRight size={16} />
              </Link>
              <Link
                to="/servicios"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                Conoce nuestros servicios
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 z-10">
          <div className="container-siryc">
            <div className="mb-2 flex gap-1">
              <div className="h-[3px] w-16 bg-[color:var(--color-siryc-red)]" />
              <div className="h-[3px] w-16 bg-[color:var(--color-siryc-blue)]" />
            </div>
            <p className="font-display text-lg font-semibold text-[color:var(--color-siryc-red)] md:text-xl">
              Tu clima, nuestra ingeniería.
            </p>
          </div>
        </div>
      </section>

      {/* CIFRAS */}
      <section className="bg-[color:var(--color-siryc-gray)] text-white">
        <div className="container-siryc grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {[
            { n: "+20", l: "Años de experiencia" },
            { n: "+250", l: "Proyectos ejecutados" },
            { n: "100%", l: "Plazos cumplidos" },
            { n: "ISO 9001:2015", l: "Gestión de calidad" },
          ].map((c, i) => (
            <FadeIn key={i} delay={i * 0.08} className="text-center md:text-left">
              <div className="font-display text-3xl font-bold md:text-5xl">{c.n}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/70 md:text-sm">
                {c.l}
              </div>
            </FadeIn>
          ))}
        </div>
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
