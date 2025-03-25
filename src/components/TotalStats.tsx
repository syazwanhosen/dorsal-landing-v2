import  { useEffect, useState } from "react";
import { MapPinned, Hospital, Package, Boxes } from "lucide-react"; // Lucide icons for icons
import { fetchStatistics } from "../api/api"; // Import the API utility

export const TotalStats = () => {
  const [apiStats, setApiStats] = useState({
    total_states: 0,
    total_hospitals: 0,
    total_services: 0,
    total_categories: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStatistics(); // Use the utility function
        setApiStats(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchData();
  }, []);


  const stats = [
    { icon: <MapPinned size={28} className="text-purple" />, label: "Total States", value: apiStats.total_states, bgColor: "bg-light-purple" },
    { icon: <Hospital size={28} className="text-green" />, label: "Total Hospitals", value: apiStats.total_hospitals, bgColor: "bg-light-green" },
    { icon: <Package size={28} className="text-red" />, label: "Total Services", value: apiStats.total_services, bgColor: "bg-light-red" },
    { icon: <Boxes size={28} className="text-yellow" />, label: "Total Service Groups", value: apiStats.total_categories, bgColor: "bg-light-yellow" },
  ];

  return (
    <section id="TotalStats" className="container py-8">
      <h2 className="text-2xl font-bold pb-4 text-center sm:text-left">Overview</h2>

      <div className="border rounded-lg p-6 flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row items-stretch justify-between gap-y-6 sm:gap-y-0 relative">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center sm:space-x-4 w-full sm:w-auto lg:pb-0 md:pb-4 sm:pb-4"
          >
            <div className={`p-4 rounded-lg mr-4 ${stat.bgColor}`}>
              {stat.icon}
            </div>
            <div className="mr-4">
              <p className="text-gray-600 text-center sm:text-left text-sm">{stat.label}</p>
              <p className="text-2xl sm:text-3xl font-bold text-left">{stat.value}</p>
            </div>
          </div>
        ))}
        {/* Add dividers using inline styles */}
        {stats.slice(0, -1).map((_, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              height: "70px",
              width: "1px",
              backgroundColor: "#9ca3af30",
              left: `${index === 0 ? 20 : 20 + index * 26.666}%`,
            }}
            className="hidden lg:block"
          />
        ))}
      </div>
    </section>
  );
};
