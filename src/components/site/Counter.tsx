import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Animates a numeric value in view. Preserves a prefix (e.g. "+") and a suffix.
 * If the string is not numeric (e.g. "ISO", "24/7"), renders as-is.
 */
export function Counter({
  value,
  duration = 1.6,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const match = value.match(/^([^\d]*)(\d+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numeric = match ? parseInt(match[2], 10) : NaN;
  const suffix = match?.[3] ?? "";

  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView || Number.isNaN(numeric)) return;
    const controls = animate(mv, numeric, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, numeric, duration, mv]);

  useEffect(() => {
    if (Number.isNaN(numeric)) return;
    return rounded.on("change", (latest) => {
      if (ref.current) ref.current.textContent = `${prefix}${latest}${suffix}`;
    });
  }, [rounded, prefix, suffix, numeric]);

  if (Number.isNaN(numeric)) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
