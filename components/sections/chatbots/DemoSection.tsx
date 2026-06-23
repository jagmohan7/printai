"use client";

import Image from "next/image";
import MotionInView from "@/components/MotionInView";
import { useLeadModal } from "@/components/modals/LeadModalContext";
import { urlFor } from "@/lib/sanity.image";

export interface DemoSectionData {
  heading?: string;
  highlightWord?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  // CMS-replaceable illustration — upload in Sanity Studio (Demo Illustration field)
  image?: { asset?: { _ref: string }; alt?: string };
}

interface Props { data?: DemoSectionData | null }

const FALLBACK = {
  heading:       "See a Real Chatbot in Action",
  highlightWord: "in Action",
  description:   "Watch PrintOpsAI handle a real customer conversation — pricing, file specs, and a smooth human handoff. This is what your customers experience from the first message.",
  ctaText:       "Book 20-Min Demo",
  ctaHref:       "/#contact",
};

function splitHeading(heading: string, highlight?: string): [string, string, string] {
  if (!highlight) return [heading, "", ""];
  const idx = heading.indexOf(highlight);
  if (idx === -1) return [heading, "", ""];
  return [heading.slice(0, idx), highlight, heading.slice(idx + highlight.length)];
}

export default function DemoSection({ data }: Props) {
  const { openProductDemo } = useLeadModal();
  const heading       = data?.heading       ?? FALLBACK.heading;
  const highlightWord = data?.highlightWord ?? FALLBACK.highlightWord;
  const description   = data?.description   ?? FALLBACK.description;
  const ctaText       = data?.ctaText       ?? FALLBACK.ctaText;

  const [headBefore, headHighlight, headAfter] = splitHeading(heading, highlightWord);

  return (
    <section id="demo" className="relative overflow-hidden pa-band-surface section-pad px-4 border-t border-[var(--pa-line)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(103,61,230,0.05)" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <MotionInView delay={0}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black pa-ink-text tracking-tight leading-tight mb-5">
              {headBefore}
              {headHighlight && (
                <span style={{ color: "var(--pa-teal)" }}>
                  {headHighlight}
                </span>
              )}
              {headAfter}
            </h2>
          </MotionInView>

          <MotionInView delay={0.1}>
            <p className="pa-soft text-lg leading-relaxed mb-8">{description}</p>
          </MotionInView>

          <MotionInView delay={0.2}>
            <button
              onClick={() => openProductDemo("AI Chatbot")}
              className="pa-btn-pri inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base cursor-pointer"
            >
              {ctaText}
            </button>
          </MotionInView>
        </div>

        {/* Right col — static fallback image; CMS (Demo Illustration) overrides src + alt */}
        <MotionInView delay={0.2} from="left">
          <Image
            src={data?.image?.asset?._ref
              ? urlFor(data.image).width(900).auto("format").url()
              : "/images/chatbot-demo.jpg"}
            alt={data?.image?.alt ?? "PrintOpsAI chatbot handling a print shop customer conversation"}
            width={0}
            height={0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="w-full h-auto rounded-2xl shadow-[0_0_60px_rgba(103,61,230,0.12)]"
          />
        </MotionInView>
      </div>
    </section>
  );
}
