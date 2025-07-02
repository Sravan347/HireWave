import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { Briefcase, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [answerFiles, setAnswerFiles] = useState({});

  const fetchMyApplications = async () => {
    try {
      const { data } = await API.get("/applications/myApplications");
      setApplications(data.applications);
    } catch {
      toast.error("Failed to load applications.");
    }
  };

  useEffect(() => {
    fetchMyApplications();
  }, []);

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
        <span className="inline-block mt-4 bg-red-100 text-red-700 px-3 py-1 text-xs rounded-full font-medium">
          Rejected
        </span>
      );
    }
    const idx = steps.indexOf(status);
    return (
      <div className="flex flex-col mt-4 space-y-1">
        <div className="flex justify-between">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 flex items-center">
              <div
                className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold ${
                  i <= idx
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 ${
                    i < idx ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-gray-600">
          {steps.map((s) => (
            <span key={s} className="w-6 text-center capitalize">
              {s}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-[#E6E9F5] min-h-screen">
      <h1 className="text-2xl font-bold text-[#0A1A4A] mb-6">
        📄 My Applications
      </h1>

      {applications.length === 0 ? (
        <p className="text-[#2D3748]">You haven't applied to any jobs yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-[0_4px_12px_#5936D9] transition-shadow"
            >
              <h3 className="text-lg font-semibold text-[#0A1A4A]">{app.jobId.title}</h3>
              <p className="text-[#2D3748] text-sm">{app.jobId?.companyName}</p>
              <div className="text-[#757575] text-sm flex items-center gap-1 mt-1">
                <MapPin size={14} /> {app.jobId.location}
              </div>
              <p className="text-sm mt-1 text-[#343434]">
                Exp: {app.jobId.experience}
              </p>
              <div className="mt-1 text-green-600 text-sm flex items-center gap-1">
                <Briefcase size={14} /> ₹{app.jobId.salaryRange}
              </div>

              <Tracker status={app.status} />

              {app.testFileUrl && (
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={app.testFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#7F5AF0] hover:underline font-medium"
                  >
                    📄 Download Test File
                  </a>

                  {!app.answerFileUrl ? (
                    <div className="flex gap-2 items-center">
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
                        className="bg-[#5A3DF0] hover:bg-[#5936D9] text-white text-xs px-4"
                      >
                        Upload Answer
                      </Button>
                    </div>
                  ) : (
                    <div className="text-sm text-green-700">
                      ✅ Answer Submitted —{" "}
                      <a
                        href={app.answerFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-[#7F5AF0] hover:text-[#5A3DF0]"
                      >
                        View Answer
                      </a>
                    </div>
                  )}
                </div>
              )}

              {app.status === "interview" && app.interviewDetails && (
                <div className="mt-3 bg-blue-50 p-3 rounded border border-blue-200 text-sm">
                  <p className="font-medium text-blue-800">
                    📅 Interview Scheduled
                  </p>
                  <p>
                    <b>Date:</b>{" "}
                    {new Date(app.interviewDetails.date).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                  <p>
                    <b>Link:</b>{" "}
                    <a
                      href={app.interviewDetails.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[#7F5AF0] hover:text-[#5A3DF0]"
                    >
                      Join
                    </a>
                  </p>
                </div>
              )}

              {app.feedback && (
                <p className="text-sm text-[#2D3748] mt-2">
                  <b>Feedback:</b> {app.feedback}
                </p>
              )}

              {app.status === "offered" && app.offerLetterUrl && (
                <div className="text-blue-700 text-sm mt-2">
                  🎉 You are selected! Please check your email for further
                  communication.
                  <br />
                  📄 Offer Letter —{" "}
                  <a
                    href={app.offerLetterUrl}
                    className="underline text-[#7F5AF0]"
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
                              {
                                decision: "accepted",
                              }
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
                              {
                                decision: "rejected",
                              }
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
