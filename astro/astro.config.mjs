// @ts-check
import { defineConfig } from "astro/config";
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
  server: { port: 4390, host: true },
  integrations: [lab],
  vite: {
    plugins: [tailwindcss()],
    server: { strictPort: true },
  },
});
