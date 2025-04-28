import React, { useState, useEffect } from "react";

export const SearchHospital = () => {
  const [filters, setFilters] = useState({
    category: "",
    subcategory: "",
    cpt: "",
    service: "",
    state: "",
  });

  const [dropdownVisible, setDropdownVisible] = useState({
    category: false,
    subcategory: false,
    cpt: false,
    service: false,
    state: false,
  });

  const [options, setOptions] = useState({
    category: ["Cardiography", "Radiology", "Oncology"],
    subcategory: ["Medicine", "Surgery", "Therapy"],
    cpt: ["99201", "99202", "99203"],
    service: ["MRI with Contrast", "Ultrasound", "X-Ray"],
    state: [] as string[],
  });

  // Fetch state options on mount
  useEffect(() => {
    fetch("https://dorsaldata1.apurbatech.io/cost_comparison/get_states")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch states");
        }
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

  const handleInput = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setDropdownVisible((prev) => ({ ...prev, [field]: true }));
  };

  const handleSelect = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setDropdownVisible((prev) => ({ ...prev, [field]: false }));
  };

  const closeDropdown = (field: string) => {
    setTimeout(() => {
      setDropdownVisible((prev) => ({ ...prev, [field]: false }));
    }, 150);
  };

  return (
    <section id="SearchHospital" className="container py-6">
      <div className="flex items-stretch border border-purple-400 rounded overflow-hidden bg-white text-sm">
        {[
          { key: "category", label: "Service Category", placeholder: "e.g. Cardiography" },
          { key: "subcategory", label: "Subcategory", placeholder: "e.g. Medicine" },
          { key: "cpt", label: "CPT Code", placeholder: "e.g. 99201" },
          { key: "service", label: "Service Name", placeholder: "e.g. MRI with Contrast" },
          { key: "state", label: "State", placeholder: "e.g. New York" },
        ].map((item) => (
          <div key={item.key} className="relative w-1/5 border-r p-2">
            <label className="block text-xs text-black font-semibold">{item.label}</label>
            <input
              className="w-full focus:outline-none text-sm"
              placeholder={item.placeholder}
              value={filters[item.key as keyof typeof filters]}
              onChange={(e) => handleInput(item.key, e.target.value)}
              onBlur={() => setTimeout(() => closeDropdown(item.key), 100)}
            />
            {dropdownVisible[item.key as keyof typeof dropdownVisible] && (
              <ul className="absolute left-0 right-0 top-full bg-white border border-purple-300 shadow-sm z-10 text-sm max-h-40 overflow-y-auto min-h-[30px]">
                {Array.isArray(options[item.key as keyof typeof options]) &&
                  (options[item.key as keyof typeof options] as string[])
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
        <button className="bg-purple hover:bg-primary text-white px-10 text-sm font-semibold">
          SEARCH
        </button>
      </div>

      {/* Filter dropdowns */}
      <div className="mt-4 bg-light-purple p-2 rounded flex flex-wrap items-center gap-4 text-xs">
        <span className="font-semibold">Filter by:</span>

        <select className="px-10 py-1 rounded border bg-white text-left">
          <option>Within 15 miles</option>
          <option>Within 30 miles</option>
          <option>Within 50 miles</option>
        </select>

        <select className="px-10 py-1 rounded border bg-white text-left">
          <option>Rating</option>
          <option>5 Stars</option>
          <option>2+ Stars</option>
        </select>

        <select className="px-10 py-1 rounded border bg-white text-left">
          <option>Insurance</option>
          <option>Plan A</option>
          <option>Plan B</option>
        </select>

        <select className="px-10 py-1 rounded border bg-white text-left">
          <option>Fixed Price</option>
          <option>Negotiated Price</option>
        </select>
      </div>
    </section>
  );
};
