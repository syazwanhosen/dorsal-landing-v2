import { Search, FileText } from "lucide-react";

// Images
import person from "../assets/woman.png";
import rectangle1 from "../assets/rectangle-1.png";
import rectangle2 from "../assets/rectangle-2.png";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white min-h-screen">
      {/* Top Wave Background */}
      <img
        src={rectangle1}
        alt="Top Wave"
        className="absolute bottom-0 left-0 w-full pointer-events-none z-0"
      />
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-16 text-center">
        {/* Badge */}
        <span className="inline-block bg-purple-100 px-3 py-1 rounded-full mb-4">
          <span className="text-sm bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text font-semibold">
            AI AGENTS
          </span>
        </span>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Fight <span className="text-[#D247BF]">smarter</span>, not harder.
        </h1>
        <p className="text-gray-600 text-lg max-w-xl">
          Insights on pricing, procedures, providers and more!
        </p>

        {/* Common Search Tags */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {["MRI with contrast", "Colonoscopy", "Cesarean"].map((item) => (
            <button
              key={item}
              className="flex items-center gap-2 px-4 py-2 border border-[#8B5FBF] text-[#8B5FBF] border-2 rounded-full hover:shadow-md transition"
            >
              <span>{item}</span>
              <Search size={16} />
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="mt-6 w-full max-w-xl flex items-center bg-white border border-gray-300 rounded-full shadow-md px-4 py-2">
          <Search size={16} className="mr-3"/>
          <input
            type="text"
            placeholder="Search procedures, providers, or conditions..."
            className="flex-grow outline-none text-gray-700 placeholder-gray-400 bg-transparent"
          />
          <button className="bg-[#8B5FBF] hover:bg-purple-700 text-white font-semibold rounded-full px-4 py-2 text-sm transition">
            Search
          </button>
        </div>

        {/* CTA Button */}
        <button className="mt-6 flex items-center gap-2 bg-[#8B5FBF] hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition">
          <FileText size={18} />
          NEGOTIATE YOUR BILL
        </button>

        {/* Cards and Image Layer */}
        <div className="relative mt-5 mb-[8rem] w-full flex flex-col items-center z-10">
          {/* Statistic cards */}
          <div className="absolute -left-10 lg:left-60 top-20 bg-white rounded-xl shadow-xl p-4 text-left md:w-72 lg:w-60">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#A1A0BD]">Approved</p>
              <span className="text-xs bg-[#8770BC] text-white px-2 py-1 rounded-full mt-2 inline-block">+23%</span>
            </div>
            <p className="text-xl font-bold text-gray-800 mt-1">$783.02</p>
          </div>
          <div className="absolute -left-10 lg:left-60 top-60 bg-white rounded-xl shadow-xl p-4 text-left md:w-72 lg:w-60">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#A1A0BD]">Pending</p>
              <span className="text-xs bg-[#D247BF] text-white px-2 py-1 rounded-full mt-2 inline-block">+11%</span>
            </div>
            <p className="text-xl font-bold text-gray-800 mt-1">$491.37</p>
          </div>

          {/* Center person */}
          <img
            src={person}
            alt="Person smiling"
            className="w-[40rem] h-auto z-10"
          />

          {/* Graph card */}
          <div className="absolute -right-20 lg:right-60 top-10 bg-white rounded-xl shadow-xl p-4 w-64 md:w-72 lg:w-60 h-60 flex flex-col justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1 text-left">Total Saving</p>
            <p className="text-xl font-bold text-gray-800 mb-2 text-left">$8532.52</p>
          </div>
          {/* Responsive bar chart */}
          <div className="flex flex-1 items-end gap-4">
            {[40, 60, 30, 50, 70, 45, 85].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-full bg-[#BCACEC]"
                style={{ height: `${(h / 100) * 100}%` }} // % based on container
              />
            ))}
          </div>
        </div>
        </div>
 
      <div className="z-20">
        {/* Bottom Wave Background */}
        <img
          src={rectangle2}
          alt="Bottom Wave"
          className="absolute bottom-0 left-0 w-full pointer-events-none z-5"
        />
        {/* Footer Info */}
        <div className="relative text-white z-10 mb-10">
          <h2 className="text-4xl font-semibold mb-10">
            Know what you'll pay for <span className="text-white font-bold">MRIs</span>
          </h2>
          <p className="max-w-xl text-base px-4">
            Get real pricing data from people who’ve been there. Compare costs across providers and negotiate with confidence.
          </p>
        </div>
      </div>
      </div>
    </section>
  );
};
