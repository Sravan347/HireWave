import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { toast } from "react-toastify";
import { LogOut, Briefcase, PlusCircle } from "lucide-react";

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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E3A8A] text-white p-6 space-y-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold">Recruiter Panel</h2>
        <button
          onClick={handleDashboard}
          className="flex items-center gap-2 hover:bg-blue-700 px-4 py-2 rounded transition"
        >
          <Briefcase size={18} /> Dashboard
        </button>
        <button
          onClick={handleMyJobs}
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
        <h1 className="text-3xl font-bold text-[#1E3A8A] mb-6">
          Post a New Job
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            name="title"
            placeholder="Job Title"
            onChange={handleChange}
            className="input"
            required
          />
          <input
            name="location"
            placeholder="Job Location"
            onChange={handleChange}
            className="input"
            required
          />
          <select
            name="jobType"
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Remote">Remote</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
          <input
            name="salaryRange"
            placeholder="Salary Range (e.g. ₹20,000 - ₹40,000)"
            onChange={handleChange}
            className="input"
            required
          />
          <input
            name="qualificationsRequired"
            placeholder="Qualifications"
            onChange={handleChange}
            className="input"
            required
          />
          <select
            name="experience"
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Select Experience Level</option>
            <option value="Fresher">Fresher</option>
            <option value="1-2 years">1-2 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5+ years">5+ years</option>
          </select>
          <input
            type="date"
            name="applicationDeadline"
            onChange={handleChange}
            className="input"
            required
          />
          <input
            name="companyName"
            placeholder="Company Name"
            onChange={handleChange}
            className="input"
            required
          />
          <input
            name="companyLogo"
            placeholder="Company Logo URL"
            onChange={handleChange}
            className="input"
            required
          />

          <div className="md:col-span-2">
            <textarea
              name="description"
              placeholder="Job Description"
              onChange={handleChange}
              className="input h-32 resize-none"
              required
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Post Job
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PostJob;
