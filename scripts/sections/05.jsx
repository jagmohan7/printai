// s-stats-about-solutions.jsx — 03 Stats (3), 04 About (3), 05 Solutions (3)

const STATS = [['85%', 'Faster Order Processing'], ['300%', 'Revenue Growth'], ['120K+', 'Annual Savings'], ['24/7', 'AI Support']];

function StatNum({ n, l, size = 44, center }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: center ? 'center' : 'flex-start', textAlign: center ? 'center' : 'left' }}>
      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: size, color: 'var(--wf-teal)', letterSpacing: '-0.02em', lineHeight: 1 }}>{n}</span>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'var(--wf-ink-2)' }}>{l}</span>
    </div>
  );
}

function Stats() {
  return (
    <>
      <DCArtboard id="stats-a" label="A · Centered band + dividers" width={1180} height={280}>
        <WF title="Classic counter band"
          notes="Thin navy band breaks the white scroll & frames the proof. Four equal columns, vertical dividers, numbers animate up on enter."
          tags={['navy band', 'animated counters', '4-up']} stageClass="on-navy">
          <div style={{ height: '100%', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', alignItems: 'center', padding: '0 64px' }}>
            {STATS.map(([n, l], i) => (
              <div key={i} style={{ borderLeft: i ? '1px solid var(--wf-line)' : 'none', paddingLeft: i ? 40 : 0 }}>
                <StatNum n={n} l={l} />
              </div>
            ))}
          </div>
        </WF>
      </DCArtboard>

      <DCArtboard id="stats-b" label="B · Intro label + numbers" width={1180} height={280}>
        <WF title="Lead-in + metrics"
          notes="A short framing label claims the row, then metrics follow. Gives context ('these are real outcomes') without a full heading section."
          tags={['lead-in copy', 'teal underline', 'asymmetric']} stageClass="on-navy">
          <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '0.9fr repeat(4,1fr)', alignItems: 'center', gap: 28, padding: '0 64px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Eyebrow style={{ color: 'var(--wf-teal)' }}>By the numbers</Eyebrow>
              <Lines n={2} w={['100%', '70%']} h={9} gap={8} />
              <span style={{ width: 40, height: 3, background: 'var(--wf-teal)', borderRadius: 3 }} />
            </div>
            {STATS.map(([n, l], i) => <StatNum key={i} n={n} l={l} size={38} />)}
          </div>
        </WF>
      </DCArtboard>

      <DCArtboard id="stats-c" label="C · Glass stat cards" width={1180} height={280}>
        <WF title="Metric cards on navy"
          notes="Each stat in its own soft glass card with an icon — more tactile, scales to mobile as a 2×2. Slightly taller band."
          tags={['glass cards', 'icon + metric', '2×2 on mobile']} stageClass="on-navy">
          <div style={{ height: '100%', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18, alignItems: 'center', padding: '0 64px' }}>
            {STATS.map(([n, l], i) => (
              <div key={i} className="wf-card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Icon size={40} />
                <StatNum n={n} l={l} size={32} />
              </div>
            ))}
          </div>
        </WF>
      </DCArtboard>
    </>
  );
}

/* ---------- About ---------- */
const ABOUT_CHECKS = ['Industry-focused', 'Automation-first', 'Easy deployment', 'Dedicated support'];
function Check({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--wf-teal-soft)', color: 'var(--wf-teal-deep)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flex: '0 0 auto' }}>✓</span>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 500, color: 'var(--wf-ink)' }}>{label}</span>
    </div>
  );
}

