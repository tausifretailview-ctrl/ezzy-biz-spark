import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";

// Only the landing page ships in the main bundle; the other routes (and their
// heavy PDF/Excel/chart libraries) load on demand to keep the home page fast.
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const WorkReport = lazy(() => import("./pages/WorkReport"));
const CottonPlusForm = lazy(() => import("./pages/cotton-plus/CottonPlusForm"));
const CottonPlusThankYou = lazy(() => import("./pages/cotton-plus/CottonPlusThankYou"));
const CottonPlusAdmin = lazy(() => import("./pages/cotton-plus/CottonPlusAdmin"));

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
          <Route path="/app" element={<Index />} />
          <Route path="/work-report" element={<WorkReport />} />
          <Route path="/cotton-plus" element={<CottonPlusForm />} />
          <Route path="/cotton-plus/thank-you" element={<CottonPlusThankYou />} />
          <Route path="/cotton-plus/admin" element={<CottonPlusAdmin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
