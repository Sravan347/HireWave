import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  Eye,
  LogOut,
  PlusCircle,
  Briefcase,
  UserCheck,
  MapPin,
  Calendar,
  Users,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

export default function PostedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, jobId: null, jobTitle: '' });
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/jobs/${id}`);
      toast.success("Job deleted successfully");
      fetchJobs();
      setDeleteDialog({ open: false, jobId: null, jobTitle: '' });
    } catch (err) {
      toast.error("Failed to delete job");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/recruiter/login");
  };

  const handlePostJob = () => navigate("/recruiter/post-job");

  useEffect(() => {
    fetchJobs();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return { backgroundColor: '#ECFDF5', color: '#059669' };
      case 'closed': return { backgroundColor: '#FEF2F2', color: '#DC2626' };
      case 'draft': return { backgroundColor: '#FEF3C7', color: '#D97706' };
      default: return { backgroundColor: '#F3F4F6', color: '#374151' };
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7ff 0%, #eef1ff 100%)',
      display: 'flex'
    }}>
      {/* Sidebar */}
      <Box
        component="aside"
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: 256,
          flexDirection: 'column',
          backgroundColor: '#0A1A4A',
          color: 'white',
          px: 3,
          py: 4,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          Recruiter Panel
        </Typography>

        <Button
          onClick={handlePostJob}
          startIcon={<PlusCircle size={18} />}
          sx={{
            mb: 2,
            backgroundColor: '#1A3A8F',
            color: 'white',
            textTransform: 'none',
            justifyContent: 'flex-start',
            '&:hover': { backgroundColor: '#5A3DF0' }
          }}
        >
          Post New Job
        </Button>

        <Button
          startIcon={<Briefcase size={18} />}
          sx={{
            mb: 2,
            backgroundColor: '#7F5AF0',
            color: 'white',
            textTransform: 'none',
            justifyContent: 'flex-start',
            '&:hover': { backgroundColor: '#5A3DF0' }
          }}
        >
          Posted Jobs
        </Button>

        <Button
          onClick={handleLogout}
          startIcon={<LogOut size={18} />}
          sx={{
            mt: 'auto',
            color: '#F4A261',
            textTransform: 'none',
            justifyContent: 'flex-start',
            '&:hover': { color: '#FFD447', backgroundColor: 'transparent' }
          }}
        >
          Logout
        </Button>
      </Box>

      {/* Main Content */}
      <Box component="main" sx={{ flex: 1, p: { xs: 3, md: 5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800, 
              color: '#0A1A4A',
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            My Posted Jobs
          </Typography>
          <Button
            variant="contained"
            startIcon={<PlusCircle size={18} />}
            onClick={handlePostJob}
            sx={{
              backgroundColor: '#7F5AF0',
              color: 'white',
              textTransform: 'none',
              borderRadius: 2,
              px: 3,
              py: 1.5,
              fontWeight: 600,
              '&:hover': { backgroundColor: '#5A3DF0' }
            }}
          >
            Post New Job
          </Button>
        </Box>

        {loading ? (
          <Typography sx={{ color: '#6B7280', textAlign: 'center', mt: 8 }}>
            Loading your posted jobs...
          </Typography>
        ) : jobs.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h6" sx={{ color: '#6B7280', mb: 2 }}>
              No jobs posted yet
            </Typography>
            <Typography sx={{ color: '#9CA3AF', mb: 4 }}>
              Start by posting your first job to attract talented candidates
            </Typography>
            <Button
              variant="contained"
              startIcon={<PlusCircle size={18} />}
              onClick={handlePostJob}
              sx={{
                backgroundColor: '#7F5AF0',
                '&:hover': { backgroundColor: '#5A3DF0' }
              }}
            >
              Post Your First Job
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {jobs.map((job, index) => (
              <Grid item xs={12} lg={6} key={job._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        boxShadow: '0 20px 25px rgba(0,0,0,0.1)',
                        transform: 'translateY(-4px)',
                        borderColor: '#7F5AF0'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      {/* Header */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: '#0A1A4A', 
                              fontWeight: 700,
                              fontSize: '1.25rem',
                              mb: 0.5,
                              lineHeight: 1.3
                            }}
                          >
                            {job.title}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <MapPin size={14} />
                            <Typography variant="body2" sx={{ color: '#6B7280' }}>
                              {job.location} • {job.jobType}
                            </Typography>
                          </Box>
                        </Box>
                        <Chip 
                          label={job.status || 'active'}
                          size="small"
                          sx={{
                            ...getStatusColor(job.status),
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            textTransform: 'capitalize'
                          }}
                        />
                      </Box>

                      {/* Job Details */}
                      <Box sx={{ mb: 3 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#4B5563',
                            fontSize: '0.875rem',
                            lineHeight: 1.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            mb: 2
                          }}
                        >
                          {job.description}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Calendar size={14} />
                            <Typography variant="caption" sx={{ color: '#6B7280' }}>
                              Posted {new Date(job.createdAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Users size={14} />
                            <Typography variant="caption" sx={{ color: '#059669', fontWeight: 600 }}>
                              {job.numApplicants} Applicants
                            </Typography>
                          </Box>
                        </Box>

                        {job.salaryRange && (
                          <Typography variant="body2" sx={{ color: '#059669', fontWeight: 600, mb: 2 }}>
                            ₹ {job.salaryRange}
                          </Typography>
                        )}
                      </Box>

                      {/* Action Buttons */}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Eye size={14} />}
                          onClick={() => navigate(`/recruiter/jobs/${job._id}`)}
                          sx={{
                            borderColor: '#D1D5DB',
                            color: '#4B5563',
                            textTransform: 'none',
                            '&:hover': { 
                              borderColor: '#7F5AF0',
                              backgroundColor: '#F8F7FF',
                              color: '#7F5AF0'
                            }
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Pencil size={14} />}
                          onClick={() => navigate(`/recruiter/jobs/edit/${job._id}`)}
                          sx={{
                            borderColor: '#D1D5DB',
                            color: '#4B5563',
                            textTransform: 'none',
                            '&:hover': { 
                              borderColor: '#F59E0B',
                              backgroundColor: '#FFFBEB',
                              color: '#F59E0B'
                            }
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Trash2 size={14} />}
                          onClick={() => setDeleteDialog({ 
                            open: true, 
                            jobId: job._id, 
                            jobTitle: job.title 
                          })}
                          sx={{
                            borderColor: '#D1D5DB',
                            color: '#4B5563',
                            textTransform: 'none',
                            '&:hover': { 
                              borderColor: '#EF4444',
                              backgroundColor: '#FEF2F2',
                              color: '#EF4444'
                            }
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<UserCheck size={14} />}
                          onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
                          sx={{
                            backgroundColor: '#059669',
                            color: 'white',
                            textTransform: 'none',
                            '&:hover': { backgroundColor: '#047857' }
                          }}
                        >
                          View Applicants
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialog.open} 
        onClose={() => setDeleteDialog({ open: false, jobId: null, jobTitle: '' })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: '#0A1A4A', fontWeight: 600 }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the job "{deleteDialog.jobTitle}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={() => setDeleteDialog({ open: false, jobId: null, jobTitle: '' })}
            sx={{ color: '#6B7280' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => handleDelete(deleteDialog.jobId)}
            variant="contained"
            sx={{ 
              backgroundColor: '#EF4444',
              '&:hover': { backgroundColor: '#DC2626' }
            }}
          >
            Delete Job
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
