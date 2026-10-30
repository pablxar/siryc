# Progreso

- 2026-10-30 · Migración fuera de Lovable terminada: Cloudflare Worker `siryc-web` + Supabase propio + Resend directo (PR #1).
- 2026-10-30 · Fase 1 del rediseño en Astro: proyecto en `astro/`, sistema base (corte, filete partido, color, curvas)
  y laboratorio `/cards` + `/tipografias` (solo dev, puerto 4390). Pendiente: que el dueño elija card y tipografía.
- 2026-10-30 · Fase 2: elegidas card A (ficha técnica) y tipografía A. Cabecera isla, menú móvil, pie, entrada de marca y portada completa en Astro con datos de Supabase al compilar. Lighthouse móvil 99/100/100/100. Siguiente: Servicios y Nosotros.
- 2026-10-30 · Portada a pantalla completa con panel azul diagonal; scrollytelling: pila en Especialidades, lectura guiada en Por qué SIRYC, desfile horizontal en Proyectos. Lighthouse móvil 99/100/100/100. Estrategia documentada en docs/design/siryc.md.
- 2026-10-30 · Fase 3: páginas Servicios y Nosotros en Astro con componentes compartidos (PortadaFoto, Pila, Desfile, ListaGuiada, IndiceCapitulos, Llamado). Lectura guiada con color (AA). Lighthouse móvil 99/100/100/100 en ambas. Siguiente: Proyectos, Blog, Contacto y legales.
