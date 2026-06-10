"use client";

import MotionInView from "@/components/MotionInView";
import Link from "next/link";

// ── Shape of Sanity data driving this section ─────────────────────────────
export interface HeroChatbotsData {
  badge?: string;
  heading?: string;
  highlightWord?: string;
  subtext?: string;
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  supportText?: string;
  chatMessages?: Array<{ userText?: string; botText?: string }>;
}

interface Props {
  data?: HeroChatbotsData | null;
}

// ── Hardcoded fallbacks (used when CMS field is empty) ────────────────────
const FALLBACK: Required<Omit<HeroChatbotsData, "chatMessages">> & { chatMessages: Array<{ userText: string; botText: string }> } = {
  badge:              "AI Chatbot for Print Shops",
  heading:            "AI Chatbot Trained on How Your Print Shop Actually Quotes",
  highlightWord:      "Actually Quotes",
  subtext:            "Answer the repetitive 80% instantly — pricing, turnaround, file specs — and route complex jobs directly to your team.",
  ctaPrimaryText:     "Book a Free Demo",
  ctaPrimaryHref:     "/#contact",
  ctaSecondaryText:   "See It in Action",
  ctaSecondaryHref:   "#demo",
  supportText:        "No credit card · Setup in 48 hrs · Print-specific AI",
  chatMessages: [
    { userText: "How much for 500 business cards?", botText: "Hi! I can help with pricing, turnaround, file specs, and more. What are you looking to print today? 👋" },
    { userText: "Yes rush please. Also need bleeds?", botText: "500 Business Cards — $89 standard / $129 premium. 3–5 day turnaround. Want rush delivery? 🖨️" },
  ],
};

// ── Splits heading into [before, highlight, after] for gradient styling ──
function splitHeading(heading: string, highlight?: string): [string, string, string] {
  if (!highlight) return [heading, "", ""];
  const idx = heading.indexOf(highlight);
  if (idx === -1) return [heading, "", ""];
  return [heading.slice(0, idx), highlight, heading.slice(idx + highlight.length)];
}

export default function HeroChatbots({ data }: Props) {
  const badge            = data?.badge            ?? FALLBACK.badge;
  const heading          = data?.heading          ?? FALLBACK.heading;
  const highlightWord    = data?.highlightWord    ?? FALLBACK.highlightWord;
  const subtext          = data?.subtext          ?? FALLBACK.subtext;
  const ctaPrimaryText   = data?.ctaPrimaryText   ?? FALLBACK.ctaPrimaryText;
  const ctaPrimaryHref   = data?.ctaPrimaryHref   ?? FALLBACK.ctaPrimaryHref;
  const ctaSecondaryText = data?.ctaSecondaryText ?? FALLBACK.ctaSecondaryText;
  const ctaSecondaryHref = data?.ctaSecondaryHref ?? FALLBACK.ctaSecondaryHref;
  const supportText      = data?.supportText      ?? FALLBACK.supportText;
  const chatMessages     = (data?.chatMessages && data.chatMessages.length > 0)
    ? data.chatMessages
    : FALLBACK.chatMessages;

  const [headBefore, headHighlight, headAfter] = splitHeading(heading, highlightWord);
  const supportParts = supportText.split("·").map(s => s.trim()).filter(Boolean);

  return (
    <section className="relative overflow-hidden bg-[#070B14] section-hero px-4 flex items-center min-h-[92vh]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left col */}
        <div className="max-w-xl">
          <MotionInView delay={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6] text-[12px] font-semibold tracking-widest uppercase mb-6">
              {badge}
            </span>
          </MotionInView>

          <MotionInView delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6">
              {headBefore}
              {headHighlight && (
                <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                  {headHighlight}
                </span>
              )}
              {headAfter}
            </h1>
          </MotionInView>

          <MotionInView delay={0.2}>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed mb-8">{subtext}</p>
          </MotionInView>

          <MotionInView delay={0.3}>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href={ctaPrimaryHref}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold text-base shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_45px_rgba(59,130,246,0.6)] hover:-translate-y-0.5 transition-all duration-300"
              >
                {ctaPrimaryText}
              </Link>
              <Link
                href={ctaSecondaryHref}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[#1E293B] hover:border-[#3B82F6]/50 text-white font-semibold text-base hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:-translate-y-0.5 transition-all duration-300"
              >
                {ctaSecondaryText}
              </Link>
            </div>
          </MotionInView>

          <MotionInView delay={0.4}>
            <p className="text-[#64748B] text-sm flex flex-wrap items-center gap-x-3 gap-y-1">
              {supportParts.map((part, i) => (
                <span key={i} className="flex items-center gap-x-3">
                  <span>{part}</span>
                  {i < supportParts.length - 1 && <span className="text-[#1E293B]">·</span>}
                </span>
              ))}
            </p>
          </MotionInView>
        </div>

        {/* Right col — chat window */}
        <MotionInView delay={0.2} from="left">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.15)]">
            <div className="bg-[#0B1220] border-b border-[#1E293B] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center text-white text-sm font-bold">
                  P
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-none">PrintAI Assistant</p>
                  <p className="text-[#64748B] text-[11px] mt-0.5">Print Specialist</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs font-medium">Online</span>
              </div>
            </div>

            <div className="p-5 space-y-4 bg-[#070B14]">
              {chatMessages.map((msg, i) => (
                <div key={i} className="space-y-4">
                  {msg.botText && (
                    <div className="flex justify-start">
                      <div className="max-w-[82%] px-4 py-2.5 rounded-2xl rounded-bl-sm bg-[#1E293B] text-white text-sm leading-relaxed">
                        {msg.botText}
                      </div>
                    </div>
                  )}
                  {msg.userText && (
                    <div className="flex justify-end">
                      <div className="max-w-[75%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white text-sm leading-relaxed">
                        {msg.userText}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-[#0B1220] border-t border-[#1E293B] px-5 py-3 flex gap-2">
              <button className="px-3 py-1.5 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-medium hover:bg-[#3B82F6]/20 transition-colors">
                Get a Quote
              </button>
              <button className="px-3 py-1.5 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-medium hover:bg-[#3B82F6]/20 transition-colors">
                Talk to Team
              </button>
            </div>
          </div>
        </MotionInView>
      </div>
    </section>
  );
}
