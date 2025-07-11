import { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { stateNames } from "../../utils/stateUtils";
import { getColor } from "../../utils/colorUtils";

interface USMapProps {
  onStateHover: (stateName: string, price: string) => void;
  pricingData: Record<string, number>;
  minPrice: number;
  maxPrice: number;
}

const USMap = ({ onStateHover, pricingData, minPrice, maxPrice }: USMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const drawMap = () => {
    if (!mapRef.current) return;

    d3.select(mapRef.current).selectAll("svg").remove(); // Clear previous map
    const width = mapRef.current.clientWidth; // Responsive width
    const height = 500;

    const svg = d3
      .select(mapRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const projection = d3.geoAlbersUsa().translate([width / 2, height / 2]).scale(width);

    const path = d3.geoPath().projection(projection);

    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then((us: any) => {
      const statesFeature = topojson.feature(us, us.objects.states) as unknown as GeoJSON.FeatureCollection;
      const states = statesFeature.features;

      svg
        .selectAll("path")
        .data(states)
        .enter()
        .append("path")
        .attr("d", path as any)
        .attr("class", "stroke-white")
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)
        .attr("fill", (d: any) => {
          const fips = d.id;
          const abbr = stateNames[fips]?.abbr;
          const price = abbr ? pricingData[abbr] : undefined;

          if (price !== undefined && !isNaN(price)) {
            return getColor(price, minPrice, maxPrice);
          }

          return "#eee"; // Fallback for undefined or missing price
        })
        .on("mouseover", function (_event: any, d: any) {
          const fips = d.id;
          const info = stateNames[fips];
          const abbr = info?.abbr;
          const price = abbr ? pricingData[abbr] : undefined;

          if (info && price !== undefined) {
            onStateHover(info.name, price.toString());
          } else if (info) {
            onStateHover(info.name, "N/A");
          }

          d3.select(this)
            .attr("filter", null)
            .attr("fill", (d: any) => {
              const fips = d.id;
              const abbr = stateNames[fips]?.abbr;
              const price = abbr ? pricingData[abbr] : undefined;

              if (price !== undefined && !isNaN(price)) {
                const hoverColor = getColor(price, minPrice, maxPrice, true); // Darker on hover
                return hoverColor;
              }

              return "#ccc";
            });
        })
        .on("mouseout", function (_event: any, _d: any) {
          d3.select(this)
            .attr("fill", (d: any) => {
              const fips = d.id;
              const abbr = stateNames[fips]?.abbr;
              const price = abbr ? pricingData[abbr] : undefined;

              if (price !== undefined && !isNaN(price)) {
                return getColor(price, minPrice, maxPrice); // Regular fill
              }

              return "#eee";
            });
        });
    });
  };

  useEffect(() => {
    drawMap(); // Initial draw

    const handleResize = () => {
      drawMap(); // Redraw map on resize
    };

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pricingData, minPrice, maxPrice]);

  return <div ref={mapRef} className="w-full h-[500px]" />;
};

export default USMap;
