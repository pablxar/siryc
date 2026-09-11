import { useEffect, useRef, useState } from "react";
import {
  IconFileCheck,
  IconCertificate,
  IconBuildingBank,
  IconClockCheck,
  IconCalendarCheck,
  IconCheck,
  type IconProps,
} from "@tabler/icons-react";
import imgElectricidad from "@/assets/electricidad.png.asset.json";

const ACCENT = "#0D47A1";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

type Razon = { titulo: string; desc: string; Icon: React.ComponentType<IconProps> };

const razones: Razon[] = [
  {
    titulo: "Ingeniería documentada en cada proyecto",
    desc: "Memoria técnica, planos y protocolos entregables para cada intervención.",
    Icon: IconFileCheck,
  },
  {
    titulo: "Equipos certificados y personal capacitado",
    desc: "Técnicos acreditados por la SEC. SIRYC es una empresa asociada a una mutual de seguridad laboral y miembro de la Cámara Chilena de Refrigeración y Climatización A.G.",
    Icon: IconCertificate,
  },
  {
    titulo: "Experiencia en sectores exigentes",
    desc: "Gobierno, FFAA, retail corporativo, salud y educación con estándares críticos.",
    Icon: IconBuildingBank,
  },
  {
    titulo: "Respuesta técnica garantizada",
    desc: "SLA definidos y guardia operativa para asegurar la continuidad de tu operación.",
    Icon: IconClockCheck,
  },
  {
    titulo: "Más de dos décadas de continuidad operativa",
    desc: "20+ años ejecutando contratos de mantención y proyectos llave en mano.",
    Icon: IconCalendarCheck,
  },
];

type Stat = { valor: number | null; texto: string; prefix?: string; suffix?: string; label: string };

const stats: Stat[] = [
  { valor: 20, texto: "+20", prefix: "+", suffix: "", label: "Años de trayectoria" },
  { valor: 3000, texto: "3.000+", prefix: "", suffix: "+", label: "Proyectos entregados" },
  { valor: 2000, texto: "2.000+", prefix: "", suffix: "+", label: "Mantenciones realizadas" },
  { valor: null, texto: "24/7", label: "Respuesta técnica" },
];

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const formatCL = (n: number) => new Intl.NumberFormat("es-CL").format(n);

function RazonItem({ razon, index, reduced }: { razon: Razon; index: number; reduced: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduced) {
      setActive(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setActive(true), index * 90);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [index, reduced]);

  const { Icon } = razon;

  return (
    <li ref={ref} className="flex gap-5">
      <span
        className="relative mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border"
        style={{
          borderColor: active ? ACCENT : "#E8E8E8",
          backgroundColor: active ? ACCENT : "transparent",
          transition: reduced ? "none" : "background-color 0.5s ease-out, border-color 0.5s ease-out",
        }}
      >
        <Icon
          size={22}
          stroke={1.6}
          style={{
            color: active ? "#ffffff" : "#9AA1AC",
            transition: reduced ? "none" : "color 0.5s ease-out",
          }}
        />
        <span
          className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white"
          style={{
            border: `1px solid ${ACCENT}`,
            opacity: active ? 1 : 0,
            transform: active ? "scale(1)" : "scale(0.7)",
            transition: reduced ? "none" : "opacity 0.5s ease-out, transform 0.5s ease-out",
          }}
        >
          <IconCheck size={12} stroke={3} style={{ color: ACCENT }} />
        </span>
      </span>
      <div
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "translateY(0)" : "translateY(14px)",
          transition: reduced ? "none" : "opacity 0.5s ease-out, transform 0.5s ease-out",
        }}
      >
        <h5 className="font-semibold text-[color:var(--color-siryc-dark)]">{razon.titulo}</h5>
        <p className="mt-1 text-sm leading-relaxed text-[color:var(--color-siryc-gray)]">{razon.desc}</p>
      </div>
    </li>
  );
}

function StatCard({ stat, reduced }: { stat: Stat; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(() =>
    stat.valor === null || reduced ? stat.texto : `${stat.prefix ?? ""}0${stat.suffix ?? ""}`,
  );
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (stat.valor === null) return;
    if (reduced) {
      setDisplay(stat.texto);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / 1100, 1);
          const v = Math.round(easeOutCubic(t) * (stat.valor as number));
          setDisplay(`${stat.prefix ?? ""}${formatCL(v)}${stat.suffix ?? ""}`);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [stat, reduced]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="px-2 py-6"
      style={{
        transform: hover && !reduced ? "translateY(-3px)" : "translateY(0)",
        transition: reduced ? "none" : "transform 0.3s ease-out",
      }}
    >
      <div className="font-display text-4xl font-bold tabular-nums text-[color:var(--color-siryc-blue)] lg:text-5xl">
        {display}
      </div>
      <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-siryc-gray)]">
        {stat.label}
      </div>
    </div>
  );
}

export function OperationalContinuity() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="border-y border-slate-100 bg-white py-24 lg:py-28">
      <div className="container-siryc grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        {/* Photographic panel */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-2xl bg-slate-100">
            <img
              src={imgElectricidad.url}
              alt="Técnico SIRYC operando un tablero eléctrico industrial"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-6 bg-[color:var(--color-siryc-red)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-siryc-gray)]">
              02 / Cómo trabajamos
            </span>
          </div>
          <h2 className="font-display text-4xl font-extrabold leading-[1.05] text-[color:var(--color-siryc-dark)] md:text-5xl">
            Continuidad operativa,
            <br />
            sin improvisación.
          </h2>
          <p className="mt-4 max-w-xl text-[color:var(--color-siryc-gray)]">
            Planificación, ejecución y seguimiento técnico documentado en cada intervención.
          </p>

          <ul className="mt-12 space-y-8">
            {razones.map((r, i) => (
              <RazonItem key={r.titulo} razon={r} index={i} reduced={reduced} />
            ))}
          </ul>
        </div>
      </div>

      {/* Cifras — franja horizontal a todo el ancho */}
      <div className="container-siryc mt-20 lg:mt-24">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-slate-200 pt-10 sm:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}
