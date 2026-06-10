"use client";

import { useState, useRef, useEffect } from "react";
import { useFormValue, useClient } from "sanity";
import type { ReactElement } from "react";
import {
  DOC_ID_TO_URL,
  DOC_ID_TO_EMOJI,
  DOC_ID_TO_LABEL,
} from "../lib/docRoutes";

/**
 * Unified document header banner — replaces Sanity's default doc header.
 *
 * Renders ONCE at the top of the document form (above the tabs) via
 * `form.components.input` wrapping in sanity.config.ts.
 *
 * Absorbs every default-header feature into one branded card:
 *   • Emoji icon + page name (cascade: pageLabel → seo.title → hero.heading)
 *   • Subtitle ("Landing Page")
 *   • Draft / Published status pill
 *   • URL slug + last-edited time
 *   • Share button (copies live URL to clipboard)
 *   • Actions menu (Publish / Unpublish / Duplicate / Delete)
 *   • Open Live ↗ deep link
 *   • Maximize toggle (full-screens the editor)
 *
 * Uses plain HTML + scoped CSS — no @sanity/ui dependency.
 */

interface DocShape {
  _id?: string;
  _type?: string;
  _updatedAt?: string;
  pageLabel?: string;
  seo?:  { title?: string };
  hero?: { heading?: string };
}

// ── Relative-time formatter (e.g. "5m ago", "2h ago", "3d ago") ───────────────
function formatRelative(iso?: string): string {
  if (!iso) return "Not yet saved";
  const updated = new Date(iso).getTime();
  if (Number.isNaN(updated)) return "Unknown";
  const diff = Date.now() - updated;
  const min  = Math.floor(diff / 60_000);
  const hr   = Math.floor(diff / 3_600_000);
  const day  = Math.floor(diff / 86_400_000);
  if (min < 1)   return "just now";
  if (min < 60)  return `${min}m ago`;
  if (hr  < 24)  return `${hr}h ago`;
  if (day < 7)   return `${day}d ago`;
  return new Date(iso).toLocaleDateString();
}

// ── Scoped CSS (injected once via <style>) ────────────────────────────────────
const CSS = `
.phf-card {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 14px 18px;
  margin: 0 0 14px;
  border-radius: 10px;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 1px solid rgba(99, 102, 241, 0.28);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  min-width: 0;
  position: relative;
}
.phf-left {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}
.phf-emoji {
  font-size: 32px;
  line-height: 1;
  flex: 0 0 auto;
}
.phf-info {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.phf-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.phf-title {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
.phf-pill {
  flex: 0 0 auto;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2px;
  white-space: nowrap;
}
.phf-pill-draft {
  background: rgba(245, 158, 11, 0.14);
  color: #fbbf24;
  border: 1px solid #f59e0b;
}
.phf-pill-published {
  background: rgba(16, 185, 129, 0.14);
  color: #34d399;
  border: 1px solid #10b981;
}
.phf-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 12px;
  color: #94a3b8;
  min-width: 0;
}
.phf-subtype {
  color: #64748b;
  font-weight: 500;
}
.phf-url {
  font-family: ui-monospace, Menlo, Consolas, monospace;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
.phf-dot {
  color: #475569;
}

/* ── Right-side button cluster ──────────────────────────────────────────── */
.phf-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
}
.phf-iconbtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #cbd5e1;
  font-size: 14px;
  cursor: pointer;
  transition: background 120ms ease, color 120ms ease, border-color 120ms ease;
  padding: 0;
  text-decoration: none;
}
.phf-iconbtn:hover {
  background: rgba(99, 102, 241, 0.14);
  color: #ffffff;
  border-color: rgba(99, 102, 241, 0.4);
}
.phf-iconbtn:active {
  transform: scale(0.97);
}
.phf-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  border-radius: 8px;
  background: linear-gradient(135deg, #0066FF 0%, #0052CC 100%);
  color: #ffffff;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.2px;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 1px 4px rgba(0, 102, 255, 0.4);
  transition: transform 120ms ease, box-shadow 120ms ease;
  border: none;
  cursor: pointer;
}
.phf-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 102, 255, 0.5);
}
.phf-cta:active {
  transform: translateY(0);
}

/* ── Actions dropdown menu ──────────────────────────────────────────────── */
.phf-menu-wrap {
  position: relative;
}
.phf-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 180px;
  background: #0f172a;
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
  padding: 6px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.phf-menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 5px;
  background: transparent;
  border: none;
  color: #cbd5e1;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  width: 100%;
}
.phf-menu-item:hover {
  background: rgba(99, 102, 241, 0.18);
  color: #ffffff;
}
.phf-menu-item:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.phf-menu-item-danger {
  color: #fca5a5;
}
.phf-menu-item-danger:hover {
  background: rgba(239, 68, 68, 0.16);
  color: #fecaca;
}
.phf-menu-sep {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 4px 2px;
}

/* ── Toast notification (Share copy confirmation) ───────────────────────── */
.phf-toast {
  position: absolute;
  top: -36px;
  right: 18px;
  padding: 6px 12px;
  background: #10b981;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
  animation: phf-fade 1.6s ease forwards;
  pointer-events: none;
}
@keyframes phf-fade {
  0%   { opacity: 0; transform: translateY(4px); }
  15%  { opacity: 1; transform: translateY(0); }
  85%  { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-4px); }
}

/* ── Fullscreen mode is now handled by the native Fullscreen API in JS ──
   so no CSS rules are needed here. The browser handles hiding the toolbar
   automatically. ESC key exits fullscreen. */

/* ── Mobile / narrow widths ─────────────────────────────────────────────── */
@media (max-width: 700px) {
  .phf-card {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 12px 14px;
  }
  .phf-emoji {
    font-size: 26px;
  }
  .phf-title {
    font-size: 15px;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .phf-actions {
    width: 100%;
    justify-content: flex-end;
    flex-wrap: wrap;
  }
  .phf-cta {
    flex: 1 1 auto;
  }
  .phf-meta {
    font-size: 11px;
  }
}
`;

