import { useEffect, useRef } from "react";

/**
 * Dev-time guard: warns in the console (and optionally throws) when the
 * referenced element overflows the viewport. Useful for catching RTL
 * popover / dropdown positioning bugs automatically.
 *
 * Usage:
 *   const ref = useOverflowCheck<HTMLDivElement>({ label: "country-popover", when: open, dir });
 *   <div ref={ref}>...</div>
 */
export function useOverflowCheck<T extends HTMLElement = HTMLElement>(opts: {
  label: string;
  when: boolean;
  dir?: "rtl" | "ltr";
  tolerancePx?: number;
}) {
  const ref = useRef<T | null>(null);
  const { label, when, dir, tolerancePx = 1 } = opts;

  useEffect(() => {
    if (!when || typeof window === "undefined") return;
    if (!import.meta.env.DEV) return;

    // Wait one frame for layout to settle (popovers position async).
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const issues: string[] = [];
        if (rect.left < -tolerancePx) issues.push(`overflows LEFT by ${Math.round(-rect.left)}px`);
        if (rect.right > vw + tolerancePx)
          issues.push(`overflows RIGHT by ${Math.round(rect.right - vw)}px`);
        if (rect.top < -tolerancePx) issues.push(`overflows TOP by ${Math.round(-rect.top)}px`);
        if (rect.bottom > vh + tolerancePx)
          issues.push(`overflows BOTTOM by ${Math.round(rect.bottom - vh)}px`);

        if (issues.length > 0) {
          // eslint-disable-next-line no-console
          console.warn(
            `[overflow-check:${label}] dir=${dir ?? "auto"} viewport=${vw}x${vh} rect=`,
            { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom },
            "→",
            issues.join(", "),
          );
        }
      });
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [when, label, dir, tolerancePx]);

  return ref;
}
