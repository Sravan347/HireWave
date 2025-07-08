import React, { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import API from "../services/api";
import { Search } from "lucide-react";

const LandingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch public jobs
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const { data } = await API.get("/jobs/public");
        setJobs(Array.isArray(data.jobs) ? data.jobs : []);
      } catch (err) {
        console.error("Jobs fetch error:", err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  // Memoized filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs
      .filter(
        (j) =>
          j.title.toLowerCase().includes(search.toLowerCase()) ||
          j.companyName.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 6);
  }, [jobs, search]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#181818] transition">
      <Navbar />

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-[#7F5AF0] via-[#4C6EF5] to-[#0A1A4A] text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto text-center px-4 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight animate-pulse">
            <span className="font-serif">Dive&nbsp;into</span> <br />
            <span className="font-mono">your&nbsp;next&nbsp;career&nbsp;wave</span>
          </h1>
          <p className="text-lg opacity-90">
            Hand picked opportunities updated every day
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto mt-6">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs or companies..."
              aria-label="Search jobs"
              className="pl-10 h-10 bg-white/90 dark:bg-[#282828] border border-transparent focus:border-[#B5A9FF] focus:ring-2 focus:ring-[#B5A9FF] transition text-gray-700"
            />
          </div>
        </div>
      </header>

      {/* Job Section */}
      <main className="flex-grow">
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#0A1A4A] dark:text-[#B5A9FF]">
            Latest Opportunities
          </h2>

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3 animate-pulse">
                  <Skeleton className="h-6 w-1/2 rounded bg-gray-300 dark:bg-[#2D2D2D]" />
                  <Skeleton className="h-4 w-1/3 rounded bg-gray-300 dark:bg-[#2D2D2D]" />
                  <Skeleton className="h-36 w-full rounded-xl bg-gray-200 dark:bg-[#2A2A2A]" />
                  <Skeleton className="h-10 w-24 rounded bg-[#7F5AF0]/30 dark:bg-[#5A3DF0]/20" />
                </div>
              ))}
            </div>
          ) : filteredJobs.length > 0 ? (
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

          {/* Browse all jobs */}
          {jobs.length > 6 && !loading && (
            <div className="text-center mt-10">
              <Button
                onClick={() => window.location.assign("/jobs")}
                className="bg-[#7F5AF0] hover:bg-[#5A3DF0]"
                type="button"
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
