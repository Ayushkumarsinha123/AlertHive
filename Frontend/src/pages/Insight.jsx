import React from "react";
import { Package, Share, ExternalLink } from "lucide-react";
import StatCard from "../components/StatCard";
import OrderCard from "../components/RelatedPostsCard";
import ProgressBar from "../components/ProgressBar";
import { orderStats, recentOrders } from "../utils/mockData";

const Insight = () => {
  return (
    <div className="min-h-screen dashboard-gradient flex flex-col">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-dashboard-purple flex items-center justify-center mr-3">
            <Package size={20} className="text-white" />
          </div>
          <h1 className="text-white text-xl font-medium">Tracktor</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-white/70 hover:text-white">
            <Share size={18} />
          </button>
          <button className="text-white/70 hover:text-white">
            <ExternalLink size={18} />
          </button>
        </div>
      </header>

      <main className="flex-1 px-6 pb-6">
        <div className="flex flex-col lg:flex-row h-full gap-6">
          {/* Left column - Stats & Cards */}
          <div className="flex-1 flex flex-col">
            {/* Dashboard stats */}
            <div className="mb-8">
              <div className="mb-1 text-white/80 uppercase text-xs tracking-wider">
                LAST 90 DAYS
              </div>
              <div className="flex items-baseline mb-1">
                <div className="text-6xl font-bold text-white">
                  {orderStats.avgDaysToDelivery}
                </div>
              </div>
              <div className="text-xl text-white/90 mb-6">
                Avg Days to Delivery
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6">
                <StatCard label="ORDERS" value={orderStats.totalOrders} />
                <StatCard label="PACKAGES" value={orderStats.packages} />
                <StatCard label="EXCEPTIONS" value={orderStats.exceptions} />
              </div>

              <div className="mb-6">
                <ProgressBar
                  delivered={orderStats.delivered}
                  inTransit={orderStats.inTransit}
                  outForDelivery={orderStats.outForDelivery}
                  exception={orderStats.exception}
                  total={orderStats.totalOrders}
                />
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <StatCard
                  label="DELIVERED"
                  value={orderStats.delivered}
                  className="mb-4"
                />
                <StatCard
                  label="IN TRANSIT"
                  value={orderStats.inTransit}
                  className="mb-4"
                />
                <StatCard
                  label="OUT FOR DELIVERY"
                  value={orderStats.outForDelivery}
                />
                <StatCard label="EXCEPTION" value={orderStats.exception} />
              </div>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>

          {/* Right column - Map visualization */}
          <div className="lg:w-2/3 flex-shrink-0">
            {/* <MapVisualization /> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Insight;
