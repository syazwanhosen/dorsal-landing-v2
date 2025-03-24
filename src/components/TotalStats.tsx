import { MapPinned, Hospital, Package, Boxes } from "lucide-react"; // Lucide icons for icons

// Provided JSON data
const apiStats = {
  total_states: 29,
  total_hospitals: 187,
  total_services: 18960,
  total_categories: 5,
};

// Updated stats array using the JSON data
const stats = [
  { icon: <MapPinned size={28} className="text-purple" />, label: "Total States", value: apiStats.total_states, bgColor: "bg-light-purple" },
  { icon: <Hospital size={28} className="text-green" />, label: "Total Hospitals", value: apiStats.total_hospitals, bgColor: "bg-light-green" },
  { icon: <Package size={28} className="text-red" />, label: "Total Services", value: apiStats.total_services, bgColor: "bg-light-red" },
  { icon: <Boxes size={28} className="text-yellow" />, label: "Total Service Groups", value: apiStats.total_categories, bgColor: "bg-light-yellow" },
];

export const TotalStats = () => {
  return (
    <section id="TotalStats" className="container py-8">
      <h2 className="text-2xl font-bold pb-4 text-center sm:text-left">
        Overview
      </h2>

      <div className="border rounded-lg p-6 flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row items-stretch justify-between gap-y-6 sm:gap-y-0 relative">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center sm:space-x-4 w-full sm:w-auto lg:pb-0 md:pb-4 sm:pb-4" // Added md:pb-6 for medium screens
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
              top: "45%",
              transform: "translateY(-50%)",
              height: "70px", 
              width: "1px",
              backgroundColor: "#9ca3af30", 
              left: `${index === 0 ? 20 : 20 + (index * 26.666)}%`, 
            }}
            className="hidden lg:block"
          />
        ))}
      </div>
    </section>
  );
};