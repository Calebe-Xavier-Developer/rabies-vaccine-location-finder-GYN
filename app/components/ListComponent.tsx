'use client';
import { type VaccinationPoint } from "../global.types";
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const isBrowser = typeof window !== 'undefined';

const ListComponent = ({ vaccinationPoints, userLocation }: { vaccinationPoints: VaccinationPoint[], userLocation: { lat: number, lng: number } }) => {
  return (
    <div className="w-full overflow-y-scroll overflow-x-hidden custom-scrollbar h-[79vh] max-sm:h-[66vh] px-3">
      {vaccinationPoints.map((point, index) => (
        <div key={`list-${point.name}-index-${index}`} className="w-full bg-black border-soft-gold bg-opacity-50 hover:bg-opacity-65 p-4 border-3 rounded-lg flex justify-between items-center mb-3 max-sm:flex-col">
          <div className="w-full flex items-start max-sm:items-center justify-between text-soft-gold">
            <h3
              title={point.name}
              className="font-semibold mr-2"
              style={{
                maxHeight: '70px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {point.name}
            </h3>

            <div className="mr-3">
              <p className="flex items-center text-nowrap">
                <DirectionsCarRoundedIcon className="mr-1" />
                {point.distance.toFixed(1)} KM
              </p>
              <p className="flex items-center text-nowrap">
                <AccessTimeRoundedIcon className="mr-1" />
                {point.duration.toFixed(1)} min
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (isBrowser) {
                window.open(
                  `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${point.latitude},${point.longitude}&travelmode=driving`,
                  '_blank'
                );
              }
            }}
            className="flex items-center text-[#0051D6] hover:text-[#00B2FF] underline"
          >
            <LocationOnIcon />
            <p>Rota</p>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListComponent;
