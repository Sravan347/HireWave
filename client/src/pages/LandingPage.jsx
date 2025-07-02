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

      {/* Hero section with animated SVG background */}
      <header className="relative overflow-hidden bg-gradient-to-r from-[#7F5AF0] via-[#4C6EF5] to-[#0A1A4A] text-white py-20 md:py-28">
        {/* Animated SVG Waves */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <svg className="absolute bottom-0 left-0 w-full h-32" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="url(#waveGradient)" fillOpacity="0.4" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,154.7C840,149,960,171,1080,186.7C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            <defs>
              <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B5A9FF" />
                <stop offset="100%" stopColor="#7F5AF0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="max-w-6xl mx-auto text-center px-4 space-y-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[#B5A9FF] via-white to-[#7F5AF0] bg-clip-text text-transparent drop-shadow-lg animate-pulse">
            <span className="font-serif">Dive&nbsp;into</span> <br />
            <span className="font-mono">your&nbsp;next&nbsp;career&nbsp;wave</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 font-medium drop-shadow-sm">
            Hand‑picked opportunities updated every day. <br className="hidden md:block" />
            <span className="text-[#FFD700] dark:text-[#FBBF24] font-semibold">Find your dream job or the perfect hire!</span>
          </p>
          {/* Call-to-action button */}
          <div className="flex justify-center gap-4 mt-4">
            <Button
              className="px-8 py-3 rounded-full bg-[#FFD700] text-[#0A1A4A] font-bold text-lg shadow-lg hover:bg-[#FBBF24] transition"
              onClick={() => window.location.assign("/register")}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              className="px-8 py-3 rounded-full bg-[#4C6EF5] text-white font-bold text-lg shadow-lg hover:bg-[#7F5AF0] border-none transition"
              onClick={() => window.location.assign("/jobs")}
            >
              Browse Jobs
            </Button>
          </div>
          {/* Search */}
          <div className="relative max-w-xl mx-auto mt-10 animate-fade-in">
            <span className="absolute left-3 top-2.5 text-gray-400 transition-transform duration-200 group-focus-within:scale-110">
              <Search size={20} />
            </span>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs or companies..."
              className="pl-10 h-12 bg-white/90 dark:bg-[#282828] border border-transparent focus:border-[#B5A9FF] focus:ring-2 focus:ring-[#B5A9FF] transition rounded-full shadow-lg group"
            />
          </div>
        </div>
        {/* Wavy divider */}
        <svg className="absolute bottom-0 left-0 w-full h-12" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#fff" fillOpacity="1" d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,37.3C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"></path>
        </svg>
      </header>

      {/* Jobs grid */}
      <main className="flex-grow bg-gradient-to-b from-white via-[#F5F7FF] to-[#E9ECFF] dark:from-[#181818] dark:via-[#232347] dark:to-[#181818]">
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#0A1A4A] dark:text-[#B5A9FF] text-center drop-shadow-md">
            Latest Opportunities
          </h2>

          {filteredJobs.length ? (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job, i) => (
                <div
                  key={job._id}
                  className="transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl rounded-2xl bg-white/80 dark:bg-[#232347]/80 shadow-md animate-fade-in"
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
            <div className="text-center mt-12">
              <Button
                onClick={() => window.location.assign("/jobs")}
                className="bg-[#7F5AF0] hover:bg-[#5A3DF0] px-8 py-3 rounded-full text-lg font-bold shadow-lg"
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
