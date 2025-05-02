// components/Topbar.jsx
import React from "react";

const Topbar = () => {
  return (
    <header className="w-full px-6 py-4 bg-white/80 backdrop-blur-md shadow-md flex justify-between items-center">
      {/* Title with extra left padding to prevent overlap */}
      <h2 className="text-2xl font-semibold text-gray-800 pl-14">
        AlertHive
      </h2>

      <div className="flex items-center space-x-4">
        {/* Switch Theme Button */}
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl shadow transition-all duration-300">
          Switch Theme
        </button>

        {/* User Avatar */}
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-semibold shadow-md hover:scale-105 transition-transform duration-300">
          H
        </div>
      </div>
    </header>
  );
};

export default Topbar;
