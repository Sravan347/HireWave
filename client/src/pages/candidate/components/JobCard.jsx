// /pages/candidate/components/JobCard.jsx

import React from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";

export default function JobCard({ job, onClick, isApplied }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white p-4 rounded-lg shadow hover:shadow-lg transform hover:-translate-y-1 transition cursor-pointer group border ${
        isApplied ? "opacity-70" : "hover:border-blue-500"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <img
            src={job.postedBy?.logo || job.companyLogo || "/default-logo.png"}
            alt="Logo"
            className="h-10 w-10 rounded-full mr-3 object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg group-hover:text-blue-600">
              {job.title}
            </h3>
            <p className="text-gray-600 text-sm font-medium">{job.companyName}</p>
          </div>
        </div>

        {isApplied && (
          <span className="text-green-600 text-xs font-medium bg-green-100 px-2 py-1 rounded">
            ✅ Applied
          </span>
        )}
      </div>

      <div className="text-gray-500 text-sm flex items-center gap-2 mt-1">
        <MapPin size={14} /> {job.location} • {job.jobType}
      </div>

      <p className="text-sm text-gray-700 mt-2">Exp: {job.experience}</p>

      <div className="mt-2 inline-flex items-center text-green-600 text-sm">
        <Briefcase size={14} className="mr-1" /> ₹ {job.salaryRange}
      </div>

      <br></br>

      <div className="mt-2 inline-flex items-center text-red-600 text-sm">
        <Calendar size={14} className="mr-1" />
        Last date to apply : {format(new Date(job.applicationDeadline), "dd-MM-yyyy")}
      </div>
    </div>
  );
}
