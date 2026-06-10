"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pickArray } from "@/lib/section-utils";

export interface W2PHeroData {
  badge?: string;
  headingLines?: string[];
  description?: string;
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  configurator?: {
    productName?: string;
    productVariant?: string;
    quantities?: string[];
    paperStocks?: string[];
    finishingOptions?: string[];
    basePrice?: string;
    discountPrice?: string;
    badges?: Array<{ icon?: string; label?: string }>;
  };
}

interface Props { data?: W2PHeroData | null }

const FALLBACK: Required<Omit<W2PHeroData, "configurator">> & { configurator: NonNullable<W2PHeroData["configurator"]> } = {
  badge:            "Web-to-Print Platform",
  headingLines:     ["Web-to-Print Stores", "That Don't Break", "When Real Orders", "Come In"],
  description:      "Build storefronts that handle real-world print complexity — pricing, file uploads, finishing options, and shipping logic — without breaking at scale.",
  ctaPrimaryText:   "Get Store Audit",
  ctaPrimaryHref:   "/#contact",
  ctaSecondaryText: "See Store Examples",
  ctaSecondaryHref: "#features",
  configurator: {
    productName:      "Business Cards – Premium",
    productVariant:   "350gsm Silk Finish",
    quantities:       ["250", "500", "1000", "2500"],
    paperStocks:      ["350gsm Silk"],
    finishingOptions: ["Rounded Corners", "Spot UV", "Foiling", "Embossing"],
    basePrice:        "$156.50",
    discountPrice:    "$189.00",
    badges: [
      { icon: "⚙️", label: "Auto-config" },
      { icon: "📄", label: "Preflight" },
      { icon: "🚚", label: "Smart ship" },
    ],
  },
};

const heroCls = "text-[2.4rem] sm:text-[3rem] lg:text-[3.8rem] font-extrabold tracking-tight leading-[1.1]";

