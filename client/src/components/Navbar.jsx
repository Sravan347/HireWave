import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserRound, Briefcase, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#2563EB] text-white px-6 py-4 shadow-md flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">HireWave</Link>

      <div className="relative flex items-center gap-6 pr-6">
        <Link
          to="/login"
          className="flex items-center gap-1 font-semibold transition-transform duration-200 hover:scale-105"
        >
          <UserRound size={18} />
          Login
        </Link>

        <Link
          to="/register"
          className="flex items-center gap-1 font-semibold transition-transform duration-200 hover:scale-105"
        >
          <UserRound size={18} />
          Register
        </Link>

        {/* Dropdown Section */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1 font-semibold transition-transform duration-200 hover:scale-105"
          >
            <Briefcase size={18} />
            For Recruiters
            <ChevronDown size={16} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-48 z-50">
              <Link
                to="/recruiter/login"
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100 font-medium"
              >
                Recruiter Login
              </Link>
              <Link
                to="/recruiter/register"
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100 font-medium"
              >
                Recruiter Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
