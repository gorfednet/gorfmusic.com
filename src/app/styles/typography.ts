/**
 * Shared font stacks for the public site.
 * Pulling these into one module keeps typography consistent and makes theme tweaks predictable.
 */

export const siteFonts = {
  /** Large hero wordmark (e.g. home page title). */
  heroWordmark: { fontFamily: "'Outfit', sans-serif", fontWeight: 800 } as const,
  /** Primary section headings (h1–h2 scale in page content). */
  sectionTitle: { fontFamily: "'Outfit', sans-serif", fontWeight: 700 } as const,
  /** Supporting headings (cards, aside titles). */
  subsectionTitle: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 } as const,
  /** Uppercase labels, stats, and micro-copy. */
  monoLabel: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 } as const,
};

/** Top-of-page hero: shared padding with nav shell gutters (all marketing pages). Bottom aligns with `sectionFirstAfterIntro` top. */
export const pageIntroSectionClass = "px-4 pt-12 pb-6 md:pt-20 md:pb-8";

/** Primary content column — matches Navbar/Footer `shellContainerSx` width. */
export const contentShellInnerClass = "max-w-7xl mx-auto w-full";

/** Cyan kicker above the page `<h1>` (also used for in-page section tags in `SectionHeading`). */
export const pageEyebrowClass = "m-0 text-[#00e5ff] uppercase tracking-[0.2em] text-[0.75rem]";

/** Page `<h1>` scale — one consistent title ramp site-wide. */
export const pageH1Class = "text-4xl sm:text-5xl md:text-6xl text-white mt-2 mb-4";

/** Intro / section description body (max readable width, same color/size as page leads). */
export const pageLeadWrapClass = "text-[#777] text-[1.02rem] max-w-3xl leading-[1.75] [&_p]:m-0";

/** In-page `<h2>` for `SectionHeading` blocks (below the page hero). */
export const sectionH2Class = "text-3xl sm:text-4xl md:text-5xl text-white mt-2 mb-4 text-left";

/** Small caps label for secondary sections (e.g. “Listen everywhere”). */
export const sectionLabelH2Class =
  "m-0 text-[#555] text-[0.75rem] uppercase tracking-[0.2em] text-left";
