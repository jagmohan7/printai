"use client";
import { MapPin, Phone, Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import MotionInView from "@/components/MotionInView";

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

const contactItems = [
  {
    icon: MapPin,
    label: "Address",
    body: (
      <>
        23600 Mercantile Rd Suite C-100,
        <br />
        Beachwood, OH 44122, United States
      </>
    ),
  },
  {
    icon: Phone,
    label: "Phone",
    body: (
      <a href="tel:+13128343526" className="text-gray-400 text-[13.5px] hover:text-violet-300 transition-colors">
        312-834-3526
      </a>
    ),
  },
  {
    icon: Mail,
    label: "Email",
    body: (
      <a href="mailto:sales@printai.com" className="text-gray-400 text-[13.5px] hover:text-violet-300 transition-colors">
        sales@printai.com
      </a>
    ),
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0a0b14] py-24 sm:py-28 px-4 border-t border-white/[0.04]"
    >
      <div className="pointer-events-none absolute left-0 top-0 w-[600px] h-[400px] section-glow" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <MotionInView>
            <span className="badge">Get In Touch</span>
            <h2 className="mt-5 text-[2rem] sm:text-[2.5rem] lg:text-[2.85rem] font-extrabold tracking-tight text-white leading-[1.15]">
              Ready to{" "}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Transform
              </span>{" "}
              Your Business?
            </h2>
            <p className="mt-5 text-gray-400 text-[15px] leading-[1.75] max-w-md">
              Let&apos;s discuss how PrintAI can automate your printing operations and
              drive growth.
            </p>

            <div className="mt-10 space-y-6">
              {contactItems.map(({ icon: Icon, label, body }, i) => (
                <MotionInView key={label} delay={i * 0.15} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-violet-600/15 border border-violet-500/25 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-violet-300" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-[14.5px] mb-0.5">{label}</p>
                    <p className="text-gray-400 text-[13.5px] leading-[1.6]">{body}</p>
                  </div>
                </MotionInView>
              ))}
            </div>

            <MotionInView delay={0.45} className="mt-10 flex items-center gap-3">
              {socials.map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-[#12131f] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:border-violet-500/40 hover:bg-[#1a1b2e] transition-all duration-200"
                >
                  {svg}
                </a>
              ))}
            </MotionInView>
          </MotionInView>

          <MotionInView delay={0.15}>
            <div className="card-dark p-7 sm:p-8">
              <ContactForm />
            </div>
          </MotionInView>
        </div>
      </div>
    </section>
  );
}
