import type { SxProps, Theme } from "@mui/material/styles";

/**
 * Shared “Gorf” wordmark: vertical gradient bar + label styles.
 * Keeps nav/footer visually aligned without copy-pasting palette gradient math.
 */
export const brandWordmarkAccentSx: SxProps<Theme> = {
  width: 4,
  height: 24,
  borderRadius: 999,
  flexShrink: 0,
  background: (t) => `linear-gradient(180deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
};

/** App bar wordmark (larger tracking for distance from menu). */
export const brandWordmarkNavLabelSx: SxProps<Theme> = {
  fontFamily: '"Outfit", sans-serif',
  fontWeight: 800,
  fontSize: { xs: "1.16rem", md: "1.18rem" },
  letterSpacing: "0.18em",
  textTransform: "uppercase",
};

/** Footer column wordmark (slightly tighter than nav). */
export const brandWordmarkFooterLabelSx: SxProps<Theme> = {
  fontFamily: '"Outfit", sans-serif',
  fontWeight: 800,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
};
