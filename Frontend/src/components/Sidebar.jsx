// components/Sidebar.jsx
import React from "react";
import { Home, Settings, BarChart, X } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-600 to-indigo-800 shadow-md z-40 transition-all duration-500 ease-in-out transform ${
        isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }`}
      style={{
        transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
      }}
    >
      <div className="flex justify-between items-center p-4 border-b border-indigo-400">
        <h2 className="text-lg font-semibold text-white">Dashboard</h2>
        <button onClick={toggleSidebar}>
          <X className="w-6 h-6 text-white" />
        </button>
      </div>
      <nav className="p-4 space-y-4">
        <button className="flex items-center space-x-2 text-white hover:text-indigo-200 transition-colors">
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>
        <button className="flex items-center space-x-2 text-white hover:text-indigo-200 transition-colors">
          <BarChart className="w-5 h-5" />
          <span>Analytics</span>
        </button>
        <button className="flex items-center space-x-2 text-white hover:text-indigo-200 transition-colors">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
