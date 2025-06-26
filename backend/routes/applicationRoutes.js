const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Application = require('../models/Application');
const Job = require('../models/Job');
const { extractTextFromBuffer, calculateResumeScore } = require('../utils/resumeProcessor');
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer for in-memory storage (important for Cloudinary and text extraction)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for uploading resume and creating application
router.post('/apply', upload.single('resume'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const { jobId, candidateName, candidateEmail } = req.body;

  if (!jobId || !candidateName || !candidateEmail) {
    return res.status(400).json({ message: 'Missing job ID, candidate name, or email.' });
  }

  try {
    // 1. Extract text from resume buffer
    const resumeText = await extractTextFromBuffer(req.file.buffer, req.file.mimetype);

    // 2. Upload to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
      {
        folder: 'resume-demo', // Cloudinary folder
        resource_type: 'raw' // Important for documents
      }
    );

    // 3. Get job details to retrieve keywords for scoring
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found for scoring.' });
    }

    // 4. Calculate score
    const { score, matchedKeywords } = calculateResumeScore(resumeText, job.requiredSkills || []);

    // 5. Save application details to MongoDB
    const newApplication = new Application({
      job: jobId,
      candidateName,
      candidateEmail,
      resumeUrl: cloudinaryResult.secure_url,
      resumePublicId: cloudinaryResult.public_id,
      resumeText: resumeText,
      score: score,
      matchedKeywords: matchedKeywords,
      status: 'Scored' // Update status once scored
    });
    await newApplication.save();

    res.status(201).json({
      message: 'Application submitted and resume scored successfully!',
      application: newApplication,
      cloudinaryUrl: cloudinaryResult.secure_url
    });

  } catch (error) {
    console.error('Error submitting application or processing resume:', error);
    // Log the full error stack for debugging
    if (error && error.stack) {
      console.error(error.stack);
    }
    res.status(500).json({ 
      message: 'Failed to submit application.', 
      error: error.message,
      stack: error.stack // Return stack for debugging (remove in production)
    });
  }
});

// Get all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find().populate('job', 'title requiredSkills'); // Populate job title and skills
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
});

// Get applications for a specific job
router.get('/job/:jobId', async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId }).populate('job', 'title requiredSkills');
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications for job:', error);
    res.status(500).json({ message: 'Error fetching applications for job', error: error.message });
  }
});


module.exports = router;