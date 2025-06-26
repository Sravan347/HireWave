const express = require("express");
const {
  postJob,
  getRecruiterJobs,
  getJobById,
  deleteJob,
  getAllJobs
} = require("../controllers/jobController");
const { protectRoute, restrictTo } = require("../middleware/authMiddleware");



const router = express.Router();
router.get("/public", getAllJobs); // Open to all (candidates)

// Recruiter-only routes
router.post("/", protectRoute, restrictTo("recruiter"), postJob);
router.get("/", protectRoute, restrictTo("recruiter"), getRecruiterJobs);
router.get("/:id", protectRoute, restrictTo("recruiter"), getJobById);
router.delete("/:id", protectRoute, restrictTo("recruiter"), deleteJob);



module.exports = router;
