import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

// Components
import { Card, CardContent } from "@/components/ui/card";

// Images
import productImage from "../assets/product-image.png";
import union from "../assets/union.png";

const products = [
  {
    title: "Dorsal.fyi",
    description:
      "Free public access to crowd-sourced medical bill data. Great for patients wanting pricing insights before receiving care.",
  },
  {
    title: "Dorsal Companion",
    description:
      "Think Rocket Money but for healthcare. Tracks bills, finds discrepancies, and assists in saving on out-of-pocket costs.",
  },
  {
    title: "Dorsal Appeals Engine",
    description:
      "Appeal denied claims via web, hospital-specific app, or even SMS. Easy-to-use engine to guide consumers through the process.",
  },
  {
    title: "Dorsal Data",
    description:
      "Our polished dataset offering for reserchers, policy makers, and analysts seeking deep insight into healthcare costs.",
  },
  {
    title: "Dorsal for Enterprise",
    description:
      "Tailored for employers and clinics looking to reduce healthcare spend by leveranging Dorsal insights at a popilation level.",
  },
];

export const ProductFamily = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={union}
          alt="Background"
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      <div className="py-16 px-6 sm:px-12 text-white text-center z-10 relative mt-16">
       <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white">
            <span className="text-xs font-semibold uppercase bg-gradient-to-r from-[#E770C1] to-[#9F70FD] text-transparent bg-clip-text">
              PRODUCTS
            </span>
          </span>
        <h2 className="text-3xl font-semibold mt-4">Dorsal Product Family</h2>
        <p className="mt-4">
          Explore our suite of tools built to empower consumers, researchers, and enterprises with healthcare <br/>
        price transparency and negotiation.
        </p>
      </div>

      <div className="relative container">
        <ScrollArea.Root type="always">
          <ScrollArea.Viewport>
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto px-12 pb-4"
              style={{ scrollbarWidth: "none" }}
            >
              {products.map((product, index) => (
                <Card
                  key={index}
                  className="min-w-[280px] max-w-[360px] shrink-0 rounded-2xl bg-white"
                >
                  <CardContent className="p-6">
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
              ))}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="horizontal" />
        </ScrollArea.Root>
      </div>
    </section>
  );
};

export default ProductFamily;