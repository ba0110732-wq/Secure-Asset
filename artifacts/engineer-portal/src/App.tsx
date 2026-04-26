import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";

import Landing from "@/pages/landing";
import { Layout as MediAILayout } from "@/components/medai/Layout";
import Dashboard from "@/pages/medai-app/dashboard";
import Symptoms from "@/pages/medai-app/symptoms";
import Drugs from "@/pages/medai-app/drugs";
import Consultations from "@/pages/medai-app/consultations";
import Consultation from "@/pages/medai-app/consultation";
import Vitals from "@/pages/medai-app/vitals";
import Profile from "@/pages/medai-app/profile";
import Blog from "@/pages/medai-app/blog";
import BlogPost from "@/pages/medai-app/blog-post";
import Community from "@/pages/medai-app/community";
import CommunityPost from "@/pages/medai-app/community-post";
import Account from "@/pages/medai-app/account";
import Pricing from "@/pages/medai-app/pricing";
import Privacy from "@/pages/medai-app/privacy";
import Terms from "@/pages/medai-app/terms";
import NotFound from "@/pages/medai-app/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App({ children }: { children: React.ReactNode }) {
  return <MediAILayout>{children}</MediAILayout>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />

      <Route path="/dashboard">{() => <App><Dashboard /></App>}</Route>
      <Route path="/symptoms">{() => <App><Symptoms /></App>}</Route>
      <Route path="/drugs">{() => <App><Drugs /></App>}</Route>
      <Route path="/consultations">{() => <App><Consultations /></App>}</Route>
      <Route path="/consultations/:id">{() => <App><Consultation /></App>}</Route>
      <Route path="/vitals">{() => <App><Vitals /></App>}</Route>
      <Route path="/profile">{() => <App><Profile /></App>}</Route>
      <Route path="/blog">{() => <App><Blog /></App>}</Route>
      <Route path="/blog/:slug">{() => <App><BlogPost /></App>}</Route>
      <Route path="/community">{() => <App><Community /></App>}</Route>
      <Route path="/community/:id">{() => <App><CommunityPost /></App>}</Route>
      <Route path="/account">{() => <App><Account /></App>}</Route>
      <Route path="/pricing">{() => <App><Pricing /></App>}</Route>
      <Route path="/privacy">{() => <App><Privacy /></App>}</Route>
      <Route path="/terms">{() => <App><Terms /></App>}</Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
          <SonnerToaster richColors position="top-right" />
        </TooltipProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default Root;
