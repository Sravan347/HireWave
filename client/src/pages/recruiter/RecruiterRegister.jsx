import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RecruiterRegister() {
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
      toast.success("Registered successfully! Await admin approval.");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration error.");
    }
  };

  return (
    <div className="min-h-screen bg-[#E6E9F5] flex justify-center items-center px-4">
      <Card className="w-full max-w-3xl animate-fade-in shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-[#1A3A8F]">
            Recruiter Registration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input name="name" placeholder="Full Name" onChange={handleChange} />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <Input name="email" placeholder="Email" onChange={handleChange} />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
              </div>
              <div>
                <Input
                  name="mobile"
                  placeholder="Mobile Number"
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) setForm({ ...form, mobile: value });
                  }}
                />
                {errors.mobile && <p className="text-sm text-red-500 mt-1">{errors.mobile}</p>}
              </div>
              <div>
                <Input name="companyName" placeholder="Company Name" onChange={handleChange} />
                {errors.companyName && <p className="text-sm text-red-500 mt-1">{errors.companyName}</p>}
              </div>
              <div>
                <Input name="gstNumber" placeholder="GST Number" onChange={handleChange} />
                {errors.gstNumber && <p className="text-sm text-red-500 mt-1">{errors.gstNumber}</p>}
              </div>
              <div>
                <Input name="designation" placeholder="Your Designation" onChange={handleChange} />
                {errors.designation && <p className="text-sm text-red-500 mt-1">{errors.designation}</p>}
              </div>
              <div>
                <Input name="website" placeholder="Company Website (optional)" onChange={handleChange} />
                {errors.website && <p className="text-sm text-red-500 mt-1">{errors.website}</p>}
              </div>
              <div>
                <Input name="location" placeholder="Company Location" onChange={handleChange} />
              </div>
              <div>
                <select name="companyType" onChange={handleChange} className="input w-full px-3 py-2 border rounded">
                  <option value="">Select Company Type</option>
                  <option value="Startup">Startup</option>
                  <option value="MNC">MNC</option>
                  <option value="Government">Government</option>
                  <option value="NGO">NGO</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#7F5AF0] hover:bg-[#5A3DF0] text-white"
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
