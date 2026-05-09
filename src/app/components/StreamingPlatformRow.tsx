import type { ComponentType, SVGProps } from "react";
import { Music, Youtube } from "lucide-react";
import { LISTEN_PLATFORMS, type ListenPlatformId } from "@/app/data/listenPlatforms";
import { marketingIconGlyphInLink, marketingIconWellLinkPlatform, marketingPlatformTile } from "@/app/styles/uiPatterns";

const platformIcons: Record<ListenPlatformId, ComponentType<SVGProps<SVGSVGElement>>> = {
  bandcamp: IconBandcamp,
  subvert: IconSubvert,
  spotify: IconSpotify,
  appleMusic: IconAppleMusicTile,
  youtubeMusic: IconYouTube,
};

/** Full-width row of platform CTAs — shared marketing card + cyan icon wells. */
export function StreamingPlatformRow() {
  return (
    <ul className="m-0 grid w-full list-none grid-cols-2 gap-3 p-0 md:grid-cols-3 lg:grid-cols-5 md:gap-4">
      {LISTEN_PLATFORMS.map(({ id, label, href }) => {
        const Icon = platformIcons[id];
        return (
          <li key={id} className="flex min-h-[5.5rem] md:min-h-[6.25rem]">
            <a href={href} target="_blank" rel="noopener noreferrer" className={marketingPlatformTile}>
              <span className={marketingIconWellLinkPlatform}>
                <Icon className={`h-7 w-7 shrink-0 md:h-8 md:w-8 ${marketingIconGlyphInLink}`} aria-hidden />
              </span>
              <span className="text-center text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[#ff0066] transition-colors group-hover:text-white md:text-[0.8rem] md:tracking-[0.12em]">
                {label}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function IconBandcamp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="M0 18.75l7.437-13.5h9.126l-7.438 13.5H0z" />
    </svg>
  );
}

function IconSpotify(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.261 11.28-1.021 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"
      />
    </svg>
  );
}

function IconAppleMusicTile(props: SVGProps<SVGSVGElement>) {
  const { className, ...rest } = props;
  return <Music className={className} strokeWidth={1.5} absoluteStrokeWidth aria-hidden {...rest} />;
}

function IconYouTube(props: SVGProps<SVGSVGElement>) {
  const { className, ...rest } = props;
  return <Youtube className={className} strokeWidth={1.5} absoluteStrokeWidth aria-hidden {...rest} />;
}


function IconSubvert(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Bold blocky S — full rectangle minus upper-right and lower-left notches */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M2 0h20v24H2V0zM6 4h16v6H6V4zM2 14h16v6H2v-6z"
      />
    </svg>
  );
}

