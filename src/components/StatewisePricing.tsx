import { useState, useEffect } from "react";
import USMap from "./USMap";
import SearchBar from "./SearchBar";
import DataDisplay from "./DataDisplay";
import { stateNames } from "../utils/stateUtils";

export const StatewisePricing = () => {
  const [stateName, setStateName] = useState("");
  const [pricingData, setPricingData] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://123.200.16.106:3939/statewise_pricing/get_categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    setStateName("");
    setPricingData({});
  }, [selectedCategory]);

  const handleReset = () => {
    setSelectedCategory("");
    setStateName("");
    setPricingData({});
  };

  const loadPricingData = () => {
    if (!selectedCategory) return alert("Please select a category first");

    fetch(`http://123.200.16.106:3939/statewise_pricing/get_pricing/${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => {
        const processed: Record<string, number> = {};

        for (const state in data) {
          let value = data[state]?.avg ?? data[state];
          if (value !== null && value !== undefined) {
            let abbr = state.length === 2 ? state.toUpperCase() : "";
            if (!abbr) {
              for (const fips in stateNames) {
                if (stateNames[fips].name.toLowerCase() === state.toLowerCase()) {
                  abbr = stateNames[fips].abbr;
                  break;
                }
              }
            }
            if (abbr) processed[abbr] = parseFloat(value);
          }
        }

        setPricingData(processed);
      })
      .catch((err) => {
        console.error("Error fetching pricing data:", err);
        alert("Failed to load pricing data. Try again.");
      });
  };

  const prices = Object.values(pricingData).filter((p) => !isNaN(p));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const getColor = (price: number) => {
    const opacity = isNaN(price) || maxPrice === minPrice ? 0.2 : 0.2 + 0.8 * ((price - minPrice) / (maxPrice - minPrice));
    return `rgba(67, 97, 238, ${opacity})`;
  };

  const getAbbr = (name: string) => Object.values(stateNames).find(s => s.name === name)?.abbr || "";
  const selectedAbbr = getAbbr(stateName);
  const selectedPrice = pricingData[selectedAbbr] ?? 0;
  const selectedColor = getColor(selectedPrice);

  const generateLegendSteps = () => {
    const steps = 5;
    const increment = (maxPrice - minPrice) / (steps - 1);
  
    return Array.from({ length: steps }, (_, i) => {
      const value = parseFloat((minPrice + i * increment).toFixed(2));
      const opacity = 0.2 + 0.8 * (i / (steps - 1));
  
      let matchedState = "N/A";
      for (const [abbr, val] of Object.entries(pricingData)) {
        if (parseFloat(val.toFixed(2)) === value) {
          matchedState = Object.values(stateNames).find((s) => s.abbr === abbr)?.name || abbr;
          break;
        }
      }
  
      return {
        state: matchedState,
        value,
        color: `rgba(67, 97, 238, ${opacity})`,
      };
    });
  };
  
  const legendSteps = generateLegendSteps();
  
  return (
    <section id="StatewisePricing" className="container px-4 md:px-6 py-6">
  <div className="grid gap-6">
    <h2 className="text-2xl md:text-3xl font-bold text-center lg:text-left">
      Compare{" "}
      <span className="bg-gradient-to-b text-transparent bg-clip-text text-purple">
        Healthcare{" "}
      </span>
      Across The State
    </h2>

    <div className="flex flex-col lg:flex-row gap-6">
      {/* US Map Card */}
      <div className="border rounded-lg p-4 shadow-sm w-full lg:w-2/3">
        <h2 className="text-lg font-semibold text-center lg:text-left mb-2">
          {selectedCategory || "Select a Service Category to Begin"}
        </h2>
        <div className="w-full h-96 sm:h-[28rem] md:h-[32rem] flex items-center justify-center rounded">
          <div id="us-map" className="w-full max-w-[900px] mx-auto">
            <USMap
              onStateHover={(state) => setStateName(state)}
              pricingData={pricingData}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col gap-4 w-full lg:w-1/3">
        <SearchBar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          handleReset={handleReset}
          onGenerateHeatmap={loadPricingData}
        />

        {selectedCategory && (
          <>
            {legendSteps.some((item) => item.state && !isNaN(item.value)) && (
              <DataDisplay label="Price Distribution" items={legendSteps} />
            )}

            {stateName && (
              <DataDisplay
                label="Selected State"
                items={[
                  {
                    state: stateName || "No State selected",
                    value:
                      isNaN(selectedPrice) || selectedPrice === 0
                        ? null
                        : selectedPrice,
                    color: selectedColor,
                  },
                ]}
              />
            )}
          </>
        )}
      </div>
    </div>
  </div>
</section>

  );
};