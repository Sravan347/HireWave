// backend/utils/resumeProcessor.js
const pdfParse = require('pdf-parse');

async function extractTextFromBuffer(fileBuffer, mimeType) {
  let text = '';
  if (mimeType === 'application/pdf') {
    const data = await pdfParse(fileBuffer);
    text = data.text;
  } else {
    throw new Error('Unsupported file type. Only PDF files are supported.');
  }
  return text;
}

// Only export extractTextFromBuffer. Remove calculateResumeScore if it was here.
module.exports = { extractTextFromBuffer };