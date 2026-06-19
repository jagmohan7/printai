

/* ===================== FILE 01 (36fc632c-3838-4d32-b922-c44262ea8326) — 51755 chars ===================== */
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Exports (to window): DesignCanvas, DCSection, DCArtboard, DCPostIt.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>
//
// Artboards are static design frames, not scroll regions — never use
// height: 100% + overflow: auto/scroll on inner elements; size each artboard
// to fit its content (explicit pixel height, or let it grow).
/* END USAGE */

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = [
    '.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}',
    '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}',
    '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}',
    '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}',
    '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
    // isolation:isolate contains artboard content's z-indexes so a
    // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
    // the .dc-menu popover that drops into the top of the card.
    '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}',
    '.dc-card *{scrollbar-width:none}',
    '.dc-card *::-webkit-scrollbar{display:none}',
    // Per-artboard header: grip + label on the left, delete/expand on the
    // right. Single flex row; when the artboard's on-screen width is too
    // narrow for both the label yields (ellipsis, then hidden entirely below
    // ~4ch via the container query) and the buttons stay on the row.
    '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;',
    '  display:flex;align-items:center;container-type:inline-size}',
    '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}',
    '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}',
    '.dc-grip:hover{background:rgba(0,0,0,.08)}',
    '.dc-grip:active{cursor:grabbing}',
    '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;',
    '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
    // Below ~4ch of label room: hide the label entirely, and drop the grip to
    // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
    // until the card is moused.
    '@container (max-width: 110px){',
    '  .dc-labeltext{display:none}',
    '  .dc-grip{opacity:0}',
    '  [data-dc-slot]:hover .dc-grip{opacity:1}',
    '}',
    '.dc-labeltext:hover{background:rgba(0,0,0,.05)}',
    '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}',
    '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}',
    '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}',
    '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}',
    '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;',
    '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;',
    '  font:inherit;transition:background .12s,color .12s}',
    '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
    // Slot hosting an open menu floats above later siblings (which otherwise
    // paint on top — same z-index:auto, later DOM order) so the popup isn't
    // clipped by the next card.
    '[data-dc-slot]:has(.dc-menu){z-index:10}',
    '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;',
    '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}',
    '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;',
    '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;',
    '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}',
    '.dc-menu button:hover{background:rgba(0,0,0,.05)}',
    '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}',
    '.dc-menu .dc-danger{color:#c96442}',
    '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
    // Chrome (titles / labels / buttons) counter-scales against the viewport
    // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
    // DCViewport on every transform update and inherits to all descendants —
    // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
    // it the same way.
    //
    // The header uses transform:scale (out-of-flow, so layout impact doesn't
    // matter) with its world-space width set to card-width / inv-zoom so that
    // after counter-scaling its on-screen width exactly matches the card's —
    // that's what lets the container query + text-overflow behave against the
    // card's visible edge at every zoom level.
    //
    // The section head uses CSS zoom instead of transform so its layout box
    // grows with the counter-scale, pushing the card row down — otherwise the
    // constant-screen-size title would overflow into the (shrinking) world-
    // space gap and overlap the artboard headers at low zoom.
    '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));',
    '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}',
    '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}',
  ].join('\n');
  document.head.appendChild(s);
}

const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, (c) => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));
    else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';

