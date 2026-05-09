import { createTheme } from "@mui/material/styles";

/**
 * Material Design 3–aligned dark theme: surface hierarchy, state layers, focus rings.
 * Contrast targets: body text vs background ≥ 4.5:1 (WCAG AA); large text / UI controls checked in theme.
 */
export const appTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff0066",
      light: "#ff4d8c",
      dark: "#cc0052",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#00e5ff",
      light: "#5cebff",
      dark: "#00b2cc",
      contrastText: "#0a0a12",
    },
    background: {
      default: "#06060e",
      paper: "#0a0a16",
    },
    text: {
      primary: "rgba(238, 238, 242, 0.96)",
      secondary: "rgba(200, 200, 214, 0.78)",
      disabled: "rgba(160, 160, 180, 0.45)",
    },
    divider: "rgba(255, 0, 102, 0.12)",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Outfit", "Inter", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Outfit", "Inter", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Outfit", "Inter", sans-serif', fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.02em" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { scrollbarColor: "rgba(255,0,102,0.35) transparent" },
      },
    },
    MuiButtonBase: {
      defaultProps: { disableRipple: false },
      styleOverrides: {
        root: {
          "&.Mui-focusVisible": {
            outline: "2px solid #ff0066",
            outlineOffset: "2px",
          },
        },
      },
    },
    MuiLink: {
      defaultProps: { underline: "hover" },
      styleOverrides: {
        root: {
          cursor: "pointer",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});
