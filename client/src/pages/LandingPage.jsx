import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import API from "../services/api";
import { Search } from "lucide-react";

const LandingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  /* ─ Fetch jobs (public) ─ */
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await API.get("/jobs/public");
        setJobs(data || []);
      } catch (err) {
        console.error("Jobs fetch error:", err);
      }
    };
    load();
  }, []);

  /* ─ Filter + limit 6 ─ */
  const filteredJobs = jobs
    .filter(
      (j) =>
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.company.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 6); // show only 6

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#181818] transition">
      <Navbar />

      {/* Hero section */}
      <header className="bg-gradient-to-r from-[#7F5AF0] via-[#4C6EF5] to-[#0A1A4A] text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto text-center px-4 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight animate-pulse">
            <span className="font-serif">Dive&nbsp;into</span> <br />
            <span className="font-mono">your&nbsp;next&nbsp;career&nbsp;wave</span>
          </h1>
          <p className="text-lg opacity-90">
            Hand‑picked opportunities updated every day
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto mt-6">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs or companies..."
              className="pl-10 h-10 bg-white/90 dark:bg-[#282828] border border-transparent focus:border-[#B5A9FF] focus:ring-2 focus:ring-[#B5A9FF] transition"
            />
          </div>
        </div>
      </header>

      {/* Jobs grid */}
      <main className="flex-grow">
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#0A1A4A] dark:text-[#B5A9FF]">
            Latest Opportunities
          </h2>

          {filteredJobs.length ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job, i) => (
                <div
                  key={job._id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No jobs found.
            </p>
          )}

          {/* Browse‑all button */}
          {jobs.length > 6 && (
            <div className="text-center mt-10">
              <Button
                onClick={() => window.location.assign("/jobs")}
                className="bg-[#7F5AF0] hover:bg-[#5A3DF0]"
              >
                Browse all jobs
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
