const express = require("express");
const { protectRoute, restrictTo } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload"); 
const { applyToJob , getMyApplications} = require("../controllers/applicationController");

const router = express.Router();

// Candidate applies to a job with resume
router.post("/apply/:jobId",protectRoute,restrictTo("candidate"),upload.single("resume"),applyToJob);

router.get("/myApplications", protectRoute, restrictTo("candidate"), getMyApplications);

module.exports = router;
