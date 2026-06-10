"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import { pickArray } from "@/lib/section-utils";

export interface ERPHeroData {
  badge?: string;
  headingLines?: string[];
  description?: string;
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  dashboard?: {
    topLabel?: string;
    topValue?: string;
    stats?: Array<{ label?: string; value?: string }>;
    progressBars?: Array<{ label?: string; percentage?: string }>;
    badges?: string[];
  };
}

interface Props { data?: ERPHeroData | null }

const FALLBACK: Required<Omit<ERPHeroData, "dashboard">> & { dashboard: NonNullable<ERPHeroData["dashboard"]> } = {
  badge: "ERPNext for Printers",
  headingLines: ["ERPNext for Printers —", "One System", "Instead of Five"],
  description: "Replace QuickBooks, spreadsheets, and disconnected tools with a single platform for jobs, inventory, billing, and CRM — built for how print shops actually operate.",
  ctaPrimaryText:   "Get ERP Demo",
  ctaPrimaryHref:   "/#contact",
  ctaSecondaryText: "Book Time Audit",
  ctaSecondaryHref: "/#contact",
  dashboard: {
    topLabel: "AR Testing",
    topValue: "47 Active",
    stats: [
      { label: "Revenue", value: "$124K" },
      { label: "Profit",  value: "$89K"  },
    ],
    progressBars: [
      { label: "$156R", percentage: "78%" },
      { label: "34%",   percentage: "34%" },
      { label: "62%",   percentage: "62%" },
    ],
    badges: ["Jobs Tracked", "Invoices Auto", "Zero Manual"],
  },
};

// Cycling colour palette for stats + bars
const STAT_COLORS  = ["text-[#22d3ee]", "text-[#a78bfa]", "text-[#34d399]", "text-[#fbbf24]"];
const BAR_GRADIENTS = [
  "from-[#3B82F6] to-[#06B6D4]",
  "from-[#7c3aed] to-[#7c3aed]",
  "from-[#06b6d4] to-[#22d3ee]",
  "from-[#a78bfa] to-[#22d3ee]",
];

