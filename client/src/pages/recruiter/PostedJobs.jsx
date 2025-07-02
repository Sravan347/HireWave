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
          className="justify-start bg-[#1A3A8F] hover:bg-[#1A3A8F] text-white"
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
          <h2 className="text-2xl font-bold text-[#0A1A4A]">My Posted Jobs</h2>
          <Button
            className="bg-[#7F5AF0] hover:bg-[#5A3DF0] text-white"
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
          <div className="grid gap-4">
            {jobs.map((job) => (
              <Card key={job._id} className="bg-white shadow border border-[#D6CEFA]">
                <CardHeader>
                  <CardTitle className="text-[#2563EB] text-xl font-semibold">
                    {job.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-[#2D3748]">{job.location} • {job.jobType}</p>
                  <p className="text-sm text-[#757575]">
                    Posted on {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-[#343434] line-clamp-2">{job.description}</p>
                  <p className="text-sm text-green-700">
                    Applicants: <b>{job.numApplicants}</b>
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="hover:bg-[#E6E9F5]"
                      onClick={() => navigate(`/recruiter/jobs/${job._id}`)}
                    >
                      <Eye size={16} className="mr-2" /> View
                    </Button>
                    <Button
                      variant="outline"
                      className="hover:bg-[#FFF6D6]"
                      onClick={() => navigate(`/recruiter/jobs/edit/${job._id}`)}
                    >
                      <Pencil size={16} className="mr-2" /> Edit
                    </Button>
                    <Button
                      variant="outline"
                      className="hover:bg-[#FBEAEA] text-red-600"
                      onClick={() => handleDelete(job._id)}
                    >
                      <Trash2 size={16} className="mr-2" /> Delete
                    </Button>
                    <Button
                      variant="secondary"
                      className="text-green-700 border border-green-300"
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
    </div>
  );
}
