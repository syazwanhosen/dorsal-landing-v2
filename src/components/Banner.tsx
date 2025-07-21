import { useState, useEffect } from "react";
import mobilebg from "@/assets/mobile-banner.webp";
import desktopBanner from "@/assets/rectangle-1.webp";

const phrases = [
  "an MRI 🩻",
  "a CT scan 💡",
  "an ultrasound 🤰",
  "a blood test 🩸",
  "a biopsy 🔬",
  "a flu shot 💉",
  "a refill 💊",
  "a colonoscopy 💩",
  "a mammogram 🍼",
  "an operation 🔪",
  "a follow-up 🤝",
];

export const Banner = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setFade(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="banner bg-white">
      {/* Mobile Content (shown on mobile only) */}
      <div className="lg:hidden relative h-[550px] bg-white">
        <img
          src={mobilebg}
          alt="Healthcare background"
          className=" w-full h-full object-fill sm:object-scale-down pt-6"
          loading="lazy"
        />
        {/* Card Box Positioned Bottom Right */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[16rem] z-10 w-[220px] ml-12">
          <div className="bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.25)] p-4 text-left">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#A1A0BD]">Approved</p>
              <span className="text-xs bg-purple text-white px-2 py-1 rounded-full">
                +23%
              </span>
            </div>
            <p className="text-xl font-bold text-gray-800 mt-1">$783.02</p>
          </div>
        </div>

        {/* Text Content Centered Near Bottom */}
        <div className="absolute bottom-[20px] w-full px-4 text-white text-center z-10">
          <h2 className="text-2xl font-semibold">
            Know what you'll pay for <br />
            <span className="inline-block relative min-w-[160px] h-[40px] text-black">
              {phrases.map((phrase, index) => (
                <span
                  key={index}
                  className={`absolute inset-0 whitespace-nowrap transition-all duration-300 ease-in-out ${
                    currentPhraseIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3"
                  }`}
                >
                  {phrase}
                </span>
              ))}
              <span className="invisible">{phrases[0]}</span>
            </span>
          </h2>
          <p className="max-w-sm mx-auto text-white font-normal">
            Get real pricing data from people who've been there. Compare costs
            across providers and negotiate with confidence.
          </p>
        </div>
      </div>

      {/* Desktop Content (shown on desktop only) */}
      <div className="hidden lg:block relative container text-center px-0">
        <img
          src={desktopBanner}
          alt="Healthcare background"
          className="w-full h-auto"
          loading="lazy"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-between py-12 px-4">
          {/* Left Side Cards */}
          <div className="absolute xl:left-32 lg:left-24 xl:top-[9rem] 2xl:top-[12rem]  lg:top-[8rem] bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.25)] p-4 text-left w-60">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#A1A0BD]">Approved</p>
              <span className="text-xs bg-purple text-white px-2 py-1 rounded-full mt-2 inline-block">
                +23%
              </span>
            </div>
            <p className="text-xl font-bold text-gray-800 mt-1">$783.02</p>
          </div>

          <div className="absolute xl:left-32 lg:left-24 xl:top-[18rem] 2xl:top-[22rem] lg:top-[15rem] bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.25)] p-4 text-left w-60">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#A1A0BD]">Pending</p>
              <span className="text-xs bg-pink text-white px-2 py-1 rounded-full mt-2 inline-block">
                +11%
              </span>
            </div>
            <p className="text-xl font-bold text-gray-800 mt-1">$491.37</p>
          </div>

          {/* Right Side Graph Card */}
          <div className="absolute xl:right-32 lg:right-24 xl:top-[7rem] 2xl:top-[9rem] lg:top-[6rem] bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.25)] p-4 w-60 h-60 flex flex-col justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1 text-left">
                Total Saving
              </p>
              <p className="text-xl font-bold text-gray-800 mb-2 text-left">
                $8532.52
              </p>
            </div>
            <div className="flex flex-1 items-end gap-4">
              {[40, 60, 30, 50, 70, 45, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-full bg-[#BCACEC]"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Bottom Text Content */}
          <div className="absolute bottom-12 text-center w-full px-4">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white text-center mb-6">
              Know what you'll pay for{" "}
              <span className="inline-block relative min-w-[180px] h-[40px] text-black">
                {phrases.map((phrase, index) => (
                  <span
                    key={index}
                    className={`absolute inset-0 whitespace-nowrap transition-all duration-300 ease-in-out ${
                      currentPhraseIndex === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-3"
                    }`}
                  >
                    {phrase}
                  </span>
                ))}
                <span className="invisible">{phrases[0]}</span>
              </span>
            </h2>

            <p className="max-w-2xl mx-auto text-lg text-white font-">
              Get real pricing data from people who've been there. Compare costs
              across providers and negotiate with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
