import "./App.css";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";
import { Newsletter } from "./components/Newsletter";
import { Pricing } from "./components/Pricing";
import { ScrollToTop } from "./components/ScrollToTop";
import { Team } from "./components/Team";

import { Services } from "./components/Services";
import { Sponsors } from "./components/Sponsors";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Sponsors />
      {/*<About />*/}
      <HowItWorks />
      {/*<Features />*/}
      <Services />
      {/*<Cta />*/}
      {/*<Testimonials />*/}
      <Pricing />
      <Newsletter />
      {/*<FAQ />*/}
      <Team />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
