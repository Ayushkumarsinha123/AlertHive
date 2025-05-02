import React from "react";
import { Card, CardContent } from "./cards.jsx";
import { Bar } from "react-chartjs-2";  // Using the Bar component from react-chartjs-2

const AffectedRegionsCard = () => {
  return (
    <Card className="bg-gray-800 col-span-1">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Affected Regions</h2>
          <span className="text-sm text-gray-400">Last 3 Months</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span>March</span>
          <span>April</span>
          <span>May</span>
        </div>
        <div className="h-24">
          <Bar
            data={{
              labels: ["March", "April", "May"],
              datasets: [
                {
                  label: "Regions Affected",
                  data: [5, 8, 12],
                  backgroundColor: ["#a1f0c4", "#a1f0c4", "#c2b2ff"],
                  borderRadius: 6,
                },
              ],
            }}
            options={{
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true, display: false }, x: { display: false } },
            }}
          />
        </div>
        <p className="text-lg mt-2">12 Regions</p>
      </CardContent>
    </Card>
  );
};

export default AffectedRegionsCard;
