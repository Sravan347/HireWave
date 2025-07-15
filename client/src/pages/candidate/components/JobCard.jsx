import React from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';

export default function JobCard({ job, onClick, isApplied }) {
  // Debug: Let's see what data we're getting
  console.log('JobCard received job data:', job);
  console.log('Job title:', job?.title);
  console.log('Company logo:', job?.postedBy?.logo || job?.companyLogo);
  console.log('Company name:', job?.companyName);
  console.log('JobCard component is rendering...');
  
  // Extract logo URL
  const logoUrl = job?.companyLogo || job?.postedBy?.logo;
  console.log('Final logo URL:', logoUrl);
  
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: '1px solid #E5E7EB',
        opacity: isApplied ? 0.7 : 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-4px)',
          borderColor: isApplied ? '#E5E7EB' : '#1A3A8F',
        }
      }}
    >
      <Box sx={{ pb: 1, px: 2, pt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, flex: 1, minWidth: 0 }}>
            {/* Company Logo */}
            <Box
              sx={{
                height: 48,
                width: 48,
                borderRadius: '50%',
                backgroundColor: '#F3F4F6',
                border: '2px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                overflow: 'hidden'
              }}
            >
              {logoUrl ? (
                <Box
                  component="img"
                  src={logoUrl}
                  alt="Company Logo"
                  sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    console.log('Image failed to load:', logoUrl);
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#6B7280' }}>
                  {job?.companyName?.charAt(0)?.toUpperCase() || 'C'}
                </Typography>
              )}
            </Box>
            
            {/* Job Title and Company Name */}
            <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  fontSize: '1.125rem',
                  color: '#0A1A4A',
                  lineHeight: 1.3,
                  mb: 0.5,
                  display: 'block',
                  wordBreak: 'break-word',
                  overflow: 'visible',
                  whiteSpace: 'normal',
                  '&:hover': { color: '#1A3A8F' }
                }}
              >
                {job?.title || 'No Title Available'}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#6B7280',
                  fontSize: '0.875rem',
                  lineHeight: 1.3,
                  fontWeight: 500
                }}
              >
                {job?.companyName || 'Company Name Not Available'}
              </Typography>
            </Box>
          </Box>

          {isApplied && (
            <Chip 
              label="✅ Applied"
              size="small"
              sx={{
                backgroundColor: '#f0fdf4',
                color: '#15803d',
                border: '1px solid #bbf7d0',
                fontSize: '0.75rem',
                flexShrink: 0
              }}
            />
          )}
        </Box>
      </Box>

      <CardContent sx={{ fontSize: '0.875rem', color: '#2D3748', flexGrow: 1, pt: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#505050', mb: 1 }}>
          <MapPin size={14} /> 
          <Typography variant="body2">
            {job?.location || 'Location not specified'} • {job?.jobType || 'Job type not specified'}
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <strong>Exp:</strong> {job?.experience || 'Not specified'}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', color: '#059669', mb: 1 }}>
          <Briefcase size={14} />
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            ₹ {job?.salaryRange || 'Not disclosed'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', color: '#F4A261' }}>
          <Calendar size={14} />
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            Last date to apply: {
              job?.applicationDeadline 
                ? format(new Date(job.applicationDeadline), "dd-MM-yyyy")
                : 'Not specified'
            }
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
