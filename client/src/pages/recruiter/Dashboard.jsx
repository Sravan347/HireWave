import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import your API service here
// import api from "../../services/api";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Placeholder recruiter name, replace with actual user data
  const recruiterName = "Recruiter";

  useEffect(() => {
    // Fetch posted jobs and applications (replace with real API calls)
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // const jobsRes = await api.get("/recruiter/jobs");
        // const appsRes = await api.get("/recruiter/applications");
        // setJobs(jobsRes.data);
        // setApplications(appsRes.data);
        setJobs([
          { id: 1, title: "Frontend Developer", postedOn: "2025-06-01" },
          { id: 2, title: "Backend Developer", postedOn: "2025-06-10" },
        ]);
        setApplications([
          { id: 1, jobTitle: "Frontend Developer", candidate: "Alice", status: "Pending" },
          { id: 2, jobTitle: "Backend Developer", candidate: "Bob", status: "Reviewed" },
        ]);
      } catch (err) {
        // handle error
      }
      setLoading(false);
    };
    fetchDashboardData();
  }, []);

  const handlePostJob = () => {
    navigate("/recruiter/post-job");
  };

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/recruiter/login");
  };

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome, {recruiterName}!</h2>
      <button onClick={handleLogout} style={{ float: "right" }}>Logout</button>
      <h3>Your Posted Jobs</h3>
      <button onClick={handlePostJob}>Post New Job</button>
      <ul>
        {jobs.length === 0 ? (
          <li>No jobs posted yet.</li>
        ) : (
          jobs.map((job) => (
            <li key={job.id}>
              {job.title} <span style={{ color: "#888" }}>(Posted on {job.postedOn})</span>
            </li>
          ))
        )}
      </ul>
      <h3>Applications Received</h3>
      <ul>
        {applications.length === 0 ? (
          <li>No applications yet.</li>
        ) : (
          applications.map((app) => (
            <li key={app.id}>
              {app.candidate} applied for {app.jobTitle} - <b>{app.status}</b>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
