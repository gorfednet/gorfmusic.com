/**
 * Shared section gutters, vertical rhythm, and stack gaps for marketing pages.
 * Keeps padding/margins consistent when sections stack and at responsive breakpoints.
 */

/** Horizontal gutter — matches Navbar/Footer `shellContainerSx` (`px: 1rem`). */
export const sectionGutterX = "px-4";

/** Default vertical padding for stacked body sections. */
export const sectionPaddingY = "py-16 md:py-24";

/** Tighter band (e.g. stats under hero). */
export const sectionPaddingYCompact = "py-12 md:py-16";

/** First content block directly under `PageIntro` (shared top + bottom into next band). */
export const sectionFirstAfterIntro = `${sectionGutterX} pt-6 pb-16 md:pt-8 md:pb-24`;

/** Same as `sectionFirstAfterIntro` plus bottom rule (intro → content handoff). */
export const sectionFirstAfterIntroBordered = `${sectionFirstAfterIntro} border-b border-[rgba(255,0,102,0.05)]`;

/** Divider between stacked sections. */
export const sectionDividerTop = "border-t border-[rgba(255,0,102,0.05)]";

/** Muted vertical tint + divider + gutters + default section height (second-stack pattern). */
export const sectionStackedBand = `${sectionGutterX} ${sectionPaddingY} bg-gradient-to-b from-transparent via-[#ff0066]/[0.012] to-transparent ${sectionDividerTop}`;

/** Space from `SectionHeading` (or sr-only h2 block) to grids / tables / lists below. */
export const stackAfterHeading = "mt-10 md:mt-12";

/** Space below a heading/tool row before the next major block (tables, lists). */
export const stackMarginBottom = "mb-10 md:mb-12";

/** Full section with bottom border (bands between major Live blocks). */
export const sectionPaddingYBorderBottom = `${sectionGutterX} ${sectionPaddingY} border-b border-[rgba(255,0,102,0.05)]`;

/** Large vertical stack inside one section (e.g. collaboration cards). */
export const stackMajorBlocks = "space-y-12 md:space-y-16";

/** Responsive card / tile grids — consistent gutters when columns wrap. */
export const gridGapCards = "gap-5 md:gap-6";

/** Two-column editorial / split layouts (about + image, contact grid). */
export const gridGapSplit = "gap-10 md:gap-12 lg:gap-16";
