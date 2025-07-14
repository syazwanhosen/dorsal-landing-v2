import React from "react";

const hospitalData = [
  {
    rank: 1,
    name: "Overcharge General Hospital",
    location: "New York, NY",
    rate: "15.2%",
    score: "$$$$",
    amount: "$12,500",
  },
  {
    rank: 2,
    name: "Costly Care Medical Center",
    location: "Los Angeles, CA",
    rate: "13.8%",
    score: "$$$",
    amount: "$9,800",
  },
  {
    rank: 3,
    name: "High Price Health System",
    location: "Chicago, IL",
    rate: "12.5%",
    score: "$$$",
    amount: "$11,200",
  },
  {
    rank: 4,
    name: "Expensive Emergency Network",
    location: "Houston, TX",
    rate: "11.9%",
    score: "$$",
    amount: "$7,500",
  },
];

export const NameAndShame = () => {
  return (
    <div className="bg-white py-16 px-4 md:px-10">
      <div className="text-center mb-6">
        <span className="text-xs font-semibold uppercase text-purple-500 tracking-wide">
          Name and Shame
        </span>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-2">
          Top Overbilling Hospitals
        </h2>
        <p className="mt-2 text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          We're tracking hospitals with the highest patient complaint rates about overbilling.
          Updated daily to help you avoid excessive medical bills.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-purple-600 text-white text-left text-sm">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Hospital / Network</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Incident Rate</th>
              <th className="px-4 py-3">Overbilling Score</th>
              <th className="px-4 py-3">Avg Bill Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
            {hospitalData.map((item) => (
              <tr key={item.rank}>
                <td className="px-4 py-3">{item.rank}</td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.location}</td>
                <td className="px-4 py-3">{item.rate}</td>
                <td className="px-4 py-3">{item.score}</td>
                <td className="px-4 py-3">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
