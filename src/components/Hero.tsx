import { Hospital, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative bg-white">
      {/* Main Content */}
      <div className="flex flex-col items-center px-6 pt-16 text-center">
        {/* Badge */}
        <span className="inline-block bg-[#F6F1FF] px-3 py-1 rounded-full mb-4">
          <span className="text-sm bg-gradient-to-r from-[#E771C1] to-[#9F71FD] text-transparent bg-clip-text font-semibold">
            WE GOT YOUR BACK
          </span>
        </span>

        {/* Title */}
        <h1 className="text-5xl font-semibold text-gray-900 leading-tight mb-4">
          Fight <span className="text-pink">smarter</span>, not harder.
        </h1>
        <p className="text-gray-600 text-lg max-w-xl">
          Insights on pricing, procedures, providers and more!
        </p>
        {/* CTA Button */}
        <div className="flex gap-10">
           <Link to="/hospitals">
            <button className="mt-6 flex items-center gap-2 bg-purple hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition">
              <Hospital size={14} />
              Find your hospital
            </button>
          </Link>
           <Link to="/coming-soon">
          <button className="mt-6 flex items-center gap-2 bg-pink hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition">
            <FileText size={14} />
            Negotiate your bill
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
