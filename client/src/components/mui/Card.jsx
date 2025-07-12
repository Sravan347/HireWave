import React from 'react';
import { Card as MuiCard, CardContent as MuiCardContent, CardHeader as MuiCardHeader, CardActions as MuiCardActions } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(MuiCard)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '0 8px',
  },
}));

const Card = ({ children, ...props }) => {
  return (
    <StyledCard {...props}>
      {children}
    </StyledCard>
  );
};

const CardHeader = ({ children, ...props }) => {
  return (
    <MuiCardHeader {...props}>
      {children}
    </MuiCardHeader>
  );
};

const CardContent = ({ children, ...props }) => {
  return (
    <MuiCardContent {...props}>
      {children}
    </MuiCardContent>
  );
};

const CardActions = ({ children, ...props }) => {
  return (
    <MuiCardActions {...props}>
      {children}
    </MuiCardActions>
  );
};

export { Card, CardHeader, CardContent, CardActions };
