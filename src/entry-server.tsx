import type { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { PRIVACY_PATH, PRIVACY_HEAD } from "./pages/site";
import { SEO_PAGES } from "./pages/seo/pages";
import { BLOG_PATH, BLOG_HEAD, BLOG_POSTS } from "./pages/blog/posts";

/**
 * Build-time prerender entry (see prerenderPlugin in vite.config.ts).
 * Lists the public marketing routes whose HTML is written at build time,
 * so crawlers that don't run JavaScript still see the full content.
 * The whole app is rendered, so the browser can hydrate the HTML as is.
 */
export const routes: string[] = ["/", ...SEO_PAGES.map((page) => page.path), BLOG_PATH, ...BLOG_POSTS.map((post) => post.path), PRIVACY_PATH];

const hreflang = (post: { lang?: "hi" }) => (post.lang === "hi" ? "hi-IN" : "en-IN");

/** Per-route <head> values that replace the home page's in the HTML template. Routes not listed keep the template's.
 *  `alternates` lists the language versions of an article (itself included) as [hreflang, path].
 *  `global` marks a page written for shops outside India. */
export const heads: Record<string, { title: string; description: string; alternates?: [string, string][]; global?: boolean }> = {
  ...Object.fromEntries(SEO_PAGES.map((page) => [page.path, { title: page.title, description: page.description, global: page.audience === "global" }])),
  [BLOG_PATH]: BLOG_HEAD,
  ...Object.fromEntries(BLOG_POSTS.map((post) => {
    const other = BLOG_POSTS.find((p) => p.path === post.alternate);
    const alternates: [string, string][] | undefined = other && [[hreflang(post), post.path], [hreflang(other), other.path]];
    return [post.path, { title: post.title, description: post.description, alternates }];
  })),
  [PRIVACY_PATH]: PRIVACY_HEAD,
};

export function render(route: string): string {
  const Router = ({ children }: { children?: ReactNode }) => <StaticRouter location={route}>{children}</StaticRouter>;
  return renderToString(<App Router={Router} />);
}
