import React from "react";

const PremiumFeaturesCard = () => {
  return (
    <div className="bg-blue-50 rounded-2xl shadow-md p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Unlock Premium Features</h2>
        <p className="text-sm text-blue-600">Get access to exclusive tools and insights.</p>
      </div>
      <button className="mt-4 bg-blue-500 text-white text-sm py-2 px-4 rounded-full hover:bg-blue-600">
        Upgrade Now
      </button>
    </div>
  );
};

export default PremiumFeaturesCard;
