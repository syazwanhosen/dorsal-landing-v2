import { Map } from "./Map";

export const HospitalPrices = () => {
  return (
    <section id="HospitalPrices" className="container py-4">
      <div className="grid gap-4">
        <h2 className="text-2xl font-bold">
          <span className="bg-gradient-to-b text-transparent bg-clip-text text-purple">
            Hospital{" "}
          </span>
          Prices
        </h2>
        <div className="rounded-lg border shadow-sm bg-white">
          <div className="flex flex-col p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Fixed vs Negotiated Price Hospitals</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-sm text-gray-700">Fixed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="text-sm text-gray-700">Negotiated</span>
                </div>
              </div>
            </div>
            <div className="w-full h-48 sm:h-64 md:h-80 bg-gray-100 flex items-center justify-center rounded">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
