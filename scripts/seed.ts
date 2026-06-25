/**
 * Seeds the two singletons with the §5.1 copy. Idempotent (createOrReplace on
 * fixed ids). Run with an Editor token:
 *
 *   1. add SANITY_API_WRITE_TOKEN=... to .env.local
 *   2. pnpm seed
 *
 * Email + social handles are placeholders — swap them in Studio.
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID / _DATASET.");
}
if (!token) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN. Create an Editor token in sanity.io/manage and add it to .env.local."
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  title: "Vokel.Studios",
  contactEmail: "hello@vokel.studios", // placeholder — confirm
  locationLabel: "New York",
  footerText: "Vokel.Studios — New York",
  socials: [
    // placeholder handles — confirm
    { _key: "instagram", platform: "Instagram", url: "https://instagram.com/vokel.studios", handle: "@vokel.studios" },
    { _key: "spotify", platform: "Spotify", url: "https://open.spotify.com/", handle: "Vokel.Studios" },
    { _key: "youtube", platform: "YouTube", url: "https://youtube.com/@vokel.studios", handle: "@vokel.studios" },
  ],
};

const homePage = {
  _id: "homePage",
  _type: "homePage",
  hero: {
    eyebrow: "MUSIC MARKETING STUDIO — NEW YORK",
    headline: "Vokel.Studios",
    line: "Sound carries.",
  },
  marquee: {
    items: ["releases", "tours", "streams", "tickets", "fans", "attention"],
  },
  whatWeDo: {
    pillars: [
      { _key: "strategy", title: "Strategy", subtitle: "releases & positioning" },
      { _key: "content", title: "Content", subtitle: "visuals & video" },
      { _key: "promotion", title: "Promotion", subtitle: "paid & performance" },
      { _key: "data", title: "Data", subtitle: "streams & tickets" },
    ],
  },
  services: [
    { _key: "s01", number: "01", title: "Release & Positioning", tags: ["positioning", "rollout", "playlists", "fanbase"] },
    { _key: "s02", number: "02", title: "Social & Community", tags: ["instagram", "tiktok", "youtube", "spotify"] },
    { _key: "s03", number: "03", title: "Content & Visuals", tags: ["music video", "audio", "cover art", "merch"] },
    { _key: "s04", number: "04", title: "Paid Promotion", tags: ["spotify", "meta", "youtube", "tiktok"] },
    { _key: "s05", number: "05", title: "Streaming & Tour", tags: ["dsp", "discovery", "ticketing"] },
    { _key: "s06", number: "06", title: "Analytics", tags: ["streams", "tickets", "audience"] },
    { _key: "s07", number: "07", title: "Consulting", tags: ["rollout", "touring", "advisory"] },
    { _key: "s08", number: "08", title: "Systems", tags: ["workflows", "fan crm", "automation"] },
  ],
  contact: {
    line: "Let's make something loud.",
  },
};

async function run() {
  await client.createOrReplace(siteSettings);
  await client.createOrReplace(homePage);
  console.log("✓ Seeded siteSettings + homePage into", `${projectId}/${dataset}`);
  console.log("  Remember: email + social handles are placeholders — edit in /studio.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
