import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecruiterLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    if (form.password.length < 6) newErrors.password = "Min 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const { data } = await API.post("/auth/login", form);

      if (data.role === "recruiter") {
        localStorage.setItem("token", data.token);
        navigate("/recruiter/dashboard");
      } else {
        toast.error("Only recruiters can login here.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6E9F5] via-[#D6CEFA] to-[#B5A9FF] dark:from-[#181818] dark:via-[#232347] dark:to-[#181818] flex justify-center items-center px-4 relative overflow-hidden">
      {/* Decorative floating cube */}
      <div className="hidden md:block absolute -top-16 -left-16 w-64 h-64 z-0 opacity-30 rotate-12">
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#7F5AF0] via-[#4C6EF5] to-[#0A1A4A] shadow-2xl" style={{ filter: 'blur(2px)' }}></div>
      </div>
      <div className="w-full max-w-md bg-white/80 dark:bg-[#232347]/80 p-8 rounded-2xl shadow-2xl border border-[#D6CEFA] dark:border-[#333333] space-y-8 backdrop-blur-md hover:shadow-[0_8px_32px_0_rgba(89,54,217,0.18)] transition-all duration-300 z-10">
        {/* Accent bar and header */}
        <div className="flex flex-col items-center mb-2">
          <span className="inline-block w-16 h-1 rounded-full bg-[#7F5AF0] mb-2"></span>
          <h2 className="text-3xl font-extrabold text-center text-[#0A1A4A] dark:text-[#7F5AF0] tracking-tight">
            Recruiter Login
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 h-12 border border-[#1A3A8F] rounded-full text-base dark:bg-[#2a2a2a] dark:text-white focus:ring-2 focus:ring-[#7F5AF0] placeholder-[#7F5AF0] text-[#2D3748] transition"
            />
            {errors.email && <p className="text-sm text-[#F4A261] mt-1 font-semibold">{errors.email}</p>}
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 h-12 border border-[#1A3A8F] rounded-full text-base dark:bg-[#2a2a2a] dark:text-white focus:ring-2 focus:ring-[#7F5AF0] placeholder-[#7F5AF0] text-[#2D3748] transition"
            />
            {errors.password && (
              <p className="text-sm text-[#F4A261] mt-1 font-semibold">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#7F5AF0] to-[#5A3DF0] hover:from-[#5A3DF0] hover:to-[#7F5AF0] text-white font-bold rounded-full py-2 text-lg shadow-md transition-transform duration-200 hover:scale-[1.03]"
          >
            Login
          </button>
        </form>
        {/* Register & Landing Links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-base text-[#2D3748] dark:text-gray-300 mt-2 gap-2">
          <div
            onClick={() => navigate("/recruiter/register")}
            className="cursor-pointer font-bold text-[#7F5AF0] hover:text-[#5A3DF0] transition duration-200 hover:scale-105"
          >
            📋 Don't have an account? <span className="font-extrabold">Register</span>
          </div>
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer font-semibold text-[#1A3A8F] hover:text-[#0A1A4A] transition duration-200 hover:scale-105"
          >
            ⬅ Back to <span className="font-extrabold">Home</span>
          </div>
        </div>
      </div>
      {/* Decorative wave at the bottom */}
      <div className="absolute bottom-0 left-0 w-full z-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16">
          <path fill="#E6E9F5" fillOpacity="1" d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,37.3C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"></path>
        </svg>
      </div>
    </div>
  );
}