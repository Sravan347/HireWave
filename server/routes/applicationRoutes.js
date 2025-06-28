const express = require("express");
const {
  applyToJob,
  getMyApplications,
  getApplicantsByJob,      // ⬅️ NEW
  updateApplicationStatus, // ⬅️ NEW
} = require("../controllers/applicationController");
const { protectRoute, restrictTo } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// ─── Candidate routes ─────────────────────────────────────────────────────────
router.post(
  "/apply/:jobId",
  protectRoute,
  restrictTo("candidate"),
  upload.single("resume"),
  applyToJob
);

router.get(
  "/job/:jobId",
  protectRoute,
  restrictTo("recruiter"),
  getApplicantsByJob
);


// ─── Recruiter routes ────────────────────────────────────────────────────────
// recruiter: get applicants of a specific job
router.get(
  "/job/:jobId/applicants",
  protectRoute,
  restrictTo("recruiter"),
  getApplicantsByJob
);

// recruiter: update application status
router.put(
  "/application/:id/status",
  protectRoute,
  restrictTo("recruiter"),
  updateApplicationStatus
);

module.exports = router;
