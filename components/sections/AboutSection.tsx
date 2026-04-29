"use client";
import { Brain, Disc3, Sparkles, TrendingUp, CheckCircle2 } from "lucide-react";

const highlights = [
  "One Stop Print Operation Partner",
  "Expert Team of 20+ Professionals",
  "Web-to-Print Specialists",
  "End-to-End Automation",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0a0b14] py-24 sm:py-28 px-4"
    >
      <div className="pointer-events-none absolute left-1/2 -top-40 -translate-x-1/2 w-[700px] h-[400px] section-glow" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="badge anim-fade-up">About PrintAI</span>
          <h2 className="mt-5 text-[2.1rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15] anim-fade-up delay-100">
            Your Partner in{" "}
            <span className="gradient-text">Digital Transformation</span>
          </h2>
          <p className="mt-4 text-gray-400 text-[16px] sm:text-[17px] leading-[1.7] max-w-xl mx-auto anim-fade-up delay-200">
            We are a tech-enabled AI solutions provider creating custom strategies
            for printing businesses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="anim-slide-left">
            <h3 className="text-2xl sm:text-[1.65rem] font-bold text-white mb-5">
              Who We Are
            </h3>
            <p className="text-gray-400 leading-[1.8] text-[15px] mb-5">
              PrintAI is at the forefront of AI automation in the printing industry. We
              combine cutting-edge artificial intelligence with deep industry
              expertise to deliver solutions that transform how printing businesses
              operate.
            </p>
            <p className="text-gray-400 leading-[1.8] text-[15px] mb-8">
              Our mission is to create a{" "}
              <strong className="text-white font-semibold">Single Source of Truth</strong>{" "}
              for your business operations using Frappe/ERPNext/CRM integration,
              custom chatbots, and intelligent automation that reduces time wastage
              and optimizes every decision you make.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {highlights.map((label, i) => (
                <div
                  key={label}
                  className={`flex items-start gap-3 p-3.5 rounded-xl bg-[#12131f] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-[#161728] transition-all duration-300 anim-fade-up`}
                  style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-[13.5px] font-semibold text-gray-200 leading-snug">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Brain orbit visual */}
          <div className="relative anim-fade-up delay-300">
            <div className="relative bg-[#0e0f1c] border border-white/[0.06] rounded-2xl aspect-[4/3] p-8 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-[260px] h-[260px] rounded-full border border-dashed border-white/[0.08]" />
                <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-white/[0.05]" />
                <div className="absolute w-[460px] h-[460px] rounded-full border border-dashed border-white/[0.04]" />

                {/* Center brain */}
                <div className="relative w-[120px] h-[120px] flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/30 blur-2xl anim-pulse-glow" />
                  <Brain className="relative w-20 h-20 text-cyan-400 anim-float" strokeWidth={1.5} />
                </div>

                {/* Orbit nodes */}
                <div className="absolute top-[18%] right-[18%] w-11 h-11 rounded-full bg-[#1a1b2e] border border-violet-500/30 flex items-center justify-center anim-float">
                  <Disc3 className="w-5 h-5 text-violet-400" />
                </div>
                <div className="absolute bottom-[20%] left-[18%] w-11 h-11 rounded-full bg-[#1a1b2e] border border-violet-500/30 flex items-center justify-center anim-float delay-200">
                  <Sparkles className="w-5 h-5 text-violet-400" />
                </div>
                <div className="absolute bottom-[28%] right-[14%] w-11 h-11 rounded-full bg-[#1a1b2e] border border-violet-500/30 flex items-center justify-center anim-float delay-400">
                  <TrendingUp className="w-5 h-5 text-violet-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
