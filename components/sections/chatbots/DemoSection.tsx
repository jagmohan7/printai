"use client";

import MotionInView from "@/components/MotionInView";
import Link from "next/link";

export interface DemoSectionData {
  heading?: string;
  highlightWord?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  demoMessages?: Array<{ userText?: string; botText?: string }>;
  quickReplyButtons?: string[];
}

interface Props { data?: DemoSectionData | null }

const FALLBACK = {
  heading:       "See a Real Chatbot in Action",
  highlightWord: "in Action",
  description:   "Watch PrintAI handle a real customer conversation — pricing, file specs, and a smooth human handoff. This is what your customers experience from the first message.",
  ctaText:       "Book 20-Min Demo",
  ctaHref:       "/#contact",
  demoMessages: [
    { userText: "I need 250 flyers, full color both sides",        botText: "" },
    { userText: "",                                                  botText: "250 Full-Color Flyers (Double-Sided):\n• Standard: $145\n• Premium Gloss: $185\nTurnaround: 3–5 days. Rush available (+$40). Which finish?" },
    { userText: "Premium gloss, standard turnaround",                botText: "" },
    { userText: "",                                                  botText: "Perfect! $185 for premium gloss 250 flyers. Your file needs: ✓ 0.125\" bleed · ✓ 300 DPI · ✓ CMYK" },
    { userText: "",                                                  botText: "Ready to upload your file or talk to our team? 👇" },
  ],
  quickReplyButtons: ["Upload File", "Talk to Team", "Get Full Quote"],
};

function splitHeading(heading: string, highlight?: string): [string, string, string] {
  if (!highlight) return [heading, "", ""];
  const idx = heading.indexOf(highlight);
  if (idx === -1) return [heading, "", ""];
  return [heading.slice(0, idx), highlight, heading.slice(idx + highlight.length)];
}

export default function DemoSection({ data }: Props) {
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const description   = data?.description   ?? FALLBACK.description;
  const ctaText       = data?.ctaText       ?? FALLBACK.ctaText;
  const ctaHref       = data?.ctaHref       ?? FALLBACK.ctaHref;
  const messages      = (data?.demoMessages && data.demoMessages.length > 0) ? data.demoMessages : FALLBACK.demoMessages;
  const buttons       = (data?.quickReplyButtons && data.quickReplyButtons.length > 0) ? data.quickReplyButtons : FALLBACK.quickReplyButtons;

  const [headBefore, headHighlight, headAfter] = splitHeading(heading, highlightWord);

  return (
    <section id="demo" className="relative overflow-hidden pa-band-surface section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <MotionInView delay={0}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black pa-ink-text tracking-tight leading-tight mb-5">
              {headBefore}
              {headHighlight && (
                <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                  {headHighlight}
                </span>
              )}
              {headAfter}
            </h2>
          </MotionInView>

          <MotionInView delay={0.1}>
            <p className="pa-soft text-lg leading-relaxed mb-8">{description}</p>
          </MotionInView>

          <MotionInView delay={0.2}>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold text-base shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_45px_rgba(59,130,246,0.6)] hover:-translate-y-0.5 transition-all duration-300"
            >
              {ctaText}
            </Link>
          </MotionInView>
        </div>

        <MotionInView delay={0.2} from="left">
          <div className="bg-[var(--pa-card)] border border-[var(--pa-line)] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.12)]">
            <div className="bg-[var(--pa-card)] border-b border-[var(--pa-line)] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center text-white text-sm font-bold">P</div>
                <div>
                  <p className="pa-ink-text text-sm font-semibold leading-none">PrintAI Assistant</p>
                  <p className="pa-soft text-[11px] mt-0.5">Print Specialist</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs font-medium">Online</span>
              </div>
            </div>

            <div className="p-5 space-y-4" style={{ background: "var(--pa-page)" }}>
              {messages.map((m, i) => (
                <div key={i} className="space-y-4">
                  {m.userText && (
                    <div className="flex justify-end">
                      <div className="max-w-[75%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white text-sm leading-relaxed">
                        {m.userText}
                      </div>
                    </div>
                  )}
                  {m.botText && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-sm bg-[var(--pa-card)] pa-ink-text text-sm leading-relaxed whitespace-pre-line">
                        {m.botText}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-[var(--pa-card)] border-t border-[var(--pa-line)] px-5 py-3 flex flex-wrap gap-2">
              {buttons.map((b, i) => (
                <button key={i} className="px-3 py-1.5 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-medium hover:bg-[#3B82F6]/20 transition-colors">
                  {b}
                </button>
              ))}
            </div>
          </div>
        </MotionInView>
      </div>
    </section>
  );
}
