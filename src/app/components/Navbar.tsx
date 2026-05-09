import { useEffect, useLayoutEffect, useState, type ComponentType } from "react";
import { Link as RouterLink, useLocation } from "react-router";
import { PAGE_HREF, getNavSegment, type NavSegment } from "../paths";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Home, Music, Mic2, Users, Wrench, Mail, type LucideProps } from "lucide-react";
import { brandWordmarkAccentSx, brandWordmarkNavLabelSx } from "../styles/brandWordmark";
import { HOME_HERO_WORDMARK_ID, SITE_NAME } from "../content/siteIdentity";
import { shellContainerSx } from "../styles/contentShell";

type NavLink = {
  segment: NavSegment;
  label: string;
  to: string;
  Icon: ComponentType<LucideProps>;
};

/** Primary destinations — align with `routes.tsx` and root `*.html` entry points. */
const navLinks: NavLink[] = [
  { segment: "home", label: "Home", to: PAGE_HREF.home, Icon: Home },
  { segment: "listen", label: "Listen", to: PAGE_HREF.listen, Icon: Music },
  { segment: "live", label: "Live", to: PAGE_HREF.live, Icon: Mic2 },
  { segment: "collaborations", label: "Collaborations", to: PAGE_HREF.collaborations, Icon: Users },
  { segment: "services", label: "Services", to: PAGE_HREF.services, Icon: Wrench },
  { segment: "contact", label: "Contact", to: PAGE_HREF.contact, Icon: Mail },
];

