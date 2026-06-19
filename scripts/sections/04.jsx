// s-nav-hero.jsx — 01 · Navbar (3) and 02 · Hero (4). Priority sections.

const NAV_ITEMS = ['Home', 'About', 'Products  ▾', 'Services', 'Resources  ▾'];

function NavLinks({ gap = 30, size = 14.5, active = 0 }) {
  return (
    <div style={{ display: 'flex', gap, alignItems: 'center' }}>
      {NAV_ITEMS.map((t, i) => (
        <span key={i} style={{
          fontFamily: 'Inter, sans-serif', fontSize: size,
          fontWeight: i === active ? 600 : 500,
          color: i === active ? 'var(--wf-ink)' : 'var(--wf-ink-2)',
          whiteSpace: 'nowrap',
        }}>{t}</span>
      ))}
    </div>
  );
}

/* tiny in-nav theme toggle control */
function NavThemeToggle() {
  return (
    <span className="wf-chip" style={{ height: 36, gap: 8, paddingRight: 5 }}>
      <span style={{ fontSize: 12.5 }}>◐</span>
      <span style={{ width: 30, height: 18, borderRadius: 999, background: 'var(--wf-box-2)', position: 'relative' }}>
        <span style={{ position: 'absolute', top: 2, left: 2, width: 14, height: 14, borderRadius: '50%', background: 'var(--wf-bar-2)' }} />
      </span>
    </span>
  );
}

/* floating dropdown card */
function Dropdown({ items, style = {} }) {
  return (
    <div className="wf-card" style={{ padding: 12, width: 320, boxShadow: 'var(--wf-shadow)', ...style }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 10px', borderRadius: 10,
          background: i === 0 ? 'var(--wf-teal-soft)' : 'transparent' }}>
          <Icon size={38} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, fontWeight: 600, color: 'var(--wf-ink)' }}>{it}</span>
            <Bar w="80%" h={7} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Navbar() {
  return (
    <>
      {/* A — centered glass over hero */}
      <DCArtboard id="nav-a" label="A · Centered glass over hero" width={1180} height={440}>
        <WF title="Centered glass · transparent over hero"
          notes="Logo left · nav optically centered · dual CTA right. Bar is transparent over the dark hero, frosts to glass on scroll. Dropdowns drop as floating cards."
          tags={['transparent→glass', 'centered nav', 'dual CTA']} stageClass="on-navy">
          <div style={{ position: 'relative', height: '100%' }}>
            <Img w="44%" h={210} label={'HERO PRODUCT\nUI'} style={{ position: 'absolute', right: 40, top: 96, opacity: .5 }} />
            {/* bar */}
            <div style={{ position: 'absolute', top: 22, left: 40, right: 40, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Logo variant="row" />
              <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}><NavLinks /></div>
              <Row gap={12}>
                <NavThemeToggle />
                <Btn kind="ghost" size="sm">Contact</Btn>
                <Btn size="sm">Book Demo</Btn>
              </Row>
            </div>
            {/* open dropdown */}
            <Dropdown items={['AI Chatbot', 'Web-to-Print Platform']} style={{ position: 'absolute', top: 100, left: '50%', transform: 'translateX(-130px)' }} />
            <Pin n="1" style={{ top: 30, left: 24 }} />
            <Pin n="2" style={{ top: 150, left: '50%', marginLeft: -180 }} />
            <Pin n="3" style={{ top: 30, right: 24 }} />
          </div>
        </WF>
      </DCArtboard>

      {/* B — enterprise utility bar */}
      <DCArtboard id="nav-b" label="B · Enterprise utility bar" width={1180} height={440}>
        <WF title="Two-tier enterprise bar"
          notes="Thin utility strip (phone · email · theme toggle) over the main bar. Reads as established + reachable — the B2B trust signal. Glass + soft shadow when stuck."
          tags={['utility strip', 'glass-on-scroll', 'left-aligned nav']}>
          <div style={{ position: 'relative', height: '100%' }}>
            {/* utility strip */}
            <div style={{ height: 40, background: 'var(--wf-navy)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px' }}>
              <Row gap={20}>
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11.5, color: 'rgba(255,255,255,.66)' }}>✆ +1 (415) 555-0140</span>
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11.5, color: 'rgba(255,255,255,.66)' }}>✉ hello@printai.com</span>
              </Row>
              <Row gap={14}>
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11.5, color: 'rgba(255,255,255,.66)' }}>◐ Dark mode</span>
              </Row>
            </div>
            {/* main bar */}
            <div className="wf-card" style={{ borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none',
              height: 76, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', boxShadow: 'var(--wf-shadow-sm)' }}>
              <Row gap={40}><Logo variant="row" /><NavLinks gap={26} /></Row>
              <Row gap={12}>
                <Btn kind="ghost" size="sm">Contact</Btn>
                <Btn size="sm">Book Demo</Btn>
              </Row>
            </div>
            {/* page hint */}
            <Pad x={40} y={28}><Lines n={2} w={['38%', '30%']} h={14} gap={12} /></Pad>
            <Pin n="1" style={{ top: 9, right: 150 }} />
            <Pin n="2" style={{ top: 86, left: 24 }} />
          </div>
        </WF>
      </DCArtboard>

      {/* C — floating pill */}
      <DCArtboard id="nav-c" label="C · Floating pill" width={1180} height={440}>
        <WF title="Contained floating pill"
          notes="Nav lives in a rounded, shadowed pill detached from the edges — modern SaaS (Linear/Clay). Stays pinned with margin on scroll; reads light & premium."
          tags={['contained pill', 'sticky w/ margin', 'soft shadow']} stageClass="on-grey">
          <div style={{ position: 'relative', height: '100%' }}>
            <div className="wf-card" style={{ position: 'absolute', top: 24, left: 40, right: 40, height: 66, borderRadius: 999,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px 0 24px', boxShadow: 'var(--wf-shadow)' }}>
              <Logo variant="row" />
              <NavLinks gap={26} />
              <Row gap={10}>
                <NavThemeToggle />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: 'var(--wf-ink-2)' }}>Contact</span>
                <Btn size="sm">Book Demo</Btn>
              </Row>
            </div>
            <Pad x={40} style={{ paddingTop: 124 }}><Lines n={2} w={['34%', '26%']} h={14} gap={12} /></Pad>
            <Pin n="1" style={{ top: 16, left: 24 }} />
            <Pin n="2" style={{ top: 50, right: 22 }} />
          </div>
        </WF>
      </DCArtboard>
    </>
  );
}

