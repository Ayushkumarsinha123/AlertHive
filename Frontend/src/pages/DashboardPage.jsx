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
                <Card title="">
                  This card takes up 70% height.
                </Card>
              </div>
              <div className="flex-grow basis-[30%]">
                <Card2 title="Lower Left Card">
                  This card takes up 30% height.
                </Card2>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-span-12 md:col-span-6 h-full flex flex-col gap-4">
              <div className="flex-grow basis-[70%]">
                <Card3 title="Live Feed">
                </Card3>
              </div>
              <div className="flex-grow basis-[30%]">
                <Card4 title="Lower Right Card">
                  This card takes up 30% height.
                </Card4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
