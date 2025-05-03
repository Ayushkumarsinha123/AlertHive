import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx"; // ✅ Import Topbar
import BentoGrid from "../layouts/bentoGrid.jsx";
import { Menu } from "lucide-react";

import IncomeTrackerCard from "../components/IncomeTrackerCard.jsx";
import RecentProjectsCard from "../components/RecentProjectsCard.jsx";
import ProposalProgressCard from "../components/ProposalProgressCard.jsx";
import PremiumFeaturesCard from "../components/PremiumFeaturesCard.jsx";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative min-h-screen bg-[#f3f4f6]">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Toggle Button (only shows when sidebar is closed) */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="p-2 m-4 rounded-full bg-white shadow fixed top-2 left-2 z-50"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      )}

      {/* Main Content shifts ONLY when sidebar is open */}
      <main
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* ✅ Topbar */}
        <Topbar />

        {/* ✅ Bento Grid Content */}
        <BentoGrid>
          <IncomeTrackerCard />
          <RecentProjectsCard />
          <ProposalProgressCard />
          <PremiumFeaturesCard />
        </BentoGrid>
      </main>
    </div>
  );
};

export default Dashboard;
