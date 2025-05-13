export default function AlertFeed() {
  return (
    <div className="bg-white p-4 rounded-xl shadow w-full">
      <h2 className="text-lg font-semibold mb-4">Alerts</h2>
      <div className="space-y-4 text-sm text-gray-800">
        <div className="flex items-start space-x-3">
          <div className="w-4 h-4 bg-blue-500 rounded-full mt-1" />
          <div>
            <p className="font-semibold">Flood Warning</p>
            <p className="text-gray-600">Jackson, MS • 12 min ago</p>
            <p className="text-xs text-gray-500">Warning from-Culdish Flood at</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="w-4 h-4 bg-red-500 rounded-full mt-1" />
          <div>
            <p className="font-semibold">Wildfire Spread</p>
            <p className="text-gray-600">Redding, CA • 26 min ago</p>
            <p className="text-xs text-gray-500">Wildfire hear, Redding, Wednesday</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="w-4 h-4 bg-green-500 rounded-full mt-1" />
          <div>
            <p className="font-semibold">Emergency Medical Supplies</p>
            <p className="text-gray-600">San Juan, PU • 42 min ago</p>
            <p className="text-xs text-gray-500">Medical supplies food, water, H/X</p>
          </div>
        </div>
      </div>
    </div>
  );
}
