"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";

interface Stat { value: string; label: string }
interface CaseItem {
  category?: string;
  icon?: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  stats?: Stat[];
}

const CARD_GRADIENTS = [
  "from-violet-700/70 to-indigo-950",
  "from-cyan-700/70 to-blue-950",
  "from-emerald-700/70 to-teal-950",
  "from-pink-700/70 to-purple-950",
  "from-orange-700/70 to-amber-950",
  "from-blue-700/70 to-violet-950",
];

const CATEGORY_BADGE: Record<string, string> = {
  "Commercial Printing": "bg-violet-500/20 text-violet-300 border-violet-500/30",
  "Large Format":        "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "Multi-Location":      "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "Packaging":           "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "Web-to-Print":        "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Digital Printing":    "bg-blue-500/20 text-blue-300 border-blue-500/30",
};
const DEFAULT_BADGE = "bg-white/10 text-white/70 border-white/20";

export default function CaseStudiesContent({ cases }: { cases: CaseItem[] }) {
  const categories = ["All", ...Array.from(new Set(cases.map(c => c.category).filter(Boolean) as string[]))];
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? cases : cases.filter(c => c.category === active);

  return (
    <>
      {/* ── Category filter pills ── */}
      <section className="px-4 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-[13px] font-semibold border transition-all duration-200 ${
                  active === cat
                    ? "bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white border-transparent shadow-[0_0_20px_rgba(124,58,237,0.35)]"
                    : "bg-white/[0.04] text-[#9ca3af] border-white/[0.08] hover:border-white/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cards grid ── */}
      <section className="relative px-4 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c, i) => {
            const Icon = getIcon(c.icon);
            const gradient = CARD_GRADIENTS[i % CARD_GRADIENTS.length];
            const catColor = CATEGORY_BADGE[c.category || ""] ?? DEFAULT_BADGE;
            const stats = c.stats ?? [];

            return (
              <MotionInView key={`${active}-${i}`} delay={0.06 * (i % 3)}>
                <div className="group h-full flex flex-col rounded-2xl border border-white/[0.07] bg-[#12131f] overflow-hidden hover:border-white/[0.14] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.45)] transition-all duration-300">

                  {/* Thumbnail with icon + category badge */}
                  <div className={`relative h-[185px] bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05)_0%,transparent_65%)]" />
                    <Icon size={56} className="text-white/25" strokeWidth={1.1} />
                    {c.category && (
                      <span className={`absolute top-3 right-3 text-[11px] font-semibold px-3 py-1 rounded-full border backdrop-blur-sm ${catColor}`}>
                        {c.category}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-6">
                    <h2 className="text-white font-bold text-[16px] leading-snug mb-3">{c.title}</h2>
                    <p className="text-[#9ca3af] text-[13px] leading-[1.75] flex-1">{c.description}</p>

                    {stats.length > 0 && (
                      <div className="flex gap-5 mt-5 pt-5 border-t border-white/[0.06]">
                        {stats.map((s, j) => (
                          <div key={j}>
                            <div className="text-[#22d3ee] font-extrabold text-[17px] leading-tight whitespace-pre-line">{s.value}</div>
                            <div className="text-[#9ca3af] text-[10px] font-medium mt-0.5 whitespace-pre-line leading-tight uppercase tracking-wide">{s.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <Link
                      href={c.ctaHref || "/#contact"}
                      className="mt-5 inline-flex items-center gap-1.5 text-[#a78bfa] text-[13px] font-semibold hover:text-[#22d3ee] transition-colors group/link"
                    >
                      {c.ctaText || "Get Similar Results"}
                      <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </MotionInView>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[#9ca3af] text-[15px] py-20">No case studies in this category yet.</p>
        )}
      </section>
    </>
  );
}
