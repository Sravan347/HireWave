
import React, { useEffect, useState } from "react";
import API from "../../services/api";
import JobCard from "./components/JobCard";
import JobDetailsModal from "./components/JobDetailsModal";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

const PAGE_LIMIT = 9; // 

export default function JobBoard() {
  /* ------------------------------------------------------------------ state */
  const [jobs, setJobs] = useState([]);
  const [pages, setPages] = useState({ current: 1, total: 1 });
  const [appliedJobIds, setAppliedJobIds] = useState([]);

  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    jobType: "",
    experience: "",
  });

  const [modalJob, setModalJob] = useState(null);

  /* ------------------------------------------------------ data fetch helpers */
  const fetchJobs = async (page = pages.current) => {
    try {
      const { data } = await API.get("/jobs/public", {
        params: { ...filters, page, limit: PAGE_LIMIT },
      });
      setJobs(data.jobs);
      setPages({ current: data.page, total: data.totalPages });
    } catch {
      toast.error("Failed to fetch jobs");
    }
  };

  const fetchApplied = async () => {
    try {
      const { data } = await API.get("/applications/myApplications");
      setAppliedJobIds(data.applications.map((a) => a.jobId._id));
    } catch {
      toast.error("Could not load applied jobs");
    }
  };

  /* ----------------------------------------------------------- life‑cycles */
  useEffect(() => {
    fetchJobs(1); // move back to first page on filter change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    fetchApplied();
  }, []);

  /* -------------------------------------------------------- ui callbacks */
  const handleFilter = (e) =>
    setFilters((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handlePage = (to) => {
    if (to < 1 || to > pages.total) return;
    fetchJobs(to);
  };

  /* ------------------------------------------------------------- render */
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7ff] to-[#eef1ff]">
      {/* ───── header bar (just a light hero) ───── */}
      <header className="px-6 pt-10 pb-6 text-center">
        <h1 className="text-4xl font-black text-[#1A3A8F] mb-2">
          Discover <span className="text-[#7F5AF0]">great opportunities</span>
        </h1>
        {/* <p className="text-gray-600 max-w-md mx-auto">
          Use the advanced filters & paging controls to browse all open roles on
          HireWave.
        </p> */}
      </header>

      {/* ───── search + filter row ───── */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-4 bg-white/80 backdrop-blur rounded-xl p-6 shadow-md">
          {/* keyword search */}
          <div className="lg:col-span-2 flex items-center gap-2 bg-gray-50 border rounded-md px-3 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              className="flex-1 bg-transparent outline-none text-sm"
              placeholder="Search keyword…"
              name="keyword"
              value={filters.keyword}
              onChange={handleFilter}
            />
          </div>

          {/* other filters */}
          {[
            {
              name: "location",
              opts: [
                "Kochi",
                "Mumbai",
                "Bengaluru",
                "Trivandrum",
                "Hyderabad",
                "Pune",
                "Delhi",
              ],
            },
            {
              name: "jobType",
              opts: ["Full-time", "Part-time", "Remote", "Internship", "Contract"],
            },
            {
              name: "experience",
              opts: ["Fresher", "1-2 years", "3-5 years", "5+ years"],
            },
          ].map(({ name, opts }) => (
            <select
              key={name}
              name={name}
              onChange={handleFilter}
              value={filters[name]}
              className="bg-gray-50 border rounded-md px-3 py-2 text-sm focus:ring-2 ring-[#7F5AF0]"
            >
              <option value="">
                {name === "jobType"
                  ? "All Types"
                  : name === "experience"
                  ? "All Experience"
                  : "All Locations"}
              </option>
              {opts.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ))}

          {/* decorative filter icon */}
          <div className="hidden lg:flex items-center justify-center">
            <Filter size={18} className="text-[#7F5AF0]" />
          </div>
        </div>
      </section>

      {/* ───── job cards grid ───── */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job, i) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <JobCard
                  job={job}
                  isApplied={appliedJobIds.includes(job._id)}
                  onClick={() => setModalJob(job)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ───── pagination ───── */}
      {pages.total > 1 && (
        <nav className="flex items-center justify-center gap-1 mt-10">
          <PageBtn icon={<ChevronsLeft size={14} />} onClick={() => handlePage(1)} />
          <PageBtn icon={<ChevronLeft size={14} />} onClick={() => handlePage(pages.current - 1)} />

          {Array.from({ length: pages.total }).map((_, i) => (
            <PageBtn
              key={i}
              label={i + 1}
              active={i + 1 === pages.current}
              onClick={() => handlePage(i + 1)}
            />
          ))}

          <PageBtn icon={<ChevronRight size={14} />} onClick={() => handlePage(pages.current + 1)} />
          <PageBtn icon={<ChevronsRight size={14} />} onClick={() => handlePage(pages.total)} />
        </nav>
      )}

      {/* ───── modal ───── */}
      {modalJob && (
        <JobDetailsModal
          job={modalJob}
          isApplied={appliedJobIds.includes(modalJob._id)}
          onClose={() => {
            setModalJob(null);
            fetchApplied();
          }}
        />
      )}
    </div>
  );
}

/* tiny reusable button */
const PageBtn = ({ label, icon, active, ...rest }) => (
  <button
    {...rest}
    className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold
      ${
        active
          ? "bg-[#7F5AF0] text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      } transition`}
  >
    {icon || label}
  </button>
);
