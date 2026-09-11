import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-[color:var(--color-siryc-dark)] text-white/80">
      <div className="container-siryc py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Logo variant="light" />
            <p className="mt-4 text-sm text-white/60">Tu clima, nuestra ingeniería.</p>
            <p className="mt-4 text-xs text-white/50">
              Más de 20 años entregando soluciones de ingeniería en refrigeración, climatización y electricidad.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/nosotros" className="hover:text-white">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="hover:text-white">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/proyectos" className="hover:text-white">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white">
                  Blog técnico
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li>Refrigeración industrial</li>
              <li>Climatización y aire acondicionado</li>
              <li>Electricidad industrial</li>
              <li>Contratos de mantención</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                <a href="mailto:ventas@siryc.cl" className="hover:text-white">
                  ventas@siryc.cl
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>V Región, Chile</span>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a href="#" aria-label="Instagram" className="rounded-md border border-white/20 p-2 hover:bg-white/10">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="Facebook" className="rounded-md border border-white/20 p-2 hover:bg-white/10">
                <Facebook size={16} />
              </a>
              <a href="#" aria-label="LinkedIn" className="rounded-md border border-white/20 p-2 hover:bg-white/10">
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex gap-1">
          <div className="h-[3px] flex-1 bg-[color:var(--color-siryc-red)]" />
          <div className="h-[3px] flex-1 bg-[color:var(--color-siryc-blue)]" />
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 text-center text-xs text-white/50 md:flex-row md:items-start md:text-left">
          <span>
            © {new Date().getFullYear()} SIRYC — Servicios de Ingeniería en Electricidad, Refrigeración y Climatización.
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 md:justify-start">
            <Link to="/terminos" className="hover:text-white">
              Términos de uso
            </Link>
            <span aria-hidden className="text-white/25">
              ·
            </span>
            <Link to="/privacidad" className="hover:text-white">
              Política de privacidad
            </Link>
            <span aria-hidden className="text-white/25">
              ·
            </span>
            <span>Desarrollado por Siryc Spa</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
