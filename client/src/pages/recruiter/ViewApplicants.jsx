import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogOut, PlusCircle, Briefcase } from "lucide-react";

const ViewApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchApplicants = async () => {
    try {
      const res = await API.get(`/applications/job/${jobId}/applicants`);
      setApplicants(res.data.applicants);
    } catch (err) {
      toast.error("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/applications/application/${id}/status`, { status });
      toast.success(`Marked as ${status}`);
      fetchApplicants();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/recruiter/login");
  };

  const handlePostJob = () => navigate("/recruiter/post-job");

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

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
        <button className="flex items-center gap-2 bg-blue-700 px-4 py-2 rounded">
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
        <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">Applicants</h2>

        {loading ? (
          <p>Loading...</p>
        ) : applicants.length === 0 ? (
          <p className="text-gray-600">No applicants yet.</p>
        ) : (
          <div className="space-y-4">
            {applicants.map((app) => (
              <div
                key={app._id}
                className="bg-white p-6 rounded shadow border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-blue-800">
                  {app.candidateId?.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <b>Email:</b> {app.candidateId?.email}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <b>Qualification:</b> {app.qualification}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <b>Backlogs:</b>{" "}
                  {app.backlogInfo?.hasBacklogs
                    ? `Yes (${app.backlogInfo.count})`
                    : "No"}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <b>Resume Score:</b> {app.score}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <b>Status:</b>{" "}
                  <span className="capitalize font-medium">{app.status}</span>
                </p>
                <a
                  href={app.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-600 underline text-sm mb-3"
                >
                  View Resume
                </a>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleStatusChange(app._id, "shortlisted")}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                  >
                    Shortlist
                  </button>
                  <button
                    onClick={() => handleStatusChange(app._id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleStatusChange(app._id, "hired")}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    Hire
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewApplicants;
