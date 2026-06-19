// s-foundations.jsx — 00 · Foundations
// Logo concepts, palette, type scale, and the "how to read this" legend.

function Foundations() {
  const Swatch = ({ c, name, hex, on = '#fff' }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ height: 64, borderRadius: 12, background: c, border: '1px solid var(--wf-line)',
        display: 'flex', alignItems: 'flex-end', padding: 9 }}>
        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5, color: on }}>{hex}</span>
      </div>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, fontWeight: 600, color: 'var(--wf-ink)' }}>{name}</span>
    </div>
  );

  const Type = ({ s, w, label, children }) => (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--wf-ink-2)', width: 86, flex: '0 0 auto' }}>{label}</span>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: s, fontWeight: w, letterSpacing: '-0.02em', color: 'var(--wf-ink)', lineHeight: 1.1 }}>{children}</span>
    </div>
  );

  const LegendItem = ({ children, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 130, flex: '0 0 auto', display: 'flex', alignItems: 'center' }}>{children}</div>
      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11.5, color: 'var(--wf-ink-2)' }}>{label}</span>
    </div>
  );

  return (
    <>
      <DCArtboard id="f-logo" label="Logo · wordmark + mark" width={560} height={580}>
        <WF title="Logo direction" notes="Geometric 'sheet' mark + Inter 800 wordmark. AI set in teal to brand the intelligence layer." tags={['wordmark', 'mark', '3 lockups']}>
          <Pad x={40} y={40} style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <Logo variant="row" markSize={40} wordSize={24} />
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--wf-ink-2)' }}>A · horizontal lockup — navbar default</span>
            </div>
            <div style={{ height: 1, background: 'var(--wf-line)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <Logo variant="stack" markSize={44} wordSize={20} />
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--wf-ink-2)' }}>B · stacked — footer / app icon</span>
            </div>
            <div style={{ height: 1, background: 'var(--wf-line)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <Logo variant="word" wordSize={26} />
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--wf-ink-2)' }}>C · wordmark only — dense UI</span>
            </div>
          </Pad>
        </WF>
      </DCArtboard>

      <DCArtboard id="f-palette" label="Palette" width={560} height={580}>
        <WF title="Color system" notes="Navy carries trust + depth; teal is the single action accent. Greys do the heavy structural lifting." tags={['navy', 'teal accent', 'neutral greys']}>
          <Pad x={40} y={40}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
              <Swatch c="#0B1628" name="Deep Navy" hex="#0B1628" />
              <Swatch c="#1A3C5E" name="Navy" hex="#1A3C5E" />
              <Swatch c="#0F6E56" name="Brand Teal" hex="#0F6E56" />
              <Swatch c="#13C07A" name="Bright Teal" hex="#13C07A" on="#062A1E" />
              <Swatch c="#F5F6F8" name="Light Grey" hex="#F5F6F8" on="#5A6675" />
              <Swatch c="#FFFFFF" name="White" hex="#FFFFFF" on="#5A6675" />
            </div>
            <div style={{ marginTop: 22, paddingTop: 16, borderTop: '1px dashed var(--wf-anno-line)',
              fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--wf-ink-2)', lineHeight: 1.6 }}>
              usage ratio ≈ 70% neutral · 22% navy · 8% teal.<br />teal reserved for primary CTAs, key metrics &amp; active states only.
            </div>
          </Pad>
        </WF>
      </DCArtboard>

      <DCArtboard id="f-type" label="Type scale" width={560} height={580}>
        <WF title="Typography — Inter" notes="One family, weight + size carry hierarchy. Mono (IBM Plex) used only for labels & this annotation layer." tags={['Inter', 'tight tracking', 'mono labels']}>
          <Pad x={40} y={38} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Type label="display / 800" s={40} w={800}>Powered by AI</Type>
            <Type label="h2 / 800" s={30} w={800}>Section headline</Type>
            <Type label="h3 / 700" s={21} w={700}>Card title</Type>
            <Type label="body / 400" s={16} w={400}>Body copy, 1.5 line-height</Type>
            <Type label="small / 500" s={13} w={500}>Meta &amp; captions</Type>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--wf-ink-2)', width: 86, flex: '0 0 auto' }}>eyebrow</span>
              <Eyebrow>AI for Print Businesses</Eyebrow>
            </div>
          </Pad>
        </WF>
      </DCArtboard>

      <DCArtboard id="f-legend" label="How to read this doc" width={720} height={580}>
        <WF title="Wireframe legend" notes="Mid-fi grey-box language. Colour is intentionally scarce so layout & hierarchy read first." tags={['mid-fi', 'desktop-first', 'toggle dark ↗']}>
          <Pad x={40} y={36} style={{ display: 'flex', gap: 40 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Eyebrow>Grey-box language</Eyebrow>
              <LegendItem label="heading / text"><div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 110 }}><Bar w={80} h={13} strong /><Bar w={110} h={9} /></div></LegendItem>
              <LegendItem label="image / media"><Img w={110} h={42} label="" /></LegendItem>
              <LegendItem label="feature icon"><Icon size={40} /></LegendItem>
              <LegendItem label="avatar"><Avatar size={40} /></LegendItem>
              <LegendItem label="primary = teal · ghost"><div style={{ display: 'flex', gap: 8 }}><Btn size="sm">CTA</Btn><Btn kind="ghost" size="sm">Alt</Btn></div></LegendItem>
            </div>
            <div style={{ width: 1, background: 'var(--wf-line)' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Eyebrow>Annotation layer</Eyebrow>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="wf-anno-title" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>Title</span>
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--wf-ink-2)' }}>= concept name</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="wf-tag">tag</span>
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--wf-ink-2)' }}>= key decision keyword</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ position: 'relative', width: 24, height: 24 }}><Pin n="1" style={{ position: 'static' }} /></span>
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--wf-ink-2)' }}>= numbered callout on canvas</span>
              </div>
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--wf-ink-2)', lineHeight: 1.6, marginTop: 4 }}>
                Footer note under each frame explains<br />hierarchy + layout + UX reasoning.<br />Variants sit side-by-side — drag to<br />reorder, click ⤢ to focus one.
              </div>
            </div>
          </Pad>
        </WF>
      </DCArtboard>
    </>
  );
}

window.Foundations = Foundations;
