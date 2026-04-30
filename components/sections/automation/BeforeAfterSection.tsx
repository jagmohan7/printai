"use client";
import { X, Check } from "lucide-react";
import MotionInView from "@/components/MotionInView";

const before = [
  "Manual processes",
  "Delays in quoting",
  "High reprint rates",
  "No real-time visibility",
  "Overloaded CSRs",
];

const after = [
  "Automated workflows",
  "Faster processing",
  "Reduced errors",
  "Real-time tracking",
  "Efficient team operations",
];

export default function BeforeAfterSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0b14] py-24 sm:py-28 px-4 border-t border-white/[0.04]">
      <div className="relative z-10 max-w-6xl mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            From Chaos to Control
          </h2>
        </MotionInView>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Before */}
          <MotionInView>
            <div className="h-full rounded-2xl border border-white/[0.07] bg-[#0e0f1c] p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-400/30 flex items-center justify-center">
                  <X className="w-6 h-6 text-red-400" strokeWidth={2.5} />
                </div>
                <h3 className="text-white font-extrabold text-[1.65rem]">Before</h3>
              </div>

              <ul className="space-y-4">
                {before.map((item, i) => (
                  <MotionInView
                    key={item}
                    delay={0.1 + i * 0.08}
                    className="flex items-center gap-3.5 text-gray-300 text-[15px]"
                  >
                    <X className="w-5 h-5 text-red-400 shrink-0" strokeWidth={2.5} />
                    {item}
                  </MotionInView>
                ))}
              </ul>
            </div>
          </MotionInView>

          {/* After */}
          <MotionInView delay={0.15}>
            <div className="h-full rounded-2xl border border-white/[0.07] bg-[#0e0f1c] p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center">
                  <Check className="w-6 h-6 text-cyan-300" strokeWidth={2.5} />
                </div>
                <h3 className="text-white font-extrabold text-[1.65rem]">After</h3>
              </div>

              <ul className="space-y-4">
                {after.map((item, i) => (
                  <MotionInView
                    key={item}
                    delay={0.25 + i * 0.08}
                    className="flex items-center gap-3.5 text-gray-300 text-[15px]"
                  >
                    <Check className="w-5 h-5 text-cyan-300 shrink-0" strokeWidth={2.5} />
                    {item}
                  </MotionInView>
                ))}
              </ul>
            </div>
          </MotionInView>
        </div>
      </div>
    </section>
  );
}
