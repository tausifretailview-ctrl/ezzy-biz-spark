import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect, type ComponentType, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import SeoPage from "./pages/seo/SeoPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { SEO_PAGES } from "./pages/seo/pages";
import BlogIndex from "./pages/blog/BlogIndex";
import BlogPostPage from "./pages/blog/BlogPostPage";
import { BLOG_PATH, BLOG_POSTS } from "./pages/blog/posts";
import { isMarketingHost, PRIVACY_PATH } from "./pages/site";

// Only the landing page ships in the main bundle; the other routes (and their
// heavy PDF/Excel/chart libraries) load on demand to keep the home page fast.
const NotFound = lazy(() => import("./pages/NotFound"));
const WorkReport = lazy(() => import("./pages/WorkReport"));

// Work Report (staff logins) is not part of the Ezzy ERP website. Google flagged ezzyerp.in for
// "deceptive pages" while it hosted login pages, so it only runs on the project's Lovable address
// (https://ezzy-biz-spark.lovable.app/work-report), never on ezzyerp.in.
const showTools = !isMarketingHost();

/** Gives a tool its own tab title and keeps it out of search, instead of the Ezzy ERP home page's head. */
function ToolPage({ title, children }: { title: string; children: ReactNode }) {
  useEffect(() => {
    document.title = title;
    document.querySelector('link[rel="canonical"]')?.remove();
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
    return () => robots.remove();
  }, [title]);
  return <>{children}</>;
}

const queryClient = new QueryClient();

/** The browser uses BrowserRouter. The build-time prerender (src/entry-server.tsx) passes a StaticRouter,
 *  so the prerendered HTML is exactly what the browser hydrates. */
const App = ({ Router = BrowserRouter }: { Router?: ComponentType<{ children?: ReactNode }> }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Landing />} />
          {SEO_PAGES.map((page) => (
            <Route key={page.path} path={page.path} element={<SeoPage page={page} />} />
          ))}
          <Route path={BLOG_PATH} element={<BlogIndex />} />
          {BLOG_POSTS.map((post) => (
            <Route key={post.path} path={post.path} element={<BlogPostPage post={post} />} />
          ))}
          <Route path={PRIVACY_PATH} element={<PrivacyPolicy />} />
          {/* The old landing page, with out-of-date phone numbers. */}
          <Route path="/app" element={<Navigate to="/" replace />} />
          {showTools && <Route path="/work-report" element={<ToolPage title="Work Report"><WorkReport /></ToolPage>} />}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
