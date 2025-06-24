const express = require("express");

const { login, logout, register, updateProfile } = require("../controllers/user");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { singleUpload}  = require("../middlewares/mutler");
 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
module.exports = router;

