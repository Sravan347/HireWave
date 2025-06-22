import React from 'react';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="p-10 text-center">
        <h1 className="text-4xl font-bold text-[#2563EB]">Welcome to HireWave</h1>
        <p className="text-gray-600 mt-4">Your AI-powered recruitment assistant</p>
      </div>
    </div>
  );
};

export default LandingPage;
