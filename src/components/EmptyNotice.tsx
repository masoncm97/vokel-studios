/**
 * Shown only before the dataset is seeded. Once `homePage` exists in Sanity this
 * disappears and the real, content-driven sections render.
 */
export function EmptyNotice() {
  return (
    <section className="vk-wrap py-24">
      <p className="vk-mono mb-4">no content yet</p>
      <h1 className="font-display text-4xl font-medium tracking-tight md:text-6xl">
        Vokel.Studios
      </h1>
      <p className="mt-6 max-w-lg text-[color:var(--color-meta)]">
        The dataset is empty. Run{" "}
        <code className="font-mono text-[color:var(--color-ink)]">pnpm seed</code>{" "}
        with an Editor token, or add content in{" "}
        <a
          href="/studio"
          className="underline decoration-[color:var(--color-hairline)] underline-offset-2 hover:text-[color:var(--color-ink)]"
        >
          /studio
        </a>
        .
      </p>
    </section>
  );
}
