const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

module.exports = async function scoreResume(resumeText = "", jobKeywords = [], jobDescription = "") {
  const prompt = `
You are a professional recruiter AI. Given the following job description and candidate resume, score how well the resume matches the job (0-100, where 100 is a perfect match). Only return the score as a number.

Job Description:
${jobDescription}

Resume:
${resumeText}
`;

  try {
    const response = await axios.post(
      GEMINI_API_URL,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { 'Content-Type': 'application/json', 'X-goog-api-key': GEMINI_API_KEY } }
    );

    // Extract the score from Gemini's response
    const text = response.data.candidates[0].content.parts[0].text;
    const score = parseInt(text.match(/\d+/)?.[0] || '0', 10);
    return Math.max(0, Math.min(score, 100)); // Clamp between 0-100
  } catch (err) {
    console.error('Gemini API error:', err.response?.data || err.message);
    return 0; // Fallback score
  }
};