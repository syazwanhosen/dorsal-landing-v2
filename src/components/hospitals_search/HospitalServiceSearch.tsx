import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setServiceSearchLoading,
  setServiceSearchResults,
} from "../../features/hospitalServiceSearchSlice";
import { searchHospitalServices } from "@/api/Hospital/api";

export const HospitalServiceSearch = () => {
  const dispatch = useAppDispatch();
  const { loading, serviceSearchResults } = useAppSelector(
    (state) => state.hospitalServiceSearch
  ); // updated Redux selector
  const [filters, setLocalFilters] = useState({
    search: "",
    location: "",
    min_price: "",
    max_price: "",
  });

  const handleSelect = (field: string, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    const { search, location, min_price, max_price } = filters;

    if (!search ) {
      alert("Please enter a service name.");
      return;
    }
    if (!location ) {
      alert("Please enter a location.");
      return;
    }

    const params: {
      service_name: string;
      location?: string;
      search_range?: number;
      min_price?: number;
      max_price?: number;
    } = {
      service_name: search,
      location: location || undefined,
      min_price: min_price ? Number(min_price) : undefined,
      max_price: max_price ? Number(max_price) : undefined,
    };

    dispatch(setServiceSearchLoading(true));

    searchHospitalServices(params)
      .then((data) => {
        dispatch(
          setServiceSearchResults({
            code: data.code,
            service_description: data.service_description,
            hospital_count: data.hospital_count,
            hospital_names: data.hospital_names || [],
            prices: data.prices || [],
            distances: data.distances || [],
            generic_service_name: data.generic_service_name || filters.search,
            location: filters.location || "", 
            min_price: filters.min_price ? Number(filters.min_price) : undefined, 
            max_price: filters.max_price ? Number(filters.max_price) : undefined, 
          })
        );
      })
      .catch((error) => {
        console.error("❌ Error performing search:", error);
      })
      .finally(() => dispatch(setServiceSearchLoading(false)));
  };

  return (
    <>
      <section id="SearchHospital" className="container py-6">
        <div className="flex flex-wrap lg:flex-nowrap items-center border border-purple-400 rounded overflow-hidden bg-white text-sm">
          {/* ✅ Updated Filter Options */}
          <div className="flex flex-wrap flex-grow">
            {[
              {
                key: "search",
                label: "Search",
                placeholder: "Enter service name",
              },
              {
                key: "location",
                label: "Location",
                placeholder: "Enter location",
              },
              {
                key: "min_price",
                label: "Min Price",
                placeholder: "Enter min price",
              },
              {
                key: "max_price",
                label: "Max Price",
                placeholder: "Enter max price",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 lg:border-r md:border-r p-2"
              >
                <label className="block text-xs text-black font-semibold">
                  {item.label}
                </label>
                <input
                  type="text"
                  className="w-full focus:outline-none text-sm bg-white"
                  value={filters[item.key as keyof typeof filters]}
                  onChange={(e) => handleSelect(item.key, e.target.value)}
                  placeholder={item.placeholder}
                />
              </div>
            ))}
          </div>

          {/* ✅ Updated Search Button */}
          <button
            onClick={handleSearch}
            className="bg-purple hover:bg-purple-700 text-white px-10 lg:py-4 py-2 sm:px-10 text-sm font-semibold border lg:w-auto w-full"
          >
            {loading ? "Searching..." : "SEARCH"}
          </button>
        </div>

        {/* DF-94 - Hide filter  */}
        {/* {serviceSearchResults && (
        <div className="mt-4 bg-light-purple p-2 rounded flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 text-xs mb-4 sm:mb-0">
        <span className="font-semibold w-full sm:w-auto">Filter by:</span>
      
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
          <select className="pl-3 pr-8 py-1 rounded border bg-white w-full sm:w-auto">
            <option disabled>Select Distance</option>
            {serviceSearchResults.distances.map(
              (distance: number, index: number) => (
                <option key={index} value={`${distance.toFixed(2)} miles`}>
                  Within {distance.toFixed(2)} miles
                </option>
              )
            )}
          </select>
      
          <select className="pl-3 pr-8 py-1 rounded border bg-white w-full sm:w-auto">
            <option disabled>Select Rating</option>
            <option value="5 stars">5 Stars</option>
            <option value="2+ stars">2+ Stars</option>
          </select>
      
          <select className="pl-3 pr-8 py-1 rounded border bg-white w-full sm:w-auto">
            <option disabled>Select Insurance</option>
            <option value="Plan A">Plan A</option>
            <option value="Plan B">Plan B</option>
          </select>
      
          <select className="pl-3 pr-8 py-1 rounded border bg-white w-full sm:w-auto">
            <option disabled>Select Price Type</option>
            <option value="Fixed">Fixed Price</option>
            <option value="Negotiated">Negotiated Price</option>
          </select>
        </div>
      </div>
      
        )} */}

        {/* Display Search Results 
        {serviceSearchResults && (
          <div className="mt-4 bg-light-purple p-4 rounded flex flex-wrap gap-4">
            <h2 className="text-lg font-bold text-purple-900">
              Search Results
            </h2>
            <p className="text-sm text-gray-700">
              {filters.search || "Not provided"}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Code:</strong> {serviceSearchResults.code}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Service Description:</strong>{" "}
              {serviceSearchResults.service_description}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Total Hospitals Found:</strong>{" "}
              {serviceSearchResults.hospital_count}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceSearchResults.hospital_names.map(
                (name: string, index: number) => (
                  <div
                    key={index}
                    className="border bg-white shadow-sm rounded-lg p-4"
                  >
                    <h3 className="text-lg font-semibold text-purple-800">
                      {name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Distance:{" "}
                      {serviceSearchResults.distances[index]
                        ? `${serviceSearchResults.distances[index]} miles`
                        : "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Price:{" "}
                      {serviceSearchResults.prices[index]
                        ? `$${serviceSearchResults.prices[index]}`
                        : "Not provided"}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )} */}
      </section>
    </>
  );
};
