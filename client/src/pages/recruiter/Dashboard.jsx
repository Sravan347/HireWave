import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, PlusCircle, Briefcase, UserCheck, Eye } from "lucide-react";
import API from "../../services/api";
import { toast } from "react-toastify";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const recruiterName = "Recruiter";

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data); // Array of jobs
    } catch (err) {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePostJob = () => navigate("/recruiter/post-job");
  const handleViewJobs = () => navigate("/recruiter/jobs");
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/recruiter/login");
  };

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
          <Briefcase size={18} /> Posted Jobs
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A8A]">
            Welcome, {recruiterName}
          </h1>
          <button
            onClick={handlePostJob}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <PlusCircle size={16} /> New Job
          </button>
        </div>

        {/* Posted Jobs Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Briefcase /> Recent Jobs
            </h2>
            <button
              onClick={handleViewJobs}
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <Eye size={16} /> View All
            </button>
          </div>

          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : jobs.length === 0 ? (
            <p className="text-gray-600">No jobs posted yet.</p>
          ) : (
            <ul className="grid md:grid-cols-2 gap-4">
              {jobs.slice(0, 4).map((job) => (
                <li
                  key={job._id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition border border-gray-200"
                >
                  <h3 className="text-lg font-bold text-blue-800">{job.title}</h3>
                  <p className="text-gray-600 text-sm">{job.location} • {job.jobType}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                  </p>
                  <p className="mt-2 text-sm text-green-700">
                    Applicants: <b>{job.numApplicants}</b>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default RecruiterDashboard;
