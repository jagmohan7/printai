import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight, FileText, Lightbulb, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Guides, insights, and documentation for AI automation in your printing business — best practices, ROI calculators, and implementation playbooks.",
  alternates: { canonical: "/resources" },
  openGraph: {
    type: "website",
    url: "/resources",
    title: "Resources | PrintAI",
    description:
      "Guides, insights, and documentation for AI automation in your printing business.",
  },
  twitter: {
    title: "Resources | PrintAI",
    description:
      "Guides, insights, and documentation for AI automation in your printing business.",
  },
};

const guides = [
  {
    title: "Getting Started with Print Automation",
    description:
      "A step-by-step guide to identifying automation opportunities in your print shop and building your first automated workflow.",
    readTime: "8 min read",
    tag: "Guide",
  },
  {
    title: "ERPNext Implementation Checklist",
    description:
      "Everything you need to prepare before, during, and after your ERPNext rollout — from data migration to team training.",
    readTime: "12 min read",
    tag: "Checklist",
  },
  {
    title: "Chatbot ROI Calculator Guide",
    description:
      "How to calculate the return on investment for deploying an AI chatbot in your printing business, with real benchmarks.",
    readTime: "6 min read",
    tag: "Guide",
  },
  {
    title: "Workflow Design Best Practices",
    description:
      "Learn how to map, optimize, and automate your print production workflows for maximum efficiency.",
    readTime: "10 min read",
    tag: "Best Practices",
  },
];

const insights = [
  {
    title: "The State of AI in Printing (2024)",
    description:
      "An overview of how AI is reshaping the printing industry — from automated prepress to intelligent customer service.",
    readTime: "15 min read",
    tag: "Industry Report",
  },
  {
    title: "Digital Transformation Roadmap for Printers",
    description:
      "A phased approach to modernizing your print business — prioritizing quick wins while building toward full digital operations.",
    readTime: "11 min read",
    tag: "Roadmap",
  },
];

const docs = [
  { title: "ERPNext Official Documentation", href: "#", external: true },
  { title: "Frappe Framework Reference", href: "#", external: true },
  { title: "PrintAI API Reference", href: "#", external: false },
  { title: "FAQ & Troubleshooting", href: "#", external: false },
];

const tagColors: Record<string, string> = {
  Guide: "bg-blue-50 text-blue-700",
  Checklist: "bg-green-50 text-green-700",
  "Best Practices": "bg-purple-50 text-purple-700",
  "Industry Report": "bg-orange-50 text-orange-700",
  Roadmap: "bg-teal-50 text-teal-700",
};

export default function ResourcesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#0d2137] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Resources</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5">Resources</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Guides, insights, and documentation to help you navigate AI automation for your printing business.
          </p>
        </div>
      </section>

      {/* Guides */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0d2137]">Guides</h2>
              <p className="text-gray-500 text-sm">Practical how-to resources for your automation journey</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map(({ title, description, readTime, tag }) => (
              <div key={title} className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all bg-gray-50 hover:bg-white cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${tagColors[tag] ?? "bg-gray-100 text-gray-600"}`}>
                    {tag}
                  </span>
                  <span className="text-xs text-gray-400">{readTime}</span>
                </div>
                <h3 className="text-base font-bold text-[#0d2137] mb-2 group-hover:text-blue-700 transition-colors">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{description}</p>
                <div className="flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
                  Read Guide <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Insights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0d2137]">Industry Insights</h2>
              <p className="text-gray-500 text-sm">Research and analysis on AI trends in printing</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map(({ title, description, readTime, tag }) => (
              <div key={title} className="group p-6 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all bg-white cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${tagColors[tag] ?? "bg-gray-100 text-gray-600"}`}>
                    {tag}
                  </span>
                  <span className="text-xs text-gray-400">{readTime}</span>
                </div>
                <h3 className="text-base font-bold text-[#0d2137] mb-2 group-hover:text-orange-700 transition-colors">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{description}</p>
                <div className="flex items-center gap-1 text-sm font-semibold text-orange-600 group-hover:gap-2 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0d2137]">Documentation</h2>
              <p className="text-gray-500 text-sm">Technical references and developer resources</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {docs.map(({ title, href, external }) => (
              <a
                key={title}
                href={href}
                className="flex items-center justify-between p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group"
              >
                <span className="font-medium text-gray-700 group-hover:text-blue-700">{title}</span>
                {external ? (
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0d2137] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Need Custom Guidance?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Our team is ready to help you build the right automation strategy for your printing business.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            Talk to an Expert <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
