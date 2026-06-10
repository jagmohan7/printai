import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";
import SeoPreviewField from "../../components/SeoPreviewField";

/** ERPNext product page — matches /products/erpnext */
export const erpnextPage = defineType({
  name:  "erpnextPage",
  title: "ERPNext Page",
  type:  "document",
  icon:  DocumentTextIcon,

  preview: {
    select: { pageLabel: "pageLabel", seoTitle: "seo.title" },
    prepare: ({ pageLabel, seoTitle }) => ({
      title: pageLabel || seoTitle || "ERPNext Page",
      subtitle: "Product Page",
      media: DocumentTextIcon,
    }),
  },

  groups: [
    { name: "meta",       title: "⚙️ Info" },
    { name: "hero",       title: "🚀 Hero",        default: true },
    { name: "pain",       title: "⚠️ Pain" },
    { name: "why",        title: "💡 Why ERPNext" },
    { name: "everything", title: "📦 Everything" },
    { name: "process",    title: "🔄 Process" },
    { name: "comparison", title: "⚖️ Comparison" },
    { name: "stats",      title: "📊 Stats" },
    { name: "faq",        title: "❓ FAQ" },
    { name: "cta",        title: "🎯 CTA" },
    { name: "seo",        title: "🔍 SEO" },
  ],

  fields: [
    defineField({ name: "pageLabel", title: "Internal Page Name", type: "string", group: "meta" }),

    // ── HERO ──────────────────────────────────────────────────────────
    defineField({ name: "hero", title: "Hero Section", type: "object", group: "hero",
      fields: [
        defineField({ name: "badge",          title: "Badge",                type: "string" }),
        defineField({ name: "headingLines",   title: "Heading Lines (3)",    type: "array", of: [{ type: "string" }] }),
        defineField({ name: "description",    title: "Description",          type: "text", rows: 3 }),
        defineField({ name: "ctaPrimaryText", title: "Primary CTA Text",     type: "string" }),
        defineField({ name: "ctaPrimaryHref", title: "Primary CTA Link",     type: "string" }),
        defineField({ name: "ctaSecondaryText", title: "Secondary CTA Text", type: "string" }),
        defineField({ name: "ctaSecondaryHref", title: "Secondary CTA Link", type: "string" }),
        defineField({ name: "dashboard", title: "Dashboard Mockup", type: "object",
          description: "Right-hand mock ERP dashboard preview.",
          fields: [
            defineField({ name: "topLabel", title: "Top Label", type: "string" }),
            defineField({ name: "topValue", title: "Top Value", type: "string" }),
            defineField({ name: "stats", title: "Stat Rows", type: "array",
              of: [defineArrayMember({ type: "object", name: "s", fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "value", title: "Value", type: "string" }),
              ] })],
            }),
            defineField({ name: "progressBars", title: "Progress Bars", type: "array",
              of: [defineArrayMember({ type: "object", name: "p", fields: [
                defineField({ name: "label",      title: "Label",      type: "string" }),
                defineField({ name: "percentage", title: "Percentage", type: "string", description: "E.g. '67%'" }),
              ] })],
            }),
            defineField({ name: "badges", title: "Dashboard Badges", type: "array", of: [{ type: "string" }] }),
          ],
        }),
      ],
    }),

    // ── PAIN ──────────────────────────────────────────────────────────
    defineField({ name: "pain", title: "Pain Section", type: "object", group: "pain",
      fields: [
        defineField({ name: "sectionTag",    title: "Section Tag",    type: "string" }),
        defineField({ name: "heading",       title: "Heading",        type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "subheading",    title: "Subheading",     type: "text", rows: 2 }),
        defineField({ name: "pains", title: "Pain Cards (6)", type: "array",
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

    // ── WHY ERPNEXT ───────────────────────────────────────────────────
    defineField({ name: "why", title: "Why ERPNext Section", type: "object", group: "why",
      fields: [
        defineField({ name: "sectionTag",    title: "Section Tag",    type: "string" }),
        defineField({ name: "heading",       title: "Heading",        type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "subheading",    title: "Subheading",     type: "text", rows: 2 }),
        defineField({ name: "cards", title: "Why Cards (3)", type: "array",
          of: [defineArrayMember({ type: "object", name: "c", preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "icon",        title: "Lucide Icon", type: "string" }),
              defineField({ name: "title",       title: "Title",       type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
              defineField({ name: "stat",        title: "Stat Value",  type: "string" }),
              defineField({ name: "statLabel",   title: "Stat Label",  type: "string" }),
            ],
          })],
        }),
      ],
    }),

    // ── EVERYTHING ────────────────────────────────────────────────────
    defineField({ name: "everything", title: "Everything-You-Get Section", type: "object", group: "everything",
      fields: [
        defineField({ name: "sectionTag",    title: "Section Tag",    type: "string" }),
        defineField({ name: "heading",       title: "Heading",        type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "subheading",    title: "Subheading",     type: "text", rows: 2 }),
        defineField({ name: "features", title: "Feature Tiles (8)", type: "array",
          of: [defineArrayMember({ type: "object", name: "f", preview: { select: { title: "label", subtitle: "description" } },
            fields: [
              defineField({ name: "icon",        title: "Lucide Icon", type: "string" }),
              defineField({ name: "label",       title: "Label",       type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            ],
          })],
        }),
      ],
    }),

    // ── PROCESS ───────────────────────────────────────────────────────
    defineField({ name: "process", title: "Process Section", type: "object", group: "process",
      fields: [
        defineField({ name: "sectionTag",    title: "Section Tag",    type: "string" }),
        defineField({ name: "heading",       title: "Heading",        type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "steps", title: "Process Steps (3)", type: "array",
          of: [defineArrayMember({ type: "object", name: "s", preview: { select: { title: "label" } },
            fields: [
              defineField({ name: "stepNumber", title: "Step Number", type: "string" }),
              defineField({ name: "label",      title: "Label",       type: "string" }),
              defineField({ name: "items", title: "Items in this step", type: "array", of: [{ type: "string" }] }),
            ],
          })],
        }),
      ],
    }),

    // ── COMPARISON ────────────────────────────────────────────────────
    defineField({ name: "comparison", title: "Comparison Section", type: "object", group: "comparison",
      fields: [
        defineField({ name: "sectionTag",      title: "Section Tag",      type: "string" }),
        defineField({ name: "heading",         title: "Heading",          type: "string" }),
        defineField({ name: "highlightWord",   title: "Highlight Word",   type: "string" }),
        defineField({ name: "traditionalItems", title: "Traditional Setup (with ❌)", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "erpnextItems",    title: "ERPNext Setup (with ✅)",      type: "array", of: [{ type: "string" }] }),
      ],
    }),

    // ── STATS ─────────────────────────────────────────────────────────
    defineField({ name: "stats", title: "Stats Section", type: "object", group: "stats",
      fields: [
        defineField({ name: "sectionTag",    title: "Section Tag",    type: "string" }),
        defineField({ name: "heading",       title: "Heading",        type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
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

    // ── FAQ ───────────────────────────────────────────────────────────
    defineField({ name: "faq", title: "FAQ Section", type: "object", group: "faq",
      fields: [
        defineField({ name: "sectionTag",    title: "Section Tag",    type: "string" }),
        defineField({ name: "heading",       title: "Heading",        type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
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

    // ── CTA ───────────────────────────────────────────────────────────
    defineField({ name: "cta", title: "Final CTA Section", type: "object", group: "cta",
      fields: [
        defineField({ name: "sectionTag",    title: "Section Tag",    type: "string" }),
        defineField({ name: "heading1",      title: "Heading Line 1", type: "string" }),
        defineField({ name: "heading2",      title: "Heading Line 2", type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "description",   title: "Description",    type: "text", rows: 2 }),
        defineField({ name: "ctaText",       title: "CTA Text",       type: "string" }),
        defineField({ name: "ctaHref",       title: "CTA Link",       type: "string" }),
      ],
    }),

    // ── SEO ───────────────────────────────────────────────────────────
    defineField({ name: "seo", title: "SEO", type: "object", group: "seo",
      fields: [
        defineField({ name: "seoPreview",  title: " ", type: "string", readOnly: true, components: { field: SeoPreviewField } }),
        defineField({ name: "title",       title: "Page Title",       type: "string", validation: r => [r.required().min(10).max(60).error("10–60 chars."), r.max(50).warning("Aim for ~50.")] }),
        defineField({ name: "description", title: "Meta Description", type: "text", rows: 2, validation: r => [r.required().min(70).max(160).error("70–160 chars."), r.max(155).warning("Aim for ~155.")] }),
        defineField({ name: "customSchema", title: "Custom Schema (JSON-LD)", type: "text", rows: 10,
          description: "Advanced / SEO team: paste a full JSON-LD object to OVERRIDE this page's built-in schema. With or without <script> tags. Leave empty to keep the automatic schema." }),
      ],
    }),
  ],
});
