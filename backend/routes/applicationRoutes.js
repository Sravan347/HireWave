// backend/routes/applicationRoutes.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Application = require('../models/Application'); // Assuming your Application model is correctly defined
const Job = require('../models/Job');             // Assuming your Job model is correctly defined
const { extractTextFromBuffer } = require('../utils/resumeProcessor'); // Utility for PDF text extraction
const router = express.Router(); // Initialize Express Router

// --- Google Generative AI Import and Configuration ---
const { GoogleGenerativeAI } = require('@google/generative-ai');
// Ensure process.env.GOOGLE_API_KEY matches the name in your .env file
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// --- END Google Generative AI Configuration ---

// Configure Multer for in-memory storage for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Only allow PDF files for resume uploads
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
});

// --- Route to apply for a job (POST request) ---
router.post('/apply', upload.single('resume'), async (req, res) => {
  // Check if a resume file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or file type is not supported. Please upload a PDF.' });
  }

  // Destructure required fields from the request body
  const { jobId, candidateName, candidateEmail } = req.body;

  // Validate required fields
  if (!jobId || !candidateName || !candidateEmail) {
    return res.status(400).json({ message: 'Missing job ID, candidate name, or email.' });
  }

  try {
    let resumeText;
    try {
      // 1. Extract text from resume buffer
      resumeText = await extractTextFromBuffer(req.file.buffer, req.file.mimetype);
      console.log('DEBUG: resumeText length:', resumeText ? resumeText.length : 'undefined');
      if (!resumeText) {
        throw new Error('Resume text extraction returned empty/undefined result.');
      }
    } catch (textExtractionError) {
      console.error('Error during resume text extraction:', textExtractionError);
      // Re-throw with a custom message if extraction fails
      throw new Error(`Resume Text Extraction Failed: ${textExtractionError.message}`);
    }


    let cloudinaryResult;
    try {
      // 2. Upload to Cloudinary
      cloudinaryResult = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
        {
          folder: 'resume-demo', // Specify the folder in your Cloudinary account
          resource_type: 'raw'   // Treat it as a raw file (PDF)
        }
      );
      console.log('DEBUG: Cloudinary Result URL:', cloudinaryResult.secure_url);
      console.log('DEBUG: Cloudinary Public ID:', cloudinaryResult.public_id);
      if (!cloudinaryResult || !cloudinaryResult.public_id) {
        throw new Error('Cloudinary upload returned invalid result or missing public ID.');
      }
    } catch (cloudinaryUploadError) {
      console.error('Error during Cloudinary upload:', cloudinaryUploadError);
      // Re-throw with a custom message if upload fails
      throw new Error(`Cloudinary Upload Failed: ${cloudinaryUploadError.message}`);
    }

    // 3. Fetch job details from the database using the jobId
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found for scoring.' });
    }

    // --- Call Google Gemini API for resume scoring ---
    let score = 0;
    let matchedKeywords = []; // Initialize variables for AI results

    try {
        console.log('Sending resume and job data to Google Gemini for scoring...');
        const jobSkillsString = job.requiredSkills.join(', '); // Convert job skills array to string for the prompt

        // Configure the Gemini model
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash-latest", // Using the updated model name for better compatibility
            generationConfig: {
                temperature: 0.1, // Lower temperature for more factual and less creative responses
                responseMimeType: "application/json", // Crucial for getting a JSON output from Gemini
            },
            // Safety settings to control AI response content (adjust as needed)
            safetySettings: [
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
            ],
        });

        // Construct the prompt for the AI model
        const promptContent = `You are an AI assistant specialized in resume analysis. Your task is to compare a candidate's resume against a job's required skills and provide a compatibility score and a list of clearly matched skills.
        The score should be an integer between 0 and 100, where 100 means perfect fit, based on the presence and relevance of the required skills in the resume.
        The matched skills should be a list of skills from the job's "Required Skills" that are explicitly or clearly implicitly present in the resume. Only list skills that are definitely there.
        Respond ONLY with a JSON object in the format: {"score": <integer_score>, "matched_keywords": ["skill1", "skill2", ...]}.
        If no relevant skills are matched or if the resume is entirely irrelevant to the job, return {"score": 0, "matched_keywords": []}.

        Job Required Skills: ${jobSkillsString}

        Candidate Resume:
        ${resumeText}`;

        // Make the API call to Gemini
        const result = await model.generateContent(promptContent);
        const response = await result.response;
        const rawResponseText = response.text(); // Get the raw text response from Gemini
        console.log("Raw Gemini Response:", rawResponseText); // Log raw response for debugging purposes

        // Parse the JSON response from Gemini
        const parsedResponse = JSON.parse(rawResponseText);
        score = parsedResponse.score || 0; // Set score, default to 0 if not found
        matchedKeywords = parsedResponse.matched_keywords || []; // Set matched keywords, default to empty array

        console.log('Received score from Gemini:', score, 'Matched Keywords:', matchedKeywords);

    } catch (geminiError) {
        console.error('Error calling Google Gemini API:', geminiError);
        // Throw a custom error to be caught by the outer try-catch block for consistent error handling
        throw new Error(`AI Scoring Service Error: ${geminiError.message || "Unknown Gemini error"}`);
    }
    // --- END Google Gemini API Call ---

    // 4. Save the new application details to MongoDB
    // Ensure resumeUrl, resumePublicId, and resumeText are correctly populated before saving
    const newApplication = new Application({
      job: jobId,
      candidateName,
      candidateEmail,
      resumeUrl: cloudinaryResult.secure_url,
      resumePublicId: cloudinaryResult.public_id, // This should now have a value from Cloudinary
      resumeText: resumeText,                     // This should now have a value from PDF extraction
      score: score, // Store the AI-generated score
      matchedKeywords: matchedKeywords, // Store the AI-identified matched keywords
      status: 'Scored' // Set the application status
    });
    await newApplication.save();

    // Respond to the client with success message and application details
    res.status(201).json({
      message: 'Application submitted and resume scored successfully!',
      application: newApplication,
      cloudinaryUrl: cloudinaryResult.secure_url
    });

  } catch (error) {
    console.error('Error submitting application or processing resume:', error);
    // Specific error handling for file type
    if (error.message === 'Only PDF files are allowed!') {
        return res.status(400).json({ message: error.message });
    }
    // Specific error handling for AI scoring issues
    if (error.message.startsWith('AI Scoring Service Error:')) {
        return res.status(500).json({ message: `AI Scoring failed: ${error.message}` });
    }
    // Specific error handling for resume text extraction issues
    if (error.message.startsWith('Resume Text Extraction Failed:')) {
        return res.status(500).json({ message: `Resume processing failed: ${error.message}` });
    }
    // Specific error handling for Cloudinary upload issues
    if (error.message.startsWith('Cloudinary Upload Failed:')) {
        return res.status(500).json({ message: `Resume upload failed: ${error.message}` });
    }
    // General internal server error handling (this will catch the Mongoose validation error if it still occurs)
    res.status(500).json({ message: 'An error occurred while processing your application. Please check server logs for details.', error: error.message });
  }
});


// --- New GET route to fetch all applications ---
// This route responds to GET requests at /api/applications (since server.js maps /api/applications to this router)
router.get('/', async (req, res) => {
  try {
    // Fetch all applications from the database, sorted by creation date (newest first)
    // .populate('job') will fetch the linked job document details from the Job collection
    const applications = await Application.find().sort({ createdAt: -1 }).populate('job');
    res.status(200).json(applications); // Send the fetched applications as JSON
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Failed to fetch applications.', error: error.message });
  }
});


module.exports = router; // Essential: Export the router so it can be used in server.js