/* ---------- Hero helpers ---------- */
function Stars({ size = 15, color = 'var(--wf-ink)' }) {
  return <span style={{ fontSize: size, color, letterSpacing: 2 }}>★★★★★</span>;
}
function GMark({ size = 22 }) {
  return <span style={{ width: size, height: size, borderRadius: '50%', border: '2px solid var(--wf-bar-2)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif',
    fontWeight: 800, fontSize: size * 0.62, color: 'var(--wf-ink-2)', flex: '0 0 auto' }}>G</span>;
}
function TrustCard({ style = {}, compact = false }) {
  return (
    <div className="wf-card" style={{ padding: compact ? 14 : 18, display: 'flex', alignItems: 'center', gap: 16, ...style }}>
      <GMark size={compact ? 24 : 30} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Row gap={9}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: compact ? 18 : 22, color: 'var(--wf-ink)' }}>4.8</span>
          <Stars size={compact ? 13 : 15} />
        </Row>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: 'var(--wf-ink-2)' }}>Trusted by 250+ Print Companies</span>
      </div>
    </div>
  );
}
/* floating product snippet card for hero imagery */
function MiniCard({ w, label, style = {} }) {
  return (
    <div className="wf-card" style={{ padding: 12, width: w, boxShadow: 'var(--wf-shadow)', ...style }}>
      <Row gap={9} style={{ marginBottom: 10 }}><Icon size={26} /><Bar w={60} h={8} strong /></Row>
      <Lines n={2} w={['100%', '64%']} h={7} gap={7} />
      {label && <div style={{ marginTop: 9, fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, color: 'var(--wf-ink-2)' }}>{label}</div>}
    </div>
  );
}

