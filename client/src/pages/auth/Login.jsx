import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../services/api";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email";
    if (form.password.length < 6) newErrors.password = "Password must be 6+ characters";
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
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      if (data.role === "candidate") {
        navigate("/candidate/dashboard");
      } else if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        toast.error("Recruiters must login from the recruiter portal.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6E9F5] via-[#D6CEFA] to-[#B5A9FF] dark:from-[#181818] dark:via-[#232347] dark:to-[#181818] transition duration-300 px-4 relative overflow-hidden">
      {/* Decorative floating cube */}
      <div className="hidden md:block absolute -top-16 -left-16 w-64 h-64 z-0 opacity-30 rotate-12">
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#7F5AF0] via-[#4C6EF5] to-[#0A1A4A] shadow-2xl" style={{ filter: 'blur(2px)' }}></div>
      </div>
      <Card className="w-full max-w-md shadow-2xl border border-[#D6CEFA] dark:border-[#333333] rounded-2xl backdrop-blur-md bg-white/80 dark:bg-[#232347]/80 hover:shadow-[0_8px_32px_0_rgba(89,54,217,0.18)] transition-all duration-300 z-10">
        <CardHeader>
          {/* Accent bar */}
          <div className="flex justify-center mb-2">
            <span className="inline-block w-16 h-1 rounded-full bg-[#7F5AF0]"></span>
          </div>
          <CardTitle className="text-center text-3xl font-extrabold text-[#0A1A4A] dark:text-[#7F5AF0] tracking-tight">
            Login to HireWave
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="bg-white/90 dark:bg-[#282828] border border-[#1A3A8F] focus:border-[#7F5AF0] focus:ring-2 focus:ring-[#7F5AF0] text-[#2D3748] dark:text-white placeholder-[#7F5AF0] rounded-full px-4 py-2"
              />
              {errors.email && (
                <p className="text-sm text-[#F4A261] mt-1 font-semibold">{errors.email}</p>
              )}
            </div>

            <div>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="bg-white/90 dark:bg-[#282828] border border-[#1A3A8F] focus:border-[#7F5AF0] focus:ring-2 focus:ring-[#7F5AF0] text-[#2D3748] dark:text-white placeholder-[#7F5AF0] rounded-full px-4 py-2"
              />
              {errors.password && (
                <p className="text-sm text-[#F4A261] mt-1 font-semibold">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#7F5AF0] to-[#5A3DF0] hover:from-[#5A3DF0] hover:to-[#7F5AF0] text-white font-bold rounded-full py-2 text-lg shadow-md transition-transform duration-200 hover:scale-[1.03]"
            >
              Login
            </Button>
          </form>

          {/* Extra Links */}
          <div className="mt-7 text-center text-base text-[#2D3748] dark:text-gray-300 space-y-3">
            <div
              onClick={() => navigate("/register")}
              className="font-bold text-[#7F5AF0] dark:text-[#B5A9FF] cursor-pointer hover:text-[#5A3DF0] transition-all duration-200 hover:scale-105"
            >
              ➕ Don't have an account? <span className="font-extrabold">Register here</span>
            </div>

            <div
              onClick={() => navigate("/")}
              className="font-semibold text-[#1A3A8F] dark:text-[#B5A9FF] cursor-pointer hover:text-[#0A1A4A] transition-all duration-200 hover:scale-105"
            >
              ⬅ Back to Home
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Decorative wave at the bottom */}
      <div className="absolute bottom-0 left-0 w-full z-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16">
          <path fill="#E6E9F5" fillOpacity="1" d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,37.3C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"></path>
        </svg>
      </div>
    </div>
  );
}
