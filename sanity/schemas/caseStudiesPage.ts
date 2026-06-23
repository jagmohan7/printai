import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";
import SeoPreviewField from "../components/SeoPreviewField";

/** Case Studies page — matches /case-studies */
export const caseStudiesPage = defineType({
  name:  "caseStudiesPage",
  title: "Case Studies Page",
  type:  "document",
  icon:  DocumentTextIcon,

  preview: {
    select: { pageLabel: "pageLabel", seoTitle: "seo.title", heroHeading: "hero.heading" },
    prepare: ({ pageLabel, seoTitle, heroHeading }) => ({
      title:    pageLabel || seoTitle || heroHeading || "Case Studies Page",
      subtitle: "Page",
      media:    DocumentTextIcon,
    }),
  },

  groups: [
    { name: "meta",  title: "⚙️ Info" },
    { name: "hero",  title: "🚀 Hero", default: true },
    { name: "cases", title: "📊 Case Studies" },
    { name: "cta",   title: "🎯 CTA" },
    { name: "seo",   title: "🔍 SEO" },
  ],

  fields: [
    defineField({ name: "pageLabel", title: "Internal Page Name", type: "string", group: "meta",
      description: "CMS-only label. Not shown on the website." }),

    // ── HERO ──────────────────────────────────────────────────────────
    defineField({ name: "hero", title: "Hero Section", type: "object", group: "hero",
      fields: [
        defineField({ name: "heading",       title: "Heading",        type: "string", validation: r => r.required() }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string", description: "Word from the heading shown in gradient. Must match exactly." }),
        defineField({ name: "description",   title: "Description",    type: "text", rows: 3 }),
      ],
    }),

    // ── CASE STUDY CARDS ──────────────────────────────────────────────
    defineField({ name: "cases", title: "Case Study Cards", type: "object", group: "cases",
      description: "Grid of case studies. Add/remove cards freely — the grid auto-adjusts.",
      fields: [
        defineField({ name: "items", title: "Cards", type: "array",
          of: [defineArrayMember({ type: "object", name: "case", preview: { select: { title: "title", subtitle: "category" } },
            fields: [
              defineField({ name: "category",    title: "Category",     type: "string", description: "E.g. 'Commercial Printing', 'Packaging'." }),
              defineField({ name: "icon",        title: "Lucide Icon",  type: "string", description: "E.g. 'Printer', 'Bot', 'Database', 'Package', 'Globe', 'Settings'." }),
              defineField({ name: "title",       title: "Title",        type: "string", validation: r => r.required() }),
              defineField({ name: "description", title: "Description",  type: "text", rows: 2 }),
              defineField({ name: "ctaText",     title: "Link Text",    type: "string", initialValue: "Get Similar Results" }),
              defineField({ name: "ctaHref",     title: "Link URL",     type: "string", initialValue: "/#contact" }),
              defineField({ name: "stats", title: "Stats (up to 3)", type: "array",
                description: "Big numbers shown at the bottom of the card.",
                of: [defineArrayMember({ type: "object", name: "stat", preview: { select: { title: "value", subtitle: "label" } },
                  fields: [
                    defineField({ name: "value", title: "Value", type: "string", description: "E.g. '85%', '3x', '$120K'." }),
                    defineField({ name: "label", title: "Label", type: "string", description: "Short caption. Use a line break for two lines." }),
                  ],
                })],
              }),
            ],
          })],
        }),
      ],
    }),

    // ── BOTTOM CTA ────────────────────────────────────────────────────
    defineField({ name: "cta", title: "Bottom CTA", type: "object", group: "cta",
      fields: [
        defineField({ name: "heading",       title: "Heading",        type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "description",   title: "Description",    type: "text", rows: 2 }),
        defineField({ name: "ctaText",       title: "Button Text",    type: "string" }),
        defineField({ name: "ctaHref",       title: "Button Link",    type: "string" }),
      ],
    }),

    // ── SEO ───────────────────────────────────────────────────────────
    defineField({ name: "seo", title: "SEO", type: "object", group: "seo",
      description: "How this page appears in Google. The preview above updates as you type.",
      fields: [
        defineField({ name: "seoPreview", title: " ", type: "string", readOnly: true, components: { field: SeoPreviewField } }),
        defineField({ name: "title",       title: "Page Title", type: "string",
          validation: r => [r.required().min(10).max(60).error("10–60 chars."), r.max(50).warning("Aim for ~50.")] }),
        defineField({ name: "description", title: "Meta Description", type: "text", rows: 2,
          validation: r => [r.required().min(70).max(160).error("70–160 chars."), r.max(155).warning("Aim for ~155.")] }),
        defineField({ name: "canonicalUrl", title: "Canonical URL", type: "string",
          description: "Override the canonical URL for this page. Leave blank to use the default. E.g. https://printai.cloud/case-studies" }),
        defineField({ name: "customSchema", title: "Custom Schema (JSON-LD)", type: "text", rows: 10,
          description: "Advanced / SEO team: paste a full JSON-LD object to OVERRIDE this page's built-in schema. With or without <script> tags. Leave empty to keep the automatic schema." }),
      ],
    }),
  ],
});
