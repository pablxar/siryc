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
  num: string;
  titulo: string;
  desc: string;
  Icon: React.ComponentType<IconProps>;
};

const areas: Area[] = [
  {
    num: "01",
    titulo: "Ingeniería",
    desc: "Diseñamos, desarrollamos y ejecutamos proyectos de ingeniería a la medida de cada cliente.",
    Icon: IconRulerMeasure,
  },
  {
    num: "02",
    titulo: "Electricidad",
    desc: "Instalación y mantenciones eléctricas, tableros y sistemas de control y detección de incendio, bajo normativa SEC.",
    Icon: IconBolt,
  },
  {
    num: "03",
    titulo: "Refrigeración",
    desc: "Instalación, mantención y reparación de sistemas de frío industrial y comercial.",
    Icon: IconSnowflake,
  },
  {
    num: "04",
    titulo: "Climatización",
    desc: "Instalación, mantención y reparación de equipos para espacios domiciliarios, comerciales e industriales.",
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
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex min-w-[78%] snap-center flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-7 shadow-[0_24px_60px_-32px_rgba(20,57,142,0.45)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_34px_70px_-30px_rgba(20,57,142,0.55)] sm:min-w-0 lg:p-8"
    >
      {/* accent bar */}
      <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[color:var(--color-siryc-red)] transition-transform duration-500 group-hover:scale-x-100" />

      <div className="flex items-start justify-between">
        <span className="font-mono text-[11px] font-bold tracking-[0.35em] text-[color:var(--color-siryc-blue)]">
          {area.num}
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--color-siryc-blue)]/6 text-[color:var(--color-siryc-blue)] transition-colors duration-300 group-hover:bg-[color:var(--color-siryc-blue)] group-hover:text-white">
          <Icon size={22} stroke={1.6} />
        </span>
      </div>

      <h3 className="mt-7 font-display text-2xl font-bold text-[color:var(--color-siryc-dark)]">{area.titulo}</h3>
      <p className="mt-3 flex-grow text-sm leading-relaxed text-[color:var(--color-siryc-gray)]">{area.desc}</p>

      <Link
        to="/servicios"
        className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[color:var(--color-siryc-blue)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-lg:opacity-100"
      >
        Ver servicio
        <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </motion.div>
  );
}

export function CoreAreas() {
  return (
    <section className="relative z-20 -mt-16 pb-4 lg:-mt-24">
      <div className="container-siryc">
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4 lg:gap-6">
          {areas.map((a, i) => (
            <AreaCard key={a.num} area={a} index={i} />
          ))}
        </div>
        <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-siryc-gray)] sm:hidden">
          Desliza para ver más →
        </p>
      </div>
    </section>
  );
}
