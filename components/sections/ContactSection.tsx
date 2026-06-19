"use client";
import { Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import MotionInView from "@/components/MotionInView";
import type { SanityContact } from "@/lib/sanity.types";

// ── Fallback content ──────────────────────────────────────────────────────────
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

const SOCIAL_ICONS: Record<string, React.ReactElement> = {
  LinkedIn: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
  ),
  Twitter: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  ),
  Facebook: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
  ),
  Instagram: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
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

  const idx    = headingHighlight ? heading.indexOf(headingHighlight) : -1;
  const before = idx > -1 ? heading.slice(0, idx) : heading;
  const after  = idx > -1 ? heading.slice(idx + headingHighlight.length) : "";

  return (
    <section id="contact" className="pa-band-surface section-pad px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        <MotionInView>
          <span className="pa-eyebrow">{badge}</span>
          <h2 className="pa-ink-text mt-4 font-extrabold tracking-tight leading-[1.12] text-[2rem] sm:text-[2.4rem] lg:text-[2.6rem]">
            {before}
            {idx > -1 && <span style={{ color: "var(--pa-teal)" }}>{headingHighlight}</span>}
            {after}
          </h2>
          <p className="pa-soft mt-5 text-[16px] leading-[1.75] max-w-md">{subtext}</p>

          <div className="mt-9">
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--pa-teal-soft)" }}>
                <Mail className="w-5 h-5" style={{ color: "var(--pa-teal-deep)" }} />
              </span>
              <div>
                <p className="pa-mono pa-soft text-[11px] uppercase tracking-wider mb-0.5">Email</p>
                <a href={`mailto:${email}`} className="pa-ink-text text-[15px] font-medium hover:opacity-80 transition-opacity">{email}</a>
              </div>
            </div>
          </div>

          <div className="mt-9 flex items-center gap-3">
            {socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="pa-card w-11 h-11 rounded-full flex items-center justify-center pa-soft hover:text-[color:var(--pa-teal-deep)] hover:border-[color:var(--pa-teal)] transition-colors"
              >
                {SOCIAL_ICONS[label] ?? SOCIAL_ICONS["LinkedIn"]}
              </a>
            ))}
          </div>
        </MotionInView>

        <MotionInView delay={0.12}>
          <div className="pa-card rounded-2xl p-7 sm:p-8 shadow-[0_30px_60px_-30px_rgba(11,22,40,0.1)]">
            <ContactForm />
          </div>
        </MotionInView>
      </div>
    </section>
  );
}
