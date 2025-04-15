import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Data from "./Data";
import Account from "./pages/Account/Account";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/data" element={<Data />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}
