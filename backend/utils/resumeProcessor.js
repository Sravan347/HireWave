const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

async function extractTextFromBuffer(fileBuffer, mimeType) {
  let text = '';
  if (mimeType === 'application/pdf') {
    const data = await pdfParse(fileBuffer);
    text = data.text;
  } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') { // .docx
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    text = result.value;
  } else {
    throw new Error('Unsupported file type. Only PDF and DOCX are supported.');
  }
  return text;
}

// Function to clean and tokenize text for scoring
function cleanAndTokenize(text) {
  return text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').split(/\s+/).filter(word => word.length > 0);
}

// Function to calculate resume score based on job keywords
function calculateResumeScore(resumeText, jobKeywords) {
  const resumeTokens = new Set(cleanAndTokenize(resumeText)); // Use Set for efficient lookup of unique words
  const jobKeywordList = jobKeywords.map(kw => kw.toLowerCase());

  let score = 0;
  let matchedKeywords = new Set();

  for (const keyword of jobKeywordList) {
    // Check if the exact keyword (or a simplified version) is present in the resume tokens
    // For simple demo, we're checking if the word exists.
    // For phrases like "machine learning", you'd need `resumeText.toLowerCase().includes(keyword)`
    // but for this basic example, we treat keywords as individual words.
    if (resumeTokens.has(keyword)) {
        score += 10; // Base points
        matchedKeywords.add(keyword);
    } else if (resumeText.toLowerCase().includes(keyword)) {
        // Catch phrases that might not be individual tokens
        score += 5; // Slightly less points for phrase match if not a direct word
        matchedKeywords.add(keyword);
    }
  }

  return { score, matchedKeywords: Array.from(matchedKeywords) };
}

module.exports = { extractTextFromBuffer, calculateResumeScore };