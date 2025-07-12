import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import {
  Box,
  Divider,
  useTheme,
} from '@mui/material';

const CandidateDashboard = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#F7F7F7',
        color: '#2D3748',
      }}
    >
      <Sidebar />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Header />
        <Divider sx={{ backgroundColor: '#D6CEFA' }} />

        <Box
          component="main"
          sx={{
            p: 3,
            flex: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default CandidateDashboard;
