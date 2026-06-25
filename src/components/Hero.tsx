import { MediaSlot } from "./MediaSlot";
import type { HomeData } from "@/sanity/types";

export function Hero({ hero }: { hero?: HomeData["hero"] }) {
  if (!hero) return null;

  return (
    <section className="vk-wrap pt-20 pb-16 md:pt-32 md:pb-24">
      {hero.eyebrow ? (
        <p className="vk-mono mb-10 md:mb-16">{hero.eyebrow}</p>
      ) : null}

      <h1 className="font-display text-[clamp(3rem,12vw,11rem)] font-medium leading-[0.92] tracking-[-0.03em]">
        {hero.headline}
      </h1>

      {hero.line ? (
        <p className="mt-8 max-w-xl text-2xl leading-snug text-[color:var(--color-ink)] md:text-3xl">
          {hero.line}
        </p>
      ) : null}

      {hero.media ? (
        <div className="mt-16 md:mt-24">
          <MediaSlot
            media={hero.media}
            ratio="16 / 9"
            sizes="100vw"
            priority
          />
        </div>
      ) : null}
    </section>
  );
}
