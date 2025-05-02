import React from "react";

import IncomeTrackerCard from "./components/IncomeTrackerCard";
import RecentProjectsCard from "./components/RecentProjectsCard";
import ProposalProgressCard from "./components/ProposalProgressCard";
import PremiumFeaturesCard from "./components/PremiumFeaturesCard";

import BentoGrid from "./layouts/bentoGrid";

const Dashboard = () => {
  return (
    <BentoGrid>
   
       <IncomeTrackerCard />
      <RecentProjectsCard />
      <ProposalProgressCard />
      <PremiumFeaturesCard />
    
    </BentoGrid>
  );
};

export default Dashboard;
