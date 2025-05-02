import React from "react";
import AffectedRegionsCard from "./components/AffectedRegionsCard";
import VerifiedReportsCard from "./components/VerifiedReportsCard";
import CasualtiesOverviewCard from "./components/CasualtiesOverviewCard";
import DisasterForecastCard from "./components/DisasterForecastCard";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6 bg-gray-100 min-h-screen text-white">
      <AffectedRegionsCard />
      <VerifiedReportsCard />
      <CasualtiesOverviewCard />
      <DisasterForecastCard />
    </div>
  );
};

export default Dashboard;
