'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LocationType, VaccinationPoint } from '../global.types';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const userIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  iconSize: [40, 40],
});

const vaccinationIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 30],
});

const isBrowser = typeof window !== 'undefined';

const MapComponent = ({
  userLocation,
  vaccinationPoints,
  viewMap,
}: {
  userLocation: LocationType;
  vaccinationPoints: VaccinationPoint[];
  viewMap: boolean;
}) => {
  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  if (!isBrowser || !userLocation || !vaccinationIcon) {
    return null;
  }

  return (
    <div style={{ visibility: viewMap ? 'visible' : 'hidden' }}>
      <MapContainer center={userLocation} className="h-[400px] max-sm:h-[300px]" zoom={12} style={{ width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {userLocation?.lat && userLocation?.lng && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>Você está aqui</Popup>
          </Marker>
        )}

        {vaccinationPoints.map((point, index) => (
          <Marker
            key={`${point.name}-index-${index}`}
            position={{ lat: point.latitude, lng: point.longitude }}
            icon={vaccinationIcon}
            eventHandlers={{
              click: () => {
                if (isBrowser) {
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${point.latitude},${point.longitude}&travelmode=driving`,
                    '_blank'
                  );
                }
                setActiveMarker(index);
              },
            }}
          >
            {activeMarker === index && (
              <Popup>
                <h3>{point.name}</h3>
                <p>{point.address}</p>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
