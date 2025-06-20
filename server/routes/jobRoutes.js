const express = require("express");
const { protectRoute, restrictTo } = require("../middleware/authMiddleware");
const {
  createJob,
  getRecruiterJobs,
    getOpenJobs,
} = require("../controllers/jobController");

const router = express.Router();

// Recruiter-only routes
router.post("/create", protectRoute, restrictTo("recruiter"), createJob);
router.get("/myJobs", protectRoute, restrictTo("recruiter"), getRecruiterJobs);
// Get all open jobs for candidates
router.get("/", getOpenJobs);

module.exports = router;
