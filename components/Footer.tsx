import Link from "next/link";
import Image from "next/image";
import type { SanityFooter } from "@/lib/sanity.types";

const SOCIAL_ICONS: Record<string, React.ReactElement> = {
  LinkedIn: (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>),
  Twitter:  (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>),
  Facebook: (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>),
  Instagram:(<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>),
};

const DEFAULTS = {
  tagline: "Leading AI Automation Solutions for the Printing Industry. Transform your operations with intelligent chatbots, ERPNext integration, and cutting-edge automation.",
  copyright: "PrintAI. All rights reserved.",
  socials: [
    { label: "LinkedIn",  href: "https://www.linkedin.com/company/printai" },
    { label: "Twitter",   href: "https://twitter.com/printai" },
    { label: "Facebook",  href: "https://www.facebook.com/printai" },
    { label: "Instagram", href: "https://www.instagram.com/printai" },
  ],
  quickLinks: [
    { label: "Home",         href: "/#home" },
    { label: "About Us",     href: "/#about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Resources",    href: "/resources" },
    { label: "Contact",      href: "/#contact" },
  ],
  productLinks: [
    { label: "AI Chatbot",         href: "/products/chatbots" },
    { label: "Web-to-Print Stores", href: "/products/web-to-print" },
    { label: "ERPNext Integration", href: "/products/erpnext" },
  ],
  serviceLinks: [
    { label: "Print Workflow Automation", href: "/services/automation" },
    { label: "DevOps",                    href: "/services/devops" },
    { label: "Custom AI Systems",         href: "/services/custom-ai" },
  ],
};

const socials = [
  {
    label: "LinkedIn",
    href: "#",
    svg: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    svg: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    svg: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    svg: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const quickLinks = [
  { label: "Home",        href: "/#home" },
  { label: "About Us",    href: "/#about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Resources",   href: "/resources" },
  { label: "Contact",     href: "/#contact" },
];

const productLinks = [
  { label: "AI Chatbot",          href: "/products/chatbots" },
  { label: "Web-to-Print Stores",  href: "/products/web-to-print" },
  { label: "ERPNext Integration",  href: "/products/erpnext" },
];

const serviceLinks = [
  { label: "Print Workflow Automation", href: "/services/automation" },
  { label: "DevOps",                href: "/services/devops" },
  { label: "Custom AI Systems",     href: "/services/custom-ai" },
];

export default function Footer({ data }: { data?: SanityFooter }) {
  const tagline      = data?.tagline      || DEFAULTS.tagline;
  const copyright    = data?.copyright    || DEFAULTS.copyright;
  const footerSocials    = data?.socials?.length      ? data.socials      : DEFAULTS.socials;
  const quickLinks   = data?.quickLinks?.length   ? data.quickLinks   : DEFAULTS.quickLinks;
  const productLinks = data?.productLinks?.length ? data.productLinks : DEFAULTS.productLinks;
  const serviceLinks = data?.serviceLinks?.length ? data.serviceLinks : DEFAULTS.serviceLinks;

  return (
    <footer className="bg-[#070B14] border-t border-[#1E293B]/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand column */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <Image src="/logo.png" alt="PrintAI Logo" width={36} height={36} className="object-contain flex-shrink-0" />
              <span className="font-bold text-[20px] text-white tracking-tight">
                Print<span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">AI</span>
              </span>
            </Link>
            <p className="text-gray-400 text-[14px] leading-[1.75] max-w-sm mb-6">{tagline}</p>
            <div className="flex items-center gap-3">
              {footerSocials.map(({ label, href }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-10 h-10 rounded-lg bg-[#0F172A] border border-[#1E293B] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#3B82F6]/40 transition-all duration-200">
                  {SOCIAL_ICONS[label] ?? SOCIAL_ICONS["LinkedIn"]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 md:pl-2">
            <h3 className="text-white font-bold text-[15px] mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}><Link href={href} className="text-gray-400 text-[14px] hover:text-[#06B6D4] transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="md:col-span-3">
            <h3 className="text-white font-bold text-[15px] mb-5">Products</h3>
            <ul className="space-y-3">
              {productLinks.map(({ label, href }) => (
                <li key={label}><Link href={href} className="text-gray-400 text-[14px] hover:text-[#06B6D4] transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h3 className="text-white font-bold text-[15px] mb-5">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}><Link href={href} className="text-gray-400 text-[14px] hover:text-[#06B6D4] transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-14 pt-7 border-t border-[#1E293B]/60 text-center">
          <p className="text-[13.5px] text-gray-500">© {new Date().getFullYear()} {copyright}</p>
        </div>
      </div>
    </footer>
  );
}
