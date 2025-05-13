import React from "react";
import { X } from "lucide-react";
import { getStatusColor, getStatusText } from "../utils/mockData";

const RelatedPostsCard = ({ order }) => {
  return (
    <div
      className={`${getStatusColor(order.status)} rounded-lg p-4 mb-3 relative`}
    >
      <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        <X size={16} />
      </button>
      <div className="flex items-start">
        <div className="mr-3 mt-1">
          <div className="bg-white bg-opacity-30 p-2 rounded">
            {order.status === "in-transit" && (
              <span className="package">📦</span>
            )}
            {order.status === "delivered" && (
              <span className="delivered">✅</span>
            )}
            {order.status === "out-for-delivery" && (
              <span className="delivery">🚚</span>
            )}
            {order.status === "new" && <span className="new">🔔</span>}
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-800">
            {getStatusText(order.status)}
          </h3>
          <p className="text-gray-600 text-sm">{order.location}</p>
          <p className="text-gray-500 text-xs mt-1">
            {order.id}, {order.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RelatedPostsCard;
