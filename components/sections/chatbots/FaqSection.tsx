"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import MotionInView from "@/components/MotionInView";

export interface FaqSectionData {
  heading?: string;
  highlightWord?: string;
  faqs?: Array<{ question?: string; answer?: string }>;
}

interface Props { data?: FaqSectionData | null }

const FALLBACK = {
  heading:       "Frequently Asked Questions",
  highlightWord: "Questions",
  faqs: [
    { question: "Will the chatbot replace my CSRs?",          answer: "No — it handles the repetitive 80% (pricing, specs, turnarounds) so your CSRs focus on complex jobs, large accounts, and relationships. Most shops see CSR productivity increase by 30–40%." },
    { question: "How long does setup take?",                  answer: "Most shops are live in 48–72 hours. We handle everything: training on your catalog, connecting your channels, and testing. You approve before it goes live." },
    { question: "Can it integrate with my existing tools?",   answer: "Yes. We integrate with ERPNext, most print MIS platforms, CRMs, and communication tools including WhatsApp Business. Our team assesses your stack during onboarding." },
    { question: "What if it gives a wrong quote?",            answer: "The AI is trained on your exact pricing and flags anything outside its confidence threshold for human review. Accuracy improves monthly through our optimization service." },
    { question: "How much does it cost?",                     answer: "Pricing is based on your volume and channels. Most shops see full ROI within 30 days from saved CSR time and captured after-hours leads. Book a demo for a custom quote." },
  ],
};

function splitHeading(heading: string, highlight?: string): [string, string, string] {
  if (!highlight) return [heading, "", ""];
  const idx = heading.indexOf(highlight);
  if (idx === -1) return [heading, "", ""];
  return [heading.slice(0, idx), highlight, heading.slice(idx + highlight.length)];
}

export default function FaqSection({ data }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const faqs          = (data?.faqs && data.faqs.length > 0) ? data.faqs : FALLBACK.faqs;

  const [headBefore, headHighlight, headAfter] = splitHeading(heading, highlightWord);

  return (
    <section className="relative overflow-hidden bg-[#070B14] section-pad px-4 border-t border-[#1E293B]/50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <MotionInView className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {headBefore}
            {headHighlight && (
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                {headHighlight}
              </span>
            )}
            {headAfter}
          </h2>
        </MotionInView>

        <div className="space-y-4">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <MotionInView key={i} delay={i * 0.08}>
                <div className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isOpen ? "border-[#3B82F6]/40 bg-[#0F172A] shadow-[0_0_20px_rgba(59,130,246,0.1)]" : "border-[#1E293B] bg-[#0F172A]"}`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="text-white font-semibold text-[15px] pr-4">{f.question}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#3B82F6]" : "text-[#64748B]"}`} strokeWidth={2} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="px-6 pb-5 text-[#94A3B8] text-[14px] leading-[1.8] whitespace-pre-line">{f.answer}</p>
                  </div>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
