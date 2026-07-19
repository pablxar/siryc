import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/servicios", label: "Servicios" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/clientes", label: "Clientes" },
  { to: "/blog", label: "Blog técnico" },
  { to: "/contacto", label: "Contacto" },
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
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white/95 backdrop-blur transition-all",
        scrolled ? "shadow-[0_2px_16px_rgba(27,35,44,0.08)] py-2" : "py-4",
      )}
    >
      <div className="container-siryc flex items-center justify-between gap-4">
        <Link to="/" aria-label="SIRYC — Inicio">
          <Logo variant="dark" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-[color:var(--color-siryc-blue)]"
                    : "text-[color:var(--color-siryc-gray)] hover:text-[color:var(--color-siryc-dark)]",
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
            className="hidden rounded-md bg-[color:var(--color-siryc-red)] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:inline-flex"
          >
            Solicitar cotización
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
                className="border-b border-black/5 py-3 text-sm font-medium text-[color:var(--color-siryc-dark)] last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contacto"
              className="mt-3 inline-flex justify-center rounded-md bg-[color:var(--color-siryc-red)] px-4 py-3 text-sm font-semibold text-white"
            >
              Solicitar cotización
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
