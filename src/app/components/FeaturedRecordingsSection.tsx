import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { SVGProps } from "react";
import { externalLinks } from "@/app/data/externalLinks";
import { SectionHeading } from "./SectionHeading";
import { contentShellInnerClass, siteFonts } from "../styles/typography";
import { gridGapCards, sectionPaddingYBorderBottom, stackAfterHeading } from "../styles/layoutSections";
import {
  marketingArchiveLinkCard,
  marketingFooterLinkPink,
  marketingIconGlyphInLink,
  marketingIconWellLinkCompact,
} from "../styles/uiPatterns";
import { useRevealMotion } from "../useRevealMotion";

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

/** SoundCloud 7-bar cloudmark — sourced from Simple Icons (simpleicons.org/soundcloud). */
function IconSoundCloud({ size, width, height, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? width}
      height={size ?? height}
      {...props}
    >
      <path
        fill="currentColor"
        d="M23.999 14.165c-.052 1.796-1.612 3.169-3.4 3.169h-8.18a.68.68 0 0 1-.675-.683V7.862a.747.747 0 0 1 .452-.724s.75-.513 2.333-.513a5.364 5.364 0 0 1 2.763.755 5.433 5.433 0 0 1 2.57 3.54c.282-.08.574-.121.868-.12.884 0 1.73.358 2.347.992s.948 1.49.922 2.373ZM10.721 8.421c.247 2.98.427 5.697 0 8.672a.264.264 0 0 1-.53 0c-.395-2.946-.22-5.718 0-8.672a.264.264 0 0 1 .53 0ZM9.072 9.448c.285 2.659.37 4.986-.006 7.655a.277.277 0 0 1-.55 0c-.331-2.63-.256-5.02 0-7.655a.277.277 0 0 1 .556 0Zm-1.663-.257c.27 2.726.39 5.171 0 7.904a.266.266 0 0 1-.532 0c-.38-2.69-.257-5.21 0-7.904a.266.266 0 0 1 .532 0Zm-1.647.77a26.108 26.108 0 0 1-.008 7.147.272.272 0 0 1-.542 0 27.955 27.955 0 0 1 0-7.147.275.275 0 0 1 .55 0Zm-1.67 1.769c.421 1.865.228 3.5-.029 5.388a.257.257 0 0 1-.514 0c-.21-1.858-.398-3.549 0-5.389a.272.272 0 0 1 .543 0Zm-1.655-.273c.388 1.897.26 3.508-.01 5.412-.026.28-.514.283-.54 0-.244-1.878-.347-3.54-.01-5.412a.283.283 0 0 1 .56 0Zm-1.668.911c.4 1.268.257 2.292-.026 3.572a.257.257 0 0 1-.514 0c-.241-1.262-.354-2.312-.023-3.572a.283.283 0 0 1 .563 0Z"
      />
    </svg>
  );
}

/** YouTube mark (video) — sourced from Simple Icons (simpleicons.org/youtube). */
function IconYouTube({ size, width, height, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? width}
      height={size ?? height}
      {...props}
    >
      <path
        fill="currentColor"
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
      />
    </svg>
  );
}

type Props = {
  id?: string;
  /** SectionHeading `title` (escaped ampersands as needed). */
  title?: string;
  description?: string;
  /** Merged onto the outer `<section>` (e.g. borders / vertical rhythm between Live blocks). */
  sectionClassName?: string;
};

/**
 * Two archive cards: Juncture Music (SoundCloud) and self-hosted PA (YouTube).
 * Used on the Live page; optional `sectionClassName` for spacing when stacked with other sections.
 */
export function FeaturedRecordingsSection({
  id = "recordings-heading",
  title = "Listen & Watch",
  description = "Two archived sets available to stream.",
  sectionClassName,
}: Props) {
  const { fadeUp } = useRevealMotion();

  return (
    <section
      className={sectionClassName ?? sectionPaddingYBorderBottom}
      aria-labelledby={id}
    >
      <div className={contentShellInnerClass}>
        <SectionHeading tag="Featured Recordings" title={title} description={description} id={id} />
        <div className={`${stackAfterHeading} grid grid-cols-1 ${gridGapCards} md:grid-cols-2 md:items-stretch`}>
          <motion.a
            href={externalLinks.junctureLivePa}
            target="_blank"
            rel="noopener noreferrer"
            {...fadeUp({ y: 16, duration: 0.45 })}
            className={marketingArchiveLinkCard}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className={marketingIconWellLinkCompact}>
                <IconSoundCloud size={17} className={marketingIconGlyphInLink} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-white" style={siteFonts.subsectionTitle}>
                  Live PA on Juncture Music
                </h3>
                <p className="text-[#555] text-[0.75rem]">March 19, 2021</p>
              </div>
            </div>
            <p className="mb-4 grow text-[0.87rem] leading-relaxed text-[#666]">
              Juncture Music hosted an all-hardware live public address from the studio.
            </p>
            <span className={marketingFooterLinkPink}>
              <ArrowRight size={13} aria-hidden="true" /> Listen on SoundCloud
            </span>
          </motion.a>

          <motion.a
            href={externalLinks.youtubeLivePa}
            target="_blank"
            rel="noopener noreferrer"
            {...fadeUp({ y: 16, duration: 0.45, delay: 0.08 })}
            className={marketingArchiveLinkCard}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className={marketingIconWellLinkCompact}>
                <IconYouTube size={17} className={marketingIconGlyphInLink} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-white" style={siteFonts.subsectionTitle}>
                  Self-Hosted Live PA
                </h3>
                <p className="text-[#555] text-[0.75rem]">August 23, 2020</p>
              </div>
            </div>
            <p className="mb-4 grow text-[0.87rem] leading-relaxed text-[#666]">
              A second all-hardware live public address from the same room, this time with picture.
            </p>
            <span className={marketingFooterLinkPink}>
              <ArrowRight size={13} aria-hidden="true" /> Watch on YouTube
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
