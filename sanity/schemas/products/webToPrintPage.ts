import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";
import SeoPreviewField from "../../components/SeoPreviewField";

/** Web-to-Print Platform product page — matches /products/web-to-print */
export const webToPrintPage = defineType({
  name:  "webToPrintPage",
  title: "Web-to-Print Page",
  type:  "document",
  icon:  DocumentTextIcon,

  preview: {
    select: { pageLabel: "pageLabel", seoTitle: "seo.title" },
    prepare: ({ pageLabel, seoTitle }) => ({
      title: pageLabel || seoTitle || "Web-to-Print Page",
      subtitle: "Product Page",
      media: DocumentTextIcon,
    }),
  },

  groups: [
    { name: "meta",        title: "⚙️ Info" },
    { name: "hero",        title: "🚀 Hero",        default: true },
    { name: "problem",     title: "⚠️ Problem" },
    { name: "features",    title: "✨ Features" },
    { name: "capabilities",title: "🛠️ Capabilities" },
    { name: "beforeAfter", title: "🔁 Before/After" },
    { name: "results",     title: "📊 Results" },
    { name: "integrations",title: "🔌 Integrations" },
    { name: "storeAudit",  title: "🎯 Store Audit" },
    { name: "finalCta",    title: "🎯 Final CTA" },
    { name: "seo",         title: "🔍 SEO" },
  ],

  fields: [
    defineField({ name: "pageLabel", title: "Internal Page Name", type: "string", group: "meta" }),

    // ── HERO ──────────────────────────────────────────────────────────
    defineField({ name: "hero", title: "Hero Section", type: "object", group: "hero",
      fields: [
        defineField({ name: "badge",          title: "Badge",                type: "string" }),
        defineField({ name: "headingLines",   title: "Heading Lines",        type: "array",
          description: "3 lines stacked vertically. E.g. 'Web-to-Print Stores' / 'That Don't Break' / 'When Real Orders Come In'",
          of: [{ type: "string" }],
        }),
        defineField({ name: "description",    title: "Description",          type: "text", rows: 3 }),
        defineField({ name: "ctaPrimaryText", title: "Primary CTA Text",     type: "string" }),
        defineField({ name: "ctaPrimaryHref", title: "Primary CTA Link",     type: "string" }),
        defineField({ name: "ctaSecondaryText", title: "Secondary CTA Text", type: "string" }),
        defineField({ name: "ctaSecondaryHref", title: "Secondary CTA Link", type: "string" }),
        defineField({ name: "configurator", title: "Product Configurator Card", type: "object",
          description: "Interactive mockup of the live store experience shown alongside the headline.",
          fields: [
            defineField({ name: "productName",      title: "Product Name",      type: "string" }),
            defineField({ name: "productVariant",   title: "Product Variant",   type: "string" }),
            defineField({ name: "quantities",       title: "Quantity Options",  type: "array", of: [{ type: "string" }] }),
            defineField({ name: "paperStocks",      title: "Paper Stocks",      type: "array", of: [{ type: "string" }] }),
            defineField({ name: "finishingOptions", title: "Finishing Options", type: "array", of: [{ type: "string" }] }),
            defineField({ name: "basePrice",        title: "Base Price",        type: "string" }),
            defineField({ name: "discountPrice",    title: "Discount Price",    type: "string" }),
            defineField({ name: "badges", title: "Trust Badges", type: "array",
              of: [defineArrayMember({ type: "object", name: "badge", fields: [
                defineField({ name: "icon",  title: "Lucide Icon", type: "string" }),
                defineField({ name: "label", title: "Label",       type: "string" }),
              ] })],
            }),
          ],
        }),
      ],
    }),

    // ── PROBLEM ───────────────────────────────────────────────────────
    defineField({ name: "problem", title: "Problem Section", type: "object", group: "problem",
      fields: [
        defineField({ name: "heading",       title: "Heading",        type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "subheading",    title: "Subheading",     type: "text", rows: 2 }),
        defineField({ name: "problems", title: "Problem Cards (5)", type: "array",
          of: [defineArrayMember({ type: "object", name: "p", preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "icon",        title: "Lucide Icon", type: "string" }),
              defineField({ name: "title",       title: "Title",       type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            ],
          })],
        }),
        defineField({ name: "costBannerTitle",       title: "Cost Banner Title",       type: "string" }),
        defineField({ name: "costBannerDescription", title: "Cost Banner Description", type: "text", rows: 2 }),
        defineField({ name: "costHighlight",         title: "Cost Highlight",          type: "string", description: "E.g. '$50k+ lost annually'" }),
      ],
    }),

    // ── FEATURES ──────────────────────────────────────────────────────
    defineField({ name: "features", title: "Features Section", type: "object", group: "features",
      fields: [
        defineField({ name: "sectionTag",    title: "Section Tag",    type: "string" }),
        defineField({ name: "heading",       title: "Heading",        type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "subheading",    title: "Subheading",     type: "text", rows: 2 }),
        defineField({ name: "features", title: "Feature Cards (4)", type: "array",
          of: [defineArrayMember({ type: "object", name: "f", preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "icon",        title: "Lucide Icon", type: "string" }),
              defineField({ name: "title",       title: "Title",       type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
              defineField({ name: "bullets",     title: "Bullet Points", type: "array", of: [{ type: "string" }] }),
            ],
          })],
        }),
      ],
    }),

    // ── CAPABILITIES ──────────────────────────────────────────────────
    defineField({ name: "capabilities", title: "Capabilities Section", type: "object", group: "capabilities",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "tiles", title: "Capability Tiles (8)", type: "array",
          of: [defineArrayMember({ type: "object", name: "t", preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "icon",        title: "Lucide Icon", type: "string" }),
              defineField({ name: "title",       title: "Title",       type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            ],
          })],
        }),
      ],
    }),

    // ── BEFORE/AFTER ──────────────────────────────────────────────────
    defineField({ name: "beforeAfter", title: "Before / After Section", type: "object", group: "beforeAfter",
      fields: [
        defineField({ name: "sectionTag",    title: "Section Tag",    type: "string" }),
        defineField({ name: "heading",       title: "Heading",        type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "subheading",    title: "Subheading",     type: "text", rows: 2 }),
        defineField({ name: "beforeItems", title: "Before Items (with ❌)", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "afterItems",  title: "After Items (with ✅)",  type: "array", of: [{ type: "string" }] }),
      ],
    }),

    // ── RESULTS ───────────────────────────────────────────────────────
    defineField({ name: "results", title: "Results Section", type: "object", group: "results",
      fields: [
        defineField({ name: "sectionTag", title: "Section Tag", type: "string" }),
        defineField({ name: "heading",    title: "Heading",     type: "string" }),
        defineField({ name: "subheading", title: "Subheading",  type: "text", rows: 2 }),
        defineField({ name: "stats", title: "Stat Cards (4)", type: "array",
          of: [defineArrayMember({ type: "object", name: "s", preview: { select: { title: "value", subtitle: "label" } },
            fields: [
              defineField({ name: "value", title: "Value", type: "string" }),
              defineField({ name: "label", title: "Label", type: "string" }),
            ],
          })],
        }),
        defineField({ name: "footerText", title: "Footer Text", type: "text", rows: 3 }),
      ],
    }),

    // ── INTEGRATIONS ──────────────────────────────────────────────────
    defineField({ name: "integrations", title: "Integrations Section", type: "object", group: "integrations",
      fields: [
        defineField({ name: "sectionTag", title: "Section Tag", type: "string" }),
        defineField({ name: "heading",    title: "Heading",     type: "string" }),
        defineField({ name: "subheading", title: "Subheading",  type: "text", rows: 2 }),
        defineField({ name: "integrations", title: "Integration Tiles (12)", type: "array",
          of: [defineArrayMember({ type: "object", name: "i", preview: { select: { title: "name", subtitle: "category" } },
            fields: [
              defineField({ name: "icon",     title: "Lucide Icon", type: "string" }),
              defineField({ name: "name",     title: "Name",        type: "string" }),
              defineField({ name: "category", title: "Category",    type: "string" }),
            ],
          })],
        }),
        defineField({ name: "footerNote", title: "Footer Note", type: "string" }),
      ],
    }),

    // ── STORE AUDIT ───────────────────────────────────────────────────
    defineField({ name: "storeAudit", title: "Store Audit Section", type: "object", group: "storeAudit",
      fields: [
        defineField({ name: "heading",              title: "Heading",              type: "string" }),
        defineField({ name: "description",          title: "Description",          type: "text", rows: 3 }),
        defineField({ name: "improvementsHighlight", title: "Improvements Highlight", type: "string" }),
        defineField({ name: "perks", title: "Audit Perks (3)", type: "array",
          of: [defineArrayMember({ type: "object", name: "p", fields: [
            defineField({ name: "icon",  title: "Lucide Icon", type: "string" }),
            defineField({ name: "label", title: "Label",       type: "string" }),
          ] })],
        }),
        defineField({ name: "ctaText",        title: "CTA Text",        type: "string" }),
        defineField({ name: "ctaHref",        title: "CTA Link",        type: "string" }),
        defineField({ name: "disclaimerText", title: "Disclaimer Text", type: "string" }),
      ],
    }),

    // ── FINAL CTA ─────────────────────────────────────────────────────
    defineField({ name: "finalCta", title: "Final CTA Section", type: "object", group: "finalCta",
      fields: [
        defineField({ name: "icon",          title: "Lucide Icon",     type: "string" }),
        defineField({ name: "heading1",      title: "Heading Line 1",  type: "string" }),
        defineField({ name: "heading2",      title: "Heading Line 2",  type: "string" }),
        defineField({ name: "highlightWord", title: "Highlight Word",  type: "string" }),
        defineField({ name: "description",   title: "Description",     type: "text", rows: 2 }),
        defineField({ name: "ctaText",       title: "CTA Text",        type: "string" }),
        defineField({ name: "ctaHref",       title: "CTA Link",        type: "string" }),
        defineField({ name: "footerText",    title: "Footer Text",     type: "string" }),
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
