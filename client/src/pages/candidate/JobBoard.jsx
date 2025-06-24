import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Search, Users, ClipboardList, User, LogOut } from "lucide-react";
import { toast } from "react-toastify";

export default function CandidateDashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ location: "", jobType: "", experience: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchJobs();
    fetchProfile();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch {
      toast.error("Error loading jobs.");
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setProfile(res.data);
    } catch {
      console.warn("Profile not loaded");
    }
  };

  const handleSearch = () => {
    let arr = jobs.filter(j => j.title.toLowerCase().includes(search.toLowerCase()));
    for (let key of ["location", "jobType", "experience"])
      if (filters[key]) arr = arr.filter(j => j[key] === filters[key]);
    setFilteredJobs(arr);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E3A8A] text-white p-6 space-y-6">
        <div className="text-2xl font-bold">Candidate Panel</div>
        <MenuItem icon={<Users />} label="Dashboard" onClick={() => navigate("/candidate")} />
        <MenuItem icon={<ClipboardList />} label="Explore Jobs" onClick={() => navigate("/candidate/explore")} />
        <MenuItem icon={<ClipboardList />} label="Applied Jobs" onClick={() => navigate("/candidate/applied")} />
        <MenuItem icon={<User />} label="Profile" onClick={() => navigate("/candidate/profile")} />
        <div onClick={handleLogout} className="cursor-pointer flex items-center gap-2 hover:text-red-300">
          <LogOut /> Logout
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 bg-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl">Hello, {profile?.name || "Candidate"}</h2>
          <div className="flex gap-2 items-center">
            <img src={profile?.photo || "/default-avatar.png"} className="w-10 h-10 rounded-full cursor-pointer" onClick={() => navigate("/candidate/profile")} />
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-4 mb-6">
          <input 
            type="text" placeholder="Search jobs..." 
            className="flex-1 input" value={search} 
            onChange={e => setSearch(e.target.value)} 
          />
          <button onClick={handleSearch} className="px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
            <Search /> Search
          </button>
          <button onClick={() => setShowFilters(prev => !prev)} className="px-4 bg-gray-300 rounded">
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="p-4 bg-white rounded mb-6 grid grid-cols-4 gap-4">
            {["location","jobType","experience"].map(field => (
              <select
                key={field}
                className="input"
                onChange={e => setFilters(f => ({...f, [field]: e.target.value}))}
              >
                <option value="">{field}</option>
                {[...new Set(jobs.map(j => j[field]))].map(val => <option key={val} value={val}>{val}</option>)}
              </select>
            ))}
          </div>
        )}

        {/* Job List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <div key={job._id} 
                 className="bg-white p-4 rounded shadow hover:shadow-lg transition relative">
              <div className="font-semibold text-lg">{job.title}</div>
              <div className="text-sm text-gray-600">{job.companyName}</div>
              <div className="text-sm">{job.location} • {job.jobType}</div>
              <div className="text-xs text-gray-500">Exp: {job.experience}</div>
              <button onClick={() => navigate(`/candidate/apply/${job._id}`)} className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                Apply
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function MenuItem({ icon, label, onClick }) {
  return (
    <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-blue-700 rounded" onClick={onClick}>
      {icon} {label}
    </div>
  );
}
