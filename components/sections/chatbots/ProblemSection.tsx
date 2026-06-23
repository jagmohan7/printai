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
    <section className="relative overflow-hidden pa-band-surface section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(103,61,230,0.05)" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <MotionInView className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black pa-ink-text tracking-tight leading-tight">
            {headBefore}
            {headHighlight && (
              <span style={{ color: "var(--pa-teal)" }}>
                {headHighlight}
              </span>
            )}
            {headAfter}
          </h2>
          <p className="mt-4 pa-soft text-lg max-w-2xl mx-auto">{subheading}</p>
        </MotionInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((p, i) => {
            const Icon = getIcon(p.icon);
            // Center the odd 5th card when there are exactly 5 — editors adding more items
            // get a clean 3-col grid; fewer get auto-balanced.
            const centerLast = problems.length === 5 && i === 4 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : "";
            return (
              <MotionInView key={i} delay={i * 0.1} className={centerLast}>
                <div className="group h-full p-6 rounded-2xl border border-[color:var(--pa-line)] bg-[var(--pa-card)] hover:border-[color:var(--pa-teal)] hover:shadow-[0_0_25px_rgba(103,61,230,0.15)] hover:-translate-y-1 transition-all duration-300 pa-card-hover">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "var(--pa-teal-soft)", border: "1px solid rgba(103,61,230,0.2)", color: "var(--pa-teal)" }}>
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className="pa-ink-text font-bold text-[16px] mb-2">{p.title}</h3>
                  <p className="pa-soft text-[14px] leading-relaxed">{p.description}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
