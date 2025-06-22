import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function RecruiterRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
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
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!form.name.match(/^[a-zA-Z ]+$/)) newErrors.name = "Only letters allowed";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
    if (form.password.length < 6) newErrors.password = "Min 6 characters";
    if (!form.companyName) newErrors.companyName = "Required";
    if (!form.designation) newErrors.designation = "Required";
    if (form.mobile.length !== 10 || !/^\d+$/.test(form.mobile))
      newErrors.mobile = "Enter a valid 10-digit number";
    if (!/^[0-9A-Z]{15}$/.test(form.gstNumber))
      newErrors.gstNumber = "Must be 15 characters (e.g., GSTIN)";
    if (form.website && !/^https?:\/\/.+\..+/.test(form.website))
      newErrors.website = "Enter a valid URL";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await API.post("/auth/register", form);
      alert("Registered successfully! Await admin approval.");
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Registration error.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl animate-fade-in space-y-4"
      >
        <h2 className="text-2xl font-bold text-[#2563EB] text-center mb-4">Recruiter Registration</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <input name="name" placeholder="Full Name" onChange={handleChange} className="input" />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <input name="email" placeholder="Email" onChange={handleChange} className="input" />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          {/* Mobile Number */}
          <div>
            <input
              name="mobile"
              placeholder="Mobile Number"
              maxLength={10}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) setForm({ ...form, mobile: value });
              }}
              className="input"
            />
            {errors.mobile && <p className="text-sm text-red-500">{errors.mobile}</p>}
          </div>

          {/* Company Name */}
          <div>
            <input name="companyName" placeholder="Company Name" onChange={handleChange} className="input" />
            {errors.companyName && <p className="text-sm text-red-500">{errors.companyName}</p>}
          </div>

          {/* GST Number */}
          <div>
            <input name="gstNumber" placeholder="GST Number" onChange={handleChange} className="input" />
            {errors.gstNumber && <p className="text-sm text-red-500">{errors.gstNumber}</p>}
          </div>

          {/* Designation */}
          <div>
            <input name="designation" placeholder="Your Designation" onChange={handleChange} className="input" />
            {errors.designation && <p className="text-sm text-red-500">{errors.designation}</p>}
          </div>

          {/* Website (Optional) */}
          <div>
            <input name="website" placeholder="Company Website (optional)" onChange={handleChange} className="input" />
            {errors.website && <p className="text-sm text-red-500">{errors.website}</p>}
          </div>

          {/* Location */}
          <div>
            <input name="location" placeholder="Company Location" onChange={handleChange} className="input" />
          </div>

          {/* Company Type */}
          <div>
            <select name="companyType" onChange={handleChange} className="input">
              <option value="">Select Company Type</option>
              <option value="Startup">Startup</option>
              <option value="MNC">MNC</option>
              <option value="Government">Government</option>
              <option value="NGO">NGO</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-[#2563EB] text-white py-2 rounded hover:bg-[#3B82F6] transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
