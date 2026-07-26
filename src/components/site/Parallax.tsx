import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function Parallax({
  children,
  offset = 60,
  className,
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

export function SectionMarker({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span className="font-mono text-xs tracking-[0.3em] text-[color:var(--color-siryc-red)]">
        {index}
      </span>
      <div className="h-px flex-1 bg-black/10" />
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--color-siryc-gray)]">
        {label}
      </span>
    </div>
  );
}
