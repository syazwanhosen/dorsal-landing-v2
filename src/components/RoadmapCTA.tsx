import ShotImg from "/src/assets/Shot.png";
import deisgnIcon from "@/assets/shape_icon.webp";
import { Link } from "react-router-dom";

const RoadmapCTA = () => {
  return (
    <div
      className="relative flex items-center lg:bg-white overflow-hidden text-white 
             pt-8 pb-8 lg:py-12
             bg-gradient-to-br from-[#864196] to-[#EB3897]
             lg:bg-[url('/src/assets/Roadmap-bg.webp')]
             lg:bg-center lg:bg-no-repeat lg:bg-[length:100%_100%]
             lg:bg-gradient-none lg:h-[500px]"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_0.7fr] items-center gap-10">
        {/* 📝 Content Block */}
        <div>
          <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white lg:mb-4 mb-2">
            <span className="text-xs font-semibold uppercase bg-gradient-to-r from-[#E770C1] to-[#9F70FD] text-transparent bg-clip-text">
              ROADMAP
            </span>
          </span>

          <h2 className="text-[20px] sm:text-[24px] md:text-[24px] lg:text-[32px] font-bold leading-tight mb-4">
            Where Will Dorsal Go Next? You Decide!
          </h2>
          <p className="text-base sm:text-lg text-white/90 mb-6">
            Make your voice heard and help our community prioritize our upcoming
            features.
          </p>
          <Link
            to="/roadmap"
            className="bg-white text-black text-sm font-normal px-6 py-3 rounded-md hover:bg-gray-100 transition"
          >
            Contribute to Dorsal Product Roadmap
          </Link>
        </div>

        {/* Mobile App Preview */}
        <div className="flex justify-center">
          <img
            src={ShotImg}
            alt="Dorsal mobile roadmap preview"
            className="w-[150px] sm:w-[320px] md:w-[250px] drop-shadow-xl rounded-xl"
            loading="lazy"
          />
        </div>
      </div>
      <img
        src={deisgnIcon}
        alt="Dorsal Design Icon"
        className="hidden lg:block lg:absolute lg:left-[45%] lg:top-[40%] lg:w-[300px]
             drop-shadow-xl rounded-xl"
        loading="lazy"
      />
    </div>
  );
};

export default RoadmapCTA;
