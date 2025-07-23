import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setFilters,
  setOptions,
  setLoading,
  setSearchResults,
} from "../../features/hospitalSlice";
import { getStates, getCategories, getSubCategories, updateDropdowns, searchHospitals } from "@/api/Hospital/api";

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

  const [disabledFields, setDisabledFields] = useState({
    cpt: false,
    service: false
  });

  const { searchResults } = useAppSelector((state) => state.hospital);

  // States 
  useEffect(() => {
    getStates()
      .then((data: any) => dispatch(setOptions({ field: "state", values: data })))
      .catch((error: any) => console.error("Error loading states:", error));
  }, [dispatch]);

  // Categories 
  useEffect(() => {
    getCategories(filters.state)
      .then((data) => {
        let categories = Array.isArray(data)
          ? data
          : data.categories ?? data.service_categories ?? [];
        dispatch(setOptions({ field: "category", values: categories }));
      })
      .catch((error) => {
        console.error("Error loading categories:", error);
        alert("Error loading categories. Please try again.");
      });
  }, [filters.state, dispatch]);


  // Fetch sub-categories when category changes
  useEffect(() => {
    if (!filters.category) return;
  
    getSubCategories(filters.category, filters.state)
      .then((data) => {
        if (!Array.isArray(data.sub_categories)) throw new Error("Invalid data format");
        dispatch(setOptions({ field: "subcategory", values: data.sub_categories }));
      })
      .catch((error) => {
        console.error("Error updating sub-categories:", error);
        alert("Error updating sub-categories. Please try again.");
      });
  }, [filters.category, filters.state, dispatch]);

  // Fetch CPT codes and service names when subcategory changes
  useEffect(() => {
    if (!filters.subcategory) return;
  
    updateDropdowns(filters.subcategory, filters.state)
      .then((data) => {
        if (!Array.isArray(data.selected_cpt_codes) || !Array.isArray(data.selected_service_names)) {
          throw new Error("Invalid data format from /update_dropdowns");
        }
  
        dispatch(setOptions({ field: "cpt", values: data.selected_cpt_codes }));
        dispatch(setOptions({ field: "service", values: data.selected_service_names }));
      })
      .catch((error) => {
        console.error("Error updating CPT and Service:", error);
        alert("Error updating CPT/Service dropdowns. Please try again.");
      });
  }, [filters.subcategory, filters.state, dispatch]);


  const handleSelect = (field: string, value: string) => {
    dispatch(setFilters({ [field]: value }));
    setDropdownVisible((prev) => ({ ...prev, [field]: false }));

    // Update disabled fields based on selection
    if (field === 'cpt') {
      if (value) {
        setDisabledFields({ cpt: false, service: true });
        dispatch(setFilters({ service: "" })); // Clear service if CPT is selected
      } else if (!filters.service) {
        setDisabledFields({ cpt: false, service: false });
      }
    } else if (field === 'service') {
      if (value) {
        setDisabledFields({ cpt: true, service: false });
        dispatch(setFilters({ cpt: "" })); // Clear CPT if service is selected
      } else if (!filters.cpt) {
        setDisabledFields({ cpt: false, service: false });
      }
    }
  };


const handleSearch = () => {
  const { state, category, subcategory, cpt, service } = filters;

  if (!category) {
    alert("Please select a service category");
    return;
  }

  if (!cpt && !service) {
    alert("Please select either a CPT code or a Service name");
    return;
  }

  const params = new URLSearchParams({ service_category: category });
  if (state) params.append("state", state);
  if (subcategory) params.append("sub_category", subcategory);
  if (cpt) params.append("cpt_code", cpt);
  else if (service) params.append("service_name", service);

  dispatch(setLoading(true));

  searchHospitals(params)
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
              { 
                key: "cpt", 
                label: "CPT Code", 
                placeholder: "Select CPT Code",
                disabled: disabledFields.cpt
              },
              { 
                key: "service", 
                label: "Service Name", 
                placeholder: "Select Service Name",
                disabled: disabledFields.service
              },
            ].map((item) => (
              <div key={item.key} className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/5 lg:border-r md:border-r p-2">
                <label className="block text-xs text-black font-semibold">{item.label}</label>
                <select
                  className={`w-full focus:outline-none text-sm ${item.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  value={filters[item.key as keyof typeof filters]}
                  onChange={(e) => handleSelect(item.key, e.target.value)}
                  disabled={item.disabled}
                >
                  <option value="">{item.placeholder}</option>
                  {Array.isArray(options[item.key as keyof typeof options]) &&
                    (options[item.key as keyof typeof options] as string[]).map((opt, idx) => (
                      <option key={idx} value={opt}>
                        {opt}
                      </option>
                    ))}
                </select>

                {dropdownVisible[item.key as keyof typeof dropdownVisible] && !item.disabled && (
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

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-purple hover:bg-primary-700 text-white px-10 lg:py-4 py-2 sm:px-10 text-sm font-semibold border lg:w-auto w-full"
          >
            {loading ? "Searching..." : "SEARCH"}
          </button>
        </div>

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