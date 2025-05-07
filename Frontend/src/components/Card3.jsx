import { useEffect, useState } from 'react';
import { Newspaper, Twitter, Instagram } from "lucide-react";
import { useWebSocket } from '../contexts/WebSocketContext';

// Utility function to get a random source
function getRandomSource() {
  const sources = ["News", "X", "Instagram"];
  return sources[Math.floor(Math.random() * sources.length)];
}

const sourceIcons = {
  News: <Newspaper className="w-4 h-4 text-blue-600" />,
  X: <Twitter className="w-4 h-4 text-black" />,
  Instagram: <Instagram className="w-4 h-4 text-pink-500" />,
};

export default function Card3({ title, onProgress }) {
  const socket = useWebSocket();
  const [content, setContent] = useState([
    { id: 1, title: "Breaking News: React 19 Released!", source: "News", link: "#" },
    { id: 2, title: "10 Tips for Better UX", source: "X", link: "#" },
    { id: 3, title: "Instagram's New Features", source: "Instagram", link: "#" },
    { id: 4, title: "Why You Should Learn TypeScript", source: "News", link: "#" },
    { id: 5, title: "Trending UI Designs 2025", source: "X", link: "#" },
  ]);

  const [highlightedId, setHighlightedId] = useState(null);
  const [idCounter, setIdCounter] = useState(6);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      onProgress?.(0); // Step 1: Fetching
      const data = JSON.parse(event.data);

      onProgress?.(1); // Step 2: Fetched

      if (data.event === "X_NEWS") {
        const newItem = {
          id: idCounter,
          title: data.data.data.DATA[0].title || "Untitled",
          source: data.data.data.DATA[0].source || getRandomSource(),
          link: data.data.data.DATA[0].link || "#",
        };

        setContent(prev => [newItem, ...prev.slice(0, prev.length - 1)]);
        setHighlightedId(idCounter);
        setIdCounter(prev => prev + 1);

        onProgress?.(2); // Step 3: Displayed

        // Remove highlight after 2s
        setTimeout(() => {
          setHighlightedId(null);

          onProgress?.(0); // 🔁 Reset
        }, 2000);
      }

      return () => {
        socket.onmessage = null;
      };
    };
  }, [socket, idCounter, onProgress]);

  return (
    <div>
      {title && (
        <h2 className="text-md font-semibold text-gray-800 mb-2">{title}</h2>
      )}
      <div className="flex-grow space-y-3 overflow-y-auto pr-1">
        {content.map((item) => (
          <a
            key={item.id}
            href={item.link}
            className={`flex items-center gap-2 rounded-lg p-2 transition duration-500 border border-[#ddd] ${highlightedId === item.id
              ? "bg-yellow-100 shadow-lg"
              : "bg-white hover:shadow"
              }`}
          >
            {sourceIcons[item.source]}
            <span className="text-sm text-gray-700">{item.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
