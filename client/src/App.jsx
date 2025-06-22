import React from 'react';
import { Routes, Route } from "react-router-dom";
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import PostJob from './pages/recruiter/PostJob';
import JobBoard from './pages/candidate/JobBoard';
import LandingPage from './pages/LandingPage';
import RecruiterLogin from './pages/recruiter/RecruiterLogin';
import RecruiterRegister from './pages/recruiter/RecruiterRegister';
import AdminDashboard from "./pages/admin/AdminDashboard";

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
      <Route path="/jobs" element={<JobBoard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      
    </Routes>
  );
};

export default App;
