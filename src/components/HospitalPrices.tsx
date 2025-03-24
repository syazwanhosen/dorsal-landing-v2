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
            <h3 className="text-lg font-bold">Fixed vs Negotiated Price Hospitals</h3>
            <div className="w-full h-48 sm:h-64 md:h-80 bg-gray-100 flex items-center justify-center rounded">
              <p className="text-gray-500">Map Here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    );
};