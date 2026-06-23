import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";
import SeoPreviewField from "../../components/SeoPreviewField";

/** Custom AI Development service page — matches /services/custom-ai */
export const customAiPage = defineType({
  name:  "customAiPage",
  title: "Custom AI Page",
  type:  "document",
  icon:  DocumentTextIcon,

  preview: {
    select: { pageLabel: "pageLabel", seoTitle: "seo.title" },
    prepare: ({ pageLabel, seoTitle }) => ({
      title: pageLabel || seoTitle || "Custom AI Development Page",
      subtitle: "Product Page",
      media: DocumentTextIcon,
    }),
  },

  groups: [
    { name: "meta",       title: "⚙️ Info" },
    { name: "hero",       title: "🚀 Hero",        default: true },
    { name: "problems",   title: "⚠️ Problems" },
    { name: "systems",    title: "🧠 Systems" },
    { name: "process",    title: "🔄 Process" },
    { name: "comparison", title: "⚖️ Comparison" },
    { name: "stats",      title: "📊 Stats" },
    { name: "included",   title: "📦 Included" },
    { name: "faq",        title: "❓ FAQ" },
    { name: "cta",        title: "🎯 CTA" },
    { name: "sharedCta",  title: "📣 CTA Section" },
    { name: "seo",        title: "🔍 SEO" },
  ],

  fields: [
    defineField({ name: "pageLabel", title: "Internal Page Name", type: "string", group: "meta" }),

    defineField({ name: "hero", title: "Hero Section", type: "object", group: "hero",
      fields: [
        defineField({ name: "badge",            title: "Badge",                  type: "string" }),
        defineField({ name: "headingLines",     title: "Heading Lines (4)",      type: "array", of: [{ type: "string" }] }),
        defineField({ name: "description",      title: "Description",            type: "text", rows: 3 }),
        defineField({ name: "ctaPrimaryText",   title: "Primary CTA Text",       type: "string" }),
        defineField({ name: "ctaPrimaryHref",   title: "Primary CTA Link",       type: "string" }),
        defineField({ name: "ctaSecondaryText", title: "Secondary CTA Text",     type: "string" }),
        defineField({ name: "ctaSecondaryHref", title: "Secondary CTA Link",     type: "string" }),
        defineField({ name: "ctaSecondaryAnchor", title: "Secondary CTA Anchor", type: "string", description: "E.g. '#systems'" }),
      ],
    }),

    defineField({ name: "problems", title: "Problems Section", type: "object", group: "problems",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "painCards", title: "Pain Cards (5)", type: "array",
          of: [defineArrayMember({ type: "object", name: "p", preview: { select: { title: "title", subtitle: "sub" } },
            fields: [
              defineField({ name: "icon",  title: "Lucide Icon", type: "string" }),
              defineField({ name: "title", title: "Title",       type: "string" }),
              defineField({ name: "sub",   title: "Subtitle",    type: "text", rows: 2 }),
            ],
          })],
        }),
        defineField({ name: "approachBadge",       title: "Approach Badge",       type: "string" }),
        defineField({ name: "approachHeadingLines", title: "Approach Heading (2 lines)", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "approachDescription", title: "Approach Description", type: "text", rows: 3 }),
      ],
    }),

    defineField({ name: "systems", title: "AI Systems Section", type: "object", group: "systems",
      fields: [
        defineField({ name: "sectionTag", title: "Section Tag", type: "string" }),
        defineField({ name: "heading",    title: "Heading",     type: "string" }),
        defineField({ name: "systems", title: "System Cards (5)", type: "array",
          of: [defineArrayMember({ type: "object", name: "s", preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "icon",        title: "Lucide Icon", type: "string" }),
              defineField({ name: "color",       title: "Accent Color", type: "string", options: { list: ["cyan", "violet"] } }),
              defineField({ name: "title",       title: "Title",       type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            ],
          })],
        }),
      ],
    }),

    defineField({ name: "process", title: "Process Section", type: "object", group: "process",
      fields: [
        defineField({ name: "sectionTag", title: "Section Tag", type: "string" }),
        defineField({ name: "heading",    title: "Heading",     type: "string" }),
        defineField({ name: "steps", title: "Process Steps (3)", type: "array",
          of: [defineArrayMember({ type: "object", name: "s", preview: { select: { title: "title", subtitle: "week" } },
            fields: [
              defineField({ name: "stepNumber", title: "Step Number", type: "string" }),
              defineField({ name: "week",       title: "Week Label",  type: "string", description: "E.g. 'Week 1–2'" }),
              defineField({ name: "title",      title: "Title",       type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            ],
          })],
        }),
      ],
    }),

    defineField({ name: "comparison", title: "Comparison Section", type: "object", group: "comparison",
      fields: [
        defineField({ name: "sectionTag", title: "Section Tag", type: "string" }),
        defineField({ name: "heading",    title: "Heading",     type: "string" }),
        defineField({ name: "comparisonRows", title: "Comparison Rows (4)", type: "array",
          of: [defineArrayMember({ type: "object", name: "r", preview: { select: { title: "aspect", subtitle: "custom" } },
            fields: [
              defineField({ name: "aspect",  title: "Aspect",        type: "string" }),
              defineField({ name: "generic", title: "Generic AI",    type: "string" }),
              defineField({ name: "custom",  title: "Custom AI",     type: "string" }),
            ],
          })],
        }),
      ],
    }),

    defineField({ name: "stats", title: "Stats Section", type: "object", group: "stats",
      fields: [
        defineField({ name: "sectionTag", title: "Section Tag", type: "string" }),
        defineField({ name: "heading",    title: "Heading",     type: "string" }),
        defineField({ name: "stats", title: "Stats (4)", type: "array",
          of: [defineArrayMember({ type: "object", name: "s", preview: { select: { title: "value", subtitle: "label" } },
            fields: [
              defineField({ name: "value", title: "Value", type: "string" }),
              defineField({ name: "label", title: "Label", type: "string" }),
              defineField({ name: "sub",   title: "Subtext", type: "string" }),
            ],
          })],
        }),
      ],
    }),

    defineField({ name: "included", title: "What's Included Section", type: "object", group: "included",
      fields: [
        defineField({ name: "sectionTag", title: "Section Tag", type: "string" }),
        defineField({ name: "heading",    title: "Heading",     type: "string" }),
        defineField({ name: "items", title: "Items (6, with ✅)", type: "array", of: [{ type: "string" }] }),
      ],
    }),

    defineField({ name: "faq", title: "FAQ Section", type: "object", group: "faq",
      fields: [
        defineField({ name: "sectionTag", title: "Section Tag", type: "string" }),
        defineField({ name: "heading",    title: "Heading",     type: "string" }),
        defineField({ name: "faqs", title: "Q&A Pairs (4)", type: "array",
          of: [defineArrayMember({ type: "object", name: "q", preview: { select: { title: "question", subtitle: "answer" } },
            fields: [
              defineField({ name: "question", title: "Question", type: "string" }),
              defineField({ name: "answer",   title: "Answer",   type: "text", rows: 3 }),
            ],
          })],
        }),
      ],
    }),

    // ── SHARED CTA ────────────────────────────────────────────────────
    defineField({ name: "sharedCta", title: "CTA Section", type: "object", group: "sharedCta",
      description: "Bottom-of-page CTA. Leave empty to use the page defaults.",
      fields: [
        defineField({ name: "badge",         title: "Badge Text",            type: "string" }),
        defineField({ name: "heading",       title: "Heading",               type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word/Phrase", type: "string", description: "Must appear verbatim in Heading" }),
        defineField({ name: "description",   title: "Description",           type: "text", rows: 2 }),
        defineField({ name: "primaryText",   title: "Primary Button Text",   type: "string" }),
        defineField({ name: "primaryHref",   title: "Primary Button Link",   type: "string" }),
        defineField({ name: "secondaryText", title: "Secondary Button Text", type: "string" }),
        defineField({ name: "secondaryHref", title: "Secondary Button Link", type: "string" }),
        defineField({ name: "trustPoints",   title: "Trust Points",          type: "array",
          description: "Checkmark items below the buttons.",
          of: [{ type: "string" }],
        }),
      ],
    }),

    defineField({ name: "cta", title: "Final CTA Section", type: "object", group: "cta",
      fields: [
        defineField({ name: "badge",        title: "Badge",                 type: "string" }),
        defineField({ name: "headingLines", title: "Heading Lines (2)",     type: "array", of: [{ type: "string" }] }),
        defineField({ name: "description",  title: "Description",           type: "text", rows: 3 }),
        defineField({ name: "ctaText",      title: "CTA Text",              type: "string" }),
        defineField({ name: "ctaHref",      title: "CTA Link",              type: "string" }),
      ],
    }),

    defineField({ name: "seo", title: "SEO", type: "object", group: "seo",
      fields: [
        defineField({ name: "seoPreview",  title: " ", type: "string", readOnly: true, components: { field: SeoPreviewField } }),
        defineField({ name: "title",       title: "Page Title",       type: "string", validation: r => [r.required().min(10).max(60).error("10–60 chars."), r.max(50).warning("Aim for ~50.")] }),
        defineField({ name: "description", title: "Meta Description", type: "text", rows: 2, validation: r => [r.required().min(70).max(160).error("70–160 chars."), r.max(155).warning("Aim for ~155.")] }),
        defineField({ name: "canonicalUrl", title: "Canonical URL", type: "string",
          description: "Override the canonical URL for this page. Leave blank to use the default. E.g. https://printai.cloud/services/custom-ai" }),
        defineField({ name: "customSchema", title: "Custom Schema (JSON-LD)", type: "text", rows: 10,
          description: "Advanced / SEO team: paste a full JSON-LD object to OVERRIDE this page's built-in schema. With or without <script> tags. Leave empty to keep the automatic schema." }),
      ],
    }),
  ],
});
