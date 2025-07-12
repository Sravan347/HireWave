
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  useTheme,
  alpha,
  Divider,
  Container,
  Grid,
  Paper,
  InputLabel,
  styled,
  Link
} from "@mui/material";
import {
  PlusCircle,
  Briefcase,
  LogOut,
  FileText,
  FileCheck2,
  Home,
  User,
  Users2,
  Calendar,
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
    <div className="flex min-h-screen bg-gradient-to-br from-[#f5f7ff] to-[#eef1ff]">
      <aside className="hidden md:flex w-64 flex-col bg-[#0A1A4A] text-white px-6 py-8 space-y-6 shadow-xl">
        <h2 className="text-2xl font-bold">Recruiter Panel</h2>

        <button
          onClick={() => nav("/recruiter/post-job")}
          className="flex items-center gap-2 px-4 py-2 rounded bg-[#1A3A8F] hover:bg-[#5A3DF0] transition"
        >
          <PlusCircle size={18} /> Post Job
        </button>

        <button
          onClick={() => nav("/recruiter/jobs")}
          className="flex items-center gap-2 px-4 py-2 rounded bg-[#7F5AF0] hover:bg-[#5A3DF0] transition"
        >
          <Briefcase size={18} /> My Jobs
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            nav("/recruiter/login");
          }}
          className="mt-auto flex items-center gap-2 text-[#F4A261] hover:text-[#FFD447] transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-[#0A1A4A] mb-8">
          Applicants
        </h1>

        {busy ? (
          <p className="text-gray-600">Loading…</p>
        ) : apps.length === 0 ? (
          <p className="text-gray-600">No applicants yet.</p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {apps.map((a, idx) => {
              const resp =
                a.offerResponse ||
                (["accepted", "rejected"].includes(a.status)
                  ? a.status
                  : "pending");

              return (
                <motion.div
                  key={a._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="mb-6 break-inside-avoid"
                >
                  <div className="relative rounded-2xl ring-1 ring-white/40 shadow-lg bg-[#E6E9F5] hover:shadow-2xl hover:scale-[1.015] transition">
                    {resp !== "pending" && (
                      <span
                        className={`absolute top-3 -right-10 rotate-45 text-[10px] px-10 py-0.5 font-bold text-white ${
                          resp === "accepted"
                            ? "bg-[#0A1A4A]"
                            : "bg-[#F4A261]"
                        }`}
                      >
                        {resp.toUpperCase()}
                      </span>
                    )}

                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[#0A1A4A]">
                          {a.candidateId?.name}
                        </h3>
                        <p className="text-xs text-[#2D3748]">
                          {a.candidateId?.email}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-0.5 bg-[#D6CEFA] text-[#5936D9] rounded">
                          {a.qualification}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded ${
                            a.backlogInfo?.hasBacklogs
                              ? "bg-[#F4A261] text-white"
                              : "bg-[#D6CEFA] text-[#0A1A4A]"
                          }`}
                        >
                          {a.backlogInfo?.hasBacklogs
                            ? `Backlogs (${a.backlogInfo.count})`
                            : "No Backlogs"}
                        </span>
                        <span className="px-2 py-0.5 bg-[#E6E9F5] text-[#2D3748] rounded capitalize">
                          {a.status}
                        </span>
                      </div>

                      <Score val={a.score} />

                     {/* files */}
                      <div className="flex flex-wrap gap-2">
                        <Pill
                          icon={<FileText size={12} />}
                          text="Resume PDF"
                          colour="bg-blue-50 text-blue-600"
                          href={a.resumeUrl}
                          as="a"
                        />
                        {a.answerFileUrl && (
                          <Pill
                            icon={<FileCheck2 size={12} />}
                            text="Answer DOCX"
                            colour="bg-emerald-50 text-emerald-600"
                            href={a.answerFileUrl}
                            as="a"
                        />
                        )}
                        {a.testFileUrl && (
                          <span className="text-xs font-medium px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full">
                            Test send
                          </span>
                        )}
                      </div>

                      {/* conditional zones */}
                      {!a.testFileUrl &&
                        a.status === "shortlisted" && (
                          <div className="flex flex-col gap-2">
                            <input
                              type="file"
                              accept=".pdf,.docx"
                              onChange={(e) =>
                                buffer(a._id, e.target.files[0])
                              }
                              className="file:px-3 file:py-1 file:bg-purple-100 file:text-purple-600 file:border-0 file:rounded text-xs"
                            />
                            <button
                              onClick={() =>
                                upload(
                                  a._id,
                                  "testFile",
                                  `/applications/application/${a._id}/upload-test`
                                )
                              }
                              className="text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                            >
                              Upload test
                            </button>
                          </div>
                        )}

                      {a.status === "interview" && (
                        <>
                          <div className="flex flex-col gap-2">
                            <input
                              type="datetime-local"
                              onChange={(e) =>
                                setInterv((p) => ({
                                  ...p,
                                  [a._id]: {
                                    ...(p[a._id] || {}),
                                    date: e.target.value,
                                  },
                                }))
                              }
                              className="border px-2 py-1 text-xs rounded"
                            />
                            <input
                              type="text"
                              placeholder="Meeting link"
                              onChange={(e) =>
                                setInterv((p) => ({
                                  ...p,
                                  [a._id]: {
                                    ...(p[a._id] || {}),
                                    link: e.target.value,
                                  },
                                }))
                              }
                              className="border px-2 py-1 text-xs rounded"
                            />
                            <button
                              onClick={() =>
                                post(
                                  `/applications/application/${a._id}/schedule-interview`,
                                  interv[a._id]
                                )
                              }
                              className="text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                            >
                              Schedule
                            </button>
                          </div>

                          <textarea
                            placeholder="Feedback"
                            onChange={(e) =>
                              setFb((p) => ({
                                ...p,
                                [a._id]: e.target.value,
                              }))
                            }
                            className="w-full border px-2 py-1 text-xs rounded mt-2"
                          />
                          <button
                            onClick={() =>
                              post(
                                `/applications/application/${a._id}/feedback`,
                                { feedback: fb[a._id] }
                              )
                            }
                            className="text-xs bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 mt-1"
                          >
                            Save feedback
                          </button>
                        </>
                      )}

                      {a.status === "offered" && (
                        <>
                          {a.offerLetterUrl ? (
                            <Pill
                              icon={<FileText size={12} />}
                              text="Offer PDF"
                              colour="bg-blue-50 text-blue-600"
                              href={a.offerLetterUrl}
                              as="a"
                            />
                          ) : (
                            <div className="flex flex-col gap-2">
                              <input
                                type="file"
                                accept=".pdf,.docx"
                                onChange={(e) =>
                                  buffer(a._id, e.target.files[0])
                                }
                                className="file:px-3 file:py-1 file:bg-blue-100 file:text-blue-600 file:border-0 file:rounded text-xs"
                              />
                              <button
                                onClick={() =>
                                  upload(
                                    a._id,
                                    "offer",
                                    `/applications/application/${a._id}/upload-offer`
                                  )
                                }
                                className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                              >
                                Upload offer
                              </button>
                            </div>
                          )}
                        </>
                      )}

                      {/* actions */}
                      <div className="flex flex-wrap gap-2 pt-4">
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
                      </div>

                      

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}



                  