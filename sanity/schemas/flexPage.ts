import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";
import SeoPreviewField from "../components/SeoPreviewField";
import { PAGE_BLOCK_TYPES } from "./pageBlocks";

/**
 * Flexible Page — the page builder.
 *
 * Editors create a new doc, set a slug (the URL), then stack section blocks
 * in any order. Rendered by the catch-all route app/[slug]/page.tsx.
 *
 * Use for: Terms, Privacy, Pricing, Refund Policy, landing pages, etc.
 */

// Slugs that must NOT be used (they're real app routes — would conflict).
const RESERVED_SLUGS = [
  "", "admin", "api", "products", "services", "case-studies", "resources",
  "studio", "_next", "sitemap.xml", "robots.txt",
];

export const flexPage = defineType({
  name:  "flexPage",
  title: "Flexible Page",
  type:  "document",
  icon:  DocumentTextIcon,

  groups: [
    { name: "content", title: "🧱 Page Content", default: true },
    { name: "settings", title: "⚙️ Settings" },
    { name: "seo", title: "🔍 SEO" },
  ],

  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare: ({ title, slug }) => ({
      title: title || "Untitled Page",
      subtitle: slug ? `/${slug}` : "⚠️ no slug set",
      media: DocumentTextIcon,
    }),
  },

  fields: [
    // ── Settings ──────────────────────────────────────────────────────
    defineField({
      name: "title", title: "Page Name", type: "string", group: "settings",
      description: "Internal name + browser fallback title.",
      validation: r => r.required(),
    }),
    defineField({
      name: "slug", title: "URL Slug", type: "slug", group: "settings",
      description: "The page URL: printai.cloud/<slug>. E.g. 'terms', 'pricing', 'privacy'.",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) => input.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 96),
      },
      validation: r => r.required().custom((slug) => {
        const val = (slug as { current?: string } | undefined)?.current || "";
        if (RESERVED_SLUGS.includes(val)) return `"${val}" is a reserved route — pick a different slug.`;
        if (val.includes("/")) return "Slug can't contain '/'. Use a single path segment.";
        return true;
      }),
    }),

    // ── Page Content (the builder) ────────────────────────────────────
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      group: "content",
      description: "Stack blocks in any order. Drag to reorder. Click + to add.",
      of: PAGE_BLOCK_TYPES.map((t) => defineArrayMember(t)),
    }),

    // ── SEO ───────────────────────────────────────────────────────────
    defineField({
      name: "seo", title: "SEO", type: "object", group: "seo",
      description: "How this page appears in Google. Preview above updates as you type.",
      fields: [
        defineField({ name: "seoPreview", title: " ", type: "string", readOnly: true, components: { field: SeoPreviewField } }),
        defineField({ name: "title", title: "Page Title", type: "string",
          validation: r => [r.required().min(10).max(60).error("10–60 chars."), r.max(50).warning("Aim for ~50.")] }),
        defineField({ name: "description", title: "Meta Description", type: "text", rows: 2,
          validation: r => [r.required().min(70).max(160).error("70–160 chars."), r.max(155).warning("Aim for ~155.")] }),
        defineField({ name: "customSchema", title: "Custom Schema (JSON-LD)", type: "text", rows: 10,
          description: "Advanced / SEO team: paste a full JSON-LD object for this page. With or without <script> tags." }),
      ],
    }),
  ],
});
