"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { splitHeading, pickArray } from "@/lib/section-utils";

export interface ERPWhyData {
  sectionTag?: string;
  heading?: string;
  highlightWord?: string;
  subheading?: string;
  cards?: Array<{ icon?: string; title?: string; description?: string; stat?: string; statLabel?: string }>;
}

interface Props { data?: ERPWhyData | null }

const FALLBACK = {
  sectionTag:    "The Solution",
  heading:       "One Platform That Runs Your Entire Shop",
  highlightWord: "Runs Your Entire Shop",
  subheading:    "Why printers are moving to ERPNext",
  cards: [
    { icon: "Unlock",       title: "Open-Source, No Lock-In",          description: "Your data and your pricing — fully customizable system built on Frappe with no vendor dependency.",  stat: "100%", statLabel: "Free to Use" },
    { icon: "Printer",      title: "Built for Print Operations",        description: "Workflows for estimating, job tickets, inventory, vendor PDFs, and customer workflows — out of the box.", stat: "8+",   statLabel: "Customizations" },
    { icon: "TrendingDown", title: "Real Cost Advantage",               description: "Save $37K+ annually compared to legacy MES and eliminate spreadsheet inefficiencies entirely.",          stat: "$40K", statLabel: "Per Install" },
  ],
};

// Cycling gradient/glow themes per card index
const THEMES = [
  { color: "from-[#7c3aed] to-[#a78bfa]", glow: "rgba(124,58,237,.2)", iconBg: "bg-[#7c3aed]/10 border-[#7c3aed]/25", iconColor: "text-[#a78bfa]" },
  { color: "from-[#06b6d4] to-[#22d3ee]", glow: "rgba(6,182,212,.2)",  iconBg: "bg-[#06b6d4]/10 border-[#06b6d4]/25", iconColor: "text-[#22d3ee]" },
  { color: "from-[#a78bfa] to-[#22d3ee]", glow: "rgba(167,139,250,.2)", iconBg: "bg-[#a78bfa]/10 border-[#a78bfa]/25", iconColor: "text-[#a78bfa]" },
];

export default function ERPWhySection({ data }: Props) {
  const sectionTag    = data?.sectionTag    ?? FALLBACK.sectionTag;
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const subheading    = data?.subheading    ?? FALLBACK.subheading;
  const cards         = pickArray(data?.cards, FALLBACK.cards);

  const [hb, hh, ha] = splitHeading(heading, highlightWord);
  const colsClass = cards.length <= 2 ? "md:grid-cols-2" : cards.length === 3 ? "md:grid-cols-3" : "md:grid-cols-3 lg:grid-cols-4";

  return (
    <section className="relative overflow-hidden bg-[#070B14] section-pad px-4 border-t border-[#1E293B]/50">
      <style>{`
        .why-card { transition: border-color .3s, box-shadow .3s, transform .3s; }
        .why-card:hover { transform: translateY(-5px); }
      `}</style>

      <div className="pointer-events-none absolute right-0 top-0 w-[500px] h-[500px] rounded-full bg-[#06b6d4]/6 blur-[140px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <MotionInView className="text-center mb-14">
          <p className="text-[#22d3ee] text-[13px] font-semibold uppercase tracking-widest mb-3">{sectionTag}</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            {hb}{hh && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{hh}</span>}{ha}
          </h2>
          <p className="mt-4 text-[#94A3B8] text-[16px] max-w-xl mx-auto">{subheading}</p>
        </MotionInView>

        <div className={`grid grid-cols-1 ${colsClass} gap-6`}>
          {cards.map((c, i) => {
            const Icon  = getIcon(c.icon);
            const theme = THEMES[i % THEMES.length];
            return (
              <MotionInView key={i} delay={i * 0.12}>
                <div
                  className="why-card h-full rounded-2xl border border-[#1E293B] bg-[#0F172A] p-7 flex flex-col"
                  onMouseEnter={(e) => {
                    const tone = theme.glow.replace(/rgba\(|\)/g, "").split(",").slice(0,3).join(",");
                    (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(${tone}, .3)`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${theme.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                  }}
                >
                  <div className={`w-12 h-12 rounded-xl ${theme.iconBg} border flex items-center justify-center mb-5`}>
                    <Icon className={`w-5 h-5 ${theme.iconColor}`} />
                  </div>
                  <h3 className="text-white font-bold text-[17px] mb-3">{c.title}</h3>
                  <p className="text-[#94A3B8] text-[14px] leading-[1.75] flex-1 mb-6">{c.description}</p>
                  <div className="pt-5 border-t border-[#1E293B]">
                    <span className={`text-[2rem] font-extrabold bg-gradient-to-r ${theme.color} bg-clip-text text-transparent`}>{c.stat}</span>
                    <span className="ml-2 text-[#94A3B8] text-[13px]">{c.statLabel}</span>
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
