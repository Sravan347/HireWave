const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }, // Link to the job
  candidateName: { type: String, required: true }, // Simple placeholder for candidate for this demo
  candidateEmail: { type: String, required: true },
  resumeUrl: { type: String, required: true }, // Cloudinary URL
  resumePublicId: { type: String, required: true }, // Cloudinary public ID for potential deletion
  resumeText: { type: String, required: true }, // Extracted text for scoring
  score: { type: Number, default: 0 }, // The calculated score
  matchedKeywords: [{ type: String }], // Keywords that matched
  status: {
    type: String,
    enum: ['Applied', 'Reviewed', 'Scored', 'Rejected'], // Simplified stages for demo
    default: 'Applied'
  },
  appliedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);