import { defineField, defineType } from "sanity";

/** One of the four "what we do" pillars: plain-language name + mono subtitle. */
export const pillar = defineType({
  name: "pillar",
  title: "Pillar",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Two or three words, lowercase. e.g. “releases & positioning”.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle" },
    prepare: ({ title, subtitle }) => ({ title, subtitle }),
  },
});
