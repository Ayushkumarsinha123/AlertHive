// src/components/Card.jsx
import React from "react";
import { CircleDot } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet marker fix
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Card({ title }) {
  const position = [30.0668, 79.0193]; // Uttarakhand

  return (
    <div className="bg-white rounded-xl shadow-sm h-full flex flex-col relative overflow-hidden">
      {/* Live Icon */}
      <div className="absolute top-4 left-4 flex items-center gap-1 text-red-600 text-sm font-semibold z-10">
        <CircleDot className="w-3 h-3 animate-pulse" />
        LIVE
      </div>

      {/* Optional Title */}
      {title && (
        <h2 className="text-lg font-semibold text-gray-800 mb-2 z-10 pl-4 pt-4">
          {title}
        </h2>
      )}

      {/* Map Section */}
      <div className="rounded-lg overflow-hidden w-full flex-grow">
        <MapContainer center={position} zoom={7} scrollWheelZoom={false} className="h-full w-full z-0">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              <strong>Uttarakhand</strong><br />
              Click to view insights.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
