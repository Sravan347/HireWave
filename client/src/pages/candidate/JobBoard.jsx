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
    experience: ""
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
      const ids = res.data.applications.map(app => app.jobId._id);
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
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col">
        {/* <Header /> */}
        <div className="p-6">
          <div className="space-y-4">
            <input
              type="text"
              name="keyword"
              placeholder="Search jobs..."
              value={filters.keyword}
              onChange={onFilterChange}
              className="w-full p-3 rounded border"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <select
                name="location"
                onChange={onFilterChange}
                className="p-2 border rounded"
              >
                <option value="">All Locations</option>
                {["Kochi", "Mumbai", "Bengaluru", "Trivandrum", "Hyderabad", "Pune", "Delhi"].map(
                  (loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  )
                )}
              </select>
              <select
                name="jobType"
                onChange={onFilterChange}
                className="p-2 border rounded"
              >
                <option value="">All Job Types</option>
                {["Full-time", "Part-time", "Remote", "Internship", "Contract"].map(
                  (jt) => (
                    <option key={jt} value={jt}>
                      {jt}
                    </option>
                  )
                )}
              </select>
              <select
                name="experience"
                onChange={onFilterChange}
                className="p-2 border rounded"
              >
                <option value="">All Experience</option>
                {["Fresher", "1-2 years", "3-5 years", "5+ years"].map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.length === 0 ? (
  <p className="text-center col-span-full text-gray-500">
    No jobs found matching the criteria.
  </p>
) : (
  jobs.map((job) => {
    const isApplied = appliedJobIds.includes(job._id);
    return (
      <JobCard
        key={job._id}
        job={job}
        isApplied={isApplied}
        onClick={() => {
          setSelectedJob(job);
          setModalOpen(true);
        }}
      />
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

    </div>
  );
}
