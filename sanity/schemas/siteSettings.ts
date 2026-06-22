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
      description: "Override site colors. Leave blank to use built-in defaults. Changes go live within 5 seconds.",
      fields: [
        defineField({
          name: "primaryColor", title: "Primary Color", type: "string",
          description: "Hex — buttons, links, highlights, stat numbers. Default: #673DE6",
          placeholder: "#673DE6",
          validation: Rule => Rule.regex(/^#[0-9a-fA-F]{3,8}$/).warning("Must be a valid hex e.g. #673DE6"),
        }),
        defineField({
          name: "primaryDark", title: "Primary Dark (Hover)", type: "string",
          description: "Hex — hover/pressed state of primary. Default: #5025D1",
          placeholder: "#5025D1",
          validation: Rule => Rule.regex(/^#[0-9a-fA-F]{3,8}$/).warning("Must be a valid hex e.g. #5025D1"),
        }),
        defineField({
          name: "navyColor", title: "Dark Panel Color", type: "string",
          description: "Hex — dark section backgrounds, stats band. Default: #0F172A",
          placeholder: "#0F172A",
          validation: Rule => Rule.regex(/^#[0-9a-fA-F]{3,8}$/).warning("Must be a valid hex e.g. #0F172A"),
        }),
        defineField({
          name: "pageColor", title: "Background", type: "string",
          description: "Hex — main page background. Default: #030712",
          placeholder: "#030712",
          validation: Rule => Rule.regex(/^#[0-9a-fA-F]{3,8}$/).warning("Must be a valid hex e.g. #030712"),
        }),
        defineField({
          name: "cardColor", title: "Card Background", type: "string",
          description: "Hex — card/panel fill color. Default: #111827",
          placeholder: "#111827",
          validation: Rule => Rule.regex(/^#[0-9a-fA-F]{3,8}$/).warning("Must be a valid hex e.g. #111827"),
        }),
        defineField({
          name: "inkColor", title: "Text Primary", type: "string",
          description: "Hex — main body text color. Default: #F8FAFC",
          placeholder: "#F8FAFC",
          validation: Rule => Rule.regex(/^#[0-9a-fA-F]{3,8}$/).warning("Must be a valid hex e.g. #F8FAFC"),
        }),
        defineField({
          name: "ink2Color", title: "Text Secondary", type: "string",
          description: "Hex — muted/secondary text. Default: #94A3B8",
          placeholder: "#94A3B8",
          validation: Rule => Rule.regex(/^#[0-9a-fA-F]{3,8}$/).warning("Must be a valid hex e.g. #94A3B8"),
        }),
      ],
    }),

    // ── NAVBAR ────────────────────────────────────────────────────────────────
    defineField({
      name: "navbar", title: "Navbar", type: "object", group: "navbar",
      fields: [
        defineField({
          name: "mainNavLinks", title: "Main Navigation Links", type: "array",
          description: "Links shown in the top navbar (Home, About, Products, Services, Resources, etc.)",
          of: [defineField({ name: "link", title: "Link", type: "object",
            fields: [
              defineField({ name: "label", title: "Label", type: "string" }),
              defineField({ name: "href",  title: "Link",  type: "string", description: "E.g. /about or /#home" }),
              defineField({ name: "hasDropdown", title: "Has Dropdown?", type: "boolean", description: "If true, this link will show a dropdown menu (Products, Services, or Resources)" }),
            ]
          })],
        }),
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
        defineField({
          name: "resourceLinks", title: "Resources Dropdown Links", type: "array",
          description: "Links shown in the Resources dropdown menu (Blogs, Case Studies, FAQs, etc.).",
          of: [defineField({ name: "link", title: "Link", type: "object", fields: linkFields })],
        }),
        defineField({ name: "ctaText", title: "CTA Button Text", type: "string", description: "Mobile menu button. E.g. 'Get Started'" }),
        defineField({ name: "ctaHref", title: "CTA Button Link", type: "string", description: "E.g. /#contact" }),
      ],
    }),

    // ── DEMO MODAL (Popup for CTAs) ───────────────────────────────────────────
    defineField({
      name: "demoModal", title: "Demo Modal Popup", type: "object", group: "navbar",
      description: "Edit the 2-form popup that appears when users click CTA buttons",
      fields: [
        defineField({ name: "title", title: "Modal Title", type: "string", placeholder: "Choose Your Path" }),
        defineField({ name: "subtitle", title: "Modal Subtitle", type: "text", rows: 2, placeholder: "Select how you'd like to get started..." }),

        defineField({ name: "productDemoHeading", title: "Product Demo - Heading", type: "string", placeholder: "Product Demo" }),
        defineField({ name: "productDemoText", title: "Product Demo - Description", type: "text", rows: 3, placeholder: "See our platform in action..." }),
        defineField({ name: "productDemoCta", title: "Product Demo - Button Text", type: "string", placeholder: "Book Product Demo" }),
        defineField({ name: "productDemoHref", title: "Product Demo - Button Link", type: "string", placeholder: "/#contact" }),

        defineField({ name: "consultationHeading", title: "Consultation - Heading", type: "string", placeholder: "Free Consultation" }),
        defineField({ name: "consultationText", title: "Consultation - Description", type: "text", rows: 3, placeholder: "Talk with our team..." }),
        defineField({ name: "consultationCta", title: "Consultation - Button Text", type: "string", placeholder: "Book Consultation" }),
        defineField({ name: "consultationHref", title: "Consultation - Button Link", type: "string", placeholder: "/#contact" }),
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
          name: "quickLinks", title: "Company Column", type: "array",
          description: "Home, About Us, Book a Demo, Free Consultancy, Contact",
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
        defineField({
          name: "resourceLinks", title: "Resources Column", type: "array",
          of: [defineField({ name: "link", title: "Link", type: "object", fields: linkFields })],
        }),
        defineField({
          name: "contactDetails", title: "Contact Details", type: "array",
          description: "Shown below the tagline — e.g. email, phone, address. Use an emoji as the icon.",
          of: [defineField({ name: "item", title: "Detail", type: "object", fields: [
            defineField({ name: "icon",  title: "Icon (emoji)", type: "string", placeholder: "📧" }),
            defineField({ name: "value", title: "Text / Value", type: "string", placeholder: "hello@printai.cloud" }),
          ]})],
        }),
        defineField({ name: "copyright", title: "Copyright Text", type: "string",
          description: "E.g. 'PrintOpsAI. All rights reserved.' — year is added automatically." }),
      ],
    }),

  ],
});
