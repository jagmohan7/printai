import type { Metadata } from "next";
import Script from "next/script";
import DevOpsHeroSection       from "@/components/sections/devops/DevOpsHeroSection";
import DevOpsBuiltForSection    from "@/components/sections/devops/DevOpsBuiltForSection";
import DevOpsDifferenceSection  from "@/components/sections/devops/DevOpsDifferenceSection";
import DevOpsProblemsSection    from "@/components/sections/devops/DevOpsProblemsSection";
import DevOpsCostSection        from "@/components/sections/devops/DevOpsCostSection";
import DevOpsServicesSection    from "@/components/sections/devops/DevOpsServicesSection";
import DevOpsStatsSection       from "@/components/sections/devops/DevOpsStatsSection";
import DevOpsBenefitsSection    from "@/components/sections/devops/DevOpsBenefitsSection";
import DevOpsImpactSection      from "@/components/sections/devops/DevOpsImpactSection";
import DevOpsProcessSection     from "@/components/sections/devops/DevOpsProcessSection";
import DevOpsCtaSection         from "@/components/sections/devops/DevOpsCtaSection";
import { getDevopsPage } from "@/lib/sanity.queries";
import CustomSchema, { hasCustomSchema } from "@/components/CustomSchema";

// Re-fetch CMS content every 5 seconds (auto-revalidation for live updates)
export const revalidate = 5;

import { buildProductMetadata } from "@/lib/page-metadata";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb-schema";

const TITLE       = "DevOps Support for Print Businesses";
const DESCRIPTION = "Ensure your print systems stay fast, stable, and secure — even under heavy file uploads, traffic spikes, and complex workflows.";
const PATH        = "/services/devops";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getDevopsPage();
  return buildProductMetadata({
    cmsTitle:      cms?.seo?.title,
    cmsDesc:       cms?.seo?.description,
    fallbackTitle: TITLE,
    fallbackDesc:  DESCRIPTION,
    path:          PATH,
  });
}

// DevOps lives under "Services" instead of "Products"
const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home",     path: "/" },
  { name: "Services", path: "/#services" },
  { name: "DevOps",   path: PATH },
]);

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PrintAI DevOps Support",
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
      name: "What DevOps services do you provide for print businesses?",
      acceptedAnswer: { "@type": "Answer", text: "We handle server setup, CI/CD pipelines, auto-scaling, monitoring, security hardening, and ongoing infrastructure management — all tailored for print workflows with large file handling and traffic spikes." },
    },
    {
      "@type": "Question",
      name: "Do you support cloud and on-premise deployments?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — we work with AWS, Google Cloud, Azure, and on-premise environments. We'll recommend the best fit based on your volume and compliance requirements." },
    },
    {
      "@type": "Question",
      name: "How quickly can you respond to infrastructure issues?",
      acceptedAnswer: { "@type": "Answer", text: "Our monitoring detects issues automatically with alerts. Critical issues get response within 1 hour, with 24/7 on-call support available on premium plans." },
    },
  ],
};

export default async function DevOpsPage() {
  const cms = await getDevopsPage();
  return (
    <>
      {hasCustomSchema(cms?.seo?.customSchema) ? (
        <CustomSchema raw={cms?.seo?.customSchema} />
      ) : (
        <>
          <Script id="ld-breadcrumb-devops" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          <Script id="ld-product-devops"    type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
          <Script id="ld-faq-devops"        type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        </>
      )}
      <>
        <DevOpsHeroSection       data={cms?.hero} />
        <DevOpsBuiltForSection   data={cms?.builtFor} />
        <DevOpsDifferenceSection data={cms?.difference} />
        <DevOpsProblemsSection   data={cms?.problems} />
        <DevOpsCostSection       data={cms?.costs} />
        <DevOpsServicesSection   data={cms?.services} />
        <DevOpsStatsSection      data={cms?.stats} />
        <DevOpsBenefitsSection   data={cms?.benefits} />
        <DevOpsImpactSection     data={cms?.impact} />
        <DevOpsProcessSection    data={cms?.process} />
        <DevOpsCtaSection        data={cms?.cta} />
      </>
    </>
  );
}
