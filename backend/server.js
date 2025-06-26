// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

// --- ADD THESE TWO LINES ---
const cloudinary = require('cloudinary').v2; // Import Cloudinary SDK
dotenv.config(); // Load environment variables - MUST BE BEFORE CLOUDINARY CONFIG

// Configure Cloudinary globally
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
// --- END ADDITIONS ---


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