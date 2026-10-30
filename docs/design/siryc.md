# Diseño SIRYC (rediseño en Astro)

Rediseño de siryc.cl en Astro + Tailwind, en `astro/` durante la migración (al terminar pasa a la raíz).
El sitio en producción sigue siendo el de TanStack (raíz del repo) hasta que el dueño diga «publica».

## Decisiones

- **2026-10-30 · Migrar a Astro + Tailwind junto con el rediseño** (pedido del dueño). Motivo: cambiar todas las cards y
  animaciones ya obliga a reescribir los componentes; menos JS (hoy 726 kB en el chunk principal), fuentes locales,
  mismo stack que sus otras webs. Infra igual: Cloudflare Worker `siryc-web`, Supabase propio, Resend.
- **2026-10-30 · Forma de marca: «corte SIRYC»** (propuesta, a confirmar con /cards). Esquinas opuestas
  (sup. derecha + inf. izquierda) cortadas en diagonal, ~60°, como los remates de las letras S/R/Y/C del logotipo.
  `.corte` en `global.css`; `--corte` (ancho) y `--corte-alto` (= ancho × 1,7).
- **2026-10-30 · Firma: «filete partido»**. Línea rojo | respiro | azul, del arco calor/frío del isotipo. Se usa en
  menú activo, hover de cards y separadores. El rojo nunca va como texto (4,27:1 sobre papel).
- **2026-10-30 · Color**. Papel técnico `#eef0f2` (nunca blanco puro), papel 2 `#e3e7ea`, tinta `#1b232c`,
  grafito `#484a4c`, atenuado `#5e6670`, niebla `#b0bec5`. Acento único: azul `#14398e`. Contrastes medidos:
  tinta/papel 13,9 · azul/papel 9,2 · atenuado/papel 5,1 · atenuado/papel 2 4,7.
- **2026-10-30 · Tipografía** (a confirmar con /tipografias): brandbook = Exo 2 (titulares) + Inter (texto),
  autoalojadas con `@fontsource-variable`. Recomendación: mantener el brandbook (opción A).
- **2026-10-30 · Movimiento**. Curvas `--ease-salida` (expo out) y `--ease-barrido` (in-out); 0,8–1,2 s; escalonado
  0,08 s con clases `i-N` (sin estilos en línea). Solo transform/opacity/clip-path. Revelado con `data-revela`, solo
  con `.js` y movimiento permitido, salvavidas a los 5 s. Hovers dentro de `(hover: hover) and (pointer: fine)`;
  en táctil el estado ya viene aplicado.

## Laboratorio (solo `astro dev`, nunca en el build)

- `/cards`: A «Ficha técnica» (recomendada), B «Índice editorial», C «Panel sobre foto». Datos reales de la tabla
  `proyectos`; fotos provisorias.
- `/tipografias`: A Exo 2 + Inter, B solo Exo 2, C solo Inter.

## Probado y descartado

- Revelado con desenfoque (`blur`) en cada bloque, como el sitio actual: deja huecos en blanco al bajar rápido y es
  el efecto más típico de webs hechas con IA.
- Íconos de librería (lucide/tabler) y baldosas detrás de íconos: se reemplazan por símbolos propios o nada.
- Ficha A: el texto cambiaba a claro antes de que la foto cubriera la card (claro sobre claro a mitad del barrido).
  Corregido: barrido 0,8 s y cambio de color con 0,28 s de retraso.
