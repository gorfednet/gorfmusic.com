import { externalLinks } from "./externalLinks";

/** Single source of truth for Listen everywhere row + footer Listen column (same order). Footer utility row lists Discogs then gorfed.net. */
export const LISTEN_PLATFORMS = [
  { id: "bandcamp" as const, label: "Bandcamp", href: externalLinks.bandcamp },
  { id: "subvert" as const, label: "Subvert", href: externalLinks.subvert },
  { id: "spotify" as const, label: "Spotify", href: externalLinks.spotify },
  { id: "appleMusic" as const, label: "Apple Music", href: externalLinks.appleMusic },
  { id: "youtubeMusic" as const, label: "YouTube Music", href: externalLinks.youtubeMusic },
];

export type ListenPlatformId = (typeof LISTEN_PLATFORMS)[number]["id"];
