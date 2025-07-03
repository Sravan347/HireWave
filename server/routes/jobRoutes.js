// routes/jobRoutes.js
const express = require("express");
const {
  postJob,
  getRecruiterJobs,
  getJobById,
  deleteJob,
  getPublicJobs,  
} = require("../controllers/jobController");

const { protectRoute, restrictTo } = require("../middleware/authMiddleware");

const router = express.Router();

/* ---------- PUBLIC (candidate) ---------- */
router.get("/public", getPublicJobs);   // ONE clear public route

/* ---------- RECRUITER‑ONLY -------------- */
router.post   ("/",     protectRoute, restrictTo("recruiter"), postJob);
router.get    ("/",     protectRoute, restrictTo("recruiter"), getRecruiterJobs);
router.get    ("/:id",  protectRoute, restrictTo("recruiter"), getJobById);
router.delete ("/:id",  protectRoute, restrictTo("recruiter"), deleteJob);

module.exports = router;
