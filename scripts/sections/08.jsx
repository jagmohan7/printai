// s-responsive-home.jsx — Responsive (tablet+mobile) and the composed Homepage.

function Hamburger() {
  return (
    <span style={{ display: 'flex', flexDirection: 'column', gap: 5, width: 24 }}>
      {[0, 1, 2].map((i) => <span key={i} style={{ height: 2.5, borderRadius: 2, background: 'var(--wf-ink)' }} />)}
    </span>
  );
}

function Responsive() {
  return (
    <>
      {/* tablet navbar */}
      <DCArtboard id="rsp-nav-tab" label="Navbar · tablet 768" width={768} height={280}>
        <WF title="Tablet nav — collapse to menu"
          notes="Below ~900px the 5-item nav + dropdowns won't fit honestly, so it collapses to a hamburger; the primary CTA stays visible."
          tags={['hamburger', 'CTA persists']}>
          <div style={{ position: 'relative', height: '100%' }}>
            <div className="wf-card" style={{ borderRadius: 0, border: 'none', borderBottom: '1px solid var(--wf-line)', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', boxShadow: 'var(--wf-shadow-sm)' }}>
              <Logo variant="row" />
              <Row gap={16}><Btn size="sm">Book Demo</Btn><Hamburger /></Row>
            </div>
            <Pad x={28} y={22}><Lines n={2} w={['44%', '34%']} h={13} gap={11} /></Pad>
          </div>
        </WF>
      </DCArtboard>

      {/* mobile navbar + drawer */}
      <DCArtboard id="rsp-nav-mob" label="Navbar · mobile 390" width={390} height={320}>
        <WF title="Mobile bar"
          notes="Logo + theme toggle + hamburger. 56px bar, 44px tap targets."
          tags={['56px bar', '44px targets']}>
          <div style={{ position: 'relative', height: '100%' }}>
            <div style={{ height: 60, borderBottom: '1px solid var(--wf-line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', background: 'var(--wf-card)' }}>
              <Logo variant="row" markSize={28} wordSize={16} />
              <Row gap={14}><span style={{ fontSize: 15 }}>◐</span><Hamburger /></Row>
            </div>
            <Pad x={18} y={18}><Lines n={2} w={['70%', '52%']} h={12} gap={10} /></Pad>
          </div>
        </WF>
      </DCArtboard>

      <DCArtboard id="rsp-menu-mob" label="Menu drawer · mobile 390" width={390} height={810}>
        <WF title="Full-screen menu"
          notes="Tapping the hamburger opens a full overlay: stacked links, expandable Products/Resources, theme toggle row, CTAs pinned to the bottom."
          tags={['full overlay', 'accordion', 'sticky CTAs']}>
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 18 }}>
            <Row justify="space-between" style={{ marginBottom: 22 }}><Logo variant="row" markSize={28} wordSize={16} /><span style={{ fontSize: 22, color: 'var(--wf-ink-2)' }}>×</span></Row>
            <Col gap={4} style={{ flex: 1 }}>
              {['Home', 'About', 'Products', 'AI Chatbot', 'Web-to-Print Platform', 'Services', 'Resources'].map((t, i) => {
                const sub = t === 'AI Chatbot' || t === 'Web-to-Print Platform';
                return (
                  <Row key={i} justify="space-between" style={{ padding: '14px 8px', paddingLeft: sub ? 24 : 8, borderBottom: '1px solid var(--wf-line)' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: sub ? 14.5 : 16, fontWeight: sub ? 400 : 600, color: sub ? 'var(--wf-ink-2)' : 'var(--wf-ink)' }}>{t}</span>
                    {(t === 'Products' || t === 'Resources') && <span style={{ color: 'var(--wf-ink-2)' }}>▾</span>}
                  </Row>
                );
              })}
            </Col>
            <Row justify="space-between" style={{ padding: '14px 8px' }}><span style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'var(--wf-ink)' }}>Dark mode</span>
              <span style={{ width: 44, height: 26, borderRadius: 999, background: 'var(--wf-box-2)', position: 'relative' }}><span style={{ position: 'absolute', top: 3, left: 3, width: 20, height: 20, borderRadius: '50%', background: 'var(--wf-bar-2)' }} /></span></Row>
            <Col gap={10} style={{ marginTop: 10 }}><Btn kind="pri" style={{ width: '100%' }}>Book Demo</Btn><Btn kind="ghost" style={{ width: '100%' }}>Contact</Btn></Col>
          </div>
        </WF>
      </DCArtboard>

      {/* tablet hero */}
      <DCArtboard id="rsp-hero-tab" label="Hero · tablet 768" width={768} height={730}>
        <WF title="Tablet hero — centered stack"
          notes="The split collapses to a centered stack: copy on top, product image full-width below. Keeps the trust card inline under the CTAs."
          tags={['centered stack', 'image below']} stageClass="on-grey">
          <Pad x={40} y={40} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 18, height: '100%' }}>
            <Eyebrow>AI for Print Businesses</Eyebrow>
            <H size={42} style={{ lineHeight: 1.05 }}>Your Print Business.<br /><span className="teal">Powered by AI.</span></H>
            <Sub size={16} w={520} style={{ textAlign: 'center' }}>Automate support, ordering, quotes and print workflows with one intelligent platform.</Sub>
            <Row gap={12}><Btn kind="pri" size="lg">Book a Demo</Btn><Btn kind="ghost" size="lg">Case Studies</Btn></Row>
            <TrustCard compact style={{ width: 320 }} />
            <Img w="100%" h={150} label={'PRODUCT UI'} r={16} style={{ marginTop: 'auto' }} />
          </Pad>
        </WF>
      </DCArtboard>

      {/* mobile hero */}
      <DCArtboard id="rsp-hero-mob" label="Hero · mobile 390" width={390} height={820}>
        <WF title="Mobile hero"
          notes="Single column; CTAs go full-width & stack (primary first). Trust card and product image follow. Headline scales to ~32px."
          tags={['1-col', 'full-width CTAs', 'primary first']}>
          <Pad x={20} y={28} style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
            <Eyebrow>AI for Print Businesses</Eyebrow>
            <H size={32} style={{ lineHeight: 1.06 }}>Your Print Business. <span className="teal">Powered by AI.</span></H>
            <Sub size={15}>Automate support, ordering, quotes and workflows — one platform built for print.</Sub>
            <Col gap={10}><Btn kind="pri" size="lg" style={{ width: '100%' }}>Book a Demo</Btn><Btn kind="ghost" size="lg" style={{ width: '100%' }}>View Case Studies</Btn></Col>
            <TrustCard compact />
            <Img w="100%" h={120} label={'PRODUCT UI'} r={14} style={{ marginTop: 'auto' }} />
          </Pad>
        </WF>
      </DCArtboard>

      {/* mobile CTA */}
      <DCArtboard id="rsp-cta-mob" label="Contact CTA · mobile 390" width={390} height={624}>
        <WF title="Mobile conversion band"
          notes="Centered gradient, full-width stacked buttons, trust line under. The close stays a single clear decision on small screens."
          tags={['gradient', 'stacked CTAs']} stageClass="on-navy" stageStyle={{ background: 'linear-gradient(160deg, #0B1628 0%, #15324C 55%, #0F6E56 100%)' }}>
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 18, padding: 24 }}>
            <Eyebrow style={{ color: 'var(--wf-teal)' }}>Get Started</Eyebrow>
            <H size={28}>Ready to Automate Your Print Business?</H>
            <Sub size={14.5} style={{ textAlign: 'center' }}>Book a personalized demo and see PrintAI in action.</Sub>
            <Col gap={10} style={{ width: '100%' }}><Btn kind="pri" size="lg" style={{ width: '100%' }}>Book Demo</Btn><Btn kind="ghost" size="lg" style={{ width: '100%' }}>Contact Sales</Btn></Col>
            <Row gap={8}><Stars size={12} /><span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5, color: 'var(--wf-ink-2)' }}>4.8 · 250+ companies</span></Row>
          </div>
        </WF>
      </DCArtboard>
    </>
  );
}

window.Responsive = Responsive;
