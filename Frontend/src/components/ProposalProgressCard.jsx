
// components/ProposalProgressCard.jsx
import React from "react";

const ProposalProgressCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Proposal Progress</h2>
      <div className="text-sm text-gray-700">Proposals sent: <strong>64</strong></div>
      <div className="text-sm text-gray-700">Interviews: <strong>12</strong></div>
      <div className="text-sm text-gray-700">Hires: <strong>10</strong></div>
      <div className="mt-4">
        <div className="h-2 bg-gray-200 rounded-full">
          <div className="h-full bg-green-500 rounded-full" style={{ width: '70%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProposalProgressCard;