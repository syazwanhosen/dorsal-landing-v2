const StatewiseSelectedData = ({ stateName, priceInfo }: { stateName: string; priceInfo: string }) => {
    return (
      <div className="p-4 border rounded shadow-sm bg-white">
        <h3 className="font-semibold text-lg">State Information</h3>
        <p className="mt-2 text-gray-700">
          {stateName ? `${stateName} - ${priceInfo}` : "Select a state on the map"}
        </p>
      </div>
    );
  };
  
  export default StatewiseSelectedData;