import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { SiteHead } from "./SiteHead";
import { canonicalizeKnownPathname } from "../paths";

/** Scrolls to top on route change so nested pages do not keep the previous scroll position. */
function ScrollToTopOnNavigate() {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const canonical = canonicalizeKnownPathname(pathname);
    if (canonical && canonical !== pathname) {
      navigate(`${canonical}${search}${hash}`, { replace: true });
    }
  }, [hash, navigate, pathname, search]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

/**
 * App shell: skip link (WCAG 2.4.1), landmark regions, Material surface background.
 */
export function Layout() {
  return (
    <MotionConfig reducedMotion="user">
    <Box
      component="div"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <SiteHead />
      <ScrollToTopOnNavigate />
      <Link
        href="#main-content"
        sx={{
          position: "absolute",
          left: -9999,
          top: 0,
          zIndex: 10000,
          px: 2,
          py: 1.5,
          borderRadius: 1,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          typography: "button",
          textDecoration: "none",
          "&:focus, &:focus-visible": {
            position: "fixed",
            left: 16,
            top: 16,
            outline: "2px solid",
            outlineColor: "background.paper",
            outlineOffset: 2,
          },
        }}
      >
        Skip to main content
      </Link>
      <Navbar />
      <Box
        id="main-content"
        component="main"
        tabIndex={-1}
        sx={{
          flex: 1,
          pt: { xs: "64px", md: "80px" },
          outline: "none",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
    </MotionConfig>
  );
}
