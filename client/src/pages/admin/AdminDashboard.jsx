import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { LogOut, Users, BarChart, Star } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsSection from "../../components/charts/AnalyticSection";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("pending");
  const [recruiters, setRecruiters] = useState({
    pending: [],
    approved: [],
    declined: []
  });
  const [loading, setLoading] = useState(true);

  const tabs = ["pending", "approved", "declined", "analytics", "reviews"];

  const fetchRecruiters = async () => {
    try {
      const res = await API.get("/admin/recruiters");
      const all = res.data || [];
      setRecruiters({
        pending: all.filter(r => r.approvalStatus === "pending"),
        approved: all.filter(r => r.approvalStatus === "approved"),
        declined: all.filter(r => r.approvalStatus === "declined")
      });
    } catch {
      toast.error("Failed to fetch recruiters");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, action) => {
    try {
      await API.put(`/admin/recruiters/${id}/${action}`);
      toast.success(`Recruiter ${action}d successfully`);
      fetchRecruiters();
    } catch {
      toast.error("Action failed");
    }
  };

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      localStorage.removeItem("token");
      navigate("/login");
    } catch {
      toast.error("Logout failed.");
    }
  };

  useEffect(() => {
    if (["pending", "approved", "declined"].includes(tab)) {
      setLoading(true);
      fetchRecruiters();
    }
  }, [tab]);

  const RecruiterCard = ({ recruiter, showActions }) => (
    <Card className="bg-[#E6E9F5] border border-[#D6CEFA]">
      <CardHeader>
        <CardTitle className="text-[#0A1A4A]">{recruiter.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-[#2D3748] space-y-2">
        <p>Email: {recruiter.email}</p>
        <p>Company: {recruiter.companyName}</p>
        <p>GST: {recruiter.gstNumber}</p>
        {showActions && (
          <div className="flex gap-2 pt-4">
            <Button
              className="bg-[#5936D9] hover:bg-[#5A3DF0] text-white"
              onClick={() => handleStatusUpdate(recruiter._id, "approve")}
            >
              Approve
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => handleStatusUpdate(recruiter._id, "decline")}
            >
              Decline
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="flex min-h-screen bg-[#F7F7F7]">
      {/* Fixed Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-[#0A1A4A] text-white p-6 flex flex-col space-y-6 z-10 shadow-lg">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <Tabs value={tab} onValueChange={setTab} className="flex-1">
          <TabsList className="flex flex-col gap-2 h-full">
            {tabs.map((key) => {
              const Icon =
                key === "analytics" ? BarChart : key === "reviews" ? Star : Users;
              const label =
                key === "analytics"
                  ? "Platform Analytics"
                  : key === "reviews"
                  ? "User Reviews"
                  : `${key.charAt(0).toUpperCase() + key.slice(1)} Recruiters`;

              const isActive = tab === key;

              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition ${
                    isActive
                      ? "bg-[#1A3A8F] text-black font-medium"
                      : "text-black/70 hover:bg-[#1A3A8F] hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        <div
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 cursor-pointer hover:text-[#F4A261] transition py-4"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </div>
      </aside>

      {/* Scrollable Main Content */}
      <main className="ml-64 flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-[#0A1A4A] capitalize">
          {tab === "analytics"
            ? "Platform Analytics"
            : tab === "reviews"
            ? "User Reviews"
            : `${tab} Recruiters`}
        </h1>

        {tab === "analytics" ? (
          <AnalyticsSection />
        ) : tab === "reviews" ? (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-[#7F5AF0]">User Reviews Overview</CardTitle>
            </CardHeader>
            <CardContent className="text-[#2D3748]">
              <p>
                This section would display user reviews. For this showcase project,
                we're keeping it simple and focusing on analytics charts.
              </p>
            </CardContent>
          </Card>
        ) : loading ? (
          <p className="text-[#2D3748]">Loading...</p>
        ) : recruiters[tab].length === 0 ? (
          <p className="text-[#2D3748]">No {tab} recruiters found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recruiters[tab].map((rec) => (
              <RecruiterCard
                key={rec._id}
                recruiter={rec}
                showActions={tab === "pending"}
              />
            ))}
          </div>
        )}
      </main>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}
