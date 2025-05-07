import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Data from "./pages/data/Data";
import Login from "./pages/login/login";
import Signup from "./components/signup/signup";
import Account from "./pages/Account/Account";
import Hospitals from "./pages/hospitals/Hospitals";
import HospitalDetails from "./pages/hospital_details/HospitalDetails";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/data" element={<Data />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/hospital_details" element={<HospitalDetails />} />
      </Routes>
    </Router>
  );
}
