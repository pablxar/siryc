import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export type StackedItem = {
  titulo: string;
  desc: string;
  img: string;
};

export function StackedSpecialties({ items }: { items: StackedItem[] }) {
  return (
    <section className="container-siryc py-24">
      {items.map((item, i) => (
        <StackedCard
          key={item.titulo}
          item={item}
          index={i}
          total={items.length}
        />
      ))}
    </section>
  );
}

function StackedCard({
  item,
  index,
  total,
}: {
  item: StackedItem;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // As next card overlaps, current card scales down and dims
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0.5, 1], [1, 0.4]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const topOffset = 96 + index * 18; // stagger sticky top

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: `${topOffset}px`, marginBottom: "4rem" }}
    >
      <motion.article
        style={{ scale, opacity }}
        className="relative grid overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-2xl shadow-[color:var(--color-siryc-blue)]/10 md:grid-cols-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 md:aspect-auto md:min-h-[480px]">
          <motion.img
            src={item.img}
            alt={item.titulo}
            loading="lazy"
            style={{ y: imgY }}
            className="absolute inset-0 h-[116%] w-full object-cover"
          />
          <div className="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[color:var(--color-siryc-blue)] backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>
        <div className="flex flex-col justify-between p-10 md:p-14">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-siryc-red)]">
              Línea técnica
            </span>
            <h3 className="mt-6 font-display text-3xl font-bold leading-tight text-[color:var(--color-siryc-dark)] md:text-4xl">
              {item.titulo}
            </h3>
            <p className="mt-6 text-base leading-relaxed text-[color:var(--color-siryc-gray)]">
              {item.desc}
            </p>
          </div>
          <Link
            to="/servicios"
            className="group mt-10 inline-flex w-fit items-center gap-3 rounded-full border border-[color:var(--color-siryc-dark)]/15 px-6 py-3 text-sm font-semibold text-[color:var(--color-siryc-dark)] transition-colors hover:border-[color:var(--color-siryc-blue)] hover:text-[color:var(--color-siryc-blue)]"
          >
            Ver el servicio
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </motion.article>
    </div>
  );
}
