import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { setSelectedHospital } from "@/features/hospitalMapSlice";
import { fetchHospitalMetadata } from "@/api/Hospital/api";

// ⏱ Resize map after mount to fix size issues
const ResizeMap = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 500);
  }, [map]);
  return null;
};

export const DetailsCard = () => {
  const dispatch = useAppDispatch();
  const { selectedHospital } = useAppSelector((state) => state.hospitalMap);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const service = params.get("service");

  // 🔐 Decode encoded context (title, description, price, negotiation)
  const rawContext = params.get("context");
  let enrichedContext: any = null;

  if (rawContext) {
    try {
      enrichedContext = JSON.parse(atob(rawContext));
    } catch (err) {
      console.error("❌ Failed to decode hospital context:", err);
    }
  }

  useEffect(() => {
    const name = params.get("name");
    if (!name) return;

    const decodedName = decodeURIComponent(decodeURIComponent(name));
    const decodedService = decodeURIComponent(decodeURIComponent(params.get("service") || ""));
    const decodedCode = decodeURIComponent(params.get("code") || "");


    

    fetchHospitalMetadata([decodedName])
      .then((responses) => {
        const hospitalData = responses[0];
        console.log("✅ Hospital API Response:", hospitalData);
        console.log("Context CPT Code:", enrichedContext?.selectedCptCode);
        console.log("Final CPT Code to Dispatch:", enrichedContext?.selectedCptCode || decodedCode);
        
        
        dispatch(
          setSelectedHospital({
            ...hospitalData,
            name: decodedName,
            title: enrichedContext?.title || decodedService || "Procedure not specified",
            description: enrichedContext?.description || hospitalData.description || "No description available.",
            price: enrichedContext?.price ?? hospitalData.price ?? 0,
            negotiation_status: enrichedContext?.negotiation_status || hospitalData.negotiation_status || "Fixed",
            selectedCptCode: enrichedContext?.selectedCptCode || decodedCode || hospitalData.selectedCptCode || "",

          })
        );
      })
      .catch((err) => console.error("❌ Failed to fetch hospital:", err));
  }, [location.search]);

  if (!selectedHospital) return <div>Hospital not found</div>;

  return (
    <section className="container mx-auto p-4 relative">
      <h2 className="text-2xl font-semibold mb-4">{selectedHospital.name}</h2>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* 🗺️ Map + Contact Info Section */}
        <div className={`${service ? "w-full sm:w-[60%]" : "w-full"} border rounded-lg p-4 shadow-sm relative overflow-hidden`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            <div className="bg-gray-200 rounded flex items-center justify-center sm:h-full relative z-0">
              {selectedHospital.latitude && selectedHospital.longitude ? (
                <MapContainer
                  center={[selectedHospital.latitude, selectedHospital.longitude]}
                  zoom={15}
                  className="h-[300px] w-full relative z-0"
                >
                  <TileLayer
                    url={`https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=${import.meta.env.VITE_MAP_ACCESS_TOKEN}`}
                  />
                  <Marker position={[selectedHospital.latitude, selectedHospital.longitude]}>
                    <Popup>{selectedHospital.name}</Popup>
                  </Marker>
                  <ResizeMap />
                </MapContainer>
              ) : (
                <p className="text-gray-500">Map not available</p>
              )}
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-5">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-6 mb-6">
                  <div className="bg-[#6CA724] p-3 rounded-full">
                    <FaMapMarkerAlt className="text-white w-4 h-4" />
                  </div>
                  <p>{selectedHospital.address || "Address not available"}</p>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-[#CE3C29] p-3 rounded-full">
                    <FaPhoneAlt className="text-white w-4 h-4" />
                  </div>
                  <p>{selectedHospital.phone || "Not available"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🩺 Procedure Info Section */}
        {service && (
          <div className="w-full sm:w-[40%] flex flex-col border rounded-lg p-4 shadow-sm">
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-1 flex flex-wrap items-center gap-4">
                {selectedHospital.title}
                {selectedHospital.selectedCptCode && (
                  <span className="bg-purple text-white text-xs font-semibold px-2 py-1 rounded">
                    CPT Code {selectedHospital.selectedCptCode}
                  </span>
                )}
                {selectedHospital.zipcode && (
                  <span className="bg-purple text-white text-xs font-semibold px-2 py-1 rounded">
                    Zipcode {selectedHospital.zipcode}
                  </span>
                )}
              </h3>
            </div>

            <div className="grid grid-cols-10 gap-4 h-full">
              <div className="col-span-12 lg:col-span-7">
                <p className="text-sm text-black pt-2">{selectedHospital.description}</p>
              </div>
              <div className="col-span-12 lg:col-span-3 flex flex-col lg:items-end lg:justify-center">
                <span
                  className={`px-2 w-fit py-1 rounded text-sm font-medium mb-1 ${
                    selectedHospital.negotiation_status === "Fixed"
                      ? "bg-[#6CA724] text-white"
                      : "bg-[#CE3C29] text-white"
                  }`}
                >
                  {selectedHospital.negotiation_status || "Fixed Price"}
                </span>
                <span className="text-sm text-gray-500">Estimated Cost</span>
                <span className="text-2xl font-bold text-purple">
                  ${selectedHospital.price}
                </span>
              </div>
            </div>

            <button className="mt-4 bg-purple text-white py-2 px-10 rounded hover:bg-purple-700 transition self-start">
              Contact Hospital
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
