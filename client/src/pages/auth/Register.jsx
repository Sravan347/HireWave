import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CandidateRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    age: "",
    place: "",
    qualification: "",
    experience: "",
    role: "candidate",
  });

  const [errors, setErrors] = useState({});

  const validate = (field, value) => {
    let err = "";

    switch (field) {
      case "name":
        if (!value.trim()) err = "Name is required.";
        else if (/\d/.test(value)) err = "Name cannot contain numbers.";
        break;
      case "email":
        if (!value.trim()) err = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(value)) err = "Enter a valid email.";
        break;
      case "password":
        if (value.length < 6) err = "Password must be at least 6 characters.";
        break;
      case "confirmPassword":
        if (value !== form.password) err = "Passwords do not match.";
        break;
      case "mobile":
        if (!/^\d{10}$/.test(value)) err = "Mobile must be 10 digits.";
        break;
      case "age":
        if (!value) err = "Age is required.";
        else if (value < 18 || value > 60)
          err = "Age must be between 18 and 60.";
        break;
      case "place":
        if (!value.trim()) err = "Place is required.";
        break;
      case "qualification":
        if (!value) err = "Qualification is required.";
        break;
      case "experience":
        if (!value) err = "Select experience level.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allFields = Object.keys(form);
    let valid = true;
    allFields.forEach((key) => {
      validate(key, form[key]);
      if (!form[key] || errors[key]) valid = false;
    });

    if (!valid) {
      toast("Please fix the errors before submitting.");
      return;
    }

    try {
      const { data } = await API.post("/auth/register", {
        ...form,
        age: parseInt(form.age),
      });
      localStorage.setItem("token", data.token);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6E9F5] via-[#D6CEFA] to-[#B5A9FF] dark:from-[#181818] dark:via-[#232347] dark:to-[#181818] px-4 py-8 flex items-center justify-center relative overflow-hidden">
      {/* Decorative floating cube */}
      <div className="hidden md:block absolute -top-16 -left-16 w-64 h-64 z-0 opacity-30 rotate-12">
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#7F5AF0] via-[#4C6EF5] to-[#0A1A4A] shadow-2xl" style={{ filter: 'blur(2px)' }}></div>
      </div>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10">
        {/* Image */}
        <div className="hidden md:flex justify-center items-center relative">
          {/* Soft background shape */}
          <div className="absolute inset-0 flex justify-center items-center z-0">
            <div className="w-80 h-80 rounded-3xl bg-gradient-to-br from-[#D6CEFA] via-[#B5A9FF] to-[#7F5AF0] blur-2xl opacity-60"></div>
          </div>
          {/* The image itself */}
          <img
            src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAzL2ZyZWVpbWFnZXNjb21wYW55X3Bob3RvX29mX3lvdW5nX2luZGlhbl9naXJsX2hvbGRpbmdfc3R1ZGVudF9iYV8zN2QyNjU4Yi0yOWIwLTQyZmQtODhmYy04OGU3ZTcxYmVlNDcucG5n.png"
            alt="Register illustration"
            className="relative z-10 w-72 h-72 object-cover rounded-2xl shadow-2xl border-4 border-white"
            style={{ background: "#E6E9F5" }}
          />
        </div>

        {/* Form Card */}
        <Card className="shadow-2xl bg-white/80 dark:bg-[#232347]/80 border border-[#D6CEFA] dark:border-[#333333] w-full rounded-2xl backdrop-blur-md hover:shadow-[0_8px_32px_0_rgba(89,54,217,0.18)] transition-all duration-300">
          <CardHeader>
            {/* Accent bar */}
            <div className="flex justify-center mb-2">
              <span className="inline-block w-16 h-1 rounded-full bg-[#7F5AF0]"></span>
            </div>
            <CardTitle className="text-center text-3xl font-extrabold text-[#0A1A4A] dark:text-[#7F5AF0] tracking-tight">
              Candidate Registration
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
            >
              {[
                { name: "name", type: "text", placeholder: "Full Name" },
                { name: "email", type: "email", placeholder: "Email" },
                { name: "password", type: "password", placeholder: "Password" },
                {
                  name: "confirmPassword",
                  type: "password",
                  placeholder: "Confirm Password",
                },
                { name: "mobile", type: "text", placeholder: "Mobile Number" },
                { name: "age", type: "number", placeholder: "Age" },
                { name: "place", type: "text", placeholder: "Place" },
              ].map((field) => (
                <div key={field.name}>
                  <Label className="text-[#2D3748] dark:text-white mb-2 block">
                    {field.placeholder}
                  </Label>
                  <Input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="h-10 text-base border border-[#1A3A8F] focus:border-[#7F5AF0] focus:ring-2 focus:ring-[#7F5AF0] dark:bg-[#2a2a2a] dark:text-white placeholder-[#7F5AF0] rounded-full px-4 py-2"
                  />
                  {errors[field.name] && (
                    <p className="text-sm text-[#F4A261] mt-1 font-semibold">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

              {/* Qualification */}
              <div>
                <Label className="text-[#2D3748] dark:text-white mb-2 block">
                  Qualification
                </Label>
                <select
                  name="qualification"
                  value={form.qualification}
                  onChange={handleChange}
                  className="w-full h-10 text-base border border-[#1A3A8F] rounded-full px-4 focus:ring-2 focus:ring-[#7F5AF0] dark:bg-[#2a2a2a] dark:text-white placeholder-[#7F5AF0]"
                >
                  <option value="">Select Qualification</option>
                  <option value="PG">Post Graduate</option>
                  <option value="UG">Under Graduate</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Secondary Education">Secondary Education</option>
                </select>
                {errors.qualification && (
                  <p className="text-sm text-[#F4A261] mt-1 font-semibold">
                    {errors.qualification}
                  </p>
                )}
              </div>

              {/* Experience */}
              <div>
                <Label className="text-[#2D3748] dark:text-white mb-2 block">
                  Experience
                </Label>
                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  className="w-full h-10 text-base border border-[#1A3A8F] rounded-full px-4 focus:ring-2 focus:ring-[#7F5AF0] dark:bg-[#2a2a2a] dark:text-white placeholder-[#7F5AF0]"
                >
                  <option value="">Are you a Fresher or Experienced?</option>
                  <option value="Fresher">Fresher</option>
                  <option value="Experienced">Experienced</option>
                </select>
                {errors.experience && (
                  <p className="text-sm text-[#F4A261] mt-1 font-semibold">
                    {errors.experience}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="col-span-1 md:col-span-2 mt-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#7F5AF0] to-[#5A3DF0] hover:from-[#5A3DF0] hover:to-[#7F5AF0] text-white font-bold rounded-full py-2 text-lg shadow-md transition-transform duration-200 hover:scale-[1.03]"
                >
                  Register
                </Button>
              </div>
            </form>

            {/* Links */}
            <div className="mt-7 flex flex-col md:flex-row justify-between items-center gap-2 text-base text-[#2D3748] dark:text-gray-300">
              <div
                onClick={() => navigate("/login")}
                className="cursor-pointer font-bold text-[#7F5AF0] hover:text-[#5A3DF0] transition duration-200 hover:scale-105"
              >
                🔐 Already have an account? <span className="font-extrabold">Login</span>
              </div>
              <div
                onClick={() => navigate("/")}
                className="cursor-pointer font-semibold text-[#1A3A8F] hover:text-[#0A1A4A] transition duration-200 hover:scale-105"
              >
                ⬅ Back to Home
              </div>
            </div>
          </CardContent>
        </Card>
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
