'use client'

import { useEffect } from 'react'
import './about.css'
import type { AboutPageData } from '@/lib/sanity.types'

interface Props {
  data?: AboutPageData | null
}

// ── Fallback static content (used when Sanity doc has no data yet) ────────────

const DEFAULT_SOLUTIONS = [
  'AI Chatbot', 'Web-to-Print Platform', 'Workflow Automation',
  'Custom AI Development', 'DevOps & Infrastructure', 'Print Business Consulting',
  'Print Operations', 'Customer Experience', 'Automation Strategy',
]

const DEFAULT_CAPABILITIES = [
  { icon: 'fa-robot',       metric: '24/7',  title: 'AI Customer Support',        desc: 'Automated quoting, lead capture, and customer assistance — around the clock.' },
  { icon: 'fa-print',       metric: '48hr',  title: 'Web-to-Print Storefronts',   desc: 'Branded online stores with live proofing and ordering — live in 48 hours.' },
  { icon: 'fa-gears',       metric: '',      title: 'Quote-to-Production',        desc: 'Eliminate manual data entry and repetitive tasks across your entire workflow.' },
  { icon: 'fa-layer-group', metric: '250+',  title: 'Print Industry Expertise',   desc: 'Built exclusively for print businesses across North America.' },
]

const DEFAULT_TRUST_ITEMS = [
  { val: '20+',    label: 'Years of Combined Industry Expertise' },
  { val: '250+',   label: 'Print Businesses Served' },
  { val: '2,000+', label: 'Workflows Automated' },
  { val: '96%',    label: 'Client Retention' },
]

const DEFAULT_FUTURE_STATS = [
  { val: '',  label: '' },
]

const DEFAULT_FEATURES = [
  { icon: 'fa-print',    title: 'Print Industry Focus',      desc: 'Specialists in commercial print, web-to-print, and packaging operations.' },
  { icon: 'fa-robot',    title: 'AI + Print Expertise',      desc: 'AI systems designed around how print businesses actually work.' },
  { icon: 'fa-gears',    title: 'Custom-Built Solutions',    desc: 'Purpose-built tools — not generic software adapted for print.' },
]

const DEFAULT_LOGOS: { src: string; name: string }[] = [
  { src: '/logos/shopify.svg',          name: 'Shopify' },
  { src: '/logos/woocommerce.svg',       name: 'WooCommerce' },
  { src: '/logos/wordpress.svg',         name: 'WordPress' },
  { src: '/logos/openai.svg',            name: 'OpenAI' },
  { src: '/logos/stripe.svg',            name: 'Stripe' },
  { src: '/logos/cloudflare.svg',        name: 'Cloudflare' },
  { src: '/logos/canva.svg',             name: 'Canva' },
  { src: '/logos/adobe.svg',             name: 'Adobe' },
  { src: '/logos/frappe.svg',            name: 'ERPNext' },
  { src: '/logos/fespa.svg',             name: 'FESPA' },
]

const DEFAULT_VALUES = [
  'Print-first thinking.',
  'Build for real-world workflows.',
  'Results before complexity.',
  'Long-term partnerships over short-term projects.',
  'Transparency in communication, pricing, and delivery.',
  'Clients own their systems, data, and future.',
]

const DEFAULT_TESTIMONIALS = [
  {
    quote: "Before PrintOpsAI, we were losing leads every night and weekend. Within 30 days of going live with the AI chatbot, we captured 23 after-hours enquiries that converted to $41,000 in new orders. The ROI was immediate.",
    name: "James Whitfield",
    role: "Owner",
    company: "Apex Commercial Print",
    rating: 5,
  },
  {
    quote: "We went from a 4-hour quoting turnaround to instant responses on 80% of jobs. Our CSR team now focuses on complex accounts instead of answering the same questions 40 times a day. Productivity is up 35%.",
    name: "Rachel Kim",
    role: "Operations Director",
    company: "Metro Print Group",
    rating: 5,
  },
  {
    quote: "PrintOpsAI built us a custom AI that integrates directly with our ERPNext — it pulls live job status, inventory, and pricing in real time. No other vendor even understood what we were asking for. These people actually know print.",
    name: "David Torres",
    role: "Managing Director",
    company: "ColorCraft Printing",
    rating: 5,
  },
]

// ── Helper — render heading with optional teal highlight ─────────────────────

