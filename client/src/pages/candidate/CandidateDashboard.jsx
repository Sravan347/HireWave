import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const CandidateDashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#F7F7F7] text-[#2D3748]">
      <Sidebar />
      
      <div className="flex flex-col flex-1">
        <Header />
        <Separator className="bg-[#D6CEFA]" />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CandidateDashboard;
