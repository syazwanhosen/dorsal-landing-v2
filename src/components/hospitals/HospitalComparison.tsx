import { Hospital } from "@/types";

interface HospitalComparisonProps {
  selectedHospitals: Hospital[];
  onRemoveHospital: (hospitalName: string) => void; // Added prop for removal function
}

export const HospitalComparison: React.FC<HospitalComparisonProps> = ({
  selectedHospitals,
  onRemoveHospital,
}) => {
  if (selectedHospitals.length === 0) return null; // Hide table when no hospitals are selected

  return (
    <section id="HospitalComparison" className="pt-5 pb-5">
      <h2 className="text-xl font-bold text-left pb-4 lg:pt-6">
        Compare{" "}
        <span className="bg-gradient-to-b text-transparent bg-clip-text text-purple">
          Between Hospitals
        </span>
      </h2>

      <div className="border border-purple-300 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 text-left text-sm lg:px-20">
          {/* Header Row */}
          <div className="p-4 font-semibold text-lg flex items-center">
            Hospital
          </div>

          {selectedHospitals.map((hospital, idx) => (
            <div
              key={`${hospital.name}-${idx}`} // Ensuring unique key
              className="p-4 font-semibold text-center text-base flex flex-col items-center"
            >
              {hospital.name}
              <div className="text-sm font-normal">
                {hospital.address} <br />
                {hospital.phone}
              </div>

              {/* Fixed Remove Button at Bottom */}
              <button
                onClick={() => onRemoveHospital(hospital.name)}
                className="mt-2 px-3 py-1 text-xs font-medium text-purple bg-purple-100 rounded hover:bg-purple-200 transition"
              >
                Remove
              </button>
            </div>
          ))}
          {selectedHospitals.length === 1 && (
            <div className="lg:p-8 p-4 text-center italic text-gray-400">
              Select another hospital to compare
            </div>
          )}

          {/* Distance Row (Static Value) */}
          <div className="border-t border-gray-200 lg:p-8 p-4 font-medium text-gray-700">Distance</div>
          {selectedHospitals.map(() => (
            <div className="border-t border-gray-200 lg:p-8 p-4 text-center">
              10 miles
            </div>
          ))}
          {selectedHospitals.length === 1 && <div className="border-t border-gray-200 lg:p-8 p-4 text-center"></div>}

          {/* Rating Row (Static Value) */}
          <div className="border-t border-gray-200 lg:p-8 p-4 font-medium text-gray-700">Rating</div>
          {selectedHospitals.map(() => (
            <div  className="border-t border-gray-200 lg:p-8 p-4 flex justify-center items-center space-x-2">
              <div className="text-yellow-500">⭐⭐⭐⭐</div>
              <span className="text-gray-700 text-sm">4.0</span>
            </div>
          ))}
          {selectedHospitals.length === 1 && <div className="border-t border-gray-200 lg:p-8 p-4 text-center"></div>}

          {/* Price Row */}
          <div className="border-t border-gray-200 lg:p-8 p-4 font-medium text-gray-700">Price</div>
          {selectedHospitals.map((hospital, idx) => (
            <div key={`price-${idx}`} className="border-t border-gray-200 lg:p-8 p-4 text-center text-purple font-semibold text-base">
              ${hospital.price}
            </div>
          ))}
          {selectedHospitals.length === 1 && <div className="border-t border-gray-200 lg:p-8 p-4 text-center"></div>}

          {/* Price Type Row */}
          <div className="border-t border-gray-200 lg:p-8 p-4 font-medium text-gray-700">Price Type</div>
          {selectedHospitals.map((hospital, idx) => (
            <div key={`priceType-${idx}`} className="border-t border-gray-200 lg:p-8 p-4 text-center">
              <span className={`px-2 py-1 text-xs font-semibold rounded ${
                hospital.negotiation_status === "Fixed" ? "bg-[#6CA724] text-white" : "bg-[#CE3C29] text-white"
              }`}>
                {hospital.negotiation_status}
              </span>
            </div>
          ))}
          {selectedHospitals.length === 1 && <div className="border-t border-gray-200 p-8 text-center"></div>}
        </div>
      </div>
    </section>
  );
};
