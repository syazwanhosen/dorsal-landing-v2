import { ServiceSearchProcedureCard } from "@/components/hospitals_service_search/ServiceSearchProcedureCard";
import { useAppSelector } from "@/store/hooks";
import { HospitalServiceSearch } from "@/components/hospitals_service_search/HospitalServiceSearch";
import { SearchSection } from "@/components/hospitals/SearchSection";
import { Navbar } from "@/components/Navbar";

import { ScrollToTop } from "@/components/ScrollToTop";

import { Header } from "@/components/Header";
import { HospitalServiceSearchMap } from "@/components/hospitals_service_search/HospitalServiceSearchMap";
import Footer from "@/components/Footer";

export default function Hospitals() {
  const { serviceSearchResults } = useAppSelector(
    (state) => state.hospitalServiceSearch
  );
  console.log("Redux Service Search Results:", serviceSearchResults);

  return (
    <>
      <div className="min-h-screen flex flex-col hospital_page">
        <div className="flex-grow">
          <Navbar />
          <Header title="Hospitals Service Search" />
          <HospitalServiceSearch />
          {serviceSearchResults ? (
            <>
              <ServiceSearchProcedureCard
                serviceName={serviceSearchResults.generic_service_name || ""}
                serviceDescription={
                  serviceSearchResults.service_description || ""
                }
                cptCode={serviceSearchResults.code}
                hasSearchResult={serviceSearchResults.hospital_count > 0}
                prices={serviceSearchResults.prices}
                hospitalNames={serviceSearchResults.hospital_names}
              />
              <HospitalServiceSearchMap />
            </>
          ) : (
            <SearchSection />
          )}
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
