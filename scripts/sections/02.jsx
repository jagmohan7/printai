// wf-kit.jsx — grey-box wireframe primitives for the PrintAI exploration.
// All components are exported to window at the bottom so the per-section
// babel scripts can use them as globals.

const px = (v) => (typeof v === 'number' ? v + 'px' : v);

/* generic placeholder block */
function Box({ w, h, r, cls = '', style = {}, children }) {
  return (
    <div className={'wf-box ' + cls} style={{
      width: px(w), height: px(h),
      ...(r != null ? { borderRadius: px(r) } : {}),
      ...style,
    }}>{children}</div>
  );
}

/* a single text-line bar */
function Bar({ w = '100%', h = 12, strong = false, style = {} }) {
  return <span className={'wf-bar' + (strong ? ' s' : '')} style={{ width: px(w), height: px(h), ...style }} />;
}

/* stack of bars = greeked paragraph */
function Lines({ n = 3, w = ['100%', '92%', '70%'], h = 11, gap = 9, style = {} }) {
  const widths = Array.isArray(w) ? w : Array(n).fill(w);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: px(gap), ...style }}>
      {Array.from({ length: n }).map((_, i) => (
        <Bar key={i} w={widths[i % widths.length]} h={h} />
      ))}
    </div>
  );
}

/* striped image placeholder with a mono caption */
function Img({ w = '100%', h = 160, r, label = 'image', cls = '', style = {}, children }) {
  return (
    <div className={'wf-img ' + cls} style={{
      width: px(w), height: px(h),
      ...(r != null ? { borderRadius: px(r) } : {}),
      ...style,
    }}>
      {children || <span style={{ whiteSpace: 'pre-line', opacity: .85 }}>{label}</span>}
    </div>
  );
}

function Avatar({ size = 44, style = {} }) {
  return <div className="wf-avatar" style={{ width: px(size), height: px(size), ...style }} />;
}

function Icon({ size = 48, style = {} }) {
  return <div className="wf-icon" style={{ width: px(size), height: px(size), ...style }} />;
}

function Btn({ children, kind = 'pri', size = '', w, style = {} }) {
  return (
    <span className={'wf-btn ' + kind + (size ? ' ' + size : '')}
      style={{ ...(w ? { width: px(w) } : {}), ...style }}>{children}</span>
  );
}

function Chip({ children, teal = false, style = {} }) {
  return <span className={'wf-chip' + (teal ? ' teal' : '')} style={style}>{children}</span>;
}

function H({ children, size = 40, style = {} }) {
  return <h2 className="wf-h" style={{ fontSize: px(size), ...style }}>{children}</h2>;
}
function Sub({ children, size = 16, w, style = {} }) {
  return <p className="wf-sub" style={{ fontSize: px(size), ...(w ? { maxWidth: px(w) } : {}), ...style }}>{children}</p>;
}
function Eyebrow({ children, style = {} }) {
  return <div className="wf-eyebrow" style={style}>{children}</div>;
}

/* numbered annotation pin, absolutely positioned by caller */
function Pin({ n, style = {} }) {
  return <span className="wf-pin" style={style}>{n}</span>;
}

/* PrintAI logo — horizontal | stacked | word-only */
function Logo({ variant = 'row', markSize = 34, wordSize = 19, style = {} }) {
  const mark = <span className="wf-logo-mark" style={{ width: px(markSize), height: px(markSize) }} />;
  const word = <span className="wf-logo-word" style={{ fontSize: px(wordSize) }}>Print<span className="ai">AI</span></span>;
  if (variant === 'word') return <span className="wf-logo" style={style}>{word}</span>;
  if (variant === 'stack')
    return (
      <span className="wf-logo" style={{ flexDirection: 'column', gap: 8, ...style }}>{mark}{word}</span>
    );
  return <span className="wf-logo" style={style}>{mark}{word}</span>;
}

/* simple padded container */
function Pad({ x = 64, y = 0, style = {}, children }) {
  return <div style={{ padding: `${px(y)} ${px(x)}`, ...style }}>{children}</div>;
}

/* flex row helper */
function Row({ gap = 16, align = 'center', justify = 'flex-start', wrap = false, style = {}, children }) {
  return (
    <div style={{
      display: 'flex', alignItems: align, justifyContent: justify, gap: px(gap),
      flexWrap: wrap ? 'wrap' : 'nowrap', ...style,
    }}>{children}</div>
  );
}

/* flex column helper */
function Col({ gap = 16, align = 'stretch', justify = 'flex-start', style = {}, children }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: align, justifyContent: justify, gap: px(gap), ...style,
    }}>{children}</div>
  );
}

/* the artboard shell: wireframe stage + annotation footer */
function WF({ title, notes, tags = [], stageClass = '', stageStyle = {}, children }) {
  return (
    <div className="wf-art">
      <div className={'wf-stage ' + stageClass} style={stageStyle}>{children}</div>
      <div className="wf-anno">
        <span className="wf-anno-title">{title}</span>
        <span className="wf-anno-notes">{notes}</span>
        {tags.length > 0 && (
          <span className="wf-anno-tags">{tags.map((t, i) => <span className="wf-tag" key={i}>{t}</span>)}</span>
        )}
      </div>
    </div>
  );
}

Object.assign(window, {
  px, Box, Bar, Lines, Img, Avatar, Icon, Btn, Chip, H, Sub, Eyebrow, Pin, Logo, Pad, Row, Col, WF,
});
