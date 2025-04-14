import "./Data.css";
import { NavbarSecondary } from "../../components/NavbarSecondary";
import { Footer } from "../../components/Footer";
import { ScrollToTop } from "../../components/ScrollToTop";
import { Header } from "../../components/Header";
import { TotalStats } from "../../components/dashboard/TotalStats";
import { StatewisePricing } from "../../components/dashboard/StatewisePricing";
import { HospitalPrices } from "../../components/dashboard/HospitalPrices";

export default function Data() {
  return (
    <>
      <NavbarSecondary />
      <Header />
      <TotalStats />
      <StatewisePricing />
      <HospitalPrices />
      <Footer />
      <ScrollToTop />
    </>
  );
}
