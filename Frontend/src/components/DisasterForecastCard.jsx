import React, { useRef, useEffect } from "react";
import { Card, CardContent } from "./cards.jsx";
import Chart from "chart.js/auto";

const DisasterForecastCard = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy the previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create a new chart
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["2023", "2024", "2025", "2026"],
          datasets: [
            {
              label: "Incidents",
              data: [30, 45, 60, 50],
              borderColor: "#d6bcfa",
              backgroundColor: "rgba(214,188,250,0.2)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, ticks: { stepSize: 10 } },
            x: { display: true },
          },
        },
      });
    }

    // Cleanup the chart on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <Card className="bg-gray-700 col-span-1">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Disaster Forecast</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-green-600 rounded p-4">
            <p className="text-sm">Current Alert Level</p>
            <h3 className="text-xl font-bold">Level 3</h3>
            <p className="text-xs text-green-200 mt-1">Moderate Risk</p>
          </div>
          <div className="bg-purple-600 rounded p-4">
            <p className="text-sm">Forecasted Incidents</p>
            <canvas ref={chartRef} />
            <p className="text-sm font-semibold mt-2">60 Forecasted</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DisasterForecastCard;
