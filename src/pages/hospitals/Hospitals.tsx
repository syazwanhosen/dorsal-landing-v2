import { useState } from "react";

// Components
import { NavbarSecondary } from "../../components/NavbarSecondary";
import { Footer } from "../../components/Footer";
import { ScrollToTop } from "../../components/ScrollToTop";
import { Header } from "../../components/Header";
import { SearchHospital } from "../../components/hospitals/SearchHospital";
import { ProcedureCard } from "../../components/hospitals/ProcedureCard";
import { MapResult } from "../../components/hospitals/MapResult";
import { HospitalComparison } from "../../components/hospitals/HospitalComparison";

import "./Hospitals.css";

export default function Data() {
  const [searchResults, setSearchResults] = useState<{
    hospital_names: string[];
    prices: number[];
    hospital_count: number;
    generic_service_name?: string;
    service_description?: string;
  } | null>(null);

  return (
    <>
      <NavbarSecondary />
      <Header title="Hospitals" />
      <SearchHospital searchResults={searchResults} setSearchResults={setSearchResults} />
      <ProcedureCard />
      <MapResult searchResults={searchResults} />
      <HospitalComparison />
      <Footer />
      <ScrollToTop />
    </>
  );
}
