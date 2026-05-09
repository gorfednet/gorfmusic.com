import type { SxProps, Theme } from "@mui/material/styles";

/**
 * Horizontal frame for nav/footer: matches page sections that wrap content in
 * `px-4` + `max-w-7xl mx-auto` (16px gutters, 80rem / 1280px max width).
 */
export const shellContainerSx: SxProps<Theme> = {
  maxWidth: "80rem",
  width: "100%",
  mx: "auto",
  px: "1rem",
};
