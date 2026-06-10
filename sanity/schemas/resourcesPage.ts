import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";
import SeoPreviewField from "../components/SeoPreviewField";

/** Resources page — matches /resources */
export const resourcesPage = defineType({
  name:  "resourcesPage",
  title: "Resources Page",
  type:  "document",
  icon:  DocumentTextIcon,

  preview: {
    select: { pageLabel: "pageLabel", seoTitle: "seo.title", heroHeading: "hero.heading" },
    prepare: ({ pageLabel, seoTitle, heroHeading }) => ({
      title:    pageLabel || seoTitle || heroHeading || "Resources Page",
      subtitle: "Page",
      media:    DocumentTextIcon,
    }),
  },

  groups: [
    { name: "meta",     title: "⚙️ Info" },
    { name: "hero",     title: "🚀 Hero", default: true },
    { name: "guides",   title: "📚 Guides" },
    { name: "insights", title: "💡 Insights" },
    { name: "docs",     title: "📄 Documentation" },
    { name: "cta",      title: "🎯 CTA" },
    { name: "seo",      title: "🔍 SEO" },
  ],

  fields: [
    defineField({ name: "pageLabel", title: "Internal Page Name", type: "string", group: "meta" }),

    // ── HERO ──────────────────────────────────────────────────────────
    defineField({ name: "hero", title: "Hero Section", type: "object", group: "hero",
      fields: [
        defineField({ name: "heading",     title: "Heading",     type: "string", validation: r => r.required() }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
      ],
    }),

    // ── GUIDES ────────────────────────────────────────────────────────
    defineField({ name: "guides", title: "Guides Section", type: "object", group: "guides",
      fields: [
        defineField({ name: "heading", title: "Section Heading", type: "string", initialValue: "Guides" }),
        defineField({ name: "items", title: "Guide Cards", type: "array",
          of: [defineArrayMember({ type: "object", name: "guide", preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "icon",        title: "Lucide Icon",  type: "string", description: "E.g. 'Play', 'FileText', 'BookMarked'." }),
              defineField({ name: "title",       title: "Title",        type: "string" }),
              defineField({ name: "description", title: "Description",  type: "text", rows: 2 }),
              defineField({ name: "ctaText",     title: "Link Text",    type: "string", initialValue: "Request Guide" }),
              defineField({ name: "ctaHref",     title: "Link URL",     type: "string", initialValue: "/#contact" }),
            ],
          })],
        }),
      ],
    }),

    // ── INSIGHTS ──────────────────────────────────────────────────────
    defineField({ name: "insights", title: "Industry Insights Section", type: "object", group: "insights",
      fields: [
        defineField({ name: "heading", title: "Section Heading", type: "string", initialValue: "Industry Insights" }),
        defineField({ name: "items", title: "Insight Cards", type: "array",
          of: [defineArrayMember({ type: "object", name: "insight", preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "title",       title: "Title",       type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
              defineField({ name: "ctaText",     title: "Link Text",   type: "string", initialValue: "Request Report" }),
              defineField({ name: "ctaHref",     title: "Link URL",    type: "string", initialValue: "/#contact" }),
            ],
          })],
        }),
      ],
    }),

    // ── DOCUMENTATION ─────────────────────────────────────────────────
    defineField({ name: "docs", title: "Documentation Section", type: "object", group: "docs",
      fields: [
        defineField({ name: "heading", title: "Section Heading", type: "string", initialValue: "Documentation" }),
        defineField({ name: "items", title: "Doc Cards", type: "array",
          of: [defineArrayMember({ type: "object", name: "doc", preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "icon",        title: "Lucide Icon",  type: "string", description: "E.g. 'BookOpen', 'Code2'." }),
              defineField({ name: "title",       title: "Title",        type: "string" }),
              defineField({ name: "description", title: "Description",  type: "text", rows: 2 }),
              defineField({ name: "ctaText",     title: "Link Text",    type: "string", initialValue: "View Docs" }),
              defineField({ name: "ctaHref",     title: "Link URL",     type: "string" }),
              defineField({ name: "external",    title: "Opens in new tab?", type: "boolean", initialValue: true, description: "On for external links (docs.erpnext.com etc.)." }),
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
      fields: [
        defineField({ name: "seoPreview", title: " ", type: "string", readOnly: true, components: { field: SeoPreviewField } }),
        defineField({ name: "title",       title: "Page Title", type: "string",
          validation: r => [r.required().min(10).max(60).error("10–60 chars."), r.max(50).warning("Aim for ~50.")] }),
        defineField({ name: "description", title: "Meta Description", type: "text", rows: 2,
          validation: r => [r.required().min(70).max(160).error("70–160 chars."), r.max(155).warning("Aim for ~155.")] }),
        defineField({ name: "customSchema", title: "Custom Schema (JSON-LD)", type: "text", rows: 10,
          description: "Advanced / SEO team: paste a full JSON-LD object to OVERRIDE this page's built-in schema. With or without <script> tags. Leave empty to keep the automatic schema." }),
      ],
    }),
  ],
});
