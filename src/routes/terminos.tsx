import { createFileRoute } from "@tanstack/react-router";
import { EditorialHero } from "@/components/site/EditorialHero";
import { FadeIn } from "@/components/site/FadeIn";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: "Términos de Uso — SIRYC" },
      {
        name: "description",
        content:
          "Condiciones generales que rigen el acceso y la utilización del sitio web de SIRYC SpA, ingeniería en electricidad, refrigeración y climatización.",
      },
      { property: "og:title", content: "Términos de Uso — SIRYC" },
      {
        property: "og:description",
        content: "Condiciones generales de acceso y uso del sitio siryc.cl.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/terminos" }],
  }),
  component: TerminosPage,
});

const secciones: { n: string; titulo: string; contenido: React.ReactNode }[] = [
  {
    n: "01",
    titulo: "Aceptación",
    contenido: (
      <p>
        El acceso y uso del sitio <strong>siryc.cl</strong> implica la aceptación de los presentes
        términos. Si no estás de acuerdo con alguno de ellos, te pedimos no continuar utilizándolo.
      </p>
    ),
  },
  {
    n: "02",
    titulo: "Uso del sitio",
    contenido: (
      <p>
        Este sitio se ofrece con fines informativos sobre los servicios de ingeniería en
        electricidad, refrigeración y climatización de SIRYC. El contenido publicado puede
        actualizarse, modificarse o retirarse sin previo aviso. Las características técnicas,
        alcances, plazos y valores de los servicios deben confirmarse mediante una cotización formal
        por escrito.
      </p>
    ),
  },
  {
    n: "03",
    titulo: "Propiedad intelectual",
    contenido: (
      <p>
        Los textos, imágenes, logotipo, marca SIRYC, fichas técnicas y demás materiales publicados en
        este sitio son propiedad de SIRYC SpA o de sus respectivos titulares, y están protegidos por
        la legislación chilena aplicable. Las marcas y modelos de equipos mencionados en el sitio
        pertenecen a sus respectivos fabricantes. Queda prohibida la reproducción, distribución o uso
        comercial de los contenidos de este sitio sin autorización expresa.
      </p>
    ),
  },
  {
    n: "04",
    titulo: "Enlaces a terceros",
    contenido: (
      <p>
        El sitio puede incluir enlaces a recursos externos (redes sociales, fabricantes de equipos,
        plataformas de contacto como WhatsApp). SIRYC no controla ni se responsabiliza del contenido,
        políticas o disponibilidad de esos sitios.
      </p>
    ),
  },
  {
    n: "05",
    titulo: "Limitación de responsabilidad",
    contenido: (
      <p>
        El contenido publicado tiene carácter referencial. SIRYC no garantiza que el sitio esté libre
        de errores, omisiones o interrupciones. Las decisiones técnicas, de mantención o de inversión
        en proyectos deben basarse en una evaluación específica del caso, realizada por personal
        técnico calificado de SIRYC mediante visita o cotización formal.
      </p>
    ),
  },
  {
    n: "06",
    titulo: "Datos personales",
    contenido: (
      <p>
        El tratamiento de los datos personales que ingresas en los formularios de este sitio se rige
        por nuestra{" "}
        <a
          href="/privacidad"
          className="font-semibold text-[color:var(--color-siryc-blue)] underline underline-offset-4"
        >
          Política de Privacidad
        </a>
        , elaborada conforme a la Ley N° 19.628 y a la Ley N° 21.719 que moderniza la protección de
        datos personales en Chile.
      </p>
    ),
  },
  {
    n: "07",
    titulo: "Modificaciones",
    contenido: (
      <p>
        SIRYC puede actualizar estos términos en cualquier momento. La versión vigente será siempre
        la publicada en esta página, con la fecha de última actualización indicada al inicio.
      </p>
    ),
  },
  {
    n: "08",
    titulo: "Jurisdicción",
    contenido: (
      <p>
        Estos términos se rigen por la legislación de la República de Chile. Cualquier controversia
        derivada del uso del sitio se someterá a los tribunales competentes de la Región de
        Valparaíso.
      </p>
    ),
  },
  {
    n: "09",
    titulo: "Contacto",
    contenido: (
      <p>
        Si tienes consultas sobre estos términos, escríbenos a{" "}
        <a
          href="mailto:contacto@siryc.cl"
          className="font-semibold text-[color:var(--color-siryc-blue)] underline underline-offset-4"
        >
          contacto@siryc.cl
        </a>
        .
      </p>
    ),
  },
];

function TerminosPage() {
  return (
    <div>
      <EditorialHero
        index="01"
        eyebrow="Legal"
        title="Términos de Uso."
        subtitle="Condiciones generales que rigen el acceso y la utilización del sitio web de SIRYC."
      />

      <section className="bg-white py-20 md:py-28">
        <div className="container-siryc">
          <p className="mb-14 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-siryc-red)]">
            Última actualización · Agosto 2026
          </p>

          <div className="divide-y divide-black/10 border-t border-black/10">
            {secciones.map((s) => (
              <FadeIn key={s.n}>
                <article className="grid gap-4 py-10 md:grid-cols-[8rem_1fr] md:gap-10">
                  <div className="font-display text-sm font-bold tracking-[0.2em] text-[color:var(--color-siryc-blue)]">
                    {s.n}
                  </div>
                  <div>
                    <h2 className="mb-4 font-display text-2xl font-bold text-[color:var(--color-siryc-dark)] md:text-3xl">
                      {s.titulo}
                    </h2>
                    <div className="max-w-3xl space-y-4 text-base leading-relaxed text-black/70">
                      {s.contenido}
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
