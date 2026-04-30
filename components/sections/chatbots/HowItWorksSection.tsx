"use client";
import { Database, Zap, Users } from "lucide-react";
import MotionInView from "@/components/MotionInView";

const steps = [
  {
    icon: Database,
    title: "Train on Your Catalog",
    desc: "We analyze your pricing, turnaround times, and product specs to build a custom AI model",
  },
  {
    icon: Zap,
    title: "Connect to Your Channels",
    desc: "Deploy across web chat, WhatsApp, email, and your existing systems in under 48 hours",
  },
  {
    icon: Users,
    title: "Smart Human Handoff",
    desc: "Complex jobs route to your team with full context. AI handles the rest 24/7",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#0a0b14] py-24 sm:py-28 px-4 border-t border-white/[0.04]"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <MotionInView className="text-center mb-16">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            How{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              PrintAI Chatbots
            </span>{" "}
            Work
          </h2>
        </MotionInView>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Connector lines (desktop only) */}
          <div className="pointer-events-none hidden md:block absolute top-1/2 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent -translate-y-1/2" />

          {steps.map(({ icon: Icon, title, desc }, i) => (
            <MotionInView key={title} delay={i * 0.15}>
              <div className="group relative h-full rounded-2xl border border-white/[0.07] bg-[#0e0f1c] p-8 transition-all duration-300 hover:border-cyan-400/40 hover:-translate-y-1">
                {/* Top-left glow blob */}
                <div className="pointer-events-none absolute -top-4 -left-4 w-24 h-24 rounded-full bg-cyan-400/30 blur-2xl" />

                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/15 to-blue-500/10 border border-cyan-400/25 flex items-center justify-center mb-7 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                  <Icon className="w-6 h-6 text-cyan-300" strokeWidth={1.75} />
                </div>

                <h3 className="relative text-white font-bold text-[18px] mb-3">
                  {title}
                </h3>
                <p className="relative text-gray-400 text-[14px] leading-[1.7]">
                  {desc}
                </p>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
