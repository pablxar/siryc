/* TODO: reemplazar con logo oficial SIRYC en /public/logo-siryc.svg */
export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const wordColor = variant === "light" ? "#FFFFFF" : "#1B232C";
  const subColor = variant === "light" ? "rgba(255,255,255,0.7)" : "#484A4C";
  return (
    <div className="flex items-center gap-3">
      <svg
        width="44"
        height="44"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Bicolor arc: red top, blue bottom */}
        <path
          d="M 8 32 A 24 24 0 0 1 56 32"
          stroke="#E30613"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 8 32 A 24 24 0 0 0 56 32"
          stroke="#14398E"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Gear */}
        <g fill="#484A4C">
          <circle cx="32" cy="32" r="14" />
          <rect x="30" y="12" width="4" height="6" />
          <rect x="30" y="46" width="4" height="6" />
          <rect x="12" y="30" width="6" height="4" />
          <rect x="46" y="30" width="6" height="4" />
          <rect x="18" y="18" width="5" height="5" transform="rotate(45 20.5 20.5)" />
          <rect x="41" y="18" width="5" height="5" transform="rotate(45 43.5 20.5)" />
          <rect x="18" y="41" width="5" height="5" transform="rotate(45 20.5 43.5)" />
          <rect x="41" y="41" width="5" height="5" transform="rotate(45 43.5 43.5)" />
        </g>
        {/* Snowflake */}
        <g stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round">
          <line x1="32" y1="24" x2="32" y2="40" />
          <line x1="24" y1="32" x2="40" y2="32" />
          <line x1="26" y1="26" x2="38" y2="38" />
          <line x1="38" y1="26" x2="26" y2="38" />
        </g>
      </svg>
      <div className="leading-tight">
        <div
          className="font-display text-xl font-bold tracking-tight"
          style={{ color: wordColor, fontFamily: "var(--font-display)" }}
        >
          SIRYC
        </div>
        <div
          className="text-[9px] uppercase tracking-[0.14em]"
          style={{ color: subColor }}
        >
          Ingeniería · Electricidad · Clima
        </div>
      </div>
    </div>
  );
}
