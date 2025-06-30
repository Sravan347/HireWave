const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Remote", "Internship", "Contract"],
      required: [true, "Job type is required"],
    },
    salaryRange: {
      type: String, 
      required: [true, "Salary range is required"],
    },
    qualificationsRequired: {
      type: String,
      required: [true, "Qualifications are required"],
    },
    experience: {
      type: String,
      enum: ["Fresher", "1-2 years", "3-5 years", "5+ years"],
      required: [true, "Experience is required"],
    },
    applicationDeadline: {
      type: Date,
      required: [true, "Application deadline is required"],
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
    },
    companyLogo: {
      type: String,
      default: "",
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Recruiter
      required: true,
    },
    numApplicants: {
      type: Number,
      default: 0,
    },
    
    status: {
      type: String,
      enum: ["active", "closed", "draft"],
      default: "active",
    },
    skillsRequired: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
  
);

module.exports = mongoose.model("Job", jobSchema);
