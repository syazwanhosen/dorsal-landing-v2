import { useAppSelector} from "@/store";
import { useEffect } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";


export const DetailsCard = () => {
  const { selectedHospital } = useAppSelector((state) => state.hospitalMap);


  useEffect(() => {
    console.log("Persisted Hospital:", selectedHospital); 
  }, [selectedHospital]);

  if (!selectedHospital) return <div>Hospital not found</div>;

  return (
    <>
<section className="container mx-auto p-4">
  {/* Back Button 
  <button
  onClick={() => navigate("/hospitals")} 
  className="mb-4 text-sm text-gray-600 hover:underline">
  &larr; Back to Hospitals
</button>
*/}

  {/* Hospital Name & Rating */}
  <h2 className="text-2xl font-semibold mb-4">
    {selectedHospital.name}

  </h2>

  <div className="flex flex-col sm:flex-row gap-6">
    {/* Map & Contact Info */}
    <div className="w-full sm:w-[60%] border rounded-lg p-4 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        {/* Map Section */}
        <div className="bg-gray-200 rounded flex items-center justify-center sm:h-full">
          {selectedHospital.latitude && selectedHospital.longitude ? (
            <MapContainer
              center={[selectedHospital.latitude, selectedHospital.longitude]}
              zoom={15}
              className="h-[300px] w-full sm:h-full"
            >
              <TileLayer
                url={`https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=${import.meta.env.VITE_MAP_ACCESS_TOKEN}`}
              />
              <Marker position={[selectedHospital.latitude, selectedHospital.longitude]}>
                <Popup>{selectedHospital.name}</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <p className="text-gray-500">Map not available</p>
          )}
        </div>

        {/* Contact Information */}
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

    {/* Procedure Info Card */}
    <div className="w-full sm:w-[40%] flex flex-col border rounded-lg p-4 shadow-sm">
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-1 flex flex-wrap items-center gap-4">
          {selectedHospital.title}
          {selectedHospital.zipcode && (
            <span className="bg-purple text-white text-xs font-semibold px-2 py-1 rounded">
              CPT Code {selectedHospital.zipcode}
            </span>
          )}
        </h3>
      </div>

      {/* Details & Pricing */}
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
      {selectedHospital.negotiation_status || "Fixed Price"} Price
    </span>
    <span className="text-sm text-gray-500">Estimated Cost</span>
    <span className="text-2xl font-bold text-purple">
      ${selectedHospital.price}
    </span>
  </div>
</div>



      {/* Contact Button */}
      <button className="mt-4 bg-purple text-white py-2 px-10 rounded hover:bg-purple-700 transition self-start">
        Contact Hospital
      </button>
    </div>
  </div>
</section>


</>



  );
};
