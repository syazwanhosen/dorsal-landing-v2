import { useState, useEffect } from "react";
import quotation from "@/assets/qutation.png"; 

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        "The transparency in billing blew my mind. I finally feel in control.",
    },
    {
      id: 2,
      quote:
        "Such a relief to know what others paid before heading to the hospital.",
    },
    { id: 3, quote: "Negotiated my bill and saved RM800. This app is gold!" },
    {
      id: 4,
      quote: "Uploading bills was seamless. Proud to help the community.",
    },
    {
      id: 5,
      quote: "I was able to compare bills and get clarity before surgery.",
    },
    {
      id: 6,
      quote:
        "Effortless upload and reliable cost estimates — total game-changer.",
    },
    {
      id: 7,
      quote: "This platform saved me time and stress. Highly recommended.",
    },
    {
      id: 8,
      quote:
        "The breakdowns helped me ask the right questions at the hospital.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(4);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto text-center">
        <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#9F70FD1A] lg:mb-4 mb-2">
          <span className="text-xs font-semibold uppercase bg-gradient-to-r from-[#E770C1] to-[#9F70FD] text-transparent bg-clip-text">
            TESTIMONIALS
          </span>
        </span>

        {/* Title */}
        <div className="text-center lg:mb-12 mb-4">
          <h3 className="lg:text-4xl text-[20px] sm:text-[24px] md:text-[24px] font-bold text-gray-800">
            Walls Of Love
          </h3>
        </div>

        {/* Slider Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <div className="bg-white p-6 rounded-lg border border-black shadow-lg h-full font-sans">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[#8B5FBF] font-bold text-lg">
                      John Smith
                    </h4>
                    <img
                      src={quotation}
                      alt="Quotation"
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                  <p className="text-black text-base leading-relaxed text-left">
                    "{testimonial.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({
            length: Math.ceil(testimonials.length / slidesToShow),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index * slidesToShow)}
              className={`relative transition-all ${
                currentSlide >= index * slidesToShow &&
                currentSlide < (index + 1) * slidesToShow
                  ? "w-4 h-4"
                  : "w-3 h-3 mt-[2px]"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Inactive dot */}
              {!(
                currentSlide >= index * slidesToShow &&
                currentSlide < (index + 1) * slidesToShow
              ) && (
                <span className="absolute inset-0 rounded-full border border-black " />
              )}

              {/* Active dot with gap effect */}
              {currentSlide >= index * slidesToShow &&
                currentSlide < (index + 1) * slidesToShow && (
                  <span className="relative block w-full h-full">
                    <span className="absolute inset-0 rounded-full bg-[#9F70FD]" />
                    <span
                      className="absolute inset-0 rounded-full border-2 border-white"
                      style={{
                        transform: "scale(0.8)",
                        boxShadow: "0 0 0 1px #9F70FD",
                      }}
                    />
                  </span>
                )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
