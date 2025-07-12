import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { toast } from "react-toastify";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  AddCircle,
  Work,
  Visibility,
  ExitToApp,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";

const RecruiterDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const recruiterName = "Recruiter";

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

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePostJob = () => navigate("/recruiter/post-job");
  const handleViewJobs = () => navigate("/recruiter/jobs");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/recruiter/login");
  };

  const sidebarContent = (
    <Box
      sx={{
        width: 256,
        height: '100%',
        backgroundColor: '#0A1A4A',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        p: 3,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 4,
          textAlign: 'center',
        }}
      >
        Recruiter Panel
      </Typography>

      <List sx={{ flex: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handlePostJob}
            sx={{
              borderRadius: 2,
              color: 'white',
              '&:hover': {
                backgroundColor: '#1A3A8F',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              <AddCircle />
            </ListItemIcon>
            <ListItemText primary="Post New Job" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={handleViewJobs}
            sx={{
              borderRadius: 2,
              color: 'white',
              '&:hover': {
                backgroundColor: '#1A3A8F',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              <Work />
            </ListItemIcon>
            <ListItemText primary="Posted Jobs" />
          </ListItemButton>
        </ListItem>
      </List>

      <Button
        onClick={handleLogout}
        startIcon={<ExitToApp />}
        sx={{
          justifyContent: 'flex-start',
          color: '#FCA5A5',
          '&:hover': {
            color: '#F87171',
            backgroundColor: 'rgba(248, 113, 113, 0.1)',
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#E6E9F5' }}>
      {/* Sidebar */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: 256,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 256,
              boxSizing: 'border-box',
              border: 'none',
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#0A1A4A',
            }}
          >
            Welcome, {recruiterName}
          </Typography>
          
          <Button
            onClick={handlePostJob}
            variant="contained"
            startIcon={<AddCircle />}
            sx={{
              background: 'linear-gradient(135deg, #7F5AF0 0%, #5A3DF0 100%)',
              borderRadius: 2,
              px: 3,
              '&:hover': {
                background: 'linear-gradient(135deg, #5A3DF0 0%, #4A2DD0 100%)',
              },
            }}
          >
            New Job
          </Button>
        </Box>

        {/* Posted Jobs Section */}
        <Paper
          elevation={2}
          sx={{
            p: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: '#2D3748',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Work /> Recent Jobs
            </Typography>
            
            <Button
              onClick={handleViewJobs}
              startIcon={<Visibility />}
              size="small"
              sx={{
                color: '#7F5AF0',
                '&:hover': {
                  color: '#5A3DF0',
                  backgroundColor: 'rgba(127, 90, 240, 0.1)',
                },
              }}
            >
              View All
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : jobs.length === 0 ? (
            <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No jobs posted yet.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {jobs.slice(0, 4).map((job) => (
                <Grid item xs={12} md={6} key={job._id}>
                  <Card
                    sx={{
                      backgroundColor: 'white',
                      border: '1px solid #D6CEFA',
                      borderRadius: 3,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#1A3A8F',
                          fontWeight: 600,
                          mb: 2,
                        }}
                      >
                        {job.title}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {job.location} • {job.jobType}
                      </Typography>
                      
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mb: 2 }}
                      >
                        Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                      </Typography>
                      
                      <Chip
                        label={`${job.numApplicants} Applicants`}
                        size="small"
                        sx={{
                          backgroundColor: '#E6FFFA',
                          color: '#047857',
                          fontWeight: 600,
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default RecruiterDashboard;
