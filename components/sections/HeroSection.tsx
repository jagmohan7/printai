"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { SanityHero } from "@/lib/sanity.types";

const DEFAULTS = {
  badge:               "AI for Print Businesses",
  heading:             "Your Print Business. Powered by AI.",
  headingHighlight:    "Powered by AI.",
  subtext:
    "Automate customer support, online ordering, quote generation and print workflows with one intelligent platform built exclusively for print businesses.",
  primaryButtonText:   "Book a Demo",
  primaryButtonHref:   "/#contact",
  secondaryButtonText: "View Case Studies",
  secondaryButtonHref: "/case-studies",
  reviewScore:         "4.8",
  reviewLabel:         "Trusted by 250+ Print Companies",
};

function GoogleG() {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" aria-hidden="true" className="flex-shrink-0">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}
function Stars() {
  return <span className="text-[#FBBC04] text-[14px] tracking-[1.5px] leading-none">★★★★★</span>;
}

// ── Shared primitives ────────────────────────────────────────────────────────

function PulseDot({ color = "#13C07A" }: { color?: string }) {
  return (
    <span className="relative flex h-2 w-2 flex-shrink-0">
      <motion.span className="absolute inline-flex h-full w-full rounded-full"
        animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        style={{ background: color }} />
      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: color }} />
    </span>
  );
}

const floatAnim = (delay = 0, dur = 3.2) => ({
  animate: { y: [0, -8, 0] },
  transition: { repeat: Infinity, duration: dur, delay, ease: "easeInOut" as const },
});

// Card shell with glassmorphism
const glassCard = {
  background: "rgba(255,255,255,0.92)",
  border: "1px solid rgba(255,255,255,0.9)",
  boxShadow: "0 12px 32px -8px rgba(11,22,40,0.16)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
} as const;

// ── Floating cards ───────────────────────────────────────────────────────────