function Hero() {
  const HEAD = (size) => (<>Your Print Business.<br /><span className="teal">Powered by AI.</span></>);
  const SUBHEAD = 'Automate customer support, online ordering, quote generation and print workflows with one intelligent platform built exclusively for print businesses.';

  return (
    <>
      {/* 1 — classic split */}
      <DCArtboard id="hero-1" label="1 · Classic split + trust card" width={1180} height={780}>
        <WF title="Split hero — copy left, product right"
          notes="F-pattern: eyebrow → headline → subhead → CTAs → trust card descend the left rail. Product UI anchors the right with floating glass cards for depth."
          tags={['F-pattern', 'dual CTA', 'google trust card']}>
          <Pad x={64} y={56} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, height: '100%', alignItems: 'center' }}>
            <Col gap={24}>
              <Eyebrow>AI for Print Businesses</Eyebrow>
              <H size={52} style={{ lineHeight: 1.03 }}>{HEAD()}</H>
              <Sub size={17} w={440}>{SUBHEAD}</Sub>
              <Row gap={12}><Btn kind="pri" size="lg">Book a Demo</Btn><Btn kind="ghost" size="lg">View Case Studies</Btn></Row>
              <TrustCard style={{ width: 360, marginTop: 6 }} />
            </Col>
            <div style={{ position: 'relative', height: 440 }}>
              <Img w="100%" h="100%" label={'PRODUCT UI\norder dashboard · chatbot · storefront'} r={18} />
              <MiniCard w={170} label="AI chatbot" style={{ position: 'absolute', top: -16, left: -22 }} />
              <MiniCard w={190} label="order dashboard" style={{ position: 'absolute', bottom: -18, right: -20 }} />
            </div>
          </Pad>
        </WF>
      </DCArtboard>

      {/* 2 — centered + logo strip */}
      <DCArtboard id="hero-2" label="2 · Centered + product browser" width={1180} height={780}>
        <WF title="Centered hero — full-width product below"
          notes="Maximises headline impact; everything funnels to one CTA pair. A browser-framed dashboard sits full-width beneath, with a logo trust strip bridging copy and product."
          tags={['centered', 'browser frame', 'logo strip']} stageClass="on-grey">
          <Pad x={64} y={48} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%' }}>
            <Eyebrow>AI for Print Businesses</Eyebrow>
            <H size={50} style={{ margin: '16px 0', lineHeight: 1.04 }}>{HEAD()}</H>
            <Sub size={17} w={620} style={{ textAlign: 'center' }}>{SUBHEAD}</Sub>
            <Row gap={12} style={{ margin: '24px 0 16px' }}><Btn kind="pri" size="lg">Book a Demo</Btn><Btn kind="ghost" size="lg">View Case Studies</Btn></Row>
            <Row gap={28} style={{ marginBottom: 18 }}>
              <Row gap={9}><GMark size={20} /><span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, color: 'var(--wf-ink)' }}>4.8</span><Stars size={12} /></Row>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--wf-ink-2)' }}>250+ PRINT COMPANIES</span>
            </Row>
            {/* browser frame */}
            <div className="wf-card" style={{ width: '100%', flex: 1, padding: 0, overflow: 'hidden', boxShadow: 'var(--wf-shadow)' }}>
              <div style={{ height: 34, borderBottom: '1px solid var(--wf-line)', display: 'flex', alignItems: 'center', gap: 7, padding: '0 14px' }}>
                {[0, 1, 2].map((i) => <span key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--wf-box-2)' }} />)}
                <span style={{ marginLeft: 14, width: 200, height: 12, borderRadius: 6, background: 'var(--wf-box)' }} />
              </div>
              <div style={{ padding: 18 }}><Img w="100%" h={140} label={'WEB-TO-PRINT DASHBOARD'} /></div>
            </div>
          </Pad>
        </WF>
      </DCArtboard>

      {/* 3 — bento product */}
      <DCArtboard id="hero-3" label="3 · Copy + product bento" width={1180} height={780}>
        <WF title="Split hero — product bento right"
          notes="Right column shows the platform as a bento of live surfaces (chat, orders, storefront) instead of one flat shot — communicates breadth of product at a glance."
          tags={['bento', 'product breadth', 'glass cards']}>
          <Pad x={64} y={56} style={{ display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 44, height: '100%', alignItems: 'center' }}>
            <Col gap={22}>
              <Chip teal>◇ Built for print, not adapted</Chip>
              <H size={48} style={{ lineHeight: 1.04 }}>{HEAD()}</H>
              <Sub size={16} w={400}>{SUBHEAD}</Sub>
              <Row gap={12}><Btn kind="pri" size="lg">Book a Demo</Btn><Btn kind="ghost" size="lg">View Case Studies</Btn></Row>
              <Row gap={10} style={{ marginTop: 4 }}><GMark size={22} /><span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--wf-ink)' }}>4.8</span><Stars size={13} /><span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--wf-ink-2)' }}>· 250+ companies</span></Row>
            </Col>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto', gap: 16, height: 460 }}>
              <Img h="100%" label={'AI CHATBOT'} style={{ gridRow: '1 / span 2' }} />
              <MiniCard label="quote generated" style={{ height: 'auto' }} />
              <Img h={150} label={'ORDER LIST'} />
            </div>
          </Pad>
        </WF>
      </DCArtboard>

      {/* 4 — full navy */}
      <DCArtboard id="hero-4" label="4 · Full-bleed navy + stats" width={1180} height={780}>
        <WF title="Dark hero — premium, stats baked in"
          notes="Full-navy stage for maximum gravitas; integrates the performance stats as a bottom strip so the hero alone carries the proof. Strong contrast makes teal CTAs pop."
          tags={['dark hero', 'stats strip', 'high contrast']} stageClass="on-navy">
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Pad x={64} y={52} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 44, flex: 1, alignItems: 'center' }}>
              <Col gap={22}>
                <Eyebrow>AI for Print Businesses</Eyebrow>
                <H size={50} style={{ lineHeight: 1.03 }}>{HEAD()}</H>
                <Sub size={16} w={420}>{SUBHEAD}</Sub>
                <Row gap={12}><Btn kind="pri" size="lg">Book a Demo</Btn><Btn kind="ghost" size="lg">View Case Studies</Btn></Row>
              </Col>
              <div style={{ position: 'relative', height: 380 }}>
                <Img w="100%" h="100%" label={'PRODUCT UI\nglassmorphism · depth'} r={18} />
                <MiniCard w={180} label="live orders" style={{ position: 'absolute', bottom: 24, left: -24 }} />
              </div>
            </Pad>
            <div style={{ borderTop: '1px solid var(--wf-line)', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '20px 64px' }}>
              {[['85%', 'Faster processing'], ['300%', 'Revenue growth'], ['120K+', 'Annual savings'], ['24/7', 'AI support']].map(([n, l], i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 26, color: 'var(--wf-teal)' }}>{n}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: 'var(--wf-ink-2)' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </WF>
      </DCArtboard>
    </>
  );
}

Object.assign(window, { Navbar, Hero, TrustCard, Stars, GMark, MiniCard });
