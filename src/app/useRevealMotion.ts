import { useReducedMotion } from "motion/react";
import { easeOutExpo, scrollRevealViewport } from "./motionPresets";

type ScrollRevealOpts = {
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
};

/**
 * Small opacity/translate reveals for sections and cards. Keeps durations short so
 * scroll stays responsive; respects `prefers-reduced-motion` (no tween, content visible).
 */
export function useRevealMotion() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const fadeUp = (opts?: ScrollRevealOpts) => {
    const delay = opts?.delay ?? 0;
    const duration = opts?.duration ?? 0.34;
    if (opts?.x !== undefined) {
      const x = opts.x;
      return {
        initial: (prefersReducedMotion ? false : { opacity: 0, x }) as false | { opacity: number; x: number },
        whileInView: { opacity: 1, x: 0 },
        viewport: scrollRevealViewport,
        transition: prefersReducedMotion ? { duration: 0 } : { duration, delay, ease: easeOutExpo },
      };
    }
    const y = opts?.y ?? 12;
    return {
      initial: (prefersReducedMotion ? false : { opacity: 0, y }) as false | { opacity: number; y: number },
      whileInView: { opacity: 1, y: 0 },
      viewport: scrollRevealViewport,
      transition: prefersReducedMotion ? { duration: 0 } : { duration, delay, ease: easeOutExpo },
    };
  };

  return { reduced: prefersReducedMotion, fadeUp };
}
