import { motion } from "motion/react";
import { Play, Film, ArrowRight } from "lucide-react";
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
                <Play size={17} className={marketingIconGlyphInLink} aria-hidden="true" />
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
                <Film size={17} className={marketingIconGlyphInLink} aria-hidden="true" />
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
