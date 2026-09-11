import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/servicios", label: "Servicios" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/blog", label: "Actualidad" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-3 md:pt-5">
      <div className="container-siryc">
        <header
          className={cn(
            "pointer-events-auto rounded-2xl border transition-all duration-300 ease-out",
            scrolled
              ? "border-black/10 bg-white/90 shadow-[0_18px_50px_-24px_rgba(20,57,142,0.45)] backdrop-blur-xl"
              : "border-white/60 bg-white/85 shadow-[0_14px_40px_-28px_rgba(0,0,0,0.5)] backdrop-blur-xl",
          )}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-2.5 md:px-6 md:py-3">
            <Link to="/" aria-label="SIRYC — Inicio" className="flex origin-left items-center">
              <Logo variant="dark" />
            </Link>

            <nav className="hidden items-center gap-9 lg:flex">
              {NAV.map((item) => {
                const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "text-[13px] font-medium transition-colors",
                      active
                        ? "text-[color:var(--color-siryc-blue)]"
                        : "text-[color:var(--color-siryc-gray)] hover:text-[color:var(--color-siryc-blue)]",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                to="/contacto"
                className="group hidden items-center gap-1.5 rounded-xl bg-[color:var(--color-siryc-blue)] px-5 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[color:var(--color-siryc-dark)] md:inline-flex"
              >
                Solicitar cotización
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[color:var(--color-siryc-dark)] lg:hidden"
                aria-label="Abrir menú"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {open && (
            <nav className="border-t border-black/5 px-4 lg:hidden">
              <div className="flex flex-col py-2">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="border-b border-black/5 py-3 text-sm font-semibold text-[color:var(--color-siryc-dark)] last:border-0"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/contacto"
                  className="my-3 inline-flex justify-center rounded-xl bg-[color:var(--color-siryc-blue)] px-4 py-3 text-sm font-semibold text-white"
                >
                  Solicitar cotización
                </Link>
              </div>
            </nav>
          )}
        </header>
      </div>
    </div>
  );
}
