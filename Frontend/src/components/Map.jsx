// src/components/Map.jsx

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Sample icons for different disaster types
const icons = {
  flood: new Icon({ iconUrl: '/icons/flood.png', iconSize: [30, 30] }),
  fire: new Icon({ iconUrl: '/icons/fire.png', iconSize: [30, 30] }),
  medical: new Icon({ iconUrl: '/icons/medical.png', iconSize: [30, 30] }),
  lightning: new Icon({ iconUrl: '/icons/lightning.png', iconSize: [30, 30] }),
  default: new Icon({ iconUrl: '/icons/marker.png', iconSize: [30, 30] })
};

// Dummy data
const incidents = [
  {
    id: 1,
    type: 'flood',
    location: 'Jackson, MS',
    description: 'Warning from-Culdish Flood',
    position: [32.2988, -90.1848]
  },
  {
    id: 2,
    type: 'fire',
    location: 'Redding, CA',
    description: 'Wildfire spreading rapidly',
    position: [40.5865, -122.3917]
  },
  {
    id: 3,
    type: 'medical',
    location: 'San Juan, PU',
    description: 'Emergency medical aid needed',
    position: [18.4655, -66.1057]
  }
];

export default function Map() {
  return (
    <div className="rounded-xl overflow-hidden shadow-md border h-[500px] w-full">
      <MapContainer
        center={[37.0902, -95.7129]} // USA center
        zoom={4}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {incidents.map((incident) => (
          <Marker
            key={incident.id}
            position={incident.position}
            icon={icons[incident.type] || icons.default}
          >
            <Popup>
              <strong>{incident.location}</strong>
              <br />
              {incident.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
