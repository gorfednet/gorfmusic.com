/**
 * Static HTML entry points (root `*.html` from `*.vite.template.html` + Vite multi-page build).
 * Clean paths without `.html` are still routed in `routes.tsx` for bookmarks and nginx fallback.
 */
export const PAGE_HREF = {
  home: "/",
  listen: "/listen",
  collaborations: "/collaborations",
  services: "/services",
  live: "/live",
  contact: "/contact",
} as const;

export type NavSegment = keyof typeof PAGE_HREF;
export const PAGE_ROUTE_SEGMENTS = ["listen", "collaborations", "services", "live", "contact"] as const;
type PageRouteSegment = (typeof PAGE_ROUTE_SEGMENTS)[number];

const PAGE_ROUTE_SET = new Set<string>(PAGE_ROUTE_SEGMENTS);

/** Map pathname (from `useLocation`) to primary nav segment for active styling. */
export function getNavSegment(pathname: string): NavSegment | null {
  const p = pathname.replace(/\/$/, "") || "/";
  if (p === "/" || p === "/index.html") return "home";
  if (p === "/listen" || p === "/listen.html" || p === "/music" || p === "/music.html") return "listen";
  if (p === "/collaborations" || p === "/collaborations.html") return "collaborations";
  if (p === "/services" || p === "/services.html") return "services";
  if (p === "/live" || p === "/live.html") return "live";
  if (p === "/contact" || p === "/contact.html") return "contact";
  return null;
}

/**
 * Convert known legacy or slash variants to canonical extensionless route paths.
 * Returns null for unknown routes so 404 behavior remains unchanged.
 */
export function canonicalizeKnownPathname(pathname: string): string | null {
  if (pathname === "/index.html") return "/";
  if (pathname === "/" || pathname === "") return "/";
  if (pathname === "/music" || pathname === "/music/") return "/listen";
  if (pathname === "/music.html") return "/listen";

  const noSlash = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  if (PAGE_ROUTE_SET.has(noSlash.slice(1))) return noSlash;

  if (noSlash.endsWith(".html")) {
    const segment = noSlash.slice(1, -5) as PageRouteSegment;
    if (PAGE_ROUTE_SET.has(segment)) {
      return `/${segment}`;
    }
  }

  return null;
}
