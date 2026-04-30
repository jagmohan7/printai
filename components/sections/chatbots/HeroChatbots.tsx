"use client";
import Link from "next/link";
import { Sparkles, Calendar, PlayCircle, MessageSquare } from "lucide-react";
import MotionInView from "@/components/MotionInView";

export default function HeroChatbots() {
  return (
    <section className="relative overflow-hidden bg-[#0a0b14] pt-32 pb-24 px-4">
      {/* Glow blobs */}
      <div className="pointer-events-none absolute left-[-8%] top-[10%] w-[520px] h-[520px] rounded-full bg-cyan-500/15 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-6%] bottom-[-10%] w-[460px] h-[460px] rounded-full bg-blue-600/15 blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: copy */}
        <MotionInView>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-300 text-[12.5px] font-semibold tracking-wide">
            <Sparkles className="w-4 h-4" />
            AI-Powered Print Solutions
          </span>

          <h1 className="mt-6 text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] font-extrabold tracking-tight text-white leading-[1.1]">
            AI Chatbots Trained on{" "}
            <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
              How Your Print Shop Actually Quotes
            </span>
          </h1>

          <p className="mt-6 text-gray-400 text-[16px] sm:text-[17px] leading-[1.75] max-w-xl">
            Answer the repetitive 80% instantly — pricing, turnaround, file
            specs — and route complex jobs directly to your team.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2.5 px-7 py-[13px] rounded-xl font-semibold text-[14.5px] text-white bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            >
              <Calendar className="w-4 h-4" />
              Book a Free Demo
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2.5 px-7 py-[13px] rounded-xl font-semibold text-[14.5px] text-white border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <PlayCircle className="w-4 h-4" />
              See It in Action
            </Link>
          </div>
        </MotionInView>

        {/* Right: Chat mockup */}
        <MotionInView delay={0.15}>
          <div className="relative rounded-3xl border border-white/[0.08] bg-[#0e0f1c] p-6 sm:p-7 shadow-[0_0_60px_rgba(34,211,238,0.08)]">
            {/* Header */}
            <div className="flex items-center gap-3 pb-5 border-b border-white/[0.06]">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-[15px]">PrintAI Assistant</p>
                <span className="inline-flex items-center gap-1.5 text-[11.5px] text-cyan-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Online
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="pt-5 space-y-4">
              {/* User msg */}
              <div className="flex justify-end">
                <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-br-md text-white text-[13.5px] leading-[1.55] bg-gradient-to-br from-violet-500 to-blue-500 shadow-[0_0_20px_rgba(99,102,241,0.25)]">
                  How much for 500 business cards with premium finish?
                </div>
              </div>

              {/* Bot msg */}
              <div className="flex justify-start">
                <div className="max-w-[88%] px-4 py-3.5 rounded-2xl rounded-bl-md bg-[#0a0b14] border border-white/[0.06] text-[13.5px] leading-[1.6]">
                  <p className="text-white">For 500 premium business cards (16pt with UV coating):</p>
                  <p className="mt-2 text-cyan-300 font-bold text-[18px]">$124.99</p>
                  <ul className="mt-2 space-y-1 text-gray-400 text-[12.5px]">
                    <li>• Turnaround: 3-5 business days</li>
                    <li>• Includes free design review</li>
                  </ul>
                </div>
              </div>

              {/* User msg */}
              <div className="flex justify-end">
                <div className="px-4 py-3 rounded-2xl rounded-br-md text-white text-[13.5px] bg-gradient-to-br from-violet-500 to-blue-500 shadow-[0_0_20px_rgba(99,102,241,0.25)]">
                  Can I get rush delivery?
                </div>
              </div>

              {/* Bot msg */}
              <div className="flex justify-start">
                <div className="max-w-[80%] px-4 py-3.5 rounded-2xl rounded-bl-md bg-[#0a0b14] border border-white/[0.06] text-[13.5px] leading-[1.6]">
                  <p className="text-white font-medium">Yes! Rush options available:</p>
                  <ul className="mt-1.5 space-y-1 text-gray-400 text-[12.5px]">
                    <li>• 24-hour: +$45</li>
                    <li>• 48-hour: +$25</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </MotionInView>
      </div>
    </section>
  );
}
