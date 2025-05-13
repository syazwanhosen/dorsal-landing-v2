import { useAppSelector, useAppDispatch } from "@/store";
import { useEffect } from "react";
import { fetchHospitalDetails } from "@/features/hospitalSlice";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export const DetailsCard = () => {
  const dispatch = useAppDispatch();
  const { selectedHospital } = useAppSelector((state) => state.hospitalMap);
  const { currentHospital, detailsLoading } = useAppSelector(
    (state) => state.hospital
  );

  // If no selectedHospital, try fetching from API
  useEffect(() => {
    if (!selectedHospital) return;
    dispatch(fetchHospitalDetails(selectedHospital.name));
  }, [selectedHospital, dispatch]);

  if (detailsLoading) return <div>Loading...</div>;
  if (!selectedHospital || !currentHospital)
    return <div>Hospital not found</div>;

  return (
    <section className="container mx-auto p-4">
      <button
        onClick={() => window.history.back()}
        className="mb-4 text-sm text-gray-600 hover:underline"
      >
        &larr; Back to result
      </button>

      <h2 className="text-2xl font-semibold mb-4">
        {selectedHospital.name}
        {currentHospital.rating && (
          <>
            <span className="text-yellow-500 text-lg ml-2">★</span>
            <span className="text-black text-lg ml-1">
              {currentHospital.rating}
            </span>
          </>
        )}
      </h2>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Map & Contact Info */}
        <div className="w-full sm:w-[60%] border rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            <div className="bg-gray-200 rounded flex items-center justify-center h-full">
              {currentHospital.latitude && currentHospital.longitude ? (
                <MapContainer
                  center={[currentHospital.latitude, currentHospital.longitude]}
                  zoom={15}
                  className="h-full w-full"
                >
                  <TileLayer
                    url={`https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=${
                      import.meta.env.VITE_MAP_ACCESS_TOKEN
                    }`}
                  />
                  <Marker
                    position={[
                      currentHospital.latitude,
                      currentHospital.longitude,
                    ]}
                  >
                    <Popup>{selectedHospital.name}</Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <p className="text-gray-500">Map not available</p>
              )}
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-5">
                Contact Information
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-6 mb-6">
                  <div className="bg-[#6CA724] p-3 rounded-full">
                    <FaMapMarkerAlt className="text-white w-4 h-4" />
                  </div>
                  <p>{currentHospital.address || "Address not available"}</p>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-[#CE3C29] p-3 rounded-full">
                    <FaPhoneAlt className="text-white w-4 h-4" />
                  </div>
                  <p>{currentHospital.phone || "Not available"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Procedure Info Card */}
        <div className="w-full sm:w-[40%] flex flex-col border rounded-lg p-4 shadow-sm">
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-1 flex flex-wrap items-center gap-4">
              {selectedHospital.title}
              {currentHospital.zip_code && (
                <span className="bg-purple text-white text-xs font-semibold px-2 py-1 rounded">
                  CPT Code {currentHospital.zip_code}
                </span>
              )}
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="w-full sm:w-[70%]">
              <p className="text-sm text-black pt-2">
                {selectedHospital.description}
              </p>
            </div>
            <div className="w-full sm:w-[30%] flex flex-col items-end mt-4">
              <span
                className={`px-2 py-1 rounded text-sm font-medium mb-1 ${
                  currentHospital.negotiation_status === "Fixed"
                    ? "bg-[#6CA724] text-white"
                    : "bg-[#CE3C29] text-white"
                }`}
              >
                {currentHospital.negotiation_status || "Fixed Price"}
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
      </div>
    </section>
  );
};
