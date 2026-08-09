import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/site/FadeIn";

export type Testimonio = {
  cita: string;
  nombre: string;
  cargo: string;
  empresa: string;
};

const defaultTestimonios: Testimonio[] = [
  {
    cita:
      "Llevamos [X] años trabajando con SIRYC en la mantención de nuestros sistemas de climatización. Nunca hemos tenido un problema sin resolver a tiempo.",
    nombre: "[Nombre del contacto]",
    cargo: "[Cargo]",
    empresa: "[Empresa]",
  },
  {
    cita:
      "Lo que más valoramos de SIRYC es que cada intervención queda documentada. Sabemos exactamente qué se hizo y cuándo.",
    nombre: "[Nombre del contacto]",
    cargo: "[Cargo]",
    empresa: "[Empresa]",
  },
  {
    cita:
      "Cuando tuvimos una falla eléctrica fuera de horario, SIRYC respondió esa misma noche. Esa es la diferencia entre un proveedor y un socio técnico.",
    nombre: "[Nombre del contacto]",
    cargo: "[Cargo]",
    empresa: "[Empresa]",
  },
];

export function Testimonials({ items = defaultTestimonios }: { items?: Testimonio[] }) {
  const list = items.slice(0, 5);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || list.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % list.length), 7000);
    return () => clearInterval(id);
  }, [paused, list.length]);

  if (list.length === 0) return null;
  const t = list[Math.min(index, list.length - 1)];

  return (
    <section className="bg-white py-24">
      <div className="container-siryc">
        <FadeIn>
          <div
            className="mx-auto max-w-4xl text-center"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-siryc-red)]">
              — Testimonios
            </span>

            <div className="mt-10 min-h-[220px] md:min-h-[240px]">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <blockquote className="font-display text-2xl font-light italic leading-snug text-[color:var(--color-siryc-dark)] md:text-4xl">
                    “{t.cita}”
                  </blockquote>
                  <figcaption className="mt-10">
                    <div className="font-display text-base font-bold text-[color:var(--color-siryc-dark)]">
                      {t.nombre}
                    </div>
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[color:var(--color-siryc-gray)]">
                      {t.cargo}, {t.empresa}
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {list.length > 1 && (
              <div className="mt-8 flex justify-center gap-3">
                {list.map((item, i) => (
                  <button
                    key={item.cita}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Ver testimonio ${i + 1}`}
                    aria-current={i === index}
                    className={`h-2.5 w-2.5 rounded-full border transition-all ${
                      i === index
                        ? "scale-110 border-[color:var(--color-siryc-blue)] bg-[color:var(--color-siryc-blue)]"
                        : "border-[color:var(--color-siryc-gray)]/50 bg-transparent hover:border-[color:var(--color-siryc-blue)]"
                    }`}
                  />
                ))}
              </div>
            )}

            <div className="mt-14">
              <Link
                to="/proyectos"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[color:var(--color-siryc-blue)] px-8 py-4 text-sm font-bold text-[color:var(--color-siryc-blue)] transition-all hover:bg-[color:var(--color-siryc-blue)] hover:text-white"
              >
                Ver todos los proyectos <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
