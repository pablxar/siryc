// Genera src/components/Logo.astro e Isotipo.astro desde el SVG oficial (src/assets/logo-gris.svg).
// Cada pieza queda con su clase para animarla (engranaje, copo, calor, frío, palabra).
import { readFileSync, writeFileSync } from "node:fs";

const svg = readFileSync(process.argv[2], "utf8");
const pick = (re) => [...svg.matchAll(re)].map((m) => m[0]);
const sinClase = (s) => s.replace(/\s(id|data-name|class)="[^"]*"/g, "");

const engranaje = sinClase(pick(/<path id="ENGRANAJE_EXTERIOR"[^>]*\/>/g)[0]);
const copoBloque = svg.match(/<g id="COPO_DE_NIEVE"[\s\S]*?<\/g>/)[0];
const copo = pick(/<path[^>]*\/>/g).filter((p) => copoBloque.includes(p)).map(sinClase);
const calorBloque = svg.match(/<g id="CALOR_Y_FRIO"[\s\S]*?<\/g>/)[0];
const frio = sinClase(calorBloque.match(/<path class="cls-3"[^>]*\/>/)[0]);
const calor = sinClase(calorBloque.match(/<path class="cls-2"[^>]*\/>/)[0]);
const resto = svg.slice(svg.indexOf(calorBloque) + calorBloque.length);
const palabra = [...resto.matchAll(/<(path|polygon)[^>]*\/>/g)].map((m) => sinClase(m[0]));

const iso = `<g class="iso">
    <g class="iso-engranaje">${engranaje}</g>
    <g class="iso-copo">${copo.join("")}</g>
    <g class="iso-frio">${frio}</g>
    <g class="iso-calor">${calor}</g>
  </g>`;

const cabecera = (doc) => `---
// GENERADO por scripts/logo-a-componente.mjs desde el SVG oficial. No editar a mano.
${doc}
interface Props {
  class?: string;
  titulo?: string;
}
const { class: clase, titulo = "SIRYC" } = Astro.props;
---
`;

writeFileSync(
  "src/components/Logo.astro",
  `${cabecera("// Logotipo completo (isotipo + palabra) en línea, con piezas animables.")}
<svg class:list={["logo", clase]} viewBox="0 0 1470.65 371.05" role="img" aria-label={titulo}>
  ${iso}
  <g class="palabra">${palabra.join("")}</g>
</svg>
`,
);

writeFileSync(
  "src/components/Isotipo.astro",
  `${cabecera("// Solo el isotipo (engranaje + copo + arco calor/frío).")}
<svg class:list={["isotipo", clase]} viewBox="0 0 376 371.05" role="img" aria-label={titulo}>
  ${iso}
</svg>
`,
);
console.log({ copo: copo.length, palabra: palabra.length });
