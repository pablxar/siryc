# Diseño SIRYC (rediseño en Astro)

Rediseño de siryc.cl en Astro + Tailwind, en `astro/` durante la migración (al terminar pasa a la raíz).
El sitio en producción sigue siendo el de TanStack (raíz del repo) hasta que el dueño diga «publica».

## Decisiones

- **2026-10-30 · Migrar a Astro + Tailwind junto con el rediseño** (pedido del dueño). Motivo: cambiar todas las cards y
  animaciones ya obliga a reescribir los componentes; menos JS (hoy 726 kB en el chunk principal), fuentes locales,
  mismo stack que sus otras webs. Infra igual: Cloudflare Worker `siryc-web`, Supabase propio, Resend.
- **2026-10-30 · Forma de marca: «corte SIRYC»** (confirmada con la elección de la card A). Esquinas opuestas
  (sup. derecha + inf. izquierda) cortadas en diagonal, ~60°, como los remates de las letras S/R/Y/C del logotipo.
  `.corte` en `global.css`; `--corte` (ancho) y `--corte-alto` (= ancho × 1,7).
- **2026-10-30 · Firma: «filete partido»**. Línea rojo | respiro | azul, del arco calor/frío del isotipo. Se usa en
  menú activo, hover de cards y separadores. El rojo nunca va como texto (4,27:1 sobre papel).
- **2026-10-30 · Color**. Papel técnico `#eef0f2` (nunca blanco puro), papel 2 `#e3e7ea`, tinta `#1b232c`,
  grafito `#484a4c`, atenuado `#5e6670`, niebla `#b0bec5`. Acento único: azul `#14398e`. Contrastes medidos:
  tinta/papel 13,9 · azul/papel 9,2 · atenuado/papel 5,1 · atenuado/papel 2 4,7.
- **2026-10-30 · Tipografía: Exo 2 (titulares) + Inter (texto)** (pedido del dueño, opción A de /tipografias),
  autoalojadas con `@fontsource-variable`.
- **2026-10-30 · Movimiento**. Curvas `--ease-salida` (expo out) y `--ease-barrido` (in-out); 0,8–1,2 s; escalonado
  0,08 s con clases `i-N` (sin estilos en línea). Solo transform/opacity/clip-path. Revelado con `data-revela`, solo
  con `.js` y movimiento permitido, salvavidas a los 5 s. Hovers dentro de `(hover: hover) and (pointer: fine)`;
  en táctil el estado ya viene aplicado.

- **2026-10-30 · Card del sitio: «Ficha técnica»** (pedido del dueño, opción A). Molde único `components/Ficha.astro`:
  índice + rótulo, título, contenido (cifras con `Cifras.astro` o texto `.ficha-texto`) y pie con filete. Con puntero
  fino la foto (o la tinta, sin foto) entra con barrido diagonal; en táctil la foto va arriba. Se usa en servicios,
  proyectos y artículos.
- **2026-10-30 · Cabecera**: plana arriba; al bajar 24 px aparece la «isla» con el corte (solo clip-path + opacity en
  una capa, el contenido no se mueve). Activo y hover con el filete partido. Celular: logo + «Menú», hoja a pantalla
  completa con barrido diagonal, links numerados 01–06, foco al abrir, Esc cierra y devuelve el foco.
- **2026-10-30 · Pie**: simétrico y centrado (logo claro, eslogan, filete, Sitio / Servicios / Contacto, legal).
  Sin redes sociales: los enlaces actuales apuntan a «#».
- **2026-10-30 · Entrada de marca** (portada): el isotipo se arma (engranaje gira, copo, frío, calor), sube el telón
  y el símbolo vuela al isotipo de la cabecera, que aparece debajo (~2,3 s). Solo al llegar desde fuera del sitio
  (referrer externo o vacío); se apaga con ancla, `?intro=0`, ahorro de datos, movimiento reducido o automatización.
  Se salta con clic, tecla, rueda o toque. Salvavidas CSS a los 4,5 s.
- **2026-10-30 · Portada** en capítulos numerados: portada (titular por líneas + foto con corte; celular con la foto
  vertical propia), 01 Especialidades (carrusel con vecina asomada en celular), 02 Por qué SIRYC (titular fijo +
  lista editorial + cifras), 03 Proyectos recientes, 04 Actualidad técnica, remate azul.
- **2026-10-30 · Datos**: proyectos y artículos se leen de Supabase **al compilar** (`lib/supabase.ts`, solo
  columnas con permiso público). Un error de Supabase detiene el build de producción. Publicar un proyecto o
  artículo nuevo requiere volver a compilar (pendiente: automatizarlo).
