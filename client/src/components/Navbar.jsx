import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  

  return (
    <nav className="bg-[#2563EB] text-white px-6 py-4 shadow-md flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">HireWave</Link>
      <div className="space-x-6">
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>

        <div className="inline-block relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="hover:underline">
            For Recruiters ▾
          </button>
          {dropdownOpen && (
            <div className="absolute bg-white text-black mt-2 rounded shadow-md w-40 z-50">
              <Link to="/recruiter/login" className="block px-4 py-2 hover:bg-gray-200">Login</Link>
              <Link to="/recruiter/register" className="block px-4 py-2 hover:bg-gray-200">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
