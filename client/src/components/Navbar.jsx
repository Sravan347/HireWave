import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-[#2563EB] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold hover:scale-105 transition-transform duration-300"
        >
          HireWave
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 font-semibold">
          <Link
            to="/login"
            className="hover:text-gray-200 hover:scale-105 transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="hover:text-gray-200 hover:scale-105 transition duration-200"
          >
            Register
          </Link>

          {/* WRAPPER includes both trigger and dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="hover:text-gray-200 hover:scale-105 transition duration-200">
              For Recruiters ▾
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-48 z-50 animate-fade-in">
                <Link
                  to="/recruiter/login"
                  className="block px-4 py-2 hover:bg-gray-100 font-medium"
                >
                  Recruiter Login
                </Link>
                <Link
                  to="/recruiter/register"
                  className="block px-4 py-2 hover:bg-gray-100 font-medium"
                >
                  Recruiter Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
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
