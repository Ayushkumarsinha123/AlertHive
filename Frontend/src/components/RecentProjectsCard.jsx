
// components/RecentProjectsCard.jsx
import React from "react";

const RecentProjectsCard = () => {
  return (
    <div className="col-span-2 bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Your Recent Projects</h2>
      <div className="space-y-3">
        {["Web Development", "Copyright", "Web Design"].map((project, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h4 className="text-sm font-semibold">{project} Project</h4>
              <p className="text-xs text-gray-500">$10/hour</p>
            </div>
            <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">Not Paid</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjectsCard;