import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";
import SeoPreviewField from "../../components/SeoPreviewField";

/** Print Workflow Automation service page — matches /services/automation */
export const automationPage = defineType({
  name:  "automationPage",
  title: "Automation Page",
  type:  "document",
  icon:  DocumentTextIcon,

  preview: {
    select: { pageLabel: "pageLabel", seoTitle: "seo.title" },
    prepare: ({ pageLabel, seoTitle }) => ({
      title: pageLabel || seoTitle || "Print Workflow Automation Page",
      subtitle: "Product Page",
      media: DocumentTextIcon,
    }),
  },

  groups: [
    { name: "meta",          title: "⚙️ Info" },
    { name: "hero",          title: "🚀 Hero",          default: true },
    { name: "painPoints",    title: "⚠️ Pain Points" },
    { name: "whatWeAutomate",title: "🛠️ What We Automate" },
    { name: "beforeAfter",   title: "🔁 Before/After" },
    { name: "results",       title: "📊 Results" },
    { name: "integrations",  title: "🔌 Integrations" },
    { name: "implementation",title: "🚧 Implementation" },
    { name: "cta",           title: "🎯 CTA" },
    { name: "faq",           title: "❓ FAQ" },
    { name: "sharedCta",     title: "📣 CTA Section" },
    { name: "seo",           title: "🔍 SEO" },
  ],

  fields: [
    defineField({ name: "pageLabel", title: "Internal Page Name", type: "string", group: "meta" }),

    defineField({ name: "hero", title: "Hero Section", type: "object", group: "hero",
      fields: [
        defineField({ name: "badge",            title: "Badge",                  type: "string" }),
        defineField({ name: "heading",          title: "Heading",                type: "string" }),
        defineField({ name: "highlightGradient", title: "Gradient Words",        type: "string", description: "Words from heading shown in gradient." }),
        defineField({ name: "description",      title: "Description",            type: "text", rows: 3 }),
        defineField({ name: "ctaPrimaryText",   title: "Primary CTA Text",       type: "string" }),
        defineField({ name: "ctaPrimaryHref",   title: "Primary CTA Link",       type: "string" }),
        defineField({ name: "ctaSecondaryText", title: "Secondary CTA Text",     type: "string" }),
        defineField({ name: "ctaSecondaryHref", title: "Secondary CTA Link",     type: "string" }),
        defineField({ name: "steps", title: "Workflow Steps (5)", type: "array",
          description: "Visual workflow shown alongside the headline.",
          of: [defineArrayMember({ type: "object", name: "s", preview: { select: { title: "label" } },
            fields: [
              defineField({ name: "icon",  title: "Lucide Icon", type: "string" }),
              defineField({ name: "label", title: "Label",       type: "string" }),
            ],
          })],
        }),
      ],
    }),

    defineField({ name: "painPoints", title: "Pain Points Section", type: "object", group: "painPoints",
      fields: [
        defineField({ name: "heading",    title: "Heading",    type: "string" }),
        defineField({ name: "subheading", title: "Subheading", type: "text", rows: 2 }),
        defineField({ name: "painPoints", title: "Pain Points (6)", type: "array",
          of: [defineArrayMember({ type: "object", name: "p", preview: { select: { title: "text" } },
            fields: [
              defineField({ name: "icon", title: "Lucide Icon", type: "string" }),
              defineField({ name: "text", title: "Text",        type: "string" }),
            ],
          })],
        }),
      ],
    }),

    defineField({ name: "whatWeAutomate", title: "What We Automate Section", type: "object", group: "whatWeAutomate",
      fields: [
        defineField({ name: "heading",    title: "Heading",    type: "string" }),
        defineField({ name: "subheading", title: "Subheading", type: "text", rows: 2 }),
        defineField({ name: "items", title: "Automation Areas (4)", type: "array",
          of: [defineArrayMember({ type: "object", name: "i", preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "icon",        title: "Lucide Icon", type: "string" }),
              defineField({ name: "title",       title: "Title",       type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            ],
          })],
        }),
      ],
    }),

    defineField({ name: "beforeAfter", title: "Before / After Section", type: "object", group: "beforeAfter",
      fields: [
        defineField({ name: "heading",     title: "Heading", type: "string" }),
        defineField({ name: "beforeItems", title: "Before Items (with ❌)", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "afterItems",  title: "After Items (with ✅)",  type: "array", of: [{ type: "string" }] }),
      ],
    }),

    defineField({ name: "results", title: "Results Section", type: "object", group: "results",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "stats", title: "Stat Cards (4)", type: "array",
          of: [defineArrayMember({ type: "object", name: "s", preview: { select: { title: "value", subtitle: "label" } },
            fields: [
              defineField({ name: "icon",  title: "Lucide Icon", type: "string" }),
              defineField({ name: "value", title: "Value",       type: "string" }),
              defineField({ name: "label", title: "Label",       type: "string" }),
            ],
          })],
        }),
      ],
    }),

    defineField({ name: "integrations", title: "Integrations Section", type: "object", group: "integrations",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "integrations", title: "Integration Tiles (9)", type: "array",
          of: [defineArrayMember({ type: "object", name: "i", preview: { select: { title: "label" } },
            fields: [
              defineField({ name: "icon",  title: "Lucide Icon", type: "string" }),
              defineField({ name: "label", title: "Label",       type: "string" }),
            ],
          })],
        }),
      ],
    }),

    defineField({ name: "implementation", title: "How We Implement Section", type: "object", group: "implementation",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "steps", title: "Implementation Steps (3)", type: "array",
          of: [defineArrayMember({ type: "object", name: "s", preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "icon",        title: "Lucide Icon", type: "string" }),
              defineField({ name: "title",       title: "Title",       type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            ],
          })],
        }),
      ],
    }),

    // ── FAQ ───────────────────────────────────────────────────────────
    defineField({ name: "faq", title: "FAQ Section", type: "object", group: "faq",
      description: "Q&A accordion. Leave empty to use the page defaults.",
      fields: [
        defineField({ name: "heading",       title: "Heading",        type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "faqs", title: "Q&A Pairs", type: "array",
          of: [defineArrayMember({ type: "object", name: "faq",
            preview: { select: { title: "question", subtitle: "answer" } },
            fields: [
              defineField({ name: "question", title: "Question", type: "string", validation: r => r.required() }),
              defineField({ name: "answer",   title: "Answer",   type: "text", rows: 3, validation: r => r.required() }),
            ],
          })],
        }),
      ],
    }),

    defineField({ name: "cta", title: "Final CTA Section", type: "object", group: "cta",
      fields: [
        defineField({ name: "heading1",         title: "Heading Line 1", type: "string" }),
        defineField({ name: "heading2",         title: "Heading Line 2", type: "string" }),
        defineField({ name: "highlightGradient", title: "Gradient Words", type: "string" }),
        defineField({ name: "description",      title: "Description",    type: "text", rows: 2 }),
        defineField({ name: "ctaText",          title: "CTA Text",       type: "string" }),
        defineField({ name: "ctaHref",          title: "CTA Link",       type: "string" }),
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

    defineField({ name: "seo", title: "SEO", type: "object", group: "seo",
      fields: [
        defineField({ name: "seoPreview",  title: " ", type: "string", readOnly: true, components: { field: SeoPreviewField } }),
        defineField({ name: "title",       title: "Page Title",       type: "string", validation: r => [r.required().min(10).max(60).error("10–60 chars."), r.max(50).warning("Aim for ~50.")] }),
        defineField({ name: "description", title: "Meta Description", type: "text", rows: 2, validation: r => [r.required().min(70).max(160).error("70–160 chars."), r.max(155).warning("Aim for ~155.")] }),
        defineField({ name: "canonicalUrl", title: "Canonical URL", type: "string",
          description: "Override the canonical URL for this page. Leave blank to use the default. E.g. https://printai.cloud/services/automation" }),
        defineField({ name: "customSchema", title: "Custom Schema (JSON-LD)", type: "text", rows: 10,
          description: "Advanced / SEO team: paste a full JSON-LD object to OVERRIDE this page's built-in schema. With or without <script> tags. Leave empty to keep the automatic schema." }),
      ],
    }),
  ],
});
