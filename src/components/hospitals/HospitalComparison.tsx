import React from "react";

export const HospitalComparison = () => {
  return (
    <section id="HospitalComparison" className="container pb-6">
      <h2 className="text-xl font-bold text-left pb-4">
      Compare{" "}
      <span className="bg-gradient-to-b text-transparent bg-clip-text text-purple">
      Between{" "}Hospitals{" "}
      </span>
    </h2>

      <div className="border border-purple-300 rounded-lg overflow-hidden">
        <div className="grid grid-cols-3 text-left text-sm">
          {/* Header Row */}
          <div className="bg-gray-50 p-4 font-semibold">Hospital</div>
          <div className="bg-gray-50 p-4 font-semibold text-center">Monroe Regional Hospital
            <div className="text-xs font-normal text-gray-600">
              400 S Chestnut St, Aberdeen, MS 39730, USA<br />
              (212) 979-4000
            </div>
          </div>
          <div className="bg-gray-50 p-4 font-semibold text-center">Riverview Medical Center
            <div className="text-xs font-normal text-gray-600">
              400 S Chestnut St, Aberdeen, MS 39730, USA<br />
              (212) 979-4000
            </div>
          </div>

          {/* Distance Row */}
          <div className="border-t p-4 font-medium text-gray-700">Distance</div>
          <div className="border-t p-4 text-center">1.6 miles</div>
          <div className="border-t p-4 text-center">2.3 miles</div>

          {/* Rating Row */}
          <div className="border-t p-4 font-medium text-gray-700">Rating</div>
          <div className="border-t p-4 text-center flex justify-center items-center space-x-2">
            <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
            <span className="text-gray-700 text-sm">4.2</span>
          </div>
          <div className="border-t p-4 text-center flex justify-center items-center space-x-2">
            <div className="text-yellow-500">⭐⭐⭐⭐☆</div>
            <span className="text-gray-700 text-sm">4.1</span>
          </div>

          {/* Price Row */}
          <div className="border-t p-4 font-medium text-gray-700">Price</div>
          <div className="border-t p-4 text-center text-purple-600 font-semibold">$1374</div>
          <div className="border-t p-4 text-center text-purple-600 font-semibold">$2457</div>

          {/* Price Type Row */}
          <div className="border-t p-4 font-medium text-gray-700">Price Type</div>
          <div className="border-t p-4 text-center">
            <span className="bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded">
              Fixed Price
            </span>
          </div>
          <div className="border-t p-4 text-center">
            <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
              Negotiated Price
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
