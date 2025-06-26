import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaBriefcase, FaUser, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // redirect to general login
  };

  const linkClass = ({ isActive }) =>
    `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'
    }`;

  return (
    <aside className="w-64 bg-white shadow-md p-4 flex flex-col justify-between min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-blue-600 mb-8 text-center">HireWave</h1>
        <nav className="space-y-2">
          <NavLink to="/candidate/dashboard" className={linkClass}>
            <FaHome /> <span>Job Board</span>
          </NavLink>
          <NavLink to="/candidate/dashboard/applications" className={linkClass}>
            <FaBriefcase /> <span>My Applications</span>
          </NavLink>
          <NavLink to="/candidate/dashboard/profile" className={linkClass}>
            <FaUser /> <span>My Profile</span>
          </NavLink>
          <NavLink to="/candidate/dashboard/offers" className={linkClass}>
            <FaFileAlt /> <span>Offers</span>
          </NavLink>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 mt-10 text-red-600 hover:text-white hover:bg-red-500 p-3 rounded transition"
      >
        <FaSignOutAlt /> <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
