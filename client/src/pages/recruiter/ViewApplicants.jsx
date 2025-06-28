// ViewApplicants.jsx
import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
      await API.post(`/applications/application/${appId}/upload-test`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
      await API.post(`/applications/application/${appId}/upload-offer`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
      await API.put(`/applications/application/${appId}/schedule-interview`, {
        date,
        link,
      });
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
      await API.put(`/applications/application/${appId}/feedback`, {
        feedback: fb,
      });
      toast.success("Feedback saved");
      fetchApplicants();
    } catch {
      toast.error("Failed to save feedback");
    }
  };

  const ScoreBadge = ({ score }) => {
    const c = score >= 70 ? "green" : score >= 40 ? "yellow" : "red";
    return (
      <span className={`px-2 py-0.5 text-xs font-semibold rounded bg-${c}-100 text-${c}-700`}>
        {score}%
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="hidden md:flex flex-col w-64 bg-[#1E3A8A] text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Recruiter Panel</h2>
        <button onClick={() => navigate("/recruiter/post-job")} className="flex items-center gap-2 hover:bg-blue-700 px-4 py-2 rounded transition">
          <PlusCircle size={18} /> Post New Job
        </button>
        <button onClick={() => navigate("/recruiter/jobs")} className="flex items-center gap-2 bg-blue-700 px-4 py-2 rounded">
          <Briefcase size={18} /> My Posted Jobs
        </button>
        <button onClick={() => { localStorage.removeItem("token"); navigate("/recruiter/login"); }} className="flex items-center gap-2 hover:text-red-300 mt-auto">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">Applicants</h2>
        {loading ? (
          <p>Loading…</p>
        ) : applicants.length === 0 ? (
          <p className="text-gray-600">No applicants yet.</p>
        ) : (
          <div className="space-y-4">
            {applicants.map((app) => (
              <div key={app._id} className="bg-white p-6 rounded shadow border">
                <h3 className="text-lg font-semibold text-blue-800">{app.candidateId?.name}</h3>
                <p className="text-sm text-gray-600"><b>Email:</b> {app.candidateId?.email}</p>
                <p className="text-sm text-gray-700"><b>Qualification:</b> {app.qualification}</p>
                <p className="text-sm text-gray-700">
                  <b>Backlogs:</b> {app.backlogInfo?.hasBacklogs ? `Yes (${app.backlogInfo.count})` : "No"}
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-1">
                  <b>Resume Score:</b> <ScoreBadge score={app.score} />
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <b>Status:</b> <span className="capitalize font-medium">{app.status}</span>
                </p>
                <a href={app.resumeUrl} className="underline text-blue-600 text-sm" target="_blank" rel="noopener noreferrer">
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
                    <input type="file" accept=".pdf,.docx" className="text-sm" onChange={(e) => captureFile(app._id, e.target.files[0])} />
                    <button onClick={() => handleTestUpload(app._id)} className="bg-purple-600 text-white px-3 py-1 rounded text-sm">
                      Upload Test
                    </button>
                  </div>
                )}
                {app.status === "interview" && (
                  <>
                    <div className="space-y-2 my-2">
                      <input type="datetime-local" className="border p-2 text-sm rounded w-full sm:w-auto"
                        onChange={(e) => setInterviewInputs((p) => ({ ...p, [app._id]: { ...(p[app._id] || {}), date: e.target.value } }))} />
                      <input type="text" placeholder="Meeting link" className="border p-2 text-sm rounded w-full sm:w-auto"
                        onChange={(e) => setInterviewInputs((p) => ({ ...p, [app._id]: { ...(p[app._id] || {}), link: e.target.value } }))} />
                      <button onClick={() => handleSchedule(app._id)} className="bg-indigo-600 text-white px-3 py-1 rounded text-sm">
                        Schedule Interview
                      </button>
                    </div>
                    <div className="mt-2">
                      <textarea className="border w-full p-2 text-sm rounded" placeholder="Write feedback for candidate"
                        onChange={(e) => setFeedbackText((p) => ({ ...p, [app._id]: e.target.value }))} />
                      <button onClick={() => handleFeedbackSubmit(app._id)} className="bg-green-600 text-white px-3 py-1 rounded text-sm mt-1">
                        Submit Feedback
                      </button>
                    </div>
                  </>
                )}
                {app.status === "offered" && (
                  <div className="mt-2">
                    {app.offerLetterUrl ? (
                      <a href={app.offerLetterUrl} className="underline text-blue-600 text-sm" target="_blank" rel="noopener noreferrer">
                        📄 View Offer Letter
                      </a>
                    ) : (
                      <>
                        <input type="file" accept=".pdf,.docx" className="text-sm" onChange={(e) => captureFile(app._id, e.target.files[0])} />
                        <button onClick={() => handleOfferUpload(app._id)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm mt-1">
                          Upload Offer
                        </button>
                      </>
                    )}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mt-3">
                  <button onClick={() => handleStatusChange(app._id, "shortlisted")} className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                    Shortlist
                  </button>
                  <button disabled={!app.answerFileUrl} onClick={() => handleStatusChange(app._id, "interview")}
                    className={`${app.answerFileUrl ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-300 cursor-not-allowed"} text-white px-3 py-1 rounded text-sm`}>
                    Interview
                  </button>
                  <button onClick={() => handleStatusChange(app._id, "offered")} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                    Offer
                  </button>
                  <button onClick={() => handleStatusChange(app._id, "rejected")} className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewApplicants;