function ChatbotCard() {
  return (
    <motion.div {...floatAnim(0, 3.2)}
      className="absolute z-20 rounded-2xl p-3.5 w-[190px]"
      style={{ ...glassCard, top: -28, left: -32 }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(19,192,122,0.14)" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </span>
        <span className="text-[12px] font-bold" style={{ color: "var(--pa-ink)" }}>AI Chatbot</span>
        <PulseDot color="#13C07A" />
      </div>
      {/* Mini chat */}
      <div className="space-y-1.5 mb-2.5">
        <div className="rounded-xl rounded-tl-sm px-2.5 py-2 text-[11px] leading-tight"
          style={{ background: "var(--pa-surface)", color: "var(--pa-ink-2)" }}>
          "Hi! Can I get 500 biz cards?"
        </div>
        <div className="rounded-xl rounded-tr-sm px-2.5 py-2 text-[11px] leading-tight text-right"
          style={{ background: "rgba(19,192,122,0.12)", color: "var(--pa-teal-deep)" }}>
          Quote ready: $245 ✓
        </div>
      </div>
      {/* Badge */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
        style={{ background: "rgba(19,192,122,0.08)", border: "1px solid rgba(19,192,122,0.15)" }}>
        <PulseDot color="#13C07A" />
        <span className="text-[10.5px] font-semibold" style={{ color: "#0F6E56" }}>Lead Captured</span>
      </div>
    </motion.div>
  );
}

function QuoteCard() {
  return (
    <motion.div {...floatAnim(0.5, 2.9)}
      className="absolute z-20 rounded-2xl p-3.5 w-[175px]"
      style={{ ...glassCard, top: -24, right: -28 }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(59,130,246,0.12)" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </span>
        <span className="text-[12px] font-bold" style={{ color: "var(--pa-ink)" }}>Instant Quote</span>
      </div>
      <div className="font-extrabold text-[26px] leading-none tracking-tight" style={{ color: "var(--pa-teal-deep)" }}>$245</div>
      <div className="text-[10.5px] mt-1" style={{ color: "var(--pa-ink-2)" }}>500 × Business Cards</div>
      <div className="text-[10.5px]" style={{ color: "var(--pa-ink-2)" }}>350gsm · Full Colour</div>
      <div className="mt-2.5 flex items-center gap-1.5">
        <span className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(19,192,122,0.14)" }}>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#13C07A" strokeWidth="3.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
        </span>
        <span className="text-[10px] font-semibold" style={{ color: "#13C07A" }}>Generated in 1.8s</span>
      </div>
    </motion.div>
  );
}

function OrderCard() {
  return (
    <motion.div {...floatAnim(0.9, 3.6)}
      className="absolute z-20 rounded-2xl p-3.5 w-[195px]"
      style={{ ...glassCard, bottom: -28, left: -28 }}>
      <div className="flex items-center gap-2 mb-2.5">
        <span className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(245,158,11,0.12)" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </span>
        <div>
          <div className="text-[12px] font-bold leading-tight" style={{ color: "var(--pa-ink)" }}>Order #1284</div>
          <div className="text-[9.5px] font-semibold" style={{ color: "#F59E0B" }}>In Production</div>
        </div>
      </div>
      <div className="text-[10.5px] mb-2" style={{ color: "var(--pa-ink-2)" }}>2,000 × Flyers A5 · $189</div>
      {/* Progress bar */}
      <div className="h-1.5 rounded-full mb-1" style={{ background: "var(--pa-line)" }}>
        <motion.div className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg,#13C07A,#06B6D4)" }}
          initial={{ width: "0%" }}
          animate={{ width: "65%" }}
          transition={{ duration: 1.8, delay: 0.8, ease: "easeOut" }} />
      </div>
      <div className="flex justify-between text-[9.5px]">
        <span style={{ color: "var(--pa-ink-2)" }}>65% complete</span>
        <span className="font-semibold" style={{ color: "#13C07A" }}>Est. tomorrow</span>
      </div>
    </motion.div>
  );
}

function WorkflowCard() {
  const steps = [
    { label: "Order Received",     done: true,  active: false },
    { label: "File Approved",      done: true,  active: false },
    { label: "Production Started", done: false, active: true  },
    { label: "Ready for Delivery", done: false, active: false },
  ];
  return (
    <motion.div {...floatAnim(1.3, 3.1)}
      className="absolute z-20 rounded-2xl p-3.5 w-[190px]"
      style={{ ...glassCard, bottom: -24, right: -30 }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(139,92,246,0.12)" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </span>
        <span className="text-[12px] font-bold" style={{ color: "var(--pa-ink)" }}>Order Auto-Routed</span>
      </div>
      <div className="space-y-2">
        {steps.map((s) => (
          <div key={s.label} className="flex items-center gap-2.5">
            <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: s.done ? "rgba(19,192,122,0.14)" : s.active ? "rgba(245,158,11,0.12)" : "var(--pa-surface)",
                border: s.done || s.active ? "none" : "1px solid var(--pa-line)",
              }}>
              {s.done
                ? <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#13C07A" strokeWidth="3.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                : s.active
                  ? <PulseDot color="#F59E0B" />
                  : null}
            </span>
            <span className="text-[10.5px] leading-tight"
              style={{ color: s.done ? "var(--pa-teal-deep)" : s.active ? "#F59E0B" : "var(--pa-ink-2)" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Main center card ─────────────────────────────────────────────────────────

function ControlCenter() {
  const [tab, setTab] = useState(0);
  const tabs = ["Business Cards", "Flyers", "Brochures"];

  const products = [
    { color1: "#0B1628", color2: "#0F6E56", label: "85×55mm · CMYK", qty: "500 copies", price: "$245" },
    { color1: "#1E3A5F", color2: "#2563EB", label: "A5 · Full Colour", qty: "2,000 copies", price: "$189" },
    { color1: "#2D1B69", color2: "#7C3AED", label: "A4 Tri-fold · Matt", qty: "1,000 copies", price: "$320" },
  ];
  const p = products[tab];

  return (
    <div className="relative rounded-2xl overflow-hidden"
      style={{ background: "#fff", border: "1px solid var(--pa-line)", boxShadow: "0 32px 64px -24px rgba(11,22,40,0.32)" }}>

      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 h-10 border-b" style={{ borderColor: "var(--pa-line)", background: "var(--pa-surface)" }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
        <div className="ml-3 flex items-center gap-2">
          <div className="w-4 h-4 rounded-md" style={{ background: "linear-gradient(135deg,#13C07A,#0F6E56)" }} />
          <span className="text-[11.5px] font-semibold" style={{ color: "var(--pa-ink)" }}>PrintAI Control Center</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <PulseDot />
          <span className="text-[10px] font-semibold" style={{ color: "#13C07A" }}>Online</span>
        </div>
      </div>

      {/* Product tabs */}
      <div className="flex border-b" style={{ borderColor: "var(--pa-line)", background: "var(--pa-surface)" }}>
        {tabs.map((t, i) => (
          <button key={t} type="button" onClick={() => setTab(i)}
            className="relative px-4 py-2.5 text-[11.5px] font-medium transition-colors"
            style={{ color: tab === i ? "var(--pa-teal-deep)" : "var(--pa-ink-2)" }}>
            {t}
            {tab === i && (
              <motion.div layoutId="hero-tab"
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                style={{ background: "var(--pa-teal)" }} />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 grid grid-cols-5 gap-4">
        {/* Product visual — col 2 */}
        <div className="col-span-2 rounded-xl overflow-hidden" style={{ border: "1px solid var(--pa-line)" }}>
          <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
            className="h-[120px] relative"
            style={{ background: `linear-gradient(145deg, ${p.color1} 0%, ${p.color2} 100%)` }}>
            {/* Grid overlay */}
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.12 }} viewBox="0 0 130 120" preserveAspectRatio="none">
              {[20,40,60,80,100].map(x => <line key={x} x1={x} y1="0" x2={x} y2="120" stroke="white" strokeWidth="0.6"/>)}
              {[30,60,90].map(y => <line key={y} x1="0" y1={y} x2="130" y2={y} stroke="white" strokeWidth="0.6"/>)}
            </svg>
            <div className="absolute inset-0 p-3 flex flex-col justify-between">
              <div>
                <div className="h-2 rounded-full bg-white/80" style={{ width: "60%" }} />
                <div className="h-1.5 rounded-full bg-white/40 mt-1.5" style={{ width: "38%" }} />
              </div>
              <div>
                <div className="h-1.5 rounded-full bg-white/60" style={{ width: "45%" }} />
                <div className="h-1 rounded-full bg-white/30 mt-1" style={{ width: "70%" }} />
                <div className="h-1 rounded-full bg-white/20 mt-1" style={{ width: "55%" }} />
              </div>
            </div>
          </motion.div>
          <div className="px-3 py-2" style={{ background: "var(--pa-surface)" }}>
            <div className="text-[10px] font-semibold" style={{ color: "var(--pa-ink)" }}>
              {tab === 0 ? "Business Card" : tab === 1 ? "A5 Flyer" : "A4 Brochure"}
            </div>
            <div className="text-[10px]" style={{ color: "var(--pa-ink-2)" }}>{p.label}</div>
          </div>
        </div>

        {/* Config — col 3 */}
        <div className="col-span-3 flex flex-col justify-between">
          <div className="space-y-2">
            {[
              ["Paper",    tab === 0 ? "350gsm Gloss" : tab === 1 ? "170gsm Silk" : "250gsm Matt"],
              ["Size",     tab === 0 ? "85 × 55mm"    : tab === 1 ? "148 × 210mm" : "A4 Tri-fold"],
              ["Quantity", p.qty],
              ["Colour",   "Full CMYK"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between items-center text-[11px]">
                <span style={{ color: "var(--pa-ink-2)" }}>{k}</span>
                <span className="font-semibold" style={{ color: "var(--pa-ink)" }}>{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t" style={{ borderColor: "var(--pa-line)" }}>
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-[11px]" style={{ color: "var(--pa-ink-2)" }}>Total</span>
              <span className="font-extrabold text-[18px]" style={{ color: "var(--pa-teal-deep)" }}>{p.price}</span>
            </div>
            <button type="button" className="w-full h-8 rounded-xl text-[11.5px] font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(90deg, var(--pa-teal), #06B6D4)" }}>
              Add to Order →
            </button>
          </div>
        </div>
      </div>

      {/* Recent orders strip */}
      <div className="px-4 pb-4">
        <div className="text-[9.5px] font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--pa-ink-2)" }}>Recent Orders</div>
        <div className="grid grid-cols-3 gap-2">
          {[
            ["#1280", "Delivered",     "#13C07A"],
            ["#1281", "In Production", "#F59E0B"],
            ["#1282", "File Check",    "#3B82F6"],
          ].map(([id, status, color]) => (
            <div key={id} className="rounded-xl p-2 text-center" style={{ background: "var(--pa-surface)", border: "1px solid var(--pa-line)" }}>
              <div className="font-bold text-[11px]" style={{ color: "var(--pa-ink)" }}>{id}</div>
              <div className="text-[9.5px] font-medium mt-0.5" style={{ color }}>{status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Full dashboard composition ────────────────────────────────────────────────

function PrintAIDashboard() {
  return (
    <div className="relative py-10 px-10">
      {/* Soft ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(60% 60% at 55% 45%, rgba(19,192,122,0.14) 0%, transparent 70%)" }} />

      {/* Floating cards */}
      <ChatbotCard />
      <QuoteCard />
      <OrderCard />
      <WorkflowCard />

      {/* Center card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ControlCenter />
      </motion.div>
    </div>
  );
}

// ── HeroSection export ────────────────────────────────────────────────────────

export default function HeroSection({ data }: { data?: SanityHero }) {
  const badge         = data?.badge               || DEFAULTS.badge;
  const heading       = data?.heading             || DEFAULTS.heading;
  const highlight     = data?.headingHighlight    || DEFAULTS.headingHighlight;
  const subtext       = data?.subtext             || DEFAULTS.subtext;
  const primaryText   = data?.primaryButtonText   || DEFAULTS.primaryButtonText;
  const primaryHref   = data?.primaryButtonHref   || DEFAULTS.primaryButtonHref;
  const secondaryText = data?.secondaryButtonText || DEFAULTS.secondaryButtonText;
  const secondaryHref = data?.secondaryButtonHref || DEFAULTS.secondaryButtonHref;
  const reviewScore   = data?.review?.score       || DEFAULTS.reviewScore;
  const reviewLabel   = data?.review?.label       || DEFAULTS.reviewLabel;

  const idx    = highlight ? heading.indexOf(highlight) : -1;
  const before = idx > -1 ? heading.slice(0, idx) : heading;
  const after  = idx > -1 ? heading.slice(idx + highlight.length) : "";

  return (
    <section id="home" className="pa-hero relative overflow-hidden">
      <style>{`
        .pa-hero { background: var(--pa-page); }
        .pa-hero-eyebrow { color: var(--pa-teal-deep); font-family: var(--font-plex-mono), ui-monospace, monospace; }
        :root[data-theme="dark"] .pa-hero-eyebrow { color: var(--pa-teal); }
        .pa-ink-text { color: var(--pa-ink); }
        .pa-soft { color: var(--pa-ink-2); }
        .pa-card { background: var(--pa-card); border: 1px solid var(--pa-line); }
        .pa-dash-bg { background: var(--pa-surface); }
        .pa-hero-pri { background: var(--pa-teal); color: var(--pa-on-teal); }
        .pa-hero-pri:hover { background: var(--pa-teal-deep); color: #fff; transform: translateY(-1px); }
        .pa-hero-ghost { color: var(--pa-ink); border: 1px solid var(--pa-line); }
        .pa-hero-ghost:hover { border-color: var(--pa-teal); color: var(--pa-teal-deep); }
        :root[data-theme="dark"] .pa-hero-ghost:hover { color: var(--pa-teal); }
      `}</style>

      <div className="pointer-events-none absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(19,192,122,0.10) 0%, transparent 70%)" }} />

      <div className="relative max-w-[1200px] mx-auto px-6 pt-[120px] pb-16 lg:pt-[140px] lg:pb-24 grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
        {/* LEFT */}
        <div className="max-w-[560px]">
          <span className="pa-hero-eyebrow text-[12px] font-semibold tracking-[0.14em] uppercase">{badge}</span>

          <h1 className="pa-ink-text mt-4 font-extrabold tracking-tight leading-[1.05] text-[2.4rem] sm:text-[3rem] lg:text-[3.4rem]">
            {before}
            {idx > -1 && (
              <span className="block" style={{ color: "var(--pa-teal)" }}>
                {highlight}{after}
              </span>
            )}
          </h1>

          <p className="pa-soft mt-6 text-[16px] sm:text-[17px] leading-[1.7] max-w-[480px]">{subtext}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link href={primaryHref}
              className="pa-hero-pri inline-flex items-center justify-center px-7 h-[52px] rounded-xl font-semibold text-[15px] transition-all duration-200 shadow-[0_8px_22px_rgba(19,192,122,0.28)]">
              {primaryText}
            </Link>
            <Link href={secondaryHref}
              className="pa-hero-ghost inline-flex items-center justify-center px-7 h-[52px] rounded-xl font-semibold text-[15px] transition-colors duration-200">
              {secondaryText}
            </Link>
          </div>

          {/* Google review card */}
          <div className="pa-card mt-9 inline-flex items-center gap-4 rounded-2xl px-5 py-4 shadow-[0_6px_20px_rgba(11,22,40,0.06)]">
            <GoogleG />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5">
                <span className="pa-ink-text font-extrabold text-[22px] leading-none">{reviewScore}</span>
                <Stars />
              </div>
              <span className="pa-soft text-[12.5px]">{reviewLabel}</span>
            </div>
          </div>
        </div>

        {/* RIGHT — print-business product visualization */}
        <div className="relative hidden lg:block">
          <PrintAIDashboard />
        </div>
      </div>
    </section>
  );
}
