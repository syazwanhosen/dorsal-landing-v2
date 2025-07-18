
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";

import { Hero } from "./components/Hero";
import { UploadBill } from "./components/UploadBill";
import { NameAndShame } from "./components/NameAndShame";
import { Experts } from "./components/Experts";

import { FAQ } from "./components/FAQ";
import RoadmapCTA from "./components/RoadmapCTA";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import { Banner } from "./components/Banner";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Banner />
      <UploadBill />
      <NameAndShame />
      <Experts />
      <RoadmapCTA />
      <Testimonials /> 
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