function DesignCanvas({ children, minScale, maxScale, style }) {
  const [state, setState] = React.useState({ sections: {}, focus: null });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);

  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE)
      .then((r) => (r.ok ? r.json() : null))
      .then((saved) => {
        if (off || !saved || !saved.sections) return;
        skipNextWrite.current = true;
        setState((s) => ({ ...s, sections: saved.sections }));
      })
      .catch(() => {})
      .finally(() => { didRead.current = true; if (!off) setReady(true); });
    const t = setTimeout(() => { if (!off) setReady(true); }, 150);
    return () => { off = true; clearTimeout(t); };
  }, []);

  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) { skipNextWrite.current = false; return; }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({ sections: state.sections })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {};     // slotId -> { sectionId, artboard }
  const sectionMeta = {};  // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach((sec) => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach((ab) => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? (persisted.hidden || []) : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = { sectionId: sid, artboard: ab };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter((k) => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter((k) => !kept.includes(k))],
    };
  });

  const api = React.useMemo(() => ({
    state,
    section: (id) => state.sections[id] || {},
    patchSection: (id, p) => setState((s) => ({
      ...s,
      sections: { ...s.sections, [id]: { ...s.sections[id], ...(typeof p === 'function' ? p(s.sections[id] || {}) : p) } },
    })),
    setFocus: (slotId) => setState((s) => ({ ...s, focus: slotId })),
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') api.setFocus(null); };
    const onPd = (e) => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);

  return (
    <DCCtx.Provider value={api}>
      <DCViewport minScale={minScale} maxScale={maxScale} style={style}>{ready && children}</DCViewport>
      {state.focus && registry[state.focus] && (
        <DCFocusOverlay entry={registry[state.focus]} sectionMeta={sectionMeta} sectionOrder={sectionOrder} />
      )}
    </DCCtx.Provider>
  );
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({ children, minScale = 0.1, maxScale = 8, style = {} }) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({ x: 0, y: 0, scale: 1 });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);

  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const { x, y, scale } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({ type: '__dc_zoom', scale }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try { localStorage.setItem(tfKey, JSON.stringify(tf.current)); } catch {}
    }, 200);
  }, [tfKey]);

  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try { localStorage.setItem(tfKey, JSON.stringify(tf.current)); } catch {}
    };
    let restored = false;
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = { x: s.x, y: s.y, scale: Math.min(maxScale, Math.max(minScale, s.scale)) };
        apply();
        restored = true;
      }
    } catch {}
    // Visibility backstop (one-shot): a persisted pan is only meaningful
    // relative to content that may have changed since it was saved. If the
    // restored transform leaves every section/artboard off-screen, restoring
    // it faithfully just strands the user — reset to origin instead.
    // Content renders after the sidecar read settles, so poll briefly until
    // real boxes exist; any user input cancels (they may be mid-pan).
    let checks = 0;
    let checkT = 0;
    let sawInput = false;
    let hiddenStreak = 0;
    const onInput = () => { sawInput = true; };
    const cleanupCheck = () => {
      window.removeEventListener('wheel', onInput, true);
      window.removeEventListener('pointerdown', onInput, true);
    };
    const checkVisible = () => {
      const vp = vpRef.current, world = worldRef.current;
      checks += 1;
      if (!vp || !world || sawInput || checks > 10) { cleanupCheck(); return; }
      const vr = vp.getBoundingClientRect();
      let sized = 0, visible = false;
      // Slots plus section-head titles: the [data-dc-section] wrapper (and
      // .dc-sectionhead) are full-width blocks whose boxes can stay
      // on-screen while everything real is stranded; the inline-block title
      // is text-sized and covers sections whose artboards were all deleted.
      world.querySelectorAll('[data-dc-slot], .dc-sectionhead .dc-editable').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width <= 0 || r.height <= 0) return;
        sized += 1;
        if (r.right > vr.left && r.left < vr.right && r.bottom > vr.top && r.top < vr.bottom) visible = true;
      });
      if (visible) { cleanupCheck(); return; }
      if (sized === 0) { hiddenStreak = 0; checkT = setTimeout(checkVisible, 400); return; } // not rendered yet
      // Two consecutive hidden reads before resetting — the sidecar read can
      // reorder/hide sections after first paint, transiently moving every
      // box; a single sample must not discard a healthy deliberate pan.
      hiddenStreak += 1;
      if (hiddenStreak < 2) { checkT = setTimeout(checkVisible, 400); return; }
      tf.current = { x: 0, y: 0, scale: 1 };
      apply();
      cleanupCheck();
    };
    if (restored) {
      window.addEventListener('wheel', onInput, true);
      window.addEventListener('pointerdown', onInput, true);
      checkT = setTimeout(checkVisible, 250);
    }
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      clearTimeout(checkT);
      cleanupCheck();
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);

  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;

    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left, py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null, markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) { t.y -= drift; apply(); }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = (e) =>
      e.deltaMode !== 0 ||
      (e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40);

    const onWheel = (e) => {
      // A deck-stage nested on the canvas owns plain scrolling — its
      // thumbnail rail must stay natively scrollable, and panning a
      // full-viewport fixed deck only strands it. The shadow DOM retargets
      // rail events to the deck-stage host, so closest() sees it. ctrl/meta
      // pinch stays ours: unprevented it would browser-zoom the page.
      if (!(e.ctrlKey || e.metaKey) && e.target && e.target.closest && e.target.closest('deck-stage')) return;
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = (e) => { e.preventDefault(); isGesturing = true; gsBase = tf.current.scale; };
    const onGestureChange = (e) => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, (gsBase * e.scale) / tf.current.scale);
    };
    const onGestureEnd = (e) => { e.preventDefault(); isGesturing = false; };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = (e) => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || (e.button === 0 && onBg))) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = { id: e.pointerId, lx: e.clientX, ly: e.clientY };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX; drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = (e) => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({ type: '__dc_present' }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({ type: '__dc_present' }, '*');
    lastPostedScale.current = undefined;
    apply();

    vp.addEventListener('wheel', onWheel, { passive: false });
    vp.addEventListener('gesturestart', onGestureStart, { passive: false });
    vp.addEventListener('gesturechange', onGestureChange, { passive: false });
    vp.addEventListener('gestureend', onGestureEnd, { passive: false });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);

  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return (
    <div
      ref={vpRef}
      className="design-canvas"
      style={{
        height: '100vh', width: '100vw',
        background: DC.bg,
        overflow: 'hidden',
        overscrollBehavior: 'none',
        touchAction: 'none',
        position: 'relative',
        fontFamily: DC.font,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div
        ref={worldRef}
        style={{
          position: 'absolute', top: 0, left: 0,
          transformOrigin: '0 0',
          willChange: 'transform',
          width: 'max-content', minWidth: '100%',
          minHeight: '100%',
          padding: '60px 0 80px',
        }}
      >
        <div style={{ position: 'absolute', inset: -6000, backgroundImage: gridSvg, backgroundSize: '120px 120px', pointerEvents: 'none', zIndex: -1 }} />
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({ id, title, subtitle, children, gap = 48 }) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter((c) => c && c.type === DCArtboard);
  const rest = all.filter((c) => !(c && c.type === DCArtboard));
  const sec = (ctx && sid && ctx.section(sid)) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map((a) => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? (sec.hidden || []) : [];
  const srcOrder = allIds.filter((k) => !hidden.includes(k));

  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter((k) => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter((k) => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);

  const byId = Object.fromEntries(artboards.map((a) => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return (
    <div data-dc-section={sid}
      style={{ marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))', position: 'relative' }}>
      <div style={{ padding: '0 60px' }}>
        <div className="dc-sectionhead" style={{ paddingBottom: 36 }}>
          <DCEditable tag="div" value={sec.title ?? title}
            onChange={(v) => ctx && sid && ctx.patchSection(sid, { title: v })}
            style={{ fontSize: 28, fontWeight: 600, color: DC.title, letterSpacing: -0.4, marginBottom: 6, display: 'inline-block' }} />
          {subtitle && <div style={{ fontSize: 16, color: DC.subtitle }}>{subtitle}</div>}
        </div>
      </div>
      <div style={{ display: 'flex', gap, padding: '0 60px', alignItems: 'flex-start', width: 'max-content' }}>
        {order.map((k) => (
          <DCArtboardFrame key={k} sectionId={sid} artboard={byId[k]} order={order}
            label={(sec.labels || {})[k] ?? byId[k].props.label}
            onRename={(v) => ctx && ctx.patchSection(sid, (x) => ({ labels: { ...x.labels, [k]: v } }))}
            onReorder={(next) => ctx && ctx.patchSection(sid, { order: next })}
            onDelete={() => ctx && ctx.patchSection(sid, (x) => ({
              hidden: [...(x.srcKey === srcKey ? (x.hidden || []) : []), k],
              srcKey,
            }))}
            onFocus={() => ctx && ctx.setFocus(`${sid}/${k}`)} />
        ))}
      </div>
      {rest}
    </div>
  );
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() { return null; }

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try { await document.fonts.ready; } catch {}
  const toDataURL = (url) => fetch(url).then((r) => r.blob()).then((b) => new Promise((res) => {
    const fr = new FileReader(); fr.onload = () => res(fr.result); fr.onerror = () => res(url); fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [], pending = [], seen = new Set();
  const scrapeCss = (href) => {
    if (seen.has(href)) return; seen.add(href);
    pending.push(fetch(href).then((r) => r.text()).then((css) => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({ css: m, base: href });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g))
        scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({ css: r.cssText, base });
      else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try { walk(r.styleSheet.cssRules, ibase); } catch { scrapeCss(ibase); }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try { walk(ss.cssRules, base); } catch { if (ss.href) scrapeCss(ss.href); }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async (rule) => {
    let out = rule.css, m; const re = /url\((['"]?)([^'")]+)\1\)/g;
    while ((m = re.exec(rule.css))) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs; try { abs = new URL(m[2], rule.base).href; } catch { continue; }
      out = out.split(m[0]).join('url("' + await toDataURL(abs) + '")');
    }
    return out;
  }))).join('\n');

  const cloneStyled = (src) => {
    if (src.nodeType === 8 || (src.nodeType === 1 && src.tagName === 'SCRIPT')) return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src); let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try { const im = document.createElement('img'); im.src = src.toDataURL(); im.setAttribute('style', txt); return im; } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none'; clone.style.borderRadius = '0';

  const jobs = [];
  clone.querySelectorAll('img').forEach((el) => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then((d) => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach((el) => {
    const bg = el.style.backgroundImage; if (!bg) return;
    let m; const re = /url\(["']?([^"')]+)["']?\)/g;
    while ((m = re.exec(bg))) {
      const tok = m[0], url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then((d) => { el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")'); }));
    }
  });
  await Promise.all(jobs);

  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name + '.' + ext; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' +
      (fontCss ? '<style>' + fontCss + '</style>' : '') +
      '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], { type: 'text/html' }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px +
    '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' +
    (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res; img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px; cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob((blob) => save(blob, 'png'), 'image/png');
}

function DCArtboardFrame({ sectionId, artboard, label, order, onRename, onReorder, onFocus, onDelete }) {
  const { id: rawId, label: rawLabel, width = 260, height = 480, children, style = {} } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) { setConfirming(false); return; }
    const off = (e) => { if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);

  const doExport = (kind) => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind)
      .catch((e) => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = (e) => {
    e.preventDefault(); e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map((el) => ({ el, id: el.dataset.dcSlot, x: el.getBoundingClientRect().left }));
    const slotXs = homes.map((h) => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');

    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };

    const move = (ev) => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0, best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) { best = d; nearest = i; }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter((k) => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };

    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) { h.el.style.transition = 'none'; h.el.style.transform = ''; }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };

  return (
    <div ref={ref} data-dc-slot={id} style={{ position: 'relative', flexShrink: 0 }}>
      <div className="dc-header" data-omelette-chrome="" style={{ color: DC.label }} onPointerDown={(e) => e.stopPropagation()}>
        <div className="dc-labelrow">
          <div className="dc-grip" onPointerDown={onGripDown} title="Drag to reorder">
            <svg width="9" height="13" viewBox="0 0 9 13" fill="currentColor"><circle cx="2" cy="2" r="1.1"/><circle cx="7" cy="2" r="1.1"/><circle cx="2" cy="6.5" r="1.1"/><circle cx="7" cy="6.5" r="1.1"/><circle cx="2" cy="11" r="1.1"/><circle cx="7" cy="11" r="1.1"/></svg>
          </div>
          <div className="dc-labeltext" onClick={onFocus} title="Click to focus">
            <DCEditable value={label} onChange={onRename} onClick={(e) => e.stopPropagation()}
              style={{ fontSize: 15, fontWeight: 500, color: DC.label, lineHeight: 1 }} />
          </div>
        </div>
        <div className="dc-btns">
          <div ref={menuRef} style={{ position: 'relative' }}>
            <button className="dc-kebab" title="More" onClick={() => setMenuOpen((o) => !o)}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><circle cx="2.5" cy="6" r="1.1"/><circle cx="6" cy="6" r="1.1"/><circle cx="9.5" cy="6" r="1.1"/></svg>
            </button>
            {menuOpen && (
              <div className="dc-menu" onPointerDown={(e) => e.stopPropagation()}>
                <button onClick={() => doExport('png')}>Download PNG</button>
                <button onClick={() => doExport('html')}>Download HTML</button>
                <hr />
                <button className="dc-danger"
                  onClick={() => { if (confirming) { setMenuOpen(false); onDelete(); } else setConfirming(true); }}>
                  {confirming ? 'Click again to delete' : 'Delete'}
                </button>
              </div>
            )}
          </div>
          <button className="dc-expand" onClick={onFocus} title="Focus">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"/></svg>
          </button>
        </div>
      </div>
      <div ref={cardRef} className="dc-card"
        style={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)', overflow: 'hidden', width, height, background: '#fff', ...style }}>
        {children || <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: 13, fontFamily: DC.font }}>{id}</div>}
      </div>
    </div>
  );
}

// Inline rename — commits on blur or Enter.
function DCEditable({ value, onChange, style, tag = 'span', onClick }) {
  const T = tag;
  return (
    <T className="dc-editable" contentEditable suppressContentEditableWarning
      onClick={onClick}
      onPointerDown={(e) => e.stopPropagation()}
      onBlur={(e) => onChange && onChange(e.currentTarget.textContent)}
      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur(); } }}
      style={style}>{value}</T>
  );
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({ entry, sectionMeta, sectionOrder }) {
  const ctx = React.useContext(DCCtx);
  const { sectionId, artboard } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);

  const go = (d) => { const n = peers[(idx + d + peers.length) % peers.length]; if (n) ctx.setFocus(`${sectionId}/${n}`); };
  const goSection = (d) => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[(((secIdx + d * i) % n) + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) { ctx.setFocus(`${ns}/${first}`); return; }
    }
  };

  React.useEffect(() => {
    const k = (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); goSection(-1); }
      if (e.key === 'ArrowDown') { e.preventDefault(); goSection(1); }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });

  const { width = 260, height = 480, children } = artboard.props;
  const [vp, setVp] = React.useState({ w: window.innerWidth, h: window.innerHeight });
  React.useEffect(() => { const r = () => setVp({ w: window.innerWidth, h: window.innerHeight }); window.addEventListener('resize', r); return () => window.removeEventListener('resize', r); }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));

  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({ dir, onClick }) => (
    <button onClick={(e) => { e.stopPropagation(); onClick(); }}
      style={{ position: 'absolute', top: '50%', [dir]: 28, transform: 'translateY(-50%)',
        border: 'none', background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.9)',
        width: 44, height: 44, borderRadius: 22, fontSize: 18, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .15s' }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.18)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.08)')}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d={dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'} /></svg>
    </button>
  );

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(
    <div onClick={() => ctx.setFocus(null)}
      onWheel={(e) => e.preventDefault()}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(24,20,16,.6)', backdropFilter: 'blur(14px)',
        fontFamily: DC.font, color: '#fff' }}>

      {/* top bar: section dropdown (left) · close (right) */}
      <div onClick={(e) => e.stopPropagation()}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 72, display: 'flex', alignItems: 'flex-start', padding: '16px 20px 0', gap: 16 }}>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setDd((o) => !o)}
            style={{ border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', padding: '6px 8px',
              borderRadius: 6, textAlign: 'left', fontFamily: 'inherit' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.3 }}>{meta.title}</span>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" style={{ opacity: .7 }}><path d="M2 4l3.5 3.5L9 4"/></svg>
            </span>
            {meta.subtitle && <span style={{ display: 'block', fontSize: 13, opacity: .6, fontWeight: 400, marginTop: 2 }}>{meta.subtitle}</span>}
          </button>
          {ddOpen && (
            <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#2a251f', borderRadius: 8,
              boxShadow: '0 8px 32px rgba(0,0,0,.4)', padding: 4, minWidth: 200, zIndex: 10 }}>
              {sectionOrder.filter((sid) => sectionMeta[sid].slotIds.length).map((sid) => (
                <button key={sid} onClick={() => { setDd(false); const f = sectionMeta[sid].slotIds[0]; if (f) ctx.setFocus(`${sid}/${f}`); }}
                  style={{ display: 'block', width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer',
                    background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent', color: '#fff',
                    padding: '8px 12px', borderRadius: 5, fontSize: 14, fontWeight: sid === sectionId ? 600 : 400, fontFamily: 'inherit' }}>
                  {sectionMeta[sid].title}
                </button>
              ))}
            </div>
          )}
        </div>
        <div style={{ flex: 1 }} />
        <button onClick={() => ctx.setFocus(null)}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.12)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          style={{ border: 'none', background: 'transparent', color: 'rgba(255,255,255,.7)', width: 32, height: 32,
            borderRadius: 16, fontSize: 20, cursor: 'pointer', lineHeight: 1, transition: 'background .12s' }}>×</button>
      </div>

      {/* card centered, label + index below — only the card itself stops
          propagation so any backdrop click (including the margins around
          the card) exits focus */}
      <div
        style={{ position: 'absolute', top: 64, bottom: 56, left: 100, right: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div onClick={(e) => e.stopPropagation()} style={{ width: width * scale, height: height * scale, position: 'relative' }}>
          <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'top left', background: '#fff', borderRadius: 2, overflow: 'hidden',
            boxShadow: '0 20px 80px rgba(0,0,0,.4)' }}>
            {children || <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>{aid}</div>}
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation()} style={{ fontSize: 14, fontWeight: 500, opacity: .85, textAlign: 'center' }}>
          {(sec.labels || {})[aid] ?? artboard.props.label}
          <span style={{ opacity: .5, marginLeft: 10, fontVariantNumeric: 'tabular-nums' }}>{idx + 1} / {peers.length}</span>
        </div>
      </div>

      <Arrow dir="left" onClick={() => go(-1)} />
      <Arrow dir="right" onClick={() => go(1)} />

      {/* dots */}
      <div onClick={(e) => e.stopPropagation()}
        style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
        {peers.map((p, i) => (
          <button key={p} onClick={() => ctx.setFocus(`${sectionId}/${p}`)}
            style={{ border: 'none', padding: 0, cursor: 'pointer', width: 6, height: 6, borderRadius: 3,
              background: i === idx ? '#fff' : 'rgba(255,255,255,.3)' }} />
        ))}
      </div>
    </div>,
    document.body,
  );
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({ children, top, left, right, bottom, rotate = -2, width = 180 }) {
  return (
    <div style={{
      position: 'absolute', top, left, right, bottom, width,
      background: DC.postitBg, padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14, lineHeight: 1.4, color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5,
    }}>{children}</div>
  );
}

