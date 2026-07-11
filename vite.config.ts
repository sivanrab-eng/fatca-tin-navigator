// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/tanstack/vite";

const base = process.env.VITE_BASE || "/";

export default defineConfig({
  vite: {
    base,
    plugins: [mcpPlugin()],
  },
  tanstackStart: {
    router: {
      basepath: base,
    },
  },
  // Force-enable Nitro outside the Lovable sandbox (e.g. GitHub Actions) so the
  // build emits dist/client/. The preset is taken from NITRO_PRESET (set to
  // "static" in the GitHub Pages workflow).
  nitro: true,
});
