import React from "react";

const ProposalProgressCard = () => {
  return (
    <div className="bg-green-50 rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-green-900 mb-4">Proposal Progress</h2>
      <div className="text-sm text-green-800">Proposals sent: <strong>64</strong></div>
      <div className="text-sm text-green-800">Interviews: <strong>12</strong></div>
      <div className="text-sm text-green-800">Hires: <strong>10</strong></div>
      <div className="mt-4">
        <div className="h-2 bg-green-200 rounded-full">
          <div className="h-full bg-green-500 rounded-full" style={{ width: '70%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProposalProgressCard;
