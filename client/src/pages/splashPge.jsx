// src/pages/splashPage.jsx
import React from 'react';
import ThreeScene from '../components/ThreeScene';


import { useNavigate } from 'react-router-dom';

const SplashPage = () => {
  const navigate = useNavigate();

  // On click anywhere, go to landing page
  const handleClick = () => {
    navigate('/landing');
  };

  return (
    <div
      style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}
      title="Click to enter"
    >
      <ThreeScene />
      {/* Optional overlay content */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          width: '100%',
          textAlign: 'center',
          fontSize: 40,
          letterSpacing: 2,
          fontWeight: 800,
          fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif',
          background: 'linear-gradient(90deg, #111 0%, #0d47a1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
          userSelect: 'none',
          cursor: 'pointer',
        }}
        onClick={handleClick}
        title="Click to get started"
      >
        Get started hired&nbsp;<span style={{fontSize:32,verticalAlign:'middle'}}>&rarr;</span>
      </div>
    </div>
  );
};

export default SplashPage;
