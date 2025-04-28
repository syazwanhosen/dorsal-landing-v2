import { useState, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from 'leaflet';
import hospital from '../assets/hospital.png';
import "leaflet/dist/leaflet.css";

type Hospital = {
    name: string;
    rating: number;
    distance: string;
    price: number;
    priceType: "Fixed" | "Negotiated";
    location: [number, number];
    address: string;
};

type ResizeHandlerProps = {
    sidebarOpen: boolean;
};

type FlyToLocationProps = {
    location: [number, number] | null;
};

const hospitalIcon = new Icon({
    iconUrl: hospital,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
});

const hospitals: Hospital[] = [
    {
        name: "Monroe Regional Hospital",
        rating: 4.2,
        distance: "5.6 mi",
        price: 2457,
        priceType: "Fixed",
        location: [40.8106, -73.955],
        address: "400 S Chestnut St, Aberdeen, MS 39730, USA"
    },
    {
        name: "Sharp Memorial Hospital",
        rating: 3.9,
        distance: "12.3 mi",
        price: 1976,
        priceType: "Fixed",
        location: [40.740, -73.980],
        address: "7901 Frost St, San Diego, CA 92123, USA"
    },
    {
        name: "Riverview Medical Center",
        rating: 4.1,
        distance: "18.5 mi",
        price: 3291,
        priceType: "Negotiated",
        location: [40.680, -74.020],
        address: "1 Riverview Plaza, Red Bank, NJ 07701, USA"
    },
    {
        name: "Bayshore Community Hospital",
        rating: 4.0,
        distance: "25.2 mi",
        price: 1374,
        priceType: "Fixed",
        location: [40.720, -74.070],
        address: "727 N Beers St, Holmdel, NJ 07733, USA"
    },
    {
        name: "Mount Sinai Hospital",
        rating: 4.5,
        distance: "32.8 mi",
        price: 4150,
        priceType: "Negotiated",
        location: [40.790, -73.950],
        address: "1468 Madison Ave, New York, NY 10029, USA"
    },
    {
        name: "NewYork-Presbyterian Hospital",
        rating: 4.6,
        distance: "40.2 mi",
        price: 5100,
        priceType: "Fixed",
        location: [40.840, -73.940],
        address: "630 W 168th St, New York, NY 10032, USA"
    },
    {
        name: "Lenox Hill Hospital",
        rating: 4.4,
        distance: "48.7 mi",
        price: 3890,
        priceType: "Negotiated",
        location: [40.773, -73.962],
        address: "100 E 77th St, New York, NY 10075, USA"
    },
    {
        name: "Harlem Hospital Center",
        rating: 3.8,
        distance: "52.1 mi",
        price: 2800,
        priceType: "Fixed",
        location: [40.813, -73.940],
        address: "506 Lenox Ave, New York, NY 10037, USA"
    }
];


const accessToken = "zt7wt1ZXSBmlye8q8IQ6HuOv6p4idsbIbLl3Qi2ns2X4ZcbQbarIZpGE6YAkfi6L";

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

const HospitalMap = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [sortOption, setSortOption] = useState<"lowestPrice" | "shortestDistance">("lowestPrice");
    const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);

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
    }, [sortOption]);

    return (
        <div className="relative flex rounded-xl overflow-hidden border border-purple-200 shadow-md h-[90vh] w-full max-w-screen-2xl mx-auto mt-10">
            {/* Sidebar Toggle Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`absolute z-20 top-4 h-12 w-10 flex items-center justify-center bg-white shadow-sm transition-all duration-300 ${sidebarOpen ? 'left-[calc(31%-16px)]' : 'left-0'
                    } rounded-tr-lg rounded-br-lg`}
            >
                <svg
                    className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''
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
            <div className={`${sidebarOpen ? "w-[30%]" : "w-0"} transition-all duration-500 ease-in-out overflow-hidden bg-white`}>
                <div className="p-4 overflow-y-auto h-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">{hospitals.length} Results</h2>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value as "lowestPrice" | "shortestDistance")}
                            className="border border-gray-300 px-3 py-1 rounded-md text-sm"
                        >
                            <option value="lowestPrice">Lowest Price</option>
                            <option value="shortestDistance">Shortest Distance</option>
                        </select>
                    </div>

                    {sortedHospitals.map((hospital, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedLocation(hospital.location)}
                            className="mb-4 border-b pb-4 cursor-pointer hover:bg-purple-50 p-2 rounded transition"
                        >
                            <h3 className="text-lg font-semibold">{hospital.name}</h3>
                            <div className="flex items-center text-sm text-gray-600">
                                <span>⭐ {hospital.rating}</span>
                                <span className="mx-2">📍 {hospital.distance}</span>
                            </div>
                            <p className="text-sm text-gray-500">{hospital.address}</p>
                            <div className="flex justify-between items-center mt-1">
                                <span
                                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${hospital.priceType === "Fixed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {hospital.priceType} Price
                                </span>
                                <span className="text-purple-700 font-bold text-lg">${hospital.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Map */}
            <div className={`${sidebarOpen ? "w-[70%]" : "w-full"} transition-all duration-500 ease-in-out h-full`}>
                <MapContainer
                    center={[40.8106, -73.955]}
                    zoom={12}
                    zoomControl={false}
                    className="h-full w-full z-0"
                >
                    <ResizeHandler sidebarOpen={sidebarOpen} />
                    <FlyToLocation location={selectedLocation} />
                    <TileLayer
                        url={`https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=${accessToken}`}
                        attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {sortedHospitals.map((h, i) => (
                        <Marker key={i} position={h.location} icon={hospitalIcon}>
                            <Popup>{h.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default HospitalMap;
