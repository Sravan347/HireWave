// /pages/candidate/CandidateDashboard.jsx
import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

const CandidateDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CandidateDashboard;
