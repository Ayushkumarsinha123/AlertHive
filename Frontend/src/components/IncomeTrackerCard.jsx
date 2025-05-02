import React from "react";
import { Line } from "react-chartjs-2";

const IncomeTrackerCard = () => {
  const chartData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [
      {
        label: "Income",
        data: [50, 70, 55, 80, 60, 90, 75],
        backgroundColor: "rgba(129, 140, 248, 0.2)",
        borderColor: "#818cf8",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="col-span-2 bg-indigo-50 rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-indigo-900 mb-2">Income Tracker</h2>
      <Line data={chartData} options={{ plugins: { legend: { display: false } } }} />
      <p className="text-sm text-indigo-600 mt-3">+20% from last week</p>
    </div>
  );
};

export default IncomeTrackerCard;
