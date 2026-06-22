import type { Metadata } from "next";
import Script from "next/script";
import HeroChatbots from "@/components/sections/chatbots/HeroChatbots";
import ProblemSection from "@/components/sections/chatbots/ProblemSection";
import HowItWorksSection from "@/components/sections/chatbots/HowItWorksSection";
import IncludedSection from "@/components/sections/chatbots/IncludedSection";
import ResultsSection from "@/components/sections/chatbots/ResultsSection";
import DemoSection from "@/components/sections/chatbots/DemoSection";
import SolutionFaqSection from "@/components/shared/SolutionFaqSection";
import SolutionCtaSection  from "@/components/shared/SolutionCtaSection";
import type { SolutionCtaDefaults } from "@/components/shared/SolutionCtaSection";
import type { FaqItem }             from "@/components/shared/SolutionFaqSection";

const CHATBOTS_FAQ: { heading: string; highlightWord: string; faqs: FaqItem[] } = {
  heading:       "Frequently Asked Questions",
  highlightWord: "Questions",
  faqs: [
    {
      question: "Will the chatbot replace my CSRs?",
      answer:   "No — PrintOpsAI's AI chatbot is designed to handle the repetitive 80%, so your CSRs can focus on the complex 20% that actually needs a human. Right now, the average print shop CSR spends 2–3 hours a day answering the same 30 questions: pricing for standard products, turnaround times, file spec requirements. Our chatbot handles all of these automatically, 24/7. Your CSRs become relationship managers — focusing on large custom jobs, enterprise accounts, and the conversations that build long-term client loyalty. Most clients find their team is less stressed and more productive within 30 days.",
    },
    {
      question: "How accurate is the chatbot's print pricing?",
      answer:   "PrintOpsAI's chatbot quotes from your exact price book — not an estimate, not a generic template. If your pricing says 500 business cards (4/4, gloss laminate, 3-day turnaround) is $89, the chatbot quotes $89. Every time. Unlike generic chatbots that say 'contact us for a quote,' PrintOpsAI is trained on your specific pricing tiers, rush premiums, quantity breaks, and substrate options. Price updates are reflected in the chatbot within 24 hours. Our clients report that chatbot-generated quotes are consistent with human quotes 97%+ of the time — and they're available at 2am on a Sunday.",
    },
    {
      question: "How long does setup take?",
      answer:   "Most print shops have a live, trained AI chatbot on their website within 48–72 hours of providing their setup materials. What we need from you: your current price book (any format), your product catalogue, standard turnaround times, rush pricing, and any FAQs your team currently answers manually. Our team handles all the AI training, deployment, and testing. You review and approve. We go live. The typical timeline from first conversation to live chatbot is under 3 business days — including weekends. There is no coding required on your side and no disruption to your existing website.",
    },
    {
      question: "Can it integrate with my existing tools?",
      answer:   "Yes — PrintOpsAI's chatbot integrates with your existing CRM, print MIS, and workflow software out of the box. Every lead, quote, and conversation is pushed to your CRM automatically. If you use a print MIS for job management, quotes can be converted to job tickets without manual re-entry. We support integrations with major CRMs (HubSpot, Zoho, Salesforce), email platforms (Klaviyo, Mailchimp), and can connect to most print workflow tools via API. For shops running custom MIS systems, our DevOps team handles the custom integration.",
    },
    {
      question: "What if it gives a wrong quote or wrong answer?",
      answer:   "PrintOpsAI's chatbot is designed to know the limits of what it knows. For standard products in your catalogue, it quotes from your exact price book — so errors only occur if the price book itself is wrong. For complex or out-of-catalogue jobs, the chatbot does not guess. It collects the relevant information (size, quantity, substrate, finish, deadline) and routes to your sales team with a complete brief — clearly labelling it as a job that needs human review. We also include monthly accuracy reviews: our team reviews conversation logs, identifies any gaps or errors, and retrains the model. Most accuracy issues are caught and corrected within the first 30 days.",
    },
    {
      question: "How much does a print shop AI chatbot cost?",
      answer:   "PrintOpsAI's AI chatbot is available as a monthly subscription with pricing based on conversation volume and the number of channels deployed. Our entry-level plan covers up to 500 conversations per month on your website — sufficient for most mid-size commercial print shops. Enterprise plans covering unlimited conversations, WhatsApp, email, and custom CRM integrations are available for higher-volume operations. We offer a free 30-minute demo where we walk through your current enquiry volume, identify the ROI opportunity, and recommend the right plan. Most clients recover the full monthly cost within the first week — from a single after-hours lead that would otherwise have gone unanswered.",
    },
  ],
};

const CHATBOTS_CTA: SolutionCtaDefaults = {
  badge:         "CONTINUE RESPONDING BEFORE COMPETITORS",
  heading:       "Stop Losing Leads to Inbox Lag",
  highlightWord: "Inbox Lag",
  description:   "Let AI handle the repetitive work so your team can focus on real jobs. Book a free 20-minute demo and see PrintOpsAI answer a real print enquiry from your type of shop — live, in front of you, no prep required.",
  primaryText:   "Book Free Audit",
  primaryHref:   "/#contact",
  secondaryText: "See Pricing",
  secondaryHref: "/#contact",
  trustPoints:   ["No credit card", "20-minute session", "Print-specific AI, not a generic tool"],
};
import { getChatbotsPage } from "@/lib/sanity.queries";
import CustomSchema, { hasCustomSchema } from "@/components/CustomSchema";

// Re-fetch CMS content every 5 seconds (auto-revalidation for live updates)
export const revalidate = 5;
import { buildProductMetadata } from "@/lib/page-metadata";
import { buildProductBreadcrumb } from "@/lib/breadcrumb-schema";

const TITLE = "AI Chatbot for Print Shops — 24/7 Quoting";
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
  name: "PrintOpsAI Chatbot",
  description: DESCRIPTION,
  brand: { "@type": "Brand", name: "PrintOpsAI" },
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
        text: "No — PrintOpsAI's AI chatbot handles the repetitive 80% so your CSRs can focus on the complex 20% that actually needs a human. Most clients find their team is less stressed and more productive within 30 days.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is the chatbot's print pricing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PrintOpsAI's chatbot quotes from your exact price book — not an estimate, not a generic template. Our clients report chatbot-generated quotes are consistent with human quotes 97%+ of the time, available 24/7.",
      },
    },
    {
      "@type": "Question",
      name: "How long does setup take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most print shops have a live, trained AI chatbot within 48–72 hours of providing setup materials. Our team handles all AI training, deployment, and testing — no coding required on your side.",
      },
    },
    {
      "@type": "Question",
      name: "Can it integrate with my existing tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — PrintOpsAI integrates with major CRMs (HubSpot, Zoho, Salesforce), print MIS platforms, and communication tools including WhatsApp Business. Custom integrations handled by our DevOps team.",
      },
    },
    {
      "@type": "Question",
      name: "What if it gives a wrong quote or wrong answer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For out-of-catalogue jobs, the chatbot collects all relevant details and routes to your sales team with a complete brief — it never guesses. Monthly accuracy reviews catch and correct any gaps within the first 30 days.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a print shop AI chatbot cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PrintOpsAI's AI chatbot is a monthly subscription based on conversation volume and channels deployed. Most clients recover the full monthly cost within the first week from a single after-hours lead. Book a free demo for a personalised quote.",
      },
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
      <SolutionCtaSection defaults={CHATBOTS_CTA} data={cms?.sharedCta} modalType="product" entityName="AI Chatbot" />
      <SolutionFaqSection data={cms?.faq} defaults={CHATBOTS_FAQ} />
    </>
  );
}
