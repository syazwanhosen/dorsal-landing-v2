import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";

import { Hero } from "./components/Hero";
import { UploadBill } from "./components/UploadBill";
import { NameAndShame } from "./components/NameAndShame";
import { Cta } from "./components/Cta";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import RoadmapCTA from "./components/RoadmapCTA";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <UploadBill />
      <NameAndShame />
      <RoadmapCTA />
      <Cta />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
