/**
 * Scroll-reveal: one pass, modest intersection ratio, slight root margin so the motion
 * tends to finish before the block is fully on screen (less work during fast scroll).
 */
export const scrollRevealViewport = {
  once: true as const,
  amount: 0.15 as const,
  margin: "0px 0px 12% 0px" as const,
};
export const easeOutExpo = [0.22, 1, 0.36, 1] as const;
