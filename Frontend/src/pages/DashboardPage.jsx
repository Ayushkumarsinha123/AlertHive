import { useState } from "react";
import Navbar from "../components/Navbar";
import Map from "../components/Map";
import AlertFeed from "../components/AlertFeed";
import TopStats from "../components/TopStats";
import { Activity, PieChart, MapPin } from "lucide-react";
import { Bell } from "lucide-react";

export default function Dashboard() {
  const [latestItem, setLatestItem] = useState(null);

  return (
    <div className="h-screen bg-[#0D1B2A] text-white flex flex-col">
      {/* Navbar */}
      <div className="shrink-0 p-4">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 overflow-hidden">
        {/* LEFT: Stats + Map + Bottom */}
        <div className="md:col-span-2 flex flex-col gap-4 overflow-hidden">
          {/* Top Stats – reduced height */}
          {/* Top Stats – visually enhanced */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[100px] shrink-0">
            <div className="bg-gradient-to-br from-[#1B263B] to-[#243B55] rounded-xl p-4 flex items-center gap-4 shadow-md">
              <div className="bg-[#415A77] p-2 rounded-lg">
                <Activity className="text-white w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Total Incidents
                </p>
                <p className="text-xl font-bold text-white">184</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1B263B] to-[#243B55] rounded-xl p-4 flex items-center gap-4 md:col-span-2 shadow-md">
              <div className="bg-[#415A77] p-2 rounded-lg">
                <PieChart className="text-white w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Disaster Breakdown
                </p>
                <div className="h-6 bg-[#415A77] rounded mt-1 flex items-center justify-center text-[10px]">
                  [Chart Placeholder]
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1B263B] to-[#243B55] rounded-xl p-4 flex items-center gap-4 shadow-md">
              <div className="bg-[#415A77] p-2 rounded-lg">
                <MapPin className="text-white w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Top Regions
                </p>
                <p className="text-sm text-white">California, Texas</p>
              </div>
            </div>
          </div>

          {/* Map – takes remaining space */}
          <div className="flex-grow bg-white rounded-xl overflow-hidden">
            <Map />
          </div>

          {/* Bottom Stats – reduced height */}
          {/* Bottom Stats – clean and informative */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[80px] shrink-0">
            <div className="bg-[#1B263B] rounded-xl p-4 flex flex-col justify-center items-start">
              <h4 className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                Medical / Rescue Requests
              </h4>
              <p className="text-2xl font-bold text-white leading-tight">
                53{" "}
                <span className="text-sm font-medium text-gray-300">
                  Reports
                </span>
              </p>
            </div>

            <div className="bg-[#1B263B] rounded-xl p-4 flex flex-col justify-center items-start">
              <h4 className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                Infrastructure Damage
              </h4>
              <p className="text-2xl font-bold text-white leading-tight">
                28{" "}
                <span className="text-sm font-medium text-gray-300">
                  Reports
                </span>
              </p>
            </div>

            <div className="bg-[#1B263B] rounded-xl p-4 flex flex-col justify-center items-start">
              <h4 className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                People Affected
              </h4>
              <p className="text-2xl font-bold text-white leading-tight">
                75{" "}
                <span className="text-sm font-medium text-gray-300">
                  Reports
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Alert Feed */}
        <div className="bg-[#1B263B] rounded-xl p-4 overflow-y-auto h-full">
          <div className="flex items-center mb-2">
            <Bell className="w-5 h-5 text-white animate-shake" />
            <span className="ml-2 text-lg font-semibold">Live Alerts</span>
          </div>
          <AlertFeed />
        </div>
      </div>
    </div>
  );
}
