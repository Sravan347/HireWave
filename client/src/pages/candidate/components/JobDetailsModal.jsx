import React, { useState } from "react";
import API from "../../../services/api";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  FormLabel,
  Divider,
  Paper
} from '@mui/material';
import { X } from 'lucide-react';

export default function JobDetailsModal({ job, isApplied, onClose }) {
  const [resume, setResume] = useState(null);
  const [qualification, setQualification] = useState("");
  const [backlog, setBacklog] = useState("");

  const handleApply = async () => {
    if (!qualification || !resume) {
      return toast.error("Please add qualification and upload resume");
    }

    const data = new FormData();
    data.append("qualification", qualification);
    data.append("hasBacklogs", backlog > 0 ? "true" : "false");
    data.append("backlogCount", backlog);
    data.append("resume", resume);

    try {
      await API.post(`/applications/apply/${job._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Application submitted!");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Application failed.");
    }
  };

  return (
    <Dialog 
      open 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          maxHeight: '90vh',
          backgroundColor: 'white',
          color: '#2D3748'
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          color: '#0A1A4A',
          fontSize: '1.5rem',
          fontWeight: 600
        }}
      >
        {job.companyName} - {job.title}
        <IconButton
          onClick={onClose}
          sx={{ 
            color: '#7F5AF0',
            '&:hover': { color: '#5A3DF0' }
          }}
        >
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ maxHeight: '60vh', overflowY: 'auto', pr: 1 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {job.description}
            </Typography>
            
            <Box sx={{ display: 'grid', gap: 1.5, mb: 3 }}>
              <Typography><strong>Salary Range:</strong> {job.salaryRange}</Typography>
              <Typography><strong>Location:</strong> {job.location}</Typography>
              <Typography><strong>Qualification:</strong> {job.qualificationsRequired}</Typography>
              <Typography><strong>Experience:</strong> {job.experience}</Typography>
              <Typography><strong>Job Type:</strong> {job.jobType}</Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'grid', gap: 3 }}>
              <Box>
                <FormLabel 
                  htmlFor="qualification"
                  sx={{ 
                    display: 'block', 
                    mb: 1, 
                    fontWeight: 500,
                    color: '#374151'
                  }}
                >
                  Highest Qualification
                </FormLabel>
                <TextField
                  id="qualification"
                  placeholder="e.g., BTech, MCA"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Box>
              
              <Box>
                <FormLabel 
                  htmlFor="backlog"
                  sx={{ 
                    display: 'block', 
                    mb: 1, 
                    fontWeight: 500,
                    color: '#374151'
                  }}
                >
                  Backlogs
                </FormLabel>
                <TextField
                  id="backlog"
                  type="number"
                  placeholder="Number of backlogs"
                  value={backlog}
                  onChange={(e) => setBacklog(e.target.value)}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Box>
              
              <Box>
                <FormLabel 
                  htmlFor="resume"
                  sx={{ 
                    display: 'block', 
                    mb: 1, 
                    fontWeight: 500,
                    color: '#374151'
                  }}
                >
                  Upload Resume
                </FormLabel>
                <TextField
                  id="resume"
                  type="file"
                  inputProps={{ accept: ".pdf,.doc,.docx" }}
                  onChange={(e) => setResume(e.target.files[0])}
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Box>
            </Box>

            {!isApplied ? (
              <Button
                onClick={handleApply}
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: '#1A3A8F',
                  '&:hover': { backgroundColor: '#0A1A4A' },
                  color: 'white',
                  py: 1.5,
                  fontWeight: 600
                }}
              >
                Apply Now
              </Button>
            ) : (
              <Typography 
                sx={{ 
                  color: '#059669', 
                  textAlign: 'center', 
                  fontWeight: 500,
                  mt: 3,
                  py: 2,
                  backgroundColor: '#F0FDF4',
                  borderRadius: 1
                }}
              >
                ✅ You have already applied to this job
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