// ── Icon SVG helpers ──────────────────────────────────────────────────────────
const Icon = {
  share: (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8l3-3 3 3" />
      <path d="M8 5v8" />
      <path d="M3 11v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2" />
    </svg>
  ),
  expand: (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6V3h3" />
      <path d="M13 6V3h-3" />
      <path d="M3 10v3h3" />
      <path d="M13 10v3h-3" />
    </svg>
  ),
  dots: (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
      <circle cx="3" cy="8" r="1.4" />
      <circle cx="8" cy="8" r="1.4" />
      <circle cx="13" cy="8" r="1.4" />
    </svg>
  ),
};

export default function PageHeaderField(): ReactElement | null {
  const doc = useFormValue([]) as DocShape | undefined;
  const client = useClient({ apiVersion: "2024-10-01" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast,    setToast]    = useState<string | null>(null);
  const [busy,     setBusy]     = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // ── Close menu on outside-click ─────────────────────────────────────────
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  // ── Auto-dismiss toast ──────────────────────────────────────────────────
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(t);
  }, [toast]);

  if (!doc) return null;

  const rawId      = doc._id || "";
  const docId      = rawId.replace(/^drafts\./, "");
  const isDraft    = rawId.startsWith("drafts.");
  const pageLabel  =
    doc.pageLabel ||
    doc.seo?.title ||
    doc.hero?.heading ||
    DOC_ID_TO_LABEL[docId] ||
    "Untitled Landing Page";
  const urlPath    = DOC_ID_TO_URL[docId]   ?? "/";
  const emoji      = DOC_ID_TO_EMOJI[docId] ?? "📄";
  const lastEdited = formatRelative(doc._updatedAt);
  const hasEditTime = Boolean(doc._updatedAt); // avoids "Edited Not yet saved" wording when nothing exists

  // ── Actions ────────────────────────────────────────────────────────────
  const handleShare = async () => {
    try {
      const liveUrl = `${window.location.origin}${urlPath}`;
      await navigator.clipboard.writeText(liveUrl);
      setToast("Link copied ✓");
    } catch {
      setToast("Copy failed");
    }
  };

  // Uses the browser's native Fullscreen API — no Sanity DOM hacks.
  // ESC key exits, works in every browser, immune to Sanity Studio version changes.
  const handleFullscreen = () => {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      document.documentElement.requestFullscreen().catch(() => {
        setToast("Fullscreen blocked by browser");
      });
    }
  };

  const handleDuplicate = async () => {
    if (!docId || busy) return;
    setBusy(true);
    setMenuOpen(false);
    try {
      const newId = `${docId}-copy-${Math.floor(Date.now() / 1000)}`;
      const source = await client.getDocument(docId);
      if (!source) throw new Error("Source doc not found");
      const { _id, _rev, _createdAt, _updatedAt, ...rest } = source;
      await client.create({ ...rest, _id: newId, _type: source._type });
      setToast("Duplicated ✓");
    } catch (e) {
      console.error(e);
      setToast("Duplicate failed");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!docId || busy) return;
    if (!window.confirm(`Delete "${pageLabel}"? This cannot be undone.`)) return;
    setBusy(true);
    setMenuOpen(false);
    try {
      await client.delete(docId);
      await client.delete(`drafts.${docId}`).catch(() => {});
      setToast("Deleted ✓");
    } catch (e) {
      console.error(e);
      setToast("Delete failed");
    } finally {
      setBusy(false);
    }
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(docId).then(() => setToast("Doc ID copied ✓"));
    setMenuOpen(false);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="phf-card">

        {toast && <div className="phf-toast">{toast}</div>}

        {/* ── Left column: emoji + name + subtitle + status + URL ──────── */}
        <div className="phf-left">
          <div className="phf-emoji" aria-hidden>
            {emoji}
          </div>

          <div className="phf-info">
            <div className="phf-title-row">
              <h2 className="phf-title" title={pageLabel}>
                {pageLabel}
              </h2>
              <span
                className={`phf-pill ${isDraft ? "phf-pill-draft" : "phf-pill-published"}`}
              >
                {isDraft ? "● Draft" : "● Published"}
              </span>
            </div>

            <div className="phf-meta">
              <span className="phf-subtype">Landing Page</span>
              <span className="phf-dot">·</span>
              <span className="phf-url">printai.com{urlPath}</span>
              {hasEditTime && (
                <>
                  <span className="phf-dot">·</span>
                  <span>Edited {lastEdited}</span>
                </>
              )}
              {!hasEditTime && (
                <>
                  <span className="phf-dot">·</span>
                  <span style={{ fontStyle: "italic", opacity: 0.7 }}>New — not yet saved</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── Right column: action cluster ─────────────────────────────── */}
        <div className="phf-actions">
          <button
            type="button"
            className="phf-iconbtn"
            title="Copy live URL"
            onClick={handleShare}
            aria-label="Share"
          >
            {Icon.share}
          </button>

          <button
            type="button"
            className="phf-iconbtn"
            title="Toggle full-screen editor"
            onClick={handleFullscreen}
            aria-label="Fullscreen"
          >
            {Icon.expand}
          </button>

          <div className="phf-menu-wrap" ref={menuRef}>
            <button
              type="button"
              className="phf-iconbtn"
              title="More actions"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="More actions"
              aria-expanded={menuOpen}
            >
              {Icon.dots}
            </button>

            {menuOpen && (
              <div className="phf-menu" role="menu">
                <button
                  type="button"
                  className="phf-menu-item"
                  onClick={handleDuplicate}
                  disabled={busy}
                >
                  📋  Duplicate page
                </button>
                <button
                  type="button"
                  className="phf-menu-item"
                  onClick={handleCopyId}
                >
                  #  Copy document ID
                </button>
                <div className="phf-menu-sep" />
                <button
                  type="button"
                  className="phf-menu-item phf-menu-item-danger"
                  onClick={handleDelete}
                  disabled={busy}
                >
                  🗑  Delete page
                </button>
              </div>
            )}
          </div>

          <a
            className="phf-cta"
            href={urlPath}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Live ↗
          </a>
        </div>
      </div>
    </>
  );
}
