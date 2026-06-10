"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import { splitHeading } from "@/lib/section-utils";

export interface FaqBlockData {
  heading?: string;
  highlightWord?: string;
  faqs?: Array<{ question?: string; answer?: string }>;
}

export default function FaqBlockClient({ data }: { data: FaqBlockData }) {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = data.faqs ?? [];
  const [hb, hh, ha] = splitHeading(data.heading || "", data.highlightWord);

  if (faqs.length === 0) return null;

  return (
    <section className="relative section-pad px-4">
      <div className="max-w-3xl mx-auto">
        {data.heading && (
          <MotionInView className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {hb}{hh && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{hh}</span>}{ha}
            </h2>
          </MotionInView>
        )}
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <MotionInView key={i} delay={i * 0.06}>
                <div className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isOpen ? "border-[#06b6d4]/40 bg-[#0F172A]" : "border-[#1E293B] bg-[#0F172A]"}`}>
                  <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                    <span className="text-white font-semibold text-[15px] pr-4">{f.question}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#22d3ee]" : "text-[#64748B]"}`} strokeWidth={2} />
                  </button>
                  <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: isOpen ? 500 : 0 }}>
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
