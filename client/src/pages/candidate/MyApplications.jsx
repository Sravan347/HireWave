// MyApplications.jsx
import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { Briefcase, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function MyApplications() {
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
        <div className="mt-4 text-sm font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full text-center w-fit">
          ❌ Application Rejected
        </div>
      );
    }
    const idx = steps.indexOf(status);
    return (
      <div className="mt-4 space-y-1">
        <div className="flex items-center gap-2 justify-between">
          {steps.map((step, i) => (
            <React.Fragment key={step}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  i <= idx
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {i + 1}
              </motion.div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 ${
                    i < idx ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-gray-600 font-medium mt-1">
          {steps.map((s) => (
            <span key={s} className="w-[60px] text-center capitalize">
              {s}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gradient-to-br from-[#f5f7ff] to-[#eef1ff] min-h-screen">
      <h1 className="text-3xl font-extrabold text-[#1E3A8A] mb-8">
        📄 My Applications
      </h1>

      {applications.length === 0 ? (
        <p className="text-gray-500">You haven't applied to any jobs yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app, i) => (
            <motion.div
              key={app._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              <h3 className="text-lg font-bold text-[#1A3A8F]">
                {app.jobId.title}
              </h3>
              <p className="text-sm text-gray-600 font-semibold">
                {app.jobId.companyName}
              </p>
              <div className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                <MapPin size={14} /> {app.jobId.location}
              </div>
              <p className="text-sm mt-1 font-semibold text-gray-700">
                Exp: {app.jobId.experience}
              </p>
              <div className="mt-1 font-semibold text-green-600 text-sm flex items-center gap-1">
                <Briefcase size={14} /> ₹{app.jobId.salaryRange}
              </div>

              <Tracker status={app.status} />

              {app.testFileUrl && (
                <div className="mt-4 space-y-2">
                  <a
                    href={app.testFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium hover:bg-indigo-100 transition cursor-pointer"
                  >
                    📄 Download Test File
                  </a>

                  {!app.answerFileUrl ? (
                    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                      <input
                        type="file"
                        accept=".pdf,.docx"
                        className="text-sm"
                        onChange={(e) =>
                          handleFileChange(app._id, e.target.files[0])
                        }
                      />
                      <Button
                        onClick={() => handleAnswerUpload(app._id)}
                        className="bg-[#5A3DF0] hover:bg-[#5936D9] text-white px-3 py-1 text-xs"
                      >
                        Upload Answer
                      </Button>
                    </div>
                  ) : (
                    <div className="text-sm font-semibold text-green-700 flex items-center gap-1">
                      ✅ Answer Submitted —
                      <a
                        href={app.answerFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#7F5AF0] hover:text-[#5936D9] transition hover:scale-105 cursor-pointer"
                      >
                        Download File
                      </a>
                    </div>
                  )}
                </div>
              )}

              {app.status === "interview" && app.interviewDetails && (
                <div className="mt-3 bg-blue-50 p-3 rounded border border-blue-200 text-sm">
                  <p className="font-semibold text-blue-800">
                    📅 Interview Scheduled
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(app.interviewDetails.date).toLocaleString("en-IN")}
                  </p>
                  <p>
                    <span className="font-semibold">Link:</span>{" "}
                    <a
                      href={app.interviewDetails.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Join
                    </a>
                  </p>
                </div>
              )}

              {app.feedback && (
                <p className="text-sm text-gray-700 mt-2 font-semibold">
                  <span className="font-bold">Feedback:</span> {app.feedback}
                </p>
              )}

              {app.status === "offered" && app.offerLetterUrl && (
                <div className="text-blue-700 text-sm mt-2 font-semibold">
                  🎉 You are selected! Please check your email for further communication.
                  <br />
                  📄 Offer Letter —
                  <a
                    href={app.offerLetterUrl}
                    className="ml-1 text-[#7F5AF0] hover:text-[#5936D9] hover:underline cursor-pointer transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                  {app.offerResponse === "pending" ? (
                    <div className="mt-3 flex gap-3">
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
                        className="bg-green-600 text-white px-3 py-1 text-xs hover:bg-green-700"
                      >
                        ✅ Accept
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
                        className="bg-red-500 text-white px-3 py-1 text-xs hover:bg-red-600"
                      >
                        ❌ Reject
                      </Button>
                    </div>
                  ) : app.offerResponse === "accepted" ? (
                    <p className="text-green-600 font-medium mt-2">
                      ✅ You have accepted the offer.
                    </p>
                  ) : (
                    <p className="text-red-600 font-medium mt-2">
                      ❌ You have rejected the offer.
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
