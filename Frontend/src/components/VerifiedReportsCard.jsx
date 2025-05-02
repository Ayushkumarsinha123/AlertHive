import React from "react";
import { Card, CardContent } from "./cards.jsx";

const VerifiedReportsCard = () => {
  return (
    <Card className="bg-gray-700 col-span-1">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-2">Verified Reports</h2>
        <div className="bg-gray-600 rounded p-4 text-sm">
          <p>1,253 Verified Incidents</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerifiedReportsCard;
