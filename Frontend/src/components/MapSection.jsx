// src/components/MapSection.jsx
import React from "react";

export function MapSection() {
  return (
    <div className="mt-10 relative">
      <img
        src="/map-placeholder.png"
        alt="Map"
        className="w-full h-64 object-cover rounded-xl"
      />
      <div className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-full shadow-md text-sm font-medium text-gray-700">
        +$344,560{" "}
        <span className="ml-2 text-blue-500 cursor-pointer">View Insights</span>
      </div>
    </div>
  );
}
