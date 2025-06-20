const express = require("express");
const { protectRoute, restrictTo } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload"); // Cloudinary+Multer
const { applyToJob } = require("../controllers/applicationController");

const router = express.Router();

// Candidate applies to a job with resume
router.post("/apply/:jobId",protectRoute,restrictTo("candidate"),upload.single("resume"),applyToJob);

module.exports = router;
