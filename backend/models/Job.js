const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // Keywords for scoring - recruiter would input these
  requiredSkills: [{ type: String, trim: true }],
  location: { type: String, default: 'Remote' },
  salaryRange: { type: String, default: 'Competitive' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);