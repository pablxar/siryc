// Marca con `.dentro` cada [data-revela] / [data-lineas] al entrar en pantalla (una sola vez).
// El CSS solo oculta el estado inicial bajo `.js` y movimiento permitido.
// Si la portada abre con la entrada del logo, se espera a que termine para no animar debajo del telón.
const items = document.querySelectorAll<HTMLElement>("[data-revela], [data-lineas]");

function observar() {
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("dentro"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("dentro");
        io.unobserve(e.target);
      }
    },
    // Margen superior enorme: lo que ya quedó arriba (scroll rápido, ancla) cuenta como visto
    // y se muestra; nunca queda un bloque oculto por encima de la pantalla.
    { rootMargin: "99999px 0px -8% 0px", threshold: 0.12 },
  );
  items.forEach((el) => io.observe(el));
}

if (document.documentElement.classList.contains("con-entrada")) {
  let listo = false;
  const empezar = () => {
    if (listo) return;
    listo = true;
    observar();
  };
  document.addEventListener("entrada:fin", empezar, { once: true });
  setTimeout(empezar, 4500); // salvavidas si la entrada falla
} else {
  observar();
}