function HL({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>
  const idx = text.indexOf(highlight)
  return <>{text.slice(0, idx)}<span className="teal">{highlight}</span>{text.slice(idx + highlight.length)}</>
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AboutContent({ data }: Props) {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 },
    )
    document.querySelectorAll('.about-page .fade-up').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const hero    = data?.hero
  const about   = data?.about
  const story   = data?.story
  const mvv     = data?.mvv
  const future  = data?.future
  const brands  = data?.brands
  const reviews = data?.reviews
  const cta     = data?.cta

  const solutions    = hero?.solutions?.length     ? hero.solutions       : DEFAULT_SOLUTIONS
  const capabilities = about?.capabilities?.length ? about.capabilities   : DEFAULT_CAPABILITIES
  const trustItems   = hero?.trustItems?.length    ? hero.trustItems      : DEFAULT_TRUST_ITEMS
  const futureStats    = future?.stats?.length         ? future.stats         : DEFAULT_FUTURE_STATS
  const features       = future?.features?.length      ? future.features      : DEFAULT_FEATURES
  const logos          = (brands?.logos?.length ? brands.logos.map((l: string) => ({ src: l, name: l })) : DEFAULT_LOGOS) as { src: string; name: string }[]
  const values         = mvv?.values?.length            ? mvv.values           : DEFAULT_VALUES
  const testimonials   = reviews?.testimonials?.length  ? reviews.testimonials : DEFAULT_TESTIMONIALS

  return (
    <div className="about-page">

      {/* ═══════════════ S1 · Hero + S2 Strip (pinned to bottom of viewport) ══ */}
      <section className="hero hero-simple">
        <div className="hero-body">
          <span className="chip chip-glow fade-up">
            <span className="hero-chip-icon" aria-hidden="true">✳</span>
            {hero?.chip ?? 'DRIVING PRINT GROWTH WITH PURPOSE'}
          </span>

          <h1 className="h-display hero-title fade-up d1">
            {hero?.heading
              ? <HL text={hero.heading} highlight={hero.headingHighlight} />
              : <>About <span className="teal">Us</span></>
            }
          </h1>

        </div>

        {/* Strip pinned to the bottom of the hero viewport */}
        <div className="strip hero-strip">
          <div className="strip-track">
            {[...solutions, ...solutions].map((s, i) => (
              <span className="chip" key={i}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ S3 · About + Capabilities ═══════════════════════════ */}
      <section className="section about-sec">
        <div className="container">
          <div className="about-grid">
            <div className="about-left">
              <p className="eyebrow fade-up">{about?.eyebrow ?? 'About PrintOpsAI'}</p>
              <h2 className="h2 fade-up d1">
                {about?.heading
                  ? <HL text={about.heading} highlight={about.headingHighlight} />
                  : <>Built for Print.{' '}<span className="teal">Powered by AI.</span></>
                }
              </h2>
              <blockquote className="pull-quote fade-up d2">
                &ldquo;{about?.pullQuote ?? "We don't just automate processes. We automate competitive advantages."}&rdquo;
              </blockquote>
              <p className="body fade-up d3">
                {about?.paragraph1 ?? "PrintOpsAI is an AI automation platform built exclusively for the printing industry. We're not a generic software company with a print module — we're a team of print specialists, AI engineers, and workflow architects who've spent years inside commercial print operations, eliminating every bottleneck that costs shops revenue."}
              </p>
              <p className="body fade-up d4">
                {about?.paragraph2 ?? "Our platform combines AI chatbots, web-to-print storefronts, workflow automation, and custom AI — all connected, all print-native, and all designed to run without a dedicated IT team. We work with commercial printers, multi-location chains, and packaging operations across the USA and Canada."}
              </p>
            </div>

            <div className="cap-grid">
              {capabilities.map((cap, i) => (
                <div className={`cap-card fade-up d${(i % 2) + 1}`} key={i}>
                  {cap.icon && <div className="icon-box"><i className={`fa-solid ${cap.icon}`} /></div>}
                  {cap.metric && <div className="cap-metric">{cap.metric}</div>}
                  <div className="cap-title">{cap.title}</div>
                  <p className="cap-desc">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ S4 · Our Story ══════════════════════════════════════ */}
      <section className="section story-sec">
        <div className="container">
          <div aria-hidden="true" className="story-watermark">OUR STORY</div>
          <div className="story-inner">

            <div className="fade-up">
              <p className="eyebrow" style={{ marginBottom: 12 }}>Our Story</p>
              <h2 className="h2">
                {story?.heading
                  ? <HL text={story.heading} highlight={story.headingHighlight} />
                  : <>Built by Print People,{' '}<span className="teal">for Print People.</span></>
                }
              </h2>
            </div>

            <p className="story-intro fade-up d1">
              {story?.intro ?? "PrintOpsAI was created after years of working alongside print businesses across North America. We saw the same challenges everywhere — manual quoting, disconnected systems, repetitive admin work, and missed opportunities caused by outdated processes."}
            </p>

            <p className="story-pull fade-up d2">
              &ldquo;{story?.pullQuote ?? "Our mission is simple: help print businesses spend less time managing operations and more time growing."}&rdquo;
            </p>

            <div className="story-cols fade-up d3">
              <div className="story-col">
                <p className="body">
                  {story?.col1Para1 ?? "Most software serving the print industry was built as generic tools with print features added later. We took a different approach."}
                </p>
                <p className="body">
                  {story?.col1Para2 ?? "PrintOpsAI is built specifically for print businesses, combining AI, web-to-print, workflow automation, and cloud infrastructure into solutions that fit how print operations actually work."}
                </p>
              </div>
              <div className="story-col">
                <p className="body">
                  {story?.col2Para1 ?? "As a startup, we're focused on solving real problems — not adding unnecessary complexity. Every feature we build starts with a simple question:"}
                </p>
                <blockquote className="story-callout">
                  &ldquo;{story?.col2Callout ?? "Will this save time, reduce manual work, or help print businesses grow?"}&rdquo;
                  {!story?.col2Callout && <span className="story-callout-footer">That&rsquo;s the standard we use for everything we create.</span>}
                </blockquote>
              </div>
            </div>

            <div className="story-highlight fade-up d4">
              &ldquo;The future of print belongs to businesses that embrace automation. We&rsquo;re building the tools to help them get there.&rdquo;
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════ S5 · Mission / Vision / Values ══════════════════════ */}
      <section className="section mvv-sec">
        <div className="mvv-glow" aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="mvv-header fade-up">
            <p className="eyebrow">{mvv?.eyebrow ?? 'THE PRINCIPLES BEHIND PRINTOPSAI'}</p>
          </div>
          <div className="mvv-grid">
            <div className="mvv-card fade-up d1">
              <div className="mvv-card-accent mvv-card-accent--1" aria-hidden="true" />
              <div className="icon-box mvv-icon"><i className="fa-solid fa-bullseye" /></div>
              <div className="mvv-title">{mvv?.missionTitle ?? 'Our Mission'}</div>
              <p className="mvv-body">
                {mvv?.missionBody ?? "To help print businesses eliminate repetitive work, modernize operations, and compete with the efficiency of much larger organizations through practical AI, automation, and web-to-print technology."}
              </p>
            </div>
            <div className="mvv-card fade-up d2">
              <div className="mvv-card-accent mvv-card-accent--2" aria-hidden="true" />
              <div className="icon-box mvv-icon"><i className="fa-solid fa-eye" /></div>
              <div className="mvv-title">{mvv?.visionTitle ?? 'Our Vision'}</div>
              <p className="mvv-body">
                {mvv?.visionBody ?? "We envision a future where every print business — regardless of size — has access to intelligent technology that simplifies operations, improves customer experiences, and unlocks sustainable growth."}
              </p>
            </div>
            <div className="mvv-card fade-up d3">
              <div className="mvv-card-accent mvv-card-accent--3" aria-hidden="true" />
              <div className="icon-box mvv-icon"><i className="fa-solid fa-gem" /></div>
              <div className="mvv-title">{mvv?.valuesTitle ?? 'Our Core Values'}</div>
              <ul className="mvv-list">
                {values.map((v, i) => <li key={i}>{v}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ S7 · What Makes Us Different ════════════════════════ */}
      <section className="section future-sec">
        <div className="container">
          <div className="future-top future-top--single fade-up">
            <p className="eyebrow">{future?.eyebrow ?? "WHAT MAKES US DIFFERENT"}</p>
            <h2 className="h2" style={{ color: 'var(--ink)' }}>
              {future?.heading
                ? <HL text={future.heading} highlight={future.headingHighlight} />
                : <>Print Technology Specialists,{' '}<span className="teal">Not Generic Software Vendors.</span></>
              }
            </h2>
            <p className="future-sub">
              {future?.subtext ?? "Most software companies treat print as one of dozens of industries. We don't. PrintOpsAI is built exclusively for print — combining AI automation, web-to-print, workflow tools, and cloud infrastructure into a platform that fits how print operations actually work."}
            </p>
            <a href={future?.primaryButtonHref ?? '/#services'} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              <i className="fa-solid fa-arrow-right" />
              {future?.primaryButtonText ?? 'Explore Solutions'}
            </a>
          </div>

          <div className="future-feats future-feats--3">
            {features.map((f, i) => (
              <div className={`feat-card feat-card--large fade-up d${i + 1}`} key={i}>
                {f.icon && <div className="icon-box"><i className={`fa-solid ${f.icon}`} /></div>}
                <div className="feat-title">{f.title}</div>
                <p className="feat-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ S8 · Brands Logo Grid ═══════════════════════════════ */}
      <section className="brands-sec">
        <div className="brands-header">
          <p className="eyebrow fade-up">{brands?.eyebrow ?? 'TRUSTED WORLDWIDE'}</p>
          <h2 className="h2 fade-up d1" style={{ color: 'var(--ink)' }}>
            {brands?.heading
              ? <HL text={brands.heading} highlight={brands.headingHighlight} />
              : 'Brands That Trust PrintOpsAI'
            }
          </h2>
          <p className="brands-sub fade-up d2">
            {brands?.subtext ?? 'Supporting print businesses, technology partners, and industry organizations worldwide.'}
          </p>
        </div>
        <div className="container">
          <div className="logo-grid">
            {logos.map((logo, i) => (
              <div className={`logo-cell fade-up d${(i % 5) + 1}`} key={i}>
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="logo-img"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ S9 · Reviews Header ══════════════════════════════════ */}
      <section className="reviews-hero">
        <div className="container">
          <div className="reviews-hero-inner">
            <div className="fade-up">
              <h2 className="reviews-hero-title">
                {reviews?.heading ?? 'What Print Shop Owners Say About PrintOpsAI'}
              </h2>
              <p className="reviews-hero-sub">
                {reviews?.subtext ?? "What it's like to partner with PrintOpsAI, straight from the clients who did."}
              </p>
            </div>
            <div className="google-rating-card fade-up d1">
              <span className="google-g">G</span>
              <span className="google-label">Google Rating</span>
              <div className="google-score-row">
                <span className="google-score">{reviews?.googleScore ?? '4.8'}</span>
                <span className="google-stars">★★★★★</span>
              </div>
              <span className="google-count">{reviews?.googleCount ?? '320+ Reviews'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ S9b · Testimonial cards ════════════════════════════ */}
      <section className="section" style={{ background: 'var(--grey)', paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {testimonials.map((t, i) => (
              <div key={i} className={`fade-up d${i + 1}`} style={{
                background: 'var(--white)',
                border: '1px solid var(--line)',
                borderRadius: 16,
                padding: '28px 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                boxShadow: 'var(--sh-sm)',
              }}>
                <div style={{ color: '#FBBC05', fontSize: 15, letterSpacing: 2 }}>
                  {'★'.repeat(t.rating ?? 5)}
                </div>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--ink)', fontStyle: 'italic', flex: 1 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ borderTop: '1px solid var(--line)', paddingTop: 14 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>{t.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 2 }}>
                    {t.role}{t.company ? ` · ${t.company}` : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ S10 · CTA ════════════════════════════════════════════ */}
      <section className="cta-sec">
        <div className="cta-body">
          <span className="chip chip-glow fade-up">{cta?.chip ?? 'Get Started'}</span>

          <h2 className="cta-h fade-up d1">
            {cta?.heading ?? 'Ready to Automate Your Print Business?'}
          </h2>

          <p className="cta-sub fade-up d2">
            {cta?.subtext ?? "Book a personalised 30-minute demo and see how PrintOpsAI can transform your print operations. We'll walk through your current workflow, identify your biggest bottlenecks, and show you exactly what results are achievable for your specific type of print shop. No sales pressure. No commitments. Just a clear picture of what is possible."}
          </p>

          <div className="cta-btns fade-up d3">
            <a href={cta?.primaryButtonHref ?? '/#contact'} className="btn btn-primary">
              <i className="fa-solid fa-calendar-days" />
              {cta?.primaryButtonText ?? 'Book a Demo'}
            </a>
            <a href={cta?.secondaryButtonHref ?? '/#services'} className="btn btn-ghost-navy">
              {cta?.secondaryButtonText ?? 'Learn More'}
            </a>
          </div>

          <p className="cta-trust fade-up d4">
            <span className="cta-stars">★★★★★</span>
            {' '}{cta?.trustLine ?? '4.8 Rating · Trusted by 250+ print businesses'}
          </p>
        </div>
      </section>

    </div>
  )
}
