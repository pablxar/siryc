import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";

type GalleryItem = {
  titulo: string;
  categoria: string;
  img: string;
};

const items: GalleryItem[] = [
  {
    titulo: "Centro comercial · VRF 12.000 m²",
    categoria: "Climatización",
    img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1400&q=80",
  },
  {
    titulo: "Data center · Chillers redundantes",
    categoria: "Refrigeración",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1400&q=80",
  },
  {
    titulo: "Edificio corporativo · Tableros",
    categoria: "Electricidad",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80",
  },
  {
    titulo: "Institución educacional · HVAC",
    categoria: "Climatización",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1400&q=80",
  },
  {
    titulo: "Armada de Chile · Mantención",
    categoria: "Gobierno / FFAA",
    img: "https://images.unsplash.com/photo-1581092918484-8313ce1c1c9b?w=1400&q=80",
  },
];

export function HorizontalGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Move the track from 0 to negative width (translate in %)
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);

  return (
    <section
      ref={ref}
      className="relative bg-[color:var(--color-siryc-dark)] text-white"
      style={{ height: `${items.length * 90}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="container-siryc pt-16 pb-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-siryc-red)]">
                — Obra ejecutada
              </span>
              <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight md:text-5xl">
                Proyectos que sostienen operaciones críticas.
              </h2>
            </div>
            <Link
              to="/proyectos"
              className="hidden shrink-0 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 md:inline-block"
            >
              Ver catálogo →
            </Link>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex h-full items-center gap-8 pl-[4vw] pr-[10vw] will-change-transform"
          >
            {items.map((it, i) => (
              <article
                key={it.titulo}
                className="group relative h-[68vh] w-[68vw] shrink-0 overflow-hidden rounded-[2rem] bg-black/40 md:w-[46vw] lg:w-[38vw]"
              >
                <img
                  src={it.img}
                  alt={it.titulo}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-700 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute left-6 top-6 rounded-full border border-white/25 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] backdrop-blur-md">
                  {String(i + 1).padStart(2, "0")} · {it.categoria}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <h3 className="font-display text-2xl font-semibold leading-tight md:text-3xl">
                    {it.titulo}
                  </h3>
                </div>
              </article>
            ))}
          </motion.div>

          {/* progress rail */}
          <div className="pointer-events-none absolute bottom-6 left-1/2 h-[2px] w-[280px] -translate-x-1/2 overflow-hidden rounded-full bg-white/15">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full origin-left bg-[color:var(--color-siryc-red)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
