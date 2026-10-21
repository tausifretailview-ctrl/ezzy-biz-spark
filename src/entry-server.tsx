import { renderToString } from "react-dom/server";
import Landing from "./pages/Landing";

/**
 * Build-time prerender entry (see prerenderPlugin in vite.config.ts).
 * Maps each public marketing route to the page rendered into its HTML file,
 * so crawlers that don't run JavaScript still see the full content.
 */
export const routes: Record<string, () => JSX.Element> = {
  "/": () => <Landing />,
};

export function render(route: string): string {
  return renderToString(routes[route]());
}
