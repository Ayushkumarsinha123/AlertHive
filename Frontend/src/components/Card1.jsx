import { CircleDot } from "lucide-react";
import demonMap from "/demo-map.png";

export default function Card({ title }) {
  return (
    <div className="bg-white rounded-xl shadow-sm h-full flex flex-col relative overflow-hidden">
      {/* Live Icon */}
      <div className="absolute top-4 left-4 flex items-center gap-1 text-red-600 text-sm font-semibold z-10">
        <CircleDot className="w-3 h-3 animate-pulse" />
        LIVE
      </div>

      {/* Optional Title */}
      {title && (
        <h2 className="text-lg font-semibold text-gray-800 mb-2 z-10">
          {title}
        </h2>
      )}

      {/* Fixed height map container */}
      <div className="rounded-lg overflow-hidden w-full h-full">
        <img
          src={demonMap}
          alt="Map"
          className=""
        />
      </div>
    </div>
  );
}
