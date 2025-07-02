import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RecruiterRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    companyName: "",
    gstNumber: "",
    designation: "",
    website: "",
    location: "",
    companyType: "",
    role: "recruiter",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!/^[a-zA-Z ]*$/.test(value)) error = "Name can only contain letters";
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email format";
        break;
      case "password":
        if (value.length < 6) error = "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (value !== form.password) error = "Passwords do not match";
        break;
      case "mobile":
        if (!/^\d{0,10}$/.test(value)) error = "Mobile must be 10 digits";
        break;
      case "companyName":
        if (!value) error = "Company name is required";
        break;
      case "designation":
        if (!value) error = "Designation is required";
        break;
      case "gstNumber":
        if (!/^[0-9A-Z]{0,15}$/.test(value)) error = "Must be 15 characters (GSTIN)";
        break;
      case "website":
        if (value && !/^https?:\/\/.+\..+/.test(value)) error = "Invalid URL";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile" && value.length > 10) return;
    if (name === "gstNumber" && value.length > 15) return;

    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    let isValid = true;
    Object.keys(form).forEach((key) => {
      validateField(key, form[key]);
      if (errors[key]) isValid = false;
    });

    if (!isValid) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      await API.post("/auth/register", form);
      toast.success("Registered successfully! Await admin approval.");
      navigate("/recruiter/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6E9F5] via-[#D6CEFA] to-[#B5A9FF] dark:from-[#181818] dark:via-[#232347] dark:to-[#181818] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Decorative floating cube */}
      <div className="hidden md:block absolute -top-16 -left-16 w-64 h-64 z-0 opacity-30 rotate-12">
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#7F5AF0] via-[#4C6EF5] to-[#0A1A4A] shadow-2xl" style={{ filter: 'blur(2px)' }}></div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white/80 dark:bg-[#232347]/80 border border-[#D6CEFA] dark:border-[#333] p-8 rounded-2xl shadow-2xl backdrop-blur-md hover:shadow-[0_8px_32px_0_rgba(89,54,217,0.18)] transition-all duration-300 z-10"
      >
        {/* Accent bar and header */}
        <div className="flex flex-col items-center mb-4">
          <span className="inline-block w-16 h-1 rounded-full bg-[#7F5AF0] mb-2"></span>
          <h2 className="text-3xl font-extrabold text-center text-[#0A1A4A] dark:text-[#7F5AF0] tracking-tight">
            Recruiter Registration
          </h2>
        </div>

        {[
          ["name", "Full Name"],
          ["email", "Email"],
          ["password", "Password", "password"],
          ["confirmPassword", "Confirm Password", "password"],
          ["mobile", "Mobile Number"],
          ["companyName", "Company Name"],
          ["gstNumber", "GST Number (15-characters)"],
          ["designation", "Designation"],
          ["website", "Company Website (URL)"],
          ["location", "Company Location"],
        ].map(([name, placeholder, type = "text"]) => (
          <div key={name}>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={form[name]}
              onChange={handleChange}
              className="w-full h-10 px-4 text-base rounded-full border border-[#1A3A8F] dark:bg-[#2a2a2a] dark:text-white focus:ring-2 focus:ring-[#7F5AF0] placeholder-[#7F5AF0] text-[#2D3748] transition"
            />
            {errors[name] && (
              <p className="text-sm text-[#F4A261] mt-1 font-semibold">{errors[name]}</p>
            )}
          </div>
        ))}

        {/* Company Type Dropdown */}
        <div>
          <select
            name="companyType"
            value={form.companyType}
            onChange={handleChange}
            className="w-full h-10 text-base border border-[#1A3A8F] rounded-full px-4 dark:bg-[#2a2a2a] dark:text-white focus:ring-2 focus:ring-[#7F5AF0] placeholder-[#7F5AF0]"
          >
            <option value="">Select Company Type</option>
            <option value="Startup">Startup</option>
            <option value="MNC">MNC</option>
            <option value="Government">Government</option>
            <option value="NGO">NGO</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#7F5AF0] to-[#5A3DF0] hover:from-[#5A3DF0] hover:to-[#7F5AF0] text-white font-bold rounded-full py-2 text-lg shadow-md transition-transform duration-200 hover:scale-[1.03]"
        >
          Register
        </button>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-base text-[#2D3748] dark:text-gray-300 gap-2 pt-4">
          <span
            onClick={() => navigate("/recruiter/login")}
            className="cursor-pointer font-bold text-[#7F5AF0] hover:text-[#5A3DF0] transition hover:scale-105"
          >
            🔐 Already registered? <span className="font-extrabold">Login</span>
          </span>
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer font-semibold text-[#1A3A8F] hover:text-[#0A1A4A] transition hover:scale-105"
          >
            ⬅ Back to <span className="font-extrabold">Home</span>
          </span>
        </div>
      </form>
      {/* Decorative wave at the bottom */}
      <div className="absolute bottom-0 left-0 w-full z-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16">
          <path fill="#E6E9F5" fillOpacity="1" d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,37.3C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"></path>
        </svg>
      </div>
    </div>
  );
}
