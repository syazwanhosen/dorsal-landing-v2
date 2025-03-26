export const Header = () => {
    return (
      <div className="bg-purple w-full relative flex justify-center">
      <div className="text-white py-4 container w-full px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold">Dashboard</h1>
    
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
          <a href="#" className="font-semibold hover:underline">Find Hospitals</a>
          <a href="#" className="font-semibold hover:underline">Find Services</a>
          <button className="font-semibold bg-light-purple text-black px-8 sm:px-16 py-2 rounded-lg hover:bg-purple-50">
            Login
          </button>
        </div>
      </div>
    </div> 
    );
};