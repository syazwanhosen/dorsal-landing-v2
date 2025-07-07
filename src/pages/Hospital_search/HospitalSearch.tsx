import { ServiceSearchProcedureCard } from "@/components/hospitals_search/ServiceSearchProcedureCard";
import { useAppSelector } from "@/store/hooks";
import { HospitalServiceSearch } from "@/components/hospitals_search/HospitalServiceSearch";
import { SearchSection } from "@/components/hospitals/SearchSection";
import { NavbarSecondary } from "@/components/NavbarSecondary";

import { ScrollToTop } from "@/components/ScrollToTop";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HospitalServiceSearchMap } from "@/components/hospitals_search/HospitalServiceSearchMap";

export default function Hospitals() {
  const { serviceSearchResults } = useAppSelector(
    (state) => state.hospitalServiceSearch
  );
  console.log("Redux Service Search Results:", serviceSearchResults);

  return (
    <>
      <div className="min-h-screen flex flex-col hospital_page">
        <div className="flex-grow">
          <NavbarSecondary />
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
