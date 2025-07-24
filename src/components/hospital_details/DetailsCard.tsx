import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { fetchHospitalMetadata } from "@/api/Hospital/api";
import { Button } from "../ui/button";

// Resize map after mount to fix size issues
const ResizeMap = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 500);
  }, [map]);
  return null;
};

export const DetailsCard = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [hospitalData, setHospitalData] = useState<any>(null);

  useEffect(() => {
    const name = params.get("name");
    if (!name) return;

    const decodedName = decodeURIComponent(name);

    fetchHospitalMetadata([decodedName])
      .then((responses) => {
        const hospitalDetails = responses[0];
        console.log("✅ Hospital Map Meta Data:", hospitalDetails);
        setHospitalData(hospitalDetails);
      })
      .catch((err) => console.error("❌ Failed to fetch hospital:", err));
  }, [location.search]);

  if (!hospitalData) return <div>Hospital not found</div>;

  return (
    <section className="container mx-auto p-4 relative px-4 sm:px-6 md:px-4 lg:px-8 xl:px-16">
      <h2 className="text-2xl font-semibold mb-4 flex flex-wrap items-center gap-4">
        {hospitalData.name || decodeURIComponent(params.get("name") || "")}
        <span
          className={`px-2 w-fit py-1 mt-2 rounded text-sm font-medium mb-1 ${
            hospitalData.negotiation_status === "Fixed"
              ? "bg-[#6CA724] text-white"
              : "bg-[#CE3C29] text-white"
          }`}
        >
          {(hospitalData.negotiation_status || "Fixed") + " Price"}
        </span>
      </h2>

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-full border rounded-lg p-4 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-full">
            {/* 🌍 Map — 8 Columns */}
            <div className="lg:col-span-8 h-full flex">
              <div className="bg-gray-200 rounded flex-grow flex items-center justify-center lg:min-h-[250px] min-h-[400px]">
                {hospitalData.latitude && hospitalData.longitude ? (
                  <MapContainer
                    center={[hospitalData.latitude, hospitalData.longitude]}
                    zoom={15}
                    className="h-full w-full relative z-0"
                  >
                    <TileLayer
                      url={`https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=${
                        import.meta.env.VITE_MAP_ACCESS_TOKEN
                      }`}
                    />
                    <Marker
                      position={[hospitalData.latitude, hospitalData.longitude]}
                    >
                      <Popup>{hospitalData.name}</Popup>
                    </Marker>
                    <ResizeMap />
                  </MapContainer>
                ) : (
                  <p className="text-gray-500">Map not available</p>
                )}
              </div>
            </div>

            {/* 📞 Contact Info — 4 Columns */}
            <div className="lg:col-span-4 h-full flex flex-col justify-start">
              <h4 className="text-lg font-semibold mb-5">
                Contact Information
              </h4>
              <div className="space-y-2 lg:mb-6">
                <div className="flex items-start gap-6 mb-6">
                  <div className="bg-[#6CA724] p-3 rounded-full">
                    <FaMapMarkerAlt className="text-white w-4 h-4" />
                  </div>
                  <p>{hospitalData.address || "Address not available"}</p>
                </div>
                <div className="flex items-start gap-6 mb-6">
                  <div className="bg-[#CE3C29] p-3 rounded-full">
                    <FaPhoneAlt className="text-white w-4 h-4" />
                  </div>
                  <p>{hospitalData.phone || "Not available"}</p>
                </div>
              </div>
              <Button
                className="mt-4 bg-purple text-white px-12 rounded hover:bg-purple-700 transition self-start"
                onClick={() => (window.location.href = "/")}
              >
                Contact Hospital
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
