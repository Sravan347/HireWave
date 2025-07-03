const express = require("express");
const upload = require("../middleware/upload"); 
const {
  registerUser,
  updateUserProfile,
  getUserProfile,
  logoutUser,
  loginUser,
} = require("../controllers/authController");
const { protectRoute } = require("../middleware/authMiddleware");

const router = express.Router();




router.route("/register").post(registerUser)
router.post("/login", loginUser);
router.post("/logout", logoutUser);
// router.put("/profile", protectRoute, updateUserProfile);

router.get("/profile", protectRoute, getUserProfile);
router.put("/profile", protectRoute, upload.single("resume"), updateUserProfile);


module.exports = router