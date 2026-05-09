/**
 * Central place for page titles and descriptions used by react-helmet-async.
 * When you add a route, register it here so crawlers and social previews stay accurate.
 */
import { canonicalizeKnownPathname } from "../paths";
import { HOME_META_TITLE, SITE_NAME, SITE_ROLE_TAGLINE_NO_PERIOD } from "../content/siteIdentity";

const defaultDescription =
  `${SITE_NAME}, ${SITE_ROLE_TAGLINE_NO_PERIOD} (since 2003). Solo records, the Denseware IDM duo, and the SSATCY breakbeat project. Downtempo, IDM, breakbeat, drum and bass, jungle, ambient, trip hop, and big beat across studio production, scoring, sound design, and live performance.`;

export type RouteMeta = {
  title: string;
  description: string;
};

export const defaultSiteMeta: RouteMeta = {
  title: HOME_META_TITLE,
  description: defaultDescription,
};

const routes: Record<string, RouteMeta> = {
  "/": {
    title: HOME_META_TITLE,
    description: defaultDescription,
  },
  "/listen": {
    title: `Listen | ${SITE_NAME}`,
    description:
      "Solo discography from Gorf: experimental downtempo, melodic breakbeats, and chill electronica. Listen on Bandcamp, Spotify, and Apple Music, with full credits on Discogs.",
  },
  "/collaborations": {
    title: `Collaborations | ${SITE_NAME}`,
    description:
      "Collaborations from Gorf: Denseware's melodic IDM hardware and software dialogue, plus SSATCY's breakbeat lane between hip-hop swing and jungle drive.",
  },
  "/services": {
    title: `Services | ${SITE_NAME}`,
    description:
      "Composition, scoring, sound design, mixing, mastering, live PA, and DJ sets. Roughly two decades of electronic production.",
  },
  "/live": {
    title: `Live & Shows | ${SITE_NAME}`,
    description: "Upcoming performances and selected history from Toronto and other cities.",
  },
  "/contact": {
    title: `Contact | ${SITE_NAME}`,
    description:
      "Licensing, booking, remixes, and commissions. Live, scoring, and general business mail.",
  },
};

/** Public site origin for canonical and Open Graph URLs (must match production HTTPS host). */
export const publicSiteOrigin = "https://gorfmusic.com";

/** Default share image (1200×630 JPEG, same-origin). Cropped from the home hero photo; see ATTRIBUTIONS.md. */
export const defaultSocialShareImageUrl = `${publicSiteOrigin}/images/og-default.jpg`;

/** Map static `*.html` entry paths and trailing slashes to route keys (canonical URLs omit `.html`). */
function normalizePathForMeta(pathname: string): string {
  return canonicalizeKnownPathname(pathname) ?? pathname;
}

export function getRouteMeta(pathname: string): RouteMeta {
  const key = normalizePathForMeta(pathname);
  return routes[key] ?? defaultSiteMeta;
}

/** Absolute URL for the current path (canonical and og:url). */
export function canonicalUrlForPath(pathname: string): string {
  const key = normalizePathForMeta(pathname);
  const pathSuffix = key === "/" ? "" : key;
  return `${publicSiteOrigin}${pathSuffix}`;
}
