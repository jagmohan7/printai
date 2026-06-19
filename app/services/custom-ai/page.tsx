import type { Metadata } from "next";
import Script from "next/script";
import CustomAIHeroSection      from "@/components/sections/custom-ai/CustomAIHeroSection";
import CustomAIProblemsSection   from "@/components/sections/custom-ai/CustomAIProblemsSection";
import CustomAISystemsSection    from "@/components/sections/custom-ai/CustomAISystemsSection";
import CustomAIProcessSection    from "@/components/sections/custom-ai/CustomAIProcessSection";
import CustomAIStatsSection      from "@/components/sections/custom-ai/CustomAIStatsSection";
import CustomAIIncludedSection   from "@/components/sections/custom-ai/CustomAIIncludedSection";
import CustomAIComparisonSection from "@/components/sections/custom-ai/CustomAIComparisonSection";
import SolutionFaqSection from "@/components/shared/SolutionFaqSection";
import SolutionCtaSection  from "@/components/shared/SolutionCtaSection";
import type { SolutionCtaDefaults } from "@/components/shared/SolutionCtaSection";
import type { FaqItem }             from "@/components/shared/SolutionFaqSection";

const CUSTOM_AI_FAQ: { heading: string; highlightWord: string; faqs: FaqItem[] } = {
  heading:       "Frequently Asked Questions",
  highlightWord: "Questions",
  faqs: [
    { question: "What makes custom AI different from off-the-shelf tools?",  answer: "Custom AI is trained on your specific pricing logic, production rules, and customer workflows — not generic patterns from unrelated industries. It knows what a bleed margin is, how rush orders affect pricing, and how your MIS works." },
    { question: "How long does it take to build a custom AI system?",         answer: "Typical projects take 4–10 weeks from scoping to deployment, depending on data availability and integration complexity." },
    { question: "Do I need technical staff to run it?",                      answer: "No. We build the system, handle deployment, and provide training so your team can operate it without any technical knowledge." },
    { question: "What data do you need to train the AI?",                    answer: "Usually your historical order data, pricing rules, product catalogue, and customer FAQs. We work with whatever you have — even partial data sets produce strong results." },
    { question: "Can the AI integrate with my existing print software?",     answer: "Yes — we build API integrations with ERPNext, Printsmith, Tharstern, and most web-to-print platforms so the AI works within your existing workflow, not alongside it." },
  ],
};

const CUSTOM_AI_CTA: SolutionCtaDefaults = {
  badge:         "GET STARTED",
  heading:       "Ready to build AI on your terms?",
  highlightWord: "on your terms?",
  description:   "Get AI trained on your workflows, your pricing logic, and your production rules — not borrowed from a generic SaaS platform.",
  primaryText:   "Book a Scoping Call",
  primaryHref:   "/#contact",
  secondaryText: "Talk to Sales",
  secondaryHref: "/#contact",
  trustPoints:   ["Free scoping call", "Fixed-price project", "No vendor lock-in"],
};
import { getCustomAiPage } from "@/lib/sanity.queries";
import CustomSchema, { hasCustomSchema } from "@/components/CustomSchema";

// Re-fetch CMS content every 5 seconds (auto-revalidation for live updates)
export const revalidate = 5;

import { buildProductMetadata } from "@/lib/page-metadata";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb-schema";

const TITLE       = "Custom AI Systems Built for Print — Not Borrowed From SaaS";
const DESCRIPTION = "Build AI systems trained on your workflows, your pricing logic, and your production rules — not generic tools that don't understand print.";
const PATH        = "/services/custom-ai";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCustomAiPage();
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
  { name: "Custom AI Systems", path: PATH },
]);

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PrintAI Custom AI Systems",
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
      name: "What makes custom AI different from off-the-shelf tools?",
      acceptedAnswer: { "@type": "Answer", text: "Custom AI is trained on your specific pricing logic, production rules, and customer workflows — not generic patterns from unrelated industries. It knows what a bleed margin is, how rush orders affect pricing, and how your specific MIS works." },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a custom AI system?",
      acceptedAnswer: { "@type": "Answer", text: "Typical projects take 4–10 weeks from scoping to deployment, depending on data availability and integration complexity." },
    },
    {
      "@type": "Question",
      name: "Do I need technical staff to run it?",
      acceptedAnswer: { "@type": "Answer", text: "No. We build the system, handle deployment, and provide training so your team can operate it without technical knowledge." },
    },
  ],
};

export default async function CustomAIPage() {
  const cms = await getCustomAiPage();
  return (
    <>
      {hasCustomSchema(cms?.seo?.customSchema) ? (
        <CustomSchema raw={cms?.seo?.customSchema} />
      ) : (
        <>
          <Script id="ld-breadcrumb-custom-ai" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          <Script id="ld-product-custom-ai"    type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
          <Script id="ld-faq-custom-ai"        type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        </>
      )}
      <>
        <CustomAIHeroSection       data={cms?.hero} />
        <CustomAIProblemsSection   data={cms?.problems} />
        <CustomAISystemsSection    data={cms?.systems} />
        <CustomAIProcessSection    data={cms?.process} />
        <CustomAIStatsSection      data={cms?.stats} />
        <CustomAIIncludedSection   data={cms?.included} />
        <CustomAIComparisonSection data={cms?.comparison} />
        <SolutionCtaSection defaults={CUSTOM_AI_CTA} data={cms?.sharedCta} />
        <SolutionFaqSection data={cms?.faq} defaults={CUSTOM_AI_FAQ} />
      </>
    </>
  );
}
