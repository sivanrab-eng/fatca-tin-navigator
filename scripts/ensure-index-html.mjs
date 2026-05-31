// Generates a SPA fallback index.html in dist/client if the build did not
// prerender one. It scans dist/client/assets for the entry JS and CSS so the
// browser boots the TanStack Router client which then hydrates the route tree.
import { readdirSync, existsSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const CLIENT_DIR = "dist/client";
const ASSETS_DIR = join(CLIENT_DIR, "assets");
const INDEX_HTML = join(CLIENT_DIR, "index.html");

if (existsSync(INDEX_HTML)) {
  console.log("[ensure-index-html] index.html already exists, skipping.");
  process.exit(0);
}

if (!existsSync(ASSETS_DIR)) {
  console.error("[ensure-index-html] dist/client/assets not found. Build may have failed.");
  process.exit(1);
}

const files = readdirSync(ASSETS_DIR);
// Pick the largest .js as the entry (best-effort heuristic for vite output)
const jsFiles = files.filter((f) => f.endsWith(".js"));
const cssFiles = files.filter((f) => f.endsWith(".css"));

if (jsFiles.length === 0) {
  console.error("[ensure-index-html] No JS bundles found in dist/client/assets");
  process.exit(1);
}

const entryJs = jsFiles
  .map((f) => ({ f, size: statSync(join(ASSETS_DIR, f)).size }))
  .sort((a, b) => b.size - a.size)[0].f;

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
