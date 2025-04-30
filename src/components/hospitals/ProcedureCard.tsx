import React from "react";

interface ProcedureCardProps {
  serviceName: string;
  serviceDescription: string;
  cptCode: string;
  hasSearchResult: boolean;
}

export const ProcedureCard: React.FC<ProcedureCardProps> = ({
  serviceName,
  serviceDescription,
  cptCode,
  hasSearchResult,
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

        {/* Right Box (Chart Placeholder) */}
        {hasSearchResult && (
          <div className="w-full lg:w-[40%] h-[160px] border border-purple-300 rounded-lg shadow-sm flex items-center justify-center">
            <span className="text-sm text-purple-400">Chart</span>
          </div>
        )}
      </div>
    </section>
  );
};
