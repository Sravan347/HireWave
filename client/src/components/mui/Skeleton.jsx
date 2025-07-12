import React from 'react';
import { Skeleton as MuiSkeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledSkeleton = styled(MuiSkeleton)(({ theme }) => ({
  borderRadius: 8,
  backgroundColor: 'rgba(200, 200, 200, 0.3)',
  '&::after': {
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
  },
}));

const Skeleton = ({ className, ...props }) => {
  return (
    <StyledSkeleton 
      animation="wave"
      className={className}
      {...props}
    />
  );
};

export { Skeleton };
