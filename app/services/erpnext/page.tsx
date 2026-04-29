import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Users, TrendingUp, Package, DollarSign, Building2, CheckCircle, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "ERPNext Integration – PrintAI",
  description:
    "Create a single source of truth for your printing business with Frappe/ERPNext customization, CRM integration, and real-time analytics.",
};

const capabilities = [
  {
    icon: Database,
    title: "Frappe Customization",
    description:
      "Custom doctypes, workflows, and scripts built on the Frappe framework to match your exact business processes.",
  },
  {
    icon: Users,
    title: "CRM Integration",
    description:
      "Unified customer management with lead tracking, opportunity pipelines, and automated follow-ups built into your ERP.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Custom dashboards and reports that give you instant visibility into sales, production, and financial performance.",
  },
  {
    icon: Package,
    title: "Inventory & Materials",
    description:
      "Track paper stock, ink levels, and supplies across warehouses with automated reordering and waste tracking.",
  },
  {
    icon: DollarSign,
    title: "Finance & Accounting",
    description:
      "Complete financial management with invoicing, payments, cost tracking, and multi-currency support.",
  },
  {
    icon: Building2,
    title: "Multi-Site Management",
    description:
      "Manage multiple print locations from a single platform with site-specific configurations and consolidated reporting.",
  },
];

const whyItems = [
  {
    icon: Database,
    title: "Single Source of Truth",
    desc: "All your business data in one place — no more switching between disconnected tools.",
    highlight: true,
  },
  {
    icon: CheckCircle,
    title: "Open Source Foundation",
    desc: "Built on Frappe/ERPNext — no vendor lock-in, full code access, and an active community.",
    highlight: false,
  },
  {
    icon: TrendingUp,
    title: "Print-Industry Modules",
    desc: "Custom modules for job costing, production planning, and print-specific workflows.",
    highlight: false,
  },
  {
    icon: Building2,
    title: "Seamless Integrations",
    desc: "Connect with your existing tools — ecommerce platforms, payment gateways, shipping providers.",
    highlight: false,
  },
];

export default function ERPNextPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#0d2137] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white">ERPNext Integration</span>
          </div>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center shrink-0">
              <BarChart3 className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5">ERPNext Integration</h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Create a single source of truth for your printing business with Frappe/ERPNext
                customization, CRM integration, and real-time analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0d2137] mb-3">Your Complete Business Platform</h2>
            <p className="text-gray-500">Frappe/ERPNext tailored specifically for print operations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-[#0d2137] mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ERPNext */}
      <section className="py-16 bg-[#0d2137] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">One Platform, Complete Control</h2>
            <p className="text-gray-400">Why printing businesses choose ERPNext with PrintAI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {whyItems.map(({ icon: Icon, title, desc, highlight }) => (
              <div
                key={title}
                className={`rounded-2xl p-7 ${highlight ? "bg-blue-600 border border-blue-500" : "bg-white/5 border border-white/10"}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${highlight ? "bg-white/20" : "bg-blue-600/20"}`}>
                  <Icon className={`w-6 h-6 ${highlight ? "text-white" : "text-blue-400"}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className={`text-sm leading-relaxed ${highlight ? "text-blue-100" : "text-gray-400"}`}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0d2137] mb-4">Ready for Your ERPNext Transformation?</h2>
          <p className="text-gray-500 text-lg mb-8">
            Let&apos;s build the unified platform your printing business deserves.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
