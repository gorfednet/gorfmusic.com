import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./app/App";
import { appTheme } from "./theme/muiTheme";
import "./styles/index.css";

const mountNode = document.getElementById("root");

if (!mountNode) {
  throw new Error("Bootstrap failed: missing #root element in index.html.");
}

/**
 * StyledEngineProvider injectFirst: Emotion (MUI) first, then Tailwind — so page-level utilities
 * can override when needed without fighting the app shell.
 */
createRoot(mountNode).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={appTheme}>
        <CssBaseline enableColorScheme />
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
);
