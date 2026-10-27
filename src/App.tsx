import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import SeoPage from "./pages/seo/SeoPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { SEO_PAGES } from "./pages/seo/pages";
import { isMarketingHost, PRIVACY_PATH } from "./pages/site";

// Only the landing page ships in the main bundle; the other routes (and their
// heavy PDF/Excel/chart libraries) load on demand to keep the home page fast.
const NotFound = lazy(() => import("./pages/NotFound"));
const ToolMoved = lazy(() => import("./pages/ToolMoved"));
const WorkReport = lazy(() => import("./pages/WorkReport"));
const CottonPlusForm = lazy(() => import("./pages/cotton-plus/CottonPlusForm"));
const CottonPlusThankYou = lazy(() => import("./pages/cotton-plus/CottonPlusThankYou"));
const CottonPlusAdmin = lazy(() => import("./pages/cotton-plus/CottonPlusAdmin"));

// Cotton Plus (another shop's customer form) and Work Report (staff logins) are not part of the
// Ezzy ERP website. Google flagged ezzyerp.in for "deceptive pages" while it hosted them, so they
// only run on the project's Lovable address (TOOLS_ORIGIN in pages/site.ts), never on ezzyerp.in.
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Landing />} />
          {SEO_PAGES.map((page) => (
            <Route key={page.path} path={page.path} element={<SeoPage page={page} />} />
          ))}
          <Route path={PRIVACY_PATH} element={<PrivacyPolicy />} />
          {/* The old landing page, with out-of-date phone numbers. */}
          <Route path="/app" element={<Navigate to="/" replace />} />
          {showTools ? (
            <>
              <Route path="/work-report" element={<ToolPage title="Work Report"><WorkReport /></ToolPage>} />
              <Route path="/cotton-plus" element={<ToolPage title="Cotton Plus"><CottonPlusForm /></ToolPage>} />
              <Route path="/cotton-plus/thank-you" element={<ToolPage title="Cotton Plus"><CottonPlusThankYou /></ToolPage>} />
              <Route path="/cotton-plus/admin" element={<ToolPage title="Cotton Plus Admin"><CottonPlusAdmin /></ToolPage>} />
            </>
          ) : (
            <Route path="/cotton-plus" element={<ToolMoved />} />
          )}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
