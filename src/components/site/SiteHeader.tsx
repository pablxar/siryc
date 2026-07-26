import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/servicios", label: "Servicios" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/clientes", label: "Clientes" },
  { to: "/blog", label: "Blog técnico" },
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
    <div className="sticky top-0 z-50 w-full">
      {/* Utility bar — colapsa al scroll */}
      <div
        className={cn(
          "hidden overflow-hidden bg-[color:var(--color-siryc-dark)] text-white transition-[max-height,opacity] duration-500 ease-out md:block",
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100",
        )}
      >
        <div className="container-siryc flex h-9 items-center justify-end gap-8 text-[11px] font-medium uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <span className="font-bold text-[color:var(--color-siryc-red)]">T:</span>
            +56 2 2345 6789
          </span>
          <span className="flex items-center gap-2">
            <span className="font-bold text-[color:var(--color-siryc-red)]">E:</span>
            contacto@siryc.cl
          </span>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "border-b transition-all duration-300 ease-out",
          scrolled
            ? "border-black/10 bg-white/85 py-1.5 shadow-[0_8px_24px_-12px_rgba(20,57,142,0.18)] backdrop-blur-xl"
            : "border-transparent bg-white/95 py-3 backdrop-blur",
        )}
      >
        <div className="container-siryc flex items-center justify-between gap-4">
          <Link
            to="/"
            aria-label="SIRYC — Inicio"
            className={cn(
              "flex origin-left items-center transition-transform duration-300 ease-out",
              scrolled ? "scale-[0.88]" : "scale-100",
            )}
          >
            <Logo variant="dark" />
          </Link>


          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-widest transition-colors",
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
              className="group hidden items-center gap-2 rounded-full bg-[color:var(--color-siryc-blue)] px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-[0_10px_30px_-10px_rgba(20,57,142,0.5)] transition-all hover:bg-[color:var(--color-siryc-dark)] md:inline-flex"
            >
              Solicitar cotización
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[color:var(--color-siryc-dark)] lg:hidden"
              aria-label="Abrir menú"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-black/5 bg-white lg:hidden">
            <div className="container-siryc flex flex-col py-2">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="border-b border-black/5 py-3 text-xs font-bold uppercase tracking-widest text-[color:var(--color-siryc-dark)] last:border-0"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contacto"
                className="mt-3 inline-flex justify-center rounded-full bg-[color:var(--color-siryc-blue)] px-4 py-3 text-xs font-bold uppercase tracking-widest text-white"
              >
                Solicitar cotización
              </Link>
            </div>
          </nav>
        )}
      </header>
    </div>
  );
}
