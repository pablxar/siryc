import { createFileRoute } from "@tanstack/react-router";
import { EditorialHero } from "@/components/site/EditorialHero";
import { FadeIn } from "@/components/site/FadeIn";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de Privacidad — SIRYC" },
      {
        name: "description",
        content:
          "Cómo SIRYC SpA recopila, usa y protege los datos personales de quienes nos contactan, conforme a la Ley N° 19.628 y la Ley N° 21.719.",
      },
      { property: "og:title", content: "Política de Privacidad — SIRYC" },
      {
        property: "og:description",
        content: "Tratamiento de datos personales conforme a la normativa chilena vigente.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/privacidad" }],
  }),
  component: PrivacidadPage,
});

const link = "font-semibold text-[color:var(--color-siryc-blue)] underline underline-offset-4";

const secciones: { n: string; titulo: string; contenido: React.ReactNode }[] = [
  {
    n: "01",
    titulo: "Responsable de los datos",
    contenido: (
      <p>
        SIRYC SpA, con domicilio en [DIRECCIÓN — pendiente de completar], Región de Valparaíso,
        Chile, es el responsable del tratamiento de los datos personales recogidos a través de este
        sitio, en los términos de la Ley N° 19.628 sobre protección de la vida privada y de la Ley N°
        21.719 que moderniza su regulación.
      </p>
    ),
  },
  {
    n: "02",
    titulo: "Información que recopilamos",
    contenido: (
      <>
        <p>
          Recibimos únicamente los datos que ingresas voluntariamente al solicitar una cotización o
          contactarnos a través del sitio:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Nombre completo y empresa o institución</li>
          <li>Cargo</li>
          <li>Correo electrónico y teléfono</li>
          <li>Tipo de servicio requerido y detalle del requerimiento</li>
        </ul>
        <p>
          No solicitamos ni tratamos datos sensibles ni datos de niñas, niños y adolescentes. Para
          medir el uso del sitio utilizamos Google Analytics 4 (proveedor: Google LLC), cargado a
          través de Google Tag Manager. Esta herramienta emplea cookies propias (como <code>_ga</code>)
          para registrar de forma agregada métricas como páginas vistas, origen del tráfico, tipo de
          dispositivo y ubicación aproximada. No almacenamos tu dirección IP completa —Google
          Analytics 4 la anonimiza— ni usamos estos datos para perfilamiento publicitario, decisiones
          automatizadas ni seguimiento entre dispositivos.
        </p>
        <p>
          Puedes desactivar esta medición desde la configuración de cookies de tu navegador o
          instalando el{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            complemento de inhabilitación de Google Analytics
          </a>
          .
        </p>
      </>
    ),
  },
  {
    n: "03",
    titulo: "Finalidades y base de licitud",
    contenido: (
      <>
        <p>
          Conforme al artículo 12 de la Ley N° 21.719, tratamos tus datos sobre las siguientes bases
          de licitud:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Consentimiento:</strong> cuando completas voluntariamente el formulario de
            contacto o cotización, para responder tu solicitud y coordinar visitas técnicas.
          </li>
          <li>
            <strong>Medidas precontractuales y ejecución de contrato:</strong> para elaborar
            cotizaciones, ejecutar proyectos y administrar contratos de mantención.
          </li>
          <li>
            <strong>Interés legítimo:</strong> para el seguimiento comercial de una relación ya
            iniciada y para la seguridad y mejora del sitio, con medición analítica agregada.
          </li>
          <li>
            <strong>Cumplimiento de obligaciones legales:</strong> conservación de antecedentes
            tributarios, contractuales y de seguridad.
          </li>
        </ul>
        <p>
          No utilizamos tus datos para perfilamiento publicitario ni para decisiones automatizadas
          con efectos jurídicos.
        </p>
      </>
    ),
  },
  {
    n: "04",
    titulo: "Comunicación a terceros y transferencias internacionales",
    contenido: (
      <>
        <p>
          No vendemos ni cedemos tus datos. Pueden ser comunicados únicamente a fabricantes o
          representantes de equipos cuando tu consulta requiera escalamiento técnico o gestión de
          garantía, y siempre con el alcance estrictamente necesario para ese fin.
        </p>
        <p>
          Utilizamos proveedores tecnológicos que actúan como encargados de tratamiento (alojamiento
          del sitio, envío de correos y analítica), sujetos a instrucciones documentadas y deberes de
          confidencialidad y seguridad. Algunos de ellos pueden alojar información fuera de Chile; en
          esos casos las transferencias internacionales se realizan con las garantías adecuadas
          exigidas por la Ley N° 21.719.
        </p>
      </>
    ),
  },
  {
    n: "05",
    titulo: "Almacenamiento, seguridad y plazos",
    contenido: (
      <p>
        Los datos se conservan en servidores con medidas técnicas y organizativas razonables de
        protección, aplicando controles de acceso que limitan su uso a personal autorizado. Los
        mantenemos solo por el tiempo necesario para gestionar la relación comercial, contractual o
        legal correspondiente y, luego, los eliminamos o anonimizamos. Ante una vulneración de
        seguridad que afecte tus datos, notificaremos a la Agencia de Protección de Datos Personales
        y, cuando corresponda, a las personas afectadas, según lo dispuesto en la Ley N° 21.719.
      </p>
    ),
  },
  {
    n: "06",
    titulo: "Tus derechos (ARCOP)",
    contenido: (
      <>
        <p>
          La Ley N° 21.719 reconoce tus derechos de <strong>acceso</strong>,{" "}
          <strong>rectificación</strong>, <strong>cancelación o supresión</strong>,{" "}
          <strong>oposición</strong> y <strong>portabilidad</strong> de tus datos personales, además
          del derecho a solicitar la limitación del tratamiento y a revocar tu consentimiento en
          cualquier momento, sin efecto retroactivo.
        </p>
        <p>
          Para ejercerlos, escríbenos a{" "}
          <a href="mailto:contacto@siryc.cl" className={link}>
            contacto@siryc.cl
          </a>{" "}
          indicando tu nombre y la solicitud concreta. Responderemos de forma gratuita dentro de los
          plazos legales. Si consideras que tu solicitud no fue atendida correctamente, puedes
          reclamar ante la Agencia de Protección de Datos Personales.
        </p>
      </>
    ),
  },
  {
    n: "07",
    titulo: "Cambios a esta política",
    contenido: (
      <p>
        Podemos actualizar esta política para reflejar cambios legales u operativos. La versión
        vigente será siempre la publicada en esta página, con la fecha de última actualización
        indicada al inicio.
      </p>
    ),
  },
  {
    n: "08",
    titulo: "Contacto",
    contenido: (
      <p>
        Para cualquier consulta sobre tus datos personales, contáctanos en{" "}
        <a href="mailto:contacto@siryc.cl" className={link}>
          contacto@siryc.cl
        </a>{" "}
        o al [TELÉFONO — pendiente de completar].
      </p>
    ),
  },
];

function PrivacidadPage() {
  return (
    <div>
      <EditorialHero
        index="01"
        eyebrow="Legal"
        title="Política de Privacidad."
        subtitle="Cómo recopilamos, usamos y protegemos los datos personales de quienes nos contactan."
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
