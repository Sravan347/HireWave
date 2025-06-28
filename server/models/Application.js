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
  qualification: {
    type: String,
    required: true,
  },
  backlogInfo: {
    hasBacklogs: { type: Boolean, required: true },
    count: { type: Number, default: 0 },
  },

  resumeUrl: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },

  status: {
  type: String,
  enum: ["applied", "shortlisted", "interview", "offered", "rejected", "accepted"],
  default: "applied",
},


  testFileUrl: {
  type: String,
},
answerFileUrl: {
  type: String,
},

interviewDetails: {
  date: Date,
  link: String,
},

feedback: {
  type: String,
  default: "",
},

offerLetterUrl: {
  type: String,
},




});

module.exports = mongoose.model("Application", applicationSchema);
