import React from 'react';
import { Routes, Route } from "react-router-dom";
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import PostJob from './pages/recruiter/PostJob';

import LandingPage from './pages/LandingPage';
import RecruiterLogin from './pages/recruiter/RecruiterLogin';
import RecruiterRegister from './pages/recruiter/RecruiterRegister';
import AdminDashboard from "./pages/admin/AdminDashboard";
import Dashboard from './pages/recruiter/Dashboard';

import PostedJobs from "./pages/recruiter/PostedJobs";
import ViewApplicants from "./pages/recruiter/ViewApplicants";



import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import JobBoard from './pages/candidate/JobBoard';
import MyApplications from "./pages/candidate/MyApplications";
import MyProfile from "./pages/candidate/MyProfile";
import Offers from "./pages/candidate/Offers";





<div>
  <h1 className='text-red'></h1>
</div>

const App = () => {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recruiter/post-job" element={<PostJob />} />
      <Route path="/recruiter/login" element={<RecruiterLogin />} />
      <Route path="/recruiter/register" element={<RecruiterRegister />} />
      {/* <Route path="/jobs" element={<JobBoard />} /> */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/recruiter/dashboard" element={<Dashboard />} />
      <Route path="/recruiter/jobs" element={<PostedJobs />} />
      <Route path="/recruiter/jobs/:jobId/applicants" element={<ViewApplicants />} />



      {/* ✅ Candidate Dashboard with nested routes */}
      <Route path="/candidate/dashboard" element={<CandidateDashboard />}>
        <Route index element={<JobBoard />} />
        <Route path="applications" element={<MyApplications />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="offers" element={<Offers />} />
      </Route>

      

        
      
    </Routes>
  );
};

export default App;