- **2026-10-30 · Medición** (build de producción, Lighthouse 13.5 móvil): rendimiento 99, accesibilidad 100,
  buenas prácticas 100, SEO 100; LCP 2,2 s; CLS 0; peso total 285 KB. Sitio actual: 60 / 94 / 100 / 92, LCP 35,9 s, 11 MB.

- **2026-10-30 · Portada a pantalla completa** (pedido del dueño: «la imagen en toda la pantalla, como la original»).
  Foto completa; el texto va sobre un panel azul con borde diagonal en el ángulo del corte (no un degradado).
  Celular: el panel es el fondo del bloque de texto, arranca 5,5 rem sobre el rótulo con el borde en diagonal.
  La cabecera arranca como isla en páginas con foto completa (se lee sobre cualquier foto). Sobre azul, el filete
  partido es rojo | papel (`.filete--claro`).

## Estrategia de scrollytelling (pedido del dueño 2026-10-30: «me gustan las transiciones de scrollytelling,
## las tarjetas sticky», con sentido en la presentación de la información)

Un vocabulario corto; cada patrón se usa solo para su tipo de contenido, en todas las páginas:

| Patrón | Para qué | Cómo |
|---|---|---|
| **Portada** | Quién somos / de qué trata la página: impacto | Foto completa + panel azul diagonal, titular por líneas |
| **Pila** | Pocas cosas importantes, una a la vez, con foco total | Tarjetas sticky; la siguiente tapa a la anterior, que se achica a 0,93 y se apaga (sincronizado a la distancia real) |
| **Título fijo + lectura guiada** | Argumentos o explicación en orden | Titular sticky a la izquierda; cada punto se enciende al llegar a la zona de lectura |
| **Desfile horizontal** | Evidencia o secuencia (proyectos, historia) | La sección se fija y las fichas pasan de derecha a izquierda; el filete marca el avance |
| **Grilla quieta** | Catálogo para leer libre (artículos, equipo) | Sin efecto de scroll, solo revelado |
| **Remate** | Llamado a la acción | Banda azul con corte y filete |

Reglas: solo CSS (sticky + `animation-timeline`), sin librerías. Sin soporte, en pantallas bajas o con movimiento
reducido: la pila se apila sin achicarse, el desfile pasa a carrusel con el dedo, la lectura guiada se ve completa.
En celular el desfile es carrusel con el dedo (no se secuestra el scroll vertical).
Trampa: el minificador fusiona `animation` + `animation-timeline` en el atajo, que Chrome no acepta: la línea de
tiempo siempre va en una regla aparte con selector distinto.

## Por confirmar con el dueño

- Cifras publicadas hoy: +20 años, 3.000+ proyectos, 2.000+ mantenciones, 24/7 de respuesta técnica; «SLA definidos
  y guardia operativa»; acreditación SEC y membresía en la Cámara Chilena de Refrigeración y Climatización A.G.
- Testimonios del sitio actual son de relleno («[Nombre del contacto]», «Llevamos [X] años»): no se migran hasta tener
  testimonios reales con permiso.
- Cinta de clientes del sitio actual mezcla a la Armada con nombres genéricos («Mall Regional», «Corporación Regional»):
  no se migra; hace falta la lista real de clientes que se pueden nombrar.
- Fotos de proyectos: hoy son provisorias por segmento; idealmente fotos reales de cada obra.
- Redes sociales: enlaces reales.

## Laboratorio (solo `astro dev`, nunca en el build)

- `/cards`: A «Ficha técnica» (recomendada), B «Índice editorial», C «Panel sobre foto». Datos reales de la tabla
  `proyectos`; fotos provisorias.
- `/tipografias`: A Exo 2 + Inter, B solo Exo 2, C solo Inter.

## Probado y descartado

- Revelado con margen inferior normal: con scroll rápido, lo que quedaba arriba sin cruzar la pantalla seguía oculto.
  Corregido con margen superior enorme en el IntersectionObserver (lo que ya pasó cuenta como visto).
- Ícono de cerrar del menú: la línea corta giraba desde su extremo y armaba un «>». Ahora ambas giran desde el centro.
- Respaldo PNG de `<Picture>`: generaba archivos de hasta 3 MB. Ahora el respaldo es WebP.

- Revelado con desenfoque (`blur`) en cada bloque, como el sitio actual: deja huecos en blanco al bajar rápido y es
  el efecto más típico de webs hechas con IA.
- Íconos de librería (lucide/tabler) y baldosas detrás de íconos: se reemplazan por símbolos propios o nada.
- Ficha A: el texto cambiaba a claro antes de que la foto cubriera la card (claro sobre claro a mitad del barrido).
  Corregido: barrido 0,8 s y cambio de color con 0,28 s de retraso.
