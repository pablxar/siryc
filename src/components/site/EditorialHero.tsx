import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function EditorialHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  /** Two-digit index like "01" — kept for API compatibility, no longer rendered */
  index?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-siryc-dark)] text-white">
      {/* Subtle dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #ffffff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Ambient blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-24 h-[380px] w-[380px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-siryc-blue) 50%, transparent) 0%, transparent 65%)",
        }}
      />

      <div className="container-siryc relative py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12"
        >
          <div className="max-w-3xl">
            <div className="mb-5 flex gap-1">
              <div className="h-[3px] w-8 bg-[color:var(--color-siryc-red)]" />
              <div className="h-[3px] w-8 bg-[color:var(--color-siryc-blue)]" />
            </div>
            <h1 className="font-display text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-[1.05] tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
                {subtitle}
              </p>
            )}
          </div>

          {children && <div className="md:shrink-0">{children}</div>}
        </motion.div>
      </div>

      <div className="container-siryc relative">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>
    </section>
  );
}
