# Vokel.Studios

Marketing site for a music-marketing studio. A **Next.js 15 (App Router, TypeScript)** frontend that reads 100% of its homepage copy from **Sanity**, with the Sanity Studio embedded at `/studio`. One repo, one set of env vars.

## Stack & version notes

| Package | Pin | Why |
| --- | --- | --- |
| `next` | **16.x** | See the note below — the embedded Studio forces Next 16. |
| `next-sanity` | **12.4.5** | The data layer (`defineLive`, `sanityFetch`, `SanityLive`, `NextStudio`, draft mode). Every `next-sanity@12` peers Next 16. |
| `sanity` | **5.24+** (`5.31.1`) | Embedded Studio (peer of `next-sanity@12`). |
| `tailwindcss` | **4.x** | Styling, driven by the token layer in `src/app/globals.css`. |
| `@sanity/image-url` | 1.x | Image URLs for `next/image`. |

Sanity project `vwtvhoy4`, dataset `production`, `apiVersion` `2026-02-01`. Node 20+, **pnpm**.

### Why Next 16 and not Next 15

The original brief pinned **Next 15 + next-sanity 12**, but that pairing doesn't exist in the registry: every `next-sanity@12` peers Next **16**. Holding Next 15 forces `next-sanity@11`, and the current Sanity Studio packages then fail to build under Next 15's webpack — they import React's `useEffectEvent`, which Next 15's bundled React doesn't expose, and pull a conflicting `@portabletext/editor`/`sanity-bridge` generation.

Because we keep the Studio **embedded at `/studio`** (§6), the whole modern Sanity stack must be coherent, so the project runs on **Next 16 + next-sanity 12.4.5 + Sanity 5.31.1** (Next 16's bundled React provides `useEffectEvent`). `next-sanity@12`'s `<SanityLive>` is built for Next 16, which addresses the prefetch/revalidation concern that motivated the original Next 15 pin. If you ever want to drop back to Next 15, decouple the Studio (run it standalone via `sanity dev` → `<project>.sanity.studio`) — the frontend data layer builds fine on Next 15.

## Setup

```bash
pnpm install
cp .env.example .env.local   # public vars are already filled in
```

### Tokens (sanity.io/manage → project `vwtvhoy4` → API → Tokens)

- **Viewer token → `SANITY_API_READ_TOKEN`** — needed for live updates and draft-mode/visual editing. Published content renders without it, but you'll see a warning.
- **Editor token → `SANITY_API_WRITE_TOKEN`** — only needed to run `pnpm seed`. You can clear it afterward.

If the browser/Studio hits a CORS error, add `http://localhost:3000` as an allowed origin in manage (CORS origins). Don't work around it in code.

### Seed the copy

The dataset starts empty. Seed the §5.1 copy (idempotent):

```bash
# put an Editor token in .env.local as SANITY_API_WRITE_TOKEN, then:
pnpm seed
```

Email (`hello@vokel.studios`) and social handles are **placeholders** — edit them in `/studio`.

## Run

```bash
pnpm dev        # site at http://localhost:3000, Studio at /studio
pnpm build      # production build
pnpm typecheck  # tsc --noEmit
pnpm typegen    # (optional) extract schema + generate query types
```

## Editing content

Everything on the homepage is content-driven. Edit in `/studio`:

- **Home page** — hero, marquee, what-we-do pillars, the service index, contact line.
- **Site settings** — wordmark, contact email, location, footer text, social links.

Live updates: with the Viewer token set, saving in Studio updates the site without a reload. Click-to-edit (visual editing) works through draft mode.

## Section → Sanity field map

| Homepage section | Component | Sanity field |
| --- | --- | --- |
| Header (sticky) | `Header.tsx` | `siteSettings.title` |
| Hero | `Hero.tsx` | `homePage.hero` (`eyebrow`, `headline`, `line`, `media`) |
| Marquee | `Marquee.tsx` | `homePage.marquee.items` |
| What we do (4 pillars) | `WhatWeDo.tsx` | `homePage.whatWeDo.pillars[]` (`title`, `subtitle`) |
| Service index (8 entries) | `ServiceIndex.tsx` / `ServiceRow.tsx` | `homePage.services[]` (`number`, `title`, `tags`, `media`) |
| Contact / footer | `Footer.tsx` | `homePage.contact.line` + `siteSettings` (`contactEmail`, `socials`, `footerText`, `locationLabel`) |

GROQ lives in `src/sanity/lib/queries.ts`; schema in `src/sanity/schemaTypes/`.

## Adding a service

In `/studio` → Home page → Service index → add an item. Set `number` (e.g. `09`), `title`, `tags`, and optional `media`. It renders automatically with alternating alignment; descriptions are intentionally not shown on the homepage.

## Design system (token layer)

Defined in `src/app/globals.css`:

- **Color** — paper `#F6F6F4`, ink `#0A0A0A`, meta-grey `#8A8A87`, hairline `#E2E2DE`, and one signal accent **`#E6FF00` (high-voltage canary yellow)** used only as a fill behind ink / interaction state (selection, contact-line hover), never as low-contrast text.
- **Type** — Space Grotesk (display) · Inter (body) · JetBrains Mono (the utility layer: service indices, tag rows, eyebrows, footer clock).
- **Signature** — the service index as mono catalog strips (`SERVICE 04 · TITLE · [tags]`) with a live local-time ticker in the footer.
- **Motion** — scroll-reveal fade/translate via IntersectionObserver; fully disabled under `prefers-reduced-motion`.