export default function ERPHeroSection({ data }: Props) {
  const badge            = data?.badge            ?? FALLBACK.badge;
  const headingLines     = pickArray(data?.headingLines, FALLBACK.headingLines);
  const description      = data?.description      ?? FALLBACK.description;
  const ctaPrimaryText   = data?.ctaPrimaryText   ?? FALLBACK.ctaPrimaryText;
  const ctaPrimaryHref   = data?.ctaPrimaryHref   ?? FALLBACK.ctaPrimaryHref;
  const ctaSecondaryText = data?.ctaSecondaryText ?? FALLBACK.ctaSecondaryText;
  const ctaSecondaryHref = data?.ctaSecondaryHref ?? FALLBACK.ctaSecondaryHref;

  const d = data?.dashboard ?? FALLBACK.dashboard;
  const topLabel      = d.topLabel ?? FALLBACK.dashboard.topLabel!;
  const topValue      = d.topValue ?? FALLBACK.dashboard.topValue!;
  const stats         = pickArray(d.stats, FALLBACK.dashboard.stats!);
  const progressBars  = pickArray(d.progressBars, FALLBACK.dashboard.progressBars!);
  const badges        = pickArray(d.badges, FALLBACK.dashboard.badges!);

  return (
    <section className="relative min-h-screen bg-[#070B14] overflow-hidden">
      <style>{`
        @keyframes erp-fade-up { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes erp-blob { 0%,100% { transform:translateY(0) scale(1); } 50% { transform:translateY(-18px) scale(1.04); } }
        @keyframes erp-pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.4; transform:scale(.85); } }
        .erp-fu-1 { animation:erp-fade-up .7s ease both .1s; opacity:0; }
        .erp-fu-2 { animation:erp-fade-up .7s ease both .25s; opacity:0; }
        .erp-fu-3 { animation:erp-fade-up .7s ease both .4s; opacity:0; }
        .erp-fu-4 { animation:erp-fade-up .7s ease both .55s; opacity:0; }
        .erp-blob-a { animation:erp-blob 9s ease-in-out infinite; }
        .erp-blob-b { animation:erp-blob 12s ease-in-out infinite 3s; }
        .erp-pulse { animation:erp-pulse 2s ease-in-out infinite; }
        .dash-card { transition:box-shadow .3s, border-color .3s, transform .3s; }
        .dash-card:hover { box-shadow:0 0 40px rgba(124,58,237,.2); border-color:rgba(124,58,237,.35); transform:translateY(-3px); }
      `}</style>

      <div className="erp-blob-a pointer-events-none absolute left-[-6%] top-[15%] w-[520px] h-[520px] rounded-full bg-[#7c3aed]/14 blur-[140px]" />
      <div className="erp-blob-b pointer-events-none absolute right-[-4%] top-[40%] w-[420px] h-[420px] rounded-full bg-[#06b6d4]/10 blur-[130px]" />

      <div className="relative z-10 pt-[70px] min-h-screen flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="max-w-[1200px] mx-auto w-full px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="erp-fu-1 mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-[#0F172A]">
                <span className="erp-pulse w-2 h-2 rounded-full bg-violet-400 inline-block" />
                <span className="text-[13px] text-[#c4b5fd] font-medium tracking-wide">{badge}</span>
              </div>

              <h1 className="erp-fu-2 text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] font-extrabold tracking-tight leading-[1.1] text-white mb-6">
                {headingLines.map((line, i) => (
                  <span key={i}>
                    {i === 1 ? (
                      <span className="block">
                        <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{line}</span>
                      </span>
                    ) : (
                      <>{line}{i < headingLines.length - 1 && <br />}</>
                    )}
                  </span>
                ))}
              </h1>

              <p className="erp-fu-3 text-[#94A3B8] text-[16px] sm:text-[17px] leading-[1.8] max-w-[480px] mb-9">{description}</p>

              <div className="erp-fu-4 flex items-center gap-4 flex-wrap">
                <Link href={ctaPrimaryHref} className="inline-flex items-center gap-2.5 px-7 py-[13px] rounded-xl font-semibold text-[14.5px] text-white bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891b2] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_28px_rgba(59,130,246,0.4)]">
                  {ctaPrimaryText} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href={ctaSecondaryHref} className="inline-flex items-center gap-2.5 px-7 py-[13px] rounded-xl font-semibold text-[14.5px] text-white border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25 hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-sm">
                  {ctaSecondaryText}
                </Link>
              </div>
            </div>

            <MotionInView from="left" delay={0.3}>
              <div className="dash-card rounded-2xl border border-white/[0.09] bg-[#0F172A] p-6 shadow-[0_4px_60px_rgba(0,0,0,.5)]">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-[#94A3B8] text-[11px] uppercase tracking-widest font-semibold mb-0.5">{topLabel}</p>
                    <p className="text-white font-bold text-[16px]">{topValue}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#22d3ee] text-[12px] font-medium">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                    Live
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  {stats.slice(0, 2).map((s, i) => (
                    <div key={i} className="rounded-xl border border-[#1E293B] bg-[#0F172A] p-4">
                      <p className="text-[#94A3B8] text-[11px] uppercase tracking-widest font-semibold mb-1">{s.label}</p>
                      <p className={`${STAT_COLORS[i % STAT_COLORS.length]} font-extrabold text-[20px]`}>{s.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-[#1E293B] bg-[#0F172A] p-4 mb-3">
                  <p className="text-[#94A3B8] text-[11px] uppercase tracking-widest font-semibold mb-3">The Month</p>
                  <div className="space-y-3">
                    {progressBars.map((b, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-[11px] text-[#94A3B8] mb-1">
                          <span>{b.label}</span><span>{b.percentage}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                          <div className={`h-full rounded-full bg-gradient-to-r ${BAR_GRADIENTS[i % BAR_GRADIENTS.length]} transition-all duration-1000`} style={{ width: b.percentage }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  {badges.map((b, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[#94A3B8] text-[11px]">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </MotionInView>
          </div>
        </div>
      </div>
    </section>
  );
}
