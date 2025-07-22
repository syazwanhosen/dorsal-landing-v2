import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setFilters,
  setOptions,
  setLoading,
  setSearchResults,
} from "../../features/hospitalSlice";
import {
  getStates,
  getCategories,
  getSubCategories,
  updateDropdowns,
  searchHospitals,
} from "@/api/Hospital/api";
import { useNavigate, useLocation } from "react-router-dom";

// Utility functions
const buildQueryString = (params: Record<string, string>) =>
  Object.entries(params)
    .filter(([_, value]) => value?.trim())
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

const validateFilters = (
  filters: any,
  options: any
): { isValid: boolean; message?: string } => {
  if (!filters.state?.trim()) {
    return { isValid: false, message: "Please select a State" };
  }
  if (!filters.category?.trim()) {
    return { isValid: false, message: "Please select a Service Category" };
  }
  if (!filters.subcategory?.trim() || !options.subcategory.includes(filters.subcategory.trim())) {
    return { isValid: false, message: "Please select a valid Subcategory" };
  }
  if (
    !filters.cpt?.trim() && 
    !filters.service?.trim()
  ) {
    return { isValid: false, message: "Please select either a CPT code or Service name" };
  }
  if (
    filters.cpt?.trim() && 
    !options.cpt.includes(filters.cpt.trim())
  ) {
    return { isValid: false, message: "Please select a valid CPT code" };
  }
  if (
    filters.service?.trim() && 
    !options.service.includes(filters.service.trim())
  ) {
    return { isValid: false, message: "Please select a valid Service name" };
  }
  return { isValid: true };
};

