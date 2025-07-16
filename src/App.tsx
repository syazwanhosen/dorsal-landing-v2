import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";

import { Hero } from "./components/Hero";
import { UploadBill } from "./components/UploadBill";
import { NameAndShame } from "./components/NameAndShame";


import { FAQ } from "./components/FAQ";
import RoadmapCTA from "./components/RoadmapCTA";
import Testimonials from "./components/Testimonials";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <UploadBill />
      <NameAndShame />
      <RoadmapCTA />
      <Testimonials />
    
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
