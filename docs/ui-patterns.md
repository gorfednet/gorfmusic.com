# UI patterns (gorfmusic.com)

Design tokens live in **`src/app/styles/uiPatterns.ts`** (interactive UI) and **`src/app/styles/layoutSections.ts`** (section gutters, vertical rhythm, stack gaps, grid gaps). Typography tokens are in **`src/app/styles/typography.ts`**.

## Layers

| Layer   | Role |
|--------|------|
| **Atom** | `focusRing`, `marketingIconGlyphInLink` / `marketingIconGlyphStatic`, surface borders |
| **Molecule** | Link: `marketingIconWellLink*` + `marketingIconGlyphInLink`. Static: `marketingIconWellStatic*` + `marketingIconGlyphStatic` |
| **Organism** | Full tile: `marketingArchiveLinkCard`, `marketingPlatformTile` (Music listen grid), `marketingCardAsLink` + padding + grid layout (`ServicesPage`, label links on `MusicPage`) |

## Rules of thumb

- **Interactive cards** (whole surface is a link): `marketingCardAsLink` + vertical layout + `focusRing` is already included.
- **Icons on `<a href>` / `<Link to>`**: **pink** glyph + optional pink well; **hover → white** (`marketingIconGlyphInLink`, `marketingIconWellLink*`).
- **Icons not on a URL** (service tiles, `<select>` chevrons, success states): **teal**; hover strengthens teal (`marketingIconGlyphStatic`, `marketingIconWellStatic*`).
- **`<a href>` copy**: **pink → white** — `textLinkInline` (underlined) or `textLinkPlain` + `focusRing` when needed.

- **Primary CTAs / buttons** (site-wide — hero, bio, contact submit, 404, collaboration pills, etc.): **`marketingCtaOnImage`**, **`marketingCtaOnImageHero`**, **`marketingCtaOnImageSm`**, **`marketingCtaOnImageInGroup`**, **`marketingCtaOnImageInGroupSm`**. Filled pink (`/78` default → **solid** on hover), **white** text, **inset highlight** + **scale** on hover (no ring). Icons: **`marketingIconGlyphOnImageCta`**.

When adding a new card row, import from `uiPatterns` instead of copying `rgba(255,0,102,0.05)` blocks.
