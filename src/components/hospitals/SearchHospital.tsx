import React, { useState, useEffect } from "react";
import { ProcedureCard } from "./ProcedureCard";

export const SearchHospital = () => {
  const [filters, setFilters] = useState({
    state: "",
    category: "",
    subcategory: "",
    cpt: "",
    service: "", 
  });

  const [dropdownVisible, setDropdownVisible] = useState({
    state: false,
    category: false,
    subcategory: false,
    cpt: false,
    service: false,
  });

  const [options, setOptions] = useState({
    state: [] as string[],
    category: [] as string[],
    subcategory: [] as string[],
    cpt: [] as string[],
    service: [] as string[],
  });

  // Fetch list of states on mount
  useEffect(() => {
    fetch("https://dorsaldata1.apurbatech.io/common/get_states")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch states");
        return response.json();
      })
      .then((data) => {
        console.log("Fetched states:", data);
        setOptions((prev) => ({ ...prev, state: data }));
      })
      .catch((error) => {
        console.error("Error loading states:", error);
        alert("Error loading states. Please try again.");
      });
  }, []);

  // Fetch categories when state changes
  useEffect(() => {
    const state = filters.state;
    const url = state
      ? `https://dorsaldata1.apurbatech.io/hospital_finder/get_categories?state=${encodeURIComponent(state)}`
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

        setOptions((prev) => ({
          ...prev,
          category: categories,
        }));
      })
      .catch((error) => {
        console.error("Error loading categories:", error);
        alert("Error loading categories. Please try again.");
      });
  }, [filters.state]); // runs every time state changes


// Fetch sub-categories when category changes
useEffect(() => {
  const selectedCategory = filters.category;
  const state = filters.state;

  // Reset subcategory, cpt and service when category changes
  setFilters((prev) => ({
    ...prev,
    subcategory: "",
    cpt: "",
    service: "",
  }));

  setOptions((prev) => ({
    ...prev,
    subcategory: [],
    cpt: [],
    service: [],
  }));

  if (!selectedCategory) return;

  const url = new URL("https://dorsaldata1.apurbatech.io/hospital_finder/get_sub_categories");
  url.searchParams.append("service_category", selectedCategory);
  if (state) url.searchParams.append("state", state);

  fetch(url.toString())
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch sub-categories");
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data.sub_categories)) throw new Error("Invalid data format");
      setOptions((prev) => ({
        ...prev,
        subcategory: data.sub_categories,
      }));
    })
    .catch((error) => {
      console.error("Error updating sub-categories:", error);
      alert("Error updating sub-categories. Please try again.");
    });
}, [filters.category, filters.state]);

// Fetch CPT codes and service names when subcategory changes
useEffect(() => {
  const selectedSubCategory = filters.subcategory;
  const state = filters.state;

  // Reset CPT and Service fields
  setFilters((prev) => ({
    ...prev,
    cpt: "",
    service: "",
  }));

  setOptions((prev) => ({
    ...prev,
    cpt: [],
    service: [],
  }));

  if (!selectedSubCategory) return;

  const url = new URL("https://dorsaldata1.apurbatech.io/hospital_finder/update_dropdowns");
  url.searchParams.append("sub_category", selectedSubCategory);
  if (state) url.searchParams.append("state", state);

  fetch(url.toString())
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch CPT and Service data");
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data.selected_cpt_codes) || !Array.isArray(data.selected_service_names)) {
        throw new Error("Invalid data format from /update_dropdowns");
      }

      setOptions((prev) => ({
        ...prev,
        cpt: data.selected_cpt_codes,
        service: data.selected_service_names,
      }));
    })
    .catch((error) => {
      console.error("Error updating CPT and Service:", error);
      alert("Error updating CPT/Service dropdowns. Please try again.");
    });
}, [filters.subcategory, filters.state]);

  const handleSelect = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setDropdownVisible((prev) => ({ ...prev, [field]: false }));
  };

  const [searchResults, setSearchResults] = useState<{
    hospital_names: string[];
    prices: number[];
    hospital_count: number;
    generic_service_name?: string;
    service_description?: string;
  } | null>(null);
  
  const [loading, setLoading] = useState(false);


  const handleSearch = () => {
    const { state, category, subcategory, cpt, service } = filters;
  
    if (!category) {
      alert("Please select a service category");
      return;
    }
  
    if (!subcategory && !cpt && !service) {
      alert("Please select either a sub-category, a CPT code, or a service name");
      return;
    }
  
    const params = new URLSearchParams({ service_category: category });
    if (state) params.append("state", state);
    if (subcategory) params.append("sub_category", subcategory);
    if (cpt) params.append("cpt_code", cpt);
    else if (service) params.append("service_name", service);
  
    setLoading(true);
  
    fetch(`https://dorsaldata1.apurbatech.io/hospital_finder/search?${params.toString()}`)
      .then((response) => {
        if (!response.ok) throw new Error("Search failed");
        return response.json();
      })
      .then((data) => {
        setSearchResults(data);
      })
      .catch((error) => {
        console.error("Error performing search:", error);
        alert("An error occurred while searching. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <section id="SearchHospital" className="container py-6">
      <div className="flex items-stretch border border-purple-400 rounded overflow-hidden bg-white text-sm">
        {[
          { key: "state", label: "State", placeholder: "Select State" },
          { key: "category", label: "Service Category", placeholder: "Select Service Category" },
          { key: "subcategory", label: "Subcategory", placeholder: "Select Subcategory" },
          { key: "cpt", label: "CPT Code", placeholder: "Select CPT Code" },
          { key: "service", label: "Service Name", placeholder: "Select Service Name" },
        ].map((item) => (
          <div key={item.key} className="relative w-1/5 border-r p-2">
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

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-purple hover:bg-primary text-white px-10 text-sm font-semibold border last:border-r-0"
        >
          {loading ? "Searching..." : "SEARCH"}
        </button>
      </div>

      {/* Filter dropdowns */}
      <div className="mt-4 bg-light-purple p-2 rounded flex flex-wrap items-center gap-4 text-xs">
        <span className="font-semibold">Filter by:</span>

        <select className="pl-3 pr-8 py-1 rounded border bg-white">
          <option>Within 15 miles</option>
          <option>Within 30 miles</option>
          <option>Within 50 miles</option>
        </select>

        <select className="pl-3 pr-8 py-1 rounded border bg-white">
          <option>Rating</option>
          <option>5 Stars</option>
          <option>2+ Stars</option>
        </select>

        <select className="pl-3 pr-8 py-1 rounded border bg-white">
          <option>Insurance</option>
          <option>Plan A</option>
          <option>Plan B</option>
        </select>

        <select className="pl-3 pr-8 py-1 rounded border bg-white">
          <option>Fixed Price</option>
          <option>Negotiated Price</option>
        </select>
      </div>


      {searchResults && (
        <>
          <ProcedureCard
            serviceName={searchResults.generic_service_name}
            serviceDescription={searchResults.service_description}
            cptCode={filters.cpt || ""}
            hasSearchResult={searchResults.hospital_count > 0}
          />

          {/* ... rest of hospital table result rendering ... */}
          <div className="mt-6">
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
        </div>
        </>
      )}

    </section>
  );
};
