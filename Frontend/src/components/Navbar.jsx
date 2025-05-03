import { Bell, Home, Mail, AlertTriangle, Settings, Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-100 px-6 py-3 flex items-center justify-between rounded-xl">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        <img src="/alerthive-high-resolution-logo.png" alt="Logo" className="w-9 h-9 rounded-md" />
        <h1 className="text-xl font-semibold text-gray-800">AlertHive</h1>
      </div>

      {/* Center Section */}
      <div className="flex space-x-6">
        <button className="text-gray-700 hover:text-black flex items-center space-x-1">
          <Home size={18} />
          <span>Home</span>
        </button>
        <button className="text-gray-700 hover:text-black flex items-center space-x-1">
          <Mail size={18} />
          <span>Messages</span>
        </button>
        <button className="text-gray-700 hover:text-black flex items-center space-x-1">
          <AlertTriangle size={18} />
          <span>Alerts</span>
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white border border-gray-300 rounded-full px-3 py-1 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <Search className="absolute right-3 top-1.5 text-gray-500" size={16} />
        </div>

        <button className="text-gray-700 hover:text-black">
          <Settings size={20} />
        </button>
        <button className="text-gray-700 hover:text-black">
          <Bell size={20} />
        </button>
        <img
          src="/profile.jpg"
          alt="Profile"
          className="w-9 h-9 rounded-full border-2 border-gray-300"
        />
      </div>
    </nav>
  );
}
