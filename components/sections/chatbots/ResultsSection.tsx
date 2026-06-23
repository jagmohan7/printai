"use client";

import MotionInView from "@/components/MotionInView";

export interface ResultsSectionData {
  heading?: string;
  highlightWord?: string;
  subheading?: string;
  stats?: Array<{ value?: string; label?: string }>;
}

interface Props { data?: ResultsSectionData | null }

const FALLBACK = {
  heading:       "What Print Shops See in 30–60 Days",
  highlightWord: "30–60 Days",
  subheading:    "Real numbers from real print operations.",
  stats: [
    { value: "8–14 hrs", label: "Saved per CSR weekly" },
    { value: "38%",      label: "More after-hours leads" },
    { value: "<3 min",   label: "Average quote response" },
    { value: "20%+",     label: "Customer self-service rate" },
  ],
};

function splitHeading(heading: string, highlight?: string): [string, string, string] {
  if (!highlight) return [heading, "", ""];
  const idx = heading.indexOf(highlight);
  if (idx === -1) return [heading, "", ""];
  return [heading.slice(0, idx), highlight, heading.slice(idx + highlight.length)];
}

export default function ResultsSection({ data }: Props) {
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const subheading    = data?.subheading    ?? FALLBACK.subheading;
  const stats         = (data?.stats && data.stats.length > 0) ? data.stats : FALLBACK.stats;

  const [headBefore, headHighlight, headAfter] = splitHeading(heading, highlightWord);

  // Grid adapts: ≤2 → 2 cols, 3 → 3 cols, 4+ → 4 cols (more wrap to next row)
  const colsClass = stats.length <= 2 ? "lg:grid-cols-2" : stats.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <section className="relative overflow-hidden pa-band-page section-pad px-4 border-t border-[var(--pa-line)]">
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

        <div className={`grid grid-cols-2 ${colsClass} gap-5`}>
          {stats.map((s, i) => (
            <MotionInView key={i} delay={i * 0.1}>
              <div className="group h-full flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-[color:var(--pa-line)] bg-[var(--pa-card)] hover:border-[color:var(--pa-teal)] hover:shadow-[0_0_30px_rgba(103,61,230,0.15)] hover:-translate-y-1 transition-all duration-300 pa-card-hover">
                <p className="text-4xl sm:text-5xl font-black mb-3" style={{ color: "var(--pa-teal)" }}>
                  {s.value}
                </p>
                <p className="pa-soft text-[14px] font-medium leading-snug">{s.label}</p>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
