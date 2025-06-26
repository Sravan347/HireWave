const User = require("../models/User");
const generateToken = require("../utils/generateToken");


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


    // console.log("User found:", user); // 🔍 Add this to see what you're working with

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    


    if (user.role === "recruiter") {
      console.log("Recruiter approvalStatus:", user.approvalStatus); // 🔍 log this too
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


const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ message: "Server error while updating profile." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
};
