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
import { getAutomationPage } from "@/lib/sanity.queries";
import CustomSchema, { hasCustomSchema } from "@/components/CustomSchema";

// Re-fetch CMS content every 5 seconds (auto-revalidation for live updates)
export const revalidate = 5;

import { buildProductMetadata } from "@/lib/page-metadata";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb-schema";

const TITLE = "Print Workflow Automation";
const DESCRIPTION =
  "Automate order intake, prepress, scheduling, and fulfillment with systems built for real print operations — not generic workflows.";
const PATH = "/services/automation";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getAutomationPage();
  return buildProductMetadata({
    cmsTitle:      cms?.seo?.title,
    cmsDesc:       cms?.seo?.description,
    fallbackTitle: TITLE,
    fallbackDesc:  DESCRIPTION,
    path:          PATH,
  });
}

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",     path: "/" },
  { name: "Services", path: "/#services" },
  { name: "Workflow Automation", path: PATH },
]);

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PrintAI Workflow Automation",
  description: DESCRIPTION,
  brand: { "@type": "Brand", name: "PrintAI" },
  url: `https://printai.cloud${PATH}`,
  image: "https://printai.cloud/logo.png",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What print workflows can you automate?",
      acceptedAnswer: { "@type": "Answer", text: "We automate order intake, prepress checks, job scheduling, press floor routing, shipping label generation, and customer status notifications — covering the full production lifecycle." },
    },
    {
      "@type": "Question",
      name: "Does it integrate with my existing MIS?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. We integrate with most print MIS platforms via API or direct database connection. We assess compatibility during the discovery phase." },
    },
    {
      "@type": "Question",
      name: "How long does implementation take?",
      acceptedAnswer: { "@type": "Answer", text: "Most automation projects deploy in 4–8 weeks. We run a parallel period so your team is confident before fully switching over." },
    },
  ],
};

export default async function AutomationProductPage() {
  const cms = await getAutomationPage();
  return (
    <>
      {hasCustomSchema(cms?.seo?.customSchema) ? (
        <CustomSchema raw={cms?.seo?.customSchema} />
      ) : (
        <>
          <Script id="ld-breadcrumb-automation" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          <Script id="ld-product-automation"    type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
          <Script id="ld-faq-automation"        type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        </>
      )}

      <HeroAutomation           data={cms?.hero} />
      <PainPointsSection        data={cms?.painPoints} />
      <WhatWeAutomateSection    data={cms?.whatWeAutomate} />
      <BeforeAfterSection       data={cms?.beforeAfter} />
      <AutomationResultsSection data={cms?.results} />
      <IntegrationsSection      data={cms?.integrations} />
      <HowWeImplementSection    data={cms?.implementation} />
      <AutomationCtaSection     data={cms?.cta} />
    </>
  );
}
