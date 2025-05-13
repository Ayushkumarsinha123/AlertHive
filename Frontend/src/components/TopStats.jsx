export default function TopStats() {
  return (
    <div className="grid grid-cols-4 bg-white rounded-b-2xl shadow p-4 text-sm text-gray-800">
      <div>
        <p className="text-xs font-semibold">Total Incidents</p>
        <p className="text-2xl font-bold">184</p>
      </div>
      <div>
        <p className="text-xs font-semibold">Disaster Type Breakdown</p>
        <div className="flex items-end gap-2 mt-1">
          <div className="bg-blue-500 w-2 h-6 rounded" />
          <div className="bg-orange-500 w-2 h-4 rounded" />
          <div className="bg-red-500 w-2 h-5 rounded" />
          <div className="bg-purple-500 w-2 h-3 rounded" />
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold">Most Affected Regions</p>
        <p>California, Texas</p>
      </div>
      <div>
        <p className="text-xs font-semibold">Source</p>
        <p>All | All dates</p>
      </div>
    </div>
  );
}