export default function W2PHeroSection({ data }: Props) {
  const badge            = data?.badge            ?? FALLBACK.badge;
  const headingLines     = pickArray(data?.headingLines, FALLBACK.headingLines);
  const description      = data?.description      ?? FALLBACK.description;
  const ctaPrimaryText   = data?.ctaPrimaryText   ?? FALLBACK.ctaPrimaryText;
  const ctaPrimaryHref   = data?.ctaPrimaryHref   ?? FALLBACK.ctaPrimaryHref;
  const ctaSecondaryText = data?.ctaSecondaryText ?? FALLBACK.ctaSecondaryText;
  const ctaSecondaryHref = data?.ctaSecondaryHref ?? FALLBACK.ctaSecondaryHref;

  const c                = data?.configurator ?? FALLBACK.configurator;
  const productName      = c.productName      ?? FALLBACK.configurator.productName!;
  const productVariant   = c.productVariant   ?? FALLBACK.configurator.productVariant!;
  const quantities       = pickArray(c.quantities,       FALLBACK.configurator.quantities!);
  const paperStocks      = pickArray(c.paperStocks,      FALLBACK.configurator.paperStocks!);
  const finishingOptions = pickArray(c.finishingOptions, FALLBACK.configurator.finishingOptions!);
  const basePrice        = c.basePrice        ?? FALLBACK.configurator.basePrice!;
  const discountPrice    = c.discountPrice    ?? FALLBACK.configurator.discountPrice!;
  const badges           = pickArray(c.badges,           FALLBACK.configurator.badges!);

  // Active selections (first item per group acts as the visually active one)
  const activeQty    = quantities[1] ?? quantities[0];
  const activeFinish = finishingOptions[0];

  return (
    <section id="home" className="relative min-h-screen bg-[#070B14] overflow-hidden">
      <style>{`
        @keyframes float-blob { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-22px) scale(1.03); } }
        @keyframes fade-up { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(0.85); } }
        .blob-a { animation: float-blob 8s ease-in-out infinite; }
        .blob-b { animation: float-blob 11s ease-in-out infinite 2s; }
        .hero-fu-1 { animation: fade-up 0.7s ease both 0.1s; opacity:0; }
        .hero-fu-2 { animation: fade-up 0.7s ease both 0.25s; opacity:0; }
        .hero-fu-3 { animation: fade-up 0.7s ease both 0.4s; opacity:0; }
        .hero-fu-4 { animation: fade-up 0.7s ease both 0.55s; opacity:0; }
        .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
        .config-card { transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s; }
        .config-card:hover { box-shadow: 0 0 40px rgba(6,182,212,0.18); border-color: rgba(6,182,212,0.35); transform: translateY(-3px); }
        .qty-btn { transition: background 0.2s, color 0.2s, box-shadow 0.2s; }
        .qty-btn.active { background: linear-gradient(135deg, #7c3aed, #06b6d4); color: #fff; box-shadow: 0 0 16px rgba(6,182,212,0.4); }
        .qty-btn:not(.active):hover { background: rgba(255,255,255,0.06); color: #fff; }
        .finish-btn { transition: background 0.2s, border-color 0.2s, color 0.2s; cursor: pointer; }
        .finish-btn.active { border-color: #06b6d4; color: #22d3ee; background: rgba(6,182,212,0.08); }
        .finish-btn:not(.active):hover { border-color: rgba(255,255,255,0.2); color: #fff; }
      `}</style>

      <div className="blob-a pointer-events-none absolute left-[-5%] top-[20%] w-[500px] h-[500px] rounded-full bg-[#7c3aed]/15 blur-[130px]" />
      <div className="blob-b pointer-events-none absolute right-[-4%] top-[35%] w-[400px] h-[400px] rounded-full bg-[#06b6d4]/12 blur-[120px]" />

      <div className="relative z-10 pt-[70px] min-h-screen flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="max-w-[1200px] mx-auto w-full px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="hero-fu-1 mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-[#0F172A]">
                <span className="pulse-dot w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                <span className="text-[13px] text-[#c4b5fd] font-medium tracking-wide">{badge}</span>
              </div>

              <h1 className={`hero-fu-2 ${heroCls} text-white mb-6`}>
                {headingLines.map((line, i) => (
                  <span key={i}>
                    {i === 0 ? (
                      <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{line}</span>
                    ) : (
                      line
                    )}
                    {i < headingLines.length - 1 && <br />}
                  </span>
                ))}
              </h1>

              <p className="hero-fu-3 text-[#94A3B8] text-[16px] sm:text-[17px] leading-[1.8] max-w-[480px] mb-9">{description}</p>

              <div className="hero-fu-4 flex items-center gap-4 flex-wrap">
                <Link href={ctaPrimaryHref} className="inline-flex items-center gap-2.5 px-7 py-[13px] rounded-xl font-semibold text-[14.5px] text-white bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891b2] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_28px_rgba(59,130,246,0.4)]">
                  {ctaPrimaryText} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href={ctaSecondaryHref} className="inline-flex items-center gap-2.5 px-7 py-[13px] rounded-xl font-semibold text-[14.5px] text-white border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25 hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-sm">
                  {ctaSecondaryText}
                </Link>
              </div>
            </div>

            <div className="hero-fu-2">
              <div className="config-card rounded-2xl border border-white/[0.09] bg-[#0F172A] p-7 shadow-[0_4px_60px_rgba(0,0,0,0.5)]">
                <div className="mb-5">
                  <p className="text-white font-bold text-[17px]">{productName}</p>
                  <p className="text-[#94A3B8] text-[13px] mt-0.5">{productVariant}</p>
                </div>

                <div className="mb-5">
                  <p className="text-[#94A3B8] text-[12px] uppercase tracking-widest font-semibold mb-3">Quantity</p>
                  <div className="grid grid-cols-4 gap-2">
                    {quantities.map((q) => (
                      <button key={q} className={`qty-btn px-3 py-2.5 rounded-lg text-sm font-semibold border border-[#1E293B] text-[#94A3B8] ${q === activeQty ? "active" : ""}`}>
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-[#94A3B8] text-[12px] uppercase tracking-widest font-semibold mb-3">Paper Stock</p>
                  <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-[#1E293B] bg-[#0F172A] text-white text-[14px] cursor-pointer hover:border-white/20 transition-colors">
                    <span>{paperStocks[0]}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-[#94A3B8] text-[12px] uppercase tracking-widest font-semibold mb-3">Finishing</p>
                  <div className="grid grid-cols-2 gap-2">
                    {finishingOptions.map((f) => (
                      <button key={f} className={`finish-btn px-3 py-2.5 rounded-lg text-[13px] font-medium border border-[#1E293B] text-[#94A3B8] ${f === activeFinish ? "active" : ""}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#1E293B]">
                  <div>
                    <p className="text-[#94A3B8] text-[11px] uppercase tracking-widest font-semibold mb-1">Total Price</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-white font-extrabold text-[22px]">{basePrice}</span>
                      <span className="text-[#4b5563] text-[13px] line-through">{discountPrice}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[#22d3ee] text-[12px] font-medium">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                    Live pricing
                  </div>
                </div>

                <div className="flex items-center gap-5 mt-5 pt-4 border-t border-[#1E293B]">
                  {badges.map((b, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[#94A3B8] text-[12px]">
                      <span className="text-[13px]">{b.icon}</span>{b.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
