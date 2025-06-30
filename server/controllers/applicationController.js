const Application = require("../models/Application");
const Job = require("../models/Job");
const axios = require("axios");
const pdfParse = require("pdf-parse");
const scoreResume = require("../utils/scoreResume");

// ─────────────────────────────────────────────────────────────────────────────
//   APPLY TO JOB  ────────────────────────────────────────────────────────────
exports.applyToJob = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "Resume file is required." });

    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: "Job not found." });

    // Prevent duplicate applications
    const duplicate = await Application.findOne({
      jobId: job._id,
      candidateId: req.user._id,
    });
    if (duplicate)
      return res.status(400).json({ message: "Already applied to this job." });

    // ── Parse resume PDF from Cloudinary ──
    const resumeBuffer = await axios.get(req.file.path, {
      responseType: "arraybuffer",
    });
    const resumeText = (await pdfParse(resumeBuffer.data)).text;

    // ── Build job keyword list ──
    const jobKeywords = (job.description || "")
      .toLowerCase()
      .match(/\b\w+\b/g)
      ?.filter((w) => w.length > 3) || [];

    // ── Score resume ──
    const score = scoreResume(resumeText, jobKeywords);

    // ── Persist application ──
    const application = await Application.create({
      jobId: job._id,
      candidateId: req.user._id,
      resumeUrl: req.file.path,
      score,
      status: "applied", // <‑‑ unified starting status
      qualification: req.body.qualification,
      backlogInfo: {
        hasBacklogs: req.body.hasBacklogs === "true",
        count: req.body.backlogCount || 0,
      },
    });

    res.status(201).json({ message: "Application submitted", application });
    console.log("Application submitted:", application);
  } catch (err) {
    console.error("Error submitting application:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ candidateId: req.user._id })
      .populate("jobId", "title description location experience jobType salaryRange companyName")
      .sort({ createdAt: -1 });

    res.status(200).json({ count: applications.length, applications });
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
exports.getApplicantsByJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: "Job not found." });
    if (job.postedBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized." });

    const applicants = await Application.find({ jobId: job._id })
      .populate("candidateId", "name email qualification experience")
      .sort({ score: -1 }); // show best matches first

    res.status(200).json({ count: applicants.length, applicants });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching applicants." });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body; // shortlisted | interview | offered | rejected | accepted
    const allowed = ["shortlisted", "interview", "offered", "rejected", "accepted"];
    if (!allowed.includes(status))
      return res.status(400).json({ message: "Invalid status." });

    const application = await Application.findById(req.params.id).populate("jobId");
    if (!application) return res.status(404).json({ message: "Application not found." });

    if (application.jobId.postedBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized." });

    application.status = status;
    await application.save();

    res.status(200).json({ message: "Status updated.", application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error updating status." });
  }
};


// Recruiter uploads test for shortlisted candidate
exports.uploadTestForApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate("jobId");

    if (!application)
      return res.status(404).json({ message: "Application not found" });

    // Authorization check
    if (application.jobId.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (req.file) {
      application.testFileUrl = req.file.path;
      await application.save();
      res.status(200).json({ message: "Test uploaded", application });
    } else {
      res.status(400).json({ message: "No file provided" });
    }
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// Candidate uploads answer for a test
exports.uploadAnswerFile = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application)
      return res.status(404).json({ message: "Application not found" });

    if (application.candidateId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    if (application.answerFileUrl)
      return res.status(400).json({ message: "Answer already submitted" });

    if (req.file) {
      application.answerFileUrl = req.file.path;
      await application.save();
      res.status(200).json({ message: "Answer submitted", application });
    } else {
      res.status(400).json({ message: "No file uploaded" });
    }
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};



exports.scheduleInterview = async (req, res) => {
  try {
    const { date, link } = req.body;
    const application = await Application.findById(req.params.id);

    if (!application) return res.status(404).json({ message: "Not found" });

    application.interviewDetails = { date, link };
    application.status = "interview";
    await application.save();

    res.status(200).json({ message: "Interview scheduled", application });
  } catch (err) {
    console.error("Schedule Interview Error:", err);
    res.status(500).json({ message: "Failed to schedule interview" });
  }
};


exports.submitInterviewFeedback = async (req, res) => {
  try {
    const { feedback } = req.body;
    const application = await Application.findById(req.params.id).populate("jobId");

    if (!application) return res.status(404).json({ message: "Application not found" });

    if (application.jobId.postedBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    application.feedback = feedback;
    await application.save();

    res.status(200).json({ message: "Feedback submitted", application });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit feedback", error: err.message });
  }
};


exports.uploadOfferLetter = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate("jobId");

    if (!application) return res.status(404).json({ message: "Application not found" });

    if (application.jobId.postedBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    application.offerLetterUrl = req.file.path;
    await application.save();

    res.status(200).json({ message: "Offer letter uploaded", application });
  } catch (err) {
    res.status(500).json({ message: "Failed to upload offer letter", error: err.message });
  }
};


