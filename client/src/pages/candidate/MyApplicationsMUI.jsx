// MyApplications.jsx
import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Link,
  Divider,
  LinearProgress,
  Paper,
  Input,
  Alert,
  useTheme,
} from "@mui/material";
import {
  LocationOn,
  Work,
  AttachFile,
  GetApp,
  CheckCircle,
  Cancel,
  CalendarToday,
  VideoCall,
} from "@mui/icons-material";

export default function MyApplications() {
  const theme = useTheme();
  const [applications, setApplications] = useState([]);
  const [answerFiles, setAnswerFiles] = useState({});

  useEffect(() => {
    fetchMyApplications();
  }, []);

  const fetchMyApplications = async () => {
    try {
      const { data } = await API.get("/applications/myApplications");
      setApplications(data.applications);
    } catch {
      toast.error("Failed to load applications.");
    }
  };

  const handleFileChange = (id, file) =>
    setAnswerFiles((p) => ({ ...p, [id]: file }));

  const handleAnswerUpload = async (id) => {
    const file = answerFiles[id];
    if (!file) return toast.warn("Choose a file first.");
    const fd = new FormData();
    fd.append("answer", file);
    try {
      await API.post(`/applications/application/${id}/upload-answer`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Answer uploaded");
      fetchMyApplications();
    } catch {
      toast.error("Upload failed");
    }
  };

  const steps = ["applied", "shortlisted", "interview", "offered", "accepted"];

  const Tracker = ({ status }) => {
    if (status === "rejected") {
      return (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Chip
            icon={<Cancel />}
            label="Application Rejected"
            color="error"
            variant="filled"
            sx={{ fontWeight: 600 }}
          />
        </Box>
      );
    }
    
    const currentIndex = steps.indexOf(status);
    const progress = ((currentIndex + 1) / steps.length) * 100;
    
    return (
      <Box sx={{ mt: 3 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: '#E5E7EB',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#7F5AF0',
              borderRadius: 4,
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          {steps.map((step, index) => (
            <Typography
              key={step}
              variant="caption"
              sx={{
                fontSize: '10px',
                fontWeight: 600,
                color: index <= currentIndex ? '#7F5AF0' : '#9CA3AF',
                textTransform: 'capitalize',
                textAlign: 'center',
                width: '60px',
              }}
            >
              {step}
            </Typography>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        p: 3,
        background: 'linear-gradient(135deg, #f5f7ff 0%, #eef1ff 100%)',
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          color: '#1E3A8A',
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        📄 My Applications
      </Typography>

      {applications.length === 0 ? (
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          <Typography color="text.secondary">
            You haven't applied to any jobs yet.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {applications.map((app, i) => (
            <Grid item xs={12} sm={6} lg={4} key={app._id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{ height: '100%' }}
              >
                <Card
                  sx={{
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #E5E7EB',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: '#1A3A8F',
                        mb: 1,
                      }}
                    >
                      {app.jobId.title}
                    </Typography>
                    
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: '#6B7280',
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      {app.jobId.companyName}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                      <LocationOn sx={{ fontSize: 14, color: '#9CA3AF' }} />
                      <Typography variant="caption" color="text.secondary">
                        {app.jobId.location}
                      </Typography>
                    </Box>

                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                      Exp: {app.jobId.experience}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                      <Work sx={{ fontSize: 14, color: '#10B981' }} />
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#10B981' }}>
                        ₹{app.jobId.salaryRange}
                      </Typography>
                    </Box>

                    <Tracker status={app.status} />

                    <Box sx={{ mt: 'auto', pt: 2 }}>
                      {app.testFileUrl && (
                        <Box sx={{ mb: 2 }}>
                          <Button
                            component={Link}
                            href={app.testFileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            startIcon={<GetApp />}
                            variant="outlined"
                            size="small"
                            sx={{
                              mb: 2,
                              borderColor: '#7F5AF0',
                              color: '#7F5AF0',
                              '&:hover': {
                                borderColor: '#5A3DF0',
                                backgroundColor: 'rgba(127, 90, 240, 0.1)',
                              },
                            }}
                          >
                            Download Test File
                          </Button>

                          {!app.answerFileUrl ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              <Input
                                type="file"
                                inputProps={{ accept: '.pdf,.docx' }}
                                onChange={(e) =>
                                  handleFileChange(app._id, e.target.files[0])
                                }
                                sx={{ fontSize: '0.875rem' }}
                              />
                              <Button
                                onClick={() => handleAnswerUpload(app._id)}
                                variant="contained"
                                size="small"
                                sx={{
                                  background: 'linear-gradient(135deg, #5A3DF0 0%, #5936D9 100%)',
                                  '&:hover': {
                                    background: 'linear-gradient(135deg, #5936D9 0%, #4A2DD0 100%)',
                                  },
                                }}
                              >
                                Upload Answer
                              </Button>
                            </Box>
                          ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CheckCircle sx={{ fontSize: 16, color: '#10B981' }} />
                              <Typography variant="caption" sx={{ fontWeight: 600, color: '#10B981' }}>
                                Answer Submitted —
                              </Typography>
                              <Link
                                href={app.answerFileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  color: '#7F5AF0',
                                  textDecoration: 'none',
                                  '&:hover': {
                                    color: '#5936D9',
                                    textDecoration: 'underline',
                                  },
                                }}
                              >
                                Download
                              </Link>
                            </Box>
                          )}
                        </Box>
                      )}

                      {app.status === "interview" && app.interviewDetails && (
                        <Alert
                          icon={<CalendarToday />}
                          severity="info"
                          sx={{ mb: 2, fontSize: '0.875rem' }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                            Interview Scheduled
                          </Typography>
                          <Typography variant="caption" display="block">
                            <strong>Date:</strong>{" "}
                            {new Date(app.interviewDetails.date).toLocaleString("en-IN")}
                          </Typography>
                          <Button
                            component={Link}
                            href={app.interviewDetails.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            startIcon={<VideoCall />}
                            size="small"
                            sx={{ mt: 1 }}
                          >
                            Join Interview
                          </Button>
                        </Alert>
                      )}

                      {app.feedback && (
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>
                          <strong>Feedback:</strong> {app.feedback}
                        </Typography>
                      )}

                      {app.status === "offered" && app.offerLetterUrl && (
                        <Alert severity="success" sx={{ fontSize: '0.875rem' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                            🎉 You are selected! Check your email for details.
                          </Typography>
                          
                          <Button
                            component={Link}
                            href={app.offerLetterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            startIcon={<AttachFile />}
                            size="small"
                            sx={{ mb: 1, mr: 1 }}
                          >
                            View Offer Letter
                          </Button>

                          {app.offerResponse === "pending" ? (
                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                              <Button
                                onClick={async () => {
                                  try {
                                    await API.put(
                                      `/applications/application/${app._id}/respond-to-offer`,
                                      { decision: "accepted" }
                                    );
                                    toast.success("Offer accepted!");
                                    fetchMyApplications();
                                  } catch {
                                    toast.error("Failed to accept offer");
                                  }
                                }}
                                variant="contained"
                                color="success"
                                size="small"
                                startIcon={<CheckCircle />}
                              >
                                Accept
                              </Button>

                              <Button
                                onClick={async () => {
                                  try {
                                    await API.put(
                                      `/applications/application/${app._id}/respond-to-offer`,
                                      { decision: "rejected" }
                                    );
                                    toast.success("Offer rejected.");
                                    fetchMyApplications();
                                  } catch {
                                    toast.error("Failed to reject offer");
                                  }
                                }}
                                variant="contained"
                                color="error"
                                size="small"
                                startIcon={<Cancel />}
                              >
                                Reject
                              </Button>
                            </Box>
                          ) : app.offerResponse === "accepted" ? (
                            <Typography variant="caption" sx={{ fontWeight: 600, color: '#10B981', display: 'block', mt: 1 }}>
                              ✅ You have accepted the offer.
                            </Typography>
                          ) : (
                            <Typography variant="caption" sx={{ fontWeight: 600, color: '#EF4444', display: 'block', mt: 1 }}>
                              ❌ You have rejected the offer.
                            </Typography>
                          )}
                        </Alert>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
