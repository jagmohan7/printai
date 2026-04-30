import type { Metadata } from "next";
import Script from "next/script";
import HeroAutomation from "@/components/sections/automation/HeroAutomation";
import PainPointsSection from "@/components/sections/automation/PainPointsSection";
import WhatWeAutomateSection from "@/components/sections/automation/WhatWeAutomateSection";
import BeforeAfterSection from "@/components/sections/automation/BeforeAfterSection";
import AutomationResultsSection from "@/components/sections/automation/AutomationResultsSection";
import IntegrationsSection from "@/components/sections/automation/IntegrationsSection";
import HowWeImplementSection from "@/components/sections/automation/HowWeImplementSection";
import AutomationCtaSection from "@/components/sections/automation/AutomationCtaSection";

const TITLE = "Print Workflow Automation";
const DESCRIPTION =
  "Automate order intake, prepress, scheduling, and fulfillment with systems built for real print operations — not generic workflows.";
const PATH = "/products/automation";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: PATH,
    title: `${TITLE} | PrintAI`,
    description: DESCRIPTION,
  },
  twitter: {
    title: `${TITLE} | PrintAI`,
    description: DESCRIPTION,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",     item: "https://printai.cloud/" },
    { "@type": "ListItem", position: 2, name: "Products", item: "https://printai.cloud/#services" },
    { "@type": "ListItem", position: 3, name: "Workflow Automation", item: "https://printai.cloud/products/automation" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PrintAI Workflow Automation",
  description: DESCRIPTION,
  brand: { "@type": "Brand", name: "PrintAI" },
  url: "https://printai.cloud/products/automation",
  image: "https://printai.cloud/logo.png",
};

export default function AutomationProductPage() {
  return (
    <>
      <Script id="ld-breadcrumb-automation" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="ld-product-automation"    type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      <HeroAutomation />
      <PainPointsSection />
      <WhatWeAutomateSection />
      <BeforeAfterSection />
      <AutomationResultsSection />
      <IntegrationsSection />
      <HowWeImplementSection />
      <AutomationCtaSection />
    </>
  );
}
