import React from "react";
import { MapPin, PhoneCall } from "lucide-react";

export const DetailsCard = () => {
  return (
    <section className="container mx-auto p-4">
      <button className="mb-4 text-sm text-gray-600 hover:underline">
        &larr; Back to result
      </button>

      <h2 className="text-2xl font-semibold mb-4">Monroe Regional Hospital <span className="text-yellow-500 text-lg ml-2">★</span>
      <span className="text-black text-lg ml-1">4.2</span></h2>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Map and Contact Info - 60% width */}
        <div className="w-full sm:w-[60%] border rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                Map Placeholder
            </div>
            <div>
                <h4 className="text-lg font-semibold mb-2">Contact Information</h4>
                <div className="space-y-2">
                <div className="flex items-start gap-2">
                    <MapPin className="text-green-600" />
                    <p>400 S Chestnut St, Aberdeen, New York, NY 10003</p>
                </div>
                <div className="flex items-start gap-2">
                    <PhoneCall className="text-red-500" />
                    <p>(212) 979-4000</p>
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* MRI Info Card - 40% width */}
        <div className="w-full sm:w-[40%] flex flex-col border rounded-lg p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="w-full sm:w-[70%]">
                <h3 className="text-lg font-semibold mb-1">
                    MRI with Contrast <span className="ml-4 bg-purple text-white text-xs font-semibold px-2 py-1 rounded">CPT Code 70010</span>
                </h3>
                <p className="text-sm text-gray-700">
                    MRI, or magnetic resonance imaging, is a method used to visualize structures inside the body. An MRI can be performed on any area of the body, including an arm, a leg, the spine, the head, or the neck.
                </p>
                </div>

                <div className="w-full sm:w-[30%] flex flex-col items-end mt-8">
                <span className="bg-[#6CA724] text-white px-2 py-1 rounded text-sm font-medium mb-1">Fixed Price</span>
                <span className="text-sm text-gray-500">Estimated Cost</span>
                <span className="text-2xl font-bold text-purple">$1374</span>
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
