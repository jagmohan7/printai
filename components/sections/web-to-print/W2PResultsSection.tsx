"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { pickArray } from "@/lib/section-utils";

export interface W2PResultsData {
  sectionTag?: string;
  heading?: string;
  subheading?: string;
  stats?: Array<{ value?: string; label?: string }>;
  footerText?: string;
}

interface Props { data?: W2PResultsData | null }

const FALLBACK = {
  sectionTag: "Impact",
  heading:    "Results After Rebuild",
  subheading: "Real impact on your bottom line",
  stats: [
    { value: "35–80%", label: "Increase in conversion rates" },
    { value: "20–30%", label: "Reduction in cart abandonment" },
    { value: "25%+",   label: "Increase in repeat revenue" },
    { value: "50%",    label: "Fewer manual corrections" },
  ],
  footerText: "These metrics are based on real rebuilds for print businesses ranging from small specialty printers to high-volume commercial operations",
};

// Stat color rotation — last stat gets teal-secondary, others teal
function statColor(i: number, total: number) {
  return i === total - 1
    ? { color: "var(--pa-teal)", glow: "rgba(103,61,230,0.2)" }
    : { color: "var(--pa-teal)", glow: "rgba(103,61,230,0.2)" };
}

export default function W2PResultsSection({ data }: Props) {
  const sectionTag = data?.sectionTag ?? FALLBACK.sectionTag;
  const heading    = data?.heading    ?? FALLBACK.heading;
  const subheading = data?.subheading ?? FALLBACK.subheading;
  const stats      = pickArray(data?.stats, FALLBACK.stats);
  const footerText = data?.footerText ?? FALLBACK.footerText;

  // Grid scales with count: 2-3 → 2-3 cols, 4+ → 4 cols
  const colsClass = stats.length <= 2 ? "lg:grid-cols-2" : stats.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <section className="pa-band-surface relative overflow-hidden section-pad px-4" style={{ borderTop: "1px solid var(--pa-line)" }}>
      <style>{`
        .stat-card { transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s; }
        .stat-card:hover { transform: translateY(-5px); }
        .stat-icon-wrap { transition: background 0.3s, box-shadow 0.3s; }
        .stat-card:hover .stat-icon-wrap { box-shadow: 0 0 20px var(--glow); }
      `}</style>

      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[130px]" style={{ background: "color-mix(in srgb, var(--pa-teal) 6%, transparent)" }} />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <MotionInView className="text-center mb-14">
          <p className="text-[13px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--pa-teal)" }}>{sectionTag}</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight leading-[1.15]" style={{ color: "var(--pa-ink)" }}>{heading}</h2>
          <p className="mt-4 text-[16px]" style={{ color: "var(--pa-ink-2)" }}>{subheading}</p>
        </MotionInView>

        <div className={`grid grid-cols-2 ${colsClass} gap-5 mb-10`}>
          {stats.map((s, i) => {
            const { color, glow } = statColor(i, stats.length);
            const Icon = getIcon("TrendingUp"); // generic upward arrow for stats — kept consistent
            return (
              <MotionInView key={i} delay={i * 0.1}>
                <div className="stat-card h-full rounded-2xl p-6 text-center" style={{ border: "1px solid var(--pa-line)", background: "var(--pa-card)", "--glow": glow } as React.CSSProperties}>
                  <div className="stat-icon-wrap w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5" style={{ background: `color-mix(in srgb, ${color} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 30%, transparent)` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <p className="font-extrabold text-[2rem] sm:text-[2.2rem] leading-none mb-2" style={{ color }}>{s.value}</p>
                  <p className="text-[13px] leading-[1.5]" style={{ color: "var(--pa-ink-2)" }}>{s.label}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>

        <MotionInView delay={0.5}>
          <p className="text-center text-[14px] leading-[1.8] max-w-2xl mx-auto whitespace-pre-line" style={{ color: "var(--pa-ink-2)" }}>{footerText}</p>
        </MotionInView>
      </div>
    </section>
  );
}
