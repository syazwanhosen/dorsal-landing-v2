import { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { stateNames } from "../utils/stateUtils"; 

interface USMapProps {
  onStateHover: (stateName: string, price: string) => void;
  pricingData: Record<string, number>;
  minPrice: number;
  maxPrice: number;
}

const USMap = ({ onStateHover, pricingData, minPrice, maxPrice }: USMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    d3.select(mapRef.current).selectAll("svg").remove(); // clear previous map
    const width = mapRef.current.clientWidth;
    const height = 500;

    const svg = d3
      .select(mapRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const projection = d3
      .geoAlbersUsa()
      .translate([width / 2, height / 2])
      .scale(width);

    const path = d3.geoPath().projection(projection);

    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then((us: any) => {
      const states = topojson.feature(us, us.objects.states).features;

      svg
        .selectAll("path")
        .data(states)
        .enter()
        .append("path")
        .attr("d", path as any)
        .attr("class", "stroke-white")
        .attr("fill", (d: any) => {
          const fips = d.id;
          const abbr = stateNames[fips]?.abbr;
          const price = abbr ? pricingData[abbr] : undefined;

          const baseColor = "#4361ee";

          if (price !== undefined && !isNaN(price)) {
            const opacity =
              maxPrice !== minPrice
                ? 0.2 + 0.8 * ((price - minPrice) / (maxPrice - minPrice))
                : 0.8;
            return d3.color(baseColor)?.copy({ opacity })?.formatRgb() ?? "#ccc";
          }

          return "#eee"; // default color for missing data
        })
        .on("mouseover", function (event: any, d: any) {
          const fips = d.id;
          const info = stateNames[fips];
          const abbr = info?.abbr;
          const price = abbr ? pricingData[abbr] : undefined;

          d3.select(this).style("stroke", "#000").style("stroke-width", "2px");

          if (info && price !== undefined) {
            onStateHover(info.name, price.toString());
          } else if (info) {
            onStateHover(info.name, "N/A");
          }
        })
        .on("mouseout", function () {
          d3.select(this).style("stroke", "#fff").style("stroke-width", "1px");
        });
    });
  }, [pricingData, minPrice, maxPrice]);

  return <div ref={mapRef} className="w-full h-[500px]" />;
};

export default USMap;
