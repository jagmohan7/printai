"use client";

import { useFormValue } from "sanity";
import type { ReactElement } from "react";
import { DOC_ID_TO_URL } from "../lib/docRoutes";

/**
 * Live Google-style SERP preview for the SEO tab.
 *
 * Reads `seo.title` and `seo.description` from the current document and
 * renders a mock Google search result card that updates as the editor types.
 * Helps editors see how their page will actually appear in search.
 *
 * Wired as a `components.field` override on a synthetic "seoPreview" field
 * placed at the top of the SEO group.
 */

interface DocShape {
  _id?: string;
  pageLabel?: string;
  hero?: { heading?: string };
  seo?: {
    title?: string;
    description?: string;
  };
}

const CSS = `
.seo-preview {
  margin: 0 0 18px;
  padding: 18px 20px;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #dadce0;
  font-family: arial, sans-serif;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  max-width: 600px;
}
.seo-preview-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}
.seo-preview-favicon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0066FF 0%, #6366F1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #fff;
  font-weight: 700;
}
.seo-preview-site {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.seo-preview-sitename {
  font-size: 14px;
  color: #202124;
  font-weight: 400;
  line-height: 1.2;
}
.seo-preview-url {
  font-size: 12px;
  color: #5f6368;
  line-height: 1.2;
}
.seo-preview-title {
  margin: 6px 0 2px;
  font-size: 20px;
  line-height: 1.3;
  color: #1a0dab;
  font-weight: 400;
  cursor: pointer;
}
.seo-preview-title:hover {
  text-decoration: underline;
}
.seo-preview-desc {
  font-size: 14px;
  line-height: 1.58;
  color: #4d5156;
  margin: 0;
}
.seo-preview-empty {
  color: #9aa0a6;
  font-style: italic;
}
.seo-preview-meta {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(0,0,0,0.08);
  display: flex;
  gap: 14px;
  font-size: 12px;
  color: #5f6368;
  font-family: ui-monospace, Menlo, Consolas, monospace;
}
.seo-preview-meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}
.seo-preview-meta-count {
  font-weight: 600;
}
.seo-preview-meta-count.ok      { color: #137333; }
.seo-preview-meta-count.warn    { color: #b06000; }
.seo-preview-meta-count.over    { color: #c5221f; }

.seo-preview-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #94a3b8;
  font-weight: 600;
  margin: 0 0 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.seo-preview-label::before {
  content: "🔍";
  font-size: 13px;
}
`;

function countTone(value: number, ideal: number, max: number): string {
  if (value === 0)           return "warn";
  if (value > max)           return "over";
  if (value > ideal * 0.95)  return "ok";
  return "warn";
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max - 1).trimEnd() + "…";
}

export default function SeoPreviewField(): ReactElement {
  const doc = useFormValue([]) as DocShape | undefined;

  const docId   = (doc?._id || "").replace(/^drafts\./, "");
  const urlPath = DOC_ID_TO_URL[docId] ?? "/";

  // Use the same cascade as the header: pageLabel → seo.title → hero.heading
  const rawTitle =
    doc?.seo?.title ||
    doc?.pageLabel ||
    doc?.hero?.heading ||
    "";
  const rawDesc = doc?.seo?.description || "";

  // Google truncates at ~60 chars (title) and ~160 chars (desc) — same as our limits.
  const displayTitle = rawTitle ? truncate(rawTitle, 60) : "";
  const displayDesc  = rawDesc  ? truncate(rawDesc, 160) : "";

  const titleLen = rawTitle.length;
  const descLen  = rawDesc.length;

  return (
    <>
      <style>{CSS}</style>

      <p className="seo-preview-label">Google Search Preview</p>

      <div className="seo-preview">
        <div className="seo-preview-header">
          <div className="seo-preview-favicon">P</div>
          <div className="seo-preview-site">
            <span className="seo-preview-sitename">PrintAI</span>
            <span className="seo-preview-url">https://printai.cloud{urlPath}</span>
          </div>
        </div>

        <h3 className="seo-preview-title">
          {displayTitle || (
            <span className="seo-preview-empty">Untitled — set SEO title below</span>
          )}
        </h3>

        <p className="seo-preview-desc">
          {displayDesc || (
            <span className="seo-preview-empty">
              No meta description — Google will pick a snippet from the page content.
            </span>
          )}
        </p>

        <div className="seo-preview-meta">
          <span className="seo-preview-meta-item">
            Title:&nbsp;
            <span className={`seo-preview-meta-count ${countTone(titleLen, 60, 60)}`}>
              {titleLen}/60
            </span>
          </span>
          <span className="seo-preview-meta-item">
            Description:&nbsp;
            <span className={`seo-preview-meta-count ${countTone(descLen, 160, 160)}`}>
              {descLen}/160
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
