import {
  getCategoriesByHospital,
  getServices,
  getSubCategoriesByHospital,
} from "@/api/api";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

interface Service {
  cpt_code: number;
  service_name: string;
}

export const OtherServices = () => {
  const { selectedHospital } = useAppSelector((state) => state.hospitalMap);

  const selectedHospitalName = selectedHospital?.name || "";

  const [selectedServiceCategory, setSelectedServiceCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [showServices, setShowServices] = useState(false);

  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedHospitalName) {
      getCategoriesByHospital(selectedHospitalName)
        .then((data) => setCategories(data.categories))
        .catch((error) => console.error("Error fetching categories:", error));
    }
  }, [selectedHospitalName]);

  useEffect(() => {
    if (selectedHospitalName && selectedServiceCategory) {
      getSubCategoriesByHospital(selectedHospitalName, selectedServiceCategory)
        .then((data) => setSubcategories(data.sub_categories))
        .catch((error) =>
          console.error("Error fetching subcategories:", error)
        );
    }
  }, [selectedHospitalName, selectedServiceCategory]);

  // Fetch Services When "Show Services" Button Is Clicked
  const fetchServices = () => {
    if (
      selectedHospitalName &&
      selectedServiceCategory &&
      selectedSubcategory
    ) {
      setLoading(true);
      setError("");

      getServices(
        selectedHospitalName,
        selectedServiceCategory,
        selectedSubcategory
      )
        .then((data) => {
          if (data.codes && data.services) {
            setServices(
              data.codes.map((code: number, index: number) => ({
                cpt_code: code,
                service_name: data.services[index] || "Unknown Service",
              }))
            );
            setShowServices(true);
          } else {
            setServices([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching services:", error);
          setError("Failed to load services. Please try again.");
        })
        .finally(() => setLoading(false));
    }
  };

  // Reset Table When "Reset" Button is Clicked
  const resetSelection = () => {
    setSelectedServiceCategory("");
    setSelectedSubcategory("");
    setServices([]);
    setShowServices(false);
  };

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 8; // Show 8 services per page

  // Calculate Services to Display Per Page
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService
  );

  // Change Page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Filter Card */}
      <div className="border rounded-lg p-4 shadow-sm col-span-1">
        <h3 className="text-md font-semibold mb-4">Other Services</h3>

        {/* Selected Search Criteria
      <div className="bg-light-purple p-2 rounded text-xs mt-4">
        <h3 className="text-lg font-bold">Selected Search Criteria:</h3>
        <p><strong>Hospital Name:</strong> {selectedHospital.name}</p>
        <p><strong>State:</strong> {selectedHospital.selectedState}</p>
        <p><strong>Service Category:</strong> {selectedServiceCategory}</p>
        <p><strong>Subcategory:</strong> {selectedSubcategory}</p>
        <p><strong>CPT Code:</strong> {selectedHospital.selectedCptCode}</p>
        <p><strong>Service Name:</strong> {selectedHospital.selectedServiceName}</p>
      </div>
      */}

        {/* Category Dropdown */}
        <select
          className="w-full border rounded px-3 py-2 text-sm mb-4"
          value={selectedServiceCategory}
          onChange={(e) => {
            setSelectedServiceCategory(e.target.value);
            setSelectedSubcategory("");
            setCurrentPage(1);
            setServices([]);
          }}
        >
          <option value="">Select Service Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Subcategory Dropdown (Disabled Until Category is Selected) */}
        <select
          className="w-full border rounded px-3 py-2 text-sm mb-4"
          value={selectedSubcategory}
          onChange={(e) => {
            setSelectedSubcategory(e.target.value);
            setCurrentPage(1);
            setServices([]);
          }}
          disabled={!selectedServiceCategory} // 🚀 Subcategory is disabled until category is selected
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory} value={subcategory}>
              {subcategory}
            </option>
          ))}
        </select>

        <button
          onClick={fetchServices}
          className="w-full bg-purple text-white py-2 px-4 rounded hover:bg-purple-700 transition mb-2"
          disabled={!selectedServiceCategory || !selectedSubcategory} // Button disabled until both category & subcategory are selected
        >
          Show Services
        </button>
        <button
          onClick={resetSelection}
          className="w-full border border-purple-400 text-black py-2 px-4 rounded hover:bg-purple-50 transition"
        >
          Reset
        </button>
      </div>

      {/* Services Table */}
      <div className="col-span-1 lg:col-span-3 border rounded-lg p-4 shadow-sm">
        <h3 className="text-md font-semibold mb-4">
          {selectedServiceCategory}
        </h3>

        {loading ? (
          <p className="text-sm text-gray-500">Loading services...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : !showServices ? (
          <p className="text-sm text-gray-500">
            Please select a category and subcategory to view services.
          </p>
        ) : services.length > 0 ? (
          <>
            <table className="w-full text-left border-collapse text-sm ">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-4 px-2 text-[#3A3541]">CPT Code</th>
                  <th className="py-2 px-2 text-[#3A3541]">Service Name</th>
                </tr>
              </thead>
              <tbody>
                {currentServices.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="py-4 px-2 text-[#89868D]">
                      {item.cpt_code}
                    </td>
                    <td className="py-4 px-2 text-[#89868D]">
                      {item.service_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ✅ Pagination Controls: Show only if services exist AND > 8 */}
            {services.length > servicesPerPage && services.length > 0 && (
              <div className="flex justify-center gap-2 mt-4">
                {[
                  ...Array(Math.ceil(services.length / servicesPerPage)).keys(),
                ].map((page) => (
                  <button
                    key={page + 1}
                    onClick={() => paginate(page + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page + 1
                        ? "bg-purple text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-500">
            No services available for this category.
          </p>
        )}
      </div>
    </section>
  );
};
