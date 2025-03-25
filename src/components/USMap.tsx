import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

interface StateNames {
  [key: string]: { name: string; abbr: string };
}

// US state name mappings (FIPS codes to state names and abbreviations)
const stateNames = {
  "01": {name: "Alabama", abbr: "AL"},
  "02": {name: "Alaska", abbr: "AK"},
  "04": {name: "Arizona", abbr: "AZ"},
  "05": {name: "Arkansas", abbr: "AR"},
  "06": {name: "California", abbr: "CA"},
  "08": {name: "Colorado", abbr: "CO"},
  "09": {name: "Connecticut", abbr: "CT"},
  "10": {name: "Delaware", abbr: "DE"},
  "11": {name: "District of Columbia", abbr: "DC"},
  "12": {name: "Florida", abbr: "FL"},
  "13": {name: "Georgia", abbr: "GA"},
  "15": {name: "Hawaii", abbr: "HI"},
  "16": {name: "Idaho", abbr: "ID"},
  "17": {name: "Illinois", abbr: "IL"},
  "18": {name: "Indiana", abbr: "IN"},
  "19": {name: "Iowa", abbr: "IA"},
  "20": {name: "Kansas", abbr: "KS"},
  "21": {name: "Kentucky", abbr: "KY"},
  "22": {name: "Louisiana", abbr: "LA"},
  "23": {name: "Maine", abbr: "ME"},
  "24": {name: "Maryland", abbr: "MD"},
  "25": {name: "Massachusetts", abbr: "MA"},
  "26": {name: "Michigan", abbr: "MI"},
  "27": {name: "Minnesota", abbr: "MN"},
  "28": {name: "Mississippi", abbr: "MS"},
  "29": {name: "Missouri", abbr: "MO"},
  "30": {name: "Montana", abbr: "MT"},
  "31": {name: "Nebraska", abbr: "NE"},
  "32": {name: "Nevada", abbr: "NV"},
  "33": {name: "New Hampshire", abbr: "NH"},
  "34": {name: "New Jersey", abbr: "NJ"},
  "35": {name: "New Mexico", abbr: "NM"},
  "36": {name: "New York", abbr: "NY"},
  "37": {name: "North Carolina", abbr: "NC"},
  "38": {name: "North Dakota", abbr: "ND"},
  "39": {name: "Ohio", abbr: "OH"},
  "40": {name: "Oklahoma", abbr: "OK"},
  "41": {name: "Oregon", abbr: "OR"},
  "42": {name: "Pennsylvania", abbr: "PA"},
  "44": {name: "Rhode Island", abbr: "RI"},
  "45": {name: "South Carolina", abbr: "SC"},
  "46": {name: "South Dakota", abbr: "SD"},
  "47": {name: "Tennessee", abbr: "TN"},
  "48": {name: "Texas", abbr: "TX"},
  "49": {name: "Utah", abbr: "UT"},
  "50": {name: "Vermont", abbr: "VT"},
  "51": {name: "Virginia", abbr: "VA"},
  "53": {name: "Washington", abbr: "WA"},
  "54": {name: "West Virginia", abbr: "WV"},
  "55": {name: "Wisconsin", abbr: "WI"},
  "56": {name: "Wyoming", abbr: "WY"}
};

interface USMapProps {
  onStateHover: (stateName: string, priceInfo: string) => void;
}

const USMap: React.FC<USMapProps> = ({ onStateHover }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = mapRef.current?.clientWidth || 800;
    const height = 500;

    const svg = d3.select(mapRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const projection = d3.geoAlbersUsa().translate([width / 2, height / 2]).scale(width);
    const path = d3.geoPath().projection(projection);

    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json")
      .then((us: any) => {
        const statesData = topojson.feature(us, us.objects.states).features;

        svg.selectAll("path")
          .data(statesData)
          .enter()
          .append("path")
          .attr("class", "stroke-white fill-gray-200")
          .attr("d", path as any)
          .attr("data-fips", (d: any) => d.id)
          .on("mouseover", function (event: any, d: any) {
            const stateInfo = stateNames[d.id];
            if (!stateInfo) return;

            d3.select(this)
              .style("stroke", "#000")
              .style("stroke-width", "2px");

            const priceInfo = this.getAttribute("data-price") || "N/A";
            onStateHover(stateInfo.name, priceInfo);
          })
          .on("mouseout", function () {
            d3.select(this)
              .style("stroke", "#fff")
              .style("stroke-width", "1px");
          });
      });
  }, []);

  return <div ref={mapRef} className="w-full h-[500px] relative" />;
};

export default USMap;
