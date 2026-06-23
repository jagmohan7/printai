import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";
import SeoPreviewField from "../../components/SeoPreviewField";

/** AI Chatbot product page — matches /products/chatbots */
export const chatbotsPage = defineType({
  name:  "chatbotsPage",
  title: "AI Chatbot Page",
  type:  "document",
  icon:  DocumentTextIcon,

  preview: {
    select: { pageLabel: "pageLabel", seoTitle: "seo.title", heroHeading: "hero.heading" },
    prepare: ({ pageLabel, seoTitle, heroHeading }) => ({
      title:    pageLabel || seoTitle || heroHeading || "AI Chatbot Page",
      subtitle: "Product Page",
      media:    DocumentTextIcon,
    }),
  },

  groups: [
    { name: "meta",       title: "⚙️ Info" },
    { name: "hero",       title: "🚀 Hero",          default: true },
    { name: "problem",    title: "⚠️ Problem" },
    { name: "howItWorks", title: "🔄 How It Works" },
    { name: "included",   title: "📦 Included" },
    { name: "results",    title: "📊 Results" },
    { name: "demo",       title: "💬 Demo" },
    { name: "faq",        title: "❓ FAQ" },
    { name: "seo",        title: "🔍 SEO" },
  ],

  fields: [
    defineField({ name: "pageLabel", title: "Internal Page Name", type: "string", group: "meta",
      description: "CMS-only label. Not shown on the website." }),

    // ── HERO ──────────────────────────────────────────────────────────
    defineField({ name: "hero", title: "Hero Section", type: "object", group: "hero",
      description: "Top of the page — first impression. Animated chat preview shows on the right.",
      fields: [
        defineField({ name: "badge",          title: "Badge Text",     type: "string", validation: r => r.max(60) }),
        defineField({ name: "heading",        title: "Heading",        type: "string", validation: r => r.required().max(120) }),
        defineField({ name: "highlightWord",  title: "Highlight Word", type: "string", description: "Word from heading shown in gradient. Must match exactly." }),
        defineField({ name: "subtext",        title: "Subtext",        type: "text",   rows: 3, validation: r => r.max(300) }),
        defineField({ name: "ctaPrimaryText", title: "Primary CTA Text",   type: "string" }),
        defineField({ name: "ctaPrimaryHref", title: "Primary CTA Link",   type: "string" }),
        defineField({ name: "ctaSecondaryText", title: "Secondary CTA Text", type: "string" }),
        defineField({ name: "ctaSecondaryHref", title: "Secondary CTA Link", type: "string" }),
        defineField({ name: "supportText",    title: "Support Text",   type: "string", description: "3 trust signals separated by ·. E.g. 'No credit card · Setup in 48hrs · Print-specific AI'" }),
        defineField({ name: "image", title: "Hero Illustration", type: "image",
          description: "Replaces the right-side illustration. Upload a screenshot or product mockup.",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Text (SEO)", type: "string",
              description: "Describe the image for screen readers and Google. E.g. 'AI chatbot answering a print shop pricing query'",
              validation: r => r.required().max(120) }),
          ],
        }),
      ],
    }),

    // ── PROBLEM ───────────────────────────────────────────────────────
    defineField({ name: "problem", title: "Problem Section", type: "object", group: "problem",
      description: "Pain points that print shops face — sets up the need for the chatbot.",
      fields: [
        defineField({ name: "heading",       title: "Heading",       type: "string", validation: r => r.required() }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "subheading",    title: "Subheading",    type: "text", rows: 2 }),
        defineField({ name: "problems",      title: "Problem Cards", type: "array",
          description: "5 problems shown as cards.",
          of: [defineArrayMember({ type: "object", name: "problem", preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "icon",        title: "Lucide Icon Name", type: "string", description: "E.g. 'Clock', 'DollarSign', 'AlertCircle'" }),
              defineField({ name: "title",       title: "Title",            type: "string" }),
              defineField({ name: "description", title: "Description",      type: "text", rows: 2 }),
            ],
          })],
        }),
      ],
    }),

    // ── HOW IT WORKS ──────────────────────────────────────────────────
    defineField({ name: "howItWorks", title: "How It Works Section", type: "object", group: "howItWorks",
      description: "3-step explainer of what setup looks like.",
      fields: [
        defineField({ name: "heading",       title: "Heading",        type: "string", validation: r => r.required() }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "subheading",    title: "Subheading",     type: "text", rows: 2 }),
        defineField({ name: "steps", title: "Steps", type: "array",
          description: "Exactly 3 steps.",
          of: [defineArrayMember({ type: "object", name: "step", preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "stepNumber",  title: "Step Number", type: "string", description: "E.g. '01', '02', '03'" }),
              defineField({ name: "icon",        title: "Lucide Icon", type: "string" }),
              defineField({ name: "title",       title: "Title",       type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            ],
          })],
        }),
      ],
    }),

    // ── INCLUDED ──────────────────────────────────────────────────────
    defineField({ name: "included", title: "What's Included Section", type: "object", group: "included",
      description: "6 feature cards listing everything bundled into the chatbot product.",
      fields: [
        defineField({ name: "heading",       title: "Heading",        type: "string", validation: r => r.required() }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "subheading",    title: "Subheading",     type: "text", rows: 2 }),
        defineField({ name: "features", title: "Feature Cards", type: "array",
          description: "6 features.",
          of: [defineArrayMember({ type: "object", name: "feature", preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "icon",        title: "Lucide Icon", type: "string" }),
              defineField({ name: "title",       title: "Title",       type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
              defineField({ name: "color",       title: "Accent Color", type: "string", options: { list: ["blue", "cyan", "purple"] } }),
            ],
          })],
        }),
      ],
    }),

    // ── RESULTS ───────────────────────────────────────────────────────
    defineField({ name: "results", title: "Results Section", type: "object", group: "results",
      description: "4 hero stats showing chatbot impact.",
      fields: [
        defineField({ name: "heading",       title: "Heading",        type: "string", validation: r => r.required() }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "subheading",    title: "Subheading",     type: "text", rows: 2 }),
        defineField({ name: "stats", title: "Stat Cards", type: "array",
          description: "4 stats.",
          of: [defineArrayMember({ type: "object", name: "stat", preview: { select: { title: "value", subtitle: "label" } },
            fields: [
              defineField({ name: "value", title: "Value", type: "string", description: "E.g. '24/7', '3 min', '40%'" }),
              defineField({ name: "label", title: "Label", type: "string" }),
            ],
          })],
        }),
      ],
    }),

    // ── DEMO ──────────────────────────────────────────────────────────
    defineField({ name: "demo", title: "Demo Section", type: "object", group: "demo",
      description: "Interactive demo block — multi-turn chat preview + quick-reply buttons.",
      fields: [
        defineField({ name: "heading",       title: "Heading",        type: "string", validation: r => r.required() }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "description",   title: "Description",    type: "text", rows: 3 }),
        defineField({ name: "ctaText",       title: "CTA Text",       type: "string" }),
        defineField({ name: "ctaHref",       title: "CTA Link",       type: "string" }),
        defineField({ name: "image", title: "Demo Illustration", type: "image",
          description: "Replaces the right-side demo illustration. Upload a screenshot or product mockup.",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Text (SEO)", type: "string",
              description: "Describe the image for screen readers and Google. E.g. 'PrintOpsAI chatbot handling a flyer pricing conversation'",
              validation: r => r.required().max(120) }),
          ],
        }),
      ],
    }),

    // ── FAQ ──────────────────────────────────────────────────────────
    defineField({ name: "faq", title: "FAQ Section", type: "object", group: "faq",
      description: "5 question/answer pairs. Also rendered as FAQPage structured data for SEO.",
      fields: [
        defineField({ name: "heading",       title: "Heading",        type: "string", validation: r => r.required() }),
        defineField({ name: "highlightWord", title: "Highlight Word", type: "string" }),
        defineField({ name: "faqs", title: "Q&A Pairs", type: "array",
          description: "5 FAQ pairs.",
          of: [defineArrayMember({ type: "object", name: "faq", preview: { select: { title: "question", subtitle: "answer" } },
            fields: [
              defineField({ name: "question", title: "Question", type: "string", validation: r => r.required() }),
              defineField({ name: "answer",   title: "Answer",   type: "text", rows: 3, validation: r => r.required() }),
            ],
          })],
        }),
      ],
    }),

    // ── SEO ──────────────────────────────────────────────────────────
    defineField({ name: "seo", title: "SEO", type: "object", group: "seo",
      description: "How this page appears in Google. The live preview above updates as you type.",
      fields: [
        defineField({ name: "seoPreview", title: " ", type: "string", readOnly: true, components: { field: SeoPreviewField } }),
        defineField({ name: "title",       title: "Page Title", type: "string",
          validation: r => [
            r.required().min(10).max(60).error("Title must be 10–60 chars."),
            r.max(50).warning("Aim for ~50 chars."),
          ],
        }),
        defineField({ name: "description", title: "Meta Description", type: "text", rows: 2,
          validation: r => [
            r.required().min(70).max(160).error("Description must be 70–160 chars."),
            r.max(155).warning("Aim for ~155 chars."),
          ],
        }),
        defineField({ name: "canonicalUrl", title: "Canonical URL", type: "string",
          description: "Override the canonical URL for this page. Leave blank to use the default. E.g. https://printai.cloud/products/chatbots" }),
        defineField({ name: "customSchema", title: "Custom Schema (JSON-LD)", type: "text", rows: 10,
          description: "Advanced / SEO team: paste a full JSON-LD object to OVERRIDE this page's built-in schema. With or without <script> tags. Leave empty to keep the automatic schema." }),
      ],
    }),
  ],
});
