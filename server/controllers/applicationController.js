const Application = require("../models/Application");
const Job = require("../models/Job");
const axios = require("axios");
const pdfParse = require("pdf-parse");
const scoreResume = require("../utils/scoreResume"); // 👈 separate util

const applyToJob = async (req, res) => {
  try {
    // 1. Validate resume file
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required." });
    }

    // 2. Check if job exists
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    // 3. Prevent duplicate applications
    const alreadyApplied = await Application.findOne({
      jobId: req.params.jobId,
      candidateId: req.user._id,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    // 4. Download resume from Cloudinary
    const resumeBuffer = await axios.get(req.file.path, {
      responseType: "arraybuffer",
    });

    // 5. Extract text using pdf-parse
    const resumeText = (await pdfParse(resumeBuffer.data)).text;

    // 6. Extract keywords from job description
    const jobKeywords = job.description
      .split(" ")
      .map((word) => word.toLowerCase().replace(/[^\w]/g, ""))
      .filter((word) => word.length > 3);

    // 7. Score resume
    const score = scoreResume(resumeText, jobKeywords);

    // 8. Save application
    const application = await Application.create({
      jobId: req.params.jobId,
      candidateId: req.user._id,
      resumeUrl: req.file.path,
      score,
      status: "in progress",
      qualification: req.body.qualification, // 👈 New
      backlogInfo: {
        hasBacklogs: req.body.hasBacklogs === "true",
        count: req.body.backlogCount || 0,
      },
    });

    res.status(201).json({ message: "Application submitted", application });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ candidateId: req.user._id })
      .populate("jobId", "title description status") // only needed job fields
      .sort({ createdAt: -1 });

    res.status(200).json({ count: applications.length, applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = { applyToJob, getMyApplications };
