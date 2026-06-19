// s-homepage.jsx — Recommended homepage composition (single tall artboard).
// Reuses the strongest concept from each section.

(function () {
  const SOL = [
    ['AI Chatbot', 'Answer questions, qualify leads and quote jobs 24/7 — trained on your catalogue.', ['Instant quotes', 'Lead capture', 'Human handoff']],
    ['Web-to-Print Platform', 'A branded storefront where customers design, order and reorder print online.', ['Online ordering', 'Live proofing', 'One-click reorder']],
    ['Workflow Automation', 'Route jobs from inquiry to production automatically, no re-keying.', ['Auto routing', 'Status syncing', 'Fewer errors']],
  ];
  const STEPS = [['Connect', 'Plug into your storefront, email and tools.'], ['Configure', 'Set products, pricing and brand voice.'], ['Automate', 'AI handles quotes, orders and support.'], ['Scale', 'Grow volume without growing headcount.']];
  const STATS = [['85%', 'Faster Order Processing'], ['300%', 'Revenue Growth'], ['120K+', 'Annual Savings'], ['24/7', 'AI Support']];
  const CHECKS = ['Industry-focused', 'Automation-first', 'Easy deployment', 'Dedicated support'];
  const BLOG = [['Automation', 'How AI cuts print quote time by 85%'], ['Case Study', 'How Apex Press scaled to 300% revenue'], ['Guide', 'Launch a web-to-print storefront in a week']];
  const FCOLS = [['Company', ['About', 'Careers', 'Contact', 'Partners']], ['Products', ['AI Chatbot', 'Web-to-Print', 'Workflow', 'Pricing']], ['Resources', ['Blog', 'Case Studies', 'FAQs', 'Help']]];
  const NAV = ['Home', 'About', 'Products ▾', 'Services', 'Resources ▾'];

  const Band = ({ h, cls = '', style = {}, children }) => (
    <div className={cls} style={{ height: h, overflow: 'hidden', ...style }}>{children}</div>
  );
  const SecHead = ({ eyebrow, title, center, size = 34 }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: center ? 'center' : 'flex-start', textAlign: center ? 'center' : 'left' }}>
      <Eyebrow>{eyebrow}</Eyebrow><H size={size}>{title}</H>
    </div>
  );

  function Homepage() {
    return (
      <DCArtboard id="home-full" label="Recommended composition — full homepage" width={1180} height={4190}>
        <WF title="Recommended homepage"
          notes="Strongest concept per section: glass nav · split hero (1) · navy stat band (A) · image-left about (A) · 3-card solutions (A) · timeline how-it-works (A) · 3-card blogs (A) · enterprise review wall (C) · centered gradient CTA (A) · 4-column footer (A). Light/dark rhythm: white → navy → white → grey → white → navy close."
          tags={['composition', 'light/dark rhythm', 'toggle to preview dark ↗']}>
          <div style={{ height: '100%', overflow: 'hidden' }}>

            {/* NAV */}
            <Band h={74} style={{ background: 'var(--wf-card)', borderBottom: '1px solid var(--wf-line)' }}>
              <Row justify="space-between" style={{ height: '100%', padding: '0 64px' }}>
                <Row gap={36}><Logo variant="row" /><Row gap={26}>{NAV.map((t, i) => <span key={i} style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: i === 0 ? 600 : 500, color: i === 0 ? 'var(--wf-ink)' : 'var(--wf-ink-2)' }}>{t}</span>)}</Row></Row>
                <Row gap={12}><span style={{ fontSize: 14 }}>◐</span><Btn kind="ghost" size="sm">Contact</Btn><Btn size="sm">Book Demo</Btn></Row>
              </Row>
            </Band>

            {/* HERO */}
            <Band h={600}>
              <Pad x={64} y={56} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, height: '100%', alignItems: 'center' }}>
                <Col gap={22}>
                  <Eyebrow>AI for Print Businesses</Eyebrow>
                  <H size={50} style={{ lineHeight: 1.03 }}>Your Print Business.<br /><span className="teal">Powered by AI.</span></H>
                  <Sub size={17} w={440}>Automate customer support, online ordering, quote generation and print workflows with one intelligent platform built exclusively for print businesses.</Sub>
                  <Row gap={12}><Btn kind="pri" size="lg">Book a Demo</Btn><Btn kind="ghost" size="lg">View Case Studies</Btn></Row>
                  <TrustCard style={{ width: 360, marginTop: 4 }} />
                </Col>
                <div style={{ position: 'relative', height: 420 }}>
                  <Img w="100%" h="100%" label={'PRODUCT UI\norder dashboard · chatbot · storefront'} r={18} />
                  <MiniCard w={170} label="AI chatbot" style={{ position: 'absolute', top: -16, left: -22 }} />
                  <MiniCard w={190} label="order dashboard" style={{ position: 'absolute', bottom: -18, right: -20 }} />
                </div>
              </Pad>
            </Band>

            {/* STATS */}
            <Band h={150} cls="on-navy">
              <div style={{ height: '100%', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', alignItems: 'center', padding: '0 64px' }}>
                {STATS.map(([n, l], i) => (
                  <div key={i} style={{ borderLeft: i ? '1px solid var(--wf-line)' : 'none', paddingLeft: i ? 40 : 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 40, color: 'var(--wf-teal)', lineHeight: 1 }}>{n}</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'var(--wf-ink-2)' }}>{l}</span>
                  </div>
                ))}
              </div>
            </Band>

            {/* ABOUT */}
            <Band h={480}>
              <Pad x={64} y={56} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, height: '100%', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <Img w="100%" h={340} label={'PRINT FACILITY\n+ AI overlays'} r={18} />
                  <div className="wf-card" style={{ position: 'absolute', bottom: -18, right: -18, padding: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 22, color: 'var(--wf-teal)' }}>250+</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'var(--wf-ink-2)' }}>print companies<br />onboarded</span>
                  </div>
                </div>
                <Col gap={22}>
                  <SecHead eyebrow="Who We Are" title={<>Print expertise, <span className="teal">amplified by AI.</span></>} size={32} />
                  <Sub size={16} w={420}>PrintAI helps print businesses automate repetitive work, capture more leads and scale operations using AI-powered solutions built for the industry.</Sub>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>{CHECKS.map((c, i) => <Check key={i} label={c} />)}</div>
                  <Row gap={12}><Btn>Our Story</Btn><Btn kind="ghost">Meet the Team</Btn></Row>
                </Col>
              </Pad>
            </Band>

            {/* SOLUTIONS */}
            <Band h={560} cls="on-grey">
              <Pad x={64} y={48} style={{ display: 'flex', flexDirection: 'column', gap: 32, height: '100%' }}>
                <SecHead center eyebrow="Our Solutions" title="Everything Your Print Business Needs" size={36} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22, flex: 1 }}>{SOL.map((d, i) => <SolCard key={i} d={d} />)}</div>
              </Pad>
            </Band>

            {/* HOW */}
            <Band h={380}>
              <Pad x={64} y={44} style={{ display: 'flex', flexDirection: 'column', gap: 36, height: '100%' }}>
                <SecHead center eyebrow="How It Works" title="From Inquiry to Production" size={34} />
                <div style={{ position: 'relative', flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 28, alignItems: 'start', paddingTop: 8 }}>
                  <div style={{ position: 'absolute', top: 27, left: '12%', right: '12%', height: 2, background: 'var(--wf-line)' }} />
                  {STEPS.map(([t, d], i) => <div key={i} style={{ position: 'relative' }}><StepNode i={i} t={t} d={d} center /></div>)}
                </div>
              </Pad>
            </Band>

            {/* BLOGS */}
            <Band h={510} cls="on-grey">
              <Pad x={64} y={48} style={{ display: 'flex', flexDirection: 'column', gap: 28, height: '100%' }}>
                <Row justify="space-between" align="flex-end">
                  <SecHead eyebrow="From the Blog" title="Insights for modern print businesses" size={32} />
                  <Btn kind="ghost">View all  →</Btn>
                </Row>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, flex: 1 }}>{BLOG.map(([c, t], i) => <BlogCard key={i} cat={c} title={t} />)}</div>
              </Pad>
            </Band>

            {/* TESTIMONIALS */}
            <Band h={480}>
              <Pad x={64} y={44} style={{ display: 'flex', flexDirection: 'column', gap: 26, height: '100%' }}>
                <Row justify="space-between" align="center">
                  <SecHead eyebrow="Testimonials" title="Loved by print businesses" size={32} />
                  <div className="wf-card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
                    <GMark size={30} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <Row gap={9}><span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 24, color: 'var(--wf-ink)' }}>4.8</span><Stars size={14} /></Row>
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--wf-ink-2)' }}>320+ GOOGLE REVIEWS</span>
                    </div>
                  </div>
                </Row>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, flex: 1 }}>{[3, 3, 3].map((l, i) => <ReviewCard key={i} lines={l} />)}</div>
              </Pad>
            </Band>

            {/* CTA */}
            <Band h={380} cls="on-navy" style={{ background: 'linear-gradient(115deg, #0B1628 0%, #15324C 52%, #0F6E56 100%)' }}>
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 20, padding: '0 80px' }}>
                <Eyebrow style={{ color: 'var(--wf-teal)' }}>Get Started</Eyebrow>
                <H size={40} style={{ maxWidth: 720 }}>Ready to Automate Your Print Business?</H>
                <Sub size={17} w={560} style={{ textAlign: 'center' }}>Book a personalized demo and see how PrintAI can transform your operations.</Sub>
                <Row gap={14}><Btn kind="pri" size="lg">Book Demo</Btn><Btn kind="ghost" size="lg">Contact Sales</Btn></Row>
              </div>
            </Band>

            {/* FOOTER */}
            <Band h={430} cls="on-navy" style={{ background: 'var(--wf-navy)' }}>
              <Pad x={64} y={48} style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 28 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(3,1fr) 1.1fr', gap: 36, flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <Logo variant="row" />
                    <Sub size={13.5} w={240}>AI automation built exclusively for print businesses.</Sub>
                    <Social />
                  </div>
                  {FCOLS.map(([t, l], i) => <FCol key={i} title={t} links={l} />)}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--wf-ink)' }}>Contact</span>
                    <ContactBlock />
                  </div>
                </div>
                <LegalBar />
              </Pad>
            </Band>

          </div>
        </WF>
      </DCArtboard>
    );
  }

  window.Homepage = Homepage;
})();
