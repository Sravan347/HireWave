import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, PlusCircle, Briefcase, UserCheck } from "lucide-react";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const recruiterName = "Recruiter";

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // const jobsRes = await api.get("/recruiter/jobs");
        // const appsRes = await api.get("/recruiter/applications");
        setJobs([
          { id: 1, title: "Frontend Developer", postedOn: "2025-06-01" },
          { id: 2, title: "Backend Developer", postedOn: "2025-06-10" },
        ]);
        setApplications([
          { id: 1, jobTitle: "Frontend Developer", candidate: "Alice", status: "Pending" },
          { id: 2, jobTitle: "Backend Developer", candidate: "Bob", status: "Reviewed" },
        ]);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
      setLoading(false);
    };
    fetchDashboardData();
  }, []);

  const handlePostJob = () => navigate("/recruiter/post-job");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/recruiter/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E3A8A] text-white p-6 space-y-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">Recruiter Panel</h2>
        <div
          onClick={handlePostJob}
          className="flex items-center gap-2 cursor-pointer hover:bg-blue-700 px-4 py-2 rounded transition"
        >
          <PlusCircle size={18} /> Post Job
        </div>
        <div
          onClick={handleLogout}
          className="flex items-center gap-2 cursor-pointer hover:text-red-300 mt-4"
        >
          <LogOut size={18} /> Logout
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A8A] mb-6">
          Welcome, {recruiterName}
        </h1>

        {loading ? (
          <p className="text-gray-700 text-lg">Loading dashboard...</p>
        ) : (
          <>
            {/* Posted Jobs */}
            <section className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Briefcase /> Posted Jobs
                </h2>
                <button
                  onClick={handlePostJob}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  <PlusCircle size={16} /> New Job
                </button>
              </div>
              {jobs.length === 0 ? (
                <p className="text-gray-600">No jobs posted yet.</p>
              ) : (
                <ul className="grid md:grid-cols-2 gap-4">
                  {jobs.map((job) => (
                    <li
                      key={job.id}
                      className="bg-white p-4 rounded-lg shadow hover:shadow-md transition border"
                    >
                      <h3 className="font-semibold text-blue-800">{job.title}</h3>
                      <p className="text-sm text-gray-500">Posted on {job.postedOn}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Applications */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <UserCheck /> Applications Received
              </h2>
              {applications.length === 0 ? (
                <p className="text-gray-600">No applications yet.</p>
              ) : (
                <ul className="grid md:grid-cols-2 gap-4">
                  {applications.map((app) => (
                    <li
                      key={app.id}
                      className="bg-white p-4 rounded-lg shadow hover:shadow-md transition border"
                    >
                      <p>
                        <span className="font-medium">{app.candidate}</span> applied for{" "}
                        <span className="text-blue-700">{app.jobTitle}</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Status: <span className="font-semibold">{app.status}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default RecruiterDashboard;
