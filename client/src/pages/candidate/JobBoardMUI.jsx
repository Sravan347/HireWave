import React, { useEffect, useState } from "react";
import API from "../../services/api";
import JobCard from "./components/JobCard";
import JobDetailsModal from "./components/JobDetailsModal";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
  Pagination,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Search, Filter } from "lucide-react";

const PAGE_LIMIT = 9;

export default function JobBoard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  
  /* state */
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotal] = useState(1);
  const [appliedIds, setIds] = useState([]);
  const [modalJob, setModal] = useState(null);

  const [filters, setFilters] = useState({
    keyword: "", location: "", jobType: "", experience: "",
  });

  /* data */
  const loadJobs = async (p = 1) => {
    try {
      const { data } = await API.get("/jobs/public", {
        params: { ...filters, page: p, limit: PAGE_LIMIT },
      });
      setJobs(data.jobs);
      setPage(data.page);
      setTotal(data.totalPages);
    } catch {
      toast.error("Failed to fetch jobs");
    }
  };

  const loadApplied = async () => {
    try {
      const { data } = await API.get("/applications/myApplications");
      setIds(data.applications.map((a) => a.jobId._id));
    } catch {
      toast.error("Could not load applied jobs");
    }
  };

  /* effects */
  useEffect(() => { loadJobs(1); }, [filters]);   // reset to first page
  useEffect(() => { loadApplied(); }, []);

  /* handlers */
  const onFilter = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const changePage = (event, value) => { 
    loadJobs(value); 
  };

  const filterOptions = [
    { 
      name: "location", 
      label: "Location",
      placeholder: "All Locations",
      opts: ["Kochi", "Mumbai", "Bengaluru", "Trivandrum", "Hyderabad", "Pune", "Delhi"] 
    },
    { 
      name: "jobType", 
      label: "Job Type",
      placeholder: "All Types",
      opts: ["Full-time", "Part-time", "Remote", "Internship", "Contract"] 
    },
    { 
      name: "experience", 
      label: "Experience",
      placeholder: "All Experience",
      opts: ["Fresher", "1-2 years", "3-5 years", "5+ years"] 
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7ff 0%, #eef1ff 100%)',
      }}
    >
      {/* Hero Section */}
      <Box sx={{ px: 3, pt: 5, pb: 3, textAlign: 'center' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            color: '#1A3A8F',
            mb: 1,
            fontSize: { xs: '2rem', md: '2.5rem' },
          }}
        >
          Discover{" "}
          <Box component="span" sx={{ color: '#7F5AF0' }}>
            great opportunities
          </Box>
        </Typography>
      </Box>

      {/* Filters Section */}
      <Container maxWidth="xl" sx={{ px: 3 }}>
        <Paper
          elevation={3}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            p: 3,
            mb: 5,
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Search Field */}
            <Grid item xs={12} lg={5}>
              <TextField
                name="keyword"
                placeholder="Search keyword..."
                value={filters.keyword}
                onChange={onFilter}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={16} color="#9CA3AF" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F9FAFB',
                    borderRadius: 2,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#7F5AF0',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#7F5AF0',
                    },
                  },
                }}
              />
            </Grid>

            {/* Filter Dropdowns */}
            {filterOptions.map(({ name, label, placeholder, opts }) => (
              <Grid item xs={12} sm={4} lg={2} key={name}>
                <FormControl fullWidth size="small">
                  <InputLabel>{label}</InputLabel>
                  <Select
                    name={name}
                    value={filters[name]}
                    onChange={onFilter}
                    label={label}
                    sx={{
                      backgroundColor: '#F9FAFB',
                      borderRadius: 2,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#7F5AF0',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#7F5AF0',
                      },
                    }}
                  >
                    <MenuItem value="">{placeholder}</MenuItem>
                    {opts.map(opt => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ))}

            {/* Filter Icon */}
            {!isMobile && (
              <Grid item lg={1}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Filter size={18} color="#7F5AF0" />
                </Box>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container>

      {/* Jobs Grid */}
      <Container maxWidth="xl" sx={{ px: 3 }}>
        {jobs.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="body1" color="text.secondary">
              No jobs found.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {jobs.map((job, i) => (
              <Grid item xs={12} sm={6} lg={4} key={job._id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{ height: '100%' }}
                >
                  <JobCard
                    job={job}
                    isApplied={appliedIds.includes(job._id)}
                    onClick={() => setModal(job)}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, pb: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={changePage}
            color="primary"
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: '50%',
                fontWeight: 600,
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #7F5AF0 0%, #5A3DF0 100%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5A3DF0 0%, #4A2DD0 100%)',
                  },
                },
                '&:not(.Mui-selected)': {
                  backgroundColor: '#E5E7EB',
                  color: '#374151',
                  '&:hover': {
                    backgroundColor: '#D1D5DB',
                  },
                },
              },
            }}
          />
        </Box>
      )}

      {/* Modal */}
      {modalJob && (
        <JobDetailsModal
          job={modalJob}
          isApplied={appliedIds.includes(modalJob._id)}
          onClose={() => { 
            setModal(null); 
            loadApplied(); 
          }}
        />
      )}
    </Box>
  );
}
