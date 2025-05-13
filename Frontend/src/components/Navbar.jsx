import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="bg-[#0B1C3B] text-white px-6 py-4 rounded-t-2xl flex justify-between items-center">
      {/* Logo and Title */}
      <div className="flex items-center space-x-3">
        <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white text-lg font-bold">C</div>
        <h1 className="text-xl font-semibold">Cisaster Response Dashboard</h1>
      </div>

      {/* Search and Profile */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-[#10294F] text-white px-4 py-2 rounded-full pl-10 text-sm placeholder-gray-300"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-300" />
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-400" />
      </div>
    </div>
  );
}
