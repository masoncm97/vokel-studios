import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import type { MediaBlock } from "@/sanity/types";

type MediaSlotProps = {
  media?: MediaBlock;
  /** CSS aspect-ratio value, e.g. "4 / 3". */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * A large media area that always holds its space. Renders a Sanity image when
 * present (next/image, no CLS), otherwise a quiet framed placeholder.
 */
export function MediaSlot({
  media,
  ratio = "4 / 3",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  className = "",
}: MediaSlotProps) {
  const image = media?.image;
  const alt = media?.alt ?? (image as { alt?: string } | undefined)?.alt ?? "";

  return (
    <div
      className={`relative w-full overflow-hidden bg-[color:var(--color-hairline)]/40 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {image ? (
        <Image
          src={urlFor(image).width(1600).fit("max").auto("format").url()}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-end justify-between border border-[color:var(--color-hairline)] p-3">
          <span className="vk-mono">no media</span>
          <span className="vk-mono">↗</span>
        </div>
      )}
    </div>
  );
}
