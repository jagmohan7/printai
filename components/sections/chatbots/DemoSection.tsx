"use client";
import Link from "next/link";
import { MessageSquare, PlayCircle, Calendar } from "lucide-react";
import MotionInView from "@/components/MotionInView";

export default function DemoSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0b14] py-24 sm:py-28 px-4 border-t border-white/[0.04]">
      <div className="pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            See a Real Chatbot in{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Action
            </span>
          </h2>
        </MotionInView>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {/* Left: Chat demo */}
          <MotionInView>
            <div className="relative rounded-3xl border border-white/[0.08] bg-[#0e0f1c] p-6 sm:p-7 h-full">
              <div className="flex items-center gap-3 pb-5 border-b border-white/[0.06]">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-[15px]">PrintAI Demo</p>
                  <span className="text-[12px] text-gray-500">Try asking about pricing</span>
                </div>
              </div>

              <div className="pt-5 space-y-4">
                {/* User msg */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-br-md text-white text-[13.5px] leading-[1.55] bg-gradient-to-br from-violet-500 to-blue-500 shadow-[0_0_20px_rgba(99,102,241,0.25)]">
                    What&apos;s your pricing for 1000 flyers, full color, both sides?
                  </div>
                </div>

                {/* Bot msg */}
                <div className="flex justify-start">
                  <div className="max-w-[88%] px-4 py-3.5 rounded-2xl rounded-bl-md bg-[#0a0b14] border border-white/[0.06] text-[13.5px] leading-[1.6]">
                    <p className="text-white">For 1,000 full-color flyers (8.5&quot;x11&quot;, 100lb gloss text, both sides):</p>
                    <p className="mt-2 text-cyan-300 font-bold text-[18px]">$287.00</p>
                    <ul className="mt-2 space-y-1 text-gray-400 text-[12.5px]">
                      <li>• Standard turnaround: 5-7 days</li>
                      <li>• Upload files: 300 DPI, PDF with 0.125&quot; bleed</li>
                    </ul>
                    <p className="mt-2 text-gray-400 text-[12.5px]">
                      Need a quote for a different size or paper stock?
                    </p>
                  </div>
                </div>

                {/* User msg */}
                <div className="flex justify-end">
                  <div className="px-4 py-3 rounded-2xl rounded-br-md text-white text-[13.5px] bg-gradient-to-br from-violet-500 to-blue-500 shadow-[0_0_20px_rgba(99,102,241,0.25)]">
                    Do you offer matte finish instead?
                  </div>
                </div>

                {/* Bot msg */}
                <div className="flex justify-start">
                  <div className="max-w-[80%] px-4 py-3.5 rounded-2xl rounded-bl-md bg-[#0a0b14] border border-white/[0.06] text-[13.5px] leading-[1.6]">
                    <p className="text-white">Yes! With 100lb matte text paper:</p>
                    <p className="mt-1.5 text-cyan-300 font-bold text-[18px]">$279.00</p>
                    <p className="mt-1.5 text-gray-400 text-[12.5px]">
                      (Same turnaround and file specs)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </MotionInView>

          {/* Right: Try it yourself */}
          <MotionInView delay={0.15}>
            <div className="rounded-3xl border border-white/[0.08] bg-[#0e0f1c] p-7 sm:p-9 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shrink-0">
                  <PlayCircle className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-white font-bold text-[1.5rem]">Try it yourself</h3>
              </div>

              <p className="text-gray-400 text-[14.5px] leading-[1.75] mb-7">
                See how PrintAI handles real customer questions about pricing, file
                specs, turnaround times, and more. Book a 20-minute demo to see it
                trained on your actual catalog.
              </p>

              <ul className="space-y-3.5 mb-9">
                {[
                  "No credit card required",
                  "See ROI calculator specific to your shop",
                  "Get custom integration roadmap",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[14px] text-gray-200">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/#contact"
                className="mt-auto inline-flex items-center justify-center gap-2.5 w-full px-7 py-[15px] rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_30px_rgba(34,211,238,0.35)]"
              >
                <Calendar className="w-4 h-4" />
                Book 20-Min Demo
              </Link>
            </div>
          </MotionInView>
        </div>
      </div>
    </section>
  );
}
