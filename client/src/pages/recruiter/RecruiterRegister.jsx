import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    let isValid = true;
    Object.keys(form).forEach((key) => {
      validateField(key, form[key]);
      if (errors[key]) isValid = false;
    });

    if (!isValid) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setIsSubmitting(true);
    try {
      await API.post("/auth/register", form);
      toast.success("Registered successfully! Await admin approval.");
      navigate("/recruiter/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E6E9F5] dark:bg-[#181818] flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white dark:bg-[#1e1e1e] border border-[#D6CEFA] dark:border-[#333] p-8 rounded-xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-[#0A1A4A] dark:text-[#7F5AF0]">
          Recruiter Registration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
            <div key={name} className="flex flex-col">
              {isSubmitting ? (
                <Skeleton className="h-10 w-full rounded" />
              ) : (
                <>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={handleChange}
                    className="w-full h-10 px-3 text-sm rounded border border-[#1A3A8F] dark:bg-[#2a2a2a] dark:text-white focus:ring-2 focus:ring-[#7F5AF0] transition"
                  />
                  {errors[name] && (
                    <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
                  )}
                </>
              )}
            </div>
          ))}

          {/* Company Type Dropdown */}
          <div className="md:col-span-2">
            {isSubmitting ? (
              <Skeleton className="h-10 w-full rounded" />
            ) : (
              <select
                name="companyType"
                value={form.companyType}
                onChange={handleChange}
                className="w-full h-10 text-sm border border-[#1A3A8F] rounded px-2 dark:bg-[#2a2a2a] dark:text-white focus:ring-2 focus:ring-[#7F5AF0]"
              >
                <option value="">Select Company Type</option>
                <option value="Startup">Startup</option>
                <option value="MNC">MNC</option>
                <option value="Government">Government</option>
                <option value="NGO">NGO</option>
                <option value="Other">Other</option>
              </select>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#7F5AF0] hover:bg-[#5A3DF0] text-white py-2 text-base font-semibold transition"
        >
          {isSubmitting ? "Submitting..." : "Register"}
        </Button>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-700 dark:text-gray-300 gap-2 pt-4">
          <span
            onClick={() => navigate("/recruiter/login")}
            className="cursor-pointer font-semibold text-[#7F5AF0] hover:text-[#5A3DF0] transition hover:scale-105"
          >
            🔐 Already registered? <b>Login</b>
          </span>
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 transition hover:scale-105"
          >
            ⬅ Back to <b>Home</b>
          </span>
        </div>
      </form>
    </div>
  );
}
