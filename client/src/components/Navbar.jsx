import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserRound, Briefcase, ChevronDown } from "lucide-react";
import logo from '../assets/logo.png';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <nav className="bg-[#2563EB] text-white px-6 py-0 shadow-md flex items-center" style={{height: '64px'}}>
      <div className="flex-shrink-0 flex items-center h-full" style={{height: '100%'}}>
        <Link to="/" className="block h-full w-[200px]">
          <img src={logo} alt="HireWave Logo" className="h-full w-auto object-contain" style={{height: '64px', maxHeight: '100%'}} />
        </Link>
      </div>
      <div className="flex-1 flex justify-end items-center gap-6 pr-6">
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1e3a8a] px-4 pb-4 space-y-2 font-semibold">
          <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-gray-300">
            Login
          </Link>
          <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-gray-300">
            Register
          </Link>
          <div>
            <p className="text-white">For Recruiters</p>
            <Link
              to="/recruiter/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-4 text-white hover:text-gray-300"
            >
              Recruiter Login
            </Link>
            <Link
              to="/recruiter/register"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-4 text-white hover:text-gray-300"
            >
              Recruiter Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
