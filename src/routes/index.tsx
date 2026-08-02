import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FadeIn, RevealGroup, RevealItem } from "@/components/site/FadeIn";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { StackedSpecialties } from "@/components/site/StackedSpecialties";
import { HorizontalGallery } from "@/components/site/HorizontalGallery";
import { Counter } from "@/components/site/Counter";
import bannerWeb from "@/assets/banner-web-siryc.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SIRYC — Ingeniería en refrigeración, climatización y electricidad" },
      {
        name: "description",
        content:
          "Más de 20 años en refrigeración industrial, climatización y electricidad para centros comerciales, edificios corporativos e instituciones en Chile.",
      },
      { property: "og:title", content: "SIRYC — Ingeniería en refrigeración, climatización y electricidad" },
      {
        property: "og:description",
        content:
          "Más de 20 años en refrigeración industrial, climatización y electricidad para centros comerciales, edificios corporativos e instituciones en Chile.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const pilares = [
  { titulo: "Ingeniería", desc: "Diseño conceptual y de detalle para soluciones termodinámicas complejas." },
  { titulo: "Electricidad", desc: "Instalaciones de fuerza, control y automatización bajo normativa SEC." },
  { titulo: "Refrigeración", desc: "Sistemas de frío industrial y comercial con máxima eficiencia energética." },
  { titulo: "Climatización", desc: "Soluciones HVAC personalizadas para edificios y centros industriales." },
];

const especialidades = [
  {
    titulo: "Refrigeración industrial",
    desc: "Mantención preventiva y correctiva, plantas de agua fría, sistemas para data centers y salas eléctricas.",
    img: "https://images.unsplash.com/photo-1581092918484-8313ce1c1c9b?w=1000&q=80",
  },
  {
    titulo: "Climatización y aire acondicionado",
    desc: "Sistemas VRF, proyectos llave en mano y ventilación industrial para centros comerciales y oficinas.",
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1000&q=80",
  },
  {
    titulo: "Electricidad industrial",
    desc: "Instalaciones, tableros, sistemas de control centralizado y mantención eléctrica preventiva.",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&q=80",
  },
];

const razones = [
  { titulo: "Ingeniería documentada en cada proyecto", desc: "Memoria técnica, planos y protocolos entregables para cada intervención." },
  { titulo: "Equipos certificados y personal capacitado", desc: "Técnicos con acreditación SEC y formación continua en nuevas tecnologías." },
  { titulo: "Experiencia en sectores exigentes", desc: "Gobierno, FFAA, retail corporativo, salud y educación con estándares críticos." },
  { titulo: "Respuesta técnica garantizada", desc: "SLA definidos y guardia operativa para asegurar la continuidad de tu operación." },
  { titulo: "Más de dos décadas de continuidad operativa", desc: "20+ años ejecutando contratos de mantención y proyectos llave en mano." },
];

