import { Search, FileText } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative bg-white">
    
      {/* Main Content */}
      <div className="flex flex-col items-center px-6 pt-16 text-center">
        {/* Badge */}
        <span className="inline-block bg-[#F6F1FF] px-3 py-1 rounded-full mb-4">
          <span className="text-sm bg-gradient-to-r from-[#E771C1] to-[#9F71FD] text-transparent bg-clip-text font-semibold">
            AI AGENTS
          </span>
        </span>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 leading-tight mb-4">
          Fight <span className="text-pink">smarter</span>, not harder.
        </h1>
        <p className="text-gray-600 text-lg max-w-xl">
          Insights on pricing, procedures, providers and more!
        </p>

        {/* Common Search Tags */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {["MRI with contrast", "Colonoscopy", "Cesarean"].map((item) => (
            <button
              key={item}
              className="flex items-center gap-2 px-4 py-2 border border-[#8770BC] text-[#8770BC] rounded-full hover:shadow-md transition"
            >
              <span>{item}</span>
              <Search size={16} />
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="mt-6 w-full max-w-xl flex items-center bg-white border border-gray-300 rounded-xl shadow-md2">
          <Search size={16} className="mx-3"/>
          <input
            type="text"
            placeholder="Search procedures, providers, or conditions..."
            className="flex-grow outline-none text-gray-700 placeholder-gray-400 bg-transparent"
          />
          <button className="bg-purple hover:bg-purple-700 text-white rounded-xl px-6 py-2 text-sm transition">
            Search
          </button>
        </div>

        {/* CTA Button */}
        <button className="mt-6 flex items-center gap-2 bg-purple hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition">
          <FileText size={18} />
          NEGOTIATE YOUR BILL
        </button>

     
 
      </div>
    </section>
  );
};
