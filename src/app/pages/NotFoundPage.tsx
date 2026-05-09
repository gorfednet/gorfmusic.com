import { Link } from "react-router";
import { PAGE_HREF } from "../paths";
import { siteFonts } from "../styles/typography";
import { marketingCtaOnImage } from "../styles/uiPatterns";

/** Shown for unknown paths; paired with SiteHead noindex for soft-404 semantics in the SPA. */
export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 text-center">
      <div>
        <div className="mb-6 flex items-center justify-center gap-2" aria-hidden="true">
          <span className="inline-block w-8 h-[2px] bg-gradient-to-r from-[#ff0066] to-transparent rounded-full" />
          <span className="inline-block w-3 h-[2px] bg-[#00e5ff]/40 rounded-full" />
        </div>
        <h1 className="text-6xl text-white mb-4" style={siteFonts.heroWordmark}>
          404
        </h1>
        <p className="text-[#7a7a96] mb-8">No page lives at this URL.</p>
        <Link
          to={PAGE_HREF.home}
          className={`${marketingCtaOnImage} px-6 py-3`}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
