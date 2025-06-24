import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

      // ✅ Save token or full user info
      localStorage.setItem("token", data.token);
      // Optional: Save user data
      localStorage.setItem("user", JSON.stringify(data));

      // ✅ Redirect based on role
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
    <div className="min-h-screen bg-[#F3F4F6] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md animate-fade-in space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-[#2563EB]">Login</h2>

        <div>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="input w-full px-3 py-2 border border-gray-300 rounded"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="input w-full px-3 py-2 border border-gray-300 rounded"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white py-2 rounded hover:shadow-lg transition duration-200 ease-in-out cursor-pointer hover:brightness-110"
        >
          Login
        </button>
      </form>
    </div>
  );
}
