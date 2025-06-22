import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('/api/jobs');
        console.log('API /api/jobs response:', res.data); // Debug log
        let jobsData = Array.isArray(res.data) ? res.data : res.data.jobs;
        if (!Array.isArray(jobsData)) jobsData = [];
        setJobs(jobsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load jobs');
        setLoading(false);
        console.error('Error fetching jobs:', err);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading jobs...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Job Board</h2>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job._id || job.id || Math.random()} className="p-4 border rounded bg-white shadow">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="mb-2">{job.description}</p>
              <span className="inline-block px-2 py-1 text-xs bg-gray-200 rounded">Status: {job.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobBoard;
