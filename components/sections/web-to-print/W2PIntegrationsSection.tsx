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
    <section className="pa-band-page relative overflow-hidden section-pad px-4" style={{ borderTop: "1px solid var(--pa-line)" }}>
      <style>{`
        .int-card { transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s, background 0.25s; }
        .int-card:hover { border-color: var(--pa-teal); box-shadow: 0 0 24px rgba(103,61,230,0.12); transform: translateY(-3px); background: var(--pa-card); }
        .int-icon-wrap { transition: background 0.25s, box-shadow 0.25s; }
        .int-card:hover .int-icon-wrap { background: color-mix(in srgb, var(--pa-teal) 15%, transparent); box-shadow: 0 0 14px rgba(103,61,230,0.25); }
        .int-card:hover .int-icon { color: var(--pa-teal); }
        .int-card:hover .int-name { color: var(--pa-ink); }
      `}</style>

      <div className="pointer-events-none absolute right-[-4%] top-[20%] w-[450px] h-[450px] rounded-full blur-[120px]" style={{ background: "color-mix(in srgb, var(--pa-teal) 8%, transparent)" }} />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <MotionInView className="text-center mb-14">
          <p className="text-[13px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--pa-teal)" }}>{sectionTag}</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[2.8rem] font-extrabold tracking-tight leading-[1.15]" style={{ color: "var(--pa-ink)" }}>{heading}</h2>
          <p className="mt-4 text-[16px]" style={{ color: "var(--pa-ink-2)" }}>{subheading}</p>
        </MotionInView>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-7">
          {integrations.map((it, i) => {
            const Icon = getIcon(it.icon);
            return (
              <MotionInView key={i} delay={i * 0.05}>
                <div className="int-card rounded-xl p-5 flex flex-col items-center text-center gap-3" style={{ border: "1px solid var(--pa-line)", background: "var(--pa-card)" }}>
                  <div className="int-icon-wrap w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--pa-teal) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--pa-teal) 15%, transparent)" }}>
                    <Icon className="int-icon w-5 h-5" style={{ color: "var(--pa-teal)" }} />
                  </div>
                  <div>
                    <p className="int-name font-semibold text-[14px] transition-colors duration-200" style={{ color: "var(--pa-ink)" }}>{it.name}</p>
                    <p className="text-[12px] mt-0.5" style={{ color: "var(--pa-ink-2)" }}>{it.category}</p>
                  </div>
                </div>
              </MotionInView>
            );
          })}
        </div>

        <MotionInView delay={0.6}>
          <p className="text-center text-[13.5px]" style={{ color: "var(--pa-ink-2)" }}>{footerNote}</p>
        </MotionInView>
      </div>
    </section>
  );
}
