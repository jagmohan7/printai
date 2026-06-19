// s-cta-footer.jsx — 09 Contact CTA (3), 10 Footer (3)

const CTA_GRAD = { background: 'linear-gradient(115deg, #0B1628 0%, #15324C 52%, #0F6E56 100%)' };
const CTA_HEAD = 'Ready to Automate Your Print Business?';
const CTA_SUB = 'Book a personalized demo and see how PrintAI can transform your operations.';

function ContactCTA() {
  return (
    <>
      <DCArtboard id="cta-a" label="A · Centered gradient band" width={1180} height={420}>
        <WF title="Centered conversion band"
          notes="Single focal point: headline dead-center, dual CTA below. Navy→teal gradient signals 'end of page, take action'. Highest-clarity close."
          tags={['centered', 'navy→teal', 'dual CTA']} stageClass="on-navy" stageStyle={CTA_GRAD}>
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 22, padding: '0 80px' }}>
            <Eyebrow style={{ color: 'var(--wf-teal)' }}>Get Started</Eyebrow>
            <H size={42} style={{ maxWidth: 720 }}>{CTA_HEAD}</H>
            <Sub size={17} w={560} style={{ textAlign: 'center' }}>{CTA_SUB}</Sub>
            <Row gap={14} style={{ marginTop: 6 }}><Btn kind="pri" size="lg">Book Demo</Btn><Btn kind="ghost" size="lg">Contact Sales</Btn></Row>
            <Row gap={9} style={{ marginTop: 4 }}><Stars size={13} /><span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--wf-ink-2)' }}>4.8 · trusted by 250+ print companies</span></Row>
          </div>
        </WF>
      </DCArtboard>

      <DCArtboard id="cta-b" label="B · Split + inline demo form" width={1180} height={420}>
        <WF title="Copy left, form right"
          notes="Removes a click — the demo form is right there. Reduces drop-off vs. linking to a separate page; copy on the left keeps the pitch present while they type."
          tags={['inline form', 'fewer clicks', 'lead capture']} stageClass="on-navy" stageStyle={CTA_GRAD}>
          <Pad x={64} style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 0.9fr', gap: 56, alignItems: 'center' }}>
            <Col gap={20}>
              <H size={38} style={{ maxWidth: 460 }}>{CTA_HEAD}</H>
              <Sub size={16} w={420}>{CTA_SUB}</Sub>
              <Row gap={9}><Stars size={13} /><span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--wf-ink-2)' }}>250+ companies onboarded</span></Row>
            </Col>
            <div className="wf-card" style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--wf-ink)' }}>Book your demo</span>
              {['Full name', 'Work email', 'Company'].map((p, i) => (
                <div key={i} style={{ height: 44, borderRadius: 10, border: '1px solid var(--wf-line)', background: 'var(--wf-card)', display: 'flex', alignItems: 'center', padding: '0 14px' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: 'var(--wf-ink-2)' }}>{p}</span>
                </div>
              ))}
              <Btn kind="pri" style={{ width: '100%', marginTop: 4 }}>Book Demo</Btn>
            </div>
          </Pad>
        </WF>
      </DCArtboard>

      <DCArtboard id="cta-c" label="C · Gradient + product peek" width={1180} height={420}>
        <WF title="Copy left, product peek right"
          notes="Re-shows the product one last time as a confidence cue beside the CTA. The dashboard bleeds off the right edge to imply 'there's more inside'."
          tags={['product peek', 'edge bleed', 'confidence cue']} stageClass="on-navy" stageStyle={CTA_GRAD}>
          <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', overflow: 'hidden' }}>
            <Pad x={64}><Col gap={20}>
              <Eyebrow style={{ color: 'var(--wf-teal)' }}>Get Started</Eyebrow>
              <H size={38} style={{ maxWidth: 440 }}>{CTA_HEAD}</H>
              <Sub size={16} w={400}>{CTA_SUB}</Sub>
              <Row gap={14}><Btn kind="pri" size="lg">Book Demo</Btn><Btn kind="ghost" size="lg">Contact Sales</Btn></Row>
            </Col></Pad>
            <div style={{ position: 'relative', height: '100%' }}>
              <Img w={520} h={300} label={'PRODUCT DASHBOARD'} r={18} style={{ position: 'absolute', top: '50%', left: 40, transform: 'translateY(-50%)' }} />
              <MiniCard w={170} label="demo booked ✓" style={{ position: 'absolute', top: 40, left: 0 }} />
            </div>
          </div>
        </WF>
      </DCArtboard>
    </>
  );
}

