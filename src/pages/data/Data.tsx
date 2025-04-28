import "./Data.css";
import { NavbarSecondary } from "../../components/NavbarSecondary";
import { Footer } from "../../components/Footer";
import { ScrollToTop } from "../../components/ScrollToTop";
import { Header } from "../../components/Header";
import { TotalStats } from "../../components/dashboard/TotalStats";
import { StatewisePricing } from "../../components/dashboard/StatewisePricing";
import { HospitalPrices } from "../../components/dashboard/HospitalPrices";
import { CostCompare } from "@/components/dashboard/CostCompare";

export default function Data() {
  return (
    <>
      <NavbarSecondary />
      <Header title="Dashboard" />
      <TotalStats />
      <StatewisePricing />
      <HospitalPrices />
      <CostCompare />
      <Footer />
      <ScrollToTop />
    </>
  );
}
