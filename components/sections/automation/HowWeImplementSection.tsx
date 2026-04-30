"use client";
import { Search, Zap, Rocket } from "lucide-react";
import MotionInView from "@/components/MotionInView";

const steps = [
  {
    icon: Search,
    title: "Workflow Audit",
    desc: "We map your current intake-to-ship process and identify bottlenecks.",
    badgeBg: "bg-gradient-to-br from-blue-500 to-blue-600",
    glow: "shadow-[0_0_40px_rgba(59,130,246,0.45)]",
  },
  {
    icon: Zap,
    title: "Pilot Build (2–4 weeks)",
    desc: "We automate one workflow first to prove ROI.",
    badgeBg: "bg-gradient-to-br from-cyan-400 to-teal-500",
    glow: "shadow-[0_0_40px_rgba(34,211,238,0.5)]",
  },
  {
    icon: Rocket,
    title: "Full Rollout",
    desc: "We extend automation across operations at your pace.",
    badgeBg: "bg-gradient-to-br from-violet-500 to-purple-600",
    glow: "shadow-[0_0_40px_rgba(139,92,246,0.45)]",
  },
];

export default function HowWeImplementSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0b14] py-24 sm:py-28 px-4 border-t border-white/[0.04]">
      <div className="relative z-10 max-w-7xl mx-auto">
        <MotionInView className="text-center mb-20">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            How We Implement
          </h2>
        </MotionInView>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-10 pt-12">
          {/* Horizontal connector — sits BEHIND the badges */}
          <div className="pointer-events-none hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

          {steps.map(({ icon: Icon, title, desc, badgeBg, glow }, i) => (
            <MotionInView key={title} delay={i * 0.18} distance={50}>
              <div className="relative h-full">
                {/* Floating circular badge */}
                <div className="absolute left-1/2 -top-12 -translate-x-1/2 z-10">
                  <div className={`w-24 h-24 rounded-full ${badgeBg} ${glow} flex items-center justify-center transition-transform duration-300 hover:scale-105`}>
                    <Icon className="w-9 h-9 text-white" strokeWidth={1.75} />
                  </div>
                </div>

                {/* Card body */}
                <div className="group h-full rounded-2xl border border-white/[0.07] bg-[#0e0f1c] pt-20 pb-10 px-7 text-center transition-all duration-300 hover:border-cyan-400/45 hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(34,211,238,0.15)]">
                  <h3 className="text-white font-bold text-[1.2rem] mb-3.5">{title}</h3>
                  <p className="text-gray-400 text-[14px] leading-[1.7] max-w-[260px] mx-auto">
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
