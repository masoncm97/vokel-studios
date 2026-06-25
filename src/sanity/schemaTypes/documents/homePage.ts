import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "marquee", title: "Marquee" },
    { name: "whatWeDo", title: "What we do" },
    { name: "services", title: "Service index" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          description: "Mono category label. e.g. MUSIC MARKETING STUDIO — NEW YORK.",
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "line",
          title: "Line",
          type: "string",
          description: "One short line. e.g. “Sound carries.”",
        }),
        defineField({ name: "media", title: "Hero media", type: "mediaBlock" }),
      ],
    }),
    defineField({
      name: "marquee",
      title: "Marquee",
      type: "object",
      group: "marquee",
      fields: [
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          options: { layout: "tags" },
          description: "Terse nouns that scroll. e.g. releases, tours, streams…",
        }),
      ],
    }),
    defineField({
      name: "whatWeDo",
      title: "What we do",
      type: "object",
      group: "whatWeDo",
      fields: [
        defineField({ name: "heading", title: "Heading (optional)", type: "string" }),
        defineField({
          name: "pillars",
          title: "Pillars",
          type: "array",
          of: [defineArrayMember({ type: "pillar" })],
          validation: (rule) => rule.max(4),
        }),
      ],
    }),
    defineField({
      name: "services",
      title: "Service index",
      type: "array",
      group: "services",
      of: [defineArrayMember({ type: "service" })],
    }),
    defineField({
      name: "contact",
      title: "Contact",
      type: "object",
      group: "contact",
      fields: [
        defineField({
          name: "line",
          title: "Line",
          type: "string",
          description: "e.g. “Let’s make something loud.”",
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home page" }),
  },
});
