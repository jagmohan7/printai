"use client";
import { AlertTriangle } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import { splitHeading, pickArray } from "@/lib/section-utils";

export interface DevOpsCostData {
  heading?: string;
  highlightText?: string;
  costItems?: string[];
}

interface Props { data?: DevOpsCostData | null }

const FALLBACK = {
  heading: "The Real Cost of Unstable Infrastructure",
  highlightText: "Unstable Infrastructure",
  costItems: [
    "Lost orders due to failed uploads",
    "Slow websites frustrating customers",
    "Security risks with customer/payment data",
    "Production delays from system failures",
    "Teams stuck fixing issues instead of scaling",
  ],
};

export default function DevOpsCostSection({ data }: Props) {
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightText = data?.highlightText ?? FALLBACK.highlightText;
  const costs         = pickArray(data?.costItems, FALLBACK.costItems);

  const [hb, hh, ha] = splitHeading(heading, highlightText);
  // Highlight the middle item with a stronger red border for visual rhythm
  const accentIdx = Math.floor(costs.length / 2);

  return (
    <section className="relative overflow-hidden pa-band-page section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-red-900/6 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <MotionInView className="text-center mb-12">
          <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight pa-ink-text leading-[1.15]">
            {hb}{hh && <span className="text-red-400">{hh}</span>}{ha}
          </h2>
        </MotionInView>

        <div className="space-y-3">
          {costs.map((item, i) => (
            <MotionInView key={i} delay={0.1 + i * 0.1}>
              <div className={`group flex items-center gap-4 px-7 py-5 rounded-2xl border transition-all duration-300 ${i === accentIdx ? "border-red-500/50 bg-[var(--pa-card)] shadow-[0_0_24px_rgba(239,68,68,0.12)]" : "border-[var(--pa-line)] bg-[var(--pa-card)] hover:border-red-400/30 hover:shadow-[0_4px_24px_rgba(239,68,68,0.08)]"}`}>
                <AlertTriangle size={20} className="text-red-400 shrink-0" strokeWidth={2} />
                <span className="pa-ink-text text-[15px] font-medium">{item}</span>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
