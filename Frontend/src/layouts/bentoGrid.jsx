import React from "react";

const BentoGrid = ({ children }) => {
  return (
    <main className="ml-0 md:ml mt-16 p-6 bg-[#f1f4f9] min-h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 transition-colors duration-300">
      {children}
    </main>
  );
};

export default BentoGrid;
