import { Map, MousePointerClick, Users, Package } from "lucide-react"; // Lucide icons for icons

const stats = [
  { icon: <Map size={28} className="text-purple" />, label: "Total States", value: "50", bgColor: "bg-light-purple" },
  { icon: <MousePointerClick size={28} className="text-green" />, label: "Total Hospitals", value: "397", bgColor: "bg-light-green" },
  { icon: <Users size={28} className="text-red" />, label: "Total Services", value: "1500", bgColor: "bg-light-red" },
  { icon: <Package size={28} className="text-yellow" />, label: "Total Service Groups", value: "3,422", bgColor: "bg-light-yellow" },
];

export const TotalStats = () => {
  return (
    <section id="TotalStats" className="container py-8">
      <h2 className="text-2xl font-bold pb-2">
        Overview
      </h2>

      <div className="border rounded-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

  );
};