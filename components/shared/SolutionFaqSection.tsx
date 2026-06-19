"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface FaqItem { question: string; answer: string; }

interface CmsFaq {
  heading?:       string;
  highlightWord?: string;
  faqs?:          Array<{ question?: string; answer?: string }>;
}

interface Props {
  eyebrow?:  string;
  data?:     CmsFaq | null;
  defaults:  { heading: string; highlightWord: string; faqs: FaqItem[] };
}

export default function SolutionFaqSection({ eyebrow = "FAQ", data, defaults }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  const heading       = data?.heading       ?? defaults.heading;
  const highlightWord = data?.highlightWord ?? defaults.highlightWord;
  const faqs: FaqItem[] =
    data?.faqs && data.faqs.length > 0
      ? data.faqs.map(f => ({ question: f.question ?? "", answer: f.answer ?? "" }))
      : defaults.faqs;

  const hiIdx    = heading.indexOf(highlightWord);
  const before   = hiIdx >= 0 ? heading.slice(0, hiIdx) : heading;
  const highlight = hiIdx >= 0 ? highlightWord : "";
  const after     = hiIdx >= 0 ? heading.slice(hiIdx + highlightWord.length) : "";

  return (
    <section className="pa-band-page section-pad px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="pa-eyebrow">{eyebrow}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight pa-ink-text">
            {before}
            {highlight && <span className="pa-teal-text">{highlight}</span>}
            {after}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`pa-card rounded-2xl overflow-hidden transition-shadow duration-200 ${isOpen ? "shadow-md" : ""}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-[15px] pa-ink-text">{f.question}</span>
                  {isOpen
                    ? <Minus className="w-4 h-4 flex-shrink-0" style={{ color: "var(--pa-teal)" }} />
                    : <Plus  className="w-4 h-4 flex-shrink-0" style={{ color: "var(--pa-ink-2)" }} />
                  }
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px]" : "max-h-0"}`}>
                  <p className="px-6 pb-5 pa-soft text-[14px] leading-[1.8]">{f.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
