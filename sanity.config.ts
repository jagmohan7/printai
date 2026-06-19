import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool, defineLocations, defineDocuments } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { HomeIcon, DocumentsIcon, CogIcon, EyeOpenIcon, PackageIcon, ComponentIcon, FolderIcon } from "@sanity/icons";
import { schemaTypes } from "./sanity/schemas";
import StudioLogo from "./sanity/components/StudioLogo";
import StudioLayout from "./sanity/components/StudioLayout";
import FormInputWrapper from "./sanity/components/FormInputWrapper";
import {
  DOC_ID_TO_URL,
  DOC_ID_TO_LABEL,
  LANDING_PAGE_IDS,
} from "./sanity/lib/docRoutes";

// ── Preview origin (the live Next.js app this studio edits) ─────────────────
const PREVIEW_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof window !== "undefined" ? window.location.origin : "http://localhost:3002");

export default defineConfig({
  name:      "printai",
  title:     "PrintAI Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath:  "/admin",

  // ── Custom branding ────────────────────────────────────────────────────────
  studio: {
    components: {
      logo:   StudioLogo,
      layout: StudioLayout,
    },
  },

  // ── Custom form input wrapper (injects PageHeaderField above the form) ────
  form: {
    components: {
      input: FormInputWrapper,
    },
  },

  // ── Global "+" create menu — only allow creating Flexible Pages ───────────
  // Every other page (Homepage, AI Chatbot, Case Studies, etc.) is a
  // SINGLETON — it exists once and is edited from its fixed sidebar entry.
  // This stops editors from accidentally creating duplicate page documents.
  document: {
    newDocumentOptions: (prev) =>
      prev.filter((tpl) => tpl.templateId === "flexPage"),
  },

  // ── Custom sidebar navigation ──────────────────────────────────────────────
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("PrintAI CMS")
          .items([

            // ── Homepage singleton ─────────────────────────────────────────
            S.listItem()
              .title("🏠  Homepage")
              .icon(HomeIcon)
              .child(
                S.document()
                  .title("Homepage Content")
                  .schemaType("homepage")
                  .documentId("homepage")
              ),

            S.divider(),

            // ══ PRODUCTS ═══════════════════════════════════════════════════
            // Section header — opens the first product when clicked (no column).
            S.listItem()
              .id("hdr-products")
              .title("▸  PRODUCTS")
              .icon(PackageIcon)
              .child(
                S.document().title("AI Chatbot").schemaType("chatbotsPage").documentId("chatbots-page")
              ),
            S.listItem()
              .title("🤖  AI Chatbot")
              .icon(DocumentsIcon)
              .child(
                S.document().title("AI Chatbot").schemaType("chatbotsPage").documentId("chatbots-page")
              ),
            S.listItem()
              .title("🖨️  Web-to-Print Platform")
              .icon(DocumentsIcon)
              .child(
                S.document().title("Web-to-Print").schemaType("webToPrintPage").documentId("web-to-print-page")
              ),

            S.divider(),

            // ══ SERVICES ═══════════════════════════════════════════════════
            S.listItem()
              .id("hdr-services")
              .title("▸  SERVICES")
              .icon(ComponentIcon)
              .child(
                S.document().title("Automation").schemaType("automationPage").documentId("automation-page")
              ),
            S.listItem()
              .title("⚙️  Print Workflow Automation")
              .icon(DocumentsIcon)
              .child(
                S.document().title("Automation").schemaType("automationPage").documentId("automation-page")
              ),
            S.listItem()
              .title("🖥️  DevOps")
              .icon(DocumentsIcon)
              .child(
                S.document().title("DevOps").schemaType("devopsPage").documentId("devops-page")
              ),
            S.listItem()
              .title("🧠  Custom AI Development")
              .icon(DocumentsIcon)
              .child(
                S.document().title("Custom AI").schemaType("customAiPage").documentId("custom-ai-page")
              ),

            S.divider(),

            // ══ CONTENT ════════════════════════════════════════════════════
            S.listItem()
              .id("hdr-content")
              .title("▸  CONTENT")
              .icon(FolderIcon)
              .child(
                S.document().title("Case Studies").schemaType("caseStudiesPage").documentId("case-studies-page")
              ),
            S.listItem()
              .title("📈  Case Studies")
              .icon(DocumentsIcon)
              .child(
                S.document().title("Case Studies").schemaType("caseStudiesPage").documentId("case-studies-page")
              ),
            S.listItem()
              .title("📚  Resources")
              .icon(DocumentsIcon)
              .child(
                S.document().title("Resources").schemaType("resourcesPage").documentId("resources-page")
              ),

            S.divider(),

            // ══ FLEXIBLE PAGES (page builder — editors create new pages) ═══
            S.listItem()
              .id("flex-pages")
              .title("➕  Add Page")
              .icon(DocumentsIcon)
              .child(
                S.documentTypeList("flexPage")
                  .title("Add Page")
                  .defaultOrdering([{ field: "title", direction: "asc" }])
              ),

            S.divider(),

            // ── Site Settings ──────────────────────────────────────────────
            S.listItem()
              .title("⚙️  Site Settings")
              .icon(CogIcon)
              .child(
                S.document()
                  .title("Navbar & Footer")
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
          ]),
    }),

    // ── Presentation Tool ──────────────────────────────────────────────────
    // Side-by-side editor + live preview iframe.
    //
    // Phase 4b is live: previewMode.enable points to the draft-mode route,
    // which turns on Next.js draft mode and serves stega-encoded content.
    // Combined with <VisualEditing /> + <SanityLive /> in the root layout,
    // editors get:
    //   - Unsaved drafts visible in the preview iframe
    //   - Live updates: typing in a field re-renders the iframe instantly
    //   - Click-to-edit: clicking text in the iframe opens that field
    presentationTool({
      name:  "preview",
      title: "Live Preview",
      icon:  EyeOpenIcon,
      previewUrl: {
        origin: PREVIEW_URL,
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },

      resolve: {
        // ── locations: shown as "Used on these pages" in the doc editor ───
        // Same resolver shape reused across every landing-page schema type:
        // pull id + label hints and map back to the live URL.
        locations: Object.fromEntries(
          (["homepage", "chatbotsPage", "webToPrintPage", "automationPage", "devopsPage", "customAiPage", "caseStudiesPage", "resourcesPage"] as const).map(
            (typeName) => [
              typeName,
              defineLocations({
                select: { id: "_id", pageLabel: "pageLabel", seoTitle: "seo.title" },
                resolve: (doc) => {
                  const id  = (doc?.id || "").replace(/^drafts\./, "");
                  const url = DOC_ID_TO_URL[id]   ?? "/";
                  const lbl = doc?.pageLabel || doc?.seoTitle || DOC_ID_TO_LABEL[id] || "Page";
                  return { locations: [{ title: lbl, href: url }] };
                },
              }),
            ]
          )
        ) as Record<string, ReturnType<typeof defineLocations>>,

        // ── mainDocuments: clicking inside the iframe finds the doc ───────
        // Maps live URLs back to Sanity doc IDs so the iframe → editor link
        // works for every landing page.
        mainDocuments: defineDocuments(
          LANDING_PAGE_IDS.map((id) => ({
            route:  DOC_ID_TO_URL[id],
            filter: `_id == "${id}" || _id == "drafts.${id}"`,
          }))
        ),
      },
    }),

    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
