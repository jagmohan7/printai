import Link from "next/link";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowRight } from "lucide-react";
import MotionInView from "@/components/MotionInView";
import { getIcon } from "@/lib/lucide-icon";
import { splitHeading } from "@/lib/section-utils";
import { urlFor } from "@/lib/sanity.image";
import FaqBlockClient, { type FaqBlockData } from "@/components/blocks/FaqBlockClient";

/**
 * Renders a Flexible Page's `sections[]` array — one component per block type.
 * Add a new block here when you add a new block schema in pageBlocks.ts.
 */

const MAXW: Record<string, string> = { narrow: "max-w-2xl", normal: "max-w-3xl", wide: "max-w-5xl", full: "max-w-7xl" };

// ── Portable Text rendering config (Rich Text block) ─────────────────────────
const ptComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mt-10 mb-5">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold text-white tracking-tight mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold text-white mt-8 mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-semibold text-white mt-6 mb-2">{children}</h4>,
    blockquote: ({ children }) => <blockquote className="border-l-2 border-[#a78bfa] pl-5 my-6 text-[#cbd5e1] italic">{children}</blockquote>,
    normal: ({ children }) => <p className="text-[#94A3B8] text-[16px] leading-[1.85] my-4">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-2 text-[#94A3B8] text-[16px] leading-relaxed">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-2 text-[#94A3B8] text-[16px] leading-relaxed">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    code: ({ children }) => <code className="px-1.5 py-0.5 rounded bg-[#1E293B] text-[#22d3ee] text-[14px] font-mono">{children}</code>,
    link: ({ children, value }) => {
      const blank = (value as { blank?: boolean })?.blank;
      const href = (value as { href?: string })?.href || "#";
      return <a href={href} target={blank ? "_blank" : undefined} rel={blank ? "noopener noreferrer" : undefined} className="text-[#22d3ee] underline hover:text-[#a78bfa] transition-colors">{children}</a>;
    },
  },
};

// ── Heading helper (gradient highlight) ──────────────────────────────────────
function GradientHeading({ heading, highlight, className }: { heading?: string; highlight?: string; className?: string }) {
  if (!heading) return null;
  const [b, h, a] = splitHeading(heading, highlight);
  return (
    <h2 className={className}>
      {b}{h && <span className="bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent">{h}</span>}{a}
    </h2>
  );
}

// ── Block: Rich Text ─────────────────────────────────────────────────────────
function RichTextBlock({ data }: { data: { content?: unknown[]; maxWidth?: string } }) {
  if (!data?.content) return null;
  return (
    <section className="relative section-pad-sm px-4">
      <div className={`${MAXW[data.maxWidth || "normal"]} mx-auto`}>
        <PortableText value={data.content as never} components={ptComponents} />
      </div>
    </section>
  );
}

