"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { pickArray } from "@/lib/section-utils";

export interface CustomAIProblemsData {
  heading?: string;
  painCards?: Array<{ icon?: string; title?: string; sub?: string }>;
  approachBadge?: string;
  approachHeadingLines?: string[]; // ** for gradient
  approachDescription?: string;
}

interface Props { data?: CustomAIProblemsData | null }

const FALLBACK = {
  heading: "When Off-the-Shelf AI Stops Working",
  painCards: [
    { icon: "AlertCircle", title: "Complex pricing logic", sub: "40+ variables" },
    { icon: "Zap",         title: "Zapier/workflow tools", sub: "hitting limits" },
    { icon: "Unlink",      title: "Systems not connected", sub: "ERP, W2P, marketplaces" },
    { icon: "DollarSign",  title: "Static pricing",        sub: "not adapting to costs" },
    { icon: "Clock",       title: "Long timelines",        sub: "from vendors" },
  ],
  approachBadge: "Our Approach",
  approachHeadingLines: ["AI Built Around Your", "**Print Operations**"],
  approachDescription: "We design and build custom AI systems that fit your workflow — not force your workflow to fit the tool.",
};

function renderHeadingLine(line: string, key: number, total: number) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span key={key}>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <span key={i} className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{p.slice(2, -2)}</span>
        ) : (
          <span key={i} className="text-white">{p}</span>
        )
      )}
      {key < total - 1 && <br />}
    </span>
  );
}

export default function CustomAIProblemsSection({ data }: Props) {
  const heading             = data?.heading             ?? FALLBACK.heading;
  const painCards           = pickArray(data?.painCards, FALLBACK.painCards);
  const approachBadge       = data?.approachBadge       ?? FALLBACK.approachBadge;
  const approachHeadingLines = pickArray(data?.approachHeadingLines, FALLBACK.approachHeadingLines);
  const approachDescription = data?.approachDescription ?? FALLBACK.approachDescription;

  return (
    <>
      <section id="use-cases" className="relative overflow-hidden ai-section section-pad px-4 border-t border-[#1E293B]/50">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] rounded-full bg-cyan-500/6 blur-[110px]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <MotionInView className="text-center mb-12">
            <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight text-white">{heading}</h2>
          </MotionInView>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {painCards.map((p, i) => {
              const Icon = getIcon(p.icon);
              return (
                <MotionInView key={i} delay={0.08 * i}>
                  <div className="ai-card group h-full p-6 rounded-2xl border border-[#1E293B] bg-[#0F172A] hover:border-[#06b6d4]/40 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(6,182,212,0.12)] transition-all duration-300">
                    <Icon size={22} className="text-[#06b6d4] mb-4" strokeWidth={1.5} />
                    <p className="text-white font-bold text-[14px] leading-snug mb-1">{p.title}</p>
                    <p className="text-[#94A3B8] text-[12px]">{p.sub}</p>
                  </div>
                </MotionInView>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden section-pad px-4 border-t border-[#1E293B]/50">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-900/30 via-[#0a0b14] to-cyan-900/20" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-violet-700/14 blur-[160px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <MotionInView>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-[#c4b5fd] text-[12px] font-semibold tracking-widest uppercase mb-7">{approachBadge}</span>
          </MotionInView>
          <MotionInView delay={0.1}>
            <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight leading-[1.1]">
              {approachHeadingLines.map((line, i) => renderHeadingLine(line, i, approachHeadingLines.length))}
            </h2>
          </MotionInView>
          <MotionInView delay={0.2}>
            <p className="mt-6 text-[#94A3B8] text-[16px] sm:text-[18px] leading-[1.85] max-w-2xl mx-auto">{approachDescription}</p>
          </MotionInView>
        </div>
      </section>
    </>
  );
}
