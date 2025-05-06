// App.jsx or wherever your routes are defined
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/DashboardPage.jsx';
import Reports from './pages/Reports';
import InsightsDashboard from './pages/AdminDashboard.jsx';
import { WebSocketProvider } from './contexts/WebSocketContext.jsx';

function App() {
  return (
    <WebSocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/admin" element={<InsightsDashboard />} />
        </Routes>
      </Router>
    </WebSocketProvider>
  );
}

export default App;
