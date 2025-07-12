import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "./mui/Card";
import { Button } from "./mui/Button";
import { Typography, Chip, Box } from "@mui/material";


const JobCard = ({ job }) => {
  return (
    <Card
      sx={{
        backgroundColor: 'white',
        border: '1px solid #E6E9F5',
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardHeader sx={{ pb: 1 }}>
        <Typography
          variant="h6"
          sx={{
            color: '#2563EB',
            fontWeight: 600,
            fontSize: '1.25rem',
            mb: 0.5,
          }}
        >
          {job.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#6B7280',
            fontSize: '0.875rem',
          }}
        >
          {job.company}
        </Typography>
      </CardHeader>

      <CardContent sx={{ pt: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography
            variant="body2"
            sx={{
              color: '#374151',
              fontSize: '0.875rem',
            }}
          >
            {job.location}
          </Typography>
          
          <Chip
            label={job.jobType}
            variant="outlined"
            size="small"
            sx={{
              width: 'fit-content',
              backgroundColor: '#D6CEFA',
              color: '#0A1A4A',
              border: '1px solid #B5A9FF',
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          />

          <Box sx={{ mt: 2 }}>
            <Button
              component={Link}
              to={`/job/${job._id}`}
              variant="contained"
              fullWidth
              sx={{
                background: 'linear-gradient(135deg, #2563EB 0%, #1A3A8F 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1A3A8F 0%, #1E3A8A 100%)',
                },
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              View Details
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;
