import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../services/api";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  LinearProgress,
  Chip,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  Link,
  styled
} from "@mui/material";
import {
  PlusCircle,
  Briefcase,
  LogOut,
  FileText,
  FileCheck2,
} from "lucide-react";

const StyledLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: '#E5E7EB',
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
    backgroundColor: 
      value >= 70 ? '#0A1A4A' : 
      value >= 40 ? '#FFD447' : 
      '#F4A261'
  }
}));

const Score = ({ val }) => {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography 
        variant="caption" 
        sx={{ 
          fontSize: '11px',
          fontWeight: 500,
          color: '#6B7280',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          display: 'block',
          mb: 0.5
        }}
      >
        Resume Score
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <StyledLinearProgress
          variant="determinate"
          value={val}
          sx={{ 
            flexGrow: 1,
            height: 8,
            borderRadius: 1,
            bgcolor: '#E5E7EB'
          }}
        />
        <Typography 
          variant="caption" 
          sx={{ 
            fontSize: '12px', 
            fontWeight: 600, 
            color: '#4B5563' 
          }}
        >
          {val}%
        </Typography>
      </Box>
    </Box>
  );
};

const Pill = ({ icon, text, colour, href, as = "span" }) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0.5,
    px: 1.5,
    py: 0.5,
    borderRadius: 2,
    fontSize: '12px',
    fontWeight: 500,
    textDecoration: 'none',
    cursor: href ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
    '&:hover': href ? {
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    } : {}
  };

  const colorMap = {
    'bg-blue-50 text-blue-600': { 
      backgroundColor: '#EFF6FF', 
      color: '#2563EB' 
    },
    'bg-emerald-50 text-emerald-600': { 
      backgroundColor: '#ECFDF5', 
      color: '#059669' 
    },
    'bg-purple-50 text-purple-600': { 
      backgroundColor: '#FAF5FF', 
      color: '#9333EA' 
    }
  };

  const content = (
    <Box sx={{ 
      ...baseStyles, 
      ...colorMap[colour] || { backgroundColor: '#F3F4F6', color: '#374151' }
    }}>
      {icon}
      <span>{text}</span>
    </Box>
  );

  return href ? (
    <Link href={href} target="_blank" rel="noopener" sx={{ textDecoration: 'none' }}>
      {content}
    </Link>
  ) : content;
};

const Action = ({ onClick, colour, disabled, children }) => {
  const colorMap = {
    emerald: { backgroundColor: '#10B981', color: 'white' },
    amber: { backgroundColor: '#F59E0B', color: 'white' },
    blue: { backgroundColor: '#3B82F6', color: 'white' },
    rose: { backgroundColor: '#EF4444', color: 'white' },
    gray: { backgroundColor: '#6B7280', color: 'white' }
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      sx={{
        fontSize: '12px',
        fontWeight: 600,
        px: 2,
        py: 0.5,
        borderRadius: 1,
        textTransform: 'none',
        minWidth: 'auto',
        ...colorMap[colour],
        '&:hover': {
          ...colorMap[colour],
          opacity: 0.8
        },
        '&:disabled': {
          backgroundColor: '#9CA3AF',
          color: 'white'
        }
      }}
    >
      {children}
    </Button>
  );
};

