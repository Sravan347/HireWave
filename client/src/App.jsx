import React from 'react';
import { Routes, Route } from "react-router-dom"; // Ensure BrowserRouter is somewhere wrapping App if not in main.jsx

// Pages Imports
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import PostJob from './pages/recruiter/PostJob';
import JobBoard from './pages/candidate/JobBoard';
import LandingPage from './pages/LandingPage';
import RecruiterLogin from './pages/recruiter/RecruiterLogin';
import RecruiterRegister from './pages/recruiter/RecruiterRegister';
import AdminDashboard from "./pages/admin/AdminDashboard";
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';




import Footer from './components/Footer';
import RecruiterDashboard from './pages/recruiter/Dashboard'; // Renamed import 'Dashboard' to 'RecruiterDashboard' for clarity here
import PostedJobs from "./pages/recruiter/PostedJobs";
import ViewApplicants from "./pages/recruiter/ViewApplicants";

import CandidateDashboard from "./pages/candidate/CandidateDashboard";

import MyApplications from "./pages/candidate/MyApplications";
import MyProfile from "./pages/candidate/MyProfile";
import Offers from "./pages/candidate/Offers";
// import RecruiterProfilePage from "./pages/candidate/RecruiterProfilePage"; 


const App = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Recruiter Authentication & Job Posting */}
        <Route path="/recruiter/login" element={<RecruiterLogin />} />
        <Route path="/recruiter/register" element={<RecruiterRegister />} />
        <Route path="/recruiter/post-job" element={<PostJob />} />

        {/* Admin Dashboard */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Recruiter Dashboard & Job Management */}
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/jobs" element={<PostedJobs />} />
        <Route path="/recruiter/jobs/:jobId/applicants" element={<ViewApplicants />} />

        {/* Candidate Dashboard with nested routes */}
        <Route path="/candidate/dashboard" element={<CandidateDashboard />}>
          <Route index element={<JobBoard />} /> {/* Default child route for /candidate/dashboard */}
          <Route path="applications" element={<MyApplications />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="offers" element={<Offers />} />
        </Route>

        
        

        {/* Job Board */}
        <Route path="/jobs" element={<JobBoard />} />
      </Routes>
    </>
  );
};

export default App;