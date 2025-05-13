import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster as Sonner } from "./components/ui/sonner";

import Dashboard from "./pages/DashboardPage.jsx";
import Reports from "./pages/Reports.jsx";
import InsightsDashboard from "./pages/Insight.jsx";

import { WebSocketProvider } from "./contexts/WebSocketContext.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <WebSocketProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/insight" element={<InsightsDashboard />} />
              {/* Catch-all route */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </Router>
        </WebSocketProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
