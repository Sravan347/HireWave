const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto"); // ✅ built-in, don't install

const roles = ["candidate", "recruiter", "admin"];

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: roles,
      default: "candidate",
    },

    // 🎓 Candidate Specific Fields
    qualification: {
      type: String,
      enum: ["PG", "UG", "Diploma", "Secondary Education"],
      required: function () {
        return this.role === "candidate";
      },
    },
    mobile: {
      type: String,
      validate: {
        validator: function (v) {
          return this.role !== "candidate" || /^[0-9]{10}$/.test(v);
        },
        message: "Mobile number must be 10 digits.",
      },
    },
    age: {
      type: Number,
      min: [18, "Age must be at least 18"],
      max: [60, "Age must be under 60"],
      required: function () {
        return this.role === "candidate";
      },
    },
    place: {
      type: String,
      required: function () {
        return this.role === "candidate";
      },
    },
    experience: {
      type: String,
      enum: ["Fresher", "Experienced"],
      required: function () {
        return this.role === "candidate";
      },
    },
    profilePic: {
      type: String,
    },

    // 🧑‍💼 Recruiter Specific Fields
    companyName: {
      type: String,
      required: function () {
        return this.role === "recruiter";
      },
    },
    gstNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return this.role !== "recruiter" || /^[0-9A-Z]{15}$/.test(v);
        },
        message: "GST Number must be 15 alphanumeric characters.",
      },
    },
    mobileRecruiter: {
      type: String,
      validate: {
        validator: function (v) {
          return this.role !== "recruiter" || /^[0-9]{10}$/.test(v);
        },
        message: "Recruiter mobile number must be 10 digits.",
      },
    },
    designation: String,
    website: String,
    location: String,
    companyType: String,

    // Shared
    resumeUrl: String,

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: function () {
        return this.role === "recruiter" ? "pending" : undefined;
      },
    },

    // 🔐 Password Reset Fields
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// 🔒 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔑 Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🔐 Create secure password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex"); // plain token for email

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex"); // hashed and saved in DB

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken; // send this via email
};

module.exports = mongoose.model("User", userSchema);
