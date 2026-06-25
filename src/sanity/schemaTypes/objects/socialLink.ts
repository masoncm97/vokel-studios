import { defineField, defineType } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      description: "e.g. Instagram, Spotify, YouTube.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "handle",
      title: "Handle (optional)",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "platform", subtitle: "handle" },
  },
});
