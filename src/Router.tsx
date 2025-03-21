import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Data from "./Data";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/data" element={<Data />} />
      </Routes>
    </Router>
  );
}
