'use client'
import { useState } from 'react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./components/MapComponent'), {
  ssr: false,
});
import ListComponent from './components/ListComponent';
import type { LocationType, VaccinationPoint } from './global.types';
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import { locations } from './utils';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

type VaccinationPointWithDistance = VaccinationPoint & {
  distance: number;
  duration: number;
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<LocationType>({ lat: -16.6869, lng: -49.2648 });
  const [viewMap, setViewMap] = useState(false);
  const [viewList, setViewList] = useState(false);
  const [places, setPlaces] = useState<VaccinationPoint[]>(locations);

  const partitionArray = (array: VaccinationPoint[], chunkSize: number): VaccinationPoint[][] => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const fetchDistances = async (origins: LocationType, destinations: VaccinationPoint[]) => {
    try {
      const destinationsPerRequest = 25;
      const destinationBatches = partitionArray(destinations, destinationsPerRequest);

      const allPromises = destinationBatches.map((batch) => {
        const coordinates = batch.map(place => [place.longitude, place.latitude]);
        return fetch('https://api.openrouteservice.org/v2/matrix/driving-car', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.NEXT_PUBLIC_OPENROUTESERVICE_API_KEY || '',
          },
          body: JSON.stringify({
            locations: [[origins.lng, origins.lat], ...coordinates],
            sources: [0],
            destinations: coordinates.map((_, index) => index + 1),
            metrics: ['distance', 'duration'],
          }),
        }).then(response => response.json());
      });

      const responses = await Promise.all(allPromises);

      const combinedDistances: VaccinationPointWithDistance[] = [];
      responses.forEach((response, batchIndex) => {
        response.distances[0].forEach((distance: number, index: number) => {
          const duration = response.durations[0][index];
          const originalIndex = batchIndex * destinationsPerRequest + index;
          combinedDistances.push({
            ...destinations[originalIndex],
            distance: distance / 1000,
            duration: duration / 60,
          });
        });
      });

      combinedDistances.sort((a, b) => a.distance - b.distance);

      return combinedDistances;
    } catch (error) {
      console.error('Erro ao calcular distâncias', error);
      return [];
    }
  };

  const findLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        console.log('Lat:', userLat, 'Long:', userLng);
        setLocation({ lat: userLat, lng: userLng });

        fetchDistances({ lat: userLat, lng: userLng }, places)
          .then((updatedPlaces) => {
            setPlaces(updatedPlaces);
            setLoading(false);
            setViewList(true);
          })
          .catch((error) => {
            console.error('Erro ao calcular distâncias', error);
            setLoading(false);
          });
      },
      (error) => {
        console.error('Erro ao obter localização', error);
        setLoading(false);
      }
    );
  };

  const resetView = () => {
    setViewList(false);
    setViewMap(false);
  };

  const renderButton = () => {
    return (
      <button
        onClick={findLocation}
        className={`w-[200px] h-[200px] rounded-full bg-vibrant-green text-light-beige flex items-center justify-center ${loading ? '' : 'animation-pulse'}`}
        disabled={loading}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <HourglassBottomIcon fontSize="large" className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24" />
            <p>Procurando...</p>
          </div>
        ) : (
          <p className="font-semibold text-lg">Localizar</p>
        )}
      </button>
    );
  };

  return (
    <main className="w-screen max-sm:h-[80vh] min-md:h-[90vh] relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/bg.webp)" }}>
      <div className="flex flex-col items-center w-full h-full">
        {viewList ? (
          <>
            <button onClick={resetView} className="absolute top-4 left-4 text-soft-gold">
              <WestRoundedIcon fontSize="large" />
            </button>

            <button onClick={() => setViewMap(!viewMap)} className={`bg-black bg-opacity-50 hover:bg-opacity-65 h-[33px] w-[130px] mt-4 font-bold text-soft-golden rounded-md ${viewMap && 'max-sm:mb-[55px]'}`}>
              {viewMap ? 'Ver Lista' : 'Ver Mapa'}
            </button>

            <div className={`${viewMap && 'px-5'} mt-4 w-full max-w-3xl`}>
              {viewMap ? (
                <MapComponent userLocation={location} vaccinationPoints={places} viewMap={viewMap} />
              ) : (
                <ListComponent vaccinationPoints={places} userLocation={location} />
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center min-md:mt-[5vh] max-sm:mt-3 max-sm:h-[60vh] min-md:h-[50vh] justify-between max-sm:px-4">
            <div className="w-fit bg-black bg-opacity-50 border-moss-green border-2 rounded-lg p-2 mt-3 text-center">
              <h1 className="max-sm:text-lg min-md:text-4xl font-bold mb-4 text-light-green">Campanha de vacinação Antirrábica 2024 - Goiânia</h1>
              <p className="max-sm:text-sm min-md:text-xl font-semibold text-light-green">Encontre um centro de vacinação próximo a você</p>
            </div>
            {renderButton()}
          </div>
        )}
      </div>
    </main>
  );
}
