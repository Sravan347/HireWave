import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(MuiButton)(({ theme, variant, color }) => ({
  borderRadius: '9999px',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  ...(variant === 'contained' && color === 'primary' && {
    background: 'linear-gradient(135deg, #7F5AF0 0%, #5A3DF0 100%)',
    '&:hover': {
      background: 'linear-gradient(135deg, #5A3DF0 0%, #4A2DD0 100%)',
    },
  }),
  ...(variant === 'contained' && color === 'secondary' && {
    background: 'linear-gradient(135deg, #6d9ee6 0%, #3a7bd5 100%)',
    '&:hover': {
      background: 'linear-gradient(135deg, #5A8BC0 0%, #2A6BB0 100%)',
    },
  }),
}));

const Button = ({ children, variant = 'contained', color = 'primary', ...props }) => {
  return (
    <StyledButton variant={variant} color={color} {...props}>
      {children}
    </StyledButton>
  );
};

export { Button };
