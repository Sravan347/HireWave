const express = require("express");
import isAuthenticated from "../middlewares/isAuthenticated";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);

module.exports = router;

