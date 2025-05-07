// src/components/Card.jsx
import React from "react";

export function CardInsights({ title, location, amount, children }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5 shadow">
      <h2 className="text-md font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-500 text-sm">{location}</p>
      {amount && <h3 className="text-2xl font-bold mt-2">{amount}</h3>}

      {/* Static Chart Placeholder (optional) */}
      {!children && (
        <div className="w-full h-24 bg-white rounded-lg mt-4 shadow-inner"></div>
      )}

      {/* Dynamic Content */}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
