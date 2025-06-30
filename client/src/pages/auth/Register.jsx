import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


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

    // Final validation before submission
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
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-[#2563EB] mb-6">
        Candidate Registration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <input
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
          )}
        </div>

        {/* Age */}
        <div>
          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
          )}
        </div>

        {/* Place */}
        <div>
          <input
            name="place"
            placeholder="Place"
            value={form.place}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.place && (
            <p className="text-red-500 text-sm mt-1">{errors.place}</p>
          )}
        </div>

        {/* Qualification */}
        <div>
          <select
            name="qualification"
            value={form.qualification}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select Qualification</option>
            <option value="PG">Post Graduate</option>
            <option value="UG">Under Graduate</option>
            <option value="Diploma">Diploma</option>
            <option value="Secondary Education">Secondary Education</option>
          </select>
          {errors.qualification && (
            <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>
          )}
        </div>

        {/* Experience */}
        <div>
          <select
            name="experience"
            value={form.experience}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Are you a Fresher or Experienced?</option>
            <option value="Fresher">Fresher</option>
            <option value="Experienced">Experienced</option>
          </select>
          {errors.experience && (
            <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white py-2 rounded hover:shadow-lg transition duration-200 ease-in-out cursor-pointer hover:brightness-110"
        >
          Register
        </button>
      </form>
    </div>
  );
}
