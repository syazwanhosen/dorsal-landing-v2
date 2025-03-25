import { useState, useEffect } from "react";
import USMap from "./USMap"; // adjust the path as needed
import StatewiseSelectedData from "./StatewiseSelectedData";

interface SearchBarProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  handleReset: () => void;
}

const SearchBar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  handleReset,
}: SearchBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-4 w-full">
      <select
        id="category-select"
        className="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 w-full sm:w-auto"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="" disabled>
          Select Category
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button
        className="bg-purple text-white px-6 py-2 rounded-lg hover:bg-purple-300 w-full sm:w-auto"
        onClick={() => {
          // Add generate heatmap logic later
        }}
      >
        Generate Heatmap
      </button>
      <button
        className="border border-purple-400 text-black px-6 py-2 rounded-lg hover:bg-purple-50 w-full sm:w-auto"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};

const PriceBox = ({ title, state, price, color }: { title: string; state: string; price: string; color: string }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <div className="flex items-center gap-4 mt-1">
        <p className="text-purple text-lg font-bold">{state}</p>
        <span className={`w-3 h-3 ${color} rounded-sm`}></span>
        <span className="text-gray-700 font-medium">{price}</span>
      </div>
    </div>
  );
};

export const StatewisePricing = () => {
  const [stateName, setStateName] = useState("");
  const [priceInfo, setPriceInfo] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://123.200.16.106:3939/statewise_pricing/get_categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleStateHover = (state: string, price: string) => {
    setStateName(state);
    setPriceInfo(price);
  };

  const handleReset = () => {
    setSelectedCategory("");
    setStateName("");
    setPriceInfo("");
  };

  return (
    <section id="StatewisePricing" className="container py-4">
      <div className="grid gap-4">
        <h2 className="text-2xl font-bold">
          Compare{" "}
          <span className="bg-gradient-to-b text-transparent bg-clip-text text-purple">
            Healthcare{" "}
          </span>
          Across The State
        </h2>

        <SearchBar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          handleReset={handleReset}
        />

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="border rounded-lg p-4 shadow-sm w-full lg:w-3/5">
            <h2 className="text-lg font-bold">Overall</h2>
            <div className="w-full h-48 sm:h-64 md:h-80 bg-gray-100 flex items-center justify-center rounded">
              <div id="us-map" className="w-full lg:w-2/3">
                <USMap onStateHover={handleStateHover} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-2/5">

          <div className="p-4 border rounded-lg shadow-sm bg-white">
              <h3 className="text-lg font-semibold text-black">Price Distribution</h3>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-purple text-lg font-bold">New York</p>
                <span className={`w-3 h-3 bg-blue-50 rounded-sm`}></span>
                <span className="text-gray-700 font-medium">$147.87</span>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-purple text-lg font-bold">Minnesota</p>
                <span className={`w-3 h-3 bg-blue-100 rounded-sm`}></span>
                <span className="text-gray-700 font-medium">$730.77</span>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-purple text-lg font-bold">Minnesota</p>
                <span className={`w-3 h-3 bg-blue-200 rounded-sm`}></span>
                <span className="text-gray-700 font-medium">$1313.66</span>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-purple text-lg font-bold">Minnesota</p>
                <span className={`w-3 h-3 bg-blue-300 rounded-sm`}></span>
                <span className="text-gray-700 font-medium">$1896.56</span>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-purple text-lg font-bold">Minnesota</p>
                <span className={`w-3 h-3 bg-blue-400 rounded-sm`}></span>
                <span className="text-gray-700 font-medium">$2479.46</span>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg shadow-sm bg-white">
              <h3 className="text-lg font-semibold text-black">Selected State</h3>
              <div id="data-display" className="flex items-center gap-4 mt-1">
                <p className="text-purple text-lg font-bold">Minnesota</p>
                <span className={`w-3 h-3 bg-blue-300 rounded-sm`}></span>
                <span className="text-gray-700 font-medium">$5697.52</span>
              </div>
            </div>

            <div id="data-display" className="w-full lg:w-1/3">
              <StatewiseSelectedData stateName={stateName} priceInfo={priceInfo} />
            </div>

          </div>
        </div>

        
      </div>
    </section>
  );
};

