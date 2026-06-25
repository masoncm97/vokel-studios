import { defineField, defineType } from "sanity";

/**
 * A large media slot used by the hero and each service row. Image is primary;
 * videoUrl is optional headroom for hover-to-play loops on a later page.
 */
export const mediaBlock = defineType({
  name: "mediaBlock",
  title: "Media",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image for screen readers and SEO.",
        }),
      ],
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL (optional)",
      type: "url",
      description: "Muted loop source. Leave blank to use the image only.",
    }),
  ],
  preview: {
    select: { media: "image", alt: "image.alt" },
    prepare: ({ media, alt }) => ({ title: alt || "Media", media }),
  },
});
