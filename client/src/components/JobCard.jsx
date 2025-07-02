import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Calendar, DollarSign } from "lucide-react";

const JobCard = ({ job }) => {
  return (
    <Card className="bg-white/80 dark:bg-[#232347]/80 border border-[#E6E9F5] dark:border-[#343434] shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-200 rounded-2xl backdrop-blur-md">
      <CardHeader className="pb-2 flex flex-row items-center gap-3">
        <div className="flex-1 min-w-0">
          <CardTitle className="text-[#2563EB] dark:text-blue-400 text-lg md:text-xl font-bold leading-tight truncate">
            {job.title}
          </CardTitle>
          <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-[#E6E9F5] dark:bg-[#4C6EF5] text-xs font-semibold text-[#0A1A4A] dark:text-white">
            {job.company}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 text-sm text-[#2D3748] dark:text-gray-300">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <MapPin size={16} /> {job.location}
          </span>
          <span className="flex items-center gap-1 text-[#7F5AF0] dark:text-[#B5A9FF]">
            <Briefcase size={16} /> {job.jobType}
          </span>
        </div>
        {/* Salary and date (if available) */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
          {job.salary && (
            <span className="flex items-center gap-1">
              <DollarSign size={14} /> {job.salary}
            </span>
          )}
          {job.postedAt && (
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {job.postedAt}
            </span>
          )}
        </div>
        <div className="flex-1" />
        <Link
          to={`/job/${job._id}`}
          className="mt-3 w-full text-center bg-gradient-to-r from-[#7F5AF0] to-[#4C6EF5] hover:from-[#4C6EF5] hover:to-[#7F5AF0] text-white px-6 py-2 text-sm rounded-full font-semibold shadow-md transition-all duration-200"
        >
          View Details
        </Link>
      </CardContent>
    </Card>
  );
};

export default JobCard;
