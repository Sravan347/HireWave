// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { LogOut, Users } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("pending");
  const [recruiters, setRecruiters] = useState({
    pending: [],
    approved: [],
    declined: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchRecruiters = async () => {
    try {
      const res = await API.get("/admin/recruiters");
      const all = res.data || [];

      setRecruiters({
        pending: all.filter((r) => r.approvalStatus === "pending"),
        approved: all.filter((r) => r.approvalStatus === "approved"),
        declined: all.filter((r) => r.approvalStatus === "declined"),
      });
    } catch (err) {
      console.error("Error fetching recruiters:", err);
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
    } catch (err) {
      console.error("Status update failed:", err);
      toast.error("Action failed");
    }
  };

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed.");
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const RecruiterCard = ({ recruiter, showActions }) => (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
      <h3 className="text-lg font-semibold text-[#2563EB]">{recruiter.name}</h3>
      <p className="text-sm text-gray-700">Email: {recruiter.email}</p>
      <p className="text-sm text-gray-700">Company: {recruiter.companyName}</p>
      <p className="text-sm text-gray-700">GST: {recruiter.gstNumber}</p>
      {showActions && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => handleStatusUpdate(recruiter._id, "approve")}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Approve
          </button>
          <button
            onClick={() => handleStatusUpdate(recruiter._id, "decline")}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );

  const tabs = ["pending", "approved", "declined"];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E3A8A] text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <nav className="space-y-4">
          {tabs.map((key) => (
            <div
              key={key}
              onClick={() => setTab(key)}
              className={`capitalize flex items-center gap-2 cursor-pointer px-2 py-1 rounded 
                ${tab === key ? "bg-blue-700" : "hover:bg-blue-800"}`}
            >
              <Users size={18} /> {key} recruiters
            </div>
          ))}
          <div
            onClick={handleLogout}
            className="flex items-center gap-2 cursor-pointer hover:text-red-400 mt-4"
          >
            <LogOut size={18} /> Logout
          </div>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-[#1E3A8A] capitalize">
          {tab} Recruiters
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : recruiters[tab].length === 0 ? (
          <p>No {tab} recruiters found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Toast Container */}
    </div>
  );
}
