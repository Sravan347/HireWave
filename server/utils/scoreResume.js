/**
 * Basic keyword–overlap scoring.
 * @param {string} resumeText  Raw text extracted from the PDF
 * @param {string[]} jobKeywords  Array of lowercase job keywords
 * @returns {number} 0‑100 (%) match score
 */
module.exports = function scoreResume(resumeText = "", jobKeywords = []) {
  if (!jobKeywords.length) return 0;

  const resumeWords = (resumeText.toLowerCase().match(/\b\w+\b/g) || []).filter(
    (w) => w.length > 3
  );
  const resumeSet = new Set(resumeWords);

  const hits = jobKeywords.filter((kw) => resumeSet.has(kw)).length;
  return Math.round((hits / jobKeywords.length) * 100);
};
