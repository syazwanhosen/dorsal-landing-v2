import React from "react";

export const ProcedureCard = () => {
  return (
    <section id="ProcedureCard" className="container pb-6">
    <div className="flex flex-col lg:flex-row items-start justify-between space-y-4 lg:space-y-0 lg:space-x-6">
      
      {/* Left Content */}
      <div className="w-full lg:w-[60%]">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-bold text-gray-800">MRI with Contrast</h2>
          <span className="bg-purple text-white text-xs font-semibold px-2 py-1 rounded">
            CPT Code 70010
          </span>
        </div>
  
        <p className="text-sm text-gray-700 mt-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
        </p>
  
        <button className="mt-3 text-sm font-semibold text-black hover:underline">
          See More
        </button>
      </div>
  
      {/* Right Box (Chart Placeholder) */}
      <div className="w-full lg:w-[40%] h-[160px] border border-purple-300 rounded-lg shadow-sm flex items-center justify-center">
        <span className="text-sm text-purple-400">Chart</span>
      </div>
    </div>
  </section>
  
  );
};
