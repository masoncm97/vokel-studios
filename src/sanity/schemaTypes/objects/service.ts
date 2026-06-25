import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A catalog entry in the service index. The homepage renders number + title +
 * tags + media only; `description` is optional headroom for a future detail page.
 */
export const service = defineType({
  name: "service",
  title: "Service",
  type: "object",
  fields: [
    defineField({
      name: "number",
      title: "Index",
      type: "string",
      description: "Two-digit catalog index, e.g. “01”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      description: "Lowercase tag row, e.g. positioning · rollout · playlists.",
    }),
    defineField({
      name: "media",
      title: "Media",
      type: "mediaBlock",
    }),
    defineField({
      name: "description",
      title: "Description (not shown on homepage)",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { number: "number", title: "title", media: "media.image" },
    prepare: ({ number, title, media }) => ({
      title: `${number ?? "··"} — ${title ?? "Untitled"}`,
      media,
    }),
  },
});
