import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { toast } from "react-toastify";
import { LogOut, Briefcase, PlusCircle } from "lucide-react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
    salaryRange: "",
    qualificationsRequired: "",
    experience: "",
    applicationDeadline: "",
    companyName: "",
    companyLogo: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/jobs", formData);
      toast.success("Job posted successfully!");
      navigate("/recruiter/jobs");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to post job.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/recruiter/login");
  };

  const handleMyJobs = () => navigate("/recruiter/jobs");
  const handleDashboard = () => navigate("/recruiter/dashboard");

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#E6E9F5' }}>
      <Box
        component="aside"
        sx={{
          width: 256,
          backgroundColor: '#0A1A4A',
          color: 'white',
          p: 3,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          gap: 3
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Recruiter Panel
        </Typography>
        <Button
          variant="text"
          sx={{
            justifyContent: 'flex-start',
            color: 'white',
            '&:hover': { backgroundColor: '#1A3A8F' }
          }}
          onClick={handleDashboard}
        >
          <Briefcase size={18} style={{ marginRight: 8 }} /> Dashboard
        </Button>
        <Button
          variant="text"
          sx={{
            justifyContent: 'flex-start',
            color: 'white',
            '&:hover': { backgroundColor: '#1A3A8F' }
          }}
          onClick={handleMyJobs}
        >
          <Briefcase size={18} style={{ marginRight: 8 }} /> My Posted Jobs
        </Button>
        <Button
          variant="text"
          sx={{
            mt: 'auto',
            justifyContent: 'flex-start',
            color: '#FCA5A5',
            '&:hover': { color: '#F87171' }
          }}
          onClick={handleLogout}
        >
          <LogOut size={18} style={{ marginRight: 8 }} /> Logout
        </Button>
      </Box>

      <Box component="main" sx={{ flex: 1, p: { xs: 3, md: 5 }, overflow: 'auto' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#0A1A4A', mb: 3 }}>
          Post a New Job
        </Typography>

        <Card>
          <CardContent sx={{ p: 3 }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    name="title"
                    label="Job Title"
                    placeholder="Job Title"
                    fullWidth
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    name="location"
                    label="Job Location"
                    placeholder="Job Location"
                    fullWidth
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel>Job Type</InputLabel>
                    <Select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                      label="Job Type"
                    >
                      <MenuItem value="">Select Job Type</MenuItem>
                      <MenuItem value="Full-time">Full-time</MenuItem>
                      <MenuItem value="Part-time">Part-time</MenuItem>
                      <MenuItem value="Remote">Remote</MenuItem>
                      <MenuItem value="Internship">Internship</MenuItem>
                      <MenuItem value="Contract">Contract</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    name="salaryRange"
                    label="Salary Range"
                    placeholder="₹20,000 - ₹40,000"
                    fullWidth
                    value={formData.salaryRange}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    name="qualificationsRequired"
                    label="Qualifications"
                    placeholder="Required qualifications"
                    fullWidth
                    value={formData.qualificationsRequired}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel>Experience Level</InputLabel>
                    <Select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      label="Experience Level"
                    >
                      <MenuItem value="">Select Experience Level</MenuItem>
                      <MenuItem value="Fresher">Fresher</MenuItem>
                      <MenuItem value="1-2 years">1-2 years</MenuItem>
                      <MenuItem value="3-5 years">3-5 years</MenuItem>
                      <MenuItem value="5+ years">5+ years</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    name="applicationDeadline"
                    label="Application Deadline"
                    type="date"
                    fullWidth
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    name="companyName"
                    label="Company Name"
                    placeholder="Company Name"
                    fullWidth
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    name="companyLogo"
                    label="Company Logo URL"
                    placeholder="Company Logo URL"
                    fullWidth
                    value={formData.companyLogo}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    name="description"
                    label="Job Description"
                    placeholder="Detailed job description"
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: '#7F5AF0',
                      '&:hover': { backgroundColor: '#5A3DF0' },
                      py: 1.5
                    }}
                  >
                    Post Job
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default PostJob;