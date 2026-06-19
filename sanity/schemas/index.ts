import { homepage }     from "./homepage";
import { siteSettings } from "./siteSettings";

// ── Product page schemas (one per route under /products/...) ─────────────────
import { chatbotsPage }   from "./products/chatbotsPage";
import { webToPrintPage } from "./products/webToPrintPage";
import { automationPage } from "./products/automationPage";
import { devopsPage }     from "./products/devopsPage";
import { customAiPage }   from "./products/customAiPage";

// ── Other content pages ──────────────────────────────────────────────────────
import { aboutPage }       from "./aboutPage";
import { caseStudiesPage } from "./caseStudiesPage";
import { resourcesPage }   from "./resourcesPage";

// ── Page builder (Flexible Pages + section blocks) ───────────────────────────
import { flexPage }   from "./flexPage";
import { pageBlocks } from "./pageBlocks";

export const schemaTypes = [
  homepage,
  siteSettings,
  aboutPage,
  chatbotsPage,
  webToPrintPage,
  automationPage,
  devopsPage,
  customAiPage,
  caseStudiesPage,
  resourcesPage,
  flexPage,
  ...pageBlocks,
];
