import React from "react";

const Topbar = () => {
  return (
    <header className="w-full p-4 bg-white/80 backdrop-blur-md shadow-sm flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-700">Welcome back 👋</h2>
      <div className="flex items-center space-x-4">
        <button className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg">
          Switch Theme
        </button>
        <div className="h-10 w-10 bg-indigo-500 rounded-full text-white flex items-center justify-center font-bold">
          H
        </div>
      </div>
    </header>
  );
};

export default Topbar;
