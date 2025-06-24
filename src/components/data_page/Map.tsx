import { useState } from "react";

export const Map = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className="absolute z-10 flex items-center justify-center w-full h-full bg-white bg-opacity-80">
          <div className="w-10 h-10 border-4 border-purple border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <iframe
        src="/google_address_map_negotiated_fixed.html"
        width="100%"
        height="100%"
        title="Google Address Map"
        onLoad={() => setLoaded(true)}
        className="relative z-0"
      />
    </div>
  );
};


export const CostMap = () => (
    <iframe
         id="chartFrame"
        src="/public/cost_comparison.html"
        width="100%"
        height="100%"
        title="Google Address Map"
        
    />
)