function About() {
  const Story = ({ w }) => (<>
    <Eyebrow>Who We Are</Eyebrow>
    <H size={34} style={{ margin: '14px 0 16px' }}>Print expertise, <span className="teal">amplified by AI.</span></H>
    <Sub size={16} w={w}>PrintAI helps print businesses automate repetitive work, capture more leads and scale operations using AI-powered solutions built for the industry.</Sub>
  </>);
  return (
    <>
      <DCArtboard id="about-a" label="A · Image left / content right" width={1180} height={660}>
        <WF title="Story + checklist"
          notes="Canonical about: photo of a real facility (with AI overlays) earns trust on the left; story + scannable proof points on the right end on a CTA."
          tags={['image left', '2×2 checklist', 'facility + AI']}>
          <Pad x={64} y={56} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, height: '100%', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Img w="100%" h={360} label={'PRINT FACILITY\n+ AI overlays'} r={18} />
              <div className="wf-card" style={{ position: 'absolute', bottom: -18, right: -18, padding: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 22, color: 'var(--wf-teal)' }}>250+</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'var(--wf-ink-2)' }}>print companies<br />onboarded</span>
              </div>
            </div>
            <Col gap={22}>
              <div><Story w={420} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>{ABOUT_CHECKS.map((c, i) => <Check key={i} label={c} />)}</div>
              <Row gap={12}><Btn>Our Story</Btn><Btn kind="ghost">Meet the Team</Btn></Row>
            </Col>
          </Pad>
        </WF>
      </DCArtboard>

      <DCArtboard id="about-b" label="B · Content left / image right" width={1180} height={660}>
        <WF title="Reversed + stacked checklist"
          notes="Mirror layout for visual rhythm against neighbouring sections. Checklist as a vertical list reads faster; overlapping metric chip adds depth to the image."
          tags={['reversed', 'vertical checklist', 'depth chip']} stageClass="on-grey">
          <Pad x={64} y={56} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, height: '100%', alignItems: 'center' }}>
            <Col gap={22}>
              <div><Story w={420} /></div>
              <Col gap={13}>{ABOUT_CHECKS.map((c, i) => <Check key={i} label={c} />)}</Col>
            </Col>
            <div style={{ position: 'relative' }}>
              <Img w="100%" h={380} label={'TEAM / FACILITY'} r={18} />
              <MiniCard w={180} label="workflow automated" style={{ position: 'absolute', top: -16, left: -20 }} />
            </div>
          </Pad>
        </WF>
      </DCArtboard>

      <DCArtboard id="about-c" label="C · Banner image + overlap card" width={1180} height={660}>
        <WF title="Full-width image + floating story card"
          notes="Editorial treatment: a wide facility banner with the story lifted into an overlapping card. Feels premium & magazine-like; checklist becomes a chip row."
          tags={['banner image', 'overlap card', 'editorial']}>
          <div style={{ height: '100%', position: 'relative' }}>
            <Img w="100%" h={300} label={'WIDE PRINT FACILITY BANNER — AI overlays'} r={0} />
            <div className="wf-card" style={{ position: 'absolute', left: 64, right: 64, top: 196, padding: 36, boxShadow: 'var(--wf-shadow)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, alignItems: 'center' }}>
                <div><Story w={460} /></div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>{ABOUT_CHECKS.map((c, i) => <Chip key={i} teal>✓ {c}</Chip>)}</div>
              </div>
            </div>
          </div>
        </WF>
      </DCArtboard>
    </>
  );
}

/* ---------- Solutions ---------- */
const SOLUTIONS = [
  ['AI Chatbot', 'Answer customer questions, qualify leads and quote jobs 24/7 — trained on your catalogue.', ['Instant quotes', 'Lead capture', 'Human handoff']],
  ['Web-to-Print Platform', 'A branded storefront where customers design, order and reorder print online.', ['Online ordering', 'Live proofing', 'Reorder in one click']],
  ['Workflow Automation', 'Route jobs from inquiry to production automatically, no manual re-keying.', ['Auto job routing', 'Status syncing', 'Fewer errors']],
];
function SolCard({ d, style = {}, big = false }) {
  const [title, desc, benefits] = d;
  return (
    <div className="wf-card" style={{ padding: big ? 32 : 26, display: 'flex', flexDirection: 'column', gap: 16, height: '100%', ...style }}>
      <Icon size={big ? 60 : 52} />
      <h3 className="wf-h" style={{ fontSize: big ? 25 : 21, fontWeight: 700 }}>{title}</h3>
      <Sub size={14.5}>{desc}</Sub>
      <Col gap={10} style={{ marginTop: 2 }}>{benefits.map((b, i) => (
        <Row key={i} gap={9}><span style={{ color: 'var(--wf-teal-deep)', fontWeight: 800, fontSize: 13 }}>✓</span><span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: 'var(--wf-ink-2)' }}>{b}</span></Row>
      ))}</Col>
      <div style={{ marginTop: 'auto', paddingTop: 8 }}><Btn kind="ghost" size="sm">Learn More  →</Btn></div>
    </div>
  );
}
function SolHead({ center }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', display: 'flex', flexDirection: 'column', gap: 12, alignItems: center ? 'center' : 'flex-start' }}>
      <Eyebrow>Our Solutions</Eyebrow>
      <H size={36}>Everything Your Print Business Needs</H>
    </div>
  );
}

