const express = require("express");
const {
  getAllRecruiters,
  approveRecruiter,
  declineRecruiter,
} = require("../controllers/adminController");
const { protectRoute, restrictTo } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/recruiters", protectRoute, restrictTo("admin"), getAllRecruiters);
router.put("/recruiters/:id/approve", protectRoute, restrictTo("admin"), approveRecruiter);
router.put("/recruiters/:id/decline", protectRoute, restrictTo("admin"), declineRecruiter);

module.exports = router;
