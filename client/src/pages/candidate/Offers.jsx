// pages/candidate/Offers.jsx
import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { MapPin, Briefcase } from "lucide-react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Container,
  Grid,
  Chip,
} from '@mui/material';

export default function Offers() {
  const [offers, setOffers] = useState([]);

  const fetchOffers = async () => {
    try {
      const { data } = await API.get("/applications/offers");
      setOffers(data.offers);
    } catch {
      toast.error("Failed to load offers.");
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  if (!offers.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">No accepted offers yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8 text-[#0A1A4A]">
        🎉 My Accepted Offers
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((app) => (
          <div
            key={app._id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden"
          >
            {/* Header banner */}
            <div className="bg-gradient-to-r from-[#7F5AF0] to-[#5936D9] p-4">
              <h3 className="text-xl font-bold text-white tracking-wide">
                {app.jobId.title}
              </h3>
              <p className="text-indigo-100">{app.jobId.companyName}</p>
            </div>

            {/* Details */}
            <div className="p-4 space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <MapPin size={14} /> {app.jobId.location}
              </div>
              <p>
                <b>Experience:</b> {app.jobId.experience}
              </p>
              <p className="flex items-center gap-1 text-green-700">
                <Briefcase size={14} /> ₹{app.jobId.salaryRange}
              </p>

              {/* Offer Letter */}
              {app.offerLetterUrl && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="font-medium text-blue-800 mb-1">
                    📄 Offer Letter
                  </p>
                  <a
                    href={app.offerLetterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View / Download
                  </a>
                </div>
              )}

              {/* Timeline recap */}
              <div className="text-xs text-gray-500">
                <p>
                  <b>Status flow:</b> {`Applied ➜ ${app.status}`.toUpperCase()}
                </p>
                {app.interviewDetails && (
                  <>
                    <p>
                      <b>Interview:</b>{" "}
                      {new Date(app.interviewDetails.date).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                    <p>
                      <a
                        href={app.interviewDetails.link}
                        className="underline text-blue-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                       
                      </a>
                    </p>
                  </>
                )}
                {app.feedback && (
                  <p>
                    <b>Feedback: </b>
                    {app.feedback}
                  </p>
                )}
              </div>
            </div>

            {/* Optional: go to job details */}
            <div className="p-4 border-t flex justify-end">
              <Button
                variant="outline"
                onClick={() => window.location.assign(`/jobs/${app.jobId._id}`)}
                className="text-[#7F5AF0] hover:bg-[#F3F2FF]"
              >
                View Job Posting
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
