/**
 * Shared mapping between Sanity document IDs and the live routes / labels /
 * emoji icons / schema types used to represent them across the studio.
 *
 * Imported by:
 *   - sanity/components/PageHeaderField.tsx  (header banner)
 *   - sanity.config.ts                       (Presentation tool locations)
 *
 * Add a new entry here whenever a new landing-page doc is created.
 */

export const DOC_ID_TO_URL: Record<string, string> = {
  homepage:            "/",
  "chatbots-page":     "/products/chatbots",
  "web-to-print-page": "/products/web-to-print",
  // ── These 3 are SERVICES — moved from /products/* → /services/* ──
  "automation-page":   "/services/automation",
  "devops-page":       "/services/devops",
  "custom-ai-page":    "/services/custom-ai",
  // ── Other content pages ──
  "case-studies-page": "/case-studies",
  "resources-page":    "/blog",
};

export const DOC_ID_TO_EMOJI: Record<string, string> = {
  homepage:            "🏠",
  "chatbots-page":     "🤖",
  "web-to-print-page": "🖨️",
  "automation-page":   "⚙️",
  "devops-page":       "🖥️",
  "custom-ai-page":    "🧠",
  "case-studies-page": "📊",
  "resources-page":    "📚",
};

export const DOC_ID_TO_LABEL: Record<string, string> = {
  homepage:            "PrintOpsAI Homepage",
  "chatbots-page":     "AI Chatbot",
  "web-to-print-page": "Web-to-Print Platform",
  "automation-page":   "Print Workflow Automation",
  "devops-page":       "DevOps",
  "custom-ai-page":    "Custom AI Development",
  "case-studies-page": "Case Studies",
  "resources-page":    "Blog",
};

/**
 * Doc ID → Sanity schema type (`_type`).
 * Each page has its own dedicated schema.
 */
export const DOC_ID_TO_TYPE: Record<string, string> = {
  homepage:            "homepage",
  "chatbots-page":     "chatbotsPage",
  "web-to-print-page": "webToPrintPage",
  "automation-page":   "automationPage",
  "devops-page":       "devopsPage",
  "custom-ai-page":    "customAiPage",
  "case-studies-page": "caseStudiesPage",
  "resources-page":    "resourcesPage",
};

/**
 * Reverse map: live route → doc ID.
 * Used by Presentation tool's mainDocuments resolver so clicking inside the
 * preview iframe finds the right document to open in the editor pane.
 */
export const URL_TO_DOC_ID: Record<string, string> = Object.fromEntries(
  Object.entries(DOC_ID_TO_URL).map(([id, url]) => [url, id])
);

/** All doc IDs that are landing-page documents. */
export const LANDING_PAGE_IDS = Object.keys(DOC_ID_TO_URL);