/** Material App Bar + mobile drawer (static list; no backdrop blur on iOS). */
export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Home starts hidden so the compact logo never flashes before hero visibility sync completes.
  const [showHeaderWordmark, setShowHeaderWordmark] = useState(() => location.pathname !== "/");
  const activeSegment = getNavSegment(location.pathname);
  const openMobileNav = () => setMobileOpen(true);
  const closeMobileNav = () => setMobileOpen(false);

  useEffect(() => {
    let ticking = false;
    const scrollThresholdPx = 40;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const pastThreshold = window.scrollY > scrollThresholdPx;
        setScrolled((prev) => (prev === pastThreshold ? prev : pastThreshold));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    closeMobileNav();
  }, [location.pathname]);

  useLayoutEffect(() => {
    if (location.pathname !== "/") {
      setShowHeaderWordmark(true);
      return;
    }

    setShowHeaderWordmark(false);

    let cancelled = false;
    let observer: IntersectionObserver | null = null;

    const attachObserver = (heroWordmark: HTMLElement) => {
      if (cancelled) return;

      const syncWordmarkVisibility = () => {
        const rect = heroWordmark.getBoundingClientRect();
        // Hidden while any part of the large hero wordmark is currently visible.
        setShowHeaderWordmark(rect.bottom <= 0 || rect.top >= window.innerHeight);
      };

      // Run before paint on mount/update to avoid first-frame flicker.
      syncWordmarkVisibility();

      observer = new IntersectionObserver(
        ([entry]) => {
          // Hide compact header wordmark while the large hero wordmark is visible in the viewport.
          setShowHeaderWordmark(!entry.isIntersecting);
        },
        { threshold: 0.05 },
      );

      observer.observe(heroWordmark);
    };

    const existingHero = document.getElementById(HOME_HERO_WORDMARK_ID) as HTMLElement | null;
    if (existingHero) {
      attachObserver(existingHero);
    } else {
      // If the hero section has not mounted yet, keep compact logo hidden and wait for it.
      const mutationObserver = new MutationObserver(() => {
        const heroWordmark = document.getElementById(HOME_HERO_WORDMARK_ID) as HTMLElement | null;
        if (!heroWordmark) return;
        mutationObserver.disconnect();
        attachObserver(heroWordmark);
      });

      mutationObserver.observe(document.body, { childList: true, subtree: true });

      return () => {
        cancelled = true;
        mutationObserver.disconnect();
        observer?.disconnect();
      };
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [location.pathname]);

  /** Keep weight constant so active state does not shift layout (color-only emphasis). */
  const linkTypography = (active: boolean) => ({
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    fontSize: "0.8rem",
    color: active ? "primary.main" : "text.primary",
  });

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={scrolled ? 3 : 0}
      sx={{
        /* Solid bar only: backdrop blur on scroll is pretty on new GPUs but rough on older Intel graphics while scrolling. */
        bgcolor: scrolled ? "rgba(6, 6, 14, 0.97)" : "transparent",
        borderBottom: scrolled ? 1 : 0,
        borderColor: "divider",
      }}
    >
      <Container maxWidth={false} disableGutters sx={shellContainerSx}>
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 80 }, justifyContent: "space-between" }}>
          <Box
            component={RouterLink}
            to={PAGE_HREF.home}
            aria-label={`${SITE_NAME} home`}
            aria-hidden={!showHeaderWordmark}
            tabIndex={showHeaderWordmark ? 0 : -1}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.25,
              textDecoration: "none",
              color: "text.primary",
              opacity: showHeaderWordmark ? 1 : 0,
              // Keep resting state on the shared shell gutter; only offset while hidden.
              transform: showHeaderWordmark ? "translateX(0)" : { xs: "translateX(-8px)", md: "translateX(-10px)" },
              // On ultra-wide viewports the AppBar shell padding and page content shell resolve slightly differently;
              // this keeps the accent bar locked to the same perceived left gutter as page content.
              "@media (min-width:1312px)": {
                transform: showHeaderWordmark ? "translateX(-16px)" : "translateX(-26px)",
              },
              pointerEvents: showHeaderWordmark ? "auto" : "none",
              transition: "opacity 220ms ease, transform 260ms ease",
            }}
          >
            <Box aria-hidden sx={brandWordmarkAccentSx} />
            <Box component="span" sx={brandWordmarkNavLabelSx}>
              {SITE_NAME}
            </Box>
          </Box>

          <Box
            component="nav"
            aria-label="Main navigation"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 0.25,
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            {navLinks.map((link) => {
              const active = activeSegment === link.segment;
              return (
                <Box
                  key={link.segment}
                  component={RouterLink}
                  to={link.to}
                  aria-current={active ? "page" : undefined}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: active ? "primary.main" : "text.primary",
                    px: 1.25,
                    py: 1,
                    borderRadius: 1,
                    transition: "background-color 0.2s, color 0.2s",
                    "&:hover": {
                      bgcolor: "action.hover",
                      color: "primary.main",
                    },
                    "&:focus-visible": {
                      outline: "2px solid #00e5ff",
                      outlineOffset: 2,
                    },
                  }}
                >
                  <Box component="span" sx={{ ...linkTypography(active), fontSize: "0.82rem" }}>
                    {link.label}
                  </Box>
                </Box>
              );
            })}
          </Box>

          <IconButton
            color="inherit"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="primary-navigation-mobile"
            sx={{
              display: { xs: "inline-flex", md: "none" },
              // Keep trigger inside the shared 16px shell gutter and away from iOS scrollbar affordance.
              mr: { xs: 0.25, sm: 0 },
              "& .MuiSvgIcon-root": { fontSize: "1.36rem" },
            }}
            onClick={() => (mobileOpen ? closeMobileNav() : openMobileNav())}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                if (!mobileOpen) openMobileNav();
              }
            }}
            aria-haspopup="dialog"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </Container>

      {/*
        Mobile drawer.
        - No backdrop-filter: blur — iOS Safari repaints the full viewport under the overlay; blur + slide is a common source of “slow” menus.
        - Static link list (no staggered JS motion) keeps first paint after open cheap.
        - Paper `backgroundImage: "none"` + elevation 0 removes MUI dark-mode elevation tint on black.
      */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={closeMobileNav}
        ModalProps={{
          keepMounted: false,
          // iOS: locking body scroll while a full-bleed hero + fixed AppBar repaints often janks the first drawer open.
          disableScrollLock: true,
        }}
        transitionDuration={{ enter: 0, exit: 90 }}
        PaperProps={{ elevation: 0 }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: { xs: "min(86vw, 360px)" },
            bgcolor: "#000000",
            backgroundImage: "none",
            color: "text.primary",
            borderLeft: "1px solid rgba(255, 255, 255, 0.06)",
            boxShadow: "none",
            display: "flex",
            flexDirection: "column",
            willChange: "transform",
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.82)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: 1.5,
            pt: 1.25,
            pb: 1,
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <IconButton aria-label="Close menu" onClick={closeMobileNav} size="large" sx={{ color: "text.primary" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          component="nav"
          id="primary-navigation-mobile"
          aria-label="Mobile navigation"
          sx={{ flex: 1, px: 1.25, py: 1.5 }}
        >
          <Box
            component="ul"
            sx={{ listStyle: "none", m: 0, p: 0, display: "flex", flexDirection: "column", gap: 0.25 }}
          >
            {navLinks.map((link) => {
              const active = activeSegment === link.segment;
              const Icon = link.Icon;
              return (
                <Box component="li" key={link.segment} sx={{ display: "block" }}>
                  <Box
                    component={RouterLink}
                    to={link.to}
                    aria-current={active ? "page" : undefined}
                    onClick={closeMobileNav}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: 1.5,
                      textDecoration: "none",
                      color: active ? "primary.main" : "text.primary",
                      px: 1.5,
                      py: 1.25,
                      borderRadius: 1.25,
                      textAlign: "right",
                      position: "relative",
                      transition: "background-color 0.18s ease, color 0.18s ease",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.04)" },
                      "&:active": { bgcolor: "rgba(255,255,255,0.06)" },
                      "&:focus-visible": {
                        outline: "2px solid #00e5ff",
                        outlineOffset: 2,
                      },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        ...linkTypography(active),
                        fontSize: "0.95rem",
                      }}
                    >
                      {link.label}
                    </Box>
                    <Box
                      aria-hidden
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 28,
                        height: 28,
                        color: active ? "secondary.main" : "rgba(255, 255, 255, 0.72)",
                        transition: "color 0.18s ease",
                      }}
                    >
                      <Icon size={18} strokeWidth={1.75} />
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}
