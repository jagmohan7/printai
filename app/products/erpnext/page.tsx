import type { Metadata } from "next";
import Script from "next/script";
import ERPHeroSection      from "@/components/sections/erpnext/ERPHeroSection";
import ERPPainSection      from "@/components/sections/erpnext/ERPPainSection";
import ERPWhySection       from "@/components/sections/erpnext/ERPWhySection";
import ERPEverythingSection from "@/components/sections/erpnext/ERPEverythingSection";
import ERPProcessSection   from "@/components/sections/erpnext/ERPProcessSection";
import ERPStatsSection     from "@/components/sections/erpnext/ERPStatsSection";
import ERPComparisonSection from "@/components/sections/erpnext/ERPComparisonSection";
import ERPFaqSection       from "@/components/sections/erpnext/ERPFaqSection";
import ERPCtaSection       from "@/components/sections/erpnext/ERPCtaSection";
import { getErpnextPage } from "@/lib/sanity.queries";
import CustomSchema, { hasCustomSchema } from "@/components/CustomSchema";

// Re-fetch CMS content every 5 seconds (auto-revalidation for live updates)
export const revalidate = 5;

import { buildProductMetadata } from "@/lib/page-metadata";
import { buildProductBreadcrumb } from "@/lib/breadcrumb-schema";

const TITLE       = "ERPNext for Printers — One System Instead of Five";
const DESCRIPTION =
  "Replace QuickBooks, spreadsheets, and disconnected tools with a single ERPNext platform built for print shops — jobs, inventory, billing, and CRM in one place.";
const PATH = "/products/erpnext";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getErpnextPage();
  return buildProductMetadata({
    cmsTitle:      cms?.seo?.title,
    cmsDesc:       cms?.seo?.description,
    fallbackTitle: TITLE,
    fallbackDesc:  DESCRIPTION,
    path:          PATH,
  });
}

const breadcrumbSchema = buildProductBreadcrumb("ERPNext Integration", PATH);

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PrintAI ERPNext Integration",
  description: DESCRIPTION,
  brand: { "@type": "Brand", name: "PrintAI" },
  url: "https://printai.cloud/products/erpnext",
  image: "https://printai.cloud/logo.png",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is ERPNext really free?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — ERPNext is 100% open-source under the MIT license. You pay for implementation, customisation, and ongoing support, not for software licenses. There are no per-seat fees or vendor lock-in." },
    },
    {
      "@type": "Question",
      name: "Will I lose my QuickBooks history?",
      acceptedAnswer: { "@type": "Answer", text: "No. We migrate your historical data — customers, vendors, invoices, and chart of accounts — into ERPNext before go-live so nothing is left behind." },
    },
    {
      "@type": "Question",
      name: "How long does implementation take?",
      acceptedAnswer: { "@type": "Answer", text: "Typically 6–12 weeks depending on shop complexity. We run a parallel period so your team is confident before you fully cut over." },
    },
    {
      "@type": "Question",
      name: "Can it work with my existing MIS?",
      acceptedAnswer: { "@type": "Answer", text: "In many cases yes. ERPNext has REST APIs and we've built integrations with several print MIS platforms. We assess compatibility during the Discovery phase." },
    },
  ],
};

export default async function ERPNextPage() {
  const cms = await getErpnextPage();
  return (
    <>
      {hasCustomSchema(cms?.seo?.customSchema) ? (
        <CustomSchema raw={cms?.seo?.customSchema} />
      ) : (
        <>
          <Script id="ld-breadcrumb-erpnext" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          <Script id="ld-product-erpnext"    type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
          <Script id="ld-faq-erpnext"        type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        </>
      )}

      <ERPHeroSection       data={cms?.hero} />
      <ERPPainSection       data={cms?.pain} />
      <ERPWhySection        data={cms?.why} />
      <ERPEverythingSection data={cms?.everything} />
      <ERPProcessSection    data={cms?.process} />
      <ERPStatsSection      data={cms?.stats} />
      <ERPComparisonSection data={cms?.comparison} />
      <ERPFaqSection        data={cms?.faq} />
      <ERPCtaSection        data={cms?.cta} />
    </>
  );
}
