import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const aboutPage = defineType({
  name:  "aboutPage",
  title: "About Us Page",
  type:  "document",
  icon:  UsersIcon,

  preview: {
    prepare: () => ({ title: "About Us Page", subtitle: "Singleton — /about" }),
  },

  groups: [
    { name: "hero",    title: "🚀 Hero",                  default: true },
    { name: "about",   title: "🏢 About + Capabilities" },
    { name: "story",   title: "📖 Our Story" },
    { name: "mvv",     title: "💡 Mission / Vision / Values" },
    { name: "future",  title: "🔮 Future of Print" },
    { name: "brands",  title: "🏆 Brands" },
    { name: "reviews", title: "⭐ Reviews" },
    { name: "cta",     title: "📣 CTA" },
    { name: "seo",     title: "🔍 SEO" },
  ],

  fields: [

    // ── HERO ──────────────────────────────────────────────────────────────────
    defineField({
      name: "hero", title: "Hero Section", type: "object", group: "hero",
      fields: [
        defineField({ name: "chip",                title: "Badge Text",           type: "string", placeholder: "About PrintAI" }),
        defineField({ name: "heading",             title: "Heading",              type: "string", placeholder: "Transform Your Print Business with AI & Automation" }),
        defineField({ name: "headingHighlight",    title: "Highlight Phrase",     type: "string", placeholder: "AI & Automation", description: "Must appear verbatim in Heading" }),
        defineField({ name: "subtext",             title: "Subtext",              type: "text", rows: 3 }),
        defineField({ name: "primaryButtonText",   title: "Primary Button Text",  type: "string", placeholder: "Book a Demo" }),
        defineField({ name: "primaryButtonHref",   title: "Primary Button Link",  type: "string", placeholder: "/#contact" }),
        defineField({ name: "secondaryButtonText", title: "Secondary Button Text",type: "string", placeholder: "Explore Solutions" }),
        defineField({ name: "secondaryButtonHref", title: "Secondary Button Link",type: "string", placeholder: "/#services" }),
        defineField({
          name: "trustItems", title: "Trust Stats (4 boxes)", type: "array",
          of: [defineField({ name: "stat", type: "object",
            fields: [
              defineField({ name: "val",   title: "Value (e.g. 250+)",  type: "string" }),
              defineField({ name: "label", title: "Label",              type: "string" }),
            ],
            preview: { select: { title: "val", subtitle: "label" } },
          })],
        }),
        defineField({
          name: "solutions", title: "Solutions Strip Tags", type: "array",
          description: "The scrolling marquee of service names below the hero.",
          of: [{ type: "string" }],
        }),
      ],
    }),

    // ── ABOUT + CAPABILITIES ──────────────────────────────────────────────────
    defineField({
      name: "about", title: "About + Capabilities", type: "object", group: "about",
      fields: [
        defineField({ name: "eyebrow",          title: "Eyebrow",          type: "string", placeholder: "About PrintAI" }),
        defineField({ name: "heading",           title: "Heading",          type: "string" }),
        defineField({ name: "headingHighlight",  title: "Highlight Phrase", type: "string" }),
        defineField({ name: "pullQuote",         title: "Pull Quote",       type: "text", rows: 2 }),
        defineField({ name: "paragraph1",        title: "Paragraph 1",      type: "text", rows: 3 }),
        defineField({ name: "paragraph2",        title: "Paragraph 2",      type: "text", rows: 3 }),
        defineField({ name: "paragraph3",        title: "Paragraph 3",      type: "text", rows: 3 }),
        defineField({
          name: "capabilities", title: "Capability Cards", type: "array",
          of: [defineField({ name: "cap", type: "object",
            fields: [
              defineField({ name: "icon",   title: "Font Awesome icon class (e.g. fa-robot)", type: "string" }),
              defineField({ name: "metric", title: "Metric (e.g. 24/7)",                      type: "string" }),
              defineField({ name: "title",  title: "Card Title",                               type: "string" }),
              defineField({ name: "desc",   title: "Description",                              type: "text", rows: 2 }),
            ],
            preview: { select: { title: "title", subtitle: "metric" } },
          })],
        }),
      ],
    }),

    // ── OUR STORY ─────────────────────────────────────────────────────────────
    defineField({
      name: "story", title: "Our Story", type: "object", group: "story",
      fields: [
        defineField({ name: "heading",          title: "Heading",                    type: "string" }),
        defineField({ name: "headingHighlight", title: "Highlight Phrase",           type: "string" }),
        defineField({ name: "intro",            title: "Intro Paragraph",            type: "text", rows: 4 }),
        defineField({ name: "pullQuote",        title: "Pull Quote",                 type: "text", rows: 2 }),
        defineField({ name: "col1Para1",        title: "Column 1 — Paragraph 1",    type: "text", rows: 3 }),
        defineField({ name: "col1Para2",        title: "Column 1 — Paragraph 2",    type: "text", rows: 3 }),
        defineField({ name: "col2Para1",        title: "Column 2 — Paragraph 1",    type: "text", rows: 3 }),
        defineField({ name: "col2Callout",      title: "Column 2 — Callout Quote",  type: "text", rows: 2 }),
      ],
    }),

    // ── MISSION / VISION / VALUES ─────────────────────────────────────────────
    defineField({
      name: "mvv", title: "Mission / Vision / Values", type: "object", group: "mvv",
      fields: [
        defineField({ name: "missionTitle", title: "Mission — Card Title", type: "string", placeholder: "Our Mission" }),
        defineField({ name: "missionBody",  title: "Mission — Body",       type: "text", rows: 4 }),
        defineField({ name: "visionTitle",  title: "Vision — Card Title",  type: "string", placeholder: "Our Vision" }),
        defineField({ name: "visionBody",   title: "Vision — Body",        type: "text", rows: 4 }),
        defineField({ name: "valuesTitle",  title: "Values — Card Title",  type: "string", placeholder: "Core Values" }),
        defineField({
          name: "values", title: "Values List Items", type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),

    // ── FUTURE OF PRINT ───────────────────────────────────────────────────────
    defineField({
      name: "future", title: "Future of Print", type: "object", group: "future",
      fields: [
        defineField({ name: "eyebrow",           title: "Eyebrow",              type: "string", placeholder: "What's Coming" }),
        defineField({ name: "heading",            title: "Heading",              type: "string" }),
        defineField({ name: "headingHighlight",   title: "Highlight Phrase",     type: "string" }),
        defineField({ name: "subtext",            title: "Subtext",              type: "text", rows: 3 }),
        defineField({ name: "primaryButtonText",  title: "Button Text",          type: "string", placeholder: "Explore Solutions" }),
        defineField({ name: "primaryButtonHref",  title: "Button Link",          type: "string", placeholder: "/#services" }),
        defineField({
          name: "stats", title: "Stat Cards (4)", type: "array",
          of: [defineField({ name: "stat", type: "object",
            fields: [
              defineField({ name: "val",   title: "Value",  type: "string" }),
              defineField({ name: "label", title: "Label",  type: "string" }),
            ],
            preview: { select: { title: "val", subtitle: "label" } },
          })],
        }),
        defineField({
          name: "features", title: "Feature Cards (6)", type: "array",
          of: [defineField({ name: "feat", type: "object",
            fields: [
              defineField({ name: "icon",  title: "Font Awesome icon class", type: "string" }),
              defineField({ name: "title", title: "Title",                   type: "string" }),
              defineField({ name: "desc",  title: "Description",             type: "text", rows: 2 }),
            ],
            preview: { select: { title: "title" } },
          })],
        }),
      ],
    }),

    // ── BRANDS ───────────────────────────────────────────────────────────────
    defineField({
      name: "brands", title: "Brands / Logo Slider", type: "object", group: "brands",
      fields: [
        defineField({ name: "eyebrow",          title: "Eyebrow",          type: "string", placeholder: "Trusted Worldwide" }),
        defineField({ name: "heading",           title: "Heading",          type: "string" }),
        defineField({ name: "headingHighlight",  title: "Highlight Phrase", type: "string" }),
        defineField({
          name: "logos", title: "Logo Names", type: "array",
          description: "Each entry is displayed as a branded name tile in the slider.",
          of: [{ type: "string" }],
        }),
      ],
    }),

    // ── REVIEWS ──────────────────────────────────────────────────────────────
    defineField({
      name: "reviews", title: "Reviews Section", type: "object", group: "reviews",
      fields: [
        defineField({ name: "heading",     title: "Heading",                            type: "string" }),
        defineField({ name: "subtext",     title: "Subtext",                            type: "text", rows: 2 }),
        defineField({ name: "googleScore", title: "Google Score (e.g. 4.8)",            type: "string" }),
        defineField({ name: "googleCount", title: "Review Count label (e.g. 320+ Reviews)", type: "string" }),
      ],
    }),

    // ── CTA ──────────────────────────────────────────────────────────────────
    defineField({
      name: "cta", title: "CTA Section", type: "object", group: "cta",
      fields: [
        defineField({ name: "chip",                title: "Badge Text",           type: "string", placeholder: "Get Started" }),
        defineField({ name: "heading",             title: "Heading",              type: "string" }),
        defineField({ name: "subtext",             title: "Subtext",              type: "text", rows: 3 }),
        defineField({ name: "primaryButtonText",   title: "Primary Button Text",  type: "string", placeholder: "Book a Demo" }),
        defineField({ name: "primaryButtonHref",   title: "Primary Button Link",  type: "string", placeholder: "/#contact" }),
        defineField({ name: "secondaryButtonText", title: "Secondary Button Text",type: "string", placeholder: "Learn More" }),
        defineField({ name: "secondaryButtonHref", title: "Secondary Button Link",type: "string", placeholder: "/#services" }),
        defineField({ name: "trustLine",           title: "Trust Line (below buttons)", type: "string", placeholder: "4.8 Rating · Trusted by 250+ print businesses" }),
      ],
    }),

    // ── SEO ──────────────────────────────────────────────────────────────────
    defineField({
      name: "seo", title: "SEO", type: "object", group: "seo",
      fields: [
        defineField({ name: "title",       title: "SEO Title",       type: "string" }),
        defineField({ name: "description", title: "SEO Description", type: "text", rows: 3 }),
      ],
    }),

  ],
});
