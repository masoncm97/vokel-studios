import { MediaSlot } from "./MediaSlot";
import { Reveal } from "./Reveal";
import type { ServiceEntry } from "@/sanity/types";

type ServiceRowProps = {
  service: ServiceEntry;
  /** Row position, drives the alternating alignment. */
  index: number;
};

/**
 * Signature element: each service rendered as a mono catalog entry —
 * SERVICE 04 · TITLE · [tags] — paired with a large media slot. Alternating
 * media alignment gives the index its rhythm.
 */
export function ServiceRow({ service, index }: ServiceRowProps) {
  const flip = index % 2 === 1;
  const tags = service.tags ?? [];

  return (
    <Reveal
      as="li"
      className="grid grid-cols-1 items-start gap-x-8 gap-y-6 border-t border-[color:var(--color-hairline)] py-10 md:grid-cols-12 md:py-14"
    >
      {/* Metadata column */}
      <div
        className={`md:col-span-5 ${
          flip ? "md:order-2 md:col-start-8" : "md:order-1"
        }`}
      >
        <div className="vk-mono flex items-center gap-3">
          <span>Service</span>
          <span className="text-[color:var(--color-ink)]">
            {service.number}
          </span>
        </div>

        <h3 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl">
          {service.title}
        </h3>

        {tags.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1">
            {tags.map((tag, i) => (
              <li key={tag} className="vk-mono normal-case tracking-normal">
                {tag}
                {i < tags.length - 1 ? (
                  <span className="pl-3 text-[color:var(--color-hairline)]">·</span>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* Media column */}
      <div
        className={`md:col-span-6 ${
          flip ? "md:order-1 md:col-start-1" : "md:order-2 md:col-start-7"
        }`}
      >
        <MediaSlot
          media={service.media}
          ratio="4 / 3"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </Reveal>
  );
}
