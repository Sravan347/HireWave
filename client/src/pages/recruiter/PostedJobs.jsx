import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Pencil,
  Trash2,
  Eye,
  LogOut,
  PlusCircle,
  Briefcase,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

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
      fetchJobs();
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
    <div className="flex min-h-screen bg-gradient-to-br from-[#E6E9F5] via-[#D6CEFA] to-[#B5A9FF] relative overflow-hidden">
      {/* Decorative floating cube */}
      <div className="hidden md:block absolute -top-16 -left-16 w-64 h-64 z-0 opacity-30 rotate-12">
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#7F5AF0] via-[#4C6EF5] to-[#0A1A4A] shadow-2xl" style={{ filter: 'blur(2px)' }}></div>
      </div>
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A1A4A] text-white p-6 space-y-6 hidden md:flex flex-col rounded-tr-3xl rounded-br-3xl shadow-2xl z-10">
        <h2 className="text-2xl font-extrabold tracking-tight mb-4">Recruiter Panel</h2>
        <Button
          variant="ghost"
          className="justify-start text-white rounded-full px-4 py-2 hover:bg-[#1A3A8F]/80 hover:text-[#FFD447] transition"
          onClick={handlePostJob}
        >
          <PlusCircle size={18} className="mr-2" /> Post New Job
        </Button>
        <Button
          variant="ghost"
          className="justify-start bg-[#1A3A8F] hover:bg-[#7F5AF0] text-white rounded-full px-4 py-2 font-bold transition"
        >
          <Briefcase size={18} className="mr-2" /> Posted Jobs
        </Button>
        <Button
          variant="ghost"
          className="mt-auto justify-start text-red-300 hover:text-red-400 rounded-full px-4 py-2 transition"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" /> Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto z-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#0A1A4A] tracking-tight">My Posted Jobs</h2>
          <Button
            className="bg-gradient-to-r from-[#7F5AF0] to-[#5A3DF0] hover:from-[#5A3DF0] hover:to-[#7F5AF0] text-white font-bold rounded-full px-6 py-2 shadow-md transition-transform duration-200 hover:scale-[1.03]"
            onClick={handlePostJob}
          >
            + Post New Job
          </Button>
        </div>

        {loading ? (
          <p className="text-[#2D3748]">Loading...</p>
        ) : jobs.length === 0 ? (
          <p className="text-[#2D3748]">No jobs posted yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <Card key={job._id} className="bg-white/90 dark:bg-[#232347]/90 border border-[#D6CEFA] shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-200 rounded-2xl backdrop-blur-md">
                <CardHeader className="pb-2 flex flex-row items-center gap-3">
                  <CardTitle className="text-[#2563EB] dark:text-blue-400 text-lg md:text-xl font-bold leading-tight truncate">
                    {job.title}
                  </CardTitle>
                  <span className="ml-auto px-3 py-0.5 rounded-full bg-[#D6CEFA] text-xs font-semibold text-[#0A1A4A]">{job.jobType}</span>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-[#2D3748]">
                    <span className="font-semibold">{job.location}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-[#343434] line-clamp-2">{job.description}</p>
                  <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-[#FFD447] text-xs font-bold text-[#0A1A4A]">Applicants: {job.numApplicants}</span>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="rounded-full px-4 py-2 border-[#1A3A8F] text-[#1A3A8F] hover:bg-[#E6E9F5] hover:text-[#7F5AF0] font-semibold transition"
                      onClick={() => navigate(`/recruiter/jobs/${job._id}`)}
                    >
                      <Eye size={16} className="mr-2" /> View
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full px-4 py-2 border-[#FFD447] text-[#FFD447] hover:bg-[#FFF6D6] hover:text-[#0A1A4A] font-semibold transition"
                      onClick={() => navigate(`/recruiter/jobs/edit/${job._id}`)}
                    >
                      <Pencil size={16} className="mr-2" /> Edit
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full px-4 py-2 border-[#F4A261] text-[#F4A261] hover:bg-[#FBEAEA] hover:text-[#0A1A4A] font-semibold transition"
                      onClick={() => handleDelete(job._id)}
                    >
                      <Trash2 size={16} className="mr-2" /> Delete
                    </Button>
                    <Button
                      variant="secondary"
                      className="rounded-full px-4 py-2 border-[#5936D9] text-[#5936D9] hover:bg-[#D6CEFA] hover:text-[#0A1A4A] font-semibold transition"
                      onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
                    >
                      <UserCheck size={16} className="mr-2" /> View Applicants
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      {/* Decorative wave at the bottom */}
      <div className="absolute bottom-0 left-0 w-full z-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16">
          <path fill="#E6E9F5" fillOpacity="1" d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,37.3C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"></path>
        </svg>
      </div>
    </div>
  );
}
