// src/pages/InsightsDashboard.jsx
import React, { useState } from "react";
import { FilterOption } from "../components/FilterBar";
import { MapSection } from "../components/MapSection";
import { CardInsights } from "../components/CardInsight.jsx";
import { SpiderChart } from "../components/SpiderChart";

export default function InsightsDashboard() {
  const [dateRange, setDateRange] = useState("Custom Date");
  const [location, setLocation] = useState("Uttarakhand");
  const [country, setCountry] = useState("India");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-cyan-500 p-6">
      <div className="bg-white rounded-3xl shadow-xl px-8 py-6 max-w-7xl mx-auto">
        {/* Filter Bar */}
        <div className="flex space-x-4 flex-wrap justify-between items-center mb-6">
          <FilterOption
            title="Custom Date"
            options={["Today", "This Week", "This Month"]}
            selected={dateRange}
            setSelected={setDateRange}
          />
          <FilterOption
            title="district"
            options={["Dehradun", "Haridwar", "Chamoli"]}
            selected={location}
            setSelected={setLocation}
          />
          <FilterOption
            title="State"
            options={["Patna", "UP", "Uttarakhand"]}
            selected={country}
            setSelected={setCountry}
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm">
            Download Report
          </button>
        </div>

        {/* Filter Info Display */}
        <div className="text-sm text-gray-700 mb-6">
          Showing data for: <strong>{location}</strong> in <strong>{country}</strong> ({dateRange})
        </div>

        {/* Map Section */}
        <MapSection />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
  <CardInsights title="Disaster Summary" location="Uttarakhand">
    <div className="space-y-2 text-sm text-gray-700">
      <p><strong>Deaths:</strong> 8</p>
      <p><strong>Injured:</strong> 35+</p>
      <p><strong>Rescued:</strong> 1000+</p>
      <p><strong>Estimated Damage:</strong> $234,730</p>
    </div>
  </CardInsights>

  <CardInsights title="Climate Alerts" location="Israel & Kentucky">
    <div className="space-y-3">
      <div className="bg-red-200 text-red-900 px-3 py-2 rounded-lg shadow-sm text-sm">
        <p className="font-semibold">Flood Alert</p>
        <p>Kentucky flooding: 8 dead, 1000+ rescued.</p>
      </div>
      <div className="bg-red-200 text-red-900 px-3 py-2 rounded-lg shadow-sm text-sm">
        <p className="font-semibold">Fire Emergency</p>
        <p>Forest fire in Judean Foothills, Israel.</p>
      </div>
    </div>
  </CardInsights>
</div>


      </div>
    </div>
  );
}
