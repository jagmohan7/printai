"use client";
import { CheckCircle2 } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import { pickArray } from "@/lib/section-utils";

export interface CustomAIIncludedData {
  sectionTag?: string;
  heading?: string;
  items?: string[];
}

interface Props { data?: CustomAIIncludedData | null }

const FALLBACK = {
  sectionTag: "Included",
  heading:    "What You Get With Every Build",
  items: [
    "US-based account lead",
    "Dedicated project manager",
    "Approved written spec before build",
    "Full source code ownership",
    "Integration with existing systems",
    "30-day post-launch support",
  ],
};

export default function CustomAIIncludedSection({ data }: Props) {
  const sectionTag = data?.sectionTag ?? FALLBACK.sectionTag;
  const heading    = data?.heading    ?? FALLBACK.heading;
  const items      = pickArray(data?.items, FALLBACK.items);

  return (
    <section className="relative overflow-hidden pa-band-page section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full bg-violet-600/8 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-cyan-500/6 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <MotionInView className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-widest uppercase mb-5" style={{ border: "1px solid rgba(103,61,230,0.25)", background: "rgba(103,61,230,0.08)", color: "var(--pa-teal)" }}>{sectionTag}</span>
          <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight pa-ink-text">{heading}</h2>
        </MotionInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <MotionInView key={i} delay={0.09 * i}>
              <div className="pa-card pa-card-hover group flex items-center gap-4 px-6 py-5 rounded-2xl border border-[var(--pa-line)] bg-[var(--pa-card)] hover:border-[color:var(--pa-teal)] hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(103,61,230,0.12)] transition-all duration-300">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "linear-gradient(to bottom right, var(--pa-teal), var(--pa-teal-deep))", boxShadow: "0 0 18px rgba(103,61,230,0.35)" }}>
                  <CheckCircle2 size={16} className="text-white" strokeWidth={2.5} />
                </div>
                <span className="pa-ink-text font-medium text-[15px]">{item}</span>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
