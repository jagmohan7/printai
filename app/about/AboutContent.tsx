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
  { icon: 'fa-robot',       metric: '24/7',   title: 'AI Chatbot',               desc: 'Automated quoting, lead capture and support around the clock.' },
  { icon: 'fa-print',       metric: '48hr',   title: 'Web-to-Print Platform',    desc: 'Branded storefront with live proofing and one-click reorder.' },
  { icon: 'fa-gears',       metric: '0',      title: 'Workflow Automation',      desc: 'Jobs routed inquiry-to-production with zero re-keying.' },
  { icon: 'fa-microchip',   metric: 'Custom', title: 'Custom AI Solutions',      desc: 'Bespoke AI trained on your catalogue, pricing and brand.' },
  { icon: 'fa-cloud',       metric: '99.9%',  title: 'DevOps & Infrastructure',  desc: 'Reliable, scalable cloud infra for print operations.' },
  { icon: 'fa-layer-group', metric: '250+',   title: 'Print Industry Expertise', desc: 'Deep domain knowledge from 250+ print shops served.' },
]

const DEFAULT_TRUST_ITEMS = [
  { val: '20+',    label: 'Years of Combined Industry Expertise' },
  { val: '250+',   label: 'Print Businesses Served' },
  { val: '2,000+', label: 'Workflows Automated' },
  { val: '96%',    label: 'Client Retention' },
]

const DEFAULT_FUTURE_STATS = [
  { val: '250+',  label: 'Print Shops Onboarded' },
  { val: '6',     label: 'AI Products in the Platform' },
  { val: '48hrs', label: 'Average AI Chatbot Setup Time' },
]

const DEFAULT_FEATURES = [
  { icon: 'fa-print',         title: 'Print-Only Expertise',       desc: 'Every engineer, every product manager, every support person at PrintOpsAI works exclusively with print businesses. We understand prepress, press, and post-press — not just software.' },
  { icon: 'fa-key',           title: 'You Own Everything',         desc: "We don't lock you in. Your web store runs on Shopify or WooCommerce — platforms you own. Your custom AI code is delivered to you with full source access. No dependency on us." },
  { icon: 'fa-bullseye',      title: 'Built for Your ICP',         desc: "Whether you run a 10-person commercial print shop in Ohio or a 5-location franchise in Canada, PrintOpsAI's products are sized and priced for mid-market print businesses — not enterprises." },
  { icon: 'fa-chart-line',    title: 'Real Results, Not Demos',    desc: 'Our case studies show real numbers from real clients: $120K annual savings, 300% revenue growth, 80% of enquiries auto-resolved. These are not projections. They are outcomes.' },
  { icon: 'fa-tag',           title: 'Fixed-Price Custom AI',      desc: 'Our custom AI development is priced at a fixed fee ($15K–$75K). You know the cost before we start. No hourly billing, no scope creep, no surprises at invoice time.' },
  { icon: 'fa-bolt',          title: '48-Hour AI Chatbot Setup',   desc: 'Most clients have a live, trained AI chatbot on their website within 48 hours of providing their pricing sheet and product catalogue. No months-long implementations.' },
]

const DEFAULT_LOGOS = [
  'Waldow Verlag', 'IMPRUF', 'Wine of Earth', 'MORAVAN', 'BARIX', 'marchfeldpflanzen.at',
  'ERPNext', 'Cloudflare', 'OpenAI', 'Stripe', 'PRINTING United', 'FESPA',
]

