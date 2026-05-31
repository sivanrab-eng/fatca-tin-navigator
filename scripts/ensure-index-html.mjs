// Generates a SPA fallback index.html in dist/client by detecting the real
// Vite client entry (a JS file in dist/client/assets that is NOT imported
// by any other JS file in that folder). Avoids the "largest JS" heuristic
// which can pick a shared chunk and leave the app un-mounted.
import { readdirSync, existsSync, writeFileSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const CLIENT_DIR = "dist/client";
const ASSETS_DIR = join(CLIENT_DIR, "assets");
const INDEX_HTML = join(CLIENT_DIR, "index.html");

if (!existsSync(ASSETS_DIR)) {
  console.error("[ensure-index-html] dist/client/assets not found. Build may have failed.");
  process.exit(1);
}

const files = readdirSync(ASSETS_DIR);
const jsFiles = files.filter((f) => f.endsWith(".js"));
const cssFiles = files.filter((f) => f.endsWith(".css"));

if (jsFiles.length === 0) {
  console.error("[ensure-index-html] No JS bundles found in dist/client/assets");
  process.exit(1);
}

// Find files that are imported by other JS files -> those are chunks, not entries.
const imported = new Set();
const contents = new Map();
for (const f of jsFiles) {
  const src = readFileSync(join(ASSETS_DIR, f), "utf8");
  contents.set(f, src);
}
for (const f of jsFiles) {
  const src = contents.get(f);
  for (const other of jsFiles) {
    if (other === f) continue;
    if (src.includes(`./${other}`) || src.includes(`/assets/${other}`)) {
      imported.add(other);
    }
  }
}

let entryCandidates = jsFiles.filter((f) => !imported.has(f));
if (entryCandidates.length === 0) entryCandidates = jsFiles;
// Prefer the smallest entry candidate (entries tend to be thin shells).
const entryJs = entryCandidates
  .map((f) => ({ f, size: statSync(join(ASSETS_DIR, f)).size }))
  .sort((a, b) => a.size - b.size)[0].f;

const cssTags = cssFiles
  .map((f) => `    <link rel="stylesheet" href="/assets/${f}">`)
  .join("\n");

const html = `<!doctype html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>מאתר TIN — FATCA/CRS</title>
    <meta name="description" content="כלי לאיתור שם ומבנה מספר זיהוי המס (TIN) בכל מדינה לצורכי FATCA/CRS.">
${cssTags}
    <script type="module" src="/assets/${entryJs}"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

writeFileSync(INDEX_HTML, html);
console.log(`[ensure-index-html] Wrote SPA fallback index.html (entry: ${entryJs}).`);
