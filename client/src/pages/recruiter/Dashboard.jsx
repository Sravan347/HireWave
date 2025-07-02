import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, PlusCircle, Briefcase, Eye } from "lucide-react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const recruiterName = "Recruiter";

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
    <div className="flex min-h-screen bg-[#E6E9F5]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A1A4A] text-white p-6 space-y-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold">Recruiter Panel</h2>
        <Button
          variant="ghost"
          className="justify-start text-white hover:bg-[#1A3A8F]"
          onClick={handlePostJob}
        >
          <PlusCircle size={18} className="mr-2" /> Post New Job
        </Button>
        <Button
          variant="ghost"
          className="justify-start text-white hover:bg-[#1A3A8F]"
          onClick={handleViewJobs}
        >
          <Briefcase size={18} className="mr-2" /> Posted Jobs
        </Button>
        <Button
          variant="ghost"
          className="mt-auto justify-start text-red-300 hover:text-red-400"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" /> Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#0A1A4A]">Welcome, {recruiterName}</h1>
          <Button className="bg-[#7F5AF0] hover:bg-[#5A3DF0] text-white" onClick={handlePostJob}>
            <PlusCircle size={16} className="mr-2" /> New Job
          </Button>
        </div>

        {/* Posted Jobs Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#2D3748] flex items-center gap-2">
              <Briefcase /> Recent Jobs
            </h2>
            <button
              onClick={handleViewJobs}
              className="flex items-center gap-1 text-[#7F5AF0] hover:text-[#5A3DF0] text-sm font-medium"
            >
              <Eye size={16} /> View All
            </button>
          </div>

          {loading ? (
            <p className="text-[#2D3748]">Loading...</p>
          ) : jobs.length === 0 ? (
            <p className="text-[#2D3748]">No jobs posted yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {jobs.slice(0, 4).map((job) => (
                <Card key={job._id} className="bg-white border border-[#D6CEFA]">
                  <CardHeader>
                    <CardTitle className="text-[#1A3A8F] text-lg">{job.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#2D3748]">{job.location} • {job.jobType}</p>
                    <p className="text-sm text-[#757575] mt-1">
                      Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                    </p>
                    <p className="mt-2 text-sm text-green-700">
                      Applicants: <b>{job.numApplicants}</b>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default RecruiterDashboard;
