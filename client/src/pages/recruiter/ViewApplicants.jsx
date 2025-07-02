// ViewApplicants.jsx
import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {Button} from '@/components/ui/button'
import {Input } from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {Card, CardHeader, CardContent, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {ScrollArea} from '@/components/ui/scroll-area'
import { LogOut, PlusCircle, Briefcase } from "lucide-react";

const ViewApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fileBuffer, setFileBuffer] = useState({});
  const [interviewInputs, setInterviewInputs] = useState({});
  const [feedbackText, setFeedbackText] = useState({});

  const fetchApplicants = async () => {
    try {
      const { data } = await API.get(`/applications/job/${jobId}/applicants`);
      setApplicants(data.applicants);
    } catch {
      toast.error("Failed to load applicants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/applications/application/${id}/status`, { status });
      toast.success(`Marked as ${status}`);
      fetchApplicants();
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const captureFile = (appId, file) =>
    setFileBuffer((prev) => ({ ...prev, [appId]: file }));

  const handleTestUpload = async (appId) => {
    const file = fileBuffer[appId];
    if (!file) return toast.warn("Choose a file first.");
    const fd = new FormData();
    fd.append("testFile", file);
    try {
      await API.post(`/applications/application/${appId}/upload-test`, fd);
      toast.success("Test uploaded");
      fetchApplicants();
    } catch {
      toast.error("Upload failed");
    }
  };

  const handleOfferUpload = async (appId) => {
    const file = fileBuffer[appId];
    if (!file) return toast.warn("Choose a file first.");
    const fd = new FormData();
    fd.append("offer", file);
    try {
      await API.post(`/applications/application/${appId}/upload-offer`, fd);
      toast.success("Offer letter uploaded");
      fetchApplicants();
    } catch {
      toast.error("Upload failed");
    }
  };

  const handleSchedule = async (appId) => {
    const { date, link } = interviewInputs[appId] || {};
    if (!date || !link) return toast.warn("Enter both date and link");
    try {
      await API.put(`/applications/application/${appId}/schedule-interview`, { date, link });
      toast.success("Interview scheduled");
      fetchApplicants();
    } catch {
      toast.error("Failed to schedule");
    }
  };

  const handleFeedbackSubmit = async (appId) => {
    const fb = feedbackText[appId];
    if (!fb) return toast.warn("Enter feedback");
    try {
      await API.put(`/applications/application/${appId}/feedback`, { feedback: fb });
      toast.success("Feedback saved");
      fetchApplicants();
    } catch {
      toast.error("Failed to save feedback");
    }
  };

  const ScoreBadge = ({ score }) => {
    const color = score >= 70 ? "green" : score >= 40 ? "yellow" : "red";
    return (
      <Badge variant="outline" className={`text-${color}-700 border-${color}-500`}>{score}%</Badge>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#E6E9F5]">
      <aside className="hidden md:flex flex-col w-64 bg-[#0A1A4A] text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Recruiter Panel</h2>
        <Button variant="ghost" onClick={() => navigate("/recruiter/post-job")}
          className="justify-start text-left">
          <PlusCircle size={18} className="mr-2" /> Post New Job
        </Button>
        <Button variant="secondary" onClick={() => navigate("/recruiter/jobs")}>
          <Briefcase size={18} className="mr-2" /> My Posted Jobs
        </Button>
        <Button variant="destructive" onClick={() => { localStorage.removeItem("token"); navigate("/recruiter/login"); }} className="mt-auto">
          <LogOut size={18} className="mr-2" /> Logout
        </Button>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#1A3A8F] mb-6">Applicants</h2>
        {loading ? (
          <p>Loading…</p>
        ) : applicants.length === 0 ? (
          <p className="text-gray-600">No applicants yet.</p>
        ) : (
          <ScrollArea className="space-y-4">
            {applicants.map((app) => (
              <Card key={app._id}>
                <CardHeader>
                  <CardTitle className="text-[#1A3A8F]">{app.candidateId?.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm"><b>Email:</b> {app.candidateId?.email}</p>
                  <p className="text-sm"><b>Qualification:</b> {app.qualification}</p>
                  <p className="text-sm"><b>Backlogs:</b> {app.backlogInfo?.hasBacklogs ? `Yes (${app.backlogInfo.count})` : "No"}</p>
                  <p className="text-sm flex items-center gap-1">
                    <b>Resume Score:</b> <ScoreBadge score={app.score} />
                  </p>
                  <p className="text-sm"><b>Status:</b> <span className="capitalize font-medium">{app.status}</span></p>

                  <a href={app.resumeUrl} className="underline text-[#7F5AF0] text-sm" target="_blank" rel="noopener noreferrer">
                    View Resume
                  </a>

                  {app.answerFileUrl && (
                    <a href={app.answerFileUrl} className="block underline text-green-700 text-sm mb-1" target="_blank" rel="noopener noreferrer">
                      📥 View Answer
                    </a>
                  )}

                  {app.testFileUrl ? (
                    <p className="text-xs text-purple-700 mb-2">✅ Test sent</p>
                  ) : app.status === "shortlisted" && (
                    <div className="flex flex-col sm:flex-row gap-2 mb-3">
                      <Input type="file" onChange={(e) => captureFile(app._id, e.target.files[0])} />
                      <Button onClick={() => handleTestUpload(app._id)} variant="default">Upload Test</Button>
                    </div>
                  )}

                  {app.status === "interview" && (
                    <div className="space-y-2">
                      <Input type="datetime-local" onChange={(e) => setInterviewInputs((p) => ({ ...p, [app._id]: { ...(p[app._id] || {}), date: e.target.value } }))} />
                      <Input placeholder="Meeting link" onChange={(e) => setInterviewInputs((p) => ({ ...p, [app._id]: { ...(p[app._id] || {}), link: e.target.value } }))} />
                      <Button onClick={() => handleSchedule(app._id)}>Schedule Interview</Button>
                      <Textarea placeholder="Write feedback" onChange={(e) => setFeedbackText((p) => ({ ...p, [app._id]: e.target.value }))} />
                      <Button onClick={() => handleFeedbackSubmit(app._id)} variant="success">Submit Feedback</Button>
                    </div>
                  )}

                  {app.status === "offered" && (
                    <div>
                      {app.offerLetterUrl ? (
                        <a href={app.offerLetterUrl} className="underline text-blue-600 text-sm" target="_blank" rel="noopener noreferrer">
                          📄 View Offer Letter
                        </a>
                      ) : (
                        <>
                          <Input type="file" onChange={(e) => captureFile(app._id, e.target.files[0])} />
                          <Button onClick={() => handleOfferUpload(app._id)} className="mt-1">Upload Offer</Button>
                        </>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button onClick={() => handleStatusChange(app._id, "shortlisted")} variant="secondary">Shortlist</Button>
                    <Button onClick={() => handleStatusChange(app._id, "interview")} variant="outline" disabled={!app.answerFileUrl}>Interview</Button>
                    <Button onClick={() => handleStatusChange(app._id, "offered")} variant="default">Offer</Button>
                    <Button onClick={() => handleStatusChange(app._id, "rejected")} variant="destructive">Reject</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        )}
      </main>
    </div>
  );
};

export default ViewApplicants;