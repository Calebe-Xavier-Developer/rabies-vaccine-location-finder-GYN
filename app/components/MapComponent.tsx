'use client';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import type { LocationType, VaccinationPoint } from '../global.types';
import { useState } from 'react';

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

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = userLocation ? { lat: userLocation.lat, lng: userLocation.lng } : { lat: -16.6869, lng: -49.2648 };

  const getCustomIcon = () => {
    if (window.google?.maps) {
      return {
        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        scaledSize: new window.google.maps.Size(40, 40),
      };
    }
    return undefined;
  };

  return (
    <div style={{ visibility: viewMap ? 'visible' : 'hidden' }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
      >
        {userLocation?.lat !== null && userLocation?.lng !== null && (
          <Marker
            position={{ lat: userLocation.lat, lng: userLocation.lng }}
            icon={getCustomIcon()}
            label={{
              text: 'Você',
              fontSize: '14px',
              color: 'blue',
            }}
          />
        )}
        {vaccinationPoints.map((point: VaccinationPoint, index) => (
          <Marker
            key={`${point.name}-index-${index}`}
            position={{ lat: point.latitude, lng: point.longitude }}
            onMouseOver={() => setActiveMarker(index)}
            onMouseOut={() => setActiveMarker(null)}
            onClick={() => {
              window.open(
                `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${point.latitude},${point.longitude}&travelmode=driving`,
                '_blank'
              );
            }}
          >
            {activeMarker === index && (
              <InfoWindow
                position={{ lat: point.latitude, lng: point.longitude }}
              >
                <div>
                  <h3>{point.name}</h3>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
