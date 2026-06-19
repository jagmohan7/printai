"use client";
import Link from "next/link";
import MotionInView from "@/components/MotionInView";
import type { SanityContactCta } from "@/lib/sanity.types";

// ── Fallback content (used when Sanity data is missing) ───────────────────────
const DEFAULTS = {
  eyebrow:             "Get Started",
  heading:             "Ready to Automate Your Print Business?",
  subtext:             "Book a personalized demo and see how PrintAI can transform your operations.",
  primaryButtonText:   "Book Demo",
  primaryButtonHref:   "/#contact",
  secondaryButtonText: "Contact Sales",
  secondaryButtonHref: "/#contact",
  trustLabel:          "4.8 · trusted by 250+ print companies",
};

export default function ContactCtaSection({ data }: { data?: SanityContactCta }) {
  const eyebrow     = data?.eyebrow             || DEFAULTS.eyebrow;
  const heading     = data?.heading             || DEFAULTS.heading;
  const subtext     = data?.subtext             || DEFAULTS.subtext;
  const primaryText = data?.primaryButtonText   || DEFAULTS.primaryButtonText;
  const primaryHref = data?.primaryButtonHref   || DEFAULTS.primaryButtonHref;
  const secondText  = data?.secondaryButtonText || DEFAULTS.secondaryButtonText;
  const secondHref  = data?.secondaryButtonHref || DEFAULTS.secondaryButtonHref;
  const trustLabel  = data?.trustLabel          || DEFAULTS.trustLabel;

  return (
    <section
      className="relative overflow-hidden section-pad px-6"
      style={{ background: "linear-gradient(115deg, #0B1628 0%, #15324C 52%, #0F6E56 100%)" }}
    >
      <div className="pointer-events-none absolute -top-24 right-0 w-[460px] h-[460px] rounded-full" style={{ background: "radial-gradient(circle, rgba(19,192,122,0.22), transparent 70%)" }} />

      <MotionInView className="relative max-w-[760px] mx-auto flex flex-col items-center text-center gap-5">
        <span className="pa-mono text-[12px] font-semibold tracking-[0.16em] uppercase" style={{ color: "#13C07A" }}>
          {eyebrow}
        </span>
        <h2 className="font-extrabold tracking-tight leading-[1.1] text-white text-[2.1rem] sm:text-[2.6rem] lg:text-[3rem]">
          {heading}
        </h2>
        <p className="text-[16px] sm:text-[17px] leading-[1.7] max-w-[560px]" style={{ color: "#9FB3C8" }}>
          {subtext}
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-3.5">
          <Link href={primaryHref} className="pa-btn-pri inline-flex items-center justify-center px-7 h-[52px] rounded-xl font-semibold text-[15px]">
            {primaryText}
          </Link>
          <Link href={secondHref} className="pa-btn-onnavy-ghost inline-flex items-center justify-center px-7 h-[52px] rounded-xl font-semibold text-[15px]">
            {secondText}
          </Link>
        </div>

        {trustLabel && (
          <div className="mt-2 flex items-center gap-2.5">
            <span className="text-[#FBBC04] text-[14px] tracking-[1.5px] leading-none">★★★★★</span>
            <span className="pa-mono text-[11.5px]" style={{ color: "#9FB3C8" }}>{trustLabel}</span>
          </div>
        )}
      </MotionInView>
    </section>
  );
}
