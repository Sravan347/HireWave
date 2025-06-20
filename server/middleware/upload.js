const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require('../utils/cloudinary');

// Configure cloudinary storage for resumes
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hirewave/resumes",
    resource_type: "raw", // important for non-images (PDF, DOCX)
    allowed_formats: ["pdf", "doc", "docx"],
  },
});

const upload = multer({ storage });

module.exports = upload;
