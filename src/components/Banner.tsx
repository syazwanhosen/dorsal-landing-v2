import { useState, useEffect } from "react";

const phrases = [
  "an MRI 🩻",
  "a CT scan 🧠",
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
  const [fade, setFade] = useState(true);

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

  const animatedPhrase = phrases[currentPhraseIndex];
  
    return (
      <section className="banner bg-white lg:pt-12 pt-8">
      <div
        className="container  flex flex-col items-center justify-center overflow-hidden text-white
                  pt-8 pb-8 lg:py-12
                  bg-gradient-to-br from-[#864196] to-[#EB3897]
                  lg:relative
                  lg:bg-white
                  lg:bg-[url('@/assets/rectangle2.webp')]
                  lg:bg-center lg:bg-no-repeat lg:bg-[length:100%_100%]
                  lg:bg-gradient-none lg:h-[600px]"
      >
      {/* Statistic Cards */}
      <div className="lg:absolute lg:left-[10rem] lg:top-20 bg-white rounded-xl lg:shadow-[0_0_20px_rgba(0,0,0,0.25)] p-4 text-left  w-full lg:w-60">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[#A1A0BD]">Approved</p>
          <span className="text-xs bg-purple text-white px-2 py-1 rounded-full mt-2 inline-block">+23%</span>
        </div>
        <p className="text-xl font-bold text-gray-800 mt-1">$783.02</p>
      </div>

      <div className="lg:absolute lg:left-[10rem] lg:top-[15rem] bg-white rounded-xl lg:shadow-[0_0_20px_rgba(0,0,0,0.25)] p-4 text-left w-full lg:w-60 mt-8 lg:mt-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[#A1A0BD]">Pending</p>
          <span className="text-xs bg-pink text-white px-2 py-1 rounded-full mt-2 inline-block">+11%</span>
        </div>
        <p className="text-xl font-bold text-gray-800 mt-1">$491.37</p>
      </div>

      {/* Graph Card */}
      <div className="lg:absolute lg:right-[10rem] lg:top-16 lg:mt-3 bg-white rounded-xl lg:shadow-[0_0_20px_rgba(0,0,0,0.25)] p-4 w-64 md:w-72 lg:w-60 h-60 flex flex-col justify-between mt-8">
        <div>
          <p className="text-sm text-gray-500 mb-1 text-left">Total Saving</p>
          <p className="text-xl font-bold text-gray-800 mb-2 text-left">$8532.52</p>
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

    
      <div className="text-center px-4 mt-12 lg:absolute lg:bottom-12">
      <h2 className="text-3xl font-semibold mb-10">
            Know what you'll pay for{" "}
            <span
              className={`text-black font-semibold inline-block transition-opacity duration-300 ease-in-out ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              {animatedPhrase}
            </span>
          </h2>
        <p className="max-w-xl text-base px-4">
          Get real pricing data from people who've been there. Compare costs across providers and negotiate with confidence.
        </p>
      </div>
      </div>
    </section>
  );
};
  