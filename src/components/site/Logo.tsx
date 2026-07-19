import darkLogo from "@/assets/siryc-logo-dark.png.asset.json";
import lightLogo from "@/assets/siryc-logo-light.png.asset.json";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const src = variant === "light" ? lightLogo.url : darkLogo.url;
  return (
    <img
      src={src}
      alt="SIRYC — Ingeniería en refrigeración, climatización y electricidad"
      className="h-10 w-auto md:h-11"
      loading="eager"
      decoding="async"
    />
  );
}
