export const Header = () => {
    return (
    <div className="bg-purple w-full relative flex items-center justify-center mx-auto">
      <div className="text-white py-4 items-center space-x-1 container w-screen flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
  
        <div className="flex items-center space-x-6">
          <a href="#" className="font-semibold hover:underline">Find Hospitals</a>
          <a href="#" className="font-semibold hover:underline">Find Services</a>
          <button className="font-semibold bg-light-purple text-black px-16 py-2 rounded-lg hover:bg-purple-50">
            Login
          </button>
        </div>
      </div>
    </div>
    );
};