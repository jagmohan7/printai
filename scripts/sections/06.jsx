// s-how-blogs-testi.jsx — 06 How It Works (3), 07 Blogs (2), 08 Testimonials (3)

const STEPS = [
  ['Connect', 'Plug PrintAI into your storefront, email and existing tools in minutes.'],
  ['Configure', 'Set your products, pricing rules and brand voice once.'],
  ['Automate', 'AI handles quotes, orders and support around the clock.'],
  ['Scale', 'Grow order volume without growing headcount.'],
];
function StepNode({ i, t, d, center }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: center ? 'center' : 'flex-start', textAlign: center ? 'center' : 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--wf-teal)', color: 'var(--wf-on-teal)',
          fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>{i + 1}</span>
        <Icon size={42} />
      </div>
      <h4 className="wf-h" style={{ fontSize: 19, fontWeight: 700 }}>{t}</h4>
      <Sub size={14} w={center ? 220 : 240}>{d}</Sub>
    </div>
  );
}
function HowHead({ center }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: center ? 'center' : 'flex-start', textAlign: center ? 'center' : 'left' }}>
      <Eyebrow>How It Works</Eyebrow>
      <H size={36}>From Inquiry to Production</H>
    </div>
  );
}

function HowItWorks() {
  return (
    <>
      <DCArtboard id="how-a" label="A · Horizontal timeline" width={1180} height={590}>
        <WF title="Numbered timeline"
          notes="A single connecting line threads four numbered nodes — reads as one continuous journey left→right. Cleanest for a fixed 4-step process."
          tags={['connector line', 'numbered', 'linear journey']}>
          <Pad x={64} y={48} style={{ display: 'flex', flexDirection: 'column', gap: 40, height: '100%' }}>
            <HowHead center />
            <div style={{ position: 'relative', flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 28, alignItems: 'start', paddingTop: 8 }}>
              <div style={{ position: 'absolute', top: 27, left: '12%', right: '12%', height: 2, background: 'var(--wf-line)' }} />
              {STEPS.map(([t, d], i) => <div key={i} style={{ position: 'relative' }}><StepNode i={i} t={t} d={d} center /></div>)}
            </div>
          </Pad>
        </WF>
      </DCArtboard>

      <DCArtboard id="how-b" label="B · Connected flow cards" width={1180} height={590}>
        <WF title="Process flow with arrows"
          notes="Each step is a card joined by arrows — emphasises that one stage feeds the next. The card surface lets each step hold a small illustration."
          tags={['flow arrows', 'cards', 'cause→effect']} stageClass="on-grey">
          <Pad x={56} y={48} style={{ display: 'flex', flexDirection: 'column', gap: 36, height: '100%' }}>
            <HowHead center />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
              {STEPS.map(([t, d], i) => (
                <React.Fragment key={i}>
                  <div className="wf-card" style={{ padding: 22, flex: 1, height: '78%', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <Row gap={10}><span style={{ fontFamily: 'IBM Plex Mono, monospace', fontWeight: 600, fontSize: 12, color: 'var(--wf-teal-deep)' }}>0{i + 1}</span><Icon size={36} /></Row>
                    <h4 className="wf-h" style={{ fontSize: 18, fontWeight: 700 }}>{t}</h4>
                    <Sub size={13}>{d}</Sub>
                  </div>
                  {i < STEPS.length - 1 && <span style={{ flex: '0 0 auto', color: 'var(--wf-bar-2)', fontSize: 22 }}>→</span>}
                </React.Fragment>
              ))}
            </div>
          </Pad>
        </WF>
      </DCArtboard>

      <DCArtboard id="how-c" label="C · Vertical alternating" width={1180} height={880}>
        <WF title="Alternating vertical rail"
          notes="A center spine with steps alternating left/right and an illustration opposite each — more narrative, ideal when each step needs a visual. Collapses to a single column on mobile."
          tags={['center spine', 'alternating', 'illustrated']}>
          <Pad x={64} y={44} style={{ display: 'flex', flexDirection: 'column', gap: 24, height: '100%' }}>
            <HowHead />
            <div style={{ position: 'relative', flex: 1 }}>
              <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'var(--wf-line)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'space-between', height: '100%' }}>
                {STEPS.map(([t, d], i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 38px 1fr', alignItems: 'center', gap: 18 }}>
                    <div style={{ gridColumn: i % 2 === 0 ? 1 : 3, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                      <h4 className="wf-h" style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{t}</h4>
                      <Sub size={13} style={{ marginLeft: i % 2 === 0 ? 'auto' : 0, maxWidth: 320 }}>{d}</Sub>
                    </div>
                    <span style={{ gridColumn: 2, width: 38, height: 38, borderRadius: '50%', background: 'var(--wf-teal)', color: 'var(--wf-on-teal)', fontFamily: 'Inter, sans-serif', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', justifySelf: 'center' }}>{i + 1}</span>
                    <Img w={150} h={64} label={'illustration'} style={{ gridColumn: i % 2 === 0 ? 3 : 1 }} />
                  </div>
                ))}
              </div>
            </div>
          </Pad>
        </WF>
      </DCArtboard>
    </>
  );
}

/* ---------- Blogs ---------- */
const BLOGS = [
  ['Automation', 'How AI cuts print quote time by 85%'],
  ['Case Study', 'How Apex Press scaled to 300% revenue'],
  ['Guide', 'Launch a web-to-print storefront in a week'],
];
function BlogCard({ cat, title, thumbH = 160, big = false }) {
  return (
    <div className="wf-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ position: 'relative' }}>
        <Img w="100%" h={thumbH} label={'thumbnail'} r={0} style={{ borderLeft: 'none', borderRight: 'none', borderTop: 'none' }} />
        <span className="wf-chip teal" style={{ position: 'absolute', top: 12, left: 12, height: 26, fontSize: 11 }}>{cat}</span>
      </div>
      <div style={{ padding: big ? 24 : 20, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--wf-ink-2)' }}>6 min read · Jun 2026</span>
        <h4 className="wf-h" style={{ fontSize: big ? 24 : 18.5, fontWeight: 700, lineHeight: 1.2 }}>{title}</h4>
        <Lines n={big ? 3 : 2} w={['100%', '94%', '60%']} h={8} gap={8} />
        <div style={{ marginTop: 'auto', paddingTop: 10, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--wf-teal-deep)', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13.5 }}>Read More →</div>
      </div>
    </div>
  );
}
function BlogHead({ center }) {
  return (
    <Row justify="space-between" align="flex-end">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Eyebrow>From the Blog</Eyebrow>
        <H size={34}>Insights for modern print businesses</H>
      </div>
      <Btn kind="ghost">View all articles  →</Btn>
    </Row>
  );
}

function Blogs() {
  return (
    <>
      <DCArtboard id="blog-a" label="A · 3 equal cards" width={1180} height={700}>
        <WF title="Equal featured cards"
          notes="Three peers with a hover-lift. Thumbnail → category tag → title → excerpt → Read More. Predictable grid that scales to a full blog index."
          tags={['equal grid', 'hover lift', 'category tag']}>
          <Pad x={64} y={48} style={{ display: 'flex', flexDirection: 'column', gap: 30, height: '100%' }}>
            <BlogHead />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, flex: 1 }}>
              {BLOGS.map(([c, t], i) => <BlogCard key={i} cat={c} title={t} />)}
            </div>
          </Pad>
        </WF>
      </DCArtboard>

      <DCArtboard id="blog-b" label="B · Featured + 2 stacked" width={1180} height={700}>
        <WF title="Editorial — lead story + list"
          notes="One hero article earns a large image & longer excerpt; two run as a compact stacked list. Signals an editorial point of view, not just a feed."
          tags={['lead story', 'stacked list', 'editorial']} stageClass="on-grey">
          <Pad x={64} y={48} style={{ display: 'flex', flexDirection: 'column', gap: 30, height: '100%' }}>
            <BlogHead />
            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24, flex: 1 }}>
              <BlogCard cat={BLOGS[0][0]} title={BLOGS[0][1]} thumbH={240} big />
              <Col gap={20}>
                {BLOGS.slice(1).map(([c, t], i) => (
                  <div key={i} className="wf-card" style={{ display: 'flex', gap: 16, padding: 16, flex: 1 }}>
                    <Img w={140} h="100%" label={'thumb'} style={{ minHeight: 110, flex: '0 0 auto' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
                      <Chip teal style={{ alignSelf: 'flex-start', height: 24, fontSize: 11 }}>{c}</Chip>
                      <h4 className="wf-h" style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.2 }}>{t}</h4>
                      <span style={{ marginTop: 'auto', color: 'var(--wf-teal-deep)', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13 }}>Read More →</span>
                    </div>
                  </div>
                ))}
              </Col>
            </div>
          </Pad>
        </WF>
      </DCArtboard>
    </>
  );
}

/* ---------- Testimonials ---------- */
function ReviewCard({ lines = 3, style = {} }) {
  return (
    <div className="wf-card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14, ...style }}>
      <Row justify="space-between"><GMark size={20} /><Stars size={13} /></Row>
      <Lines n={lines} w={['100%', '96%', '88%', '60%']} h={9} gap={9} />
      <Row gap={11} style={{ marginTop: 'auto', paddingTop: 6 }}>
        <Avatar size={40} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><Bar w={90} h={9} strong /><Bar w={120} h={7} /></div>
      </Row>
    </div>
  );
}
function TestiHead({ center }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: center ? 'center' : 'flex-start', textAlign: center ? 'center' : 'left' }}>
      <Eyebrow>Testimonials</Eyebrow>
      <H size={34}>Loved by print businesses</H>
    </div>
  );
}

function Testimonials() {
  return (
    <>
      <DCArtboard id="testi-masonry" label="A · Masonry grid" width={1180} height={750}>
        <WF title="Masonry wall"
          notes="Varied card heights create an organic, abundant 'lots of happy customers' feel. Mixes Google reviews and longer client quotes in one flow."
          tags={['masonry', 'varied length', 'social proof']}>
          <Pad x={64} y={48} style={{ display: 'flex', flexDirection: 'column', gap: 28, height: '100%' }}>
            <TestiHead center />
            <div style={{ columns: 3, columnGap: 22, flex: 1 }}>
              {[4, 2, 5, 3, 2, 4].map((l, i) => (
                <div key={i} style={{ breakInside: 'avoid', marginBottom: 22 }}><ReviewCard lines={l} /></div>
              ))}
            </div>
          </Pad>
        </WF>
      </DCArtboard>

      <DCArtboard id="testi-carousel" label="B · Spotlight carousel" width={1180} height={620}>
        <WF title="Single spotlight quote"
          notes="One large quote at a time for maximum weight; an avatar rail + arrows let visitors browse. Best for a few flagship logo customers."
          tags={['spotlight', 'avatar rail', 'flagship logos']} stageClass="on-navy">
          <Pad x={64} y={48} style={{ display: 'flex', flexDirection: 'column', gap: 28, height: '100%', alignItems: 'center', textAlign: 'center' }}>
            <Stars size={20} />
            <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
              <Lines n={3} w={['100%', '94%', '72%']} h={14} gap={12} style={{ alignItems: 'center' }} />
            </div>
            <Row gap={12}><Avatar size={48} /><div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 6 }}><Bar w={110} h={10} strong /><Bar w={150} h={8} /></div></Row>
            <Row gap={10} style={{ marginTop: 'auto' }}>
              <span style={{ width: 42, height: 42, borderRadius: '50%', border: '1px solid var(--wf-line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</span>
              {[0, 1, 2, 3].map((i) => <Avatar key={i} size={i === 1 ? 40 : 32} style={{ opacity: i === 1 ? 1 : .5 }} />)}
              <span style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--wf-teal)', color: 'var(--wf-on-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</span>
            </Row>
          </Pad>
        </WF>
      </DCArtboard>

      <DCArtboard id="testi-wall" label="C · Enterprise review wall" width={1180} height={720}>
        <WF title="Aggregate header + uniform wall"
          notes="Leads with the aggregate Google score as a hero stat to establish credibility, then a uniform grid of reviews. The most 'enterprise trust' reading."
          tags={['aggregate score', 'uniform grid', 'enterprise']} stageClass="on-grey">
          <Pad x={64} y={48} style={{ display: 'flex', flexDirection: 'column', gap: 28, height: '100%' }}>
            <Row justify="space-between" align="center">
              <TestiHead />
              <div className="wf-card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 16 }}>
                <GMark size={34} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Row gap={9}><span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 26, color: 'var(--wf-ink)' }}>4.8</span><Stars size={15} /></Row>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--wf-ink-2)' }}>BASED ON 320+ GOOGLE REVIEWS</span>
                </div>
              </div>
            </Row>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: '1fr 1fr', gap: 20, flex: 1 }}>
              {[3, 3, 3, 3, 3, 3].map((l, i) => <ReviewCard key={i} lines={l} />)}
            </div>
          </Pad>
        </WF>
      </DCArtboard>
    </>
  );
}

Object.assign(window, { HowItWorks, Blogs, Testimonials, ReviewCard, BlogCard, StepNode });
