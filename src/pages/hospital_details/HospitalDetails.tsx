

// Components
import { NavbarSecondary } from "../../components/NavbarSecondary";
import { Footer } from "../../components/Footer";
import { ScrollToTop } from "../../components/ScrollToTop";
import { Header } from "../../components/Header";
import { DetailsCard } from "../../components/hospital_details/DetailsCard";
import { OtherServices } from "../../components/hospital_details/OtherServices";

import "./HospitalDetails.css";

export default function Data() {
 
  return (
    <>
      <NavbarSecondary />
      <Header title="Hospital Details" />
      <DetailsCard  />
      <OtherServices />
      <Footer />
      <ScrollToTop />
    </>
  );
}
