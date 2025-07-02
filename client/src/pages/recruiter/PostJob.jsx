import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { toast } from "react-toastify";
import { LogOut, Briefcase, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
    salaryRange: "",
    qualificationsRequired: "",
    experience: "",
    applicationDeadline: "",
    companyName: "",
    companyLogo: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/jobs", formData);
      toast.success("Job posted successfully!");
      navigate("/recruiter/jobs");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to post job.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/recruiter/login");
  };

  const handleMyJobs = () => navigate("/recruiter/jobs");
  const handleDashboard = () => navigate("/recruiter/dashboard");

  return (
    <div className="flex min-h-screen bg-[#E6E9F5]">
      <aside className="w-64 bg-[#0A1A4A] text-white p-6 space-y-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold">Recruiter Panel</h2>
        <Button
          variant="ghost"
          className="justify-start text-white hover:bg-[#1A3A8F]"
          onClick={handleDashboard}
        >
          <Briefcase size={18} className="mr-2" /> Dashboard
        </Button>
        <Button
          variant="ghost"
          className="justify-start text-white hover:bg-[#1A3A8F]"
          onClick={handleMyJobs}
        >
          <Briefcase size={18} className="mr-2" /> My Posted Jobs
        </Button>
        <Button
          variant="ghost"
          className="mt-auto justify-start text-red-300 hover:text-red-400"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" /> Logout
        </Button>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold text-[#0A1A4A] mb-6">
          Post a New Job
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Input
            name="title"
            placeholder="Job Title"
            onChange={handleChange}
            required
          />
          <Input
            name="location"
            placeholder="Job Location"
            onChange={handleChange}
            required
          />
          <select
            name="jobType"
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Remote">Remote</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
          <Input
            name="salaryRange"
            placeholder="Salary Range (e.g. ₹20,000 - ₹40,000)"
            onChange={handleChange}
            required
          />
          <Input
            name="qualificationsRequired"
            placeholder="Qualifications"
            onChange={handleChange}
            required
          />
          <select
            name="experience"
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Experience Level</option>
            <option value="Fresher">Fresher</option>
            <option value="1-2 years">1-2 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5+ years">5+ years</option>
          </select>
          <Input
            type="date"
            name="applicationDeadline"
            onChange={handleChange}
            required
          />
          <Input
            name="companyName"
            placeholder="Company Name"
            onChange={handleChange}
            required
          />
          <Input
            name="companyLogo"
            placeholder="Company Logo URL"
            onChange={handleChange}
            required
          />

          <div className="md:col-span-2">
            <Textarea
              name="description"
              placeholder="Job Description"
              onChange={handleChange}
              className="resize-none"
              required
            />
          </div>

          <div className="md:col-span-2">
            <Button
              type="submit"
              className="w-full bg-[#7F5AF0] hover:bg-[#5A3DF0] text-white"
            >
              Post Job
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PostJob;