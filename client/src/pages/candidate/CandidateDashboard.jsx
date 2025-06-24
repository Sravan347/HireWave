import React, { useEffect, useState } from "react";
import API from "../../services/api";
import CandidateLayout from "../../components/layout/CandidateLayout";

const CandidateDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setSearch(val);
    setFilteredJobs(jobs.filter((job) => job.title.toLowerCase().includes(val)));
  };

  return (
    <CandidateLayout>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search jobs by title..."
          className="w-full p-3 border border-gray-300 rounded"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.map((job) => (
          <div key={job._id} className="bg-white shadow p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-blue-800">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.location} • {job.jobType}</p>
            <p className="text-sm text-gray-500 mt-1">Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</p>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              View / Apply
            </button>
          </div>
        ))}
      </div>
    </CandidateLayout>
  );
};

export default CandidateDashboard;
