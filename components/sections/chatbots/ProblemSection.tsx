"use client";

import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";

export interface ProblemSectionData {
  heading?: string;
  highlightWord?: string;
  subheading?: string;
  problems?: Array<{ icon?: string; title?: string; description?: string }>;
}

interface Props { data?: ProblemSectionData | null }

const FALLBACK = {
  heading:       "Where Print Shops Lose Leads",
  highlightWord: "Lose Leads",
  subheading:    "Every unanswered inquiry is a lost sale. Here's where the cracks form.",
  problems: [
    { icon: "Clock",        title: "Quote Requests Sitting Overnight",   description: "Leads go cold while your team sleeps. First responder wins 78% of jobs." },
    { icon: "RefreshCw",    title: "CSRs Repeating the Same Answers",    description: "Pricing, turnaround, specs — said 30 times a day drains your best people." },
    { icon: "TrendingDown", title: "After-Hours Leads Going Cold",       description: "Over 60% of inquiries arrive outside business hours. Zero response = zero sale." },
    { icon: "FileQuestion", title: "File-Prep Questions on Repeat",      description: "Bleed, DPI, color mode — the same questions every single day." },
    { icon: "RotateCcw",    title: "Reorder Friction",                   description: "Customers can't find their specs or reorder easily. They go elsewhere." },
  ],
};

function splitHeading(heading: string, highlight?: string): [string, string, string] {
  if (!highlight) return [heading, "", ""];
  const idx = heading.indexOf(highlight);
  if (idx === -1) return [heading, "", ""];
  return [heading.slice(0, idx), highlight, heading.slice(idx + highlight.length)];
}

export default function ProblemSection({ data }: Props) {
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const subheading    = data?.subheading    ?? FALLBACK.subheading;
  const problems      = (data?.problems && data.problems.length > 0) ? data.problems : FALLBACK.problems;

  const [headBefore, headHighlight, headAfter] = splitHeading(heading, highlightWord);

  return (
    <section className="relative overflow-hidden bg-[#0B1220] section-pad px-4 border-t border-[#1E293B]/50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <MotionInView className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {headBefore}
            {headHighlight && (
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                {headHighlight}
              </span>
            )}
            {headAfter}
          </h2>
          <p className="mt-4 text-[#94A3B8] text-lg max-w-2xl mx-auto">{subheading}</p>
        </MotionInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((p, i) => {
            const Icon = getIcon(p.icon);
            // Center the odd 5th card when there are exactly 5 — editors adding more items
            // get a clean 3-col grid; fewer get auto-balanced.
            const centerLast = problems.length === 5 && i === 4 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : "";
            return (
              <MotionInView key={i} delay={i * 0.1} className={centerLast}>
                <div className="group h-full p-6 rounded-2xl border border-[#1E293B] bg-[#0F172A] hover:border-[#3B82F6]/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.12)] hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-[#3B82F6]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-white font-bold text-[16px] mb-2">{p.title}</h3>
                  <p className="text-[#94A3B8] text-[14px] leading-relaxed">{p.description}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
