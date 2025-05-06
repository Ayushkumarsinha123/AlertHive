// App.jsx or wherever your routes are defined
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/DashboardPage.jsx';
import Reports from './pages/Reports';
import InsightsDashboard from './pages/AdminDashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/admin" element={<InsightsDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
