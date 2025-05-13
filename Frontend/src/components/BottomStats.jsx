export default function BottomStats() {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <h3 className="text-sm font-semibold">Medical / Rescue Requests</h3>
        <p className="text-2xl font-bold mt-2">53</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <h3 className="text-sm font-semibold">Infrastructure Damage</h3>
        <p className="text-2xl font-bold mt-2">28</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <h3 className="text-sm font-semibold">People Affected</h3>
        <p className="text-2xl font-bold mt-2">75</p>
      </div>
    </div>
  );
}
