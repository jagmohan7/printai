"use client";

import type { InputProps } from "sanity";
import PageHeaderField from "./PageHeaderField";

/**
 * Wraps the ROOT document form input with our custom PageHeaderField banner.
 *
 * Wired via `defineConfig({ form: { components: { input: FormInputWrapper } } })`
 * — Sanity calls this for EVERY input render (root document, nested objects,
 *   array items, strings, etc). We only inject the banner when the input is
 *   the ROOT document of a landing-page type.
 *
 * Because we render BEFORE props.renderDefault(), the banner appears above
 * the form's tabs and fields — replacing Sanity's default doc-pane header.
 */

// ── Schemas that should get the custom banner ────────────────────────────────
// All fixed-route page docs. (flexPage is excluded — its URL is a dynamic slug
// the banner's doc-ID→URL map can't resolve.)
const BANNER_SCHEMAS = new Set<string>([
  "homepage",
  "chatbotsPage",
  "webToPrintPage",
  "automationPage",
  "devopsPage",
  "customAiPage",
  "caseStudiesPage",
  "resourcesPage",
]);

export default function FormInputWrapper(props: InputProps) {
  const { schemaType } = props;

  // schemaType.jsonType === "object" + schemaType.type === "document" means
  // we're at the root of a document. Nested objects/arrays/strings are skipped.
  const isRootDocument =
    schemaType?.jsonType === "object" &&
    (schemaType as { type?: { name?: string } })?.type?.name === "document";

  const shouldShowBanner =
    isRootDocument && BANNER_SCHEMAS.has(schemaType.name);

  if (!shouldShowBanner) {
    return <>{props.renderDefault(props)}</>;
  }

  return (
    <>
      <PageHeaderField />
      {props.renderDefault(props)}
    </>
  );
}
