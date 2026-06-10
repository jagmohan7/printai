import type { LayoutProps } from "sanity";

export default function StudioLayout(props: LayoutProps) {
  const { renderDefault } = props;
  return (
    <>
      <style>{`
        /* ── Sidebar width ───────────────────────────────────────────────── */
        [data-testid="pane-group"] > [data-testid="pane"]:first-child {
          min-width: 220px !important;
          max-width: 260px !important;
          width: 240px !important;
        }

        /* ── Sticky tabs bar ─────────────────────────────────────────────── */
        [data-ui="TabList"] {
          position: sticky !important;
          top: 0 !important;
          z-index: 50 !important;
          background: #101112 !important;
          padding: 6px 0 8px !important;
          border-bottom: 1px solid rgba(255,255,255,0.06) !important;

          /* Force single line — scrolls horizontally on narrow widths      */
          flex-wrap: nowrap !important;
          overflow-x: auto !important;
          scrollbar-width: thin;
          gap: 4px !important;
        }
        [data-ui="TabList"]::-webkit-scrollbar {
          height: 4px;
        }
        [data-ui="TabList"]::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.4);
          border-radius: 2px;
        }

        /* ── Individual tab — tighter padding so all 7 fit on 1 line ────── */
        [data-ui="TabList"] > [data-ui="Tab"] {
          padding: 6px 10px !important;
          font-size: 12.5px !important;
          font-weight: 500 !important;
          letter-spacing: 0.1px !important;
          white-space: nowrap !important;
          border-radius: 6px !important;
          color: #94a3b8 !important;
          transition: color 100ms ease, background 100ms ease !important;
        }
        [data-ui="TabList"] > [data-ui="Tab"]:hover {
          color: #cbd5e1 !important;
          background: rgba(255, 255, 255, 0.04) !important;
        }

        /* ── Active tab — bold tech-blue with 2px underline ─────────────── */
        [data-ui="TabList"] > [data-ui="Tab"][aria-selected="true"],
        [data-ui="TabList"] > [data-ui="Tab"][data-selected="true"] {
          color: #ffffff !important;
          background: rgba(0, 102, 255, 0.12) !important;
          position: relative !important;
        }
        [data-ui="TabList"] > [data-ui="Tab"][aria-selected="true"]::after,
        [data-ui="TabList"] > [data-ui="Tab"][data-selected="true"]::after {
          content: "" !important;
          position: absolute !important;
          left: 10px !important;
          right: 10px !important;
          bottom: -2px !important;
          height: 2px !important;
          background: linear-gradient(90deg, #0066FF, #6366F1) !important;
          border-radius: 2px !important;
        }

        /* ── Hide "All fields" tab (first child in TabList) ──────────────── */
        [data-ui="TabList"] > [data-ui="Tab"]:first-child {
          display: none !important;
        }

        /* ── Hide Sanity's entire default document header ─────────────────── */
        /* Our custom PageHeaderField banner (injected via FormInputWrapper)   */
        /* replaces this completely — title, subtitle, status pill, action     */
        /* buttons, everything. No empty space left behind.                    */
        [data-testid="document-panel-document-title"],
        [data-ui="DocumentPaneHeaderTitle"],
        [data-testid="document-pane"] header h1,
        [data-testid="document-pane"] header h2,
        [data-testid="pane-header"] h1,
        [data-testid="pane-header"] h2 {
          display: none !important;
        }

        /* Collapse the entire pane-header container (action buttons + title  */
        /* row). Our banner provides Share / Fullscreen / Actions / Open Live */
        /* so the default chrome is fully redundant.                          */
        [data-testid="pane"]:not([data-testid="pane-list"]) > div:first-child,
        [data-testid="document-pane"] > header,
        [data-testid="pane-header"] {
          display: none !important;
        }

        /* ── Banner styling tweak: pull right up to the top of the editor ─ */
        .phf-card {
          margin-top: 0 !important;
        }
      `}</style>
      {renderDefault(props)}
    </>
  );
}
