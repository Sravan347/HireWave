import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Pencil, Trash2, Eye, LogOut, PlusCircle, Briefcase } from "lucide-react";

export default function PostedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await API.delete(`/jobs/${id}`);
      toast.success("Job deleted");
      fetchJobs(); // Refresh list
    } catch (err) {
      toast.error("Failed to delete job");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/recruiter/login");
  };

  const handlePostJob = () => navigate("/recruiter/post-job");

  useEffect(() => {
    fetchJobs();
  }, []);

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
          className="flex items-center gap-2 bg-blue-700 px-4 py-2 rounded"
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

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1E3A8A]">My Posted Jobs</h2>
          <button
            onClick={handlePostJob}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Post New Job
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-600">No jobs posted yet.</p>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white shadow rounded p-4 hover:shadow-md transition duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-[#2563EB]">
                      {job.title}
                    </h3>
                    <p className="text-gray-700">
                      {job.location} • {job.jobType}
                    </p>
                    <p className="text-sm text-gray-500">
                      Posted on{" "}
                      {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                    <p className="mt-2 text-gray-600 line-clamp-2">
                      {job.description}
                    </p>
                    <p className="text-sm mt-1 text-green-700">
                      Applicants: {job.numApplicants}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/recruiter/jobs/${job._id}`)}
                      className="p-2 rounded hover:bg-blue-50"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/recruiter/jobs/edit/${job._id}`)
                      }
                      className="p-2 rounded hover:bg-yellow-50"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="p-2 rounded hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
