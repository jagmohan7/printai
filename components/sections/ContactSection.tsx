"use client";
import { Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import MotionInView from "@/components/MotionInView";
import type { SanityContact } from "@/lib/sanity.types";

// ── Fallback hardcoded content ────────────────────────────────────────────────
const DEFAULTS = {
  badge:            "Get In Touch",
  heading:          "Ready to Transform Your Business?",
  headingHighlight: "Transform",
  subtext:          "Let's discuss how PrintAI can automate your printing operations and drive growth.",
  email:            "hello@printai.cloud",
  form: {
    nameLabel:      "Your Name",
    emailLabel:     "Email Address",
    companyLabel:   "Company Name",
    showCompany:    true,
    serviceLabel:   "Service Interest",
    showService:    true,
    messageLabel:   "Your Message",
    buttonText:     "Send Message",
    successMessage: "Message sent! We'll get back to you soon.",
  },
  socials: [
    { label: "LinkedIn",  href: "https://www.linkedin.com/company/printai" },
    { label: "Twitter",   href: "https://twitter.com/printai" },
    { label: "Facebook",  href: "https://www.facebook.com/printai" },
    { label: "Instagram", href: "https://www.instagram.com/printai" },
  ],
};

// SVG icons keyed by social label
const SOCIAL_ICONS: Record<string, React.ReactElement> = {
  LinkedIn: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Twitter: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Facebook: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  ),
  Instagram: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
};

export default function ContactSection({ data }: { data?: SanityContact }) {
  const badge            = data?.badge            || DEFAULTS.badge;
  const heading          = data?.heading          || DEFAULTS.heading;
  const headingHighlight = data?.headingHighlight || DEFAULTS.headingHighlight;
  const subtext          = data?.subtext          || DEFAULTS.subtext;
  const email            = data?.email            || DEFAULTS.email;
  const socials          = (data?.socials?.length ? data.socials : null) ?? DEFAULTS.socials;
  const form             = data?.form ?? DEFAULTS.form;

  const highlightIndex  = heading.indexOf(headingHighlight);
  const beforeHighlight = highlightIndex > -1 ? heading.slice(0, highlightIndex) : heading;
  const afterHighlight  = highlightIndex > -1 ? heading.slice(highlightIndex + headingHighlight.length) : "";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0a0b14] section-pad px-4 border-t border-white/[0.04]"
    >
      <div className="pointer-events-none absolute left-0 top-0 w-[600px] h-[400px] section-glow" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <MotionInView>
            <span className="badge">{badge}</span>
            <h2 className="mt-5 text-[2rem] sm:text-[2.5rem] lg:text-[2.85rem] font-extrabold tracking-tight text-white leading-[1.15]">
              {beforeHighlight}
              <span className="gradient-text">{headingHighlight}</span>
              {afterHighlight}
            </h2>
            <p className="mt-5 text-gray-400 text-[15px] leading-[1.75] max-w-md">
              {subtext}
            </p>

            <div className="mt-10 space-y-5">
              <MotionInView delay={0.15} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-violet-600/15 border border-violet-500/25 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-violet-300" />
                </div>
                <div>
                  <p className="text-white font-semibold text-[14.5px] mb-0.5">Email</p>
                  <a href={`mailto:${email}`} className="text-gray-400 text-[13.5px] hover:text-violet-300 transition-colors">
                    {email}
                  </a>
                </div>
              </MotionInView>
            </div>

            <MotionInView delay={0.3} className="mt-10 flex items-center gap-3">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-[#12131f] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:border-violet-500/40 hover:bg-[#1a1b2e] transition-all duration-200"
                >
                  {SOCIAL_ICONS[label] ?? SOCIAL_ICONS["LinkedIn"]}
                </a>
              ))}
            </MotionInView>
          </MotionInView>

          <MotionInView delay={0.15}>
            <div className="card-dark p-7 sm:p-8">
              <ContactForm config={form} />
            </div>
          </MotionInView>
        </div>
      </div>
    </section>
  );
}
