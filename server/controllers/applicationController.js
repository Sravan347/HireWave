const Application = require("../models/Application");
const Job = require("../models/Job");

// Candidate applies to a job
const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if job is valid and open
    const job = await Job.findById(jobId);
    if (!job || job.status !== "open") {
      return res.status(404).json({ message: "Job not found or closed" });
    }

    // Ensure resume file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Resume is required" });
    }

    // Prevent duplicate application
    const alreadyApplied = await Application.findOne({
      jobId,
      candidateId: req.user._id,
    });
    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const application = await Application.create({
      jobId,
      candidateId: req.user._id,
      resumeUrl: req.file.path, // Cloudinary URL
    });

    res.status(201).json({ message: "Application submitted", application });
  } catch (err) {
    res.status(500).json({ message: "Failed to apply", error: err.message });
  }
};

module.exports = { applyToJob };
