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
          <span key={i} style={{ color: "var(--pa-teal)" }}>{p.slice(2, -2)}</span>
        ) : (
          <span key={i} className="pa-ink-text">{p}</span>
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
      <section id="use-cases" className="relative overflow-hidden pa-band-surface section-pad px-4 border-t border-[var(--pa-line)]">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] rounded-full bg-cyan-500/6 blur-[110px]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <MotionInView className="text-center mb-12">
            <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight pa-ink-text">{heading}</h2>
          </MotionInView>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {painCards.map((p, i) => {
              const Icon = getIcon(p.icon);
              return (
                <MotionInView key={i} delay={0.08 * i}>
                  <div className="pa-card pa-card-hover group h-full p-6 rounded-2xl border border-[var(--pa-line)] bg-[var(--pa-card)] hover:border-[color:var(--pa-teal)] hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(103,61,230,0.12)] transition-all duration-300">
                    <Icon size={22} className="mb-4" strokeWidth={1.5} style={{ color: "var(--pa-teal)" }} />
                    <p className="pa-ink-text font-bold text-[14px] leading-snug mb-1">{p.title}</p>
                    <p className="pa-soft text-[12px]">{p.sub}</p>
                  </div>
                </MotionInView>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden pa-band-page section-pad px-4 border-t border-[var(--pa-line)]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-900/30 via-[var(--pa-page)] to-cyan-900/20" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-violet-700/14 blur-[160px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <MotionInView>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-widest uppercase mb-7" style={{ border: "1px solid rgba(103,61,230,0.3)", background: "rgba(103,61,230,0.1)", color: "var(--pa-teal)" }}>{approachBadge}</span>
          </MotionInView>
          <MotionInView delay={0.1}>
            <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight leading-[1.1]">
              {approachHeadingLines.map((line, i) => renderHeadingLine(line, i, approachHeadingLines.length))}
            </h2>
          </MotionInView>
          <MotionInView delay={0.2}>
            <p className="mt-6 pa-soft text-[16px] sm:text-[18px] leading-[1.85] max-w-2xl mx-auto">{approachDescription}</p>
          </MotionInView>
        </div>
      </section>
    </>
  );
}
