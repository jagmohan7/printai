"use client";
import MotionInView from "@/components/MotionInView";
import { splitHeading, pickArray } from "@/lib/section-utils";

export interface ERPComparisonData {
  sectionTag?: string;
  heading?: string;
  highlightWord?: string;
  traditionalItems?: string[];
  erpnextItems?: string[];
}

interface Props { data?: ERPComparisonData | null }

const FALLBACK = {
  sectionTag:    "Side by Side",
  heading:       "ERPNext vs Traditional Setup",
  highlightWord: "Traditional Setup",
  traditionalItems: [
    "QuickBooks for jobs, AR and pricing",
    "Spreadsheets for job tracking",
    "Manual job tickets",
    "Manual inventory tracking",
    "Blind guessing for reporting",
    "Siloed software at every step",
  ],
  erpnextItems: [
    "Central platform for all operations",
    "Real-time job & inventory data",
    "Automated workflow",
    "Automated operations",
    "Single source of truth",
    "Complete visibility & reporting",
  ],
};

export default function ERPComparisonSection({ data }: Props) {
  const sectionTag    = data?.sectionTag    ?? FALLBACK.sectionTag;
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const traditional   = pickArray(data?.traditionalItems, FALLBACK.traditionalItems);
  const erpnext       = pickArray(data?.erpnextItems,     FALLBACK.erpnextItems);

  const [hb, hh, ha] = splitHeading(heading, highlightWord);

  return (
    <section className="relative overflow-hidden bg-[#070B14] section-pad px-4 border-t border-[#1E293B]/50">
      <style>{`
        .comp-after { transition: border-color .3s, box-shadow .3s; }
        .comp-after:hover { border-color: rgba(6,182,212,.5); box-shadow: 0 0 50px rgba(6,182,212,.15); }
        .comp-before { transition: border-color .3s; }
        .comp-before:hover { border-color: rgba(255,255,255,.15); }
      `}</style>

      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#06b6d4]/6 blur-[140px]" />

      <div className="relative z-10 max-w-[1000px] mx-auto">
        <MotionInView className="text-center mb-14">
          <p className="text-[#22d3ee] text-[13px] font-semibold uppercase tracking-widest mb-3">{sectionTag}</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            {hb}{hh && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{hh}</span>}{ha}
          </h2>
        </MotionInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MotionInView from="right" delay={0.1}>
            <div className="comp-before h-full rounded-2xl border border-[#1E293B] bg-[#0F172A] p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <p className="text-white font-bold text-[17px]">Traditional Setup</p>
              </div>
              <ul className="space-y-4">
                {traditional.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#94A3B8] text-[14px] leading-[1.6]">
                    <svg className="mt-0.5 flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </MotionInView>

          <MotionInView from="left" delay={0.2}>
            <div className="comp-after h-full rounded-2xl border border-[#06b6d4]/35 bg-[#0d1a24] p-8 shadow-[0_0_40px_rgba(6,182,212,.1)]">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-8 h-8 rounded-lg bg-[#22d3ee]/15 border border-[#22d3ee]/30 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <p className="text-white font-bold text-[17px]">ERPNext System</p>
              </div>
              <ul className="space-y-4">
                {erpnext.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#94A3B8] text-[14px] leading-[1.6]">
                    <svg className="mt-0.5 flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </MotionInView>
        </div>
      </div>
    </section>
  );
}