// ── Block: Hero ──────────────────────────────────────────────────────────────
function HeroBlock({ data }: { data: Record<string, string | undefined> }) {
  const center = (data.align || "center") === "center";
  return (
    <section className="relative section-hero px-4 overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-violet-600/8 blur-[150px]" />
      <div className={`relative z-10 max-w-4xl mx-auto ${center ? "text-center" : "text-left"}`}>
        {data.badge && (
          <MotionInView><span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#a78bfa]/30 bg-[#a78bfa]/10 text-[#c4b5fd] text-[12px] font-semibold tracking-widest uppercase mb-6">{data.badge}</span></MotionInView>
        )}
        <MotionInView delay={0.1}>
          <GradientHeading heading={data.heading} highlight={data.highlightWord} className="text-[2.6rem] sm:text-[3.4rem] font-extrabold tracking-tight text-white leading-[1.1]" />
        </MotionInView>
        {data.subtext && <MotionInView delay={0.2}><p className={`mt-5 text-[#94A3B8] text-[17px] leading-relaxed ${center ? "max-w-2xl mx-auto" : "max-w-xl"}`}>{data.subtext}</p></MotionInView>}
        {(data.primaryCtaText || data.secondaryCtaText) && (
          <MotionInView delay={0.3}>
            <div className={`mt-9 flex flex-wrap gap-4 ${center ? "justify-center" : ""}`}>
              {data.primaryCtaText && <Link href={data.primaryCtaHref || "/#contact"} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white font-semibold hover:-translate-y-0.5 transition-all shadow-[0_0_30px_rgba(124,58,237,0.4)]">{data.primaryCtaText} <ArrowRight className="w-4 h-4" /></Link>}
              {data.secondaryCtaText && <Link href={data.secondaryCtaHref || "/#contact"} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/15 text-white font-semibold hover:border-white/30 hover:-translate-y-0.5 transition-all">{data.secondaryCtaText}</Link>}
            </div>
          </MotionInView>
        )}
      </div>
    </section>
  );
}

// ── Block: Feature Grid ──────────────────────────────────────────────────────
function FeatureGridBlock({ data }: { data: { heading?: string; highlightWord?: string; subheading?: string; columns?: number; cards?: Array<{ icon?: string; title?: string; description?: string }> } }) {
  const cards = data.cards ?? [];
  if (cards.length === 0) return null;
  const cols = data.columns === 2 ? "lg:grid-cols-2" : data.columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <section className="relative section-pad px-4">
      <div className="max-w-7xl mx-auto">
        {data.heading && (
          <MotionInView className="text-center mb-14">
            <GradientHeading heading={data.heading} highlight={data.highlightWord} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight" />
            {data.subheading && <p className="mt-4 text-[#94A3B8] text-lg max-w-2xl mx-auto">{data.subheading}</p>}
          </MotionInView>
        )}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${cols} gap-5`}>
          {cards.map((c, i) => {
            const Icon = getIcon(c.icon);
            return (
              <MotionInView key={i} delay={i * 0.08}>
                <div className="group h-full p-6 rounded-2xl border border-[#1E293B] bg-[#0F172A] hover:border-[#a78bfa]/40 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#a78bfa]/10 border border-[#a78bfa]/20 flex items-center justify-center mb-4"><Icon size={22} className="text-[#a78bfa]" strokeWidth={1.75} /></div>
                  <h3 className="text-white font-bold text-[16px] mb-2">{c.title}</h3>
                  <p className="text-[#94A3B8] text-[14px] leading-relaxed">{c.description}</p>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Block: Stats ─────────────────────────────────────────────────────────────
function StatsBlock({ data }: { data: { heading?: string; stats?: Array<{ value?: string; label?: string }> } }) {
  const stats = data.stats ?? [];
  if (stats.length === 0) return null;
  const cols = stats.length <= 2 ? "lg:grid-cols-2" : stats.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <section className="relative section-pad px-4">
      <div className="max-w-6xl mx-auto">
        {data.heading && <MotionInView className="text-center mb-12"><h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">{data.heading}</h2></MotionInView>}
        <div className={`grid grid-cols-2 ${cols} gap-5`}>
          {stats.map((s, i) => (
            <MotionInView key={i} delay={i * 0.1}>
              <div className="h-full flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-[#1E293B] bg-[#0F172A]">
                <span className="text-[2.2rem] font-extrabold bg-gradient-to-r from-[#a78bfa] to-[#22d3ee] bg-clip-text text-transparent leading-none">{s.value}</span>
                <span className="mt-2.5 text-[#94A3B8] text-[13px] font-medium">{s.label}</span>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Block: CTA Banner ────────────────────────────────────────────────────────
function CtaBlock({ data }: { data: Record<string, string | undefined> }) {
  return (
    <section className="relative section-pad-sm px-4 border-t border-white/[0.04]">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-violet-600/10 blur-[130px]" />
      <div className="relative z-10 max-w-xl mx-auto text-center">
        <MotionInView><GradientHeading heading={data.heading} highlight={data.highlightWord} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight" /></MotionInView>
        {data.description && <MotionInView delay={0.15}><p className="mt-4 text-[#94A3B8] text-[15px] leading-relaxed">{data.description}</p></MotionInView>}
        {data.ctaText && <MotionInView delay={0.3}><Link href={data.ctaHref || "/#contact"} className="mt-8 inline-flex items-center gap-2 px-9 py-[15px] rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] hover:-translate-y-0.5 transition-all shadow-[0_0_40px_rgba(124,58,237,0.4)]">{data.ctaText} <ArrowRight className="w-4 h-4" /></Link></MotionInView>}
      </div>
    </section>
  );
}

// ── Block: Image ─────────────────────────────────────────────────────────────
function ImageBlock({ data }: { data: { image?: unknown; alt?: string; caption?: string; width?: string } }) {
  if (!data?.image) return null;
  const src = urlFor(data.image).width(1600).fit("max").auto("format").url();
  return (
    <section className="relative section-pad-sm px-4">
      <figure className={`${MAXW[data.width || "normal"]} mx-auto`}>
        <Image src={src} alt={data.alt || ""} width={1600} height={900} className="w-full h-auto rounded-2xl border border-[#1E293B]" />
        {data.caption && <figcaption className="mt-3 text-center text-[#64748B] text-[13px]">{data.caption}</figcaption>}
      </figure>
    </section>
  );
}

// ── Block: Raw HTML (escape hatch) ───────────────────────────────────────────
function RawHtmlBlock({ data }: { data: { html?: string } }) {
  if (!data?.html?.trim()) return null;
  return (
    <section className="relative section-pad-sm px-4">
      <div className="max-w-5xl mx-auto" dangerouslySetInnerHTML={{ __html: data.html }} />
    </section>
  );
}

// ── The renderer — maps each block to its component ──────────────────────────
type Block = { _type: string; _key: string } & Record<string, unknown>;

export default function PageBlocks({ sections }: { sections?: Block[] }) {
  if (!sections || sections.length === 0) return null;
  return (
    <>
      {sections.map((block) => {
        switch (block._type) {
          case "richTextBlock":    return <RichTextBlock    key={block._key} data={block as never} />;
          case "heroBlock":        return <HeroBlock        key={block._key} data={block as never} />;
          case "featureGridBlock": return <FeatureGridBlock key={block._key} data={block as never} />;
          case "statsBlock":       return <StatsBlock       key={block._key} data={block as never} />;
          case "ctaBlock":         return <CtaBlock         key={block._key} data={block as never} />;
          case "faqBlock":         return <FaqBlockClient   key={block._key} data={block as unknown as FaqBlockData} />;
          case "imageBlock":       return <ImageBlock       key={block._key} data={block as never} />;
          case "rawHtmlBlock":     return <RawHtmlBlock     key={block._key} data={block as never} />;
          default:                 return null;
        }
      })}
    </>
  );
}
