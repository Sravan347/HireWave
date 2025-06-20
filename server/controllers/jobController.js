const Job = require("../models/Job");

// @desc Create a job (Recruiter only)
const createJob = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const job = await Job.create({
      recruiterId: req.user._id,
      title,
      description,
      status,
    });

    res.status(201).json(job);
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({ message: "Failed to create job." });
  }
};

// @desc Get recruiter's own jobs
const getRecruiterJobs = async (req, res) => {
  const jobs = await Job.find({ recruiterId: req.user._id });
  res.json(jobs);
};


const getOpenJobs = async (req, res) => {
  try {
    const { search } = req.query;
    const query = {
      status: "open",
      ...(search && { title: { $regex: search, $options: "i" } }),
    };

    const jobs = await Job.find(query).populate("recruiterId", "name email");
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};
module.exports = {
  createJob,
  getRecruiterJobs,
  getOpenJobs,
};
