import { Link } from "react-router";
import { PAGE_HREF } from "../paths";
import { motion } from "motion/react";
import { Play, Calendar } from "lucide-react";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { siteFonts } from "../styles/typography";
import { HOME_HERO_WORDMARK_ID, SITE_NAME, SITE_ROLE_SHORT } from "../content/siteIdentity";
import {
  marketingCtaOnImageHero,
  marketingCtaOnImageInGroup,
  marketingIconGlyphOnImageCta,
} from "../styles/uiPatterns";
import {
  gridGapSplit,
  sectionGutterX,
  sectionPaddingY,
  sectionPaddingYCompact,
} from "../styles/layoutSections";
import { useRevealMotion } from "../useRevealMotion";

/** Hero + upcoming card backgrounds (same-origin under `public/images/`; avoids corporate firewalls blocking Unsplash). */
const heroImg = "/images/home-hero-concert-bg.jpg";
/** Primary artist photo from Discogs (stored under `public/images/`). */
const artistPortraitImg = "/images/gorf-artist-discogs.jpeg";
const crowdImg = "/images/home-upcoming-club-bg.jpg";

const stats = [
  { value: "20+", label: "Years" },
  { value: "40+", label: "Live Shows" },
  { value: "7+", label: "Labels" },
  { value: "5", label: "Upcoming Releases" },
];

