// const User = require('../models/User')
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const getDataUri = require("../utils/datauri");
// const cloudinary = require("../utils/cloudinary");


// const register = async (req, res) => {
//   try {
//     const { name, email, phoneNumber, password, role } = req.body;

//     // ✅ Only required fields checked
//     if (!name || !email || !password || !role) {
//       return res.status(400).json({
//         message: "Required fields are missing",
//         success: false,
//       });
//     }

//     // ✅ Check for existing user before upload
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         message: "User already exists with this email.",
//         success: false,
//       });
//     }

//     // ✅ Handle file only if uploaded
//     let profilePhotoUrl = "";
//     if (req.file) {
//       const fileUri = getDataUri(req.file);
//       const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//       profilePhotoUrl = cloudResponse.secure_url;
//     }

//     // ✅ Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // ✅ Create user object
//     const newUser = {
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       profile: {
//         profilePhoto: profilePhotoUrl,
//       },
//     };

//     // Optional field: phone number
//     if (phoneNumber) {
//       newUser.phoneNumber = phoneNumber;
//     }

//     // ✅ Save user
//     await User.create(newUser);

//     return res.status(201).json({
//       message: "Account created successfully.",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       success: false,
//     });
//   }
// };

// // Login
// const login = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     if (!email || !password || !role) {
//       return res.status(400).json({
//         message: "Something is missing",
//         success: false,
//       });
//     }

//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({
//         message: "Incorrect email or password.",
//         success: false,
//       });
//     }

//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(400).json({
//         message: "Incorrect email or password.",
//         success: false,
//       });
//     }

//     if (role !== user.role) {
//       return res.status(400).json({
//         message: "Account doesn't exist with current role.",
//         success: false,
//       });
//     }

//     const tokenData = {
//       userId: user._id,
//     };

//     const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     user = {
//       _id: user._id,
//       fullname: user.name,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       profile: user.profile,
//     };

//     return res
//       .status(200)
//       .cookie("token", token, {
//         maxAge: 1 * 24 * 60 * 60 * 1000,
//         httpOnly: true,
//         sameSite: "strict",
//       })
//       .json({
//         message: `Welcome back ${user.fullname}`,
//         user,
//         token,
//         success: true,
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// // Logout
// const logout = async (req, res) => {
//   try {
//     return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//       message: "Logged out successfully.",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// // Update Profile
// const updateProfile = async (req, res) => {
//   try {
//     const { name, email, phoneNumber, bio, skills, education } = req.body;
//     const file = req.file;

//     let cloudResponse;
//     if (file) {
//       const fileUri = getDataUri(file);
//       cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//     }

//     let skillsArray;
//     if (skills) {
//       skillsArray = skills
//         .split(",")
//         .map((skill) => skill.trim())
//         .filter(Boolean);
//     }

//     let educationArray;
//     if (education) {
//       educationArray = education
//         .split(",")
//         .map((item) => item.trim())
//         .filter(Boolean);
//     }

//     const userId = req.id;
//     let user = await User.findById(userId);

//     if (!user) {
//       return res.status(400).json({ message: "User not found.", success: false });
//     }

//     if (name) user.name = name;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (bio) user.profile.bio = bio;
//     if (skills) user.profile.skills = skillsArray;
//     if (education) user.profile.education = educationArray;

//     if (cloudResponse) {
//       user.profile.resume = cloudResponse.secure_url;
//       user.profile.resumeOriginalName = file.originalname;
//     }

//     await user.save();

//     const updatedUser = {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       profile: user.profile,
//     };

//     return res.status(200).json({
//       message: "Profile updated successfully.",
//       user: updatedUser,
//       success: true,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Something went wrong while updating the profile.",
//       success: false,
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   register,
//   login,
//   logout,
//   updateProfile,
// };


const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudinary");

// ===================== REGISTER =====================
const register = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Required fields are missing",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    let profilePhotoUrl = "";
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudResponse.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phoneNumber: phoneNumber || "",
      profile: {
        profilePhoto: profilePhotoUrl,
      },
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const user = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      role: newUser.role,
      profile: newUser.profile,
    };

    return res
      .status(201)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Account created successfully. Welcome, ${user.name}`,
        user,
        token,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// ===================== LOGIN =====================
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with the current role.",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.name}`,
        user: userData,
        token,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Login failed. Try again later.",
      success: false,
    });
  }
};

// ===================== LOGOUT =====================
const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({
        message: "Logged out successfully.",
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Logout failed.",
      success: false,
    });
  }
};

// ===================== UPDATE PROFILE =====================
const updateProfile = async (req, res) => {
  try {
    const { name, email, phoneNumber, bio, skills, education } = req.body;
    const file = req.file;

    let cloudResponse;
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    const skillsArray = skills
      ? skills.split(",").map((s) => s.trim()).filter(Boolean)
      : undefined;

    const educationArray = education
      ? education.split(",").map((e) => e.trim()).filter(Boolean)
      : undefined;

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skillsArray) user.profile.skills = skillsArray;
    if (educationArray) user.profile.education = educationArray;

    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    const updatedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while updating the profile.",
      success: false,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  updateProfile,
};
