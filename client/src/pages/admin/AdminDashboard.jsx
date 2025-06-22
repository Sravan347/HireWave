// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Unable to logout. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md space-y-6 text-center animate-fade-in">
        <h1 className="text-3xl font-bold text-[#2563EB]">Hi, Admin 👋</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
