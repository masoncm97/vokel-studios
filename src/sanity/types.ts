import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

/**
 * Hand-written view models for what the homepage consumes. If you later run
 * `pnpm typegen`, you can swap these for the generated query result types.
 */

export interface MediaBlock {
  image?: SanityImageSource & { alt?: string };
  alt?: string;
  videoUrl?: string;
}

export interface Pillar {
  _key: string;
  title?: string;
  subtitle?: string;
}

export interface ServiceEntry {
  _key: string;
  number?: string;
  title?: string;
  tags?: string[];
  media?: MediaBlock;
}

export interface SocialLink {
  _key: string;
  platform?: string;
  url?: string;
  handle?: string;
}

export interface HomeData {
  hero?: {
    eyebrow?: string;
    headline?: string;
    line?: string;
    media?: MediaBlock;
  };
  marquee?: { items?: string[] };
  whatWeDo?: { heading?: string; pillars?: Pillar[] };
  services?: ServiceEntry[];
  contact?: { line?: string };
}

export interface SettingsData {
  title?: string;
  contactEmail?: string;
  locationLabel?: string;
  footerText?: string;
  socials?: SocialLink[];
}
