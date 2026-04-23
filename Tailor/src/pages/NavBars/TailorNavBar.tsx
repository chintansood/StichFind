// pages/TailorNavBar.tsx
import { Link, Outlet, useLocation } from "react-router-dom";

function TailorNavBar() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <div className="bg-[#f8f4ee] border-b border-[#e7ddd1] h-16 flex items-center justify-between px-8 md:px-12">
        <div className="text-2xl font-semibold text-[#5c4033] tracking-wide">
          StitchFind
        </div>

        <div className="flex items-center gap-6 text-[15px] font-medium text-[#6b4f3b]">
          <Link to="/tailor/TailorDashboard" className={`hover:text-[#3e2a1f] transition ${location.pathname === "/tailor/TailorDashboard" ? "text-[#8b7355] font-semibold" : ""}`}>
            Dashboard
          </Link>
          <Link to="/tailor/TailorDashboard/profile" className={`hover:text-[#3e2a1f] transition ${location.pathname === "/tailor/TailorDashboard/profile" ? "text-[#8b7355] font-semibold" : ""}`}>
            Profile
          </Link>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-[#8b7355] text-white rounded-lg text-sm font-medium hover:bg-[#6b5a42] transition"
          >
            Logout
          </button>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default TailorNavBar;