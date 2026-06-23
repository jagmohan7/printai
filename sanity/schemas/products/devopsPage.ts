import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";
import SeoPreviewField from "../../components/SeoPreviewField";

/** DevOps service page — matches /services/devops */
export const devopsPage = defineType({
  name:  "devopsPage",
  title: "DevOps Page",
  type:  "document",
  icon:  DocumentTextIcon,

  preview: {
    select: { pageLabel: "pageLabel", seoTitle: "seo.title" },
    prepare: ({ pageLabel, seoTitle }) => ({
      title: pageLabel || seoTitle || "DevOps Page",
      subtitle: "Product Page",
      media: DocumentTextIcon,
    }),
  },

  groups: [
    { name: "meta",       title: "⚙️ Info" },
    { name: "hero",       title: "🚀 Hero",        default: true },
    { name: "problems",   title: "⚠️ Problems" },
    { name: "costs",      title: "💸 Costs" },
    { name: "stats",      title: "📊 Stats" },
    { name: "process",    title: "🔄 Process" },
    { name: "benefits",   title: "✅ Benefits" },
    { name: "builtFor",   title: "🎯 Built For" },
    { name: "difference", title: "💡 Difference" },
    { name: "impact",     title: "📈 Impact" },
    { name: "services",   title: "🛠️ Services" },
    { name: "cta",        title: "🎯 CTA" },
    { name: "faq",        title: "❓ FAQ" },
    { name: "sharedCta",  title: "📣 CTA Section" },
    { name: "seo",        title: "🔍 SEO" },
  ],

  fields: [
    defineField({ name: "pageLabel", title: "Internal Page Name", type: "string", group: "meta" }),

    defineField({ name: "hero", title: "Hero Section", type: "object", group: "hero",
      fields: [
        defineField({ name: "badge",            title: "Badge",                  type: "string" }),
        defineField({ name: "headingLines",     title: "Heading Lines (4)",      type: "array", of: [{ type: "string" }], description: "Each line can have a gradient highlight word. Use **word** to mark the highlight." }),
        defineField({ name: "description",      title: "Description",            type: "text", rows: 3 }),
        defineField({ name: "ctaPrimaryText",   title: "Primary CTA Text",       type: "string" }),
        defineField({ name: "ctaPrimaryHref",   title: "Primary CTA Link",       type: "string" }),
        defineField({ name: "ctaSecondaryText", title: "Secondary CTA Text",     type: "string" }),
        defineField({ name: "ctaSecondaryHref", title: "Secondary CTA Link",     type: "string" }),
        defineField({ name: "iconCluster", title: "Floating Icon Cluster", type: "array",
          description: "6 floating tech icons (CI/CD, monitoring, etc) positioned around the hero.",
          of: [defineArrayMember({ type: "object", name: "ic", preview: { select: { title: "label" } },
            fields: [
              defineField({ name: "icon",  title: "Lucide Icon", type: "string" }),
              defineField({ name: "label", title: "Label",       type: "string" }),
            ],
          })],
        }),
      ],
    }),

    defineField({ name: "problems", title: "Problems Section", type: "object", group: "problems",
      fields: [
        defineField({ name: "heading",       title: "Heading",        type: "string" }),
        defineField({ name: "highlightText", title: "Highlight Text", type: "string" }),
        defineField({ name: "problems", title: "Problem Cards (4)", type: "array",
          of: [defineArrayMember({ type: "object", name: "p", preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "icon",        title: "Lucide Icon", type: "string" }),
              defineField({ name: "title",       title: "Title",       type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            ],
          })],
        }),
      ],
    }),

    defineField({ name: "costs", title: "Hidden Costs Section", type: "object", group: "costs",
      fields: [
        defineField({ name: "heading",       title: "Heading",        type: "string" }),
        defineField({ name: "highlightText", title: "Highlight Text", type: "string" }),
        defineField({ name: "costItems", title: "Cost Items (5)", type: "array", of: [{ type: "string" }] }),
      ],
    }),

    defineField({ name: "stats", title: "Stats Section", type: "object", group: "stats",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string", description: "Can include **highlighted** words." }),
        defineField({ name: "stats", title: "Stats (4)", type: "array",
          of: [defineArrayMember({ type: "object", name: "s", preview: { select: { title: "value", subtitle: "label" } },
            fields: [
              defineField({ name: "value", title: "Value", type: "string" }),
              defineField({ name: "label", title: "Label", type: "string" }),
            ],
          })],
        }),
      ],
    }),

    defineField({ name: "process", title: "Process Section", type: "object", group: "process",
      fields: [
        defineField({ name: "heading",       title: "Heading",        type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "steps", title: "Process Steps (4)", type: "array",
          of: [defineArrayMember({ type: "object", name: "s", preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "stepNumber", title: "Step Number", type: "string" }),
              defineField({ name: "title",      title: "Title",       type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            ],
          })],
        }),
      ],
    }),

    defineField({ name: "benefits", title: "Benefits Section", type: "object", group: "benefits",
      fields: [
        defineField({ name: "heading",       title: "Heading",        type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "benefits", title: "Benefit Cards (6)", type: "array",
          of: [defineArrayMember({ type: "object", name: "b", preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "icon",        title: "Lucide Icon", type: "string" }),
              defineField({ name: "title",       title: "Title",       type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            ],
          })],
        }),
      ],
    }),

    defineField({ name: "builtFor", title: "Built For Section", type: "object", group: "builtFor",
      fields: [
        defineField({ name: "heading",       title: "Heading",        type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "industries", title: "Industries (6)", type: "array",
          of: [defineArrayMember({ type: "object", name: "ind", preview: { select: { title: "label" } },
            fields: [
              defineField({ name: "icon",  title: "Lucide Icon", type: "string" }),
              defineField({ name: "label", title: "Label",       type: "string" }),
            ],
          })],
        }),
      ],
    }),

    defineField({ name: "difference", title: "Difference Section", type: "object", group: "difference",
      fields: [
        defineField({ name: "heading",       title: "Heading",        type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "features", title: "Difference Cards (6)", type: "array",
          of: [defineArrayMember({ type: "object", name: "f", preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "icon",        title: "Lucide Icon", type: "string" }),
              defineField({ name: "title",       title: "Title",       type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            ],
          })],
        }),
      ],
    }),

    defineField({ name: "impact", title: "Impact Section", type: "object", group: "impact",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "impacts", title: "Impact Stats (4)", type: "array",
          of: [defineArrayMember({ type: "object", name: "i", preview: { select: { title: "value", subtitle: "label" } },
            fields: [
              defineField({ name: "value", title: "Value", type: "string" }),
              defineField({ name: "label", title: "Label", type: "string" }),
            ],
          })],
        }),
      ],
    }),

    defineField({ name: "services", title: "Services Section", type: "object", group: "services",
      fields: [
        defineField({ name: "heading",       title: "Heading",        type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "services", title: "Service Cards (6)", type: "array",
          of: [defineArrayMember({ type: "object", name: "s", preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "icon",        title: "Lucide Icon", type: "string" }),
              defineField({ name: "title",       title: "Title",       type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
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
        defineField({ name: "heading",       title: "Heading",        type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "description",   title: "Description",    type: "text", rows: 3 }),
        defineField({ name: "ctaText",       title: "CTA Text",       type: "string" }),
        defineField({ name: "ctaHref",       title: "CTA Link",       type: "string" }),
        defineField({ name: "pillars", title: "Pillar Tiles (3)", type: "array",
          of: [defineArrayMember({ type: "object", name: "p", fields: [
            defineField({ name: "icon",  title: "Lucide Icon", type: "string" }),
            defineField({ name: "label", title: "Label",       type: "string" }),
          ] })],
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

    defineField({ name: "seo", title: "SEO", type: "object", group: "seo",
      fields: [
        defineField({ name: "seoPreview",  title: " ", type: "string", readOnly: true, components: { field: SeoPreviewField } }),
        defineField({ name: "title",       title: "Page Title",       type: "string", validation: r => [r.required().min(10).max(60).error("10–60 chars."), r.max(50).warning("Aim for ~50.")] }),
        defineField({ name: "description", title: "Meta Description", type: "text", rows: 2, validation: r => [r.required().min(70).max(160).error("70–160 chars."), r.max(155).warning("Aim for ~155.")] }),
        defineField({ name: "canonicalUrl", title: "Canonical URL", type: "string",
          description: "Override the canonical URL for this page. Leave blank to use the default. E.g. https://printai.cloud/services/devops" }),
        defineField({ name: "customSchema", title: "Custom Schema (JSON-LD)", type: "text", rows: 10,
          description: "Advanced / SEO team: paste a full JSON-LD object to OVERRIDE this page's built-in schema. With or without <script> tags. Leave empty to keep the automatic schema." }),
      ],
    }),
  ],
});
