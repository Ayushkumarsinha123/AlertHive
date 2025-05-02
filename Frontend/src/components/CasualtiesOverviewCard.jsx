import React from "react";
import { Card, CardContent } from "./cards.jsx";

const CasualtiesOverviewCard = () => {
  return (
    <Card className="bg-gray-800 col-span-1">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-2">Casualties Overview</h2>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <p>Increase: 14%</p>
            <p className="text-xs text-gray-400">Avg: 18,324</p>
          </div>
          <div className="text-2xl font-bold">15,368</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CasualtiesOverviewCard;
