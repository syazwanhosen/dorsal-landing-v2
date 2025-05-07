import React from "react";

export const OtherServices = () => {
  return (
    <section className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Filter Card */}
      <div className="border rounded-lg p-4 shadow-sm col-span-1">
        <h3 className="text-md font-semibold mb-4">Other Services</h3>
        <select className="w-full border rounded px-3 py-2 text-sm mb-4">
          <option>Select Service Category</option>
          <option>Medicine</option>
          <option>Radiology</option>
          <option>Surgery</option>
        </select>
        <button className="w-full bg-purple text-white py-2 px-4 rounded hover:bg-purple-700 transition mb-2">
          Show Services
        </button>
        <button className="w-full border border-purple-400 text-black py-2 px-4 rounded hover:bg-purple-50 transition">
          Reset
        </button>
      </div>

      {/* Services Table */}
      <div className="col-span-1 lg:col-span-3 border rounded-lg p-4 shadow-sm">
        <h3 className="text-md font-semibold mb-4">Medicine</h3>
        <table className="w-full text-left text-sm border-separate border-spacing-y-2">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 px-2 font-medium text-gray-700">CPT Code</th>
              <th className="py-2 px-2 font-medium text-gray-700">Service Name</th>
              <th className="py-2 px-2 font-medium text-gray-700">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              { code: "123", name: "EMERGENCY INTUBATION" },
              { code: "345", name: "CRYO LESIONS" },
              { code: "456", name: "WOUND EXPLORATION" },
              { code: "768", name: "EXCISION LESIONS" },
              { code: "901", name: "BLOOD PATCH" },
            ].map((item) => (
              <tr key={item.code} className="border-b border-gray-200">
                <td className="py-2 px-2">{item.code}</td>
                <td className="py-2 px-2">{item.name}</td>
                <td className="py-2 px-2 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
