import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function PublicNavBar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLink = (to: string, label: string) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={() => setMenuOpen(false)}
        className={`text-sm font-medium transition-colors ${active ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-indigo-600 tracking-tight" style={{ fontFamily: "'Lora',serif" }}>
            ✂ StitchFind
          </Link>

          {/* Desktop Links */}
          <div className="hidden sm:flex items-center gap-6">
            {navLink("/", "Home")}
            {navLink("/login", "Login")}
            <Link
              to="/signup"
              className="text-sm font-semibold px-4 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3">
            {navLink("/", "Home")}
            {navLink("/login", "Login")}
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold px-4 py-2 bg-indigo-600 text-white rounded-lg text-center hover:bg-indigo-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
}

export default PublicNavBar;