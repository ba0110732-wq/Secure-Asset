import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";
import Home from "@/pages/home";
import MediAI from "@/pages/mediai";

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

function MediAIRoute({ children }: { children: React.ReactNode }) {
  return <MediAILayout>{children}</MediAILayout>;
}

function Router() {
  return (
    <Switch>
      {/* Portfolio routes */}
      <Route path="/" component={Home} />
      <Route path="/medai" component={MediAI} />

      {/* MediAI app routes */}
      <Route path="/app">{() => <MediAIRoute><Dashboard /></MediAIRoute>}</Route>
      <Route path="/app/symptoms">{() => <MediAIRoute><Symptoms /></MediAIRoute>}</Route>
      <Route path="/app/drugs">{() => <MediAIRoute><Drugs /></MediAIRoute>}</Route>
      <Route path="/app/consultations">{() => <MediAIRoute><Consultations /></MediAIRoute>}</Route>
      <Route path="/app/consultations/:id">{() => <MediAIRoute><Consultation /></MediAIRoute>}</Route>
      <Route path="/app/vitals">{() => <MediAIRoute><Vitals /></MediAIRoute>}</Route>
      <Route path="/app/profile">{() => <MediAIRoute><Profile /></MediAIRoute>}</Route>
      <Route path="/app/blog">{() => <MediAIRoute><Blog /></MediAIRoute>}</Route>
      <Route path="/app/blog/:slug">{() => <MediAIRoute><BlogPost /></MediAIRoute>}</Route>
      <Route path="/app/community">{() => <MediAIRoute><Community /></MediAIRoute>}</Route>
      <Route path="/app/community/:id">{() => <MediAIRoute><CommunityPost /></MediAIRoute>}</Route>
      <Route path="/app/account">{() => <MediAIRoute><Account /></MediAIRoute>}</Route>
      <Route path="/app/pricing">{() => <MediAIRoute><Pricing /></MediAIRoute>}</Route>
      <Route path="/app/privacy">{() => <MediAIRoute><Privacy /></MediAIRoute>}</Route>
      <Route path="/app/terms">{() => <MediAIRoute><Terms /></MediAIRoute>}</Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
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

export default App;
