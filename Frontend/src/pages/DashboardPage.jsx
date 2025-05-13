import { useState } from 'react';
import Navbar from '../components/Navbar';
import Map from '../components/Map'; // This should display icons based on incident types
import AlertFeed from '../components/AlertFeed'; // For right-hand side alert list
import TopStats from '../components/TopStats'; // New small stat card component

export default function Dashboard() {
  const [latestItem, setLatestItem] = useState(null);

  return (
    <div className="min-h-screen bg-[#0D1B2A] p-4 text-white">
      {/* Navbar / Header */}
      <Navbar />

      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
        <div className="bg-[#1B263B] rounded-xl p-4">
          <h2 className="text-sm font-semibold">Total Incidents</h2>
          <p className="text-3xl font-bold">184</p>
        </div>
        <div className="bg-[#1B263B] rounded-xl p-4 md:col-span-2">
          <h2 className="text-sm font-semibold">Disaster Type Breakdown</h2>
          {/* Placeholder for chart */}
          <div className="h-16 bg-[#415A77] rounded-md mt-2 flex items-center justify-center">
            [Chart Placeholder]
          </div>
        </div>
        <div className="bg-[#1B263B] rounded-xl p-4">
          <h2 className="text-sm font-semibold">Most Affected Regions</h2>
          <p className="text-md mt-1">California, Texas</p>
        </div>
      </div>

      {/* Map + Feed Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {/* Map Display */}
        <div className="md:col-span-2 bg-white rounded-xl overflow-hidden">
          <Map />
        </div>

        {/* Alerts Feed */}
        <div className="bg-[#1B263B] rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-2">Live Alerts</h3>
          <AlertFeed />
        </div>
      </div>

      {/* Bottom Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <TopStats title="Medical / Rescue Requests" value={53} />
        <TopStats title="Infrastructure Damage" value={28} />
        <TopStats title="People Affected" value={75} />
      </div>
    </div>
  );
}
