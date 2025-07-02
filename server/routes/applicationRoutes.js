const express = require("express");
const {
  applyToJob,
  getMyApplications,
  getApplicantsByJob,
  updateApplicationStatus,
  uploadTestForApplication,
  uploadAnswerFile,
  scheduleInterview,
  submitInterviewFeedback,
  uploadOfferLetter,
  respondToOffer,
  getAcceptedOffers,
} = require("../controllers/applicationController");
const { protectRoute, restrictTo } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// ─── Candidate ───────────────────────────────────────────────────────────────
router.post(
  "/apply/:jobId",
  protectRoute,
  restrictTo("candidate"),
  upload.single("resume"),
  applyToJob
);

router.get(
  "/myApplications",
  protectRoute,
  restrictTo("candidate"),
  getMyApplications
);

// ─── Recruiter ───────────────────────────────────────────────────────────────
router.get(
  "/job/:jobId/applicants",
  protectRoute,
  restrictTo("recruiter"),
  getApplicantsByJob
);

router.put(
  "/application/:id/status",
  protectRoute,
  restrictTo("recruiter"),
  updateApplicationStatus
);




// Recruiter uploads test
router.post(
  "/application/:id/upload-test",
  protectRoute,
  restrictTo("recruiter"),
  upload.single("testFile"),
  uploadTestForApplication
);

// Candidate uploads answer
router.post(
  "/application/:id/upload-answer",
  protectRoute,
  restrictTo("candidate"),
  upload.single("answer"),
  uploadAnswerFile
);

router.put(
  "/application/:id/schedule-interview",
  protectRoute,
  restrictTo("recruiter"),
  scheduleInterview
);

router.put(
  "/application/:id/feedback",
  protectRoute,
  restrictTo("recruiter"),
  submitInterviewFeedback
);

router.post(
  "/application/:id/upload-offer",
  protectRoute,
  restrictTo("recruiter"),
  upload.single("offer"),
  uploadOfferLetter
);

router.put(
  "/application/:id/respond-to-offer",
  protectRoute,
  restrictTo("candidate"),
  respondToOffer
);


router.get(
  "/offers",
  protectRoute,
  restrictTo("candidate"),
  getAcceptedOffers
);



module.exports = router;
