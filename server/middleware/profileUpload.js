const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

// Configure Cloudinary storage for profile pictures
const profilePicStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hirewave/profilePics",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: (req, file) => `profile-${Date.now()}`,
  },
});

const profilePicUpload = multer({ storage: profilePicStorage });

module.exports = profilePicUpload;
