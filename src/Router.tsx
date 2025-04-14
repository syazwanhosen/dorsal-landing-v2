import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Data from "./pages/data/Data";
import Login from "./pages/login/login";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/data" element={<Data />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
