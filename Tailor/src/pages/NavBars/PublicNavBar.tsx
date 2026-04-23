// pages/PublicNavBar.tsx
import { Link, Outlet } from "react-router-dom";

function PublicNavBar() {
  return (
    <>
      <div className="bg-[#f8f4ee] border-b border-[#e7ddd1] h-16 flex items-center justify-between px-8 md:px-12">
        <div className="text-2xl font-semibold text-[#5c4033] tracking-wide">
          StitchFind
        </div>

        <div className="flex items-center gap-6 text-[15px] font-medium text-[#6b4f3b]">
          <Link to="/" className="hover:text-[#3e2a1f] transition">
            Home
          </Link>
          <Link to="/login" className="hover:text-[#3e2a1f] transition">
            Login
          </Link>
          <Link to="/signup" className="hover:text-[#3e2a1f] transition">
            Signup
          </Link>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default PublicNavBar;