function Solutions() {
  return (
    <>
      <DCArtboard id="sol-3card" label="A · 3-card row" width={1180} height={720}>
        <WF title="Equal 3-card grid"
          notes="Three peers, equal weight — clearest when offerings are siblings. Icon → title → desc → benefits → Learn More keeps every card scannable in the same rhythm."
          tags={['equal cards', 'scannable', 'aligned CTAs']}>
          <Pad x={64} y={48} style={{ display: 'flex', flexDirection: 'column', gap: 32, height: '100%' }}>
            <SolHead center />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22, flex: 1 }}>
              {SOLUTIONS.map((d, i) => <SolCard key={i} d={d} />)}
            </div>
          </Pad>
        </WF>
      </DCArtboard>

      <DCArtboard id="sol-carousel" label="B · Carousel" width={1180} height={720}>
        <WF title="Slider with peek + controls"
          notes="Scales past three offerings without growing the page. Next card peeks to signal swipe; arrows + dots give explicit control. Best when the list will grow."
          tags={['peek next', 'arrows + dots', 'extensible']} stageClass="on-grey">
          <Pad x={64} y={48} style={{ display: 'flex', flexDirection: 'column', gap: 28, height: '100%' }}>
            <Row justify="space-between" align="flex-end">
              <SolHead />
              <Row gap={10}>
                <span style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--wf-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wf-ink-2)' }}>←</span>
                <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--wf-teal)', color: 'var(--wf-on-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</span>
              </Row>
            </Row>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.34fr', gap: 22, flex: 1, overflow: 'hidden' }}>
              <SolCard d={SOLUTIONS[0]} />
              <SolCard d={SOLUTIONS[1]} />
              <div style={{ opacity: .5 }}><SolCard d={SOLUTIONS[2]} /></div>
            </div>
            <Row gap={8} justify="center">
              <span style={{ width: 26, height: 6, borderRadius: 6, background: 'var(--wf-teal)' }} />
              <span style={{ width: 6, height: 6, borderRadius: 6, background: 'var(--wf-bar)' }} />
              <span style={{ width: 6, height: 6, borderRadius: 6, background: 'var(--wf-bar)' }} />
            </Row>
          </Pad>
        </WF>
      </DCArtboard>

      <DCArtboard id="sol-bento" label="C · Bento grid" width={1180} height={1030}>
        <WF title="Bento — one hero + two supporting"
          notes="Establishes a hierarchy: lead with the flagship (Chatbot) as a wide feature, support with two smaller cells. Use when one product is the wedge."
          tags={['hero cell', 'hierarchy', 'mixed sizes']}>
          <Pad x={64} y={48} style={{ display: 'flex', flexDirection: 'column', gap: 30, height: '100%' }}>
            <SolHead />
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gridTemplateRows: '1fr 1fr', gap: 20, flex: 1 }}>
              <div style={{ gridRow: '1 / span 2' }}>
                <div className="wf-card" style={{ padding: 32, height: '100%', display: 'grid', gridTemplateColumns: '1fr 0.8fr', gap: 24, alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <Icon size={60} />
                    <h3 className="wf-h" style={{ fontSize: 27, fontWeight: 700 }}>AI Chatbot</h3>
                    <Sub size={14.5}>{SOLUTIONS[0][1]}</Sub>
                    <Row gap={10} wrap>{SOLUTIONS[0][2].map((b, i) => <Chip key={i} teal>{b}</Chip>)}</Row>
                    <Btn kind="ghost" size="sm" style={{ alignSelf: 'flex-start', marginTop: 4 }}>Learn More  →</Btn>
                  </div>
                  <Img h={220} label={'CHAT UI'} />
                </div>
              </div>
              <SolCard d={SOLUTIONS[1]} />
              <SolCard d={SOLUTIONS[2]} />
            </div>
          </Pad>
        </WF>
      </DCArtboard>
    </>
  );
}

Object.assign(window, { Stats, About, Solutions, Check, SolCard });
