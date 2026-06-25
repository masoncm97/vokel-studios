"use client";

type MarqueeProps = {
  items?: string[];
};

export function Marquee({ items }: MarqueeProps) {
  if (!items || items.length === 0) return null;

  // Duplicate the run so the -50% keyframe loops seamlessly.
  const run = [...items, ...items];

  return (
    <section
      aria-label="What we move"
      className="overflow-hidden border-y border-[color:var(--color-hairline)] py-6"
    >
      <div className="vk-marquee-track">
        {run.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="font-display text-[clamp(2rem,7vw,5rem)] font-medium tracking-tight"
          >
            <span className="px-6 lowercase">{item}</span>
            <span className="text-[color:var(--color-meta)]">—</span>
          </span>
        ))}
      </div>
    </section>
  );
}
