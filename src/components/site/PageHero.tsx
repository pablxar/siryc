import type { ReactNode } from "react";

export function PageHero({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-[color:var(--color-siryc-dark)] text-white">
      <div className="container-siryc py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="mb-4 flex gap-1">
            <div className="h-[3px] w-10 bg-[color:var(--color-siryc-red)]" />
            <div className="h-[3px] w-10 bg-[color:var(--color-siryc-blue)]" />
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-lg text-white/70">{subtitle}</p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
