import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { externalLinks } from "@/app/data/externalLinks";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { PageIntro } from "../components/PageIntro";
import { SectionHeading } from "../components/SectionHeading";
import { contentShellInnerClass, siteFonts } from "../styles/typography";
import { gridGapCards, sectionGutterX, sectionPaddingY, stackAfterHeading } from "../styles/layoutSections";
import { marketingCtaOnImageInGroupSm, marketingIconGlyphOnImageCta } from "../styles/uiPatterns";
import { useRevealMotion } from "../useRevealMotion";

const ssatcyImg = "/images/ssatcy.jpg";
const densewareImg = "/images/denseware-collaboration.jpg?v=20260420-2";
const dogIsBlueImg = "/images/dog-is-blue-2018.jpg";

type CollabProject = {
  name: string;
  type: string;
  image: string;
  description: string;
  url: string;
  imageZoom?: boolean;
  imagePosition?: string;
};

const collaborations: CollabProject[] = [
  {
    name: "SSATCY",
    type: "Collaborative Project",
    image: ssatcyImg,
    description:
      "Sunshine Sneeze and the Contagious Yawn grew out of late nights behind Toronto agency monitors in 2005; the music began in 2010 and leans on breakbeat contrast between hip-hop swing and jungle pressure.",
    url: externalLinks.ssatcy,
  },
  {
    name: "Denseware",
    type: "Collaborative Project",
    image: densewareImg,
    imagePosition: "center 44%",
    description:
      "Started in 2006, Denseware is the hardware/software dialogue: melodic IDM and experimental breakbeat atmospheres shaped between modular accidents and surgical DAW edits.",
    url: externalLinks.denseware,
  },
  {
    name: "Dog Is Blue",
    type: "Remix Project",
    image: dogIsBlueImg,
    description:
      "Gorf and Paul from Dog Is Blue met in late 2004 over a shared habit of mangling guitar tones in software until they bent into something new. Remix work still turns up when a song needs extra circuitry.",
    url: "https://dogisblue.com/",
  },
];

/** Collaboration archive page: side-project identities and listening destinations. */
export function CollaborationsPage() {
  const { fadeUp } = useRevealMotion();

  return (
    <div className="min-h-screen">
      <PageIntro
        eyebrow="Side Projects"
        title="Collaborations"
        titleId="collaborations-page-title"
        lead="Long-running collaborations and musical partnerships worth mentioning."
      />

      <section className={`${sectionGutterX} ${sectionPaddingY}`} aria-labelledby="collabs-heading">
        <div className={contentShellInnerClass}>
          <SectionHeading tag="Archive" title="Projects" id="collabs-heading" />
          <div className={`${stackAfterHeading} grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ${gridGapCards}`}>
            {collaborations.map((project, i) => (
              <motion.article
                key={project.name}
                {...fadeUp({ y: 24, duration: 0.5, delay: i * 0.08 })}
                className="h-full rounded-3xl overflow-hidden border border-[rgba(255,0,102,0.16)] bg-[#0a0a16] transition-colors duration-200 hover:border-[rgba(255,0,102,0.42)] hover:bg-[#0d0d1a]"
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full min-h-[44px] flex-col text-inherit no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00e5ff]"
                >
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={`${project.name} artwork`}
                      className={`w-full aspect-[4/3] min-h-[220px] object-cover transition-transform duration-500 motion-reduce:transition-none ${project.imageZoom ? "scale-[1.1] motion-reduce:scale-100 origin-center" : "motion-safe:group-hover:scale-[1.02]"}`}
                      style={{ objectPosition: project.imagePosition ?? "center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16]/25 to-transparent" aria-hidden />
                  </div>
                  <div className="flex grow flex-col p-7 md:p-8">
                    <span className="text-[#00e5ff] text-[0.7rem] uppercase tracking-[0.2em]" style={siteFonts.monoLabel}>
                      {project.type}
                    </span>
                    <h3 className="text-3xl sm:text-4xl text-white mt-2 mb-5" style={siteFonts.sectionTitle}>
                      {project.name}
                    </h3>
                    <p className="text-[#c4c4c4] text-[0.95rem] leading-relaxed mb-8 grow">{project.description}</p>
                    <span className={marketingCtaOnImageInGroupSm}>
                      <ExternalLink size={11} className={marketingIconGlyphOnImageCta} aria-hidden="true" /> Visit project
                    </span>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
