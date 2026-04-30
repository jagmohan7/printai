"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MotionInView from "@/components/MotionInView";

export default function AutomationCtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0b14] py-28 sm:py-36 px-4 border-t border-white/[0.04]">
      {/* Layered radial glows */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[950px] h-[600px] rounded-full bg-violet-600/10 blur-[150px]" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-blue-500/12 blur-[120px]" />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <MotionInView>
          <h2 className="text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] font-extrabold tracking-tight text-white leading-[1.1]">
            Stop Managing Workflows.
          </h2>
        </MotionInView>

        <MotionInView delay={0.15}>
          <h2 className="mt-2 text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] font-extrabold tracking-tight leading-[1.1] bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Start Scaling Them.
          </h2>
        </MotionInView>

        <MotionInView delay={0.3}>
          <p className="mt-7 text-gray-400 text-[16px] sm:text-[17px] leading-[1.8] max-w-2xl mx-auto">
            Let automation handle the repetitive work so your team can focus on
            production and growth.
          </p>
        </MotionInView>

        <MotionInView delay={0.45}>
          <Link
            href="/#contact"
            className="mt-10 inline-flex items-center gap-2.5 px-9 py-[16px] rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_40px_rgba(34,211,238,0.45)]"
          >
            Book Free Workflow Audit
            <ArrowRight className="w-4 h-4" />
          </Link>
        </MotionInView>
      </div>
    </section>
  );
}
