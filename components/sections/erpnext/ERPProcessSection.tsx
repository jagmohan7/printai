"use client";
import MotionInView from "@/components/MotionInView";
import { splitHeading, pickArray } from "@/lib/section-utils";

export interface ERPProcessData {
  sectionTag?: string;
  heading?: string;
  highlightWord?: string;
  steps?: Array<{ stepNumber?: string; label?: string; items?: string[] }>;
}

interface Props { data?: ERPProcessData | null }

const FALLBACK = {
  sectionTag:    "Implementation",
  heading:       "How We Move You to ERPNext",
  highlightWord: "ERPNext",
  steps: [
    { stepNumber: "01", label: "Discovery",      items: ["Analyze workflows", "Shadow best operations"] },
    { stepNumber: "02", label: "Build & Pilot",  items: ["Configure ERPNext", "Run parallel systems"] },
    { stepNumber: "03", label: "Cutover",        items: ["Go live", "Support & stabilization"] },
  ],
};

// Cycling gradient/dot themes per step index
const THEMES = [
  { color: "from-[#7c3aed] to-[#a78bfa]", dotColor: "bg-[#7c3aed]",                                  ring: "border-[#7c3aed]/40" },
  { color: "from-[#a78bfa] to-[#22d3ee]", dotColor: "bg-[#22d3ee]",                                  ring: "border-[#22d3ee]/40" },
  { color: "from-[#06b6d4] to-[#22d3ee]", dotColor: "bg-gradient-to-b from-[#06b6d4] to-[#22d3ee]",  ring: "border-[#06b6d4]/40" },
  { color: "from-[#a78bfa] to-[#7c3aed]", dotColor: "bg-[#a78bfa]",                                  ring: "border-[#a78bfa]/40" },
];

export default function ERPProcessSection({ data }: Props) {
  const sectionTag    = data?.sectionTag    ?? FALLBACK.sectionTag;
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const steps         = pickArray(data?.steps, FALLBACK.steps);

  const [hb, hh, ha] = splitHeading(heading, highlightWord);

  return (
    <section className="relative overflow-hidden bg-[#070B14] section-pad px-4 border-t border-[#1E293B]/50">
      <style>{`
        .step-card { transition: border-color .3s, box-shadow .3s, transform .3s; }
        .step-card:hover { border-color: rgba(124,58,237,.35); box-shadow: 0 0 36px rgba(124,58,237,.14); transform: translateX(4px); }
      `}</style>

      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#7c3aed]/8 blur-[120px]" />

      <div className="relative z-10 max-w-[800px] mx-auto">
        <MotionInView className="text-center mb-14">
          <p className="text-[#a78bfa] text-[13px] font-semibold uppercase tracking-widest mb-3">{sectionTag}</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            {hb}{hh && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{hh}</span>}{ha}
          </h2>
        </MotionInView>

        <div className="relative">
          <div className="absolute left-[23px] top-8 bottom-8 w-px bg-gradient-to-b from-[#7c3aed]/60 via-[#22d3ee]/40 to-[#7c3aed]/0" />

          <div className="space-y-5">
            {steps.map((s, i) => {
              const theme = THEMES[i % THEMES.length];
              const items = pickArray(s.items, []);
              return (
                <MotionInView key={i} from="right" delay={i * 0.15}>
                  <div className="relative flex items-start gap-5">
                    <div className={`relative z-10 w-12 h-12 rounded-full ${theme.dotColor} ${theme.ring} border-2 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(124,58,237,.3)]`}>
                      <span className="text-white font-bold text-[11px]">{s.stepNumber || String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="step-card flex-1 rounded-2xl border border-[#1E293B] bg-[#0F172A] p-6">
                      <p className={`text-[18px] font-bold bg-gradient-to-r ${theme.color} bg-clip-text text-transparent mb-3`}>{s.label}</p>
                      <ul className="space-y-2">
                        {items.map((item, j) => (
                          <li key={j} className="flex items-center gap-2.5 text-[#94A3B8] text-[14px]">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </MotionInView>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
