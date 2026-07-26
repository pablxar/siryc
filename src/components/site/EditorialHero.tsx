import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function EditorialHero({
  index,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  /** Two-digit index like "01" */
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const bigY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[color:var(--color-siryc-dark)] text-white"
    >
      {/* Dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #ffffff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Ambient blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-siryc-blue) 55%, transparent) 0%, transparent 65%)",
        }}
      />

      {/* Oversized index as background */}
      <motion.div
        aria-hidden
        style={{ y: bigY }}
        className="pointer-events-none absolute right-[-2rem] top-[-4rem] select-none font-display text-[22rem] font-black leading-none tracking-tighter text-white/[0.03] md:text-[30rem]"
      >
        {index}
      </motion.div>

      <div className="container-siryc relative py-28 md:py-40">
        <motion.div style={{ y, opacity }}>
          <div className="mb-8 flex items-center gap-4">
            <div className="flex gap-1">
              <div className="h-[3px] w-10 bg-[color:var(--color-siryc-red)]" />
              <div className="h-[3px] w-10 bg-[color:var(--color-siryc-blue)]" />
            </div>
            <span className="font-mono text-xs tracking-[0.3em] text-white/50">
              {index} / {eyebrow.toUpperCase()}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl font-display text-[clamp(2.75rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-tight"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl"
            >
              {subtitle}
            </motion.p>
          )}

          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="container-siryc relative">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </section>
  );
}
