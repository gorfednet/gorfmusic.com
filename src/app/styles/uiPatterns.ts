/**
 * Shared marketing UI “atoms” (Tailwind class strings).
 * Compose into components instead of duplicating border / hover / focus / icon-well rules.
 *
 * Primary CTAs: `marketingCtaOnImage*` (filled pink, white type) — used site-wide, not only on photos.
 * Icon rule (tiles / card links): `marketingIconGlyphInLink` + link wells; non-link icons: `marketingIconGlyphStatic`.
 */

/** Keyboard focus — cyan ring site-wide on custom controls and cards-as-links. */
export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00e5ff]";

/**
 * Default dark interactive card: pink-trim surface, lift on hover.
 * Use on Services, Music label tiles, platform listen grid, etc.
 */
export const marketingCardSurface =
  "rounded-2xl border border-[rgba(255,0,102,0.14)] bg-[#0a0a16] transition-colors hover:border-[rgba(255,0,102,0.42)] hover:bg-[#0d0d1a] active:bg-[#101024]";

export const marketingCardAsLink = `group ${marketingCardSurface} ${focusRing}`;

// --- Icons inside cards/links (`<a href>`, `<Link to>`): teal → white ---

export const marketingIconGlyphInLink =
  "text-[#00e5ff] transition-colors group-hover:text-white";

export const marketingIconWellLink =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#00e5ff]/12 transition-colors group-hover:bg-[#00e5ff]/24";

export const marketingIconWellLinkCompact =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00e5ff]/12 transition-colors group-hover:bg-[#00e5ff]/24";

export const marketingIconWellLinkPlatform =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#00e5ff]/14 transition-colors group-hover:bg-[#00e5ff]/26 md:h-14 md:w-14";

// --- Icons not on an href (decorative, static cards, `<select>` chevrons, etc.): teal ---

/** With a `group` parent (e.g. service card hover): soft teal → full teal (no glow). */
export const marketingIconGlyphStatic =
  "text-[#00e5ff]/70 transition-colors group-hover:text-[#00e5ff]";

/** No group hover (e.g. success state, decorative-only). */
export const marketingIconGlyphStaticSolo = "text-[#00e5ff]/90";

export const marketingIconWellStatic =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#00e5ff]/14 transition-colors group-hover:bg-[#00e5ff]/26";

export const marketingIconWellStaticCompact =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00e5ff]/12 transition-colors group-hover:bg-[#00e5ff]/24";

/** Outbound platform tile (each cell is an `<a href>`) — same hover as archive cards: border + surface, no shadow glow. */
export const marketingPlatformTile = `group flex h-full w-full min-h-[5.5rem] flex-col items-center justify-center gap-3 rounded-2xl px-3 py-5 md:min-h-[6.25rem] ${marketingCardSurface} ${focusRing}`;

/** Large outbound archive / listen cards (Live page). */
export const marketingArchiveLinkCard = `flex h-full min-h-[12rem] flex-col p-7 ${marketingCardAsLink}`;

/** Inline `<a href>` text — pink, white on hover. */
export const textLinkInline =
  "text-[#ff0066] hover:text-white underline underline-offset-2 decoration-[#ff0066]/40 hover:decoration-white/35 transition-colors";

/** Plain `<a href>` line (no underline). */
export const textLinkPlain = "text-[#ff0066] hover:text-white transition-colors";

/** Footer row on archive / listen cards (pink, lifts on group hover). */
export const marketingFooterLinkPink =
  "mt-auto inline-flex items-center gap-2 text-[0.85rem] text-[#ff0066] visited:text-[#ff0066] transition-colors group-hover:text-white group-hover:gap-3";

// --- Primary CTAs (filled pink: site-wide — hero, forms, collaboration pills, etc.) ---

/**
 * Near-opaque pink, **white** text; hover **solid** pink + inset highlight + slight **scale** (no ring).
 * Pair icons with `marketingIconGlyphOnImageCta`.
 */
const ctaFilledShell =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent bg-[#ff0066]/78 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-all duration-200 ease-out hover:bg-[#ff0066] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] motion-safe:hover:scale-[1.04]";

export const marketingCtaOnImage = `group ${ctaFilledShell} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00e5ff] motion-safe:active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-[#ff0066]/78 disabled:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]`;

export const marketingCtaOnImageHero = `${marketingCtaOnImage} px-8 py-3.5`;

export const marketingCtaOnImageSm = `${marketingCtaOnImage} px-6 py-2.5 text-[0.85rem]`;

/** Pill inside a parent `group` full-bleed link — same hover language via `group-hover`. */
export const marketingCtaOnImageInGroup =
  "inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-[#ff0066]/78 px-7 py-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-all duration-200 ease-out motion-safe:group-hover:scale-[1.04] group-hover:bg-[#ff0066] group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]";

/** Tighter in-group pill (collaboration cards). */
export const marketingCtaOnImageInGroupSm =
  "inline-flex w-fit items-center gap-1.5 rounded-full border border-transparent bg-[#ff0066]/78 px-5 py-2.5 text-[0.8rem] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-all duration-200 ease-out motion-safe:group-hover:scale-[1.04] group-hover:bg-[#ff0066] group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]";

/** Lucide (etc.) on primary filled CTAs — always white. */
export const marketingIconGlyphOnImageCta = "shrink-0 text-white";
