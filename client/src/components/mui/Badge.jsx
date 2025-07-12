import React from 'react';
import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledChip = styled(Chip)(({ theme, variant }) => ({
  fontWeight: 500,
  fontSize: '0.75rem',
  height: 24,
  ...(variant === 'outline' && {
    backgroundColor: '#D6CEFA',
    color: '#0A1A4A',
    border: '1px solid #B5A9FF',
  }),
  ...(variant === 'default' && {
    backgroundColor: '#7F5AF0',
    color: 'white',
  }),
}));

const Badge = ({ children, variant = 'default', ...props }) => {
  return (
    <StyledChip
      label={children}
      variant={variant === 'outline' ? 'outlined' : 'filled'}
      size="small"
      {...props}
    />
  );
};

export { Badge };
