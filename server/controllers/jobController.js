const Job = require("../models/Job");
const User = require("../models/User");
const Application = require("../models/Application");


// ✅ Post a new job
const postJob = async (req, res) => {
  try {
    const recruiterId = req.user._id; // from auth middleware

    const recruiter = await User.findById(recruiterId);
    if (!recruiter || recruiter.role !== "recruiter") {
      return res.status(403).json({ message: "Unauthorized recruiter access" });
    }

    const job = await Job.create({
      ...req.body,
      postedBy: recruiterId,
      companyName: recruiter.companyName, // Auto-fill from recruiter
    });

    res.status(201).json({ message: "Job posted successfully", job });
  } catch (err) {
    console.error("Job Post Error:", err);
    res.status(500).json({ message: "Failed to post job" });
  }
};

// ✅ Get all jobs posted by this recruiter
const getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });

    const jobsWithCounts = await Promise.all(
      jobs.map(async (job) => {
        const count = await Application.countDocuments({ jobId: job._id });
        return {
          ...job.toObject(),
          numApplicants: count,
        };
      })
    );

    res.status(200).json(jobsWithCounts);
  } catch (err) {
    console.error("Get Recruiter Jobs Error:", err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};
// ✅ Get ALL jobs (Public route - for candidates)
const getAllJobs = async (req, res) => {
  try {
    const { keyword, location, jobType } = req.query;

    let filter = { status: "active" };

    if (keyword) {
      filter.title = { $regex: keyword, $options: "i" };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    const jobs = await Job.find(filter)
      .select("-internalNotes -candidateRequirements")
      .sort({ createdAt: -1 })
      .populate("postedBy", "companyName logo");

    res.status(200).json(jobs);
  } catch (err) {
    console.error("Get All Jobs Error:", err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};


// ✅ Get job by ID (useful for edit/view)
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job || job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch job" });
  }
};

// ✅ Delete a job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job || job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Job not found" });
    }

    await job.deleteOne();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete job" });
  }
};

module.exports = {
  postJob,
  getRecruiterJobs,
  getJobById,
  deleteJob,
  getAllJobs
};
