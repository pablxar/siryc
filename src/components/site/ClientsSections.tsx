import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionMarker } from "@/components/site/Parallax";
import { FadeIn, RevealGroup, RevealItem } from "@/components/site/FadeIn";
import { WordReveal } from "@/components/site/WordReveal";

const segmentos = [
  { titulo: "Corporativo", clientes: ["Grupo Corporativo Regional", "Edificio Corporativo", "Oficinas Ejecutivas", "Corporación Regional"] },
  { titulo: "Gobierno y Fuerzas Armadas", clientes: ["Armada de Chile", "Institución Pública", "Organismo Estatal"] },
  { titulo: "Educación", clientes: ["Colegio V Región", "Establecimiento Educacional", "Instituto Técnico"] },
  { titulo: "Centros comerciales", clientes: ["Centro Comercial V Región", "Mall Regional", "Retail Corporativo"] },
];

const testimonios = [
  { quote: "SIRYC lleva más de cinco años sosteniendo la operación de nuestra climatización. Los informes técnicos son claros y los plazos se cumplen.", nombre: "Administración de Edificio", cargo: "Gerente de operaciones", empresa: "Edificio corporativo V Región" },
  { quote: "El contrato de mantención con SIRYC nos entrega trazabilidad completa de cada intervención. Es lo que necesita una institución.", nombre: "Jefatura Técnica", cargo: "Encargado de infraestructura", empresa: "Institución educacional" },
];

export function ClientsSections() {
  return (
    <div>
      {/* Segmentos — logo marquee style */}
      <section className="bg-white py-24">
        <div className="container-siryc">
          <SectionMarker index="03" label="Segmentos" />
          <FadeIn>
            <h2 className="mb-16 max-w-3xl font-display text-4xl font-bold text-[color:var(--color-siryc-dark)] md:text-5xl">
              Sectores en los <span className="text-[color:var(--color-siryc-blue)]">que operamos.</span>
            </h2>
          </FadeIn>

          <div className="space-y-16">
            {segmentos.map((seg, i) => (
              <motion.div
                key={seg.titulo}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-6 flex items-baseline justify-between border-b border-black/10 pb-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs tracking-[0.3em] text-[color:var(--color-siryc-red)]">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[color:var(--color-siryc-dark)] md:text-3xl">
                      {seg.titulo}
                    </h3>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[color:var(--color-siryc-gray)]">
                    {seg.clientes.length} clientes
                  </span>
                </div>
                <RevealGroup inView className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {seg.clientes.map((c) => (
                    <RevealItem key={c}>
                      <div className="group relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-br from-white to-[color:var(--color-siryc-light)]/20 p-4 text-center transition-all hover:border-[color:var(--color-siryc-blue)]/30 hover:shadow-[0_20px_50px_-25px_rgba(20,57,142,0.4)]">
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-[color:var(--color-siryc-gray)] transition-colors group-hover:text-[color:var(--color-siryc-dark)]">
                          {c}
                        </span>
                        <div className="absolute inset-x-4 bottom-3 h-px scale-x-0 bg-[color:var(--color-siryc-red)] transition-transform duration-500 group-hover:scale-x-100" />
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Armada — feature */}
      <ArmadaSection />

      {/* Testimonios */}
      <section className="bg-white py-24">
        <div className="container-siryc">
          <SectionMarker index="05" label="Testimonios" />
          <FadeIn>
            <WordReveal
              text="Lo que dicen quienes operan con nosotros."
              className="mb-12 max-w-3xl font-display text-4xl font-bold text-[color:var(--color-siryc-dark)] md:text-5xl"
            />
          </FadeIn>
          <RevealGroup inView className="grid gap-6 md:grid-cols-2">
            {testimonios.map((t, i) => (
              <RevealItem key={i}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-black/5 bg-white p-10 transition-all hover:shadow-[0_30px_80px_-30px_rgba(20,57,142,0.35)]">
                  <Quote
                    className="absolute right-8 top-8 text-[color:var(--color-siryc-blue)]/10"
                    size={80}
                  />
                  <div className="relative">
                    <div className="mb-6 flex gap-1">
                      <div className="h-[3px] w-8 bg-[color:var(--color-siryc-red)]" />
                      <div className="h-[3px] w-8 bg-[color:var(--color-siryc-blue)]" />
                    </div>
                    <p className="font-display text-xl leading-relaxed text-[color:var(--color-siryc-dark)] md:text-2xl">
                      "{t.quote}"
                    </p>
                    <div className="mt-8 border-t border-black/10 pt-5">
                      <div className="font-display text-base font-semibold text-[color:var(--color-siryc-dark)]">
                        {t.nombre}
                      </div>
                      <div className="mt-1 font-mono text-xs uppercase tracking-widest text-[color:var(--color-siryc-gray)]">
                        {t.cargo} — {t.empresa}
                      </div>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </div>
  );
}

function ArmadaSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bigY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[color:var(--color-siryc-dark)] py-32 text-white"
    >
      <motion.div
        aria-hidden
        style={{ y: bigY }}
        className="pointer-events-none absolute right-[-3rem] top-[-3rem] select-none font-display text-[16rem] font-black leading-none tracking-tighter text-white/[0.04] md:text-[24rem]"
      >
        2018
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-siryc-blue) 55%, transparent) 0%, transparent 65%)",
        }}
      />
      <div className="container-siryc relative max-w-4xl">
        <SectionMarker index="04" label="Cliente destacado" />
        <FadeIn>
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-[color:var(--color-siryc-red)]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/80">
              Contrato vigente
            </span>
          </div>
          <h2 className="font-display text-5xl font-bold leading-tight md:text-7xl">
            Armada de Chile.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75">
            Desde 2018 mantenemos contrato vigente con la Armada de Chile para
            la mantención preventiva y correctiva de sistemas de climatización
            y refrigeración en instalaciones institucionales. Una relación de
            largo plazo que refleja el estándar técnico y la continuidad
            operativa que exige el sector.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
