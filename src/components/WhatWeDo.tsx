import { Reveal } from "./Reveal";
import type { HomeData } from "@/sanity/types";

export function WhatWeDo({ data }: { data?: HomeData["whatWeDo"] }) {
  const pillars = data?.pillars ?? [];
  if (pillars.length === 0) return null;

  return (
    <section className="vk-wrap py-20 md:py-28">
      <div className="vk-mono mb-10 flex items-center justify-between">
        <span>{data?.heading || "What we do"}</span>
        <span aria-hidden>{String(pillars.length).padStart(2, "0")}</span>
      </div>

      <ul className="grid grid-cols-1 gap-px border-t border-[color:var(--color-hairline)] sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, i) => (
          <Reveal
            as="li"
            key={pillar._key}
            delay={i * 70}
            className="border-b border-[color:var(--color-hairline)] py-8 lg:border-b-0"
          >
            <h3 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
              {pillar.title}
            </h3>
            <p className="vk-mono mt-3 normal-case tracking-normal">
              {pillar.subtitle}
            </p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
