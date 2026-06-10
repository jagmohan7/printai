"use client";
import { useState } from "react";
import MotionInView from "@/components/MotionInView";
import { splitHeading, pickArray } from "@/lib/section-utils";

export interface ERPFaqData {
  sectionTag?: string;
  heading?: string;
  highlightWord?: string;
  faqs?: Array<{ question?: string; answer?: string }>;
}

interface Props { data?: ERPFaqData | null }

const FALLBACK = {
  sectionTag:    "FAQ",
  heading:       "Frequently Asked Questions",
  highlightWord: "Questions",
  faqs: [
    { question: "Is ERPNext really free?",              answer: "Yes — ERPNext is 100% open-source under the MIT license. You pay for implementation, customisation, and ongoing support, not for software licenses. There are no per-seat fees or vendor lock-in." },
    { question: "Will I lose my QuickBooks history?",    answer: "No. We migrate your historical data — customers, vendors, invoices, and chart of accounts — into ERPNext before go-live so nothing is left behind." },
    { question: "How long does implementation take?",    answer: "Typically 6–12 weeks depending on shop complexity. We run a parallel period so your team is confident before you fully cut over." },
    { question: "Can it work with my existing MIS?",     answer: "In many cases yes. ERPNext has REST APIs and we've built integrations with several print MIS platforms. We assess compatibility during the Discovery phase." },
  ],
};

export default function ERPFaqSection({ data }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  const sectionTag    = data?.sectionTag    ?? FALLBACK.sectionTag;
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const faqs          = pickArray(data?.faqs, FALLBACK.faqs);

  const [hb, hh, ha] = splitHeading(heading, highlightWord);

  return (
    <section className="relative overflow-hidden bg-[#0B1220] section-pad px-4 border-t border-[#1E293B]/50">
      <style>{`
        .faq-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s; }
        .faq-body.open { grid-template-rows: 1fr; }
        .faq-body > div { overflow: hidden; }
        .faq-item { transition: border-color .25s, background .25s; }
        .faq-item:hover { border-color: rgba(124,58,237,.25); }
        .faq-item.open-item { border-color: rgba(124,58,237,.35); background: #14152a; }
        .faq-chevron { transition: transform .35s; }
        .faq-chevron.rotated { transform: rotate(180deg); }
      `}</style>

      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#7c3aed]/6 blur-[130px]" />

      <div className="relative z-10 max-w-[780px] mx-auto">
        <MotionInView className="text-center mb-12">
          <p className="text-[#a78bfa] text-[13px] font-semibold uppercase tracking-widest mb-3">{sectionTag}</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] font-extrabold tracking-tight text-white leading-[1.15]">
            {hb}{hh && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{hh}</span>}{ha}
          </h2>
        </MotionInView>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <MotionInView key={i} delay={i * 0.08}>
              <div className={`faq-item rounded-2xl border border-[#1E293B] bg-[#0F172A] overflow-hidden cursor-pointer ${open === i ? "open-item" : ""}`} onClick={() => setOpen(open === i ? null : i)}>
                <div className="flex items-center justify-between px-6 py-5 gap-4">
                  <p className="text-white font-semibold text-[15px] leading-[1.4]">{f.question}</p>
                  <svg className={`faq-chevron flex-shrink-0 w-5 h-5 text-[#94A3B8] ${open === i ? "rotated" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
                <div className={`faq-body ${open === i ? "open" : ""}`}>
                  <div>
                    <p className="px-6 pb-5 text-[#94A3B8] text-[14.5px] leading-[1.8] whitespace-pre-line">{f.answer}</p>
                  </div>
                </div>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
