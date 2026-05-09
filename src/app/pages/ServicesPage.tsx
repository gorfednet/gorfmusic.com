import { motion } from "motion/react";
import {
  Music, Film, Mic2, Headphones, Waves, PenTool, Radio, Repeat, Monitor,
  Gamepad2, Megaphone, Globe, Disc3,
} from "lucide-react";
import { PageIntro } from "../components/PageIntro";
import { SectionHeading } from "../components/SectionHeading";
import { contentShellInnerClass, siteFonts } from "../styles/typography";
import {
  gridGapCards,
  sectionFirstAfterIntroBordered,
  sectionStackedBand,
  stackAfterHeading,
} from "../styles/layoutSections";
import { marketingCardSurface, marketingIconGlyphStatic, marketingIconWellStaticCompact } from "../styles/uiPatterns";
import { useRevealMotion } from "../useRevealMotion";

const services = [
  { icon: Music, title: "Original Composition", desc: "Brief-led cues from hush to peak time, delivered ready for picture or stage." },
  { icon: Film, title: "Film Scoring", desc: "Scores that lock to cut, mood, and tempo without fighting the dialogue." },
  { icon: Waves, title: "Sound Design", desc: "Textures, impacts, and spaces that read in headphones and on a dub stage." },
  { icon: Mic2, title: "Foley", desc: "Custom passes and field grabs when the library track will not cut it." },
  { icon: Headphones, title: "Mixing & Mastering", desc: "Stereo polish, level rides, and masters that still move on club systems." },
  { icon: Repeat, title: "Remixing", desc: "Club and radio versions with a producer ear for groove and low end." },
  { icon: PenTool, title: "Ghost Writing", desc: "Tracks and beds for credited clients, on schedule, under NDA when required." },
  { icon: Radio, title: "Live Performance & DJ Sets", desc: "Live PA with hardware on stage, or DJ sets when the room wants records, not stems." },
  { icon: Monitor, title: "Music Production", desc: "End to end production from first loop to final bounce." },
];

const placements = [
  { icon: Film, title: "Film & Television", desc: "Scores, themes, and music supervision for motion picture and broadcast." },
  { icon: Gamepad2, title: "Video Games", desc: "Interactive and adaptive music systems for games across all platforms." },
  { icon: Megaphone, title: "Advertising & Branded Content", desc: "Sonic branding, commercial music, and audio identity for campaigns." },
  { icon: Globe, title: "Web & Mobile Projects", desc: "UI sounds, app soundscapes, and interactive audio for digital products." },
  { icon: Disc3, title: "Independent Releases", desc: "Self-released and label-distributed electronic music across all formats." },
];

/** Service grid and placement tiles (same card pattern as the grid above). */
export function ServicesPage() {
  const { fadeUp } = useRevealMotion();

  return (
    <div className="min-h-screen">
      <PageIntro
        eyebrow="For Hire"
        title="Services"
        titleId="services-page-title"
        lead="More than two decades in electronic production and sound design working on small films, video games, brand spots, club systems, and the occasional festival slot."
      />

      <section className={sectionFirstAfterIntroBordered} aria-labelledby="services-offered-heading">
        <div className={contentShellInnerClass}>
          <h2 id="services-offered-heading" className="sr-only">
            Service offerings
          </h2>
          <div className={`${stackAfterHeading} grid grid-cols-1 ${gridGapCards} sm:grid-cols-2 lg:grid-cols-3`}>
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                {...fadeUp({ y: 16, duration: 0.45, delay: i * 0.05 })}
                className={`group p-6 sm:p-7 ${marketingCardSurface}`}
              >
                <div className="flex items-center gap-3 mb-3 min-w-0">
                  <div className={marketingIconWellStaticCompact}>
                    <s.icon size={18} className={marketingIconGlyphStatic} aria-hidden="true" />
                  </div>
                  <h3 className="text-white text-[0.95rem] m-0 leading-snug min-w-0" style={siteFonts.subsectionTitle}>{s.title}</h3>
                </div>
                <p className="text-[#666] text-[0.87rem] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionStackedBand} aria-labelledby="placements-heading">
        <div className={contentShellInnerClass}>
          <SectionHeading
            tag="Placements"
            title="Where the Music Lives"
            description="Tracks and cues from Gorf show up on screens, stages, and installs. The contact form is open for briefs when the job needs low end that still works on a club stack."
            id="placements-heading"
          />
          <div className={`${stackAfterHeading} grid grid-cols-1 ${gridGapCards} sm:grid-cols-2 lg:grid-cols-3`}>
            {placements.map((placement, index) => (
              <motion.div
                key={placement.title}
                {...fadeUp({ y: 16, duration: 0.45, delay: index * 0.05 })}
                className={`group flex h-full flex-col p-6 sm:p-7 ${marketingCardSurface}`}
              >
                <div className="flex items-center gap-3 mb-3 min-w-0">
                  <div className={marketingIconWellStaticCompact}>
                    <placement.icon size={18} className={marketingIconGlyphStatic} aria-hidden="true" />
                  </div>
                  <h3 className="text-white text-[0.95rem] m-0 leading-snug min-w-0" style={siteFonts.subsectionTitle}>
                    {placement.title}
                  </h3>
                </div>
                <p className="text-[#666] text-[0.87rem] leading-relaxed grow">{placement.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}