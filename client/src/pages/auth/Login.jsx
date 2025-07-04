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
    if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (form.password.length < 6)
      newErrors.password = "Password must be 6+ characters";
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
    <div className="min-h-screen flex items-center justify-center bg-[#E6E9F5] dark:bg-[#181818] transition duration-300 px-4">
      <Card className="w-full max-w-md shadow-xl border border-[#D6CEFA] dark:border-[#333333]">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-[#0A1A4A] dark:text-[#7F5AF0]">
            Login to HireWave
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="bg-white dark:bg-[#282828] border border-[#1A3A8F] text-[#2D3748] dark:text-white"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="bg-white dark:bg-[#282828] border border-[#1A3A8F] text-[#2D3748] dark:text-white"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#7F5AF0] hover:bg-[#5A3DF0] text-white font-semibold transition-transform duration-200 hover:scale-[1.02]"
            >
              Login
            </Button>
          </form>

          {/* Extra Links */}
          <div className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300 space-y-3">
            <div
              onClick={() => navigate("/register")}
              className="font-semibold text-[#7F5AF0] dark:text-[#B5A9FF] cursor-pointer hover:text-[#5A3DF0] transition-all duration-200 hover:scale-105"
            >
              ➕ Don’t have an account?{" "}
              <span className="font-bold">Register here</span>
            </div>

            <div
              onClick={() => navigate("/")}
              className="font-semibold text-gray-600 dark:text-gray-400 cursor-pointer hover:text-blue-600 transition-all duration-200 hover:scale-105"
            >
              ⬅ Back to Home
            </div>

            <div
              onClick={() => navigate("/forgot-password")}
              className="font-semibold text-[#7F5AF0] dark:text-[#B5A9FF] cursor-pointer hover:text-[#5A3DF0] transition-all duration-200 hover:scale-105"
            >
              🔑 Forgot password?
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
