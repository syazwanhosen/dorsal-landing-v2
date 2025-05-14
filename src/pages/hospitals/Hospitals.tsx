import { useAppSelector } from "../../store";
import { NavbarSecondary } from "../../components/NavbarSecondary";
import { Footer } from "../../components/Footer";
import { ScrollToTop } from "../../components/ScrollToTop";
import { Header } from "../../components/Header";
import { SearchHospital } from "../../components/hospitals/SearchHospital";
import { ProcedureCard } from "../../components/hospitals/ProcedureCard";
import { MapResult } from "../../components/hospitals/MapResult";
import "./Hospitals.css";



export default function Hospitals() {

  const { searchResults } = useAppSelector((state) => state.hospital);

  return (

    <>
      <NavbarSecondary />
      <Header title="Hospitals" />
      <SearchHospital />
      {searchResults && (
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
      )}
      <Footer />
      <ScrollToTop />
    </>
  );
}