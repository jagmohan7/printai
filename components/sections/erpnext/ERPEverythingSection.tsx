"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { splitHeading, pickArray } from "@/lib/section-utils";

export interface ERPEverythingData {
  sectionTag?: string;
  heading?: string;
  highlightWord?: string;
  subheading?: string;
  features?: Array<{ icon?: string; label?: string; description?: string }>;
}

interface Props { data?: ERPEverythingData | null }

const FALLBACK = {
  sectionTag:    "Full Feature Set",
  heading:       "Everything Your Shop Needs in One System",
  highlightWord: "in One System",
  subheading:    "What we configure for your print operation",
  features: [
    { icon: "FileText",    label: "Estimating & Quoting",         description: "Instant accurate quotes with material costs" },
    { icon: "Ticket",      label: "Job Ticket & Routing",         description: "Track every job from intake to delivery" },
    { icon: "Package",     label: "Inventory (pgs, eq, supplies)", description: "Real-time stock levels across all substrates" },
    { icon: "ShoppingCart",label: "Vendor Purchase Orders",       description: "Automated POs tied to job requirements" },
    { icon: "DollarSign",  label: "Invoicing & AR Tracking",      description: "Auto-generate invoices, track payments" },
    { icon: "Users",       label: "CRM & Sales Pipeline",         description: "Manage leads, quotes, and customer history" },
    { icon: "RefreshCw",   label: "Customer Reorder Libraries",   description: "One-click reorders for repeat jobs" },
    { icon: "BarChart2",   label: "Reporting (Margin, Utilization)", description: "Real-time dashboards across all operations" },
  ],
};

export default function ERPEverythingSection({ data }: Props) {
  const sectionTag    = data?.sectionTag    ?? FALLBACK.sectionTag;
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const subheading    = data?.subheading    ?? FALLBACK.subheading;
  const features      = pickArray(data?.features, FALLBACK.features);

  const [hb, hh, ha] = splitHeading(heading, highlightWord);

  return (
    <section className="relative overflow-hidden bg-[#0B1220] section-pad px-4 border-t border-[#1E293B]/50">
      <style>{`
        .feat-tile { transition: border-color .25s, box-shadow .25s, transform .25s, background .25s; }
        .feat-tile:hover { border-color: rgba(124,58,237,.3); box-shadow: 0 0 24px rgba(124,58,237,.12); transform: translateY(-3px); background: #15162a; }
        .feat-tile:hover .feat-icon-bg { background: rgba(124,58,237,.18); box-shadow: 0 0 16px rgba(124,58,237,.25); }
        .feat-tile:hover .feat-icon { color: #a78bfa; }
      `}</style>

      <div className="pointer-events-none absolute left-0 bottom-0 w-[500px] h-[400px] rounded-full bg-[#7c3aed]/6 blur-[130px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <MotionInView className="text-center mb-14">
          <p className="text-[#a78bfa] text-[13px] font-semibold uppercase tracking-widest mb-3">{sectionTag}</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold tracking-tight text-white leading-[1.15]">
            {hb}{hh && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{hh}</span>}{ha}
          </h2>
          <p className="mt-4 text-[#94A3B8] text-[16px] max-w-xl mx-auto">{subheading}</p>
        </MotionInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => {
            const Icon = getIcon(f.icon);
            return (
              <MotionInView key={i} delay={i * 0.07}>
                <div className="feat-tile h-full rounded-2xl border border-[#1E293B] bg-[#0F172A] p-6">
                  <div className="feat-icon-bg w-10 h-10 rounded-xl bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center mb-4 transition-all duration-250">
                    <Icon className="feat-icon w-4 h-4 text-[#7c3aed] transition-colors duration-250" />
                  </div>
                  <p className="text-white font-semibold text-[14px] mb-1.5 leading-[1.35]">{f.label}</p>
                  <p className="text-[#94A3B8] text-[13px] leading-[1.65]">{f.description}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
