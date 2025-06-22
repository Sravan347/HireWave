import React from 'react'
import { Routes, Route } from "react-router-dom";
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import PostJob from './pages/recruiter/PostJob'
import JobBoard from './pages/candidate/JobBoard'

const App = () => {
  return (
    <div>
        <Routes>
        <Route path="/" element={<JobBoard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recruiter/post-job" element={<PostJob />} />
        <Route path="/jobs" element={<JobBoard />} />
      </Routes>
    </div>
  )
}

export default App
