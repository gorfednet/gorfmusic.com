import type { ReactNode } from "react";
import {
  siteFonts,
  pageIntroSectionClass,
  contentShellInnerClass,
  pageEyebrowClass,
  pageH1Class,
  pageLeadWrapClass,
} from "../styles/typography";

export type PageIntroProps = {
  eyebrow: string;
  title: string;
  /** Optional `id` on `<h1>` for skip links / `aria-labelledby`. */
  titleId?: string;
  /** Lead copy (plain string or JSX with links). */
  lead?: ReactNode;
};

/**
 * Shared page hero: semantic `<header>`, mono kicker, `<h1>`, and optional lead block.
 * Keeps typography and horizontal alignment consistent across Music, Live, Contact, etc.
 */
export function PageIntro({ eyebrow, title, titleId, lead }: PageIntroProps) {
  return (
    <header className={pageIntroSectionClass}>
      <div className={contentShellInnerClass}>
        <div className="page-intro-enter">
          <p className={pageEyebrowClass} style={siteFonts.monoLabel}>
            {eyebrow}
          </p>
          <h1 id={titleId} className={pageH1Class} style={siteFonts.sectionTitle}>
            {title}
          </h1>
          {lead != null && lead !== false && (
            <div className={`${pageLeadWrapClass} space-y-4`}>
              {typeof lead === "string" ? <p>{lead}</p> : lead}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
