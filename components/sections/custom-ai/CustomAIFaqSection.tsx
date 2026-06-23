"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import { pickArray } from "@/lib/section-utils";

export interface CustomAIFaqData {
  sectionTag?: string;
  heading?: string;
  faqs?: Array<{ question?: string; answer?: string }>;
}

interface Props { data?: CustomAIFaqData | null }

const FALLBACK = {
  sectionTag: "FAQ",
  heading:    "Frequently Asked Questions",
  faqs: [
    { question: "Why not just use ChatGPT?",      answer: "ChatGPT is a general-purpose AI that doesn't understand print-specific workflows, pricing logic, or production constraints. Our custom AI systems are trained on your data, integrated with your systems (ERP, W2P, CRM), and built to handle the unique complexity of print operations." },
    { question: "What does a custom project cost?", answer: "Projects typically range from $15,000 to $75,000 depending on complexity, integrations, and scope. We provide a fixed-price quote after the scoping call, so there are no surprises. Most clients see ROI within 3–6 months through time savings and operational efficiency." },
    { question: "Do we own the code?",            answer: "Yes. You receive full source code ownership and complete documentation. There are no licensing fees, subscription locks, or vendor dependencies. The AI system is yours to maintain, modify, or extend as your business evolves." },
    { question: "How long does it take?",         answer: "Most projects are delivered in 6–10 weeks from contract signing. This includes scoping (week 1), proof of concept (weeks 2–4), full build and deployment (weeks 5–10), and 30 days of post-launch support. Timeline varies based on complexity and integration requirements." },
  ],
};

export default function CustomAIFaqSection({ data }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  const sectionTag = data?.sectionTag ?? FALLBACK.sectionTag;
  const heading    = data?.heading    ?? FALLBACK.heading;
  const faqs       = pickArray(data?.faqs, FALLBACK.faqs);

  return (
    <section className="relative overflow-hidden ai-section section-pad px-4" style={{ borderTop: "1px solid var(--pa-line)" }}>
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px]" style={{ background: "rgba(103,61,230,0.05)" }} />

      <div className="relative z-10 max-w-3xl mx-auto">
        <MotionInView className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-widest uppercase mb-5" style={{ border: "1px solid rgba(103,61,230,0.25)", background: "rgba(103,61,230,0.08)", color: "var(--pa-teal)" }}>{sectionTag}</span>
          <h2 className="text-[2rem] sm:text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight" style={{ color: "var(--pa-ink)" }}>{heading}</h2>
        </MotionInView>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <MotionInView key={i} delay={0.08 * i}>
                <div className="ai-card rounded-2xl border transition-all duration-300 overflow-hidden" style={{ border: isOpen ? "1px solid rgba(103,61,230,0.4)" : "1px solid var(--pa-line)", background: "var(--pa-card)", boxShadow: isOpen ? "0 0 28px rgba(103,61,230,0.1)" : undefined }}>
                  <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between px-7 py-5 text-left">
                    <span className="font-semibold text-[15px] pr-4" style={{ color: "var(--pa-ink)" }}>{f.question}</span>
                    <ChevronDown size={18} className="shrink-0 transition-transform duration-300" style={{ transform: isOpen ? "rotate(180deg)" : undefined, color: isOpen ? "var(--pa-teal)" : "var(--pa-ink-2)" }} />
                  </button>
                  <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: isOpen ? "500px" : "0" }}>
                    <p className="px-7 pb-6 text-[14px] leading-[1.85] whitespace-pre-line" style={{ color: "var(--pa-ink-2)" }}>{f.answer}</p>
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
