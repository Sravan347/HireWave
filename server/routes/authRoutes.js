const express = require("express");
const profilePicUpload = require("../middleware/profileUpload"); 
const {
  registerUser,
  updateUserProfile,
  getUserProfile,
  logoutUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { protectRoute } = require("../middleware/authMiddleware");

const router = express.Router();


router.route("/register").post(registerUser)
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/logout", logoutUser);
// router.put("/profile", protectRoute, updateUserProfile);

router.get("/profile", protectRoute, getUserProfile);
router.put("/profile", protectRoute,  profilePicUpload.single("profilePic"), updateUserProfile);


module.exports = router