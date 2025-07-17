import { NavLink, useLocation } from "react-router-dom";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {

  const location = useLocation();

  const shouldShowLink = location.pathname == "/data";

  return (
    <div className="bg-purple w-full relative flex items-center justify-center mx-auto">
      <div className="text-white py-4 items-center space-x-1 container w-screen flex justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>

        {shouldShowLink && (
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
          <NavLink to="/hospitals" className="font-semibold hover:underline">
            Search Hospitals
          </NavLink>
        </div>
        )}
      </div>
    </div>
  );
};
