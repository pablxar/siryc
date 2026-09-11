import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  IconRulerMeasure,
  IconBolt,
  IconSnowflake,
  IconAirConditioning,
  type IconProps,
} from "@tabler/icons-react";

type Area = {
  titulo: string;
  desc: string;
  Icon: React.ComponentType<IconProps>;
};

const areas: Area[] = [
  {
    titulo: "Ingeniería",
    desc: "Diseñamos y ejecutamos proyectos de ingeniería a la medida de cada cliente.",
    Icon: IconRulerMeasure,
  },
  {
    titulo: "Electricidad",
    desc: "Instalación, mantención y tableros bajo normativa SEC y sistemas de control.",
    Icon: IconBolt,
  },
  {
    titulo: "Refrigeración",
    desc: "Sistemas de frío industrial y comercial: instalación, mantención y reparación.",
    Icon: IconSnowflake,
  },
  {
    titulo: "Climatización",
    desc: "Equipos para viviendas, comercios e industria con el mismo estándar técnico.",
    Icon: IconAirConditioning,
  },
];

function AreaCard({ area, index }: { area: Area; index: number }) {
  const { Icon } = area;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative isolate flex min-w-[78%] snap-center flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-5 shadow-[0_20px_50px_-28px_rgba(20,57,142,0.4)] transition-all duration-300 lg:hover:-translate-y-1 lg:hover:shadow-[0_28px_60px_-26px_rgba(20,57,142,0.5)] sm:min-w-0 lg:p-6"
    >
      {/* accent bar */}
      <span className="pointer-events-none absolute left-0 right-0 top-0 h-[3px] origin-left scale-x-0 rounded-b bg-[color:var(--color-siryc-red)] transition-transform duration-500 lg:group-hover:scale-x-100" />

      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--color-siryc-blue)]/6 text-[color:var(--color-siryc-blue)] transition-colors duration-300 group-hover:bg-[color:var(--color-siryc-blue)] group-hover:text-white">
          <Icon size={20} stroke={1.6} />
        </span>
        <h3 className="font-display text-lg font-bold leading-tight text-[color:var(--color-siryc-dark)] lg:text-xl">
          {area.titulo}
        </h3>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-siryc-gray)]">
        {area.desc}
      </p>

      <Link
        to="/servicios"
        className="mt-4 inline-flex items-center gap-1 self-start text-[13px] font-semibold text-[color:var(--color-siryc-blue)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-lg:opacity-100"
      >
        Ver servicio
        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.div>
  );
}

export function CoreAreas() {
  return (
    <section className="relative z-20 -mt-12 pb-4 lg:-mt-20">
      <div className="container-siryc">
        <div className="relative sm:static">
          {/* Lateral fade to soften the carousel edges on mobile */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[color:var(--color-siryc-blue)] to-transparent sm:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[color:var(--color-siryc-blue)] to-transparent sm:hidden" />

          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-10 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-5 lg:grid-cols-4 lg:gap-5">
            {areas.map((a, i) => (
              <AreaCard key={a.titulo} area={a} index={i} />
            ))}
          </div>
        </div>
        <p className="-mt-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-siryc-gray)] sm:hidden">
          Desliza para ver más →
        </p>
      </div>
    </section>
  );
}
