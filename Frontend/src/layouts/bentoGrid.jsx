import React from "react";

const BentoGrid = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-6 bg-[#f5f6fa] min-h-screen">
      {children}
    </div>
  );
};

export default BentoGrid;
