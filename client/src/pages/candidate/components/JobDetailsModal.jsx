// /pages/candidate/components/JobDetailsModal.jsx

import React, { useState } from "react";
import API from "../../../services/api";
import { X } from "lucide-react";
import { toast } from "react-toastify";

export default function JobDetailsModal({ job, isApplied, onClose }) {
  const [resume, setResume] = useState(null);
  const [qualification, setQualification] = useState("");
  const [backlog, setBacklog] = useState("");

  const handleApply = async () => {
  if (!qualification || !resume) {
    return toast.error("Please add qualification and upload resume");
  }

  const data = new FormData();
  data.append("qualification", qualification);
  data.append("hasBacklogs", backlog > 0 ? "true" : "false");
  data.append("backlogCount", backlog);
  data.append("resume", resume);

  try {
    await API.post(`/applications/apply/${job._id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success("Application submitted!");
    onClose();
  } catch (err) {
    toast.error(err.response?.data?.message || "Application failed.");
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl">{job.companyName}</h1>
          <h1 className="text-2xl">{job.title}</h1>
          <button onClick={onClose} className="p-2"><X /></button>
        </div>
        <p className="text-gray-700 mb-4">{job.description}</p>
        <p className="text-gray-700 mb-4"><b>Salary Range :</b> {job.salaryRange}</p>
        <p className="text-gray-700 mb-4"><b>Location :</b> {job.location}</p>
        <p className="text-gray-700 mb-4"><b>Qualification :</b> {job.qualificationsRequired}</p>
        <p className="text-gray-700 mb-4"><b>Experience :</b> {job.experience}</p>
        <p className="text-gray-700 mb-4"><b>Job Type :</b>  {job.jobType}</p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Highest Qualification (e.g., MCA, BTech)"
            value={qualification}
            onChange={e => setQualification(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Number of Backlogs (0 if none)"
            value={backlog}
            onChange={e => setBacklog(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={e => setResume(e.target.files[0])}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {!isApplied && (
  <button
    onClick={handleApply}
    className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
  >
    Apply Now
  </button>
)}
{isApplied && (
  <p className="mt-6 text-center text-green-600 font-medium">You have already applied to this job</p>
)}

      </div>
    </div>
  );
}
