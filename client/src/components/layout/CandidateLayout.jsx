import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, User, Briefcase, Search } from "lucide-react";

const CandidateLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/candidate/login");
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 space-y-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Candidate Panel</h2>
        <NavLink to="/candidate/dashboard" className="hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2">
          <Search size={18} /> Search Jobs
        </NavLink>
        <NavLink to="/candidate/applied-jobs" className="hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2">
          <Briefcase size={18} /> Applied Jobs
        </NavLink>
        <NavLink to="/candidate/profile" className="hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2">
          <User size={18} /> My Profile
        </NavLink>
        <button onClick={handleLogout} className="mt-auto flex gap-2 items-center hover:text-red-300">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-blue-900">Candidate Dashboard</h1>
          <div className="flex items-center gap-3">
            <img
              src={userInfo?.photo || "/avatar.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border"
            />
            <span className="text-blue-900 font-semibold">{userInfo?.name}</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default CandidateLayout;