/** Home: hero, stats, bio, next show CTA. */
export function HomePage() {
  const { reduced, fadeUp } = useRevealMotion();

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden" aria-label="Hero">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImg}
            alt=""
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06060e]/70 via-[#06060e]/50 to-[#06060e]" />
          {/*
            Sharp overlapping circles (no blur). Mobile: teal left (smaller), pink right (larger, higher).
            md+: swap horizontal sides only — pink left, teal right — same sizes / vertical rhythm as before.
          */}
          <div
            className="pointer-events-none absolute top-1/3 left-1/3 h-[min(75vw,380px)] w-[min(75vw,380px)] max-w-[75vw] rounded-full bg-[#00e5ff]/16 motion-reduce:opacity-40 md:left-auto md:right-[24%] md:top-[24%] md:h-[min(50vw,34rem)] md:w-[min(50vw,34rem)] md:max-w-[min(50vw,34rem)] lg:right-[20%] lg:top-[18%] lg:h-[min(48vw,40rem)] lg:w-[min(48vw,40rem)] lg:max-w-[min(48vw,40rem)] xl:right-[16%] xl:top-[12%] xl:h-[min(46vw,46rem)] xl:w-[min(46vw,46rem)] xl:max-w-[min(46vw,46rem)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute top-1/4 right-1/4 h-[min(90vw,520px)] w-[min(90vw,520px)] max-w-[90vw] rounded-full bg-[#ff0066]/18 motion-reduce:opacity-40 md:right-auto md:left-[16%] md:top-[12%] md:h-[min(60vw,44rem)] md:w-[min(60vw,44rem)] md:max-w-[min(60vw,44rem)] lg:left-[12%] lg:top-[8%] lg:h-[min(58vw,52rem)] lg:w-[min(58vw,52rem)] lg:max-w-[min(58vw,52rem)] xl:left-[8%] xl:top-[5%] xl:h-[min(56vw,56rem)] xl:w-[min(56vw,56rem)] xl:max-w-[min(56vw,56rem)]"
            aria-hidden="true"
          />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#06060e] to-transparent" aria-hidden="true" />
        </div>

        <div className={`relative z-10 mx-auto max-w-5xl text-center ${sectionGutterX}`}>
          {/* Decorative line */}
          <motion.div
            initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduced ? 0 : 1.2, ease: "easeOut" }}
            className="mx-auto mb-8 w-24 h-1 bg-gradient-to-r from-[#ff0066] via-[#b44aff] to-[#00e5ff] origin-center"
            aria-hidden="true"
          />

          <motion.h1
            id={HOME_HERO_WORDMARK_ID}
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduced ? 0 : 0.2, duration: reduced ? 0 : 0.9 }}
            className="text-7xl sm:text-8xl md:text-[8.5rem] lg:text-[11rem] tracking-[0.12em] sm:tracking-[0.16em] md:tracking-[0.2em] lg:tracking-[0.24em] uppercase mb-4 leading-none text-white"
            style={siteFonts.heroWordmark}
          >
            {SITE_NAME}
          </motion.h1>

          {/* Tagline with horizontal rules */}
          <motion.div
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduced ? 0 : 0.6, duration: reduced ? 0 : 0.7 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <span className="hidden sm:block h-[1px] w-12 bg-gradient-to-r from-transparent to-white" aria-hidden="true" />
            <p className="text-white text-[0.8rem] sm:text-[0.85rem] uppercase tracking-[0.3em]">
              {SITE_ROLE_SHORT} &middot; EST 2003
            </p>
            <span className="hidden sm:block h-[1px] w-12 bg-gradient-to-l from-transparent to-white" aria-hidden="true" />
          </motion.div>

          <motion.div
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduced ? 0 : 0.85, duration: reduced ? 0 : 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to={PAGE_HREF.listen} className={marketingCtaOnImageHero}>
              <Play size={18} className={marketingIconGlyphOnImageCta} aria-hidden="true" /> Explore Discography
            </Link>
            <Link to={PAGE_HREF.live} className={marketingCtaOnImageHero}>
              <Calendar size={18} className={marketingIconGlyphOnImageCta} aria-hidden="true" /> Upcoming Shows
            </Link>
          </motion.div>
        </div>

        {reduced ? (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-40" aria-hidden="true">
            <div className="w-5 h-9 border border-white/15 rounded-full flex justify-center pt-2">
              <div className="w-0.5 h-2 bg-[#ff0066] rounded-full" />
            </div>
          </div>
        ) : (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 home-scroll-hint" aria-hidden="true">
            <div className="w-5 h-9 border border-white/15 rounded-full flex justify-center pt-2">
              <div className="w-0.5 h-2 bg-[#ff0066] rounded-full" />
            </div>
          </div>
        )}
      </section>

      {/* Stats */}
      <section
        className={`${sectionGutterX} ${sectionPaddingYCompact} border-b border-[rgba(255,0,102,0.05)]`}
        aria-label="Career highlights"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                {...fadeUp({ delay: index * 0.06, y: 12, duration: 0.34 })}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl text-[#00e5ff]" style={siteFonts.monoLabel}>{stat.value}</div>
                <div className="text-[#555] text-[0.75rem] uppercase tracking-[0.15em] mt-1" style={siteFonts.monoLabel}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className={`${sectionGutterX} ${sectionPaddingY}`} aria-labelledby="intro-heading">
        <div className="max-w-7xl mx-auto">
          <div className={`grid grid-cols-1 items-center lg:grid-cols-2 ${gridGapSplit}`}>
            <motion.div {...fadeUp({ y: 14, duration: 0.34 })} className="order-2 lg:order-1">
              <span className="text-[#00e5ff] uppercase tracking-[0.2em] text-[0.75rem]" style={siteFonts.monoLabel}>The Artist</span>
              <h2 id="intro-heading" className="text-3xl sm:text-4xl text-white mt-2 mb-6" style={siteFonts.sectionTitle}>
                Two Decades in the Mix
              </h2>
              <div className="space-y-5 text-[#999] text-[1.02rem] leading-[1.75]">
                <p>
                  Gorf's catalog spans the gamut including both solo and collaborative releases, remixes, advertising placements, soundtrack scoring and cinematic effects.
                </p>
                <p>
                  His solo work as Gorf moves through downtempo, melodic breakbeats, and chill electronica, drawing on a wide reference field of IDM, ambient, trip hop and even tapping into drum and bass, jungle, big beat, and art-rock-leaning electronics. He does his own thing while being transparent with his inspirations. Live sets either rebuild tracks from stems with improvised composition and effects, or go full{" "}
                  <a
                    href="https://en.wikipedia.org/wiki/Live_PA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ff0066] hover:text-white transition-colors cursor-pointer underline underline-offset-2 decoration-[#ff0066]/35 hover:decoration-white/30"
                  >
                    Live PA
                  </a>
                  .
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUp({ y: 14, duration: 0.34, delay: 0.06 })} className="order-1 lg:order-2 relative">
              <ImageWithFallback
                src={artistPortraitImg}
                alt="Gorf in his production studio with synthesizers, gear racks, and vinyl records"
                className="w-full aspect-[4/3] object-cover rounded-2xl"
                loading="lazy"
              />
              <div
                className="absolute -bottom-3 -left-3 w-40 h-40 bg-[#ff0066]/12 rounded-full blur-[68px] motion-reduce:blur-none motion-reduce:opacity-40"
                aria-hidden="true"
              />
              <div
                className="absolute -top-3 -right-3 w-36 h-36 bg-[#00e5ff]/10 rounded-full blur-[60px] motion-reduce:blur-none motion-reduce:opacity-35"
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Next show */}
      <section className={`${sectionGutterX} ${sectionPaddingY}`} aria-label="Next live show">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp({ y: 14, duration: 0.36 })} className="relative rounded-3xl overflow-hidden">
            <Link
              to={PAGE_HREF.live}
              aria-label="More Noise Please, May 28 2026, BSMT254 Toronto. View live schedule."
              className="group relative block min-h-[320px] rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00e5ff]"
            >
              <ImageWithFallback
                src={crowdImg}
                alt=""
                className="w-full aspect-[21/9] min-h-[320px] object-cover transition-opacity duration-300 motion-safe:group-hover:opacity-95 motion-reduce:transition-none"
                loading="lazy"
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#06060e]/92 via-[#06060e]/60 to-transparent" aria-hidden />
              <div className="absolute inset-0 flex items-center">
                <div className="px-8 sm:px-12 md:px-16 max-w-xl">
                  <span className="text-[#00e5ff] uppercase tracking-[0.2em] text-[0.7rem]" style={siteFonts.monoLabel}>Next Show</span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl text-white mt-2 mb-2" style={siteFonts.sectionTitle}>
                    More Noise Please!
                  </h2>
                  <p className="text-[#bbb] text-[0.9rem] mb-1">BSMT254, Toronto, Ontario, Canada</p>
                  <p className="text-[#777] text-[0.85rem] mb-6">May 28, 2026</p>
                  <span className={marketingCtaOnImageInGroup}>
                    <Calendar size={16} className={marketingIconGlyphOnImageCta} aria-hidden="true" /> View All Shows
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}