import { defineConfig, createServer, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

/**
 * Renders the public marketing pages to static HTML after the client build,
 * so search engines, social previews and AI crawlers (which often don't run
 * JavaScript) see the real page instead of an empty <div id="root">.
 * The browser still mounts the normal React app on top. If prerendering
 * fails for any reason the build keeps the plain SPA output.
 */
function prerenderPlugin(): Plugin {
  let outDir = "dist";
  return {
    name: "ezzy-prerender",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const server = await createServer({
        configFile: false,
        logLevel: "error",
        appType: "custom",
        server: { middlewareMode: true, hmr: false },
        // Production JSX runtime: the build sets NODE_ENV=production, where jsxDEV doesn't exist.
        esbuild: { jsx: "automatic", jsxDev: false },
        resolve: {
          alias: [
            // The Supabase client touches localStorage at import time; it is only used on submit.
            { find: "@/integrations/supabase/client", replacement: path.resolve(__dirname, "./src/prerender/supabase-stub.ts") },
            { find: "@", replacement: path.resolve(__dirname, "./src") },
          ],
        },
      });
      try {
        const { routes, render } = await server.ssrLoadModule("/src/entry-server.tsx");
        const template = fs.readFileSync(path.join(outDir, "index.html"), "utf-8");
        for (const route of Object.keys(routes)) {
          const html = template.replace('<div id="root"></div>', `<div id="root" data-prerendered="${route}">${render(route)}</div>`);
          const file = path.join(outDir, route, "index.html");
          fs.mkdirSync(path.dirname(file), { recursive: true });
          fs.writeFileSync(file, html);
          console.log(`prerendered ${route}`);
        }
      } catch (err) {
        console.warn("[ezzy-prerender] skipped, serving the plain SPA:", err);
      } finally {
        await server.close();
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), prerenderPlugin()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