Object.assign(window, { DesignCanvas, DCSection, DCArtboard, DCPostIt });



/* ===================== FILE 02 (b27da37c-1372-400d-93ab-db02c51179dc) — 5051 chars ===================== */
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


/* ===================== FILE 03 (d30e8caf-f04c-4552-9824-cf73b3b56c55) — 8202 chars ===================== */
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


/* ===================== FILE 04 (6daf6b00-8527-4e2c-8edd-642f68b125e7) — 16578 chars ===================== */
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


/* ===================== FILE 05 (19462fe5-e173-4f76-9570-5da3d75aa761) — 14107 chars ===================== */
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


/* ===================== FILE 06 (24109ad0-0fb7-4545-a88f-291c73bae813) — 15095 chars ===================== */
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


/* ===================== FILE 07 (7d5749e4-1392-46f1-8e84-3957fdeb515d) — 11206 chars ===================== */
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


/* ===================== FILE 08 (494aed42-0412-4ca8-b0d6-ce8a78a42773) — 8027 chars ===================== */
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


/* ===================== FILE 09 (dd2f55b8-2458-476e-8610-8d9c117cf684) — 12140 chars ===================== */
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


/* ===================== FILE 10 (804c39f9-8c6b-4be2-9fc1-0777f950dced) — 2586 chars ===================== */
// app.jsx — assembles the PrintAI wireframe exploration canvas.
// Section functions return fragments of <DCArtboard>; guarded so the file
// renders even while later sections are still being authored.

