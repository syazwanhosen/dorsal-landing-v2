import "./Data.css";
import { NavbarSecondary } from "./components/NavbarSecondary";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { Header } from "./components/Header";
import { TotalStats } from "./components/TotalStats";
import { StatewisePricing } from "./components/StatewisePricing";
import { HospitalPrices } from "./components/HospitalPrices";

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
