

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"

import API from '../services/api';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard'; // Create this
import Footer from '../components/Footer';


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
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#181818] text-gray-800 dark:text-gray-200 transition duration-300">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#2563EB] dark:text-blue-400">Explore Jobs on HireWave</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Find your dream job today</p>
          </div>

          <input
            type="text"
            placeholder="Search jobs or companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 mb-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-[#282828] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {filteredJobs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <p className="text-center mt-10 text-gray-500">No jobs found.</p>
          )}

        
        </div>
      </main>
      <Footer /> {/* Add footer at the bottom */}
    </div>
  );
};

export default LandingPage;

