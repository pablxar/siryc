import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import climatizacionAsset from "@/assets/climatizacion.png.asset.json";
import electricidadAsset from "@/assets/electricidad.png.asset.json";
import bannerAsset from "@/assets/banner-web-siryc.png.asset.json";

type GalleryItem = {
  titulo: string;
  categoria: string;
  img: string;
};

const items: GalleryItem[] = [
  {
    titulo: "Proyecto comercial · Sistema VRF",
    categoria: "Climatización",
    img: climatizacionAsset.url,
  },
  {
    titulo: "Mantención de sistema de frío industrial",
    categoria: "Refrigeración",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1400&q=80",
  },
  {
    titulo: "Edificio corporativo · Tableros eléctricos",
    categoria: "Electricidad",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80",
  },
  {
    titulo: "Institución educacional · Climatización",
    categoria: "Climatización",
    img: bannerAsset.url,
  },
  {
    titulo: "Armada de Chile · Mantención de tableros eléctricos",
    categoria: "Electricidad",
    img: electricidadAsset.url,
  },
];

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function HorizontalGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const view = viewportRef.current;
      if (!track || !view) return;
      // total horizontal travel so the last card ends fully visible
      const d = Math.max(0, track.scrollWidth - view.clientWidth);
      setDistance(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      ref={ref}
      className="relative bg-[color:var(--color-siryc-dark)] text-white"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="container-siryc pt-16 pb-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-siryc-red)]">
                — Obra ejecutada
              </span>
              <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight md:text-5xl">
                Proyectos recientes.
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

        <div ref={viewportRef} className="relative flex-1 overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex h-full w-max items-center gap-8 px-[4vw] will-change-transform"
          >
            {items.map((it, i) => (
              <article
                key={it.titulo}
                className="group relative h-[62vh] w-[78vw] shrink-0 overflow-hidden rounded-[2rem] bg-black/40 md:w-[52vw] lg:w-[40vw]"
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
