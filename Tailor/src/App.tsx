import { Routes, Route, Navigate } from "react-router-dom";
import PublicNavBar from "./pages/NavBars/PublicNavBar";
import CustomerNavBar from "./pages/NavBars/CustomerNavBar";
import TailorNavBar from "./pages/NavBars/TailorNavBar";

import Signup from "./pages/signup";
import Login from "./pages/login";
import CustomerProfile from "./pages/customer/CustomerProfile";
import TailorProfile from "./pages/tailors/TailorProfile";
import FindTailor from "./pages/FindTailor";
import TailorReview from "./pages/tailors/Tailorreview";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import TailorDashboard from "./pages/tailors/TailorDashboard";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      {/* 🌐 PUBLIC - Home + Auth + Public Pages */}
      <Route path="/" element={<PublicNavBar />}>
        <Route index element={<Home />} />
      </Route>
      
      {/* ✅ STANDALONE PUBLIC PAGES */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/find-tailor" element={<FindTailor />} />
      <Route path="/tailor/review" element={<TailorReview />} />

      {/* 👤 CUSTOMER DASHBOARD */}
      <Route path="/customer/CustomerDashboard" element={<CustomerNavBar />}>
        <Route index element={<CustomerDashboard />} />
        <Route path="profile" element={<CustomerProfile />} />
        <Route path="reviews" element={<TailorReview />} />
        <Route path="find-tailor" element={<FindTailor />} />
      </Route>

      {/* ✂ TAILOR DASHBOARD */}
      <Route path="/tailor/TailorDashboard" element={<TailorNavBar />}>
        <Route index element={<TailorDashboard />} />
        <Route path="profile" element={<TailorProfile />} />
      </Route>

      {/* 🔄 REDIRECTS */}
      <Route path="/customer/profile" element={<Navigate to="/customer/CustomerDashboard/profile" replace />} />
      <Route path="/tailor/profile" element={<Navigate to="/tailor/TailorDashboard/profile" replace />} />
      
      {/* ❌ LAST - Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;