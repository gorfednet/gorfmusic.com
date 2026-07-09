import { motion } from "motion/react";
import {
  Music, Film, Mic2, Headphones, Waves, PenTool, Radio, Repeat, Monitor,
  Gamepad2, Megaphone, Globe, Disc3,
} from "lucide-react";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { PageIntro } from "../components/PageIntro";
import { SectionHeading } from "../components/SectionHeading";
import { contentShellInnerClass, siteFonts } from "../styles/typography";
import {
  gridGapCards,
  gridGapSplit,
  sectionFirstAfterIntroBordered,
  sectionStackedBand,
  stackAfterHeading,
} from "../styles/layoutSections";
import { marketingCardSurface, marketingIconGlyphStatic, marketingIconWellStaticCompact } from "../styles/uiPatterns";
import { useRevealMotion } from "../useRevealMotion";

const studioPortraitImg = "/images/gorf-artist-discogs.jpeg";

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

      <section className={sectionFirstAfterIntroBordered} aria-labelledby="studio-feature-heading">
        <div className={contentShellInnerClass}>
          <div className={`grid grid-cols-1 items-center lg:grid-cols-12 ${gridGapSplit}`}>
            <motion.div
              {...fadeUp({ y: 18, duration: 0.48 })}
              className="lg:col-span-5 xl:col-span-5"
            >
              <ImageWithFallback
                src={studioPortraitImg}
                alt="Gorf in his production studio with synthesizers, gear racks, and vinyl records"
                className="w-full aspect-[4/3] object-cover object-center rounded-2xl"
                loading="lazy"
              />
            </motion.div>

            <motion.div {...fadeUp({ y: 18, duration: 0.48, delay: 0.06 })} className="lg:col-span-7 xl:col-span-7">
              <span className="text-[#00e5ff] uppercase tracking-[0.2em] text-[0.75rem]" style={siteFonts.monoLabel}>
                In the Studio
              </span>
              <h2 id="studio-feature-heading" className="text-3xl sm:text-4xl text-white mt-2 mb-5" style={siteFonts.sectionTitle}>
                Built for Briefs That Need More Than a Loop
              </h2>
              <p className="text-[#999] text-[1.02rem] leading-[1.75] max-w-xl">
                From modular accidents to surgical edits, the work happens in a room full of hardware, software, and reference records — scoring cues, sound design, club masters, and live-ready stems under one roof.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={`${sectionStackedBand} border-b border-[rgba(255,0,102,0.05)]`} aria-labelledby="services-offered-heading">
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