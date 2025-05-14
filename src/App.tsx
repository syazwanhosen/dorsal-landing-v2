import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Newsletter } from "./components/Newsletter";
import { ScrollToTop } from "./components/ScrollToTop";
import { FAQ } from "./components/FAQ";

import { Services } from "./components/Services";
import { Sponsors } from "./components/Sponsors";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Sponsors />
      {/*<About />*/}
      {/*<HowItWorks />*/}
      {/*<Features />*/}
      <Services />
      {/*<Cta />*/}
      {/*<Testimonials />
      <Pricing />*/}
      <Newsletter />
      <FAQ />
      {/*<Team />*/}
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
