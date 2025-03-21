const SearchBar = () => {
  return (
    <div className="flex items-center gap-4 pb-4">   
      <select className="border border-gray-300 px-8 py-2 rounded-lg text-gray-700">
        <option>Select Service Category</option>
      </select> 
      <button className="bg-purple text-white px-16 py-2 rounded-lg hover:bg-purple-300">
        Generate Heatmap
      </button>
      <button className="border border-purple-400 text-black px-16 py-2 rounded-lg hover:bg-purple-50">
        Reset
      </button>
    </div>
  );
};

const OverallStats = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="border rounded-lg p-4 w-[60%] shadow-sm">
        <h2 className="text-lg font-bold">Overall</h2>
           <p>Map Here</p>
      </div>
 
      <div className="flex flex-col gap-4 w-[30%] shadow-sm">
        <PriceBox title="Lowest Price" state="New York" price="$87.89" color="bg-blue-200" />
        <PriceBox title="Highest Price" state="Hawaii" price="$22526.41" color="bg-blue-600" />
        <PriceBox title="Selected State" state="Minnesota" price="$5697.52" color="bg-blue-300" />
      </div>
    </div>
  );
};

const PriceBox = ({ title, state, price, color }: { title: string; state: string; price: string; color: string }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-black">{title}</h3>

      <div className="flex items-center gap-4 mt-1">
        <p className="text-purple text-lg font-bold">{state}</p>
        <span className={`w-3 h-3 ${color} rounded-sm`}></span>
        <span className="text-gray-700 font-medium">{price}</span>
      </div>
    </div>
  );
};

export const StatewisePricing = () => {
    return (
        <section id="StatewisePricing" className="container py-4">

        <div className="grid">
          
            <h2 className="text-2xl font-bold pb-2">
              Compare {" "}
              <span className="bg-gradient-to-b text-transparent bg-clip-text text-purple">
              Healthcare {" "}
              </span>
              Across The State
            </h2>

            <SearchBar />
  
            <OverallStats />
           
        </div>
      </section>
    );
};