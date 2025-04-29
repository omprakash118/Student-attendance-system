const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load env variables

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Uploads a local file to Cloudinary and deletes it locally.
 * @param {string} localFilePath - The full local path to the file.
 * @returns {object|null} - The uploaded file's Cloudinary response or null if failed.
 */
const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const absolutePath = path.resolve(localFilePath); // Ensure absolute path
    const result = await cloudinary.uploader.upload(absolutePath, {
      resource_type: "auto"
    });

    fs.unlinkSync(absolutePath); // Remove local file
    return result;
  } catch (error) {
    console.error("❌ Error uploading file to Cloudinary:", error.message);

    // Cleanup local file if upload failed
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

module.exports = uploadCloudinary;
