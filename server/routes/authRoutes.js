const express = require("express")
const { registerUser, updateUserProfile, logoutUser, loginUser } = require("../controllers/authController");
const { protectRoute } = require("../middleware/authMiddleware");
const router = express.Router()

router.route("/register").post(registerUser)
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/profile", protectRoute, updateUserProfile);

module.exports = router