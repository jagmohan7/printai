"use client";

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

const COLORS: Record<string, { icon: string; bg: string; border: string }> = {
  blue:   { icon: "text-[#3B82F6]", bg: "bg-[#3B82F6]/10", border: "border-[#3B82F6]/20" },
  cyan:   { icon: "text-[#06B6D4]", bg: "bg-[#06B6D4]/10", border: "border-[#06B6D4]/20" },
  purple: { icon: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/10", border: "border-[#8B5CF6]/20" },
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
    <section className="relative overflow-hidden bg-[#0B1220] section-pad px-4 border-t border-[#1E293B]/50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <MotionInView className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {headBefore}
            {headHighlight && (
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">
                {headHighlight}
              </span>
            )}
            {headAfter}
          </h2>
          <p className="mt-4 text-[#94A3B8] text-lg max-w-2xl mx-auto">{subheading}</p>
        </MotionInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = getIcon(f.icon);
            const c    = COLORS[f.color || "blue"] || COLORS.blue;
            return (
              <MotionInView key={i} delay={i * 0.1}>
                <div className="group h-full p-6 rounded-2xl border border-[#1E293B] bg-[#0F172A] hover:border-[#3B82F6]/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.12)] hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center mb-4`}>
                    <Icon size={22} className={c.icon} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-white font-bold text-[16px] mb-2">{f.title}</h3>
                  <p className="text-[#94A3B8] text-[14px] leading-relaxed">{f.description}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
