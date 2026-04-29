import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Bot, Globe, ShoppingCart, Clock, BarChart3, Shuffle } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom AI Chatbots – PrintAI",
  description:
    "Intelligent conversational agents that handle customer inquiries, process orders, and provide round-the-clock support for your printing business.",
};

const features = [
  {
    icon: Bot,
    title: "Natural Language Processing",
    description:
      "Advanced NLP understands customer intent, handles complex print terminology, and provides accurate responses in natural conversation.",
  },
  {
    icon: Globe,
    title: "Multi-Channel Integration",
    description:
      "Deploy across your website, WhatsApp, Facebook Messenger, and more. One bot, every channel your customers use.",
  },
  {
    icon: ShoppingCart,
    title: "Order Management",
    description:
      "Customers can place orders, check status, request quotes, and manage their accounts directly through the chatbot.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Never miss an inquiry. Your chatbot works around the clock, handling customer needs even when your team is offline.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track conversation metrics, customer satisfaction, common inquiries, and conversion rates with detailed reporting.",
  },
  {
    icon: Shuffle,
    title: "Smart Handoff",
    description:
      "Seamlessly transfers complex queries to human agents with full conversation context, ensuring no information is lost.",
  },
];

const benefits = [
  {
    stat: "90%",
    title: "Reduce Response Time",
    desc: "Instant replies without staff delays",
  },
  {
    stat: "80%",
    title: "Queries Auto-Resolved",
    desc: "Pricing, turnaround, specs — all answered automatically",
  },
  {
    stat: "3x",
    title: "Increase Lead Capture",
    desc: "Proactive engagement converts browsers to leads",
  },
  {
    stat: "100%",
    title: "Print-Industry Trained",
    desc: "Pre-trained on print terminology and workflows",
  },
];

export default function ChatbotsPage() {
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
            <span className="text-white">Custom AI Chatbots</span>
          </div>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center shrink-0">
              <Bot className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full mb-3">
                Most Popular
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5">Custom AI Chatbots</h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Intelligent conversational agents that handle customer inquiries, process orders, and provide
                round-the-clock support for your printing business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0d2137] mb-3">Everything Your Customers Need</h2>
            <p className="text-gray-500">Our chatbots are built specifically for the printing industry</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {features.map(({ icon: Icon, title, description }) => (
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

      {/* Benefits */}
      <section className="py-16 bg-[#0d2137] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Why Choose Our Chatbots</h2>
            <p className="text-gray-400">Real Results for Print Businesses</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {benefits.map(({ stat, title, desc }) => (
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
          <h2 className="text-3xl font-bold text-[#0d2137] mb-4">Ready to Deploy Your AI Chatbot?</h2>
          <p className="text-gray-500 text-lg mb-8">
            Let&apos;s build a custom chatbot that fits your printing business perfectly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded-xl transition-colors"
            >
              <CheckCircle className="w-5 h-5 text-green-500" /> View Case Studies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
