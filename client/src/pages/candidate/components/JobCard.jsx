import React from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function JobCard({ job, onClick, isApplied }) {
  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 border ${
        isApplied ? "opacity-70" : "hover:border-[#1A3A8F]"
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <img
              src={job.postedBy?.logo || job.companyLogo || "/default-logo.png"}
              alt="Logo"
              className="h-10 w-10 rounded-full mr-3 object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg text-[#0A1A4A] group-hover:text-[#1A3A8F]">
                {job.title}
              </h3>
              <p className="text-sm text-[#2D3748]">{job.companyName}</p>
            </div>
          </div>

          {isApplied && (
            <Badge className="bg-green-100 text-green-700 border border-green-300 text-xs">
              ✅ Applied
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="text-sm text-[#2D3748] space-y-2">
        <div className="flex items-center gap-2 text-[#505050]">
          <MapPin size={14} /> {job.location} • {job.jobType}
        </div>

        <p>Exp: {job.experience}</p>

        <div className="flex items-center text-green-600">
          <Briefcase size={14} className="mr-1" />
          ₹ {job.salaryRange}
        </div>

        <div className="flex items-center text-[#F4A261]">
          <Calendar size={14} className="mr-1" />
          Last date to apply:{" "}
          {format(new Date(job.applicationDeadline), "dd-MM-yyyy")}
        </div>
      </CardContent>
    </Card>
  );
}
