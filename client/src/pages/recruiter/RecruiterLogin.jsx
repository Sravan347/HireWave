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
    <div className="min-h-screen bg-[#E6E9F5] dark:bg-[#181818] flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1e1e1e] p-8 rounded-xl shadow-lg border border-[#D6CEFA] dark:border-[#333333] space-y-6">
        <h2 className="text-2xl font-bold text-center text-[#0A1A4A] dark:text-[#7F5AF0]">
          Recruiter Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#1A3A8F] rounded text-sm dark:bg-[#2a2a2a] dark:text-white focus:ring-2 focus:ring-[#7F5AF0]"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#1A3A8F] rounded text-sm dark:bg-[#2a2a2a] dark:text-white focus:ring-2 focus:ring-[#7F5AF0]"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#7F5AF0] hover:bg-[#5A3DF0] text-white font-semibold py-2 rounded transition duration-200 hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        {/* Register & Landing Links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-700 dark:text-gray-300 mt-2 gap-2">
          <div
            onClick={() => navigate("/recruiter/register")}
            className="cursor-pointer font-semibold text-[#7F5AF0] hover:text-[#5A3DF0] transition duration-200 hover:scale-105"
          >
            📋 Don't have an account? <span className="font-bold">Register</span>
          </div>
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 transition duration-200 hover:scale-105"
          >
            ⬅ Back to <span className="font-bold">Home</span>
          </div>
        </div>
      </div>
    </div>
  );
}