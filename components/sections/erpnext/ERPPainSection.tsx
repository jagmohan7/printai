"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { splitHeading, pickArray } from "@/lib/section-utils";

export interface ERPPainData {
  sectionTag?: string;
  heading?: string;
  highlightWord?: string;
  subheading?: string;
  pains?: Array<{ icon?: string; title?: string; description?: string }>;
}

interface Props { data?: ERPPainData | null }

const FALLBACK = {
  sectionTag:    "The Problem",
  heading:       "Too Many Tools. Not Enough Clarity.",
  highlightWord: "Not Enough Clarity.",
  subheading:    "When your systems stop scaling",
  pains: [
    { icon: "BookOpen",  title: "QuickBooks + Spreadsheets + Manual Invoices", description: "Three tools for one job — none of them talk to each other" },
    { icon: "Eye",       title: "No Real-Time Visibility Into Jobs",            description: "You find out about delays after the customer calls" },
    { icon: "Package",   title: "Inventory Mismatches and Stockouts",           description: "Paper and substrate levels guessed, not tracked" },
    { icon: "BarChart2", title: "Margin Guessing Instead of Reporting",         description: "End-of-month surprises replace real-time profitability data" },
    { icon: "Clock",     title: "Time Scattered Across Systems",                description: "Staff jumps between apps to complete a single order" },
    { icon: "Database",  title: "Manual Data Entry and Reconciliation",         description: "Same data typed three times into three different systems" },
  ],
};

export default function ERPPainSection({ data }: Props) {
  const sectionTag    = data?.sectionTag    ?? FALLBACK.sectionTag;
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const subheading    = data?.subheading    ?? FALLBACK.subheading;
  const pains         = pickArray(data?.pains, FALLBACK.pains);

  const [hb, hh, ha] = splitHeading(heading, highlightWord);

  return (
    <section className="relative overflow-hidden bg-[#0B1220] section-pad px-4 border-t border-[#1E293B]/50">
      <style>{`
        .pain-card { transition: border-color .3s, box-shadow .3s, transform .3s, background .3s; }
        .pain-card:hover { border-color: rgba(124,58,237,.3); box-shadow: 0 0 32px rgba(124,58,237,.12); transform: translateY(-4px); background: #16172a; }
        .pain-icon-wrap { transition: background .3s, box-shadow .3s; }
        .pain-card:hover .pain-icon-wrap { background: rgba(124,58,237,.18); box-shadow: 0 0 20px rgba(124,58,237,.25); }
        .pain-card:hover .pain-icon { color: #a78bfa; }
      `}</style>

      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#7c3aed]/7 blur-[130px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <MotionInView className="text-center mb-14">
          <p className="text-[#a78bfa] text-[13px] font-semibold uppercase tracking-widest mb-3">{sectionTag}</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            {hb}{hh && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{hh}</span>}{ha}
          </h2>
          <p className="mt-4 text-[#94A3B8] text-[16px] max-w-xl mx-auto">{subheading}</p>
        </MotionInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pains.map((p, i) => {
            const Icon = getIcon(p.icon);
            return (
              <MotionInView key={i} delay={i * 0.09}>
                <div className="pain-card h-full rounded-2xl border border-[#1E293B] bg-[#0F172A] p-7">
                  <div className="pain-icon-wrap w-12 h-12 rounded-xl bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center mb-5">
                    <Icon className="pain-icon w-5 h-5 text-[#7c3aed]" />
                  </div>
                  <h3 className="text-white font-bold text-[15px] mb-2 leading-[1.4]">{p.title}</h3>
                  <p className="text-[#94A3B8] text-[14px] leading-[1.75]">{p.description}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
