import { homepage }     from "./homepage";
import { siteSettings } from "./siteSettings";

// ── Product page schemas (one per route under /products/...) ─────────────────
import { chatbotsPage }   from "./products/chatbotsPage";
import { webToPrintPage } from "./products/webToPrintPage";
import { erpnextPage }    from "./products/erpnextPage";
import { automationPage } from "./products/automationPage";
import { devopsPage }     from "./products/devopsPage";
import { customAiPage }   from "./products/customAiPage";

// ── Other content pages ──────────────────────────────────────────────────────
import { caseStudiesPage } from "./caseStudiesPage";
import { resourcesPage }   from "./resourcesPage";

// ── Page builder (Flexible Pages + section blocks) ───────────────────────────
import { flexPage }   from "./flexPage";
import { pageBlocks } from "./pageBlocks";

export const schemaTypes = [
  homepage,
  siteSettings,
  chatbotsPage,
  webToPrintPage,
  erpnextPage,
  automationPage,
  devopsPage,
  customAiPage,
  caseStudiesPage,
  resourcesPage,
  flexPage,
  ...pageBlocks,
];
