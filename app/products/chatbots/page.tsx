import type { Metadata } from "next";
import Script from "next/script";
import HeroChatbots from "@/components/sections/chatbots/HeroChatbots";
import ProblemSection from "@/components/sections/chatbots/ProblemSection";
import HowItWorksSection from "@/components/sections/chatbots/HowItWorksSection";
import IncludedSection from "@/components/sections/chatbots/IncludedSection";
import ResultsSection from "@/components/sections/chatbots/ResultsSection";
import DemoSection from "@/components/sections/chatbots/DemoSection";
import FaqSection from "@/components/sections/chatbots/FaqSection";
import FinalCtaSection from "@/components/sections/chatbots/FinalCtaSection";
import { getChatbotsPage } from "@/lib/sanity.queries";
import CustomSchema, { hasCustomSchema } from "@/components/CustomSchema";

// Re-fetch CMS content every 5 seconds (auto-revalidation for live updates)
export const revalidate = 5;
import { buildProductMetadata } from "@/lib/page-metadata";
import { buildProductBreadcrumb } from "@/lib/breadcrumb-schema";

const TITLE = "AI Chatbot for Print Shops";
const DESCRIPTION =
  "AI chatbots trained on how your print shop actually quotes — answer pricing, turnaround, and file-spec questions instantly, and route complex jobs to your team.";
const PATH = "/products/chatbots";

// ── CMS-driven metadata: reads seo.title/seo.description from Sanity with ─
// ── hardcoded fallbacks. SEO team can override from the studio without dev. ─
export async function generateMetadata(): Promise<Metadata> {
  const cms = await getChatbotsPage();
  return buildProductMetadata({
    cmsTitle:      cms?.seo?.title,
    cmsDesc:       cms?.seo?.description,
    fallbackTitle: TITLE,
    fallbackDesc:  DESCRIPTION,
    path:          PATH,
  });
}

const breadcrumbSchema = buildProductBreadcrumb("AI Chatbot", PATH);

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PrintAI Chatbot",
  description: DESCRIPTION,
  brand: { "@type": "Brand", name: "PrintAI" },
  url: "https://printai.cloud/products/chatbots",
  image: "https://printai.cloud/logo.png",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Will the chatbot replace my CSRs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — it handles the repetitive 80% (pricing, turnaround, file specs) so your CSRs can focus on complex jobs and high-value customers.",
      },
    },
    {
      "@type": "Question",
      name: "How long does setup take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typical setup is under 5 business days — data collection, model training, channel integration, and a 24-hour quality review before going live.",
      },
    },
    {
      "@type": "Question",
      name: "Can it integrate with my existing tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — natively connects to Frappe/ERPNext, common CRMs, web chat, WhatsApp, email, and SMS. Custom systems via API and webhooks.",
      },
    },
    {
      "@type": "Question",
      name: "What if a customer asks something the AI doesn't know?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The bot gracefully escalates to your team with full context — chat transcript, customer details, and any files shared.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a contract or commitment?",
      acceptedAnswer: { "@type": "Answer", text: "Month-to-month with no long-term contract. Cancel anytime." },
    },
  ],
};

export default async function ChatbotsProductPage() {
  // Fetch CMS overrides — each section uses its data slice with hardcoded fallbacks.
  // If the CMS doc is empty / unsaved, sections render with their original text.
  const cms = await getChatbotsPage();

  return (
    <>
      {/* SEO team can paste custom JSON-LD in the CMS to override the built-in schema. */}
      {hasCustomSchema(cms?.seo?.customSchema) ? (
        <CustomSchema raw={cms?.seo?.customSchema} />
      ) : (
        <>
          <Script id="ld-breadcrumb-chatbots" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          <Script id="ld-product-chatbots"    type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
          <Script id="ld-faq-chatbots"        type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        </>
      )}

      {/* Every section accepts CMS data with hardcoded fallback. Editors can */}
      {/* add/remove problems, steps, features, stats, messages, FAQs, and    */}
      {/* support points dynamically — the grids auto-adapt to item count.    */}
      <HeroChatbots      data={cms?.hero} />
      <ProblemSection    data={cms?.problem} />
      <HowItWorksSection data={cms?.howItWorks} />
      <IncludedSection   data={cms?.included} />
      <ResultsSection    data={cms?.results} />
      <DemoSection       data={cms?.demo} />
      <FaqSection        data={cms?.faq} />
      <FinalCtaSection   data={cms?.finalCta} />
    </>
  );
}
