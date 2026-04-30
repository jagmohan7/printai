"use client";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import MotionInView from "@/components/MotionInView";

const guarantees = ["No setup fees", "Live in under 5 days", "Cancel anytime"];

export default function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0b14] py-24 sm:py-32 px-4 border-t border-white/[0.04]">
      {/* Center radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[900px] h-[600px] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <MotionInView>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-[#0e0f1c]/80 backdrop-blur-sm text-cyan-300 text-[12.5px] font-semibold tracking-wide">
            <Sparkles className="w-4 h-4" />
            Limited spots available this month
          </span>
        </MotionInView>

        <MotionInView delay={0.1}>
          <h2 className="mt-7 text-[2.2rem] sm:text-[2.8rem] lg:text-[3.4rem] font-extrabold tracking-tight text-white leading-[1.1]">
            Stop Losing Leads to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Inbox Lag
            </span>
          </h2>
        </MotionInView>

        <MotionInView delay={0.2}>
          <p className="mt-6 text-gray-400 text-[16px] sm:text-[17px] leading-[1.8] max-w-2xl mx-auto">
            Let AI handle the repetitive work so your team can focus on real jobs.
            Join 50+ print shops already using PrintAI to capture more leads and
            save time.
          </p>
        </MotionInView>

        <MotionInView delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2.5 px-8 py-[15px] rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_35px_rgba(34,211,238,0.4)]"
            >
              Book Free Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2.5 px-8 py-[15px] rounded-xl font-semibold text-[15px] text-white border border-white/15 bg-[#0e0f1c]/80 backdrop-blur-sm hover:bg-[#161728] hover:border-white/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              View Pricing
            </Link>
          </div>
        </MotionInView>

        <MotionInView delay={0.4}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {guarantees.map((g) => (
              <span key={g} className="inline-flex items-center gap-2.5 text-[13.5px] text-gray-300">
                <span className="relative w-5 h-5 rounded-full bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
                </span>
                {g}
              </span>
            ))}
          </div>
        </MotionInView>
      </div>
    </section>
  );
}
