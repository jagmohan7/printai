import Link from "next/link";
import { ArrowRight, Bot, Zap, BarChart3, Clock, Brain, Globe, CheckCircle, Users, Award, Printer, Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const services = [
  {
    icon: Bot,
    title: "Custom Chatbots",
    href: "/services/chatbots",
    badge: "Most Popular",
    description: "AI-powered conversational agents for order management, customer support, and quote generation.",
    features: ["Natural Language Processing", "Multi-channel Integration", "Order Management"],
  },
  {
    icon: Zap,
    title: "Process Automation",
    href: "/services/automation",
    description: "Streamline every step from order intake to delivery with intelligent workflow automation.",
    features: ["Workflow Automation", "Job Scheduling", "Quality Control"],
  },
  {
    icon: BarChart3,
    title: "ERPNext Integration",
    href: "/services/erpnext",
    description: "Create a single source of truth with Frappe/ERPNext customization and real-time analytics.",
    features: ["Frappe Framework", "CRM Integration", "Real-time Analytics"],
  },
  {
    icon: Clock,
    title: "Time Optimization",
    href: "/#contact",
    description: "Eliminate bottlenecks and optimize resource allocation across your entire print operation.",
    features: ["Smart Scheduling", "Resource Planning", "Bottleneck Detection"],
  },
  {
    icon: Brain,
    title: "Decision Intelligence",
    href: "/#contact",
    description: "AI-driven insights and predictive analytics to power better business decisions.",
    features: ["Predictive Analytics", "Business Intelligence", "Performance Metrics"],
  },
  {
    icon: Globe,
    title: "Web-to-Print",
    href: "/#contact",
    description: "Launch B2B stores and integrate with Etsy, Amazon, and other marketplaces seamlessly.",
    features: ["B2B Store Setup", "Etsy Integration", "Amazon Marketplace"],
  },
];

const whyItems = [
  {
    icon: Clock,
    title: "Reduce Time Wastage",
    desc: "Automate repetitive tasks and eliminate manual data entry so your team focuses on what matters.",
  },
  {
    icon: Brain,
    title: "Optimize Decision Making",
    desc: "AI-powered insights and real-time dashboards give you the data needed to act fast and accurately.",
  },
  {
    icon: BarChart3,
    title: "Unified Platform",
    desc: "One central hub for all your business data — no more switching between disconnected tools.",
  },
  {
    icon: Bot,
    title: "24/7 AI Support",
    desc: "Round-the-clock chatbot service handles customer inquiries, quotes, and orders while you sleep.",
  },
];

const stats = [
  { value: "20+", label: "Expert Professionals" },
  { value: "85%", label: "Faster Order Processing" },
  { value: "80%", label: "Queries Auto-Resolved" },
  { value: "300%", label: "Revenue Growth Achieved" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section id="home" className="bg-[#0d2137] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              AI-Powered Printing Solutions
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              Transform Your Printing Business with{" "}
              <span className="text-blue-400">AI-Powered Automation</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
              Revolutionize your operations with intelligent chatbots, seamless ERPNext integration,
              and cutting-edge automation solutions that reduce time wastage and optimize decision making.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-base"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-colors text-base"
              >
                Explore Solutions
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-white/10 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-blue-400">{s.value}</p>
                  <p className="text-sm text-gray-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">About Us</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0d2137] mb-6 leading-tight">
                Your Partner in Digital Transformation
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We are a tech-enabled AI solutions provider creating custom strategies for printing businesses.
                PrintAI is at the forefront of AI automation in the printing industry.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our mission is to create a <strong className="text-[#0d2137]">Single Source of Truth</strong> via
                Frappe/ERPNext/CRM — giving printing businesses complete visibility and control over every aspect
                of their operations.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: "Expert Team of 20+ Professionals" },
                  { icon: Printer, label: "Web-to-Print Specialists" },
                  { icon: Zap, label: "End-to-End Automation" },
                  { icon: Award, label: "One Stop Print Partner" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0d2137] rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Single Source of Truth</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                We unify your printing business data — from orders and inventory to customer communications
                and financials — into one intelligent platform powered by Frappe/ERPNext.
              </p>
              <div className="space-y-4">
                {[
                  "Custom ERPNext modules for print operations",
                  "Real-time dashboards and analytics",
                  "AI chatbots integrated with your ERP",
                  "Automated order-to-delivery workflows",
                  "Multi-location management support",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">What We Offer</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0d2137] mb-4">AI-Powered Solutions</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Purpose-built automation and AI tools designed specifically for printing businesses of every size.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map(({ icon: Icon, title, href, badge, description, features }) => (
              <Link
                key={title}
                href={href}
                className="group relative bg-white rounded-2xl p-7 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-200"
              >
                {badge && (
                  <span className="absolute top-5 right-5 px-2.5 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    {badge}
                  </span>
                )}
                <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-600 rounded-xl flex items-center justify-center mb-5 transition-colors">
                  <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#0d2137] mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{description}</p>
                <ul className="space-y-1.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center gap-1 text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why PrintAI ── */}
      <section className="py-20 bg-[#0d2137] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Why PrintAI</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Single Source of Truth</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything your printing business needs in one intelligent, connected platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {whyItems.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold mb-3">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Contact Us</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0d2137] mb-5 leading-tight">
                Ready to Transform Your Business?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Let&apos;s discuss how PrintAI can automate your printing operations and drive measurable growth.
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Us</p>
                    <a href="mailto:sales@printai.cloud" className="font-semibold text-[#0d2137] hover:text-blue-600 transition-colors">
                      sales@printai.cloud
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-[#0d2137] rounded-2xl text-white">
                <h3 className="font-bold text-lg mb-3">What happens next?</h3>
                <ol className="space-y-3">
                  {[
                    "We review your inquiry within 1 business day",
                    "Schedule a free discovery call",
                    "Receive a custom solution proposal",
                    "Begin your automation journey",
                  ].map((step, i) => (
                    <li key={step} className="flex items-center gap-3 text-sm text-gray-300">
                      <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-[#0d2137] mb-6">Send Us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
