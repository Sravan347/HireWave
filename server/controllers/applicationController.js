const Application = require("../models/Application");
const Job = require("../models/Job");

const applyToJob = async (req, res) => {
  try {
    console.log(" Candidate:", req.user);
    console.log("File Info:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required." });
    }

    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    const alreadyApplied = await Application.findOne({
      jobId: req.params.jobId,
      candidateId: req.user._id,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const application = await Application.create({
      jobId: req.params.jobId,
      candidateId: req.user._id,
      resumeUrl: req.file.path,
      status: "in progress",
    });

    console.log(" Application saved:", application);

    res.status(201).json({ message: "Application submitted", application });
  } catch (error) {
    console.error(" Error submitting application:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { applyToJob };
