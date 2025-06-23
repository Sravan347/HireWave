const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
    score: {
    type: Number,
    default: 0
    },
   
  status: {
    type: String,
    enum: ["in progress", "shortlisted", "rejected", "hired"],
    default: "in progress",
  },
  
});

module.exports = mongoose.model("Application", applicationSchema);
