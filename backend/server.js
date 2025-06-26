// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // <-- Import dotenv
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

// --- CRITICAL: LOAD ENVIRONMENT VARIABLES FIRST ---
dotenv.config(); // This must be at the very top, before any other module potentially uses process.env

// Configure Cloudinary globally
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// --- IMPORT ROUTES AFTER DOTENV AND CLOUDINARY CONFIG ---
// The applicationRoutes module will now be able to access process.env.OPENAI_API_KEY
// because dotenv.config() has already run.
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// Basic health check route
app.get('/', (req, res) => {
  res.send('Resume Scoring Backend is Running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});