# Migración de SIRYC fuera de Lovable

La web sigue siendo exactamente la misma (mismo código, mismo diseño). Lo que cambia es **dónde vive**:

| Pieza | Antes (Lovable) | Ahora (independiente) |
|---|---|---|
| Hosting | Lovable (Cloudflare Workers por debajo) | Tu cuenta de Cloudflare Workers |
| Base de datos | Lovable Cloud (Supabase gestionado por Lovable) | Tu propio proyecto en Supabase |
| Imágenes | CDN de Lovable (`/__l5e/assets-v1/...`) | `public/media/` dentro del repo |
| Correo del formulario | Resend vía `connector-gateway.lovable.dev` | API de Resend directa (`api.resend.com`) |

## Cambios en el código (rama `migracion-independiente`)

- `src/assets/*.asset.json`: la `url` apunta a `/media/<archivo>.png` (imágenes descargadas de siryc.cl, idénticas byte a byte).
- `src/lib/leads.functions.ts`: llama a Resend directo; solo necesita `RESEND_API_KEY`.
- `src/routes/__root.tsx`: la imagen para redes sociales (`og:image`) ahora es `https://siryc.cl/og-image.png`.
- `vite.config.ts`: build explícito para Cloudflare Workers (lo que Lovable configuraba por dentro), worker `siryc-web`.
- `package.json`: script `npm run deploy` y `wrangler`. Se usa npm (se quitó `bun.lock`).

## Variables

| Variable | Dónde | Notas |
|---|---|---|
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID` | `.env` | Se incrustan al compilar. La publishable/anon key es pública por diseño. |
| `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_PROJECT_ID` | `.env` | Mismos valores. |
| `RESEND_API_KEY` | Secreto de Cloudflare (`npm run secret:resend`) y `.dev.vars` en local | Nunca en git. |

## Comandos

```bash
npm install
npm run dev          # desarrollo local
npm run build && npx wrangler dev   # probar el build real de Cloudflare en local
npm run deploy       # publicar
```

## Base de datos

El respaldo de Lovable Cloud se convirtió en un SQL listo para restaurar (fuera de este repo porque contiene leads):
`../migracion/siryc_bd_restaurar.sql`. Incluye tablas, datos, políticas RLS, permisos y el historial de migraciones.
Se le quitaron los permisos al rol interno de Lovable (`sandbox_exec`) y los de `supabase_admin` (Supabase ya los trae).
