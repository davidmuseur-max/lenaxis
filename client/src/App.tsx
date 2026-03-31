import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ModulePage from "./pages/ModulePage";
import RisksPage from "./pages/RisksPage";
import SectorsPage from "./pages/SectorsPage";
import ConfiguratorPage from "./pages/ConfiguratorPage";

import AboutPage from "./pages/AboutPage";
import InsurersPage from "./pages/InsurersPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import SimulateurCommercial from "./pages/SimulateurCommercial";
import { SearchProvider } from "./contexts/SearchContext";
import SearchResults from "./components/SearchResults";
import Chatbot from "./components/Chatbot";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/module/:moduleId" component={ModulePage} />
      <Route path="/risques" component={RisksPage} />
      <Route path="/secteurs" component={SectorsPage} />
      <Route path="/configurateur" component={ConfiguratorPage} />
      <Route path="/simulateur" component={SimulateurCommercial} />

      <Route path="/qui-sommes-nous" component={AboutPage} />
      <Route path="/assureurs" component={InsurersPage} />
      <Route path="/temoignages" component={TestimonialsPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <SearchProvider>
          <TooltipProvider>
            <Toaster />
            <SearchResults />
            <Router />
            <Chatbot />
          </TooltipProvider>
        </SearchProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
