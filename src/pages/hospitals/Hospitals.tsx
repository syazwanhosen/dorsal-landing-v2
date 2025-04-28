import "./Hospitals.css";
import { NavbarSecondary } from "../../components/NavbarSecondary";
import { Footer } from "../../components/Footer";
import { ScrollToTop } from "../../components/ScrollToTop";
import { Header } from "../../components/Header";
import { SearchHospital } from "../../components/hospitals/SearchHospital";
import { ProcedureCard } from "../../components/hospitals/ProcedureCard";
import { MapResult } from "../../components/hospitals/MapResult";
import { HospitalComparison } from "../../components/hospitals/HospitalComparison";

export default function Data() {
  return (
    <>
      <NavbarSecondary />
      <Header title="Hospitals" />
      <SearchHospital />
      <ProcedureCard />
      <MapResult />
      <HospitalComparison />
      <Footer />
      <ScrollToTop />
    </>
  );
}
