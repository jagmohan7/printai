"use client";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { pickArray } from "@/lib/section-utils";

export interface W2PIntegrationsData {
  sectionTag?: string;
  heading?: string;
  subheading?: string;
  integrations?: Array<{ icon?: string; name?: string; category?: string }>;
  footerNote?: string;
}

interface Props { data?: W2PIntegrationsData | null }

const FALLBACK = {
  sectionTag: "Integrations",
  heading:    "Built to Connect With Your Stack",
  subheading: "Seamless integration with the tools you already use",
  integrations: [
    { icon: "Database",     name: "ERPNext",        category: "ERP" },
    { icon: "BookOpen",     name: "QuickBooks",     category: "Accounting" },
    { icon: "Mail",         name: "Klaviyo",        category: "Marketing" },
    { icon: "Send",         name: "Mailchimp",      category: "Email" },
    { icon: "Truck",        name: "Shippo",         category: "Shipping" },
    { icon: "Package",      name: "EasyPost",       category: "Logistics" },
    { icon: "CreditCard",   name: "Stripe",         category: "Payments" },
    { icon: "ShoppingBag",  name: "PayPal",         category: "Payments" },
    { icon: "Shield",       name: "Authorize.net",  category: "Gateway" },
    { icon: "Wrench",       name: "Prepress Tools", category: "Production" },
    { icon: "ShoppingCart", name: "Shopify",        category: "Platform" },
    { icon: "LayoutGrid",   name: "WooCommerce",    category: "Platform" },
  ],
  footerNote: "Plus custom integrations for your specific workflow",
};

export default function W2PIntegrationsSection({ data }: Props) {
  const sectionTag   = data?.sectionTag ?? FALLBACK.sectionTag;
  const heading      = data?.heading    ?? FALLBACK.heading;
  const subheading   = data?.subheading ?? FALLBACK.subheading;
  const integrations = pickArray(data?.integrations, FALLBACK.integrations);
  const footerNote   = data?.footerNote ?? FALLBACK.footerNote;

  return (
    <section className="relative overflow-hidden bg-[#070B14] section-pad px-4 border-t border-[#1E293B]/50">
      <style>{`
        .int-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s, background 0.25s; }
        .int-card:hover { border-color: rgba(6,182,212,0.3); box-shadow: 0 0 24px rgba(6,182,212,0.12); transform: translateY(-3px); background: #16172a; }
        .int-icon-wrap { transition: background 0.25s, box-shadow 0.25s; }
        .int-card:hover .int-icon-wrap { background: rgba(6,182,212,0.15); box-shadow: 0 0 14px rgba(6,182,212,0.25); }
        .int-card:hover .int-icon { color: #22d3ee; }
        .int-card:hover .int-name { color: #fff; }
      `}</style>

      <div className="pointer-events-none absolute right-[-4%] top-[20%] w-[450px] h-[450px] rounded-full bg-[#7c3aed]/8 blur-[120px]" />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <MotionInView className="text-center mb-14">
          <p className="text-[#a78bfa] text-[13px] font-semibold uppercase tracking-widest mb-3">{sectionTag}</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.8rem] font-extrabold tracking-tight text-white leading-[1.15]">{heading}</h2>
          <p className="mt-4 text-[#94A3B8] text-[16px]">{subheading}</p>
        </MotionInView>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-7">
          {integrations.map((it, i) => {
            const Icon = getIcon(it.icon);
            return (
              <MotionInView key={i} delay={i * 0.05}>
                <div className="int-card rounded-xl border border-[#1E293B] bg-[#0F172A] p-5 flex flex-col items-center text-center gap-3">
                  <div className="int-icon-wrap w-11 h-11 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/15 flex items-center justify-center">
                    <Icon className="int-icon w-5 h-5 text-[#06b6d4]" />
                  </div>
                  <div>
                    <p className="int-name text-white font-semibold text-[14px] transition-colors duration-200">{it.name}</p>
                    <p className="text-[#94A3B8] text-[12px] mt-0.5">{it.category}</p>
                  </div>
                </div>
              </MotionInView>
            );
          })}
        </div>

        <MotionInView delay={0.6}>
          <p className="text-center text-[#94A3B8] text-[13.5px]">{footerNote}</p>
        </MotionInView>
      </div>
    </section>
  );
}
