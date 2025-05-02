
// components/PremiumFeaturesCard.jsx
import React from "react";

const PremiumFeaturesCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-2">Unlock Premium Features</h2>
        <p className="text-sm text-gray-500">Get access to exclusive tools and insights.</p>
      </div>
      <button className="mt-4 bg-indigo-500 text-white text-sm py-2 px-4 rounded-full hover:bg-indigo-600">
        Upgrade Now
      </button>
    </div>
  );
};

export default PremiumFeaturesCard;