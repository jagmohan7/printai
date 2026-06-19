import { defineType, defineField } from "sanity";

const linkFields = [
  defineField({ name: "label", title: "Label", type: "string" }),
  defineField({ name: "href",  title: "Link",  type: "string", description: "E.g. /products/chatbots or /#contact" }),
];

export const siteSettings = defineType({
  name:  "siteSettings",
  title: "Site Settings",
  type:  "document",

  preview: {
    prepare: () => ({ title: "Site Settings", subtitle: "Navbar · Footer" }),
  },

  groups: [
    { name: "brand",  title: "🎨 Brand Colors", default: true },
    { name: "navbar", title: "🔝 Navbar" },
    { name: "footer", title: "🔻 Footer" },
  ],

  fields: [

    // ── BRAND COLORS ──────────────────────────────────────────────────────────
    defineField({
      name: "brand", title: "Brand Colors", type: "object", group: "brand",
      description: "Override the default teal/navy palette. Leave blank to use the built-in defaults. Changes go live within 5 seconds.",
      fields: [
        defineField({
          name: "primaryColor", title: "Primary Color (Teal)", type: "string",
          description: "Hex — used for buttons, links, stat numbers, highlights. Default: #13C07A",
          placeholder: "#13C07A",
          validation: Rule => Rule.regex(/^#[0-9a-fA-F]{3,8}$/).warning("Must be a hex value, e.g. #13C07A"),
        }),
        defineField({
          name: "primaryDark", title: "Primary Dark (Teal Deep)", type: "string",
          description: "Hex — hover/pressed state of the primary color. Default: #0F6E56",
          placeholder: "#0F6E56",
          validation: Rule => Rule.regex(/^#[0-9a-fA-F]{3,8}$/).warning("Must be a hex value, e.g. #0F6E56"),
        }),
        defineField({
          name: "navyColor", title: "Dark Panel Color (Navy)", type: "string",
          description: "Hex — stats band, dark section backgrounds. Default: #0B1628",
          placeholder: "#0B1628",
          validation: Rule => Rule.regex(/^#[0-9a-fA-F]{3,8}$/).warning("Must be a hex value, e.g. #0B1628"),
        }),
      ],
    }),

    // ── NAVBAR ────────────────────────────────────────────────────────────────
    defineField({
      name: "navbar", title: "Navbar", type: "object", group: "navbar",
      fields: [
        defineField({
          name: "productLinks", title: "Products Dropdown Links", type: "array",
          description: "Links shown in the Products dropdown menu.",
          of: [defineField({ name: "link", title: "Link", type: "object", fields: linkFields })],
        }),
        defineField({
          name: "serviceLinks", title: "Services Dropdown Links", type: "array",
          description: "Links shown in the Services dropdown menu.",
          of: [defineField({ name: "link", title: "Link", type: "object", fields: linkFields })],
        }),
        defineField({ name: "ctaText", title: "CTA Button Text", type: "string", description: "Mobile menu button. E.g. 'Get Started'" }),
        defineField({ name: "ctaHref", title: "CTA Button Link", type: "string", description: "E.g. /#contact" }),
      ],
    }),

    // ── FOOTER ────────────────────────────────────────────────────────────────
    defineField({
      name: "footer", title: "Footer", type: "object", group: "footer",
      fields: [
        defineField({ name: "tagline", title: "Brand Tagline", type: "text", rows: 3,
          description: "Short description shown below the logo." }),
        defineField({
          name: "socials", title: "Social Links", type: "array",
          description: "Labels must be: LinkedIn, Twitter, Facebook, or Instagram.",
          of: [defineField({ name: "social", title: "Social", type: "object",
            fields: [
              defineField({ name: "label", title: "Platform", type: "string" }),
              defineField({ name: "href",  title: "URL",      type: "url" }),
            ],
          })],
        }),
        defineField({
          name: "quickLinks", title: "Quick Links Column", type: "array",
          of: [defineField({ name: "link", title: "Link", type: "object", fields: linkFields })],
        }),
        defineField({
          name: "productLinks", title: "Products Column", type: "array",
          of: [defineField({ name: "link", title: "Link", type: "object", fields: linkFields })],
        }),
        defineField({
          name: "serviceLinks", title: "Services Column", type: "array",
          of: [defineField({ name: "link", title: "Link", type: "object", fields: linkFields })],
        }),
        defineField({ name: "copyright", title: "Copyright Text", type: "string",
          description: "E.g. 'PrintAI. All rights reserved.' — year is added automatically." }),
      ],
    }),

  ],
});