const stats = [
  { valor: "+20", label: "Años de Trayectoria" },
  { valor: "500+", label: "Proyectos Entregados" },
  { valor: "ISO", label: "9001 Certificados" },
  { valor: "24/7", label: "Respuesta Técnica" },
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
    <div className="bg-slate-50 text-[color:var(--color-siryc-dark)]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[color:var(--color-siryc-blue)] py-24 lg:min-h-[720px] lg:py-36">
        {/* Desktop hero image */}
        <div className="absolute inset-0 z-0 hidden lg:block">
          <img
            src={bannerWeb.url}
            alt="Técnico SIRYC supervisando instalación industrial de refrigeración"
            className="h-full w-full object-cover object-center"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in oklab, var(--color-siryc-blue) 92%, transparent) 0%, color-mix(in oklab, var(--color-siryc-blue) 55%, transparent) 45%, transparent 75%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 50%, color-mix(in oklab, var(--color-siryc-blue) 70%, transparent) 100%)",
            }}
          />
        </div>

        {/* Mobile texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] lg:hidden"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/3 translate-x-1/3 rounded-full bg-white/5 blur-3xl lg:hidden" />

        <div className="container-siryc relative z-10">
          <RevealGroup className="max-w-4xl">
            <RevealItem>
              <span className="mb-8 inline-block rounded-full bg-[color:var(--color-siryc-red)] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-white">
                Tu clima, nuestra ingeniería
              </span>
            </RevealItem>
            <RevealItem>
              <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-white md:text-7xl lg:text-[6.5rem]">
                Ingeniería de{" "}
                <span className="text-white/60">Precisión Térmica.</span>
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
                Más de 20 años liderando proyectos de refrigeración, climatización y electricidad
                con estándares <span className="font-semibold text-white">ISO 9001</span> en todo Chile.
              </p>
            </RevealItem>
            <RevealItem>
              <div className="mt-12 flex flex-wrap gap-4">
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/contacto"
                    className="inline-block rounded-full bg-white px-10 py-5 text-sm font-bold text-[color:var(--color-siryc-blue)] transition-shadow hover:shadow-2xl hover:shadow-black/30"
                  >
                    Iniciar proyecto
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/servicios"
                    className="inline-block rounded-full border border-white/30 px-10 py-5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                  >
                    Nuestra ingeniería
                  </Link>
                </motion.div>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* PILARES flotantes */}
      <section className="container-siryc relative z-20 -mt-14">
        <RevealGroup inView className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pilares.map((p, i) => (
            <RevealItem key={p.titulo}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group h-full rounded-2xl border border-black/5 bg-white p-8 shadow-xl shadow-[color:var(--color-siryc-blue)]/5 transition-colors duration-300 hover:border-[color:var(--color-siryc-blue)]"
              >
                <div className="mb-4 font-display text-xs font-bold uppercase tracking-[0.25em] text-[color:var(--color-siryc-blue)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-xl font-bold text-[color:var(--color-siryc-dark)]">
                  {p.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-siryc-gray)]">
                  {p.desc}
                </p>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>

      </section>

      {/* ESPECIALIDADES — stacked cards on scroll */}
      <section className="container-siryc pt-32 pb-4">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <FadeIn>
            <div className="max-w-xl">
              <h2 className="font-display text-4xl font-extrabold text-[color:var(--color-siryc-blue)] md:text-5xl">
                Tres líneas técnicas, una sola ingeniería.
              </h2>
              <p className="mt-4 text-[color:var(--color-siryc-gray)]">
                Dominio técnico total en montaje, mantenimiento y consultoría estratégica.
              </p>
            </div>
          </FadeIn>
          <div className="hidden h-px flex-grow bg-slate-200 lg:mx-8 lg:block" />
          <div className="font-mono text-sm font-bold text-[color:var(--color-siryc-red)]">
            EST. 2004
          </div>
        </div>
      </section>
      <StackedSpecialties items={especialidades} />


      {/* POR QUÉ SIRYC */}
      <section className="border-y border-slate-100 bg-white py-32">
        <div className="container-siryc grid grid-cols-1 gap-24 lg:grid-cols-2">
          <FadeIn>
            <h2 className="font-display text-4xl font-extrabold text-[color:var(--color-siryc-blue)]">
              Continuidad operativa,<br />sin improvisación.
            </h2>
            <div className="mt-12 space-y-8">
              {razones.map((r) => (
                <div key={r.titulo} className="flex gap-6">
                  <div className="mt-1 h-12 w-[2px] flex-shrink-0 bg-[color:var(--color-siryc-red)]" />
                  <div>
                    <h5 className="font-semibold text-[color:var(--color-siryc-dark)]">
                      {r.titulo}
                    </h5>
                    <p className="mt-1 text-sm leading-relaxed text-[color:var(--color-siryc-gray)]">
                      {r.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-slate-100 p-px shadow-2xl shadow-[color:var(--color-siryc-blue)]/10">
              {stats.map((s) => (
                <div key={s.label} className="bg-white p-10 text-center lg:p-14">
                  <Counter
                    value={s.valor}
                    className="font-display text-5xl font-black text-[color:var(--color-siryc-blue)]"
                  />
                  <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--color-siryc-gray)]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CLIENTES — marquee */}
      <section className="border-y border-black/5 bg-white py-20">
        <div className="container-siryc">
          <FadeIn>
            <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-siryc-red)]">
                  — Confianza institucional
                </span>
                <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-[color:var(--color-siryc-dark)] md:text-4xl">
                  Empresas e instituciones que confían en SIRYC.
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-[color:var(--color-siryc-gray)]">
                Relaciones técnicas de largo plazo con corporativos, retail,
                educación y Fuerzas Armadas.
              </p>
            </div>
          </FadeIn>
        </div>
        <LogoMarquee />
      </section>

      {/* HORIZONTAL SCROLL GALLERY — pinned */}
      <HorizontalGallery />

      {/* PROYECTO DESTACADO */}
      <section className="container-siryc py-24">
        <FadeIn>
          <div className="flex flex-col overflow-hidden rounded-[2.5rem] bg-[color:var(--color-siryc-blue)] shadow-2xl shadow-[color:var(--color-siryc-blue)]/20 lg:flex-row">
            <div className="relative min-h-[400px] lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1400&q=80"
                alt="Proyecto destacado SIRYC"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-12 text-white lg:w-1/2 lg:p-20">
              <span className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-[color:var(--color-siryc-red)]">
                Proyecto destacado
              </span>
              <h3 className="font-display text-4xl font-bold leading-tight">
                Climatización integral de 12.000 m² en centro comercial.
              </h3>
              <p className="mt-8 text-lg leading-relaxed text-white/75">
                48 unidades instaladas, sistema VRF y ventilación mecánica.
                Contrato de mantención anual vigente desde 2020.
              </p>
              <div className="mt-10">
                <Link
                  to="/proyectos"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white hover:text-[color:var(--color-siryc-blue)]"
                >
                  Ver todos los proyectos <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* BLOG PREVIEW */}
      <section className="bg-slate-100/60 py-32">
        <div className="container-siryc">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--color-siryc-gray)]">
                Actualidad técnica
              </p>
              <h2 className="font-display text-4xl font-extrabold text-[color:var(--color-siryc-blue)]">
                Análisis y normativa para operaciones.
              </h2>
            </div>
            <Link
              to="/blog"
              className="border-b-2 border-[color:var(--color-siryc-red)] pb-1 text-sm font-bold text-[color:var(--color-siryc-dark)]"
            >
              Leer todas las noticias
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {(posts ?? []).map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.1}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group block"
                >
                  <div className="mb-6 aspect-video overflow-hidden rounded-2xl bg-slate-200">
                    {p.imagen_url && (
                      <img
                        src={p.imagen_url}
                        alt={p.titulo}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[color:var(--color-siryc-red)]">
                    {p.categoria}
                  </span>
                  <h4 className="mt-3 font-display text-xl font-bold leading-snug text-[color:var(--color-siryc-dark)] transition-colors group-hover:text-[color:var(--color-siryc-blue)]">
                    {p.titulo}
                  </h4>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[color:var(--color-siryc-gray)]">
                    {p.extracto}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="container-siryc py-32">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[3rem] bg-[color:var(--color-siryc-blue)] p-12 text-center md:p-24">
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-[color:var(--color-siryc-red)]/20 blur-3xl" />
            <div className="relative z-10">
              <h2 className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-tight text-white md:text-6xl">
                ¿Necesitas una cotización técnica?
              </h2>
              <p className="mx-auto mt-8 max-w-xl text-lg text-white/75">
                Nuestro equipo evalúa tu instalación y entrega una propuesta documentada.
              </p>
              <div className="mt-12 flex flex-wrap justify-center gap-4">
                <Link
                  to="/contacto"
                  className="rounded-full bg-[color:var(--color-siryc-red)] px-12 py-5 text-sm font-bold text-white transition-all hover:shadow-2xl hover:shadow-[color:var(--color-siryc-red)]/40"
                >
                  Contactar a SIRYC
                </Link>
                <Link
                  to="/proyectos"
                  className="rounded-full bg-white px-12 py-5 text-sm font-bold text-[color:var(--color-siryc-blue)] transition-colors hover:bg-white/90"
                >
                  Ver proyectos
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
