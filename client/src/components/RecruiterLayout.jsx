import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, PlusCircle, Briefcase, ArrowLeft } from "lucide-react";

const RecruiterLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePostJob = () => navigate("/recruiter/post-job");
  const handleViewJobs = () => navigate("/recruiter/jobs");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/recruiter/login");
  };

  // Hide back button on dashboard root
  const showBackButton = location.pathname !== "/recruiter" && location.pathname !== "/recruiter/jobs";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E3A8A] text-white p-6 space-y-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold">Recruiter Panel</h2>
        <button
          onClick={handlePostJob}
          className="flex items-center gap-2 hover:bg-blue-700 px-4 py-2 rounded transition"
        >
          <PlusCircle size={18} /> Post New Job
        </button>
        <button
          onClick={handleViewJobs}
          className="flex items-center gap-2 hover:bg-blue-700 px-4 py-2 rounded transition"
        >
          <Briefcase size={18} /> My Posted Jobs
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 hover:text-red-300 mt-auto"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Back Button Header */}
        {showBackButton && (
          <div className="mb-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-gray-600 hover:text-blue-700 text-sm"
            >
              <ArrowLeft size={18} className="mr-1" />
              Back
            </button>
          </div>
        )}

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
};

export default RecruiterLayout;
