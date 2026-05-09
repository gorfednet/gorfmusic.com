import { motion } from "motion/react";
import { siteFonts, pageEyebrowClass, sectionH2Class } from "../styles/typography";
import { useRevealMotion } from "../useRevealMotion";

interface SectionHeadingProps {
  tag: string;
  title: string;
  description?: string;
  id?: string;
}

/** In-page `<h2>` band: same kicker + title scale + lead copy as the rest of the site (always left-aligned). */
export function SectionHeading({ tag, title, description, id }: SectionHeadingProps) {
  const { fadeUp } = useRevealMotion();

  return (
    <motion.div {...fadeUp({ y: 16, duration: 0.5 })} className="text-left">
      <p className={pageEyebrowClass} style={siteFonts.monoLabel}>
        {tag}
      </p>
      <h2 id={id} className={sectionH2Class} style={siteFonts.sectionTitle}>
        {title}
      </h2>
      {description && (
        <p className="m-0 mt-0 max-w-3xl text-left text-[#777] text-[1.02rem] leading-[1.75]">{description}</p>
      )}
    </motion.div>
  );
}
