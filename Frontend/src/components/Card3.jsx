import { useEffect, useState } from 'react';
import { Newspaper, Twitter, Instagram } from "lucide-react";
import { useWebSocket } from '../contexts/WebSocketContext';
import AdminButton from './InsightButton';

// Utility to randomly assign source
function getRandomSource() {
  const sources = ["News", "X", "Instagram"];
  return sources[Math.floor(Math.random() * sources.length)];
}

const sourceIcons = {
  News: <Newspaper className="w-4 h-4 text-blue-600" />,
  X: <Twitter className="w-4 h-4 text-black" />,
  Instagram: <Instagram className="w-4 h-4 text-pink-500" />,
};

export default function Card3({ title, onProgress, onNewItem }) {
  const socket = useWebSocket();
  const [content, setContent] = useState([]); // no initial data
  const [highlightedId, setHighlightedId] = useState(null);
  const [idCounter, setIdCounter] = useState(1);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      onProgress?.(0); // Step 1: Fetching
      const data = JSON.parse(event.data);
      onProgress?.(1); // Step 2: Fetched

      if (data.event === "X_NEWS") {
        const source = data.data.source || getRandomSource();
        const newItem = {
          id: idCounter,
          title: data.data.title || "Untitled",
          source,
          link: data.data.link || "#",
          casualties: data.data.casualties || { injuries: 0, death: 0 }
        };

        setContent(prev => {
          const updated = [newItem, ...prev];
          return updated.slice(0, 5); // limit to last 5
        });

        setHighlightedId(idCounter);
        setIdCounter(prev => prev + 1);
        onNewItem?.(newItem);
        onProgress?.(2); // Step 3: Displayed

        setTimeout(() => {
          setHighlightedId(null);
          onProgress?.(0); // Reset
        }, 2000);
      }

      return () => {
        socket.onmessage = null;
      };
    };
  }, [socket, idCounter, onProgress, onNewItem]);

  return (
    <div>
      {title && (
        <h2 className="text-md font-semibold text-gray-800 mb-2">{title}</h2>
      )}
      <div className="flex-grow space-y-3 overflow-y-auto pr-1">
        {content.length === 0 ? (
          <div className="text-gray-500 text-sm italic px-2">Fetching live data...</div>
        ) : (
          content.map((item) => (
            <a
              key={item.id}
              href='#'
              className={`flex items-center rounded-lg p-2 transition duration-500 border border-[#ddd] ${highlightedId === item.id ? "bg-yellow-100 shadow-lg" : "bg-white hover:shadow"
                }`}
            >
              {sourceIcons[item.source]}
              <span className="text-sm text-gray-700 ml-2">{item.title}</span>
              <div className="ml-auto">
                <AdminButton />
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
