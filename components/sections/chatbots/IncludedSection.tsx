"use client";
import { Clock, FileCheck2, Link2, Globe, TrendingUp, Languages } from "lucide-react";
import MotionInView from "@/components/MotionInView";

const features = [
  {
    icon: Clock,
    title: "24/7 Quoting & Lead Capture",
    desc: "Never miss a quote request, even at 2 AM on weekends",
  },
  {
    icon: FileCheck2,
    title: "File Spec Validation",
    desc: "Automated checks for bleed, DPI, dimensions before jobs start",
  },
  {
    icon: Link2,
    title: "CRM & ERPNext Integration",
    desc: "Syncs with your existing systems, no manual data entry",
  },
  {
    icon: Globe,
    title: "Multi-Channel Support",
    desc: "Deploy on web, WhatsApp, email, and SMS seamlessly",
  },
  {
    icon: TrendingUp,
    title: "Monthly Accuracy Optimization",
    desc: "We continuously improve responses based on your feedback",
  },
  {
    icon: Languages,
    title: "English & Spanish Support",
    desc: "Serve your entire customer base in their preferred language",
  },
];

export default function IncludedSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0b14] py-24 sm:py-28 px-4 border-t border-white/[0.04]">
      <div className="relative z-10 max-w-7xl mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            What&apos;s{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Included
            </span>
          </h2>
        </MotionInView>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <MotionInView key={title} delay={i * 0.1}>
              <div className="group relative h-full rounded-2xl border border-white/[0.07] bg-[#0e0f1c] p-7 flex items-start gap-5 transition-all duration-300 hover:border-cyan-400/55 hover:shadow-[0_0_35px_rgba(34,211,238,0.18)] hover:-translate-y-1">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-500/10 border border-cyan-400/25 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                  <Icon className="w-5 h-5 text-cyan-300" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-[15.5px] mb-1.5">
                    {title}
                  </h3>
                  <p className="text-gray-400 text-[13.5px] leading-[1.65]">
                    {desc}
                  </p>
                </div>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
