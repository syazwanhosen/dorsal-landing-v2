import { useAppSelector } from "@/store/hooks";
import { NavbarSecondary } from "../../components/NavbarSecondary";

import { ScrollToTop } from "../../components/ScrollToTop";
import { Header } from "../../components/Header";
import { SearchHospital } from "../../components/hospitals/SearchHospital";
import { ProcedureCard } from "../../components/hospitals/ProcedureCard";
import { MapResult } from "../../components/hospitals/MapResult";
import { SearchSection } from "@/components/hospitals/SearchSection";
import Footer from "@/components/Footer";

export default function Hospitals() {
  const { searchResults } = useAppSelector((state) => state.hospital);
  return (
    <>
      <div className="min-h-screen flex flex-col hospital_page">
        <div className="flex-grow">
          <NavbarSecondary />
          <Header title="Search Hospitals" />
          <SearchHospital />
          {searchResults ? (
            <>
              <ProcedureCard
                serviceName={searchResults.generic_service_name || ""}
                serviceDescription={searchResults.service_description || ""}
                cptCode={searchResults.cpt_hcpcs_code}
                hasSearchResult={searchResults.hospital_count > 0}
                prices={searchResults.prices}
                hospitalNames={searchResults.hospital_names}
                labels={[]}
              />
              <MapResult />
            </>
          ) : <SearchSection />}
        </div>

       <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}