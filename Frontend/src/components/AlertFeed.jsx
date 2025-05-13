import { AlertTriangle, Flame, BriefcaseMedical } from "lucide-react";
import { useWebSocket } from "../contexts/WebSocketContext";
import { useEffect } from "react";

const alerts = [
  {
    id: 1,
    title: "Flood Warning",
    location: "Jackson, MS",
    time: "12 min ago",
    description: "Issued by Culdish Authority at River Bend.",
    icon: AlertTriangle,
    color: "bg-blue-500/20 text-blue-400",
  },
  {
    id: 2,
    title: "Wildfire Spread",
    location: "Redding, CA",
    time: "26 min ago",
    description: "Rapid spread in north forest zone, containment needed.",
    icon: Flame,
    color: "bg-red-500/20 text-red-400",
  },
  {
    id: 3,
    title: "Medical Supply Drop",
    location: "San Juan, PR",
    time: "42 min ago",
    description: "Delivery of critical medical kits, water & aid.",
    icon: BriefcaseMedical,
    color: "bg-green-500/20 text-green-400",
  },
];

export default function AlertFeed() {
  const socket = useWebSocket();

  useEffect(() => {
    if (!socket) {
      console.error("WebSocket is not initialized.");
      return;
    }

    // Log when WebSocket connection is opened
    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    // Log any WebSocket errors
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Log when WebSocket is closed
    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log("WebSocket closed cleanly.");
      } else {
        console.error("WebSocket closed with an error.");
      }
    };

    // Handle incoming messages
    socket.onmessage = (event) => {
      console.log("Received WebSocket message:", event);
      const data = JSON.parse(event.data);
      console.log("Parsed WebSocket data:", data);
    };

    return () => {
      // Cleanup on component unmount
      socket.onmessage = null;
      socket.onopen = null;
      socket.onerror = null;
      socket.onclose = null;
    };
  }, [socket]);

  return (
    <div className="bg-[#1B263B] p-6 rounded-2xl w-full text-white">
      <div className="flex flex-col gap-4">
        {alerts.map(
          ({ id, title, location, time, description, icon: Icon, color }) => (
            <div
              key={id}
              className="group flex items-start gap-4 p-4 rounded-xl bg-[#0D1B2A] hover:bg-[#122640] transition-colors duration-200 shadow-md"
            >
              <div
                className={`rounded-full w-11 h-11 flex items-center justify-center backdrop-blur-sm ${color} shadow-inner`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-semibold">{title}</h3>
                  <span className="text-xs text-gray-400">{time}</span>
                </div>
                <p className="text-sm text-gray-300">{location}</p>
                <p className="text-xs text-gray-400 mt-1">{description}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
