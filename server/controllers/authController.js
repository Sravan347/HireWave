const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");


const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      companyName,
      gstNumber,
      mobile,
      qualification,
      age,
      place,
      experience,
      designation,
      website,
      location,
      companyType,
    } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All required fields are missing." });
    }

    const validRoles = ["candidate", "recruiter"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid user role." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email." });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      companyName: role === "recruiter" ? companyName : undefined,
      gstNumber: role === "recruiter" ? gstNumber : undefined,
      mobile: role === "candidate" ? mobile : undefined,
      qualification: role === "candidate" ? qualification : undefined,
      age: role === "candidate" ? age : undefined,
      place: role === "candidate" ? place : undefined,
      experience: role === "candidate" ? experience : undefined,
      designation,
      website,
      location,
      companyType,
      isApproved: role === "recruiter" ? false : true,
    });

    if (role === "recruiter") {
      return res.status(201).json({ message: "Registration submitted. Await admin approval." });
    }

    const token = generateToken(res, user._id);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};



const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    console.log("🔐 Login attempt for", email);
    console.log("✅ User found:", user);

    console.log("Password match:", await user.matchPassword(password));


    // console.log("User found:", user); 

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    


    if (user.role === "recruiter") {
      console.log("Recruiter approvalStatus:", user.approvalStatus); 
      if (user.approvalStatus === "pending") {
        return res.status(403).json({ message: "Your account is pending admin approval." });
      }
      if (user.approvalStatus === "declined") {
        return res.status(403).json({ message: "Your account has been declined by the admin." });
      }
    }

    const token = generateToken(res, user._id);

    res
      .cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        _id: user._id,
        name: user.name,
        role: user.role,
        token,
      });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
};





const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully." });
};

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({ user });
};




const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update basic info
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Update password if provided
    if (req.body.password) {
      user.password = req.body.password;
    }

    //  Update profilePic if file is uploaded 
    if (req.file && req.file.path) {
      user.profilePic = req.file.path;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profilePic: updatedUser.profilePic,
      },
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ message: "Server error while updating profile." });
  }
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "No user with that email." });

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  const message = `
    <p>Hello ${user.name || "there"},</p>
    <p>You requested a password reset for your HireWave account.</p>
    <p><a href="${resetURL}">Click here to set a new password</a>. This link expires in 10 minutes.</p>
    <p>If you did not request this, please ignore this email.</p>
  `;

  try {
    await sendEmail({ to: user.email, subject: "HireWave Password Reset", html: message });
    res.status(200).json({ message: "Email sent. Please check your inbox." });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    console.error("Email send error:", err);
    res.status(500).json({ message: "Email could not be sent." });
  }
};

const resetPassword = async (req, res) => {
  const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: "Token invalid or expired." });

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  const token = generateToken(res, user._id); // auto‑login after reset
  res.status(200).json({ message: "Password updated.", token });
};


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
};
