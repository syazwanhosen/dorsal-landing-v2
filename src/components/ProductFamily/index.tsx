import { useState, useEffect, useRef, memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import productImage from "../../assets/product-image.png";
import "./styles.css";

const products = [
  {
    title: "Dorsal.fyi",
    description:
      "Free forever public access to real-time crowdsourced medical bill insights. Great for patients exploring pricing and providers.",
  },
  {
    title: "Dorsal Companion",
    description:
      "Think Rocket Money but for healthcare. Track and identify problems with bills for you and your family in any language and reading level.",
  },
  {
    title: "Dorsal Appeals Engine",
    description:
      "One-click appeals to save on medical bills. Web, mobile, or even SMS/WhatsApp. Let us do the hard work and get you your money back!",
  },
  {
    title: "Dorsal Data",
    description:
      "Explore our proprietary real-time bulk claims data. For researchers, policymakers, and analysts seeking deep insight into the market.",
  },
  /** TODO: AFTER SEED ROUND
  {
    title: "Dorsal for Enterprise",
    description:
      "For employers, managed care, and clinics. Improve care navigation & reduce healthcare spend at a population level.",
  },
   */
  {
    title: "Dorsal for Enterprise",
    description:
      "For employers, managed care, and clinics. Improve care navigation & reduce healthcare spend at a population level.",
  },
];

const calcDynamicHeight = (objectWidth: number): number => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const height = objectWidth - vw + vh + 150;
  
  return (vw >= 1610 || vh >= 950) ? 750 : height
};

const ProductCard = memo(() =>
  products.map((product, index) => (
    <Card
      key={index}
      className="product-card min-w-[280px] max-w-[360px] shrink-0 rounded-2xl bg-white"
    >
      <CardContent className="pt-2">
        <div className="flex flex-col items-center">
          <img
            src={productImage}
            alt="Product illustration"
            className="h-40 object-contain mb-4"
          />
          <h3 className="text-lg font-semibold text-purple-700 text-center">
            {product.title}
          </h3>
          <p className="text-sm text-gray-700 mt-2 text-center">
            {product.description}
          </p>
        </div>
      </CardContent>
    </Card>
  ))
);

const ProductFamily = () => {
  const [dynamicHeight, setDynamicHeight] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const objectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const updateHeight = () => {
      if (objectRef.current) {
        const objectWidth = objectRef.current.scrollWidth;
        const height = calcDynamicHeight(objectWidth);
        setDynamicHeight(height);
      }
    };

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        if (containerRef.current) {
          const offsetTop = -containerRef.current.offsetTop;
          setTranslateX(offsetTop);
        }
      });
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    window.addEventListener("scroll", handleScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <section
      className="container px-0 horizontal-section lg:pt-16 pt-6 bg-white" >
      <div className="tall-outer-container" style={{ height: `${dynamicHeight}px` }}>
        <div className="sticky-inner-container  bg-[url('/src/assets/union.png')] bg-no-repeat xl:bg-contain" ref={containerRef}>
          <div className="title-container">
            <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white">
              <span className="text-xs font-semibold uppercase bg-gradient-to-r from-[#E770C1] to-[#9F70FD] text-transparent bg-clip-text">
                PRODUCTS
              </span>
            </span>
            <h2 className="text-[20px] sm:text-[24px] md:text-[24px] lg:text-[32px] font-bold leading-tight mt-4">Dorsal Product Family</h2>
            <p className="text-base sm:text-lg text-white/90 mt-4">
              Explore our suite of tools built to empower consumers, researchers, and enterprises with healthcare <br />
              price transparency and negotiation.
            </p>
          </div>
          <div
            className="horizontal-translate-container"
            ref={objectRef}
            style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
          >
            <div className="cards-container">
              <ProductCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFamily;
