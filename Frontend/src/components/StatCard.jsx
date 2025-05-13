import React from "react";

const StatCard = ({ label, value, subLabel, className }) => {
  return (
    <div className={className}>
      <div className="text-xs uppercase tracking-wide text-white/70">
        {label}
      </div>
      <div className="text-2xl font-bold text-white mt-1">
        {value.toLocaleString()}
      </div>
      {subLabel && (
        <div className="text-xs text-white/50 uppercase">{subLabel}</div>
      )}
    </div>
  );
};

export default StatCard;
