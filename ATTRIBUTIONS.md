This Figma Make file includes components from [shadcn/ui](https://ui.shadcn.com/) used under [MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md).

This Figma Make file includes photos from [Unsplash](https://unsplash.com) used under [license](https://unsplash.com/license).

Bundled under `public/images/` (served from this site, not the Unsplash CDN):

- `home-hero-concert-bg.jpg` — sourced from Unsplash asset `photo-1768053921740-f645ebbe68c4`
- `home-upcoming-club-bg.jpg` — sourced from Unsplash asset `photo-1545128485-c400e7702796`
- `og-default.jpg` — 1200×630 center crop of `home-hero-concert-bg.jpg` for Open Graph / Twitter cards

## Inline SVG marks (listen / recordings UI)

Some platform glyphs are embedded inline from [Simple Icons](https://simpleicons.org/) ([CC0 1.0](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md)), with paths copied into:

- `src/app/components/FeaturedRecordingsSection.tsx` (SoundCloud, YouTube)
- `src/app/components/StreamingPlatformRow.tsx` (Apple Music, YouTube Music; Bandcamp path adjusted alongside)