const DEFAULT_VALUES = ['Print-native, not print-adapted.', 'Results before features.', 'Transparent pricing, always.', 'Client owns their code and their data.', 'Build for real workflows, not demo environments.']

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
  const logos          = brands?.logos?.length          ? brands.logos         : DEFAULT_LOGOS
  const values         = mvv?.values?.length            ? mvv.values           : DEFAULT_VALUES
  const testimonials   = reviews?.testimonials?.length  ? reviews.testimonials : DEFAULT_TESTIMONIALS

  return (
    <div className="about-page">

      {/* ═══════════════ S1 · Hero ═══════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-body">
          <span className="chip chip-glow fade-up">{hero?.chip ?? 'DRIVING PRINT GROWTH WITH PURPOSE'}</span>

          <h1 className="h-display hero-title fade-up d1">
            {hero?.heading
              ? <HL text={hero.heading} highlight={hero.headingHighlight} />
              : <>The AI Company That Actually <span className="teal">Understands Print</span></>
            }
          </h1>

          <p className="hero-sub fade-up d2">
            {hero?.subtext ?? 'PrintOpsAI is a USA and Canada-focused AI automation platform built exclusively for print businesses — combining chatbots, web-to-print storefronts, workflow automation, and custom AI into one connected platform.'}
          </p>

          <div className="hero-ctas fade-up d3">
            <a href={hero?.primaryButtonHref ?? '/#contact'} className="btn btn-primary">
              <i className="fa-solid fa-calendar-days" />
              {hero?.primaryButtonText ?? 'Book a Demo'}
            </a>
            <a href={hero?.secondaryButtonHref ?? '/#services'} className="btn btn-ghost">
              {hero?.secondaryButtonText ?? 'Explore Solutions'}
            </a>
          </div>

          <div className="trust-bar fade-up d4">
            {trustItems.map((item, i) => (
              <div className="trust-item" key={i}>
                <span className="trust-val">{item.val}</span>
                <span className="trust-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ S2 · Solutions Strip ═══════════════════════════════ */}
      <div className="strip">
        <div className="strip-track">
          {[...solutions, ...solutions].map((s, i) => (
            <span className="chip" key={i}>{s}</span>
          ))}
        </div>
      </div>

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
                {about?.paragraph1 ?? "PrintOpsAI is a USA and Canada-focused AI automation platform and print technology specialist, built from the ground up for the printing industry. We are not a generic software company that added a print module. We are a team of print industry specialists, AI engineers, and workflow architects who have spent years inside commercial print operations — learning every bottleneck, every manual process, and every missed lead that costs print businesses revenue. We don't make promises. We deliver performance."}
              </p>
              <p className="body fade-up d4">
                {about?.paragraph2 ?? "As a leading print automation software company and AI development partner for print shops, we build the tools that let print businesses stop managing spreadsheets and start growing their revenue. Our platform combines AI-powered chatbots, web-to-print storefronts, workflow automation, custom AI development, and managed DevOps infrastructure — all connected, all built for print, and all designed to run without a dedicated IT team."}
              </p>
              <p className="body fade-up d5">
                {about?.paragraph3 ?? "We work with commercial printers, web-to-print businesses, multi-location print chains, packaging printers, and in-plant operations across the United States and Canada. If your print shop is still running on spreadsheets, disconnected tools, and manual quoting — PrintOpsAI was built for you."}
              </p>
            </div>

            <div className="cap-grid">
              {capabilities.map((cap, i) => (
                <div className={`cap-card fade-up d${(i % 3) + 1}`} key={i}>
                  {cap.icon && <div className="icon-box"><i className={`fa-solid ${cap.icon}`} /></div>}
                  <div className="cap-metric">{cap.metric}</div>
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
              {story?.intro ?? "PrintOpsAI was founded by a team who had spent years working with print businesses across the USA and Canada — watching shops lose leads after 5pm because no one answered the phone, watching CSR teams spend four hours a day re-entering the same order data into three different systems, and watching ambitious print shop owners hit a ceiling they couldn't break through without technology. The problem wasn't that print businesses lacked ambition. The problem was that every software company serving them was building generic tools and calling them 'print solutions.'"}
            </p>

            <p className="story-pull fade-up d2">
              &ldquo;{story?.pullQuote ?? "Our long-term vision: every print business in the world — regardless of size — has access to AI that actually understands their work."}&rdquo;
            </p>

            <div className="story-cols fade-up d3">
              <div className="story-col">
                <p className="body">
                  {story?.col1Para1 ?? "Today, PrintOpsAI is an AI automation platform serving print businesses across North America — combining AI chatbots that answer quotes 24/7, web-to-print storefronts built on Shopify and WooCommerce, intelligent workflow automation from order intake to delivery, custom AI development where the client owns the source code, and managed DevOps infrastructure built specifically for file-heavy print environments. Every product we build has one goal: to give print businesses the same technology advantages that large print corporations have — without the enterprise price tag."}
                </p>
                <p className="body">
                  {story?.col1Para2 ?? "We believe print is not a declining industry. It is an industry waiting for the right technology. Print businesses that adopt AI automation are not just surviving — they are growing faster, capturing more leads, and serving more customers with the same team they already have. We are here to make that happen for every print shop that is ready. That is PrintOpsAI."}
                </p>
              </div>
              <div className="story-col">
                <p className="body">
                  {story?.col2Para1 ?? "We decided to do something different. Instead of adapting existing SaaS products for print, we built from scratch — starting with a deep understanding of how print businesses actually operate. What does a pressman care about at 6am? What does a CSR spend 70% of their day on? What does a print shop owner lie awake worrying about at midnight? Those questions became the product. PrintOpsAI is the answer to all of them."}
                </p>
                <blockquote className="story-callout">
                  &ldquo;{story?.col2Callout ?? "The businesses that will win the next decade in print are the ones automating today. We're here to make sure more of them make that leap."}&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ S5 · Mission / Vision / Values ══════════════════════ */}
      <section className="section mvv-sec">
        <div className="container">
          <div className="mvv-header fade-up">
            <p className="eyebrow">HOW WE THINK. HOW WE BUILD. HOW WE WIN.</p>
          </div>
          <div className="mvv-grid">
            <div className="mvv-card fade-up d1">
              <div className="icon-box"><i className="fa-solid fa-bullseye" /></div>
              <div className="mvv-title">{mvv?.missionTitle ?? 'Our Mission'}</div>
              <p className="mvv-body">
                {mvv?.missionBody ?? "Build AI automation tools that give every print business — regardless of size — the operational efficiency and technology advantage previously available only to large print corporations."}
              </p>
            </div>
            <div className="mvv-card fade-up d2">
              <div className="icon-box"><i className="fa-solid fa-eye" /></div>
              <div className="mvv-title">{mvv?.visionTitle ?? 'Our Vision'}</div>
              <p className="mvv-body">
                {mvv?.visionBody ?? "A world where no print shop loses a lead because they were closed, misses a deadline because of manual scheduling, or reprints a job because of a file error that software could have caught."}
              </p>
            </div>
            <div className="mvv-card fade-up d3">
              <div className="icon-box"><i className="fa-solid fa-star" /></div>
              <div className="mvv-title">{mvv?.valuesTitle ?? 'Core Values'}</div>
              <ul className="mvv-list">
                {values.map((v, i) => <li key={i}>{v}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ S7 · Future of Print Automation ══════════════════════ */}
      <section className="section future-sec">
        <div className="container">
          <div className="future-top">
            <div className="future-left fade-up">
              <p className="eyebrow">{future?.eyebrow ?? "MORE THAN AN AGENCY: YOUR STRATEGIC PRINT GROWTH PARTNER"}</p>
              <h2 className="h2" style={{ color: 'var(--ink)' }}>
                {future?.heading
                  ? <HL text={future.heading} highlight={future.headingHighlight} />
                  : <>Print Automation Expertise That{' '}<span className="teal">No Generic Software Company Can Match.</span></>
                }
              </h2>
              <p className="future-sub">
                {future?.subtext ?? "Most software companies serve print as one of 40+ industries. Their support team doesn't know what bleed is. Their developers have never seen a press floor. Their chatbot cannot give an accurate quote for 500 business cards with gloss lamination at a 3-day turnaround. PrintOpsAI is different — we are the only AI automation company built exclusively for print businesses, and that specificity changes everything."}
              </p>
              <a href={future?.primaryButtonHref ?? '/#services'} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                <i className="fa-solid fa-rocket" />
                {future?.primaryButtonText ?? 'Explore Solutions'}
              </a>
            </div>

            <div className="future-stats">
              {futureStats.map((s, i) => (
                <div className={`stat-card fade-up d${i + 1}`} key={i}>
                  <div className="stat-val">{s.val}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="future-feats">
            {features.map((f, i) => (
              <div className={`feat-card fade-up d${(i % 3) + 1}`} key={i}>
                {f.icon && <div className="icon-box"><i className={`fa-solid ${f.icon}`} /></div>}
                <div className="feat-title">{f.title}</div>
                <p className="feat-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ S8 · Brands Logo Slider ══════════════════════════════ */}
      <section className="brands-sec">
        <div className="brands-header">
          <p className="eyebrow fade-up">{brands?.eyebrow ?? 'Trusted Worldwide'}</p>
          <h2 className="h2 fade-up d1" style={{ color: 'var(--ink)' }}>
            {brands?.heading
              ? <HL text={brands.heading} highlight={brands.headingHighlight} />
              : 'Brands That Trust PrintOpsAI'
            }
          </h2>
        </div>
        <div className="logo-slider">
          <div className="logo-track">
            {[...logos, ...logos].map((name, i) => (
              <div className="logo-card" key={i}>
                <span className="logo-name">{name}</span>
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
