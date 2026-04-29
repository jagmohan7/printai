"use client";
import Link from "next/link";
import { MessagesSquare, Settings, Database, Clock, Brain, Globe, Check, ArrowRight } from "lucide-react";

const services = [
  {
    icon: MessagesSquare,
    title: "Custom Chatbots",
    href: "/services/chatbots",
    description:
      "Intelligent AI chatbots that handle customer inquiries, process orders, and provide 24/7 support for your printing business.",
    features: ["Natural Language Processing", "Multi-channel Integration", "Order Management"],
  },
  {
    icon: Settings,
    title: "Process Automation",
    href: "/services/automation",
    badge: "Most Popular",
    description:
      "Streamline your printing operations with intelligent automation that reduces manual tasks and eliminates errors.",
    features: ["Workflow Automation", "Job Scheduling", "Quality Control"],
  },
  {
    icon: Database,
    title: "ERPNext Integration",
    href: "/services/erpnext",
    description:
      "Create a single source of truth with Frappe/ERPNext/CRM integration for complete business visibility.",
    features: ["Frappe Framework", "CRM Integration", "Real-time Analytics"],
  },
  {
    icon: Clock,
    title: "Time Optimization",
    href: "/#contact",
    description:
      "AI-driven scheduling and resource allocation that maximizes productivity and reduces operational delays.",
    features: ["Smart Scheduling", "Resource Planning", "Bottleneck Detection"],
  },
  {
    icon: Brain,
    title: "Decision Intelligence",
    href: "/#contact",
    description:
      "Data-driven insights and predictive analytics to optimize every business decision and growth strategy.",
    features: ["Predictive Analytics", "Business Intelligence", "Performance Metrics"],
  },
  {
    icon: Globe,
    title: "Web-to-Print",
    href: "/#contact",
    description:
      "Seamless online ordering systems with B2B ecommerce capabilities and marketplace integrations.",
    features: ["B2B Store Setup", "Etsy Integration", "Amazon Marketplace"],
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#0a0b14] py-24 sm:py-28 px-4 border-t border-white/[0.04]"
    >
      <div className="pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 w-[800px] h-[400px] section-glow" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="badge anim-fade-up">Our Services</span>
          <h2 className="mt-5 text-[2.1rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15] anim-fade-up delay-100">
            AI-Powered <span className="gradient-text">Solutions</span>
          </h2>
          <p className="mt-4 text-gray-400 text-[16px] sm:text-[17px] leading-[1.7] max-w-2xl mx-auto anim-fade-up delay-200">
            Comprehensive automation solutions tailored for the printing industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, href, description, features, badge }, i) => (
            <Link
              key={title}
              href={href}
              className="group relative card-dark p-7 flex flex-col anim-fade-up"
              style={{ animationDelay: `${0.05 + i * 0.08}s` }}
            >
              {badge && (
                <span className="absolute top-5 right-5 px-3 py-1 rounded-full text-[11px] font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 shadow-[0_0_18px_rgba(124,58,237,0.4)]">
                  {badge}
                </span>
              )}

              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 bg-violet-600/15 border border-violet-500/25">
                <Icon className="w-6 h-6 text-violet-300" />
              </div>

              <h3 className="text-[1.15rem] font-bold text-white mb-3">{title}</h3>
              <p className="text-gray-400 text-[14px] leading-[1.7] mb-6">{description}</p>

              <ul className="space-y-2.5 mb-6">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[13.5px] text-gray-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <span className="mt-auto inline-flex items-center gap-1.5 gradient-link text-[14px] group-hover:gap-2.5 transition-all duration-300">
                Learn More <ArrowRight className="w-4 h-4 text-cyan-400" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
