'use client'
import { useState } from 'react';
import MapComponent from './components/MapComponent';
import ListComponent from './components/ListComponent';
import type { LocationType, VaccinationPoint } from './global.types';
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import { LoadScript } from '@react-google-maps/api';
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

  const partitionArray = (array: any[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  const findLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        setLocation({ lat: userLat, lng: userLng });

        const destinationsPerRequest = 25;
        const destinationBatches = partitionArray(places, destinationsPerRequest);

        const allPromises = destinationBatches.map((batch) => {
          const destinations = batch.map(place => `${place.latitude},${place.longitude}`).join('|');
          return fetch(`/api/distancematrix?origins=${userLat},${userLng}&destinations=${destinations}`)
            .then(response => response.json());
        });

        Promise.all(allPromises)
          .then(responses => {
            let combinedDistances: VaccinationPointWithDistance[] = [];
            responses.forEach((response, batchIndex) => {
              response.rows[0].elements.forEach((element: any, index: number) => {
                const originalIndex = batchIndex * destinationsPerRequest + index;
                combinedDistances.push({
                  ...places[originalIndex],
                  distance: element.distance.value / 1000,
                  duration: element.duration.value / 60,
                });
              });
            });

            combinedDistances.sort((a, b) => a.distance - b.distance);

            setPlaces(combinedDistances);
            setLoading(false);
            setViewList(true);
          })
          .catch(error => {
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
            <HourglassBottomIcon fontSize="large" className="animate-spin h-5 w-5 mr-3 " viewBox="0 0 24 24" />
            <p>Procurando...</p>
          </div>
        ) : (
          <p className="font-semibold text-lg">Localizar</p>
        )}
      </button>
    )
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
      <main className="w-screen max-sm:h-[calc(100vh-150px)] min-md:h-[calc(100vh-90px)] relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/bg.webp)" }}>
        <div className="flex flex-col items-center w-full h-full" >
          {viewList ? (
            <>
              <button onClick={resetView} className="absolute top-4 left-4 text-soft-gold">
                <WestRoundedIcon fontSize="large" />
              </button>

              <button onClick={() => setViewMap(!viewMap)} className={`bg-black bg-opacity-50 hover:bg-opacity-65 h-[33px] w-[130px] mt-4 font-bold text-soft-golden rounded-md ${viewMap && 'max-sm:mb-[130px]'}`}>
                {viewMap ? 'Ver Lista' : 'Ver Mapa'}
              </button>

              <div className={`${viewMap ? 'px-5' : 'mt-8'} w-full max-w-3xl`}>
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
                <h1 className="max-sm:text-2xl min-md:text-4xl font-bold mb-4 text-light-green">Campanha de vacinação Antirrábica 2024 - Goiânia</h1>
                <p className="mb-8 max-sm:text-base min-md:text-xl font-semibold text-light-green">Encontre um centro de vacinação próximo a você</p>
              </div>
              {renderButton()}
            </div>
          )}
        </div>
      </main>
    </LoadScript>
  );
}
