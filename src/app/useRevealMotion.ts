import { useEffect, useId, useLayoutEffect, useState, type CSSProperties } from "react";

type ScrollRevealOpts = {
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
};

type RevealStyle = CSSProperties & {
  "--reveal-delay": string;
  "--reveal-duration": string;
  "--reveal-x": string;
  "--reveal-y": string;
};

function prefersReducedMotionNow(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(prefersReducedMotionNow);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reduced;
}

/**
 * Small opacity/translate reveals for sections and cards. Keeps durations short so
 * scroll stays responsive; respects `prefers-reduced-motion` (no tween, content visible).
 */
export function useRevealMotion() {
  const scope = useId();
  const reduced = usePrefersReducedMotion();
  const canObserve = typeof window !== "undefined" && typeof window.IntersectionObserver === "function";

  useLayoutEffect(() => {
    const selector = `[data-reveal-scope="${scope}"]`;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));

    if (reduced || typeof window.IntersectionObserver !== "function") {
      elements.forEach((element) => {
        element.dataset.reveal = "visible";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.reveal = "visible";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px 12% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [reduced, scope]);

  const fadeUp = (opts?: ScrollRevealOpts) => {
    const delay = opts?.delay ?? 0;
    const duration = opts?.duration ?? 0.34;
    const x = opts?.x ?? 0;
    const y = opts?.x === undefined ? (opts?.y ?? 12) : 0;
    const style: RevealStyle = {
      "--reveal-delay": `${delay}s`,
      "--reveal-duration": `${duration}s`,
      "--reveal-x": `${x}px`,
      "--reveal-y": `${y}px`,
    };

    return {
      "data-reveal": reduced || !canObserve ? ("visible" as const) : ("pending" as const),
      "data-reveal-scope": scope,
      style,
    };
  };

  return { reduced, fadeUp };
}
