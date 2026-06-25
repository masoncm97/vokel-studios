import { defineQuery } from "next-sanity";

// Reusable media projection: an image (with alt) plus an optional video URL.
const MEDIA = /* groq */ `media{
  "image": image,
  "alt": image.alt,
  videoUrl
}`;

export const HOME_QUERY = defineQuery(`*[_type == "homePage"][0]{
  hero{
    eyebrow,
    headline,
    line,
    ${MEDIA}
  },
  marquee{
    items
  },
  whatWeDo{
    heading,
    pillars[]{
      _key,
      title,
      subtitle
    }
  },
  services[]{
    _key,
    number,
    title,
    tags,
    ${MEDIA}
  },
  contact{
    line
  }
}`);

export const SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  title,
  contactEmail,
  locationLabel,
  footerText,
  socials[]{
    _key,
    platform,
    url,
    handle
  }
}`);
