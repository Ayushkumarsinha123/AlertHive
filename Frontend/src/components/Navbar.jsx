import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="bg-[#0B1C3B] text-white px-6 py-4 rounded-t-2xl flex justify-between items-center">
      {/* Logo and Title */}
      <div className="flex items-center space-x-3">
        <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white text-lg font-bold">
          ae
        </div>
        <h1 className="text-xl font-semibold">Aegis Alert</h1>
      </div>
    </div>
  );
}