export const SearchHospital = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { filters, options, loading } = useAppSelector(
    (state: { hospital: any }) => state.hospital
  );

  const [, setDropdownVisible] = useState({
    state: false,
    category: false,
    subcategory: false,
    cpt: false,
    service: false,
  });

  const [disabledFields, setDisabledFields] = useState({
    cpt: false,
    service: false,
  });

  const [searchError, setSearchError] = useState<string | null>(null);
  const { searchResults } = useAppSelector((state) => state.hospital);

  const runSearch = (params: URLSearchParams) => {
    dispatch(setLoading(true));
    setSearchError(null);
  
    const state = params.get("state") ?? "";
    const category = params.get("service_category") ?? "";
    const subcategory = params.get("sub_category") ?? "";
    const cpt = params.get("cpt_code") ?? "";
    const service = params.get("service_name") ?? "";
  
    searchHospitals(params)
      .then((data) => {
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
        console.error("Search error:", error);
        setSearchError("Failed to perform search. Please try again.");
      })
      .finally(() => dispatch(setLoading(false)));
  };

  // Hydrate from URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const state = params.get("state");
    const category = params.get("category");
    const subcategory = params.get("subcategory");
    const cpt = params.get("cpt");
    const service = params.get("service");
  
    if (!state || !category || !subcategory || (!cpt && !service)) return;
  
    dispatch(setFilters({
      state,
      category,
      subcategory,
      cpt: cpt ?? "",
      service: service ?? "",
    }));
  
    const searchParams = new URLSearchParams();
    searchParams.set("state", state);
    searchParams.set("service_category", category);
    searchParams.set("sub_category", subcategory);
    if (cpt) searchParams.set("cpt_code", cpt);
    else if (service) searchParams.set("service_name", service);
  
    runSearch(searchParams);
  }, [location.search, dispatch]);

  // States
  useEffect(() => {
    getStates()
      .then((data: any) =>
        dispatch(setOptions({ field: "state", values: data }))
      )
      .catch((error: any) => console.error("Error loading states:", error));
  }, [dispatch]);

  // Categories
  useEffect(() => {
    if (!filters.state) return;
    
    getCategories(filters.state)
      .then((data) => {
        let categories = Array.isArray(data)
          ? data
          : data.categories ?? data.service_categories ?? [];
        dispatch(setOptions({ field: "category", values: categories }));
      })
      .catch((error) => {
        console.error("Error loading categories:", error);
      });
  }, [filters.state, dispatch]);

  // Sub-categories
  useEffect(() => {
    if (!filters.category || !filters.state) return;
  
    getSubCategories(filters.category, filters.state)
      .then((data) => {
        if (!Array.isArray(data.sub_categories))
          throw new Error("Invalid data format");
        dispatch(
          setOptions({ field: "subcategory", values: data.sub_categories })
        );
      })
      .catch((error) => {
        console.error("Error updating sub-categories:", error);
      });
  }, [filters.category, filters.state, dispatch]);

  // CPT codes and service names
  useEffect(() => {
    if (!filters.subcategory || !filters.state) return;

    updateDropdowns(filters.subcategory, filters.state)
      .then((data) => {
        if (
          !Array.isArray(data.selected_cpt_codes) ||
          !Array.isArray(data.selected_service_names)
        ) {
          throw new Error("Invalid data format from /update_dropdowns");
        }

        dispatch(setOptions({ field: "cpt", values: data.selected_cpt_codes }));
        dispatch(
          setOptions({ field: "service", values: data.selected_service_names })
        );
      })
      .catch((error) => {
        console.error("Error updating CPT and Service:", error);
      });
  }, [filters.subcategory, filters.state, dispatch]);

  const handleSelect = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value };
    dispatch(setFilters(newFilters));
    setDropdownVisible((prev) => ({ ...prev, [field]: false }));

    // Update disabled fields based on selection
    if (field === "cpt") {
      if (value) {
        setDisabledFields({ cpt: false, service: true });
        dispatch(setFilters({ ...newFilters, service: "" }));
      } else if (!newFilters.service) {
        setDisabledFields({ cpt: false, service: false });
      }
    } else if (field === "service") {
      if (value) {
        setDisabledFields({ cpt: true, service: false });
        dispatch(setFilters({ ...newFilters, cpt: "" }));
      } else if (!newFilters.cpt) {
        setDisabledFields({ cpt: false, service: false });
      }
    }
  };

  const handleSearch = () => {
    const validation = validateFilters(filters, options);
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    const { state, category, subcategory, cpt, service } = filters;
  
    // Build query string for browser URL
    const queryParams: Record<string, string> = {
      state,
      category,
      subcategory,
    };
  
    if (cpt) queryParams.cpt = cpt;
    else if (service) queryParams.service = service;
  
    const queryString = buildQueryString(queryParams);
    navigate(`/hospitals?${queryString}`, { replace: true });
  
    // Build backend param keys for API call
    const searchParams = new URLSearchParams();
    searchParams.set("state", state);
    searchParams.set("service_category", category);
    searchParams.set("sub_category", subcategory);
    if (cpt) searchParams.set("cpt_code", cpt);
    else if (service) searchParams.set("service_name", service);
  
    runSearch(searchParams);
  };

  return (
    <>
      <section id="SearchHospital" className="container py-6">
        <div className="flex flex-wrap lg:flex-nowrap items-center border border-purple-400 rounded overflow-hidden bg-white text-sm">
          {/* Filter Options */}
          <div className="flex flex-wrap flex-grow">
            {[
              { key: "state", label: "State", placeholder: "Select State" },
              {
                key: "category",
                label: "Service Category",
                placeholder: "Select Service Category",
              },
              {
                key: "subcategory",
                label: "Subcategory",
                placeholder: "Select Subcategory",
              },
              {
                key: "cpt",
                label: "CPT Code",
                placeholder: "Select CPT Code",
                disabled: disabledFields.cpt,
              },
              {
                key: "service",
                label: "Service Name",
                placeholder: "Select Service Name",
                disabled: disabledFields.service,
              },
            ].map((item) => (
              <div
                key={item.key}
                className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/5 lg:border-r md:border-r p-2"
              >
                <label className="block text-xs text-black font-semibold">
                  {item.label}
                </label>
                <select
                  className={`w-full focus:outline-none text-sm ${
                    item.disabled ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  value={filters[item.key as keyof typeof filters]}
                  onChange={(e) => handleSelect(item.key, e.target.value)}
                  disabled={item.disabled}
                >
                  <option value="">{item.placeholder}</option>
                  {Array.isArray(options[item.key as keyof typeof options]) &&
                    (options[item.key as keyof typeof options] as string[]).map(
                      (opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      )
                    )}
                </select>
              </div>
            ))}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-purple hover:bg-primary text-white px-10 lg:py-4 py-2 sm:px-10 text-sm font-semibold border lg:w-auto w-full disabled:opacity-50"
          >
            {loading ? "Searching..." : "SEARCH"}
          </button>
        </div>

        {searchError && (
          <div className="mt-4 text-red-500 text-sm">
            {searchError}
          </div>
        )}

        {searchResults && (
          <div className="mt-4 bg-light-purple p-2 rounded flex flex-wrap gap-2 text-xs mb-4 sm:mb-0">
            <span className="font-semibold w-full sm:w-auto">Filter by:</span>

            <div className="w-full sm:flex sm:flex-wrap sm:gap-2">
              <select
                className="w-full sm:w-auto lg:mb-0 mb-2 pl-3 pr-8 py-1 rounded border bg-white"
                defaultValue="15 miles"
              >
                <option disabled>Select Distance</option>
                <option value="15 miles">Within 15 miles</option>
                <option value="30 miles">Within 30 miles</option>
                <option value="50 miles">Within 50 miles</option>
              </select>

              <select
                className="w-full lg:mb-0 mb-2 sm:w-auto pl-3 pr-8 py-1 rounded border bg-white"
                defaultValue="Rating"
              >
                <option disabled>Select Rating</option>
                <option value="5 stars">5 Stars</option>
                <option value="2+ stars">2+ Stars</option>
              </select>

              <select
                className="w-full lg:mb-0 mb-2 sm:w-auto pl-3 pr-8 py-1 rounded border bg-white"
                defaultValue="Insurance"
              >
                <option disabled>Select Insurance</option>
                <option value="Plan A">Plan A</option>
                <option value="Plan B">Plan B</option>
              </select>

              <select
                className="w-full lg:mb-0 mb-2 sm:w-auto pl-3 pr-8 py-1 rounded border bg-white"
                defaultValue="Fixed Price"
              >
                <option disabled>Select Price Type</option>
                <option value="Fixed">Fixed Price</option>
                <option value="Negotiated">Negotiated Price</option>
              </select>
            </div>
          </div>
        )}
      </section>
    </>
  );
};