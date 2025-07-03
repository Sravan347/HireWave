import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaUser,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-2 px-3 rounded-md font-medium text-sm transition-colors duration-200 ${
      isActive
        ? "bg-[#1A3A8F] text-white"
        : "text-[#2D3748] hover:bg-[#E6E9F5] hover:text-[#0A1A4A]"
    }`;

  return (
    <aside className="w-64 flex-shrink-0 bg-white shadow-md min-h-screen flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#1A3A8F] text-center mb-6">
          HireWave
        </h1>
        <nav className="space-y-2">
          <NavLink to="/candidate/dashboard" className={linkClass}>
            <FaHome size={16} /> Job Board
          </NavLink>
          <NavLink
            to="/candidate/dashboard/applications" end className={linkClass}
          >
            <FaBriefcase size={16} /> My Applications
          </NavLink>

          <NavLink to="/candidate/dashboard/profile" className={linkClass}>
            <FaUser size={16} /> My Profile
          </NavLink>
          <NavLink to="/candidate/dashboard/offers" className={linkClass}>
            <FaFileAlt size={16} /> Offers
          </NavLink>
        </nav>
      </div>

      <div className="p-6">
        <Separator className="mb-4 bg-[#D6CEFA]" />
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-red-600 hover:bg-red-100"
        >
          <FaSignOutAlt size={16} /> Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
