import type { Metadata } from "next";
import HeroSection         from "@/components/sections/HeroSection";
import StatsSection        from "@/components/sections/StatsSection";
import AboutSection        from "@/components/sections/AboutSection";
import SolutionsSection    from "@/components/sections/SolutionsSection";
import HowItWorksSection   from "@/components/sections/HowItWorksSection";
import BlogsSection        from "@/components/sections/BlogsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection      from "@/components/sections/ContactSection";
import { getHomepage, getLatestResources } from "@/lib/sanity.queries";
import CustomSchema from "@/components/CustomSchema";

// Re-fetch CMS content every 5 seconds (auto-revalidation for live updates)
export const revalidate = 5;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomepage();
  const title       = data?.seo?.title       ?? "PrintAI – AI-Powered Automation for Printing Businesses";
  const description = data?.seo?.description ?? "AI chatbots and end-to-end print workflow automation built for print shops.";

  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph:  { url: "/", title, description },
    twitter:    { title, description },
  };
}

export default async function HomePage() {
  const [data, latestPosts] = await Promise.all([
    getHomepage(),
    getLatestResources(3),
  ]);

  // Blogs band stores heading/view-all in CMS; cards come from Resources.
  const blogs = { ...(data?.blogs ?? {}), posts: latestPosts };

  return (
    <>
      {/* Optional page-specific schema pasted by the SEO team (global Organization */}
      {/* + WebSite schema always lives in layout.tsx). */}
      <CustomSchema raw={data?.seo?.customSchema} />
      <HeroSection         data={data?.hero} />
      <StatsSection        data={data?.stats} />
      <AboutSection        data={data?.about} />
      <SolutionsSection    data={data?.services} />
      <HowItWorksSection   data={data?.how} />
      <BlogsSection        data={blogs} />
      <TestimonialsSection data={data?.testimonials} />
      <ContactSection      data={data?.contact} />
    </>
  );
}
