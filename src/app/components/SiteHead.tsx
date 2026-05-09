import { Helmet } from "react-helmet-async";
import { useLocation, useMatches } from "react-router";
import { canonicalUrlForPath, defaultSocialShareImageUrl, getRouteMeta } from "../seo/siteMeta";
import { SITE_NAME, SITE_ROLE_TAGLINE_NO_PERIOD } from "../content/siteIdentity";

/**
 * Injects document title, description, and social tags for the active route.
 * Defaults in index.html are overwritten here on the client so SPA navigation stays SEO-friendly.
 */
export function SiteHead() {
  const { pathname } = useLocation();
  const matches = useMatches();
  const isNotFound = matches.some((m) => m.id === "not-found");
  const meta = isNotFound
    ? {
        title: `Page not found | ${SITE_NAME}`,
        description: "No page exists at this URL on gorfmusic.com.",
      }
    : getRouteMeta(pathname);
  const canonical = canonicalUrlForPath(pathname);
  const ogImageAlt = `${SITE_NAME}, ${SITE_ROLE_TAGLINE_NO_PERIOD}`;
  const robotsPolicy = isNotFound ? "noindex, nofollow" : "index, follow, max-image-preview:large";

  return (
    <Helmet prioritizeSeoTags htmlAttributes={{ lang: "en" }}>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={defaultSocialShareImageUrl} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@gorfmusic" />
      <meta name="twitter:creator" content="@gorfmusic" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={defaultSocialShareImageUrl} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      <meta name="theme-color" content="#06060e" />
      <meta name="color-scheme" content="dark" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="robots" content={robotsPolicy} />
    </Helmet>
  );
}
