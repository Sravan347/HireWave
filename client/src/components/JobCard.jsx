import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white dark:bg-[#2a2a2a] shadow-md rounded-xl p-5 hover:shadow-xl transition">
      <h3 className="text-xl font-semibold text-[#2563EB] dark:text-blue-400">{job.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{job.company}</p>
      <p className="text-sm mt-2">{job.location}</p>
      <p className="text-sm mt-1 text-gray-500">{job.jobType}</p>
      <Link
        to={`/job/${job._id}`}
        className="inline-block mt-4 text-sm text-white bg-[#2563EB] hover:bg-blue-600 px-4 py-2 rounded-md"
      >
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
