import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import Footer from '../components/Footer';
import API from '../services/api';

const LandingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await API.get('/jobs/public');
        setJobs(response.data || []);
        setFilteredJobs(response.data || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [search, jobs]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#181818] text-[#2D3748] dark:text-[#E6E9F5] transition duration-300">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#0A1A4A] dark:text-[#7F5AF0]">
              Explore Jobs on HireWave
            </h1>
            <p className="text-[#2D3748] dark:text-[#D6CEFA] mt-2">
              Find your dream job today
            </p>
          </div>

          {/* Search Input */}
          <Input
            type="text"
            placeholder="Search jobs or companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-6 bg-[#E6E9F5] dark:bg-[#282828] border border-[#1A3A8F] focus:ring-2 focus:ring-[#7F5AF0] text-[#2D3748] dark:text-white"
          />


          {/* Job Listings */}
          {filteredJobs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <p className="text-center mt-10 text-[#757575] dark:text-[#D6CEFA]">
              No jobs found.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
