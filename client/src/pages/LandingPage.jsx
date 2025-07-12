import React, { useEffect, useState, useMemo } from "react";
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  InputAdornment,
  Paper,
  useTheme,
  useMediaQuery 
} from "@mui/material";
import { Input } from "../components/mui/Input";
import { Button } from "../components/mui/Button";
import { Skeleton } from "../components/mui/Skeleton";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import API from "../services/api";
import { Search } from "lucide-react";

const LandingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Fetch public jobs
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const { data } = await API.get("/jobs/public");
        setJobs(Array.isArray(data.jobs) ? data.jobs : []);
      } catch (err) {
        console.error("Jobs fetch error:", err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  // Memoized filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs
      .filter(
        (j) =>
          j.title.toLowerCase().includes(search.toLowerCase()) ||
          j.companyName.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 6);
  }, [jobs, search]);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      width: '100%',
      overflow: 'hidden'
    }}>
      <Navbar />

      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #7F5AF0 0%, #4C6EF5 50%, #0A1A4A 100%)',
          color: 'white',
          py: { xs: 10, md: 14 },
          borderRadius: 0,
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ px: 2 }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.1,
                animation: 'pulse 2s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.8 },
                },
              }}
            >
              <Box component="span" sx={{ fontFamily: 'serif' }}>
                Dive&nbsp;into
              </Box>
              <br />
              <Box component="span" sx={{ fontFamily: 'monospace' }}>
                your&nbsp;next&nbsp;career&nbsp;wave
              </Box>
            </Typography>
            
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
              Hand picked opportunities updated every day
            </Typography>

            {/* Search */}
            <Box sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jobs or companies..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} color="#6B7280" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#B5A9FF',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#B5A9FF',
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Job Section */}
      <Box component="main" sx={{ flexGrow: 1, py: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              mb: 4,
              color: '#0A1A4A',
              fontWeight: 700,
            }}
          >
            Latest Opportunities
          </Typography>

          {loading ? (
            <Grid container spacing={4}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={i}>
                  <Box sx={{ p: 2 }}>
                    <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="40%" height={24} sx={{ mb: 2 }} />
                    <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 2, mb: 2 }} />
                    <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: '20px' }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : filteredJobs.length > 0 ? (
            <Grid container spacing={4}>
              {filteredJobs.map((job, i) => (
                <Grid 
                  size={{ xs: 12, md: 6, lg: 4 }}
                  key={job._id}
                  sx={{
                    animation: 'slideUp 0.5s ease forwards',
                    animationDelay: `${i * 80}ms`,
                    '@keyframes slideUp': {
                      '0%': {
                        transform: 'translateY(30px)',
                        opacity: 0,
                      },
                      '100%': {
                        transform: 'translateY(0)',
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <JobCard job={job} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box textAlign="center" sx={{ py: 8 }}>
              <Typography variant="body1" color="text.secondary">
                No jobs found.
              </Typography>
            </Box>
          )}

          {/* Browse all jobs */}
          {jobs.length > 6 && !loading && (
            <Box textAlign="center" sx={{ mt: 6 }}>
              <Button
                onClick={() => window.location.assign("/jobs")}
                variant="contained"
                color="primary"
                size="large"
              >
                Browse all jobs
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default LandingPage;
