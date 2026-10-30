# SIRYC web

- Producción: siryc.cl en el Cloudflare Worker `siryc-web` (cuenta admin.siryc@gmail.com). Se publica a mano con
  `npm run deploy` y **solo con el «sí» del dueño**. Supabase propio `dsjwgsdmoqeqpvkgdplx`; formulario por Resend.
- Repo público: nunca subir secretos ni datos de leads.
- Rediseño en curso en `astro/` (Astro 7 + Tailwind 4), rama `desarrollo`. Decisiones de diseño en `docs/design/siryc.md`,
  avance en `docs/PROGRESS.md`. Servidor de desarrollo: `cd astro && npm run dev` (puerto 4390, fijo).
- Laboratorio de opciones (`/cards`, `/tipografias`) solo existe en `astro dev`.
- Sistema: corte SIRYC (`.corte`), filete partido (`.filete`), papel/tinta sin blanco puro, acento azul único,
  Exo 2 + Inter autoalojadas, movimiento solo con transform/opacity/clip-path y `prefers-reduced-motion` respetado.
