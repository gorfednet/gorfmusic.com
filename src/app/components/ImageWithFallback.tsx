import { useState, type ImgHTMLAttributes } from "react";

/** Tiny inline SVG used when the remote image fails (network, blockers, or removed asset). */
const PLACEHOLDER_IMAGE_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjNjY2IiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4K";

type ImageWithFallbackProps = ImgHTMLAttributes<HTMLImageElement>;

/**
 * Decorative or content images with a graceful fallback. Keeps layout stable when Unsplash
 * or other CDNs are unreachable without exposing original URLs in the DOM.
 */
export function ImageWithFallback(props: ImageWithFallbackProps) {
  const [loadFailed, setLoadFailed] = useState(false);
  const { src, alt, style, className, onError, decoding, ...rest } = props;

  const handleError: NonNullable<ImgHTMLAttributes<HTMLImageElement>["onError"]> = (event) => {
    setLoadFailed(true);
    onError?.(event);
  };

  if (loadFailed) {
    return (
      <div className={`inline-block bg-[#111122] text-center align-middle ${className ?? ""}`} style={style}>
        <div className="flex items-center justify-center w-full h-full min-h-[4rem]">
          <img src={PLACEHOLDER_IMAGE_SRC} alt="" width={88} height={88} {...rest} />
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt ?? ""}
      className={className}
      style={style}
      decoding={decoding ?? "async"}
      {...rest}
      onError={handleError}
    />
  );
}
