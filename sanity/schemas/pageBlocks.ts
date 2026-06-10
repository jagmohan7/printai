import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * Page-builder section blocks.
 *
 * Each block is a reusable Sanity OBJECT type. Editors stack them in any order
 * inside a Flexible Page's `sections[]` array → maximum creative freedom while
 * every block still renders with the locked design system.
 *
 * Block list:
 *   richTextBlock · heroBlock · featureGridBlock · statsBlock
 *   ctaBlock · faqBlock · imageBlock · rawHtmlBlock
 */

// ── Rich Text (Portable Text) ────────────────────────────────────────────────
const richTextBlock = defineType({
  name: "richTextBlock",
  title: "📝 Rich Text",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 1", value: "h1" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({ name: "href", title: "URL", type: "string" }),
                  defineField({ name: "blank", title: "Open in new tab", type: "boolean", initialValue: false }),
                ],
              }),
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "maxWidth",
      title: "Max width",
      type: "string",
      options: { list: ["narrow", "normal", "wide"], layout: "radio" },
      initialValue: "normal",
    }),
  ],
  preview: { prepare: () => ({ title: "📝 Rich Text" }) },
});

// ── Hero ─────────────────────────────────────────────────────────────────────
const heroBlock = defineType({
  name: "heroBlock",
  title: "🚀 Hero",
  type: "object",
  fields: [
    defineField({ name: "badge", title: "Badge", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string", validation: r => r.required() }),
    defineField({ name: "highlightWord", title: "Highlight Word", type: "string", description: "A word from the heading shown in gradient." }),
    defineField({ name: "subtext", title: "Subtext", type: "text", rows: 3 }),
    defineField({ name: "primaryCtaText", title: "Primary Button Text", type: "string" }),
    defineField({ name: "primaryCtaHref", title: "Primary Button Link", type: "string" }),
    defineField({ name: "secondaryCtaText", title: "Secondary Button Text", type: "string" }),
    defineField({ name: "secondaryCtaHref", title: "Secondary Button Link", type: "string" }),
    defineField({ name: "align", title: "Alignment", type: "string", options: { list: ["left", "center"], layout: "radio" }, initialValue: "center" }),
  ],
  preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title: `🚀 Hero — ${title || "(no heading)"}` }) },
});

// ── Feature / Card Grid ──────────────────────────────────────────────────────
const featureGridBlock = defineType({
  name: "featureGridBlock",
  title: "🔲 Feature Grid",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Section Heading", type: "string" }),
    defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
    defineField({ name: "subheading", title: "Subheading", type: "text", rows: 2 }),
    defineField({ name: "columns", title: "Columns", type: "number", options: { list: [2, 3, 4] }, initialValue: 3 }),
    defineField({
      name: "cards", title: "Cards", type: "array",
      of: [defineArrayMember({
        type: "object", name: "card", preview: { select: { title: "title", subtitle: "description" } },
        fields: [
          defineField({ name: "icon", title: "Lucide Icon", type: "string", description: "E.g. 'Zap', 'Shield', 'Rocket'." }),
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
        ],
      })],
    }),
  ],
  preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title: `🔲 Feature Grid — ${title || ""}` }) },
});

// ── Stats ────────────────────────────────────────────────────────────────────
const statsBlock = defineType({
  name: "statsBlock",
  title: "📊 Stats",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "stats", title: "Stats", type: "array",
      of: [defineArrayMember({
        type: "object", name: "stat", preview: { select: { title: "value", subtitle: "label" } },
        fields: [
          defineField({ name: "value", title: "Value", type: "string", description: "E.g. '99.9%', '3x', '$120K'." }),
          defineField({ name: "label", title: "Label", type: "string" }),
        ],
      })],
    }),
  ],
  preview: { prepare: () => ({ title: "📊 Stats" }) },
});

// ── CTA Banner ───────────────────────────────────────────────────────────────
const ctaBlock = defineType({
  name: "ctaBlock",
  title: "🎯 CTA Banner",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", validation: r => r.required() }),
    defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "ctaText", title: "Button Text", type: "string" }),
    defineField({ name: "ctaHref", title: "Button Link", type: "string" }),
  ],
  preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title: `🎯 CTA — ${title || ""}` }) },
});

// ── FAQ ──────────────────────────────────────────────────────────────────────
const faqBlock = defineType({
  name: "faqBlock",
  title: "❓ FAQ",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
    defineField({
      name: "faqs", title: "Q&A Pairs", type: "array",
      of: [defineArrayMember({
        type: "object", name: "faq", preview: { select: { title: "question", subtitle: "answer" } },
        fields: [
          defineField({ name: "question", title: "Question", type: "string" }),
          defineField({ name: "answer", title: "Answer", type: "text", rows: 3 }),
        ],
      })],
    }),
  ],
  preview: { prepare: () => ({ title: "❓ FAQ" }) },
});

// ── Image ────────────────────────────────────────────────────────────────────
const imageBlock = defineType({
  name: "imageBlock",
  title: "🖼️ Image",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: r => r.required() }),
    defineField({ name: "alt", title: "Alt text", type: "string", description: "Describe the image for SEO + accessibility." }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({ name: "width", title: "Display width", type: "string", options: { list: ["narrow", "normal", "wide", "full"], layout: "radio" }, initialValue: "normal" }),
  ],
  preview: { select: { media: "image", title: "alt" }, prepare: ({ media, title }) => ({ title: `🖼️ Image — ${title || ""}`, media }) },
});

// ── Raw HTML (escape hatch for power users) ───────────────────────────────────
const rawHtmlBlock = defineType({
  name: "rawHtmlBlock",
  title: "</> Custom HTML",
  type: "object",
  fields: [
    defineField({
      name: "html", title: "HTML", type: "text", rows: 12,
      description: "Power-user escape hatch. Paste raw HTML with INLINE styles (style=\"...\"). " +
        "Tailwind classes won't work here (they're purged at build). No <script> tags. Use sparingly.",
    }),
  ],
  preview: { prepare: () => ({ title: "</> Custom HTML" }) },
});

export const pageBlocks = [
  richTextBlock,
  heroBlock,
  featureGridBlock,
  statsBlock,
  ctaBlock,
  faqBlock,
  imageBlock,
  rawHtmlBlock,
];

/** The block type names — used by flexPage.sections to allow every block. */
export const PAGE_BLOCK_TYPES = pageBlocks.map((b) => ({ type: b.name }));
