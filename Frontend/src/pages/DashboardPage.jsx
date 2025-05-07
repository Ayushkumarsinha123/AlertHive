import Navbar from '../components/Navbar';
import Card from '../components/Card1';
import Card2 from '../components/Card2';
import Card3 from '../components/Card3';
import Card4 from '../components/Card4';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-500 p-4">
      {/* Internal Dashboard */}
      <div className="w-full h-full bg-gray-200 rounded-2xl p-6 shadow-md flex flex-col min-h-[calc(100vh-2rem)]">
        {/* Top Section (Navbar + Main Content Area) */}
        <div className="flex flex-col flex-grow min-h-0">
          <Navbar />

          {/* Middle Section fills remaining space */}
          <div className="mt-6 grid grid-cols-12 gap-6 flex-grow min-h-0">
            {/* LEFT COLUMN */}
            <div className="col-span-12 md:col-span-6 h-full flex flex-col gap-4">
              <div className="flex-grow basis-[70%]">
                <Card title="Left Section Card">
                  This card takes up 70% height.
                </Card>
              </div>
              <div className="flex-grow basis-[30%]">
  <Card2 title="Disaster Summary">
    <div className="space-y-2">
      <div className="bg-red-100 text-red-700 px-3 py-2 rounded-lg shadow-sm">
        <h3 className="text-sm font-semibold">Deaths</h3>
        <p className="text-lg font-bold">132</p>
      </div>
      <div className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg shadow-sm">
        <h3 className="text-sm font-semibold">Injuries</h3>
        <p className="text-lg font-bold">289</p>
      </div>
    </div>
  </Card2>
</div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="col-span-12 md:col-span-6 h-full flex flex-col gap-4">
              <div className="flex-grow basis-[70%]">
                <Card3 title="Right Section Card">
                  This card takes up 70% height.
                </Card3>
              </div>
              <div className="flex-grow basis-[30%]">
  <Card4 title="Critical News">
    <div className="space-y-3">
      <div className="bg-red-200 text-red-900 px-3 py-2 rounded-lg shadow-sm">
        <h3 className="text-sm font-semibold">Climate Alert</h3>
        <p className="text-sm">
          Kentucky faces devastating flooding with <span className="font-bold">8 dead</span> and more than a <span className="font-bold">thousand rescued</span>.
        </p>
      </div>
      <div className="bg-red-200 text-red-900 px-3 py-2 rounded-lg shadow-sm">
        <h3 className="text-sm font-semibold">Fire Emergency</h3>
        <p className="text-sm">
          Massive forest fire broke out in <span className="font-bold">Judean Foothills, Israel</span>.
        </p>
      </div>
    </div>
  </Card4>
</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