const seg = (fn) => (typeof fn === 'function' ? fn() : null);

function App() {
  return (
    <DesignCanvas>
      <DCSection id="foundations" title="00 · Foundations" subtitle="Logo, palette, type & how to read this doc">
        {seg(window.Foundations)}
      </DCSection>
      <DCSection id="navbar" title="01 · Navbar" subtitle="Sticky · transparent-over-hero → glass-on-scroll · in-nav dark toggle">
        {seg(window.Navbar)}
      </DCSection>
      <DCSection id="hero" title="02 · Hero" subtitle="Split · centered · bento · dark — each carries the Google trust card">
        {seg(window.Hero)}
      </DCSection>
      <DCSection id="stats" title="03 · Performance Statistics" subtitle="Thin navy band · animated counters · teal numerals">
        {seg(window.Stats)}
      </DCSection>
      <DCSection id="about" title="04 · About PrintAI" subtitle="Company story · image + checklist · trust">
        {seg(window.About)}
      </DCSection>
      <DCSection id="solutions" title="05 · Our Solutions" subtitle="Chatbot · Web-to-Print · Workflow — 3-card / carousel / bento">
        {seg(window.Solutions)}
      </DCSection>
      <DCSection id="how" title="06 · How It Works" subtitle="Connect → Configure → Automate → Scale">
        {seg(window.HowItWorks)}
      </DCSection>
      <DCSection id="blogs" title="07 · Blogs" subtitle="Featured resource cards · category · excerpt">
        {seg(window.Blogs)}
      </DCSection>
      <DCSection id="testimonials" title="08 · Testimonials" subtitle="Google reviews · ratings — masonry / carousel / wall">
        {seg(window.Testimonials)}
      </DCSection>
      <DCSection id="cta" title="09 · Contact CTA" subtitle="Conversion section · navy→teal gradient · dual CTA">
        {seg(window.ContactCTA)}
      </DCSection>
      <DCSection id="footer" title="10 · Footer" subtitle="Multi-column · contact · social · legal">
        {seg(window.Footer)}
      </DCSection>
      <DCSection id="responsive" title="Responsive" subtitle="Tablet (768) + mobile (390) for the priority sections">
        {seg(window.Responsive)}
      </DCSection>
      <DCSection id="home" title="Recommended Homepage" subtitle="Strongest concepts composed into one full-page stack">
        {seg(window.Homepage)}
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
