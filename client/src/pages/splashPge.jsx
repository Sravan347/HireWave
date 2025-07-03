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
          bottom: 60,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <button
          onClick={handleClick}
          title="Click to get started"
          style={{
            display: 'inline-block',
            padding: '6px 18px',
            fontSize: 13,
            fontWeight: 800,
            fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif',
            letterSpacing: 2,
            border: 'none',
            borderRadius: 40,
            background: 'linear-gradient(90deg, #0d47a1 0%, #8e44ad 100%)',
            color: '#fff',
            boxShadow: '0 8px 32px #0d47a155, 0 2px 8px #8e44ad55',
            cursor: 'pointer',
            transition: 'transform 0.15s cubic-bezier(.4,2,.6,1), box-shadow 0.2s',
            textShadow: '0 2px 8px #0008',
            outline: 'none',
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'scale(1.06)';
            e.currentTarget.style.boxShadow = '0 12px 40px #0d47a1aa, 0 4px 16px #8e44ad88';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px #0d47a155, 0 2px 8px #8e44ad55';
          }}
        >
          Get started &nbsp;<span style={{fontSize:12,verticalAlign:'middle'}}>&rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default SplashPage;
