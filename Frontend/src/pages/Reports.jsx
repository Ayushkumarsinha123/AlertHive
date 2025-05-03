// pages/Reports.jsx
import Navbar from '../components/Navbar';
import ReportCard from '../components/ReportCard';

export default function Reports() {
  return (
    <div className="min-h-screen bg-gray-500 p-4">
      <div className="w-full h-full bg-gray-200 rounded-2xl p-6 shadow-md flex flex-col min-h-[calc(100vh-2rem)]">
        <Navbar />

        {/* Full-size Report Card */}
        <div className="flex-grow mt-6">
          <ReportCard title="Current Reports">
            {/* You can map over report data here */}
            <ul className="space-y-2">
              <li className="p-3 bg-gray-100 rounded-lg">⚠️ Earthquake in Region X</li>
              <li className="p-3 bg-gray-100 rounded-lg">🌊 Flood alert in District Y</li>
              <li className="p-3 bg-gray-100 rounded-lg">🔥 Wildfire spreading near Area Z</li>
              {/* Add more items dynamically */}
            </ul>
          </ReportCard>
        </div>
      </div>
    </div>
  );
}
