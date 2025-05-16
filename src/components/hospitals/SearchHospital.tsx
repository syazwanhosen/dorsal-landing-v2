import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  setFilters,
  setOptions,
  setLoading,
  setSearchResults,
} from "../../features/hospitalSlice";

export const SearchHospital = () => {
  const dispatch = useAppDispatch();
  const { filters, options, loading } = useAppSelector(
    (state: { hospital: any }) => state.hospital
  );

  const [dropdownVisible, setDropdownVisible] = useState({
    state: false,
    category: false,
    subcategory: false,
    cpt: false,
    service: false,
  });

  const { searchResults } = useAppSelector((state) => state.hospital);

  // ✅ Fetch list of states on mount
  useEffect(() => {
    fetch("https://dorsaldata1.apurbatech.io/common/get_states")
      .then((response) => response.json())
      .then((data) => dispatch(setOptions({ field: "state", values: data })))
      .catch((error) => console.error("Error loading states:", error));
  }, [dispatch]);

  useEffect(() => {
    const state = filters.state;
    const url = state
      ? `https://dorsaldata1.apurbatech.io/hospital_finder/get_categories?state=${encodeURIComponent(
          state
        )}`
      : `https://dorsaldata1.apurbatech.io/hospital_finder/get_categories`;

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch categories");
        return response.json();
      })
      .then((data) => {
        let categories: string[] = [];

        if (Array.isArray(data)) {
          categories = data;
        } else if (data.categories) {
          categories = data.categories;
        } else if (data.service_categories) {
          categories = data.service_categories;
        } else {
          throw new Error("Unexpected data structure from /get_categories");
        }
        dispatch(setOptions({ field: "category", values: categories }));
      })
      .catch((error) => {
        console.error("Error loading categories:", error);
        alert("Error loading categories. Please try again.");
      });
  }, [filters.state, dispatch]);

  // Fetch sub-categories when category changes
  useEffect(() => {
    const selectedCategory = filters.category;
    const state = filters.state;

    // Reset subcategory, cpt and service when category changes
    dispatch(
      setFilters({
        subcategory: "",
        cpt: "",
        service: "",
      })
    );

    dispatch(setOptions({ field: "subcategory", values: [] }));
    dispatch(setOptions({ field: "cpt", values: [] }));
    dispatch(setOptions({ field: "service", values: [] }));

    if (!selectedCategory) return;

    const url = new URL(
      "https://dorsaldata1.apurbatech.io/hospital_finder/get_sub_categories"
    );
    url.searchParams.append("service_category", selectedCategory);
    if (state) url.searchParams.append("state", state);

    fetch(url.toString())
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch sub-categories");
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data.sub_categories))
          throw new Error("Invalid data format");
        dispatch(
          setOptions({ field: "subcategory", values: data.sub_categories })
        );
      })
      .catch((error) => {
        console.error("Error updating sub-categories:", error);
        alert("Error updating sub-categories. Please try again.");
      });
  }, [filters.category, filters.state, dispatch]);

  // Fetch CPT codes and service names when subcategory changes
  useEffect(() => {
    const selectedSubCategory = filters.subcategory;
    const state = filters.state;

    // Reset CPT and Service fields
    dispatch(
      setFilters({
        cpt: "",
        service: "",
      })
    );

    dispatch(setOptions({ field: "cpt", values: [] }));
    dispatch(setOptions({ field: "service", values: [] }));

    if (!selectedSubCategory) return;

    const url = new URL(
      "https://dorsaldata1.apurbatech.io/hospital_finder/update_dropdowns"
    );
    url.searchParams.append("sub_category", selectedSubCategory);
    if (state) url.searchParams.append("state", state);

    fetch(url.toString())
      .then((response) => {
        if (!response.ok)
          throw new Error("Failed to fetch CPT and Service data");
        return response.json();
      })
      .then((data) => {
        if (
          !Array.isArray(data.selected_cpt_codes) ||
          !Array.isArray(data.selected_service_names)
        ) {
          throw new Error("Invalid data format from /update_dropdowns");
        }

        dispatch(
          setOptions({
            field: "cpt",
            values: data.selected_cpt_codes,
          })
        );
        dispatch(
          setOptions({
            field: "service",
            values: data.selected_service_names,
          })
        );
      })
      .catch((error) => {
        console.error("Error updating CPT and Service:", error);
        alert("Error updating CPT/Service dropdowns. Please try again.");
      });
  }, [filters.subcategory, filters.state, dispatch]);

  const handleSelect = (field: string, value: string) => {
    dispatch(setFilters({ [field]: value }));
    setDropdownVisible((prev) => ({ ...prev, [field]: false }));
  };

  const handleSearch = () => {
    const { state, category, subcategory, cpt, service } = filters;

    if (!category) {
      alert("Please select a service category");
      return;
    }

    if (!cpt) {
      alert("Please select  a CPT code");
      return;
    }
    if (!subcategory && !service) {
      alert(
        "Please select either a sub-category, a CPT code, or a service name"
      );
      return;
    }

    const params = new URLSearchParams({ service_category: category });
    if (state) params.append("state", state);
    if (subcategory) params.append("sub_category", subcategory);
    if (cpt) params.append("cpt_code", cpt);
    else if (service) params.append("service_name", service);

    dispatch(setLoading(true));

    fetch(
      `https://dorsaldata1.apurbatech.io/hospital_finder/search?${params.toString()}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("✅ Search Results API Response:", data);
        dispatch(
          setSearchResults({
            ...data,
            selectedState: state,
            selectedServiceCategory: category,
            selectedSubcategory: subcategory,
            selectedCptCode: cpt,
            selectedServiceName: service,
          })
        );

        console.log("✅ Dispatched setSearchResults to Redux:", data);
      })
      .catch((error) => {
        console.error("❌ Error performing search:", error);
      })
      .finally(() => dispatch(setLoading(false)));
  };

  return (
    <>
      <section id="SearchHospital" className="container py-6">
      <div className="flex flex-wrap lg:flex-nowrap items-center border border-purple-400 rounded overflow-hidden bg-white text-sm">
  {/* Filter Options */}
  <div className="flex flex-wrap flex-grow">
    {[
      { key: "state", label: "State", placeholder: "Select State" },
      { key: "category", label: "Service Category", placeholder: "Select Service Category" },
      { key: "subcategory", label: "Subcategory", placeholder: "Select Subcategory" },
      { key: "cpt", label: "CPT Code", placeholder: "Select CPT Code" },
      { key: "service", label: "Service Name", placeholder: "Select Service Name" },
    ].map((item) => (
      <div key={item.key} className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/5 lg:border-r md:border-r p-2">
        <label className="block text-xs text-black font-semibold">{item.label}</label>
        <select
          className="w-full focus:outline-none text-sm"
          value={filters[item.key as keyof typeof filters]}
          onChange={(e) => handleSelect(item.key, e.target.value)}
        >
          <option value="">{item.placeholder}</option>
          {Array.isArray(options[item.key as keyof typeof options]) &&
            (options[item.key as keyof typeof options] as string[]).map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
        </select>

        {dropdownVisible[item.key as keyof typeof dropdownVisible] && (
          <ul className="absolute left-0 right-0 top-full bg-white border border-purple-300 shadow-sm z-10 text-sm max-h-40 overflow-y-auto min-h-[30px]">
            {(options[item.key as keyof typeof options] as string[])
              .filter((opt) => {
                const filterValue = filters[item.key as keyof typeof filters].toLowerCase();
                return filterValue === "" || opt.toLowerCase().includes(filterValue);
              })
              .map((opt, idx) => (
                <li
                  key={idx}
                  className="px-3 py-1 hover:bg-purple-100 cursor-pointer"
                  onMouseDown={() => handleSelect(item.key, opt)}
                >
                  {opt}
                </li>
              ))}
          </ul>
        )}
      </div>
    ))}
  </div>

  {/* Search Button - Align inline for desktop */}
  <button
    onClick={handleSearch}
    className="bg-purple hover:bg-primary text-white px-10 lg:py-4 py-2  sm:px-10 text-sm font-semibold border lg:w-auto w-full"
  >
    {loading ? "Searching..." : "SEARCH"}
  </button>
</div>


        {/* Filter dropdowns */}

        {searchResults && (
       <div className="mt-4 bg-light-purple p-2 rounded flex flex-wrap gap-2 text-xs mb-4 sm:mb-0">
       <span className="font-semibold w-full sm:w-auto">Filter by:</span>
     
       <div className="w-full sm:flex sm:flex-wrap sm:gap-2">
         <select className="w-full sm:w-auto lg:mb-0 mb-2 pl-3 pr-8 py-1 rounded border bg-white" defaultValue="15 miles">
           <option disabled>Select Distance</option>
           <option value="15 miles">Within 15 miles</option>
           <option value="30 miles">Within 30 miles</option>
           <option value="50 miles">Within 50 miles</option>
         </select>
     
         <select className="w-full lg:mb-0 mb-2 sm:w-auto pl-3 pr-8 py-1 rounded border bg-white" defaultValue="Rating">
           <option disabled>Select Rating</option>
           <option value="5 stars">5 Stars</option>
           <option value="2+ stars">2+ Stars</option>
         </select>
     
         <select className="w-full lg:mb-0 mb-2 sm:w-auto pl-3 pr-8 py-1 rounded border bg-white" defaultValue="Insurance">
           <option disabled>Select Insurance</option>
           <option value="Plan A">Plan A</option>
           <option value="Plan B">Plan B</option>
         </select>
     
         <select className="w-full lg:mb-0 mb-2 sm:w-auto pl-3 pr-8 py-1 rounded border bg-white" defaultValue="Fixed Price">
           <option disabled>Select Price Type</option>
           <option value="Fixed">Fixed Price</option>
           <option value="Negotiated">Negotiated Price</option>
         </select>
       </div>
     </div>
     
      
        )}
      </section>

      {/*   <div className="mt-6">
  <h3 className="font-semibold text-sm mb-2">
    Found {searchResults.hospital_count} hospitals
  </h3>

  {searchResults.hospital_count > 0 ? (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-4 py-2 border">Hospital Name</th>
            <th className="text-left px-4 py-2 border">Price</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.hospital_names.map((name, idx) => (
            <tr key={idx}>
              <td className="px-4 py-2 border">{name}</td>
              <td className="px-4 py-2 border">
                {searchResults.prices[idx]
                  ? `$${searchResults.prices[idx].toFixed(2)}`
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="text-red-500 mt-4">No hospitals found for the selected filters.</div>
  )}
</div> */}
    </>
  );
};
