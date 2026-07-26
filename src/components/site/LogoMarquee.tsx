import { motion } from "framer-motion";

const CLIENTES = [
  "Armada de Chile",
  "Centro Comercial V Región",
  "Grupo Corporativo Regional",
  "Colegio V Región",
  "Edificio Corporativo",
  "Institución Educacional",
  "Mall Regional",
  "Corporación Regional",
  "Instituto Técnico",
  "Oficinas Ejecutivas",
];

export function LogoMarquee({
  items = CLIENTES,
  speed = 40,
}: {
  items?: string[];
  speed?: number;
}) {
  // Duplicate list for seamless loop
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent md:w-40" />

      <motion.div
        className="flex w-max gap-4 py-2"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {loop.map((c, i) => (
          <div
            key={i}
            className="group flex h-20 min-w-[220px] items-center justify-center rounded-2xl border border-black/5 bg-white px-8 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all hover:border-[color:var(--color-siryc-blue)]/30 hover:shadow-[0_20px_40px_-25px_rgba(20,57,142,0.35)] md:h-24 md:min-w-[260px]"
          >
            <span className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-siryc-gray)] transition-colors group-hover:text-[color:var(--color-siryc-dark)]">
              {c}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
