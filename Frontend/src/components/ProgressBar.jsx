import React from "react";

const ProgressBar = ({
  delivered,
  inTransit,
  outForDelivery,
  exception,
  total,
}) => {
  const deliveredPercent = (delivered / total) * 100;
  const inTransitPercent = (inTransit / total) * 100;
  const outForDeliveryPercent = (outForDelivery / total) * 100;
  const exceptionPercent = (exception / total) * 100;

  return (
    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden flex">
      <div
        className="bg-dashboard-accent-teal h-full"
        style={{ width: `${deliveredPercent}%` }}
      />
      <div
        className="bg-dashboard-card-purple h-full"
        style={{ width: `${inTransitPercent}%` }}
      />
      <div
        className="bg-dashboard-accent-orange h-full"
        style={{ width: `${outForDeliveryPercent}%` }}
      />
      <div
        className="bg-red-500 h-full"
        style={{ width: `${exceptionPercent}%` }}
      />
    </div>
  );
};

export default ProgressBar;
