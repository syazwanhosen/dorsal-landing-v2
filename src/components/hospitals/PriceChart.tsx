import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ProcedureChartProps {
  prices?: number[];
  hospitalNames?: string[];
}

const PriceChart: React.FC<ProcedureChartProps> = ({ prices = [], hospitalNames = [] }) => {
  const priceRanges = [1000, 3000, 5000, 10000, 15000, 20000]; 

  const minRange = 1000;
  const maxRange = 25000;

  
  const calculateYPosition = (price: number) => {
    const clampedPrice = Math.max(minRange, Math.min(maxRange, price)); 
    const bucketIndex = priceRanges.findIndex((range) => clampedPrice <= range);
    return bucketIndex !== -1 ? bucketIndex : priceRanges.length - 1; 
  };

  const chartData = {
    labels: hospitalNames.length > 0 ? hospitalNames : prices.map((_, i) => `Hospital ${i+1}`),
    datasets: [
      {
        label: "Price ($)",
        data: prices.map(calculateYPosition), 
        borderColor: "rgba(93, 64, 255, 1)",
        backgroundColor: "rgba(93, 64, 255, 0)", 
        borderWidth: 3,
        pointRadius: 5,
        tension: 0.3,
        fill: false, 
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const price = prices[context.dataIndex];
            const name = hospitalNames[context.dataIndex] || `Hospital ${context.dataIndex + 1}`;
            return `${name}: $${price?.toFixed(2) ?? 'N/A'}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: false, 
        grid: { display: false },
        ticks: { display: false }, 
      },
      y: {
        type: "linear",
        min: 0,
        max: priceRanges.length - 1,
        ticks: {
          stepSize: 1,
          callback: (value) => {
            if (typeof value === 'number' && value >= 0 && value < priceRanges.length) {
              return priceRanges[value].toString(); 
            }
            return '';
          },
        },
        grid: { color: "rgba(200, 200, 200, 0.3)" },
        title: {
          display: true,
          text: "Prices ($)", // Set the Y-axis label
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#333", // Adjust text color if needed
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px] flex flex-col">
    {/* Title Section */}
    <div className="flex justify-between mb-2 px-2">
      <h3 className="font-bold text-black pb-4">Distributed Prices</h3>
      <a href="#" className="text-purple text-sm font-semibold hover:underline">Prices</a>
    </div>

    {/* Chart Section - Ensuring Fixed Height */}
    <div className="flex-1">
      <Line data={chartData} options={chartOptions} />
    </div>
  </div>

    
  );
};

export default PriceChart;
