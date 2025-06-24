const express = require("express");


const {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} = require("../controllers/application");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

module.exports = router;
