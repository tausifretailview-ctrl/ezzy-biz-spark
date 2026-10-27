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
const SITE = "https://ezzyerp.in";
const escapeHtml = (v: string) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Swaps the home page's title, description, canonical and social tags for a route's own. */
function withHead(template: string, route: string, head?: { title: string; description: string }) {
  if (!head) return template;
  const title = escapeHtml(head.title);
  const description = escapeHtml(head.description);
  const url = `${SITE}${route}`;
  const meta = (attr: string, key: string, value: string) => (html: string) =>
    html.replace(new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`), `$1${value}$2`);
  return [
    (html: string) => html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`),
    (html: string) => html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`),
    meta("name", "description", description),
    meta("property", "og:url", url),
    meta("property", "og:title", title),
    meta("property", "og:description", description),
    meta("name", "twitter:title", title),
    meta("name", "twitter:description", description),
  ].reduce((html, fn) => fn(html), template);
}

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
        const { routes, heads, render } = await server.ssrLoadModule("/src/entry-server.tsx");
        const template = fs.readFileSync(path.join(outDir, "index.html"), "utf-8");
        for (const route of Object.keys(routes)) {
          const html = withHead(template, route, heads[route])
            .replace('<div id="root"></div>', `<div id="root" data-prerendered="${route}">${render(route)}</div>`);
          // Hosts differ on which file answers /page (no trailing slash): some use page/index.html,
          // others page.html. Write both so the prerendered page is served either way.
          const files = route === "/" ? ["index.html"] : [path.join(route, "index.html"), `${route}.html`];
          for (const name of files) {
            const file = path.join(outDir, name);
            fs.mkdirSync(path.dirname(file), { recursive: true });
            fs.writeFileSync(file, html);
          }
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
