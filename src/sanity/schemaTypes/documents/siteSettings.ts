import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Wordmark",
      type: "string",
      description: "Studio name as it appears in the header/footer.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "locationLabel",
      title: "Location",
      type: "string",
      description: "e.g. New York.",
    }),
    defineField({
      name: "footerText",
      title: "Footer text",
      type: "string",
      description: "Year is appended automatically on the site.",
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      of: [defineArrayMember({ type: "socialLink" })],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
