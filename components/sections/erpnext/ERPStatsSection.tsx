"use client";
import MotionInView from "@/components/MotionInView";
import { splitHeading, pickArray } from "@/lib/section-utils";

export interface ERPStatsData {
  sectionTag?: string;
  heading?: string;
  highlightWord?: string;
  stats?: Array<{ value?: string; label?: string; sub?: string }>;
}

interface Props { data?: ERPStatsData | null }

const FALLBACK = {
  sectionTag:    "Results",
  heading:       "What Changes After Implementation",
  highlightWord: "Implementation",
  stats: [
    { value: "$18K–$60K", label: "Annual Savings",  sub: "Replacing legacy tools" },
    { value: "40–60%",    label: "Lower Cost",      sub: "vs legacy MES" },
    { value: "Real-time", label: "Job Visibility",  sub: "Tracking across all jobs" },
    { value: "Zero",      label: "Spreadsheet",     sub: "Disconnection" },
  ],
};

const THEMES = [
  { color: "from-[#7c3aed] to-[#a78bfa]", glow: "rgba(124,58,237,.25)" },
  { color: "from-[#a78bfa] to-[#22d3ee]", glow: "rgba(167,139,250,.25)" },
  { color: "from-[#06b6d4] to-[#22d3ee]", glow: "rgba(6,182,212,.25)" },
  { color: "from-[#22d3ee] to-[#a78bfa]", glow: "rgba(34,211,238,.25)" },
];

export default function ERPStatsSection({ data }: Props) {
  const sectionTag    = data?.sectionTag    ?? FALLBACK.sectionTag;
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const stats         = pickArray(data?.stats, FALLBACK.stats);

  const [hb, hh, ha] = splitHeading(heading, highlightWord);

  return (
    <section className="relative overflow-hidden bg-[#0B1220] section-pad px-4 border-t border-[#1E293B]/50">
      <style>{`
        .stat-card { transition: border-color .3s, box-shadow .3s, transform .3s; }
        .stat-card:hover { transform: translateY(-5px); }
      `}</style>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#7c3aed]/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <MotionInView className="text-center mb-14">
          <p className="text-[#a78bfa] text-[13px] font-semibold uppercase tracking-widest mb-3">{sectionTag}</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            {hb}{hh && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{hh}</span>}{ha}
          </h2>
        </MotionInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => {
            const theme = THEMES[i % THEMES.length];
            return (
              <MotionInView key={i} delay={i * 0.1}>
                <div
                  className="stat-card rounded-2xl border border-[#1E293B] bg-[#0F172A] p-8 text-center"
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    const tone = theme.glow.replace(/rgba\(|\)/g, "").split(",").slice(0,3).join(",");
                    el.style.borderColor = `rgba(${tone}, .35)`;
                    el.style.boxShadow = `0 0 40px ${theme.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "";
                    el.style.boxShadow = "";
                  }}
                >
                  <p className={`text-[2rem] sm:text-[2.2rem] font-extrabold bg-gradient-to-r ${theme.color} bg-clip-text text-transparent mb-2 leading-tight`}>
                    {s.value}
                  </p>
                  <p className="text-white font-bold text-[15px] mb-1">{s.label}</p>
                  <p className="text-[#94A3B8] text-[13px]">{s.sub}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
