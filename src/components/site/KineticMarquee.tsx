import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scroll-driven kinetic text band. The strip drifts horizontally as the
 * section moves through the viewport.
 */
export function KineticMarquee({
  items,
  tone = "dark",
  direction = 1,
}: {
  items: string[];
  tone?: "dark" | "light";
  direction?: 1 | -1;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [`${-12 * direction}%`, `${12 * direction}%`]);

  const loop = [...items, ...items, ...items];

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden border-y py-6 ${
        tone === "dark"
          ? "border-white/10 bg-[color:var(--color-siryc-dark)]"
          : "border-black/10 bg-[color:var(--color-siryc-light)]/25"
      }`}
    >
      <motion.div style={{ x }} className="flex w-max items-center gap-10 whitespace-nowrap">
        {loop.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-10">
            <span
              className={`font-display text-2xl font-bold uppercase tracking-tight md:text-4xl ${
                tone === "dark" ? "text-white/85" : "text-[color:var(--color-siryc-dark)]"
              }`}
            >
              {item}
            </span>
            <span className="h-2 w-2 rotate-45 bg-[color:var(--color-siryc-red)]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
