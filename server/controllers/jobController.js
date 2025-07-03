// controllers/jobController.js
const Job         = require("../models/Job");
const Application = require("../models/Application");
const User        = require("../models/User");

/* ════════════════════════════════════════ */
/*  RECRUITER  CRUD                         */
/* ════════════════════════════════════════ */

exports.postJob = async (req, res) => {
  try {
    const recruiter = await User.findById(req.user._id);
    if (!recruiter || recruiter.role !== "recruiter") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const job = await Job.create({
      ...req.body,
      postedBy   : recruiter._id,
      companyName: recruiter.companyName, // auto‑fill
    });

    res.status(201).json({ job, message: "Job posted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to post job" });
  }
};

exports.getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });

    // add applicant counts
    const jobsWithCounts = await Promise.all(
      jobs.map(async (job) => ({
        ...job.toObject(),
        numApplicants: await Application.countDocuments({ jobId: job._id }),
      }))
    );

    res.json(jobsWithCounts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

/* ════════════════════════════════════════ */
/*  PUBLIC – CANDIDATE JOB FEED             */
/* ════════════════════════════════════════ */

/**
 * GET /jobs/public?page=&limit=&keyword=&location=&jobType=&experience=
 *
 * returns:
 * {
 *   jobs: [ ... ],
 *   page: 1,
 *   totalPages: 5,
 *   totalJobs: 42
 * }
 */
exports.getPublicJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 9,
      keyword,
      location,
      jobType,
      experience,
    } = req.query;

    /* build Mongo filter */
    const filter = { status: "active" };

    if (keyword)   filter.title       = { $regex: keyword, $options: "i" };
    if (location)  filter.location    = { $regex: location, $options: "i" };
    if (jobType)   filter.jobType     = jobType;
    if (experience) filter.experience = experience;   // ⭐ experience filter now works

    /* count + paginate */
    const totalJobs   = await Job.countDocuments(filter);
    const totalPages  = Math.ceil(totalJobs / limit);
    const skip        = (page - 1) * limit;

    const jobs = await Job.find(filter)
      .select("-internalNotes -candidateRequirements")
      .populate("postedBy", "companyName logo")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ jobs, page: Number(page), totalPages, totalJobs });
  } catch (err) {
    console.error("Public jobs error:", err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

/* ════════════════════════════════════════ */

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job || job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch {
    res.status(500).json({ message: "Failed to fetch job" });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job || job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Job not found" });
    }
    await job.deleteOne();
    res.json({ message: "Job deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete job" });
  }
};
