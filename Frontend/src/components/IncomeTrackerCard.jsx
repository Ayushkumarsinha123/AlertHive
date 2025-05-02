// components/IncomeTrackerCard.jsx
import React from "react";
import { Line } from "react-chartjs-2";

const IncomeTrackerCard = () => {
  const chartData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [
      {
        label: "Income",
        data: [50, 70, 55, 80, 60, 90, 75],
        backgroundColor: "rgba(100, 100, 255, 0.3)",
        borderColor: "#6366f1",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="col-span-2 bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Income Tracker</h2>
      <Line data={chartData} options={{ plugins: { legend: { display: false } } }} />
      <p className="text-sm text-gray-500 mt-3">+20% from last week</p>
    </div>
  );
};

export default IncomeTrackerCard;
