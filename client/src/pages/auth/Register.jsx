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
    <div className="min-h-screen bg-[#E6E9F5] dark:bg-[#181818] px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image */}
        <div className="hidden md:flex justify-center items-center">
          <img
            src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAzL2ZyZWVpbWFnZXNjb21wYW55X3Bob3RvX29mX3lvdW5nX2luZGlhbl9naXJsX2hvbGRpbmdfc3R1ZGVudF9iYV8zN2QyNjU4Yi0yOWIwLTQyZmQtODhmYy04OGU3ZTcxYmVlNDcucG5n.png"
            alt="Register illustration"
            className="w-full max-w-md object-contain"
          />
        </div>

        {/* Form Card */}
        <Card className="shadow-lg bg-white dark:bg-[#1e1e1e] border border-[#D6CEFA] dark:border-[#333333] w-full">
          <CardHeader>
            <CardTitle className="text-center text-[#0A1A4A] dark:text-[#7F5AF0] text-2xl font-bold">
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
                    className="h-9 text-sm border border-[#1A3A8F] focus:border-[#7F5AF0] focus:ring-[#7F5AF0] dark:bg-[#2a2a2a] dark:text-white"
                  />
                  {errors[field.name] && (
                    <p className="text-sm text-red-500 mt-1">
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
                  className="w-full h-9 text-sm border border-[#1A3A8F] rounded px-2 focus:ring-2 focus:ring-[#7F5AF0] dark:bg-[#2a2a2a] dark:text-white"
                >
                  <option value="">Select Qualification</option>
                  <option value="PG">Post Graduate</option>
                  <option value="UG">Under Graduate</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Secondary Education">Secondary Education</option>
                </select>
                {errors.qualification && (
                  <p className="text-sm text-red-500 mt-1">
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
                  className="w-full h-9 text-sm border border-[#1A3A8F] rounded px-2 focus:ring-2 focus:ring-[#7F5AF0] dark:bg-[#2a2a2a] dark:text-white"
                >
                  <option value="">Are you a Fresher or Experienced?</option>
                  <option value="Fresher">Fresher</option>
                  <option value="Experienced">Experienced</option>
                </select>
                {errors.experience && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.experience}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="col-span-1 md:col-span-2 mt-4">
                <Button
                  type="submit"
                  className="w-full bg-[#7F5AF0] hover:bg-[#5A3DF0] text-white text-sm transition-transform duration-200 hover:scale-[1.02]"
                >
                  Register
                </Button>
              </div>
            </form>

            {/* Links */}
            <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <div
                onClick={() => navigate("/login")}
                className="cursor-pointer font-semibold text-[#7F5AF0] hover:text-[#5A3DF0] transition duration-200 hover:scale-105"
              >
                🔐 Already have an account? <span className="font-bold">Login</span>
              </div>
              <div
                onClick={() => navigate("/")}
                className="cursor-pointer font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 transition duration-200 hover:scale-105"
              >
                ⬅ Back to Home
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
