import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp, Clock, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real results from real printing businesses. See how PrintAI drives measurable impact — faster quoting, fewer reprints, and on-time delivery.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    type: "website",
    url: "/case-studies",
    title: "Case Studies | PrintAI",
    description:
      "Real results from real printing businesses using PrintAI to capture more leads and ship faster.",
  },
  twitter: {
    title: "Case Studies | PrintAI",
    description:
      "Real results from real printing businesses using PrintAI to capture more leads and ship faster.",
  },
};

const caseStudies = [
  {
    category: "Commercial Printing",
    title: "Regional Print Shop Automates Order Processing",
    description:
      "A mid-size commercial printer eliminated manual order entry and reduced processing time from hours to minutes.",
    metrics: [
      { icon: Clock, value: "85%", label: "Faster Processing" },
      { icon: TrendingUp, value: "3x", label: "Order Volume" },
      { icon: DollarSign, value: "$120K", label: "Annual Savings" },
    ],
    color: "blue",
  },
  {
    category: "Large Format",
    title: "Enterprise Printer Deploys AI Customer Support",
    description:
      "A large format printing company deployed an AI chatbot that handles 80% of customer inquiries without human intervention.",
    metrics: [
      { icon: TrendingUp, value: "80%", label: "Auto-Resolved" },
      { icon: Clock, value: "24/7", label: "Availability" },
      { icon: TrendingUp, value: "4.8/5", label: "Satisfaction" },
    ],
    color: "green",
  },
  {
    category: "Multi-Location",
    title: "Print Chain Unifies Operations with ERPNext",
    description:
      "A 5-location print chain consolidated disparate systems into a single ERPNext platform with custom print modules.",
    metrics: [
      { icon: TrendingUp, value: "5", label: "Sites Unified" },
      { icon: DollarSign, value: "40%", label: "Cost Reduction" },
      { icon: TrendingUp, value: "1", label: "Platform" },
    ],
    color: "purple",
  },
  {
    category: "Packaging",
    title: "Packaging Company Optimizes Inventory with AI",
    description:
      "A packaging printer reduced material waste and stockouts by implementing AI-driven inventory management.",
    metrics: [
      { icon: TrendingUp, value: "60%", label: "Less Waste" },
      { icon: TrendingUp, value: "95%", label: "Stock Accuracy" },
      { icon: DollarSign, value: "$85K", label: "Saved Yearly" },
    ],
    color: "orange",
  },
  {
    category: "Web-to-Print",
    title: "Online Print Store Scales with Automation",
    description:
      "A web-to-print business automated their entire fulfillment pipeline, enabling rapid growth without proportional staff increases.",
    metrics: [
      { icon: TrendingUp, value: "300%", label: "Revenue Growth" },
      { icon: Clock, value: "2hr", label: "Avg Turnaround" },
      { icon: TrendingUp, value: "99.2%", label: "Accuracy" },
    ],
    color: "blue",
  },
  {
    category: "Digital Printing",
    title: "Digital Printer Transforms QC with Machine Learning",
    description:
      "A digital printing operation implemented ML-based quality control that catches defects in real-time during production runs.",
    metrics: [
      { icon: TrendingUp, value: "98%", label: "Defect Detection" },
      { icon: TrendingUp, value: "50%", label: "Less Reprints" },
      { icon: Clock, value: "6mo", label: "ROI Achieved" },
    ],
    color: "green",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-green-50 text-green-700 border-green-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
};

const metricColorMap: Record<string, string> = {
  blue: "text-blue-600",
  green: "text-green-600",
  purple: "text-purple-600",
  orange: "text-orange-600",
};

export default function CaseStudiesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#0d2137] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Case Studies</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5">Case Studies</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Real results from real printing businesses. See how our AI solutions drive measurable impact across the industry.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map(({ category, title, description, metrics, color }) => (
              <div key={title} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="p-7">
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border mb-4 ${colorMap[color]}`}>
                    {category}
                  </span>
                  <h2 className="text-lg font-bold text-[#0d2137] mb-3 leading-snug">{title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{description}</p>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                    {metrics.map(({ icon: Icon, value, label }) => (
                      <div key={label} className="text-center">
                        <p className={`text-xl font-bold ${metricColorMap[color]}`}>{value}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-7 pb-5">
                  <button className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:gap-2.5 transition-all">
                    Read Case Study <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0d2137] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Want Results Like These?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Let&apos;s discuss how PrintAI can transform your printing operations.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
