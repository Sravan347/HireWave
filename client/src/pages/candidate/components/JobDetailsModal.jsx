import React, { useState } from "react";
import API from "../../../services/api";

import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-screen bg-white text-[#2D3748]">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-[#0A1A4A] text-2xl">
            {job.companyName} - {job.title}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-[#7F5AF0] hover:text-[#5A3DF0]"
          >
            
          </Button>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4 space-y-4">
          <p>{job.description}</p>
          <p><b>Salary Range:</b> {job.salaryRange}</p>
          <p><b>Location:</b> {job.location}</p>
          <p><b>Qualification:</b> {job.qualificationsRequired}</p>
          <p><b>Experience:</b> {job.experience}</p>
          <p><b>Job Type:</b> {job.jobType}</p>

          <div className="space-y-4 pt-4">
            <div>
              <Label htmlFor="qualification">Highest Qualification</Label>
              <Input
                id="qualification"
                placeholder="e.g., BTech, MCA"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="backlog">Backlogs</Label>
              <Input
                id="backlog"
                type="number"
                placeholder="Number of backlogs"
                value={backlog}
                onChange={(e) => setBacklog(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="resume">Upload Resume</Label>
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                required
              />
            </div>
          </div>

          {!isApplied ? (
            <Button
              onClick={handleApply}
              className="w-full bg-[#1A3A8F] hover:bg-[#0A1A4A] text-white mt-6"
            >
              Apply Now
            </Button>
          ) : (
            <p className="text-green-600 text-center font-medium mt-6">
              ✅ You have already applied to this job
            </p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