export default function ViewApplicants() {
  const { jobId } = useParams();
  const nav = useNavigate();
  const [apps, setApps] = useState([]);
  const [busy, setBusy] = useState(true);
  const [buf, setBuf] = useState({});
  const [interv, setInterv] = useState({});
  const [fb, setFb] = useState({});

  const refresh = async () => {
    try {
      const { data } = await API.get(`/applications/job/${jobId}/applicants`);
      setApps(data.applicants);
    } catch {
      toast.error("Failed to load applicants");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [jobId]);

  const post = async (url, body = {}) => {
    try {
      await API.put(url, body);
      toast.success("Updated");
      refresh();
    } catch {
      toast.error("Error");
    }
  };

  const buffer = (id, f) => setBuf((p) => ({ ...p, [id]: f }));

  const upload = async (id, key, endpoint) => {
    const file = buf[id];
    if (!file) return toast.warn("Pick a file first");
    const fd = new FormData();
    fd.append(key, file);
    try {
      await API.post(endpoint, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Uploaded");
      refresh();
    } catch {
      toast.error("Upload failed");
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
          onClick={() => nav("/recruiter/post-job")}
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
          Post Job
        </Button>

        <Button
          onClick={() => nav("/recruiter/jobs")}
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
          My Jobs
        </Button>

        <Button
          onClick={() => {
            localStorage.removeItem("token");
            nav("/recruiter/login");
          }}
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
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 800, 
            color: '#0A1A4A', 
            mb: 4,
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          Applicants
        </Typography>

        {busy ? (
          <Typography sx={{ color: '#6B7280' }}>Loading…</Typography>
        ) : apps.length === 0 ? (
          <Typography sx={{ color: '#6B7280' }}>No applicants yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {apps.map((a, idx) => {
              const resp =
                a.offerResponse ||
                (["accepted", "rejected"].includes(a.status)
                  ? a.status
                  : "pending");

              return (
                <Grid item xs={12} sm={6} lg={4} key={a._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card
                      sx={{
                        position: 'relative',
                        borderRadius: 3,
                        backgroundColor: '#E6E9F5',
                        border: '1px solid rgba(255,255,255,0.4)',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s ease',
                        height: '100%',
                        '&:hover': {
                          boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
                          transform: 'scale(1.015)'
                        }
                      }}
                    >
                      {resp !== "pending" && (
                        <Chip
                          label={resp.toUpperCase()}
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: -40,
                            transform: 'rotate(45deg)',
                            fontSize: '10px',
                            px: 5,
                            py: 0.25,
                            fontWeight: 700,
                            color: 'white',
                            backgroundColor: resp === "accepted" ? '#0A1A4A' : '#F4A261',
                            zIndex: 1
                          }}
                        />
                      )}

                      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ mb: 2 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600, 
                              color: '#0A1A4A',
                              fontSize: '1.125rem'
                            }}
                          >
                            {a.candidateId?.name}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: '#2D3748',
                              fontSize: '0.75rem'
                            }}
                          >
                            {a.candidateId?.email}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          <Chip
                            label={a.qualification}
                            size="small"
                            sx={{
                              backgroundColor: '#D6CEFA',
                              color: '#5936D9',
                              fontSize: '0.75rem'
                            }}
                          />
                          <Chip
                            label={
                              a.backlogInfo?.hasBacklogs
                                ? `Backlogs (${a.backlogInfo.count})`
                                : "No Backlogs"
                            }
                            size="small"
                            sx={{
                              backgroundColor: a.backlogInfo?.hasBacklogs 
                                ? '#F4A261' 
                                : '#D6CEFA',
                              color: a.backlogInfo?.hasBacklogs 
                                ? 'white' 
                                : '#0A1A4A',
                              fontSize: '0.75rem'
                            }}
                          />
                          <Chip
                            label={a.status}
                            size="small"
                            sx={{
                              backgroundColor: '#E6E9F5',
                              color: '#2D3748',
                              fontSize: '0.75rem',
                              textTransform: 'capitalize'
                            }}
                          />
                        </Box>

                        <Score val={a.score} />

                        {/* Files */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          <Pill
                            icon={<FileText size={12} />}
                            text="Resume PDF"
                            colour="bg-blue-50 text-blue-600"
                            href={a.resumeUrl}
                            as="a"
                          />
                          {a.answerFileUrl && (
                            <Pill
                              icon={<FileCheck2 size={12} />}
                              text="Answer DOCX"
                              colour="bg-emerald-50 text-emerald-600"
                              href={a.answerFileUrl}
                              as="a"
                            />
                          )}
                          {a.testFileUrl && (
                            <Chip
                              label="Test send"
                              size="small"
                              sx={{
                                backgroundColor: '#FAF5FF',
                                color: '#9333EA',
                                fontSize: '0.75rem',
                                fontWeight: 500
                              }}
                            />
                          )}
                        </Box>

                        {/* Conditional zones */}
                        {!a.testFileUrl && a.status === "shortlisted" && (
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                            <TextField
                              type="file"
                              size="small"
                              inputProps={{ accept: ".pdf,.docx" }}
                              onChange={(e) => buffer(a._id, e.target.files[0])}
                              sx={{ 
                                '& .MuiInputBase-input': { fontSize: '0.75rem' }
                              }}
                            />
                            <Button
                              onClick={() =>
                                upload(
                                  a._id,
                                  "testFile",
                                  `/applications/application/${a._id}/upload-test`
                                )
                              }
                              size="small"
                              sx={{
                                fontSize: '0.75rem',
                                backgroundColor: '#9333EA',
                                color: 'white',
                                '&:hover': { backgroundColor: '#7C3AED' }
                              }}
                            >
                              Upload test
                            </Button>
                          </Box>
                        )}

                        {a.status === "interview" && (
                          <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 1 }}>
                              <TextField
                                type="datetime-local"
                                size="small"
                                onChange={(e) =>
                                  setInterv((p) => ({
                                    ...p,
                                    [a._id]: {
                                      ...(p[a._id] || {}),
                                      date: e.target.value,
                                    },
                                  }))
                                }
                                sx={{ 
                                  '& .MuiInputBase-input': { fontSize: '0.75rem' }
                                }}
                              />
                              <TextField
                                placeholder="Meeting link"
                                size="small"
                                onChange={(e) =>
                                  setInterv((p) => ({
                                    ...p,
                                    [a._id]: {
                                      ...(p[a._id] || {}),
                                      link: e.target.value,
                                    },
                                  }))
                                }
                                sx={{ 
                                  '& .MuiInputBase-input': { fontSize: '0.75rem' }
                                }}
                              />
                              <Button
                                onClick={() =>
                                  post(
                                    `/applications/application/${a._id}/schedule-interview`,
                                    interv[a._id]
                                  )
                                }
                                size="small"
                                sx={{
                                  fontSize: '0.75rem',
                                  backgroundColor: '#4F46E5',
                                  color: 'white',
                                  '&:hover': { backgroundColor: '#4338CA' }
                                }}
                              >
                                Schedule
                              </Button>
                            </Box>

                            <TextField
                              placeholder="Feedback"
                              multiline
                              rows={2}
                              size="small"
                              fullWidth
                              onChange={(e) =>
                                setFb((p) => ({
                                  ...p,
                                  [a._id]: e.target.value,
                                }))
                              }
                              sx={{ 
                                mb: 1,
                                '& .MuiInputBase-input': { fontSize: '0.75rem' }
                              }}
                            />
                            <Button
                              onClick={() =>
                                post(
                                  `/applications/application/${a._id}/feedback`,
                                  { feedback: fb[a._id] }
                                )
                              }
                              size="small"
                              sx={{
                                fontSize: '0.75rem',
                                backgroundColor: '#059669',
                                color: 'white',
                                '&:hover': { backgroundColor: '#047857' }
                              }}
                            >
                              Save feedback
                            </Button>
                          </Box>
                        )}

                        {a.status === "offered" && (
                          <Box sx={{ mb: 2 }}>
                            {a.offerLetterUrl ? (
                              <Pill
                                icon={<FileText size={12} />}
                                text="Offer PDF"
                                colour="bg-blue-50 text-blue-600"
                                href={a.offerLetterUrl}
                                as="a"
                              />
                            ) : (
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <TextField
                                  type="file"
                                  size="small"
                                  inputProps={{ accept: ".pdf,.docx" }}
                                  onChange={(e) => buffer(a._id, e.target.files[0])}
                                  sx={{ 
                                    '& .MuiInputBase-input': { fontSize: '0.75rem' }
                                  }}
                                />
                                <Button
                                  onClick={() =>
                                    upload(
                                      a._id,
                                      "offer",
                                      `/applications/application/${a._id}/upload-offer`
                                    )
                                  }
                                  size="small"
                                  sx={{
                                    fontSize: '0.75rem',
                                    backgroundColor: '#2563EB',
                                    color: 'white',
                                    '&:hover': { backgroundColor: '#1D4ED8' }
                                  }}
                                >
                                  Upload offer
                                </Button>
                              </Box>
                            )}
                          </Box>
                        )}

                        {/* Actions */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 'auto', pt: 2 }}>
                          <Action
                            onClick={() =>
                              post(
                                `/applications/application/${a._id}/status`,
                                { status: "shortlisted" }
                              )
                            }
                            colour="emerald"
                          >
                            Shortlist
                          </Action>

                          <Action
                            disabled={!a.answerFileUrl}
                            onClick={() =>
                              post(
                                `/applications/application/${a._id}/status`,
                                { status: "interview" }
                              )
                            }
                            colour={a.answerFileUrl ? "amber" : "gray"}
                          >
                            Interview
                          </Action>

                          <Action
                            onClick={() =>
                              post(
                                `/applications/application/${a._id}/status`,
                                { status: "offered" }
                              )
                            }
                            colour="blue"
                          >
                            Offer
                          </Action>

                          <Action
                            onClick={() =>
                              post(
                                `/applications/application/${a._id}/status`,
                                { status: "rejected" }
                              )
                            }
                            colour="rose"
                          >
                            Reject
                          </Action>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
