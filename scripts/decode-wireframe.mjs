import { readFileSync, writeFileSync } from "node:fs";

const SRC = "C:\\Users\\lenov\\Downloads\\PrintAI Wireframes (bundled).html";
const html = readFileSync(SRC, "utf8");

function extract(type) {
  const open = `<script type="__bundler/${type}">`;
  const i = html.indexOf(open);
  if (i === -1) return null;
  const start = i + open.length;
  const end = html.indexOf("</script>", start);
  return html.slice(start, end).trim();
}

const templateRaw = extract("template");
const template = JSON.parse(templateRaw); // -> the real HTML/JSX string

writeFileSync("D:\\printai\\scripts\\_decoded.html", template, "utf8");
console.log("Decoded template length (chars):", template.length);
console.log("Wrote D:\\printai\\scripts\\_decoded.html");
