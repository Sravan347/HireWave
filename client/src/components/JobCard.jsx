import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const JobCard = ({ job }) => {
  return (
    <Card className="bg-white dark:bg-[#2a2a2a] border border-[#E6E9F5] dark:border-[#343434] shadow-md hover:shadow-xl transition rounded-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-[#2563EB] dark:text-blue-400 text-xl font-semibold">
          {job.title}
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">{job.company}</p>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 text-sm text-[#2D3748] dark:text-gray-300">
        <p>{job.location}</p>
        <Badge variant="outline" className="w-fit bg-[#D6CEFA] text-[#0A1A4A] dark:bg-[#5936D9] dark:text-white">
          {job.jobType}
        </Badge>

        <Link
          to={`/job/${job._id}`}
          className="mt-4 text-center bg-[#2563EB] hover:bg-[#1A3A8F] text-white px-4 py-2 text-sm rounded-md"
        >
          View Details
        </Link>
      </CardContent>
    </Card>
  );
};

export default JobCard;
