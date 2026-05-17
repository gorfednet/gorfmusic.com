import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { externalLinks } from "@/app/data/externalLinks";
import { PageIntro } from "../components/PageIntro";
import { SectionHeading } from "../components/SectionHeading";
import { StreamingPlatformRow } from "../components/StreamingPlatformRow";
import { contentShellInnerClass, siteFonts } from "../styles/typography";
import {
  gridGapCards,
  sectionFirstAfterIntroBordered,
  sectionStackedBand,
  stackAfterHeading,
} from "../styles/layoutSections";
import { marketingCardAsLink, textLinkPlain, focusRing } from "../styles/uiPatterns";
import { useRevealMotion } from "../useRevealMotion";

const labels = [
  { name: "Here's My Card Records", desc: "Underground breakcore label from Toronto", href: externalLinks.labels.heresMyCard },
  { name: "Bitkins Electronic Music", desc: "A label from the creators of Radio Reddit", href: externalLinks.labels.bitkins },
  { name: "FaceKick Records", desc: "The label of garage-folk duo Dog is Blue", href: externalLinks.labels.facekick },
  { name: "Vague Terrain", desc: "Neil Wiernik & Greg J. Smith's label", href: externalLinks.labels.vagueTerrain },
  { name: "Black Pixel Records", desc: "Label run by tech legend ghettocyb.org", href: externalLinks.labels.blackPixel },
  { name: "Peace Off Records", desc: "Prolific breakcore label from France", href: externalLinks.labels.peaceOff },
  { name: "Anal0g.org", desc: "Internet Relay Chat (IRC) netlabel", href: externalLinks.labels.anal0g },
];

/**
 * Discography: support-first intro, platform row, then label grid.
 */
export function MusicPage() {
  const { fadeUp } = useRevealMotion();

  return (
    <div className="min-h-screen">
      <PageIntro
        eyebrow="Discography"
        title="Listen"
        titleId="music-page-title"
        lead={
          <p>
            Direct sales and artist-first stores still carry most of the weight for independent work. His catalog is on the major streaming services and other listening options. The row below opens each platform or storefront.
          </p>
        }
      />

      <section className={sectionFirstAfterIntroBordered} aria-label="Streaming platforms and stores">
        <div className={contentShellInnerClass}>
          <StreamingPlatformRow />
        </div>
      </section>

      <section className={sectionStackedBand} aria-labelledby="labels-heading">
        <div className={contentShellInnerClass}>
          <SectionHeading
            tag="Record Labels"
            title="Released On"
            description="Releases & appearances on several independent labels."
            id="labels-heading"
          />

          <div className={`${stackAfterHeading} grid w-full grid-cols-1 ${gridGapCards} sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}>
            {labels.map((label, i) => (
              <motion.div
                key={label.name}
                {...fadeUp({ delay: i * 0.05, y: 14, duration: 0.42 })}
                className="h-full min-h-[44px] min-w-0"
              >
                <a
                  href={label.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-full min-h-[44px] w-full min-w-0 flex-col p-5 ${marketingCardAsLink}`}
                >
                  <h3
                    className="text-[0.9rem] text-[#ff0066] transition-colors group-hover:text-white"
                    style={siteFonts.subsectionTitle}
                  >
                    {label.name}
                  </h3>
                  <p className="text-[#444] text-[0.8rem] mt-1 grow">{label.desc}</p>
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp({ y: 8, duration: 0.45 })} className={`${stackAfterHeading} text-left`}>
            <a
              href={externalLinks.discogsArtist}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-2 text-[0.9rem] ${textLinkPlain} ${focusRing}`}
            >
              <ExternalLink size={13} className="shrink-0" aria-hidden="true" /> View Full Discography on Discogs
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
