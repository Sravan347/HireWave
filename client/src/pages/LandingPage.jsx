// import React from 'react';
// import Navbar from '../components/Navbar';
// import logo from '../assets/logo.png';

// const LandingPage = () => {
//   return (
//     <div className="bg-white min-h-screen">
//       <Navbar />
//       <div className="p-10 text-center">
//         <img src={logo} alt="HireWave Logo" className="mx-auto mb-6 w-32 h-32 object-contain" />
//         <h1 className="text-4xl font-bold text-[#2563EB]">Welcome to HireWave</h1>
//         <p className="text-gray-600 mt-4">Your AI-powered recruitment assistant</p>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

import React, { useEffect, useState } from 'react';

import API from '../services/api';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard'; // Create this


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
    <div className="min-h-screen bg-white dark:bg-[#181818] text-gray-800 dark:text-gray-200 transition duration-300">
      <Navbar />
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
    </div>
  );
};

export default LandingPage;

