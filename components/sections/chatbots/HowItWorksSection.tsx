"use client";

import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";

export interface HowItWorksSectionData {
  heading?: string;
  highlightWord?: string;
  subheading?: string;
  steps?: Array<{ stepNumber?: string; icon?: string; title?: string; description?: string }>;
}

interface Props { data?: HowItWorksSectionData | null }

const FALLBACK = {
  heading:       "How PrintAI Chatbots Work",
  highlightWord: "Chatbots Work",
  subheading:    "From catalog training to 24/7 customer conversations — set up in 48 hours.",
  steps: [
    { stepNumber: "01", icon: "Database", title: "Train on Your Catalog",     description: "We feed your pricing, products, turnaround, and file specs into the AI. It learns your shop, not a generic template." },
    { stepNumber: "02", icon: "Globe",    title: "Connect to Your Channels",   description: "Deploy on your website, WhatsApp, or email. Your chatbot answers instantly — 24/7, in English and Spanish." },
    { stepNumber: "03", icon: "Users",    title: "Smart Human Handoff",        description: "Complex jobs, custom quotes, and escalations are instantly routed to your team with full context." },
  ],
};

function splitHeading(heading: string, highlight?: string): [string, string, string] {
  if (!highlight) return [heading, "", ""];
  const idx = heading.indexOf(highlight);
  if (idx === -1) return [heading, "", ""];
  return [heading.slice(0, idx), highlight, heading.slice(idx + highlight.length)];
}

export default function HowItWorksSection({ data }: Props) {
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const subheading    = data?.subheading    ?? FALLBACK.subheading;
  const steps         = (data?.steps && data.steps.length > 0) ? data.steps : FALLBACK.steps;

  const [headBefore, headHighlight, headAfter] = splitHeading(heading, highlightWord);

  // Grid columns adjust to step count so editors can add 4-5 steps without breaking layout
  const colsClass = steps.length <= 3 ? "md:grid-cols-3" : steps.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3 lg:grid-cols-5";

  return (
    <section className="relative overflow-hidden pa-band-page section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(103,61,230,0.05)" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <MotionInView className="text-center mb-16">
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

        <div className={`grid grid-cols-1 ${colsClass} gap-6 relative`}>
          {/* Dashed connector line scales with step count */}
          {steps.length === 3 && (
            <div className="hidden md:block absolute top-[52px] left-[calc(16.7%+24px)] right-[calc(16.7%+24px)] h-px border-t border-dashed border-[var(--pa-line)]" />
          )}

          {steps.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
              <MotionInView key={i} delay={i * 0.15}>
                <div className="group relative h-full p-8 rounded-2xl border border-[color:var(--pa-line)] bg-[var(--pa-card)] hover:border-[color:var(--pa-teal)] hover:shadow-[0_0_25px_rgba(103,61,230,0.15)] transition-all duration-300 pa-card-hover">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg mb-6 relative z-10" style={{ background: "var(--pa-teal)", boxShadow: "0 0 20px rgba(103,61,230,0.4)" }}>
                    {s.stepNumber || String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--pa-teal-soft)", border: "1px solid rgba(103,61,230,0.2)", color: "var(--pa-teal)" }}>
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className="pa-ink-text font-bold text-[17px] mb-3">{s.title}</h3>
                  <p className="pa-soft text-[14px] leading-relaxed">{s.description}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
