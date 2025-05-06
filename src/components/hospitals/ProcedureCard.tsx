import React from "react";
import PriceChart from "./PriceChart";

interface ProcedureCardProps {
  serviceName: string;
  serviceDescription: string;
  cptCode: string;
  hasSearchResult: boolean;
  prices: number[];
  labels: string[];
  hospitalNames: string[]; // Added hospitalNames
}

export const ProcedureCard: React.FC<ProcedureCardProps> = ({
  serviceName,
  serviceDescription,
  cptCode,
  hasSearchResult,
  prices,
  hospitalNames, // Include hospitalNames
}) => {
  return (
    <section id="ProcedureCard" className="mt-6">
      <div className="flex flex-col lg:flex-row items-start justify-between space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Left Content */}
        <div className="w-full lg:w-[60%]">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-bold text-gray-800">{serviceName}</h2>
            {cptCode && (
              <span className="bg-purple text-white text-xs font-semibold px-2 py-1 rounded">
                CPT Code {cptCode}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-700 mt-2">{serviceDescription}</p>

          {hasSearchResult && (
            <button className="mt-3 text-sm font-semibold text-black hover:underline">
              See More
            </button>
          )}
        </div>

        {/* Right Box (Chart) */}
        {hasSearchResult && (
          <div className="w-full lg:w-[40%] rounded-lg ">
            {/* Passing hospitalNames correctly */}
          
            <PriceChart prices={prices} hospitalNames={hospitalNames} />
          </div>
        )}
      </div>
    </section>
  );
};
