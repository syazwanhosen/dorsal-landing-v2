

// Components
import { NavbarSecondary } from "../../components/NavbarSecondary";
import { Footer } from "../../components/Footer";
import { ScrollToTop } from "../../components/ScrollToTop";
import { Header } from "../../components/Header";
import { DetailsCard } from "../../components/hospital_details/DetailsCard";
import { OtherServices } from "../../components/hospital_details/OtherServices";



export default function Data() {

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <NavbarSecondary />
        <Header title="Hospital Details" />
        <DetailsCard />
        <OtherServices />
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
