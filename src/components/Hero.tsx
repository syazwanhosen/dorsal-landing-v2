import { Search, FileText } from "lucide-react";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center bg-white min-h-screen py-16 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
        Fight smarter, not harder.
      </h1>
      <p className="text-gray-600 text-center mb-8 text-lg">
        Insights on pricing, procedures, providers and more!
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {["MRI with contrast", "Colonoscopy", "Cesarean"].map((item) => (
          <div
            key={item}
            className="flex items-center border rounded-full px-4 py-2 text-purple-700 border-purple-300 hover:shadow-md transition-all"
          >
            <span className="mr-2">{item}</span>
            <Search size={16} />
          </div>
        ))}
      </div>

      <div className="flex items-center w-full max-w-xl rounded-full border border-gray-300 px-4 py-2 shadow-md">
        <input
          type="text"
          placeholder="Search procedures, providers, or conditions..."
          className="flex-grow outline-none text-gray-700 placeholder-gray-400"
        />
        <button className="bg-purple-600 text-white rounded-full px-4 py-2 ml-2 text-sm font-semibold hover:bg-purple-700 transition">
          Search
        </button>
      </div>

      <button className="mt-6 flex items-center bg-purple-600 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-purple-700 transition">
        <FileText size={18} className="mr-2" />
        NEGOTIATE YOUR BILL
      </button>

      {/* Section below */}
      <div className="mt-20 text-center max-w-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Know what you'll pay for <span className="text-purple-600">MRIs</span>
        </h2>
        <p className="text-gray-600 text-base">
          Get real pricing data from people who've been there. Compare costs
          across providers and negotiate with confidence.
        </p>
      </div>
    </div>
  );
};
