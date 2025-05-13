// Mock data for the shipping dashboard
export const orderStats = {
  avgDaysToDelivery: 2.4,
  totalOrders: 1423,
  packages: 1879,
  exceptions: 23,
  delivered: 854,
  inTransit: 312,
  outForDelivery: 235,
  exception: 22,
};

export const recentOrders = [
  {
    id: "ORD-39847",
    status: "in-transit",
    location: "Paris, France Distribution Center",
    timestamp: "10:34 AM",
  },
  {
    id: "ORD-12984",
    status: "delivered",
    location: "London, UK - Recipient",
    timestamp: "Yesterday",
  },
  {
    id: "ORD-58392",
    status: "out-for-delivery",
    location: "New York, USA Local Courier",
    timestamp: "1 hour ago",
  },
];

// Helper functions for order status
export const getStatusColor = (status) => {
  switch (status) {
    case "delivered":
      return "bg-dashboard-accent-teal/20";
    case "in-transit":
      return "bg-dashboard-card-purple/20";
    case "out-for-delivery":
      return "bg-dashboard-accent-orange/20";
    case "exception":
      return "bg-red-500/20";
    default:
      return "bg-gray-200";
  }
};

export const getStatusText = (status) => {
  switch (status) {
    case "delivered":
      return "Delivered";
    case "in-transit":
      return "In Transit";
    case "out-for-delivery":
      return "Out for Delivery";
    case "exception":
      return "Exception";
    case "new":
      return "New Order";
    default:
      return "Unknown Status";
  }
};
