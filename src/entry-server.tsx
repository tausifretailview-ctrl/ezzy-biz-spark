import { renderToString } from "react-dom/server";
import Landing from "./pages/Landing";
import SeoPage from "./pages/seo/SeoPage";
import { SEO_PAGES } from "./pages/seo/pages";

/**
 * Build-time prerender entry (see prerenderPlugin in vite.config.ts).
 * Maps each public marketing route to the page rendered into its HTML file,
 * so crawlers that don't run JavaScript still see the full content.
 */
export const routes: Record<string, () => JSX.Element> = {
  "/": () => <Landing />,
  ...Object.fromEntries(SEO_PAGES.map((page) => [page.path, () => <SeoPage page={page} />])),
};

/** Per-route <head> values that replace the home page's in the HTML template. Routes not listed keep the template's. */
export const heads: Record<string, { title: string; description: string }> = Object.fromEntries(
  SEO_PAGES.map((page) => [page.path, { title: page.title, description: page.description }]),
);

export function render(route: string): string {
  return renderToString(routes[route]());
}
