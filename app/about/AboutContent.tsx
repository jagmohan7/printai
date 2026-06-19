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
  { val: '10+',    label: 'Years of Industry Expertise' },
  { val: '250+',   label: 'Print Businesses Served' },
  { val: '2,000+', label: 'Workflows Automated' },
  { val: '96%',    label: 'Client Retention' },
]

const DEFAULT_FUTURE_STATS = [
  { val: '250+', label: 'Print Businesses Served' },
  { val: '96%',  label: 'Client Retention Rate' },
  { val: '2K+',  label: 'Workflows Automated' },
  { val: '10+',  label: 'Years of Expertise' },
]

const DEFAULT_FEATURES = [
  { icon: 'fa-file-invoice-dollar', title: 'AI Quoting',                desc: 'Instant quotes delivered to customers in under 3 minutes, 24 hours a day.' },
  { icon: 'fa-boxes-stacked',       title: 'Smart Order Processing',     desc: 'Automated order intake, file validation and intelligent job routing.' },
  { icon: 'fa-headset',             title: 'Automated Customer Support', desc: 'Handle the repetitive 80% without human intervention, at any hour.' },
  { icon: 'fa-diagram-project',     title: 'Workflow Automation',        desc: 'Eliminate bottlenecks from art approval to dispatch, automatically.' },
  { icon: 'fa-store',               title: 'Online Print Storefronts',   desc: 'Branded e-commerce with live proofing and one-click reorder built in.' },
  { icon: 'fa-chart-line',          title: 'Operational Intelligence',   desc: 'Dashboards that surface the metrics that matter to print operators.' },
]

const DEFAULT_LOGOS = [
  'Waldow Verlag', 'IMPRUF', 'Wine of Earth', 'MORAVAN', 'BARIX', 'marchfeldpflanzen.at',
  'Apex Press', 'Metro Print Group', 'SignPro', 'FastPrint', 'ColorCraft', 'BlueSky Print',
  'ERPNext', 'Cloudflare', 'OpenAI', 'Stripe', 'PRINTING United', 'FESPA',
]

const DEFAULT_VALUES = ['Innovation', 'Reliability', 'Transparency', 'Customer Success', 'Industry Expertise']

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
  const futureStats  = future?.stats?.length       ? future.stats         : DEFAULT_FUTURE_STATS
  const features     = future?.features?.length    ? future.features      : DEFAULT_FEATURES
  const logos        = brands?.logos?.length       ? brands.logos         : DEFAULT_LOGOS
  const values       = mvv?.values?.length         ? mvv.values           : DEFAULT_VALUES

  return (
    <div className="about-page">

      {/* ═══════════════ S1 · Hero ═══════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-body">
          <span className="chip chip-glow fade-up">{hero?.chip ?? 'About PrintAI'}</span>

          <h1 className="h-display hero-title fade-up d1">
            {hero?.heading
              ? <HL text={hero.heading} highlight={hero.headingHighlight} />
              : <>Transform Your Print Business with{' '}<span className="teal">AI &amp; Automation</span></>
            }
          </h1>

          <p className="hero-sub fade-up d2">
            {hero?.subtext ?? 'We build AI-powered systems that help print businesses automate customer support, streamline operations, and scale without proportionally growing headcount.'}
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
              <p className="eyebrow fade-up">{about?.eyebrow ?? 'About PrintAI'}</p>
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
                {about?.paragraph1 ?? 'PrintAI was founded by a team obsessed with two things: the craft of printing and the transformative potential of artificial intelligence. We saw an industry full of talented businesses held back by manual, repetitive processes — and decided to do something about it.'}
              </p>
              <p className="body fade-up d4">
                {about?.paragraph2 ?? 'We build AI-powered platforms, chatbots, and automation systems specifically designed for print shops, sign companies, and wide-format businesses. Our solutions integrate with your existing workflows and grow with your business.'}
              </p>
              <p className="body fade-up d5">
                {about?.paragraph3 ?? 'Every product we ship is built on deep industry experience, close customer collaboration, and a relentless focus on measurable outcomes.'}
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
                  : <>Helping Print Businesses{' '}<span className="teal">Scale Through AI</span></>
                }
              </h2>
            </div>

            <p className="story-intro fade-up d1">
              {story?.intro ?? "We started PrintAI because we kept watching the same problem play out across print businesses of every size: talented teams drowning in emails, re-keying orders, chasing approvals, and answering the same customer questions over and over. The technology to fix all of that already existed — it just hadn't been built for print."}
            </p>

            <p className="story-pull fade-up d2">
              &ldquo;{story?.pullQuote ?? "Our long-term vision: every print business in the world — regardless of size — has access to AI that actually understands their work."}&rdquo;
            </p>

            <div className="story-cols fade-up d3">
              <div className="story-col">
                <p className="body">
                  {story?.col1Para1 ?? "We spent our first two years embedded with print businesses — learning their workflows, their pain points, their seasonal rushes and their customer expectations. That field experience is baked into every product we build."}
                </p>
                <p className="body">
                  {story?.col1Para2 ?? "Today we serve businesses ranging from three-person trade printers to regional print chains with 12 locations. Some came to us for a chatbot. Others for a full web-to-print platform. Most ended up with both — and more — once they saw what was possible."}
                </p>
              </div>
              <div className="story-col">
                <p className="body">
                  {story?.col2Para1 ?? "We're proud to be a business that actually ships. Not decks, not pilots, not six-month discovery phases — real software, in production, running the quote desks and order flows of print shops across the world."}
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
                {mvv?.missionBody ?? "To make AI-powered automation accessible to every print business — not just the ones with enterprise budgets. We believe automation should be a competitive equalizer, giving smaller shops the same operational leverage as the largest operators in the industry."}
              </p>
            </div>
            <div className="mvv-card fade-up d2">
              <div className="icon-box"><i className="fa-solid fa-eye" /></div>
              <div className="mvv-title">{mvv?.visionTitle ?? 'Our Vision'}</div>
              <p className="mvv-body">
                {mvv?.visionBody ?? "A world where every print business, regardless of size or technical sophistication, has AI systems that understand their workflows, serve their customers, and grow their revenue — running quietly in the background while their teams focus on craft."}
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
              <p className="eyebrow">{future?.eyebrow ?? "What's Coming"}</p>
              <h2 className="h2" style={{ color: 'var(--ink)' }}>
                {future?.heading
                  ? <HL text={future.heading} highlight={future.headingHighlight} />
                  : <>The Future of{' '}<span className="teal">Print Automation</span></>
                }
              </h2>
              <p className="future-sub">
                {future?.subtext ?? "The printing industry is undergoing its biggest transformation in decades. AI isn't coming to print — it's already here. The question is who adapts first."}
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
              : 'Brands That Trust PrintAI'
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
                {reviews?.heading ?? 'What People Say About PrintAI'}
              </h2>
              <p className="reviews-hero-sub">
                {reviews?.subtext ?? "What it's like to partner with PrintAI, straight from the clients who did."}
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

      {/* ═══════════════ S10 · CTA ════════════════════════════════════════════ */}
      <section className="cta-sec">
        <div className="cta-body">
          <span className="chip chip-glow fade-up">{cta?.chip ?? 'Get Started'}</span>

          <h2 className="cta-h fade-up d1">
            {cta?.heading ?? 'Ready to Automate Your Print Business?'}
          </h2>

          <p className="cta-sub fade-up d2">
            {cta?.subtext ?? 'Book a personalized demo and discover how PrintAI can automate customer support, online ordering, quote generation, and print workflows.'}
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
