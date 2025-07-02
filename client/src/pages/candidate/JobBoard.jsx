// /pages/candidate/JobBoard.jsx

import React, { useState, useEffect } from "react";
import API from "../../services/api";
import JobCard from "./components/JobCard";
import JobDetailsModal from "./components/JobDetailsModal";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { toast } from "react-toastify";

export default function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    jobType: "",
    experience: "",
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [appliedJobIds, setAppliedJobIds] = useState([]);

  // Fetch all jobs (based on filters)
  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs/public", { params: filters });
      setJobs(res.data);
    } catch (err) {
      toast.error("Failed to fetch jobs.");
    }
  };

  // Fetch all jobs candidate already applied to
  const fetchAppliedJobs = async () => {
    try {
      const res = await API.get("/applications/myApplications");
      const ids = res.data.applications.map((app) => app.jobId._id);
      setAppliedJobIds(ids);
    } catch (err) {
      toast.error("Could not load applied jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchAppliedJobs();
  }, [filters]);

  const onFilterChange = (e) =>
    setFilters((f) => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#E6E9F5] via-[#D6CEFA] to-[#B5A9FF] relative overflow-hidden">
      {/* Decorative floating cube */}
      <div className="hidden md:block absolute -top-16 -left-16 w-64 h-64 z-0 opacity-30 rotate-12">
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#7F5AF0] via-[#4C6EF5] to-[#0A1A4A] shadow-2xl" style={{ filter: 'blur(2px)' }}></div>
      </div>
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col">
        {/* <Header /> */}
        <div className="p-6 md:p-10 z-10">
          <h2 className="text-3xl font-extrabold text-[#0A1A4A] tracking-tight mb-8">Job Board</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="keyword"
              placeholder="Search jobs..."
              value={filters.keyword}
              onChange={onFilterChange}
              className="w-full p-4 rounded-full border border-[#1A3A8F] focus:ring-2 focus:ring-[#7F5AF0] text-[#2D3748] placeholder-[#7F5AF0] shadow-md bg-white/90"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <select
                name="location"
                onChange={onFilterChange}
                className="p-3 border border-[#1A3A8F] rounded-full focus:ring-2 focus:ring-[#7F5AF0] text-[#2D3748] placeholder-[#7F5AF0] bg-white/90 shadow"
              >
                <option value="">All Locations</option>
                {["Kochi","Mumbai","Bengaluru","Trivandrum","Hyderabad","Pune","Delhi",].map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <select
                name="jobType"
                onChange={onFilterChange}
                className="p-3 border border-[#1A3A8F] rounded-full focus:ring-2 focus:ring-[#7F5AF0] text-[#2D3748] placeholder-[#7F5AF0] bg-white/90 shadow"
              >
                <option value="">All Job Types</option>
                {["Full-time","Part-time","Remote","Internship","Contract",].map((jt) => (
                  <option key={jt} value={jt}>{jt}</option>
                ))}
              </select>
              <select
                name="experience"
                onChange={onFilterChange}
                className="p-3 border border-[#1A3A8F] rounded-full focus:ring-2 focus:ring-[#7F5AF0] text-[#2D3748] placeholder-[#7F5AF0] bg-white/90 shadow"
              >
                <option value="">All Experience</option>
                {["Fresher", "1-2 years", "3-5 years", "5+ years"].map((exp) => (
                  <option key={exp} value={exp}>{exp}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.length === 0 ? (
              <p className="text-center col-span-full text-gray-500">
                No jobs found matching the criteria.
              </p>
            ) : (
              jobs.map((job) => {
                const isApplied = appliedJobIds.includes(job._id);
                return (
                  <div className="relative group">
                    <JobCard
                      key={job._id}
                      job={job}
                      isApplied={isApplied}
                      onClick={() => {
                        setSelectedJob(job);
                        setModalOpen(true);
                      }}
                    />
                    {isApplied && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#FFD447] text-xs font-bold text-[#0A1A4A] shadow-md group-hover:scale-105 transition">Applied</span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {modalOpen && selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          isApplied={appliedJobIds.includes(selectedJob._id)}
          onClose={() => {
            setModalOpen(false);
            fetchAppliedJobs();
          }}
        />
      )}

      {/* Decorative wave at the bottom */}
      <div className="absolute bottom-0 left-0 w-full z-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16">
          <path fill="#E6E9F5" fillOpacity="1" d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,37.3C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"></path>
        </svg>
      </div>
    </div>
  );
}
