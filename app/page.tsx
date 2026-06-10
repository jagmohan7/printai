import type { Metadata } from "next";
import HeroSection      from "@/components/sections/HeroSection";
import AboutSection     from "@/components/sections/AboutSection";
import WhySection       from "@/components/sections/WhySection";
import ServicesSection  from "@/components/sections/ServicesSection";
import ContactSection   from "@/components/sections/ContactSection";
import { getHomepage }  from "@/lib/sanity.queries";
import CustomSchema from "@/components/CustomSchema";

// Re-fetch CMS content every 5 seconds (auto-revalidation for live updates)
export const revalidate = 5;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomepage();
  const title       = data?.seo?.title       ?? "PrintAI – AI-Powered Automation for Printing Businesses";
  const description = data?.seo?.description ?? "AI chatbots, ERPNext integration, and end-to-end print workflow automation built for print shops.";

  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph:  { url: "/", title, description },
    twitter:    { title, description },
  };
}

export default async function HomePage() {
  const data = await getHomepage();

  return (
    <>
      {/* Optional page-specific schema pasted by the SEO team (global Organization */}
      {/* + WebSite schema always lives in layout.tsx). */}
      <CustomSchema raw={data?.seo?.customSchema} />
      <HeroSection     data={data?.hero} />
      <AboutSection    data={data?.about} />
      <ServicesSection data={data?.services} />
      <WhySection      data={data?.why} />
      <ContactSection  data={data?.contact} />
    </>
  );
}
