// backend/testCloudinaryConnection.js

require('dotenv').config({ path: './.env' }); // Make sure to load your .env file
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary using your environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function verifyCloudinaryConnection() {
  console.log('--- Verifying Cloudinary Connection ---');
  console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
  console.log('API Key:', process.env.CLOUDINARY_API_KEY ? 'Set' : 'NOT SET');
  console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? 'Set' : 'NOT SET');

  // Basic check: Are the credentials actually loaded?
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('ERROR: Cloudinary environment variables are missing. Please check your .env file.');
    return;
  }

  let fullPublicId; // Declare this variable to store the full public ID

  try {
    const dummyText = "Cloudinary connection test: " + new Date().toISOString();
    const dataUri = `data:text/plain;base64,${Buffer.from(dummyText).toString('base64')}`;
    const basePublicId = `cloudinary_connection_test_${Date.now()}`;
    const folderName = 'test-folder'; // Define the folder name

    console.log(`Attempting to upload a dummy file with public_id: ${basePublicId} in folder: ${folderName}`);
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: folderName, // Use the folder name
      public_id: basePublicId,
      resource_type: 'raw'
    });

    fullPublicId = uploadResult.public_id; // Store the full public ID returned by Cloudinary

    console.log('✅ Cloudinary Upload Test Success!');
    console.log('  Secure URL:', uploadResult.secure_url);
    console.log('  Public ID (returned by Cloudinary):', fullPublicId); // Log the full ID
    console.log('  Version ID:', uploadResult.version_id);

    // Attempt to retrieve information about the uploaded file (Admin API call)
    console.log(`Attempting to retrieve details for public_id: ${fullPublicId}`); // Use the fullPublicId
    const resourceDetails = await cloudinary.api.resource(fullPublicId, { resource_type: 'raw' });
    console.log('✅ Cloudinary Resource Retrieval Test Success!');
    console.log('  Bytes:', resourceDetails.bytes);
    console.log('  Format:', resourceDetails.format);

    // Clean up: Delete the dummy file
    console.log(`Attempting to delete dummy file with public_id: ${fullPublicId}`); // Use the fullPublicId
    const deleteResult = await cloudinary.uploader.destroy(fullPublicId, { resource_type: 'raw' });
    console.log('✅ Cloudinary Deletion Test Success!');
    console.log('  Deletion result:', deleteResult);

  } catch (error) {
    console.error('❌ Cloudinary Connection FAILED!');
    console.error('  Error Message:', error.message);
    if (error.error && error.error.message) { // Cloudinary errors often have an 'error' object
      console.error('  Cloudinary API Error:', error.error.message);
    }
    if (error.http_code) {
      console.error('  HTTP Status Code:', error.http_code);
    }

    // Defensive check for error.message being defined before calling .includes()
    const errorMessage = error.message || ''; // Assign empty string if undefined

    // Specific checks for common errors
    if (errorMessage.includes('Authentication required') || error.http_code === 401) {
      console.error('  Reason: Authentication Failed. Your API Key or Secret might be incorrect.');
    } else if (errorMessage.includes('Account not found') || error.http_code === 404 || (error.error && error.error.message && error.error.message.includes('Resource not found'))) {
      console.error('  Reason: Cloud Name might be incorrect or resource not found. Check public_id or folder.');
      // Special note here: If resource not found after a seemingly successful upload,
      // it almost always means the public_id or resource_type for retrieval/deletion was wrong.
      console.error('  If resource not found after upload success, verify the public_id (including folder) and resource_type.');
      console.error('  Attempted Public ID for retrieval/deletion:', fullPublicId); // show what was attempted
    } else if (errorMessage.includes('Network error') || error.code === 'ENOTFOUND') {
      console.error('  Reason: Network connectivity issue or Cloudinary servers unreachable.');
    }
  } finally {
    console.log('--- Cloudinary Connection Check Complete ---');
  }
}

verifyCloudinaryConnection();