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
      {/* Deep blue gradient field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, color-mix(in oklab, var(--color-siryc-blue) 85%, #000) 0%, var(--color-siryc-dark) 55%, #0f151b 100%)",
        }}
      />
      {/* Technical grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(120% 80% at 20% 30%, #000 30%, transparent 75%)",
        }}
      />
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-siryc-blue) 70%, transparent) 0%, transparent 65%)",
        }}
      />

      <div className="container-siryc relative py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12"
        >
          {/* Frosted glass panel */}
          <div className="relative max-w-3xl rounded-[1.75rem] border border-white/15 bg-white/[0.07] p-7 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl md:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
            />
            {eyebrow && (
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[3px] w-6 bg-[color:var(--color-siryc-red)]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/70">
                  {eyebrow}
                </span>
              </div>
            )}
            <h1 className="font-display text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-[1.05] tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
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
