import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Pencil,
  Trash2,
  Eye,
  LogOut,
  PlusCircle,
  Briefcase,
  UserCheck,
} from "lucide-react";
import {
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
  Chip,
} from '@mui/material';

export default function PostedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
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
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await API.delete(`/jobs/${id}`);
      toast.success("Job deleted");
      fetchJobs();
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

  return (
    <div className="flex min-h-screen bg-[#E6E9F5]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A1A4A] text-white p-6 space-y-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold">Recruiter Panel</h2>
        <Button
          variant="ghost"
          className="justify-start text-white hover:bg-[#1A3A8F]"
          onClick={handlePostJob}
        >
          <PlusCircle size={18} className="mr-2" /> Post New Job
        </Button>
        <Button
          variant="ghost"
          className="justify-start bg-[#1A3A8F] hover:bg-[#1A3A8F] text-white"
        >
          <Briefcase size={18} className="mr-2" /> Posted Jobs
        </Button>
        <Button
          variant="ghost"
          className="mt-auto justify-start text-red-300 hover:text-red-400"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" /> Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#0A1A4A]">My Posted Jobs</h2>
          <Button
            className="bg-[#7F5AF0] hover:bg-[#5A3DF0] text-white"
            onClick={handlePostJob}
          >
            + Post New Job
          </Button>
        </div>

        {loading ? (
          <p className="text-[#2D3748]">Loading...</p>
        ) : jobs.length === 0 ? (
          <p className="text-[#2D3748]">No jobs posted yet.</p>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {jobs.map((job) => (
              <Card key={job._id} sx={{ backgroundColor: 'white', border: '1px solid #D6CEFA' }}>
                <CardHeader>
                  <Typography variant="h6" sx={{ color: '#2563EB', fontWeight: 600 }}>
                    {job.title}
                  </Typography>
                </CardHeader>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body2" sx={{ color: '#2D3748' }}>
                      {job.location} • {job.jobType}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575', fontSize: '0.875rem' }}>
                      Posted on {new Date(job.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#343434', 
                        fontSize: '0.875rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {job.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'green' }}>
                      Applicants: <Box component="span" sx={{ fontWeight: 'bold' }}>{job.numApplicants}</Box>
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pt: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ '&:hover': { backgroundColor: '#E6E9F5' } }}
                        onClick={() => navigate(`/recruiter/jobs/${job._id}`)}
                      >
                        <Eye size={16} style={{ marginRight: 8 }} /> View
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ '&:hover': { backgroundColor: '#FFF6D6' } }}
                        onClick={() => navigate(`/recruiter/jobs/edit/${job._id}`)}
                      >
                        <Pencil size={16} style={{ marginRight: 8 }} /> Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        sx={{ '&:hover': { backgroundColor: '#FBEAEA' } }}
                        onClick={() => handleDelete(job._id)}
                      >
                        <Trash2 size={16} style={{ marginRight: 8 }} /> Delete
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ 
                          color: 'green', 
                          borderColor: 'green',
                          '&:hover': { borderColor: 'green', backgroundColor: '#F0FDF4' }
                        }}
                        onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
                      >
                        <UserCheck size={16} style={{ marginRight: 8 }} /> View Applicants
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </main>
    </div>
  );
}
