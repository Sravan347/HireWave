

import React, { useEffect, useState } from "react";
import API from "../../services/api";
import JobCard from "./components/JobCard";
import JobDetailsModal from "./components/JobDetailsModal";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  Search, Filter,
  ChevronsLeft, ChevronLeft,
  ChevronRight, ChevronsRight,
} from "lucide-react";

const PAGE_LIMIT = 9;

export default function JobBoard() {
  /*state */
  const [jobs, setJobs]         = useState([]);
  const [page, setPage]         = useState(1);
  const [totalPages, setTotal]  = useState(1);
  const [appliedIds, setIds]    = useState([]);
  const [modalJob, setModal]    = useState(null);

  const [filters, setFilters]   = useState({
    keyword: "", location: "", jobType: "", experience: "",
  });

  /* data */
  const loadJobs = async (p = 1) => {
    try {
      const { data } = await API.get("/jobs/public", {
        params: { ...filters, page: p, limit: PAGE_LIMIT },
      });
      setJobs(data.jobs);        
      setPage(data.page);
      setTotal(data.totalPages);
    } catch { toast.error("Failed to fetch jobs"); }
  };
  const loadApplied = async () => {
    try {
      const { data } = await API.get("/applications/myApplications");
      setIds(data.applications.map((a) => a.jobId._id));
    } catch { toast.error("Could not load applied jobs"); }
  };

  /* ───────── effects */
  useEffect(() => { loadJobs(1); }, [filters]);   // reset to first page
  useEffect(() => { loadApplied(); }, []);

  /* ───────── handlers */
  const onFilter = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const changePage = (to) => { if (to >= 1 && to <= totalPages) loadJobs(to); };

  /* ───────── ui */
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7ff] to-[#eef1ff]">
      {/* hero */}
      <header className="px-6 pt-10 pb-6 text-center">
        <h1 className="text-4xl font-black text-[#1A3A8F] mb-2">
          Discover <span className="text-[#7F5AF0]">great opportunities</span>
        </h1>
        
      </header>

      {/* filters */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-4 bg-white/80 backdrop-blur rounded-xl p-6 shadow-md">
          <div className="lg:col-span-2 flex items-center gap-2 bg-gray-50 border rounded-md px-3 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              className="flex-1 bg-transparent outline-none text-sm"
              placeholder="Search keyword…"
              name="keyword"
              value={filters.keyword}
              onChange={onFilter}
            />
          </div>

          {/* select boxes */}
          {[
            { name: "location",   opts: ["Kochi","Mumbai","Bengaluru","Trivandrum","Hyderabad","Pune","Delhi"] },
            { name: "jobType",    opts: ["Full-time","Part-time","Remote","Internship","Contract"] },
            { name: "experience", opts: ["Fresher","1-2 years","3-5 years","5+ years"] },
          ].map(({ name, opts }) => (
            <select
              key={name}
              name={name}
              value={filters[name]}
              onChange={onFilter}
              className="bg-gray-50 border rounded-md px-3 py-2 text-sm focus:ring-2 ring-[#7F5AF0]"
            >
              <option value="">
                {name === "jobType" ? "All Types"
                 : name === "experience" ? "All Experience"
                 : "All Locations"}
              </option>
              {opts.map(o => <option key={o}>{o}</option>)}
            </select>
          ))}

          <div className="hidden lg:flex items-center justify-center">
            <Filter size={18} className="text-[#7F5AF0]" />
          </div>
        </div>
      </section>

      {/* grid */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job,i) => (
              <motion.div
                key={job._id}
                initial={{ opacity:0, y:30 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:i*0.05 }}
              >
                <JobCard
                  job={job}
                  isApplied={appliedIds.includes(job._id)}
                  onClick={() => setModal(job)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* pagination */}
      {totalPages > 1 && (
        <nav className="flex justify-center gap-1 mt-10">
          <PageBtn icon={<ChevronsLeft size={14} />}  onClick={()=>changePage(1)} />
          <PageBtn icon={<ChevronLeft  size={14} />}  onClick={()=>changePage(page-1)} />
          {Array.from({length: totalPages}, (_,i)=>(
            <PageBtn
              key={i}
              label={i+1}
              active={i+1===page}
              onClick={()=>changePage(i+1)}
            />
          ))}
          <PageBtn icon={<ChevronRight size={14} />} onClick={()=>changePage(page+1)} />
          <PageBtn icon={<ChevronsRight size={14} />} onClick={()=>changePage(totalPages)} />
        </nav>
      )}

      {/* modal */}
      {modalJob && (
        <JobDetailsModal
          job={modalJob}
          isApplied={appliedIds.includes(modalJob._id)}
          onClose={() => { setModal(null); loadApplied(); }}
        />
      )}
    </div>
  );
}

const PageBtn = ({ label, icon, active, ...props }) => (
  <button
    {...props}
    className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold
      ${active ? "bg-[#7F5AF0] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
      transition`}
  >
    {icon || label}
  </button>
);
