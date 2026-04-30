import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WhySection from "@/components/sections/WhySection";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "PrintAI – AI-Powered Automation for Printing Businesses",
  description:
    "AI chatbots, ERPNext integration, and end-to-end print workflow automation built for print shops. Capture more leads, reduce touch-time, and ship faster.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "PrintAI – AI-Powered Automation for Printing Businesses",
    description:
      "AI chatbots, ERPNext integration, and end-to-end print workflow automation built for print shops.",
  },
  twitter: {
    title: "PrintAI – AI-Powered Automation for Printing Businesses",
    description:
      "AI chatbots, ERPNext integration, and end-to-end print workflow automation built for print shops.",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhySection />
      <ContactSection />
    </>
  );
}
