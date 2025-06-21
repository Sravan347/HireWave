import React from 'react'
import { Routes, Route } from "react-router-dom";
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'

const App = () => {
  return (
    <div>
      <h1 className='bg-red-900'>hello moto</h1>
      <h1 className='text-green-600'> sravan </h1>
      <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/recruiter/post-job" element={<PostJob />} />
      <Route path="/jobs" element={<JobBoard />} /> */}
    </Routes>
     
    </div>
  )
}

export default App
