import { useState, useMemo, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { Icon, LatLngBoundsExpression } from "leaflet";

// Images
import hospital from "../assets/hospital.png";
import location from "../assets/location-pin.svg";

// Types
import {
  HospitalMapProps,
  Hospital,
  ResizeHandlerProps,
  FlyToLocationProps,
} from "../types";

import "leaflet/dist/leaflet.css";

const accessToken = import.meta.env.VITE_MAP_ACCESS_TOKEN;
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const hospitalIcon = new Icon({
  iconUrl: hospital,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const ResizeHandler = ({ sidebarOpen }: ResizeHandlerProps) => {
  const map = useMap();

  useEffect(() => {
    const timeout = setTimeout(() => {
      map.invalidateSize({ animate: true });
    }, 500);
    return () => clearTimeout(timeout);
  }, [sidebarOpen, map]);

  return null;
};

const FlyToLocation = ({ location }: FlyToLocationProps) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo(location, 15, { duration: 1.5 });
    }
  }, [location, map]);

  return null;
};

const FitBounds = ({ hospitals }: { hospitals: Hospital[] }) => {
  const map = useMap();

  useEffect(() => {
    if (hospitals.length === 0) return;

    const bounds: LatLngBoundsExpression = hospitals.map((h) => [
      h.latitude,
      h.longitude,
    ]);
    map.fitBounds(bounds, { padding: [50, 50] }); // Optional padding
  }, [hospitals, map]);

  return null;
};


const HospitalMap = ({ searchResults }: HospitalMapProps) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<
    "lowestPrice" | "shortestDistance"
  >("lowestPrice");
  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | null
  >(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  const sortedHospitals = useMemo(() => {
    return [...hospitals].sort((a, b) => {
      if (sortOption === "lowestPrice") {
        return a.price - b.price;
      } else if (sortOption === "shortestDistance") {
        const distA = parseFloat(a.distance);
        const distB = parseFloat(b.distance);
        return distA - distB;
      }
      return 0;
    });
  }, [sortOption, hospitals]);

  const mapCenter = useMemo<[number, number]>(() => {
    if (sortedHospitals.length > 0) {
      return [sortedHospitals[0].latitude, sortedHospitals[0].longitude];
    }
    return [40.8106, -73.955];
  }, [sortedHospitals]);

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const responses = await Promise.all(
          searchResults.hospital_names.map(async (name: string, index: number) => {
            const encodedName = encodeURIComponent(name);
            const res = await fetch(
              `${baseUrl}/common/hospital_metadata/${encodedName}`
            );
            if (!res.ok) {
              throw new Error(`Failed to fetch data for ${name}`);
            }

            const data = await res.json();

            return {
              ...data.hospital_metadata,
              name: searchResults.hospital_names[index],
              price: searchResults.prices[index],
            } as Hospital;
          })
        );

        setHospitals(responses);
      } catch (error) {
        console.error("Error fetching hospital metadata:", error);
      }
    };

    if (searchResults && searchResults.hospital_names.length) {
      fetchHospitalData();
    }
  }, [searchResults]);

  return (
    <div className="relative flex rounded-xl overflow-hidden border border-purple-200 shadow-md h-[90vh] w-full max-w-screen-2xl mx-auto mt-10">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`absolute z-20 top-4 h-12 w-10 flex items-center justify-center bg-white shadow-sm transition-all duration-300 ${sidebarOpen ? "left-[calc(31%-16px)]" : "left-0"
          } rounded-tr-lg rounded-br-lg`}
      >
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${!sidebarOpen ? "rotate-180" : ""
            }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-[30%]" : "w-0"
          } transition-all duration-500 ease-in-out overflow-hidden bg-white`}
      >
        <div className="p-4 overflow-y-auto h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{hospitals.length} Results</h2>
            <select
              value={sortOption}
              onChange={(e) =>
                setSortOption(
                  e.target.value as "lowestPrice" | "shortestDistance"
                )
              }
              className="border border-gray-300 px-3 py-1 rounded-md text-sm"
            >
              <option value="lowestPrice">Lowest Price</option>
              <option value="shortestDistance">Shortest Distance</option>
            </select>
          </div>

          {sortedHospitals.map((hospital, idx) => (
            <div
              key={idx}
              onClick={() =>
                setSelectedLocation([hospital.latitude, hospital.longitude])
              }
              className="mb-4 border-b border-gray-300 pb-4 cursor-pointer hover:bg-purple-50 p-2 transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{hospital.name}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Compare clicked for ${hospital.name}`);
                  }}
                  className="ml-2 px-3 py-1 text-xs font-medium text-[#8770BC] bg-[#EEEBF4] rounded-full hover:bg-[#e0d9f0] transition"
                >
                  Compare
                </button>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span>⭐ {hospital.rating || 0}</span>
                <span className="flex items-center mx-2">
                  <img src={location} alt="Location Icon" className="w-4 h-4" />
                  {hospital.distance || "10 mi"}
                </span>
              </div>
              <p className="text-sm text-gray-500">{hospital.address}</p>
              <div className="flex justify-between items-center mt-1">
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${hospital.negotiation_status === "Fixed"
                    ? "bg-[#6CA724] text-white"
                    : "bg-[#CE3C29] text-white"
                    }`}
                >
                  {hospital.negotiation_status} Price
                </span>
                <span className="text-[#8770BC] text-xl font-bold">
                  ${hospital.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div
        className={`${sidebarOpen ? "w-[70%]" : "w-full"
          } transition-all duration-500 ease-in-out h-full`}
      >
        <MapContainer
          center={mapCenter}
          zoom={12}
          zoomControl={false}
          className="h-full w-full z-0"
        >
          <ResizeHandler sidebarOpen={sidebarOpen} />
          <FlyToLocation location={selectedLocation} />
          <FitBounds hospitals={sortedHospitals} />
          <TileLayer
            url={`https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=${accessToken}`}
            attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {sortedHospitals.map((h, i) => (
            <Marker
              key={i}
              position={[h.latitude, h.longitude]}
              icon={hospitalIcon}
            >
              <Popup>{h.name}</Popup>
            </Marker>
          ))}
        </MapContainer>

      </div>
    </div>
  );
};

export default HospitalMap;
