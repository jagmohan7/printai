import Link from "next/link";
import type { SanityFooter } from "@/lib/sanity.types";

const SOCIAL_ICONS: Record<string, React.ReactElement> = {
  LinkedIn: (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>),
  Twitter:  (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>),
  Facebook: (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>),
  Instagram:(<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>),
};

const DEFAULTS = {
  tagline: "AI automation built exclusively for print businesses — chatbots, web-to-print, and workflow automation that scale with you.",
  copyright: "PrintAI, Inc. All rights reserved.",
  email: "hello@printai.cloud",
  socials: [
    { label: "LinkedIn",  href: "https://www.linkedin.com/company/printai" },
    { label: "Twitter",   href: "https://twitter.com/printai" },
    { label: "Facebook",  href: "https://www.facebook.com/printai" },
    { label: "Instagram", href: "https://www.instagram.com/printai" },
  ],
  quickLinks: [
    { label: "Home",     href: "/#home" },
    { label: "About Us", href: "/#about" },
    { label: "Contact",  href: "/#contact" },
  ],
  productLinks: [
    { label: "AI Chatbot",                href: "/products/chatbots" },
    { label: "Web-to-Print",              href: "/products/web-to-print" },
    { label: "Print Workflow Automation", href: "/services/automation" },
    { label: "DevOps",                    href: "/services/devops" },
    { label: "Custom AI Systems",         href: "/services/custom-ai" },
  ],
  serviceLinks: [
    { label: "Blog",         href: "/blog" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "FAQs",         href: "/faqs" },
  ],
};

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="pa-footer-heading font-bold text-[14px] mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map(({ label, href }) => (
          <li key={`${label}-${href}`}>
            <Link href={href} className="pa-footer-link text-[13.5px] transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({ data }: { data?: SanityFooter }) {
  const tagline      = data?.tagline      || DEFAULTS.tagline;
  const copyright    = data?.copyright    || DEFAULTS.copyright;
  const socials      = data?.socials?.length    ? data.socials    : DEFAULTS.socials;
  const quickLinks   = DEFAULTS.quickLinks;
  // Always use hardcoded links for Solutions + Resources (Sanity data is stale)
  const productLinks = DEFAULTS.productLinks;
  const serviceLinks = DEFAULTS.serviceLinks;

  return (
    <footer className="pa-footer border-t" style={{ borderColor: "var(--pa-line)" }}>
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <span className="relative w-[34px] h-[34px] rounded-[9px] flex-shrink-0" style={{ background: "linear-gradient(150deg,#673DE6,#5025D1)", boxShadow: "0 4px 12px rgba(103,61,230,.35)" }}>
                <span className="absolute rounded-[3px]" style={{ inset: "9px 10px", background: "rgba(255,255,255,.92)" }} />
                <span className="absolute rounded-full" style={{ left: 13, top: 13, width: 8, height: 8, background: "#5025D1" }} />
              </span>
              <span className="font-extrabold text-[20px] tracking-tight pa-ink-text">
                Print<span style={{ color: "var(--pa-teal)" }}>AI</span>
              </span>
            </Link>
            <p className="pa-soft text-[13.5px] leading-[1.7] max-w-xs mb-6">{tagline}</p>
            <div className="flex items-center gap-3">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="pa-footer-social w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
                >
                  {SOCIAL_ICONS[label] ?? SOCIAL_ICONS["LinkedIn"]}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2"><FooterColumn title="Company"   links={quickLinks} /></div>
          <div className="md:col-span-3"><FooterColumn title="Solutions" links={productLinks} /></div>
          <div className="md:col-span-3"><FooterColumn title="Resources" links={serviceLinks} /></div>
        </div>

        <div className="mt-14 pt-7 border-t" style={{ borderColor: "var(--pa-line)" }}>
          <p className="pa-mono text-[11.5px] pa-soft text-center">© {new Date().getFullYear()} {copyright}</p>
        </div>
      </div>
    </footer>
  );
}