/* ---------- Footer ---------- */
const FCOLS = [
  ['Company', ['About', 'Careers', 'Contact', 'Partners']],
  ['Products', ['AI Chatbot', 'Web-to-Print', 'Workflow Automation', 'Pricing']],
  ['Resources', ['Blog', 'Case Studies', 'FAQs', 'Help Center']],
];
function FCol({ title, links, onDark = true }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--wf-ink)' }}>{title}</span>
      {links.map((l, i) => (
        <span key={i} style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: 'var(--wf-ink-2)' }}>{l}</span>
      ))}
    </div>
  );
}
function Social() {
  return (
    <Row gap={10}>{[0, 1, 2, 3].map((i) => (
      <span key={i} style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid var(--wf-line)', background: 'var(--wf-card)' }} />
    ))}</Row>
  );
}
function ContactBlock() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9, fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: 'var(--wf-ink-2)', lineHeight: 1.4 }}>
      <span>500 Press Ave, Suite 200<br />San Francisco, CA 94107</span>
      <span>✆ +1 (415) 555-0140</span>
      <span>✉ hello@printai.com</span>
    </div>
  );
}
function LegalBar() {
  return (
    <Row justify="space-between" style={{ paddingTop: 22, borderTop: '1px solid var(--wf-line)' }}>
      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11.5, color: 'var(--wf-ink-2)' }}>© 2026 PrintAI, Inc.</span>
      <Row gap={22}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: 'var(--wf-ink-2)' }}>Privacy Policy</span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: 'var(--wf-ink-2)' }}>Terms</span>
      </Row>
    </Row>
  );
}

function Footer() {
  return (
    <>
      <DCArtboard id="foot-a" label="A · Brand + 4 columns + newsletter" width={1180} height={580}>
        <WF title="Classic SaaS footer"
          notes="Brand + value line + newsletter anchor the left; Company / Products / Resources / Contact columns to the right. Legal bar pinned to the bottom."
          tags={['4 columns', 'newsletter', 'social']} stageClass="on-navy">
          <Pad x={64} y={48} style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 32 }}>
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
        </WF>
      </DCArtboard>

      <DCArtboard id="foot-b" label="B · Mega footer + watermark" width={1180} height={480}>
        <WF title="Mega footer with CTA + watermark"
          notes="Merges a final mini-CTA with the footer and sets a giant low-contrast wordmark watermark for brand presence. For pages where the CTA section is light."
          tags={['mini-CTA', 'wordmark watermark', 'brand presence']} stageClass="on-navy">
          <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', bottom: -34, left: 40, fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 200, letterSpacing: '-0.04em', color: 'var(--wf-ink)', opacity: .05, lineHeight: 1 }}>PrintAI</span>
            <Pad x={64} y={44} style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', gap: 28 }}>
              <Row justify="space-between" align="center" style={{ paddingBottom: 28, borderBottom: '1px solid var(--wf-line)' }}>
                <H size={28} style={{ maxWidth: 420 }}>Automate your print business today.</H>
                <Row gap={12}><Btn kind="pri">Book Demo</Btn><Btn kind="ghost">Contact Sales</Btn></Row>
              </Row>
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(3,1fr)', gap: 36, flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}><Logo variant="row" /><ContactBlock /><Social /></div>
                {FCOLS.map(([t, l], i) => <FCol key={i} title={t} links={l} />)}
              </div>
              <LegalBar />
            </Pad>
          </div>
        </WF>
      </DCArtboard>

      <DCArtboard id="foot-c" label="C · Compact" width={1180} height={420}>
        <WF title="Compact two-row footer"
          notes="Minimal: brand + inline link row on top, legal + social below. For a focused single-product site that doesn't need deep navigation."
          tags={['compact', 'inline links', 'minimal']} stageClass="on-navy">
          <Pad x={64} y={44} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
            <Row justify="space-between" align="center" style={{ paddingBottom: 26, borderBottom: '1px solid var(--wf-line)' }}>
              <Logo variant="row" />
              <Row gap={26} wrap>
                {['About', 'Products', 'Services', 'Resources', 'Blog', 'Contact'].map((l, i) => (
                  <span key={i} style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: 'var(--wf-ink-2)' }}>{l}</span>
                ))}
              </Row>
              <Social />
            </Row>
            <Row justify="space-between">
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11.5, color: 'var(--wf-ink-2)' }}>© 2026 PrintAI, Inc. · hello@printai.com</span>
              <Row gap={22}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: 'var(--wf-ink-2)' }}>Privacy Policy</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: 'var(--wf-ink-2)' }}>Terms</span>
              </Row>
            </Row>
          </Pad>
        </WF>
      </DCArtboard>
    </>
  );
}

Object.assign(window, { ContactCTA, Footer, FCol, Social, ContactBlock, LegalBar });
