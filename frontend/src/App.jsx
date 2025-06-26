// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Make sure this CSS file exists or create it

const API_URL = 'http://localhost:5000/api'; // Your backend API URL

function App() {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    requiredSkills: '' // Comma-separated string for input
  });
  const [selectedJobId, setSelectedJobId] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [message, setMessage] = useState('');
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchJobs();
    fetchAllApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_URL}/jobs`);
      setJobs(response.data);
      if (response.data.length > 0) {
        setSelectedJobId(response.data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setMessage('Failed to fetch jobs.');
    }
  };

  const fetchAllApplications = async () => {
    try {
      const response = await axios.get(`${API_URL}/applications`);
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setMessage('Failed to fetch applications.');
    }
  };

  const handleJobInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = newJob.requiredSkills.split(',').map(s => s.trim()).filter(s => s.length > 0);
      const jobData = { ...newJob, requiredSkills: skillsArray };

      const response = await axios.post(`${API_URL}/jobs`, jobData);
      setMessage(`Job "${response.data.title}" created successfully!`);
      setNewJob({ title: '', description: '', requiredSkills: '' });
      fetchJobs();
    } catch (error) {
      console.error('Error creating job:', error);
      setMessage('Failed to create job.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      setMessage('Only PDF files are allowed!');
      setResumeFile(null);
      e.target.value = null;
      return;
    }
    setResumeFile(file);
    setMessage('');
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!selectedJobId || !candidateName || !candidateEmail || !resumeFile) {
      setMessage('Please fill all application fields and select a resume.');
      return;
    }

    if (resumeFile.type !== 'application/pdf') {
        setMessage('Only PDF files are allowed! Please select a PDF resume.');
        return;
    }

    const formData = new FormData();
    formData.append('jobId', selectedJobId);
    formData.append('candidateName', candidateName);
    formData.append('candidateEmail', candidateEmail);
    formData.append('resume', resumeFile);

    try {
      setMessage('Submitting application and scoring resume...');
      const response = await axios.post(`${API_URL}/applications/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(`Application for "${response.data.application.candidateName}" submitted. Score: ${response.data.application.score}`);
      setCandidateName('');
      setCandidateEmail('');
      setResumeFile(null);
      document.getElementById('resumeFileInput').value = null;
      fetchAllApplications();
    } catch (error) {
      console.error('Error submitting application:', error.response?.data || error);
      setMessage(`Application failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="App">
      <h1>HireWave AI Demo (Vite + React)</h1>

      <div className="section">
        <h2>1. Create a Job Posting</h2>
        <form onSubmit={handleCreateJob}>
          <input
            type="text"
            name="title"
            placeholder="Job Title (e.g., Senior React Developer)"
            value={newJob.title}
            onChange={handleJobInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={newJob.description}
            onChange={handleJobInputChange}
            rows="4"
            required
          ></textarea>
          <input
            type="text"
            name="requiredSkills"
            placeholder="Required Skills (comma-separated, e.g., JavaScript, React, Node.js, MongoDB)"
            value={newJob.requiredSkills}
            onChange={handleJobInputChange}
            required
          />
          <button type="submit">Create Job</button>
        </form>
      </div>

      <div className="section">
        <h2>2. Apply for a Job</h2>
        {jobs.length === 0 ? (
          <p>No jobs available. Please create one first.</p>
        ) : (
          <form onSubmit={handleApply}>
            <select value={selectedJobId} onChange={(e) => setSelectedJobId(e.target.value)} required>
              <option value="">Select a Job</option>
              {jobs.map(job => (
                <option key={job._id} value={job._id}>
                  {job.title}
                  {job.requiredSkills.length > 0 && ` (Skills: ${job.requiredSkills.join(', ')})`}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Your Full Name"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={candidateEmail}
              onChange={(e) => setCandidateEmail(e.target.value)}
              required
            />
            <input
              type="file"
              id="resumeFileInput"
              onChange={handleFileChange}
              accept=".pdf"
              required
            />
            <button type="submit" disabled={!resumeFile || !selectedJobId}>Apply</button>
          </form>
        )}
      </div>

      {message && <p className="message">{message}</p>}

      <div className="section">
        <h2>3. All Applications</h2>
        {applications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          <div className="applications-grid">
            {applications.map(app => (
              <div key={app._id} className="application-card">
                <h3>{app.candidateName}</h3>
                <p><strong>Job:</strong> {app.job?.title || 'N/A'}</p>
                <p><strong>Email:</strong> {app.candidateEmail}</p>
                <p><strong>Resume Score:</strong> <span className="score">{app.score}</span></p>
                {app.matchedKeywords && app.matchedKeywords.length > 0 && (
                  <p><strong>Matched Keywords:</strong> {app.matchedKeywords.join(', ')}</p>
                )}
                <p><strong>Status:</strong> {app.status}</p>
                <p><strong>Resume:</strong> <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a></p>
                {app.job?.requiredSkills && app.job.requiredSkills.length > 0 && (
                  <p className="job-skills">Job Skills: {app.job.requiredSkills.join(', ')}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;