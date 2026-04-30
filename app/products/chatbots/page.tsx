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

const TITLE = "AI Chatbots for Print Shops";
const DESCRIPTION =
  "AI chatbots trained on how your print shop actually quotes — answer pricing, turnaround, and file-spec questions instantly, and route complex jobs to your team.";
const PATH = "/products/chatbots";

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
    { "@type": "ListItem", position: 3, name: "AI Chatbots", item: "https://printai.cloud/products/chatbots" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PrintAI Chatbots",
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

export default function ChatbotsProductPage() {
  return (
    <>
      <Script id="ld-breadcrumb-chatbots" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="ld-product-chatbots"    type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <Script id="ld-faq-chatbots"        type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <HeroChatbots />
      <ProblemSection />
      <HowItWorksSection />
      <IncludedSection />
      <ResultsSection />
      <DemoSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
