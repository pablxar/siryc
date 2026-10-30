// Marca con `.dentro` cada [data-revela] al entrar en pantalla (una sola vez).
// El CSS solo oculta el estado inicial bajo `.js` y movimiento permitido.
const items = document.querySelectorAll<HTMLElement>("[data-revela]");

if (!("IntersectionObserver" in window)) {
  items.forEach((el) => el.classList.add("dentro"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("dentro");
        io.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
  );
  items.forEach((el) => io.observe(el));
}
