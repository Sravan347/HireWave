import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-toastify";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);

  const fetchMyApplications = async () => {
    try {
      const res = await API.get("/applications/myApplications");
      setApplications(res.data.applications);
    } catch (err) {
      toast.error("Failed to load applications.");
    }
  };

  useEffect(() => {
    fetchMyApplications();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📄 My Applications</h1>

      {applications.length === 0 ? (
        <p className="text-gray-500">You haven't applied to any jobs yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{app.jobId.title}</h3>
                  <p className="text-gray-600 text-sm font-medium">
                    {app.jobId?.companyName}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    app.status === "in progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : app.status === "shortlisted"
                      ? "bg-blue-100 text-blue-700"
                      : app.status === "hired"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {app.status}
                </span>
              </div>

              <div className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                <MapPin size={14} /> {app.jobId.location}
              </div>

              <p className="text-sm mt-2 text-gray-700">
                Exp: {app.jobId.experience}
              </p>

              <div className="mt-2 inline-flex items-center text-green-600 text-sm">
                <Briefcase size={14} className="mr-1" />₹{" "}
                {app.jobId.salaryRange}
              </div>

              {/* <div className="mt-2 inline-flex items-center text-blue-600 text-sm">
                <Calendar size={14} className="mr-1" />
                Applied on:{" "}
                {app.createdAt
                  ? format(new Date(app.createdAt), "dd MM yyyy")
                  : "N/A"}
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
