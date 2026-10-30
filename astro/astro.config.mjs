// @ts-check
import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

// Páginas de laboratorio (/cards, /tipografias): opciones de diseño para que el
// dueño elija. Solo existen en `astro dev`; nunca entran al build de producción.
const lab = {
  name: "siryc-lab",
  hooks: {
    "astro:config:setup": ({ command, injectRoute }) => {
      if (command !== "dev") return;
      injectRoute({ pattern: "/cards", entrypoint: "./src/lab/cards.astro" });
      injectRoute({ pattern: "/tipografias", entrypoint: "./src/lab/tipografias.astro" });
    },
  },
};

export default defineConfig({
  devToolbar: { enabled: false },
  site: "https://siryc.cl",
  // URLs sin barra final, como el sitio actual (/proyectos, no /proyectos/): archivos .html planos.
  trailingSlash: "never",
  build: { format: "file" },
  server: { port: 4390, host: true },
  // Todo se prerenderiza; solo /api/contacto corre en el Worker (formulario → Supabase + Resend).
  adapter: cloudflare({ imageService: "compile" }),
  integrations: [lab],
  redirects: { "/clientes": { status: 307, destination: "/proyectos" } },
  env: {
    schema: {
      // Secreto del Worker (`wrangler secret put RESEND_API_KEY`). Sin él, el lead se guarda igual y no hay correo.
      RESEND_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
    },
  },
  // Fotos reales que el dueño suba al Storage de Supabase: se descargan y optimizan al compilar.
  image: { remotePatterns: [{ protocol: "https", hostname: "dsjwgsdmoqeqpvkgdplx.supabase.co" }] },
  vite: {
    plugins: [tailwindcss()],
    server: { strictPort: true },
  },
});
