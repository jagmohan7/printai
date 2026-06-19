"use client";
import { X, Check } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import { pickArray } from "@/lib/section-utils";

export interface AutomationBeforeAfterData {
  heading?: string;
  beforeItems?: string[];
  afterItems?: string[];
}

interface Props { data?: AutomationBeforeAfterData | null }

const FALLBACK = {
  heading:     "From Chaos to Control",
  beforeItems: ["Manual processes", "Delays in quoting", "High reprint rates", "No real-time visibility", "Overloaded CSRs"],
  afterItems:  ["Automated workflows", "Faster processing", "Reduced errors", "Real-time tracking", "Efficient team operations"],
};

export default function BeforeAfterSection({ data }: Props) {
  const heading     = data?.heading     ?? FALLBACK.heading;
  const beforeItems = pickArray(data?.beforeItems, FALLBACK.beforeItems);
  const afterItems  = pickArray(data?.afterItems,  FALLBACK.afterItems);

  return (
    <section className="relative overflow-hidden pa-band-surface section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="relative z-10 max-w-6xl mx-auto">
        <MotionInView className="text-center mb-14">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight pa-ink-text leading-[1.15]">{heading}</h2>
        </MotionInView>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MotionInView>
            <div className="h-full rounded-2xl border border-[var(--pa-line)] bg-[var(--pa-card)] p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-400/30 flex items-center justify-center">
                  <X className="w-6 h-6 text-red-400" strokeWidth={2.5} />
                </div>
                <h3 className="pa-ink-text font-extrabold text-[1.65rem]">Before</h3>
              </div>
              <ul className="space-y-4">
                {beforeItems.map((item, i) => (
                  <MotionInView key={i} delay={0.1 + i * 0.08} className="flex items-center gap-3.5 pa-soft text-[15px]">
                    <X className="w-5 h-5 text-red-400 shrink-0" strokeWidth={2.5} />
                    {item}
                  </MotionInView>
                ))}
              </ul>
            </div>
          </MotionInView>

          <MotionInView delay={0.15}>
            <div className="h-full rounded-2xl border border-[var(--pa-line)] bg-[var(--pa-card)] p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center">
                  <Check className="w-6 h-6 text-cyan-300" strokeWidth={2.5} />
                </div>
                <h3 className="pa-ink-text font-extrabold text-[1.65rem]">After</h3>
              </div>
              <ul className="space-y-4">
                {afterItems.map((item, i) => (
                  <MotionInView key={i} delay={0.25 + i * 0.08} className="flex items-center gap-3.5 pa-soft text-[15px]">
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
