import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FadeIn, RevealGroup, RevealItem } from "@/components/site/FadeIn";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { StackedSpecialties } from "@/components/site/StackedSpecialties";
import { HorizontalGallery } from "@/components/site/HorizontalGallery";
import { OperationalContinuity } from "@/components/site/OperationalContinuity";
import bannerWeb from "@/assets/banner-web-siryc.png.asset.json";
import imgRefrigeracion from "@/assets/refrigeracion.png.asset.json";
import imgClimatizacion from "@/assets/climatizacion.png.asset.json";
import imgElectricidad from "@/assets/electricidad.png.asset.json";

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
  {
    titulo: "Ingeniería",
    desc: "Diseñamos, desarrollamos y ejecutamos proyectos de ingeniería a la medida de cada cliente.",
  },
  {
    titulo: "Electricidad",
    desc: "Instalación y mantenciones eléctricas, tableros y sistemas de control y detección de incendio, bajo normativa SEC.",
  },
  { titulo: "Refrigeración", desc: "Instalación, mantención y reparación de sistemas de frío industrial y comercial." },
  {
    titulo: "Climatización",
    desc: "Instalación, mantención y reparación de equipos para espacios domiciliarios, comerciales e industriales.",
  },
];

const especialidades = [
  {
    titulo: "Refrigeración",
    desc: "Mantención preventiva y correctiva a los sistemas de frío para que operen sin interrupciones, con respuesta técnica garantizada ante cualquier falla.",
    img: imgRefrigeracion.url,
  },
  {
    titulo: "Climatización y aire acondicionado",
    desc: "Desde una vivienda hasta un centro comercial completo, con el mismo estándar de instalación en cada escala de proyecto.",
    img: imgClimatizacion.url,
  },
  {
    titulo: "Electricidad industrial",
    desc: "Instalaciones, tableros, sistemas de control centralizado, detección de incendio y mantención eléctrica preventiva. Todo bajo normativas y registros técnicos documentados.",
    img: imgElectricidad.url,
  },
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
              <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-5xl">
                Ingeniería en climatización, refrigeración y electricidad.
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
                Más de 20 años instalando y manteniendo sistemas técnicos para centros comerciales, edificios
                corporativos e instituciones de gobierno en Chile.
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
                    Ver servicios
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
                <h3 className="font-display text-xl font-bold text-[color:var(--color-siryc-dark)]">{p.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-siryc-gray)]">{p.desc}</p>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ESPECIALIDADES — stacked cards on scroll */}
      <section className="container-siryc pt-24 pb-2">
        <div className="mb-6 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <FadeIn>
            <div className="max-w-xl">
              <h2 className="font-display text-4xl font-extrabold text-[color:var(--color-siryc-blue)] md:text-5xl">
                Tres áreas técnicas, un mismo equipo.
              </h2>
              <p className="mt-4 text-[color:var(--color-siryc-gray)]">
                Refrigeración, climatización y electricidad instaladas y mantenidas por el mismo equipo de técnicos que
                llevan más de 20 años en terreno.
              </p>
            </div>
          </FadeIn>
          <div className="hidden h-px flex-grow bg-slate-200 lg:mx-8 lg:block" />
        </div>
      </section>
      <StackedSpecialties items={especialidades} />

      {/* POR QUÉ SIRYC */}
      <OperationalContinuity />


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
                Relaciones técnicas de largo plazo con corporativos, retail, educación y Fuerzas Armadas.
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
                48 unidades instaladas, sistema VRF y ventilación mecánica. Contrato de mantención anual vigente desde
                2020.
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
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block">
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
