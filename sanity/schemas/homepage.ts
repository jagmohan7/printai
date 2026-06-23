import { defineType, defineField } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";
import SeoPreviewField from "../components/SeoPreviewField";

export const homepage = defineType({
  name:  "homepage",
  title: "Landing Page",
  type:  "document",
  icon:  DocumentTextIcon,

  // ── Preview ───────────────────────────────────────────────────────────────
  // Reads real content so each page shows its own headline in the editor
  // header instead of the static "Homepage Content / Untitled" label.
  // Priority: pageLabel → seo.title → hero.heading → fallback string.
  preview: {
    select: {
      pageLabel:   "pageLabel",
      seoTitle:    "seo.title",
      heroHeading: "hero.heading",
    },
    prepare({ pageLabel, seoTitle, heroHeading }) {
      return {
        title:    pageLabel || seoTitle || heroHeading || "Untitled Landing Page",
        subtitle: "Landing Page",
        media:    DocumentTextIcon,
      };
    },
  },

  // ── Tabs ──────────────────────────────────────────────────────────────────
  // Titles kept short (1-2 words) with field-count suffix so editors can see
  // section size at a glance. Counts reflect top-level sub-fields per group.
  groups: [
    { name: "meta",     title: "⚙️ Info" },
    { name: "hero",     title: "🚀 Hero",          default: true },
    { name: "stats",    title: "📊 Stats" },
    { name: "about",    title: "🏢 About (7)" },
    { name: "services", title: "🛠️ Solutions" },
    { name: "how",      title: "🔧 How It Works" },
    { name: "blogs",    title: "📰 Blog" },
    { name: "testimonials", title: "⭐ Testimonials" },
    { name: "contact",  title: "📬 Contact (7)" },
    { name: "seo",      title: "🔍 SEO (2)" },
  ],

  fields: [

    // ── PAGE INFO (CMS-only metadata, never rendered on the live site) ──────
    defineField({
      name: "pageLabel",
      title: "Internal Page Name",
      type: "string",
      group: "meta",
      description:
        "Used in the CMS sidebar and editor header only — not shown on the website. " +
        "If left blank, the SEO title or Hero heading is used instead. " +
        "E.g. 'AI Chatbot Landing Page'.",
    }),


    // ── HERO ─────────────────────────────────────────────────────────────────
    defineField({
      name: "hero", title: "Hero Section", type: "object", group: "hero",
      description:
        "Top of the page — the editor's first impression. Headline, subheading, " +
        "primary CTA + secondary CTA, and social links. Keep the heading short and " +
        "punchy (under 10 words).",
      fields: [
        defineField({ name: "badge", title: "Badge Text", type: "string",
          description: "Small pill label above the heading. E.g. 'Leading AI Automation in Printing Industry'",
          validation: (Rule) => Rule.max(60).warning("Keep badges short — 60 chars or less.") }),
        defineField({ name: "heading", title: "Heading", type: "string",
          description: "Main headline. Keep it under 10 words.",
          validation: (Rule) => Rule.required().min(5).max(90).warning("Aim for under 70 chars / 10 words.") }),
        defineField({ name: "headingHighlight", title: "Highlight Word", type: "string",
          description: "One word from the heading to show in gradient colour. Must match exactly." }),
        defineField({ name: "subtext", title: "Subtext", type: "text", rows: 3,
          description: "Supporting sentence under the headline. 1–2 lines recommended.",
          validation: (Rule) => Rule.max(220).warning("Keep subtext under 220 chars for best mobile display.") }),
        defineField({ name: "primaryButtonText", title: "Primary Button Label", type: "string" }),
        defineField({ name: "primaryButtonHref", title: "Primary Button Link", type: "string",
          description: "Use /#contact for the contact section, or a full URL." }),
        defineField({ name: "secondaryButtonText", title: "Secondary Button Label", type: "string" }),
        defineField({ name: "secondaryButtonHref", title: "Secondary Button Link", type: "string" }),
        defineField({
          name: "review", title: "Google Review Card", type: "object",
          description: "Trust card under the hero buttons — the Google rating.",
          fields: [
            defineField({ name: "score", title: "Rating Score", type: "string", description: "E.g. 4.8" }),
            defineField({ name: "label", title: "Trust Label",  type: "string", description: "E.g. Trusted by 250+ Print Companies" }),
          ],
        }),
      ],
    }),

    // ── STATS ────────────────────────────────────────────────────────────────
    defineField({
      name: "stats", title: "Performance Stats", type: "object", group: "stats",
      description: "Thin stats band shown directly below the hero. 4 metrics recommended.",
      fields: [
        defineField({
          name: "items", title: "Stats", type: "array",
          description: "Each stat is a value + a label. 4 recommended.",
          of: [defineField({
            name: "stat", title: "Stat", type: "object",
            preview: { select: { title: "value", subtitle: "label" } },
            fields: [
              defineField({ name: "value", title: "Value", type: "string", description: "E.g. 85%, 300%, 120K+, 24/7" }),
              defineField({ name: "label", title: "Label", type: "string", description: "E.g. Faster Order Processing" }),
            ],
          })],
        }),
      ],
    }),

    // ── ABOUT ────────────────────────────────────────────────────────────────
    defineField({
      name: "about", title: "About Section", type: "object", group: "about",
      description:
        "Tells visitors who you are. Two paragraphs of intro copy + up to 4 highlight bullets " +
        "shown on the right-hand cards.",
      fields: [
        defineField({ name: "badge", title: "Badge Text", type: "string",
          validation: (Rule) => Rule.max(60).warning("Keep badges short.") }),
        defineField({ name: "heading", title: "Heading", type: "string",
          validation: (Rule) => Rule.required().max(90).warning("Headings under 90 chars read best.") }),
        defineField({ name: "headingHighlight", title: "Highlight Word", type: "string",
          description: "Must match a word in the heading exactly." }),
        defineField({ name: "subtext", title: "Subtext", type: "text", rows: 2 }),
        defineField({ name: "whoWeAreP1", title: "Who We Are — Paragraph 1", type: "text", rows: 4 }),
        defineField({ name: "whoWeAreP2", title: "Who We Are — Paragraph 2", type: "text", rows: 4,
          description: "Wrap any word in <strong>word</strong> to make it appear white and bold." }),
        defineField({
          name: "highlights", title: "Highlight Points", type: "array",
          description: "Up to 4 bullet points — render as a 2×2 checklist beside the story.",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "statBadge", title: "Floating Stat Card", type: "object",
          description: "Small card that floats over the About image. E.g. 250+ / print companies onboarded.",
          fields: [
            defineField({ name: "value", title: "Value", type: "string", description: "E.g. 250+" }),
            defineField({ name: "label", title: "Label", type: "string", description: "E.g. print companies onboarded" }),
          ],
        }),
        defineField({ name: "primaryButtonText",   title: "Primary Button Label", type: "string" }),
        defineField({ name: "primaryButtonHref",   title: "Primary Button Link",  type: "string" }),
        defineField({ name: "secondaryButtonText", title: "Secondary Button Label", type: "string" }),
        defineField({ name: "secondaryButtonHref", title: "Secondary Button Link",  type: "string" }),
      ],
    }),

    // ── SERVICES ─────────────────────────────────────────────────────────────
    defineField({
      name: "services", title: "Solutions Section", type: "object", group: "services",
      description:
        "The 3 headline solutions — AI Chatbot, Web-to-Print Platform, Workflow Automation. " +
        "Each card needs a title, icon, 1-sentence description, a page link, and up to 3 feature " +
        "bullets.",
      fields: [
        defineField({ name: "badge",            title: "Badge Text",    type: "string",
          validation: (Rule) => Rule.max(60).warning("Keep badges short.") }),
        defineField({ name: "heading",          title: "Heading",       type: "string",
          validation: (Rule) => Rule.required().max(90) }),
        defineField({ name: "subtext",          title: "Subtext",       type: "text", rows: 2 }),
        defineField({
          name: "cards", title: "Solution Cards", type: "array",
          description: "3 cards. Use titles 'AI Chatbot', 'Web-to-Print Platform', 'Workflow Automation' — the title controls the icon.",
          of: [defineField({
            name: "card", title: "Service Card", type: "object",
            preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "title",       title: "Title",       type: "string" }),
              defineField({
                name: "iconName", title: "Icon", type: "string",
                description: "Choose an icon for this card.",
                options: {
                  list: [
                    { title: "💬  Chat / Chatbot",          value: "MessagesSquare" },
                    { title: "🌐  Globe / Web",              value: "Globe" },
                    { title: "⚙️  Settings / Automation",    value: "Settings" },
                    { title: "🖥️  Server / DevOps",          value: "Server" },
                    { title: "🧠  Brain / AI",               value: "Brain" },
                    { title: "🚀  Rocket / Launch",          value: "Rocket" },
                    { title: "🛡️  Shield / Security",        value: "Shield" },
                    { title: "⚡  Zap / Speed",              value: "Zap" },
                    { title: "📊  Bar Chart / Analytics",    value: "BarChart2" },
                    { title: "💻  Code / Development",       value: "Code2" },
                    { title: "📦  Package / Logistics",      value: "Package" },
                    { title: "🖨️  Printer",                  value: "Printer" },
                    { title: "👥  Users / CRM",              value: "Users" },
                    { title: "💡  Lightbulb / Ideas",        value: "Lightbulb" },
                    { title: "🎯  Target / Goals",           value: "Target" },
                    { title: "☁️  Cloud / SaaS",             value: "Cloud" },
                    { title: "🔗  Link / Integration",       value: "Link2" },
                    { title: "📱  Mobile / App",             value: "Smartphone" },
                    { title: "🔒  Lock / Privacy",           value: "Lock" },
                  ],
                },
              }),
              defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
              defineField({ name: "href",        title: "Page Link",   type: "string",
                description: "E.g. /products/chatbots" }),
              defineField({ name: "badge",       title: "Card Badge",  type: "string",
                description: "Optional. E.g. 'Most Popular'. Leave blank for none." }),
              defineField({
                name: "features", title: "Features (3 bullet points)", type: "array",
                of: [{ type: "string" }],
              }),
            ],
          })],
        }),
      ],
    }),

    // ── HOW IT WORKS ───────────────────────────────────────────────────────────
    defineField({
      name: "how", title: "How It Works Section", type: "object", group: "how",
      description: "4-step timeline (Connect → Configure → Automate → Scale).",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow Label", type: "string", initialValue: "How It Works" }),
        defineField({ name: "heading", title: "Heading", type: "string", initialValue: "From Inquiry to Production",
          validation: (Rule) => Rule.max(90) }),
        defineField({
          name: "steps", title: "Steps", type: "array",
          description: "4 steps recommended. Title 'Connect', 'Configure', 'Automate', 'Scale' controls the icon.",
          of: [defineField({
            name: "step", title: "Step", type: "object",
            preview: { select: { title: "title", subtitle: "description" } },
            fields: [
              defineField({ name: "title",       title: "Title",       type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            ],
          })],
        }),
      ],
    }),

    // ── BLOG ─────────────────────────────────────────────────────────────────
    defineField({
      name: "blogs", title: "Blog Section", type: "object", group: "blogs",
      description: "Heading + view-all link only. The 3 cards are pulled automatically from the latest Resources → Industry Insights — no double entry.",
      fields: [
        defineField({ name: "eyebrow",     title: "Eyebrow Label", type: "string", initialValue: "From the Blog" }),
        defineField({ name: "heading",     title: "Heading", type: "string", initialValue: "Insights for modern print businesses",
          validation: (Rule) => Rule.max(90) }),
        defineField({ name: "viewAllText", title: "View-All Link Text", type: "string", initialValue: "View all articles" }),
        defineField({ name: "viewAllHref", title: "View-All Link URL",  type: "string", initialValue: "/resources" }),
      ],
    }),

    // ── TESTIMONIALS ───────────────────────────────────────────────────────────
    defineField({
      name: "testimonials", title: "Testimonials Section", type: "object", group: "testimonials",
      description: "Aggregate Google score + a grid of review cards. Reviews are entered manually here.",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow Label", type: "string", initialValue: "Testimonials" }),
        defineField({ name: "heading", title: "Heading", type: "string", initialValue: "Loved by print businesses",
          validation: (Rule) => Rule.max(90) }),
        defineField({
          name: "rating", title: "Aggregate Google Rating", type: "object",
          fields: [
            defineField({ name: "score", title: "Score", type: "string", description: "E.g. 4.8" }),
            defineField({ name: "count", title: "Review Count", type: "string", description: "E.g. 320+" }),
          ],
        }),
        defineField({
          name: "reviews", title: "Reviews", type: "array",
          description: "Each review: quote + author name + role. 3 or 6 reads best.",
          of: [defineField({
            name: "review", title: "Review", type: "object",
            preview: { select: { title: "authorName", subtitle: "quote" } },
            fields: [
              defineField({ name: "quote",      title: "Quote",       type: "text", rows: 3 }),
              defineField({ name: "authorName", title: "Author Name", type: "string" }),
              defineField({ name: "authorRole", title: "Author Role", type: "string", description: "E.g. Owner, Apex Press" }),
            ],
          })],
        }),
      ],
    }),

    // ── CONTACT ──────────────────────────────────────────────────────────────
    defineField({
      name: "contact", title: "Contact Section", type: "object", group: "contact",
      description:
        "Bottom-of-page contact block — heading, email, social links, and the lead form. " +
        "Form fields can be toggled (Company / Service) and field labels customised.",
      fields: [
        defineField({ name: "badge",            title: "Badge Text",    type: "string",
          validation: (Rule) => Rule.max(60).warning("Keep badges short.") }),
        defineField({ name: "heading",          title: "Heading",       type: "string",
          validation: (Rule) => Rule.required().max(90) }),
        defineField({ name: "headingHighlight", title: "Highlight Word", type: "string",
          description: "Must match a word in the heading exactly." }),
        defineField({ name: "subtext",          title: "Subtext",       type: "text", rows: 2,
          validation: (Rule) => Rule.max(220) }),
        defineField({ name: "email",            title: "Contact Email", type: "string",
          description: "Shown on the page and used as a mailto: link.",
          validation: (Rule) =>
            Rule.required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: "email", invert: false })
              .error("Must be a valid email address.") }),
        defineField({
          name: "socials", title: "Social Links", type: "array",
          description: "Labels must be exactly: LinkedIn, Twitter, Facebook, or Instagram.",
          of: [defineField({
            name: "social", title: "Social", type: "object",
            fields: [
              defineField({ name: "label", title: "Platform", type: "string" }),
              defineField({ name: "href",  title: "URL",      type: "url" }),
            ],
          })],
        }),
        defineField({
          name: "form", title: "Contact Form", type: "object",
          description: "Customise form field labels and button text.",
          fields: [
            defineField({ name: "nameLabel",      title: "Name Field Label",     type: "string" }),
            defineField({ name: "emailLabel",     title: "Email Field Label",    type: "string" }),
            defineField({ name: "companyLabel",   title: "Company Field Label",  type: "string" }),
            defineField({ name: "showCompany",    title: "Show Company Field",   type: "boolean" }),
            defineField({ name: "serviceLabel",   title: "Service Field Label",  type: "string" }),
            defineField({ name: "showService",    title: "Show Service Field",   type: "boolean" }),
            defineField({ name: "messageLabel",   title: "Message Field Label",  type: "string" }),
            defineField({ name: "buttonText",     title: "Submit Button Text",   type: "string" }),
            defineField({ name: "successMessage", title: "Success Message",      type: "string",
              description: "Shown after the form is submitted successfully." }),
          ],
        }),
      ],
    }),

    // ── SEO ──────────────────────────────────────────────────────────────────
    defineField({
      name: "seo", title: "SEO", type: "object", group: "seo",
      description:
        "How this page appears in Google search results. The live preview above updates " +
        "as you type — Google truncates titles around 60 chars and descriptions around 160 chars.",
      fields: [

        // ── Live Google SERP preview (read-only, top of SEO tab) ────────
        defineField({
          name: "seoPreview",
          title: " ",
          type: "string",
          readOnly: true,
          components: { field: SeoPreviewField },
        }),

        defineField({ name: "title", title: "Page Title", type: "string",
          description: "Shown in browser tab and Google search results. Keep under 60 characters for best display.",
          validation: (Rule) => [
            Rule.required().min(10).max(60).error("Title must be 10–60 characters."),
            Rule.max(50).warning("Aim for ~50 chars so Google doesn't truncate."),
          ],
        }),
        defineField({ name: "description", title: "Meta Description", type: "text", rows: 2,
          description: "Shown in Google search results. Keep under 160 characters for best display.",
          validation: (Rule) => [
            Rule.required().min(70).max(160).error("Description must be 70–160 characters."),
            Rule.max(155).warning("Aim for ~155 chars to avoid Google truncation."),
          ],
        }),
        defineField({ name: "customSchema", title: "Custom Schema (JSON-LD)", type: "text", rows: 10,
          description: "Advanced / SEO team: paste a full JSON-LD object to ADD a page-specific schema. With or without <script> tags. Leave empty to use only the global Organization + WebSite schema." }),
      ],
    }),

  ],
});
