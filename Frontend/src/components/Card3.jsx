import { useEffect } from 'react';
import { Newspaper, Twitter, Instagram } from "lucide-react";

import { useWebSocket } from '../contexts/WebSocketContext';

const dummyContent = [
  { title: "Breaking News: React 19 Released!", source: "News", link: "#" },
  { title: "10 Tips for Better UX", source: "X", link: "#" },
  { title: "Instagram's New Features", source: "Instagram", link: "#" },
  { title: "Why You Should Learn TypeScript", source: "News", link: "#" },
  { title: "Trending UI Designs 2025", source: "X", link: "#" },
];

const sourceIcons = {
  News: <Newspaper className="w-4 h-4 text-blue-600" />,
  X: <Twitter className="w-4 h-4 text-black" />,
  Instagram: <Instagram className="w-4 h-4 text-pink-500" />,
};

export default function Card3({ title }) {
  const socket = useWebSocket()

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      console.log(event)
      const data = JSON.parse(event.data);
      if (data.eventType === "BED_REQUEST_ACK") {
        console.log("Received BED_REQUEST_ACK:", data);
        // You can update UI here
      }
    };

    // Optional: cleanup
    return () => {
      socket.onmessage = null;
    };
  }, [socket]);

  return (
    <div className="">
      {title && (
        <h2 className="text-md font-semibold text-gray-800 mb-2">{title}</h2>
      )}
      <div className="flex-grow space-y-3 overflow-y-auto pr-1 ">
        {dummyContent.map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            className="flex items-center gap-2 bg-white rounded-lg p-2 hover:shadow transition duration-200 border border-[#ddd]"
          >
            {sourceIcons[item.source]}
            <span className="text-sm text-gray-700">{item.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
