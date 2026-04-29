import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Calendar, CheckCircle, Package, ClipboardList, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Process Automation – PrintAI",
  description:
    "Streamline your printing operations with intelligent automation that reduces manual tasks, eliminates errors, and maximizes throughput.",
};

const capabilities = [
  {
    icon: Zap,
    title: "Workflow Automation",
    description:
      "Custom workflows for job routing, approvals, and pipeline movement — tailored to your exact business processes.",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description:
      "AI-driven job scheduling that optimizes machine utilization and ensures every deadline is met.",
  },
  {
    icon: CheckCircle,
    title: "Quality Control",
    description:
      "Automated checks with real-time alerts for deviations and defects — catching issues before they reach production.",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description:
      "Real-time tracking, automated reorders, and waste reduction to keep your materials optimized.",
  },
  {
    icon: ClipboardList,
    title: "Order Processing",
    description:
      "Auto-validation, ticket generation, pricing, and order confirmations — zero manual entry required.",
  },
  {
    icon: Truck,
    title: "Shipping & Delivery",
    description:
      "Label generation, carrier selection, shipment tracking, and automated customer notifications.",
  },
];

const impacts = [
  { stat: "70%", title: "Cut Processing Time", desc: "Eliminate manual entry, routing, and updates" },
  { stat: "~0%", title: "Reduce Errors", desc: "Validation catches mistakes before production" },
  { stat: "3x", title: "Scale Without Staff", desc: "Handle 3× orders with the same team" },
  { stat: "100%", title: "Real-Time Visibility", desc: "Track every job in your pipeline instantly" },
];

export default function AutomationPage() {
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
            <span className="text-white">Process Automation</span>
          </div>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center shrink-0">
              <Zap className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5">Process Automation</h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Streamline your printing operations with intelligent automation that reduces manual tasks,
                eliminates errors, and maximizes throughput.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0d2137] mb-3">End-to-End Workflow Automation</h2>
            <p className="text-gray-500">From order intake to delivery, automate every step of your print operation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-[#0d2137] mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-[#0d2137] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Transform Your Operations</h2>
            <p className="text-gray-400">Measurable impact across your entire print workflow</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {impacts.map(({ stat, title, desc }) => (
              <div key={title} className="text-center bg-white/5 border border-white/10 rounded-2xl p-7">
                <p className="text-4xl font-bold text-blue-400 mb-2">{stat}</p>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0d2137] mb-4">Ready to Automate Your Print Workflow?</h2>
          <p className="text-gray-500 text-lg mb-8">
            Let&apos;s identify the biggest automation opportunities in your print workflow.
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
