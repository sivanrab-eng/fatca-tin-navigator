import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronRight, ChevronLeft, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export type DemoStep = {
  target: string; // css selector via [data-tour="..."]
  title: string;
  body: string;
  action?: () => void; // optional side-effect when step activates (e.g., set country)
  waitFor?: boolean; // if true, hide Next until it becomes false (then auto-advance)
  hint?: string; // shown instead of Next while waiting
};

export type DemoLabels = {
  next: string;
  prev: string;
  exit: string;
  finish: string;
  waiting?: string;
  stepOf: (i: number, n: number) => string;
};

type Rect = { top: number; left: number; width: number; height: number };

const PAD = 8;

function useTargetRect(selector: string, tick: number): Rect | null {
  const [rect, setRect] = useState<Rect | null>(null);

  useLayoutEffect(() => {
    let raf = 0;
    const measure = () => {
      const el = document.querySelector<HTMLElement>(`[data-tour="${selector}"]`);
      if (!el) {
        setRect(null);
        return;
      }
      el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      raf = window.requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
      });
    };
    measure();
    const onResize = () => measure();
    const onScroll = () => measure();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, true);
    const id = window.setInterval(measure, 300);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll, true);
      window.clearInterval(id);
    };
  }, [selector, tick]);

  return rect;
}

export function DemoTour({
  steps,
  labels,
  dir,
  onClose,
}: {
  steps: DemoStep[];
  labels: DemoLabels;
  dir: "ltr" | "rtl";
  onClose: () => void;
}) {
  const [i, setI] = useState(0);
  const step = steps[i];
  const rect = useTargetRect(step?.target ?? "", i);

  // Fire side-effect on step change
  useEffect(() => {
    step?.action?.();
  }, [i]); // eslint-disable-line react-hooks/exhaustive-deps

  // Lock scroll while tour runs
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
        if (steps[i]?.waitFor) return;
        e.preventDefault();
        setI((v) => Math.min(v + 1, steps.length));
      } else if (e.key === "ArrowLeft") setI((v) => Math.max(0, v - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, steps, i]);

  // Auto-advance when a waitFor step's condition is satisfied
  useEffect(() => {
    if (step && step.waitFor === false) {
      // no-op: false means "not currently waiting" — advancement is triggered
      // only on the transition from true→false below
    }
  }, [step]);

  const prevWait = useRef<boolean | undefined>(undefined);
  useEffect(() => {
    const now = steps[i]?.waitFor;
    if (prevWait.current === true && now === false) {
      setI((v) => Math.min(v + 1, steps.length - 1));
    }
    prevWait.current = now;
  }, [steps, i]);

  const isLast = i === steps.length - 1;



  // Tooltip position — place below the target when there's room, else above.
  const tipStyle = useMemo(() => {
    if (!rect) return { top: "50%", left: "50%", transform: "translate(-50%,-50%)" } as const;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const tipW = Math.min(360, vw - 24);
    const spaceBelow = vh - (rect.top + rect.height);
    const placeBelow = spaceBelow > 200;
    const top = placeBelow ? rect.top + rect.height + PAD + 8 : Math.max(12, rect.top - 220);
    let left = rect.left + rect.width / 2 - tipW / 2;
    left = Math.max(12, Math.min(vw - tipW - 12, left));
    return { top, left, width: tipW } as const;
  }, [rect]);

  if (!step) return null;

  return (
    <div className="fixed inset-0 z-[9999]" dir={dir} aria-live="polite" role="dialog">
      {/* Dim + spotlight via SVG mask for a real cutout */}
      <svg className="absolute inset-0 h-full w-full pointer-events-auto" aria-hidden>
        <defs>
          <mask id="tour-mask">
            <rect width="100%" height="100%" fill="white" />
            {rect && (
              <rect
                x={rect.left - PAD}
                y={rect.top - PAD}
                width={rect.width + PAD * 2}
                height={rect.height + PAD * 2}
                rx={10}
                ry={10}
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.65)"
          mask="url(#tour-mask)"
          onClick={onClose}
        />
        {rect && (
          <rect
            x={rect.left - PAD}
            y={rect.top - PAD}
            width={rect.width + PAD * 2}
            height={rect.height + PAD * 2}
            rx={10}
            ry={10}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            className="animate-pulse"
            style={{ pointerEvents: "none" }}
          />
        )}
      </svg>

      {/* Tooltip card */}
      <div
        className={cn(
          "absolute rounded-xl border border-border bg-card p-4 shadow-2xl",
          "animate-in fade-in zoom-in-95 duration-200"
        )}
        style={tipStyle}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="text-xs font-semibold text-primary">
            {labels.stepOf(i + 1, steps.length)}
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted"
            aria-label={labels.exit}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <h3 className="mt-1 text-base font-bold">{step.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            {labels.exit}
          </Button>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setI((v) => Math.max(0, v - 1))}
              disabled={i === 0}
              className="gap-1"
            >
              {dir === "rtl" ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              {labels.prev}
            </Button>
            {isLast ? (
              <Button size="sm" onClick={onClose} className="gap-1">
                {labels.finish}
              </Button>
            ) : (
              <Button size="sm" onClick={() => setI((v) => v + 1)} className="gap-1">
                {labels.next}
                {dir === "rtl" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DemoLauncherIcon() {
  return <Play className="h-4 w-4" />;
}
