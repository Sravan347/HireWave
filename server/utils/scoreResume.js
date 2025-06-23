// utils/scoreResume.js
const scoreResume = (resumeText, jobKeywords) => {
  const matched = jobKeywords.filter(kw =>
    resumeText.toLowerCase().includes(kw.toLowerCase())
  );
  return Math.round((matched.length / jobKeywords.length) * 100);
};

module.exports = scoreResume;
