import { Hospital } from "@/types";

interface HospitalComparisonProps {
  selectedHospitals: Hospital[];
}

export const HospitalComparison: React.FC<HospitalComparisonProps> = ({ selectedHospitals }) => {
  if (selectedHospitals.length === 0) return null; // Hide table when no hospitals are selected

  return (
    <section id="HospitalComparison" className="pt-5 pb-5">
      <h2 className="text-xl font-bold text-left pb-4">
        Compare{" "}
        <span className="bg-gradient-to-b text-transparent bg-clip-text text-purple">
          Between Hospitals
        </span>
      </h2>

      <div className="border border-purple-300 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 text-left text-sm">
          {/* Header Row */}
          <div className="bg-gray-50 p-4 font-semibold text-lg">Hospital</div>
          {selectedHospitals.map((hospital) => (
            <div key={hospital.name} className="bg-gray-50 p-4 font-semibold text-center text-base">
              {hospital.name}
              <div className="text-sm font-normal">
                {hospital.address} <br />
                {hospital.phone}
              </div>
            </div>
          ))}
          {selectedHospitals.length === 1 && (
            <div className="bg-gray-50 p-4 text-center italic text-gray-400">
              Select another hospital to compare
            </div>
          )}

          {/* Distance Row (Static Value) */}
          <div className="border-t border-gray-200 p-4 font-medium text-gray-700">Distance</div>
          {selectedHospitals.map(() => (
            <div className="border-t border-gray-200 p-4 text-center">10 miles</div>
          ))}
          {selectedHospitals.length === 1 && <div className="border-t border-gray-200 p-4 text-center"></div>}

          {/* Rating Row (Static Value) */}
          <div className="border-t border-gray-200 p-4 font-medium text-gray-700">Rating</div>
          {selectedHospitals.map(() => (
            <div className="border-t border-gray-200 p-4 flex justify-center items-center space-x-2">
              <div className="text-yellow-500">⭐⭐⭐⭐</div>
              <span className="text-gray-700 text-sm">4.0</span>
            </div>
          ))}
          {selectedHospitals.length === 1 && <div className="border-t border-gray-200 p-4 text-center"></div>}

          {/* Price Row */}
          <div className="border-t border-gray-200 p-4 font-medium text-gray-700">Price</div>
          {selectedHospitals.map((hospital) => (
            <div key={hospital.name} className="border-t border-gray-200 p-4 text-center text-purple font-semibold text-base">
              ${hospital.price}
            </div>
          ))}
          {selectedHospitals.length === 1 && <div className="border-t border-gray-200 p-4 text-center"></div>}

          {/* Price Type Row */}
          <div className="border-t border-gray-200 p-4 font-medium text-gray-700">Price Type</div>
          {selectedHospitals.map((hospital) => (
            <div key={hospital.name} className="border-t border-gray-200 p-4 text-center">
              <span className={`px-2 py-1 text-xs font-semibold rounded ${
                hospital.negotiation_status === "Fixed"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}>
                {hospital.negotiation_status}
              </span>
            </div>
          ))}
          {selectedHospitals.length === 1 && <div className="border-t border-gray-200 p-4 text-center"></div>}
        </div>
      </div>
    </section>
  );
};
