// Lightweight Google Analytics 4 wrapper.
// Set VITE_GA_MEASUREMENT_ID (e.g. "G-XXXXXXXXXX") to enable.
// If not set, all calls become no-ops — safe for dev/preview.

export const GA_MEASUREMENT_ID = "G-EXBZWVWH05";

export const analyticsEnabled = Boolean(GA_MEASUREMENT_ID);

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

export function trackEvent(
  name: string,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;
  if (!analyticsEnabled || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
