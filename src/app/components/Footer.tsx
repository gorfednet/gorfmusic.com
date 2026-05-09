import { Link as RouterLink } from "react-router";
import { PAGE_HREF } from "../paths";
import { externalLinks } from "../data/externalLinks";
import { LISTEN_PLATFORMS } from "../data/listenPlatforms";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { MapPin } from "lucide-react";
import { shellContainerSx } from "../styles/contentShell";
import { brandWordmarkAccentSx, brandWordmarkFooterLabelSx } from "../styles/brandWordmark";
import { SITE_LOCATION, SITE_NAME } from "../content/siteIdentity";

const siteLinks = [
  { label: "Home", to: PAGE_HREF.home },
  { label: "Listen", to: PAGE_HREF.listen },
  { label: "Live", to: PAGE_HREF.live },
  { label: "Collaborations", to: PAGE_HREF.collaborations },
  { label: "Services", to: PAGE_HREF.services },
  { label: "Contact", to: PAGE_HREF.contact },
];
const listenLinks = LISTEN_PLATFORMS.map((platform) => ({ id: platform.id, label: platform.label, href: platform.href }));

type FooterColumnLink = {
  id: string;
  label: string;
  to?: string;
  href?: string;
};

const sectionTitleSx = {
  color: "text.secondary",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  fontSize: "0.7rem",
  fontFamily: '"JetBrains Mono", monospace',
  fontWeight: 500,
  mb: 2,
};

/** Listen / Navigate column titles — site teal. */
const footerColumnHeadingSx = {
  ...sectionTitleSx,
  color: "#00e5ff",
};

type FooterLinkColumnProps = {
  headingId: string;
  title: string;
  links: FooterColumnLink[];
  align?: "left" | "right" | { xs: "left" | "right"; sm: "left" | "right"; lg?: "left" | "right" };
};

/**
 * Shared footer column renderer for both internal route links and external platform links.
 * Keeps spacing/typography aligned while allowing per-column text alignment.
 */
function FooterLinkColumn({ headingId, title, links, align = "left" }: FooterLinkColumnProps) {
  return (
    <Box component="nav" aria-labelledby={headingId} sx={{ minWidth: 0, maxWidth: { lg: "9.5rem" }, textAlign: align }}>
      <Typography id={headingId} component="h2" sx={{ ...footerColumnHeadingSx, textAlign: align }}>
        {title}
      </Typography>
      <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none", textAlign: align }}>
        {links.map((link) => (
          <Box component="li" key={link.id} sx={{ mb: 1.25 }}>
            {link.to ? (
              <Link component={RouterLink} to={link.to} color="text.secondary" variant="body2" underline="hover">
                {link.label}
              </Link>
            ) : (
              <Link href={link.href} target="_blank" rel="noopener noreferrer" color="text.secondary" variant="body2" underline="hover">
                {link.label}
              </Link>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}



/** Material list pattern: typographic regions + structured link groups. */
export function Footer() {
  return (
    <Box
      component="footer"
      role="contentinfo"
      sx={{
        borderTop: 1,
        borderColor: "divider",
        bgcolor: "#040408",
        py: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth={false} disableGutters sx={shellContainerSx}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "flex-start" },
            justifyContent: "space-between",
            gap: { xs: 5, sm: 4, md: 4, lg: 6 },
          }}
        >
          <Box sx={{ minWidth: 0, maxWidth: { xs: "100%", sm: 280, lg: 300 }, flexShrink: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 2 }}>
              <Box aria-hidden sx={brandWordmarkAccentSx} />
              <Typography component="span" variant="subtitle2" sx={brandWordmarkFooterLabelSx}>
                {SITE_NAME}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320, lineHeight: 1.7 }}>
              Producer, Composer &amp;{" "}
              <Link
                href="https://en.wikipedia.org/wiki/Live_PA"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                underline="hover"
                sx={{ textDecorationColor: "rgba(255,0,102,0.4)" }}
              >
                Live PA
              </Link>
              <br />
              <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.6 }}>
                <MapPin size={14} strokeWidth={1.9} aria-hidden />
                {SITE_LOCATION}.
              </Box>
            </Typography>

          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              alignItems: "flex-start",
              alignSelf: { xs: "stretch", sm: "flex-start" },
              columnGap: { xs: 3, sm: 3.5, lg: 5 },
              width: { xs: "100%", sm: "auto" },
              maxWidth: { xs: "100%", sm: "min(100%, calc(2 * 9.5rem + 1 * 2.25rem))" },
              ml: { sm: "auto" },
              justifyContent: { xs: "space-between", sm: "flex-end" },
            }}
          >
            <FooterLinkColumn
              headingId="footer-listen-heading"
              title="Listen"
              links={listenLinks}
              align={{ xs: "left", sm: "right" }}
            />
            <FooterLinkColumn
              headingId="footer-nav-heading"
              title="Navigate"
              links={siteLinks.map((link) => ({ id: link.label, label: link.label, to: link.to }))}
              align="right"
            />
          </Box>
        </Box>

        <Box
          sx={{
            mt: 8,
            pt: 4,
            borderTop: 1,
            borderColor: "rgba(255,0,102,0.04)",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="caption" color="text.disabled">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </Typography>
          <Box
            component="span"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: { xs: "flex-start", sm: "center" },
              gap: { xs: 1.5, sm: 2 },
            }}
          >
            <Link href={externalLinks.discogsArtist} target="_blank" rel="noopener noreferrer" variant="caption" color="text.disabled" underline="hover">
              Discogs
            </Link>
            <Typography component="span" variant="caption" color="text.disabled" sx={{ userSelect: "none" }} aria-hidden>
              ·
            </Typography>
            <Link href="https://gorfed.net" target="_blank" rel="noopener noreferrer" variant="caption" color="text.disabled" underline="hover">
              gorfed.net
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
