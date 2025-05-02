import React from "react";

const RecentProjectsCard = () => {
  return (
    <div className="col-span-2 bg-pink-50 rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-pink-900 mb-4">Your Recent Projects</h2>
      <div className="space-y-3">
        {["Web Development", "Copyright", "Web Design"].map((project, index) => (
          <div
            key={index}
            className="bg-pink-100 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h4 className="text-sm font-semibold text-pink-800">{project} Project</h4>
              <p className="text-xs text-pink-600">$10/hour</p>
            </div>
            <span className="text-xs px-2 py-1 bg-pink-200 rounded-full text-pink-900">Not Paid</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjectsCard;
