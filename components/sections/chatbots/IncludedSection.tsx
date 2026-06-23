"use client";

import React from "react";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";

export interface IncludedSectionData {
  heading?: string;
  highlightWord?: string;
  subheading?: string;
  features?: Array<{ icon?: string; title?: string; description?: string; color?: string }>;
}

interface Props { data?: IncludedSectionData | null }

const FALLBACK = {
  heading:       "What's Included",
  highlightWord: "Included",
  subheading:    "Everything you need to automate print shop conversations — out of the box.",
  features: [
    { icon: "Zap",           title: "24/7 Quoting & Lead Capture",      description: "Never miss an inquiry. Instant responses around the clock.",                color: "blue"   },
    { icon: "FileCheck",     title: "File Spec Validation",             description: "Bleed, DPI, color mode — validated automatically before production.",       color: "cyan"   },
    { icon: "Link2",         title: "CRM & ERPNext Integration",        description: "Syncs with your existing print management and CRM stack.",                  color: "purple" },
    { icon: "MessageSquare", title: "Multi-Channel Support",            description: "Web chat, WhatsApp, and email — one unified AI brain.",                      color: "blue"   },
    { icon: "RefreshCw",     title: "Monthly Accuracy Optimization",    description: "We tune the AI monthly based on your real conversations.",                  color: "cyan"   },
    { icon: "Globe2",        title: "English & Spanish Support",        description: "Reach every customer in their preferred language.",                          color: "purple" },
  ],
};

const COLORS: Record<string, { iconStyle: React.CSSProperties; boxStyle: React.CSSProperties }> = {
  blue:   { iconStyle: { color: "var(--pa-teal)" },        boxStyle: { background: "var(--pa-teal-soft)", border: "1px solid rgba(103,61,230,0.2)" } },
  cyan:   { iconStyle: { color: "var(--pa-teal)" },        boxStyle: { background: "var(--pa-teal-soft)", border: "1px solid rgba(103,61,230,0.2)" } },
  purple: { iconStyle: { color: "var(--pa-teal)" },        boxStyle: { background: "var(--pa-teal-soft)", border: "1px solid rgba(103,61,230,0.2)" } },
};

function splitHeading(heading: string, highlight?: string): [string, string, string] {
  if (!highlight) return [heading, "", ""];
  const idx = heading.indexOf(highlight);
  if (idx === -1) return [heading, "", ""];
  return [heading.slice(0, idx), highlight, heading.slice(idx + highlight.length)];
}

export default function IncludedSection({ data }: Props) {
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const subheading    = data?.subheading    ?? FALLBACK.subheading;
  const features      = (data?.features && data.features.length > 0) ? data.features : FALLBACK.features;

  const [headBefore, headHighlight, headAfter] = splitHeading(heading, highlightWord);

  return (
    <section className="relative overflow-hidden pa-band-surface section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(103,61,230,0.05)" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <MotionInView className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black pa-ink-text tracking-tight leading-tight">
            {headBefore}
            {headHighlight && (
              <span style={{ color: "var(--pa-teal)" }}>
                {headHighlight}
              </span>
            )}
            {headAfter}
          </h2>
          <p className="mt-4 pa-soft text-lg max-w-2xl mx-auto">{subheading}</p>
        </MotionInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = getIcon(f.icon);
            const c    = COLORS[f.color || "blue"] || COLORS.blue;
            return (
              <MotionInView key={i} delay={i * 0.1}>
                <div className="group h-full p-6 rounded-2xl border border-[color:var(--pa-line)] bg-[var(--pa-card)] hover:border-[color:var(--pa-teal)] hover:shadow-[0_0_25px_rgba(103,61,230,0.15)] hover:-translate-y-1 transition-all duration-300 pa-card-hover">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={c.boxStyle}>
                    <Icon size={22} style={c.iconStyle} strokeWidth={1.75} />
                  </div>
                  <h3 className="pa-ink-text font-bold text-[16px] mb-2">{f.title}</h3>
                  <p className="pa-soft text-[14px] leading-relaxed">{f.description}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
