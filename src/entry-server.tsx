import type { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { PRIVACY_PATH, PRIVACY_HEAD } from "./pages/site";
import { SEO_PAGES } from "./pages/seo/pages";

/**
 * Build-time prerender entry (see prerenderPlugin in vite.config.ts).
 * Lists the public marketing routes whose HTML is written at build time,
 * so crawlers that don't run JavaScript still see the full content.
 * The whole app is rendered, so the browser can hydrate the HTML as is.
 */
export const routes: string[] = ["/", ...SEO_PAGES.map((page) => page.path), PRIVACY_PATH];

/** Per-route <head> values that replace the home page's in the HTML template. Routes not listed keep the template's. */
export const heads: Record<string, { title: string; description: string }> = {
  ...Object.fromEntries(SEO_PAGES.map((page) => [page.path, { title: page.title, description: page.description }])),
  [PRIVACY_PATH]: PRIVACY_HEAD,
};

export function render(route: string): string {
  const Router = ({ children }: { children?: ReactNode }) => <StaticRouter location={route}>{children}</StaticRouter>;
  return renderToString(<App Router={Router} />);
}
