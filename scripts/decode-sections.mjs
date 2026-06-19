import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { gunzipSync } from "node:zlib";

const SRC = "C:\\Users\\lenov\\Downloads\\PrintAI Wireframes (bundled).html";
const html = readFileSync(SRC, "utf8");

function extract(type) {
  const open = `<script type="__bundler/${type}">`;
  const i = html.indexOf(open);
  const start = i + open.length;
  const end = html.indexOf("</script>", start);
  return html.slice(start, end).trim();
}

const manifest = JSON.parse(extract("manifest"));

// The 10 text/babel section files, in document order
const UUIDS = [
  "36fc632c-3838-4d32-b922-c44262ea8326",
  "b27da37c-1372-400d-93ab-db02c51179dc",
  "d30e8caf-f04c-4552-9824-cf73b3b56c55",
  "6daf6b00-8527-4e2c-8edd-642f68b125e7",
  "19462fe5-e173-4f76-9570-5da3d75aa761",
  "24109ad0-0fb7-4545-a88f-291c73bae813",
  "7d5749e4-1392-46f1-8e84-3957fdeb515d",
  "494aed42-0412-4ca8-b0d6-ce8a78a42773",
  "dd2f55b8-2458-476e-8610-8d9c117cf684",
  "804c39f9-8c6b-4be2-9fc1-0777f950dced",
];

function decode(uuid) {
  const entry = manifest[uuid];
  if (!entry) return `// MISSING ${uuid}`;
  const buf = Buffer.from(entry.data, "base64");
  const bytes = entry.compressed ? gunzipSync(buf) : buf;
  return bytes.toString("utf8");
}

mkdirSync("D:\\printai\\scripts\\sections", { recursive: true });
let combined = "";
UUIDS.forEach((uuid, idx) => {
  const code = decode(uuid);
  const n = String(idx + 1).padStart(2, "0");
  writeFileSync(`D:\\printai\\scripts\\sections\\${n}.jsx`, code, "utf8");
  combined += `\n\n/* ===================== FILE ${n} (${uuid}) — ${code.length} chars ===================== */\n` + code;
  console.log(`${n}: ${code.length} chars`);
});
writeFileSync("D:\\printai\\scripts\\sections\\_all.jsx", combined, "utf8");
console.log("Total combined:", combined.length, "chars");
