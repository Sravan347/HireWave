import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import {
  Input
} from "@/components/ui/input";
import {
  Button
} from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    qualification: "",
    experience: "",
    location: "",
    resume: null,
  });

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setProfile(res.data.user);
      setForm({
        qualification: res.data.user.qualification || "",
        experience: res.data.user.experience || "",
        location: res.data.user.location || "",
        resume: null,
      });
    } catch (err) {
      toast.error("Failed to fetch profile.");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("qualification", form.qualification);
      data.append("experience", form.experience);
      data.append("location", form.location);
      if (form.resume) data.append("resume", form.resume);

      await API.put("/auth/profile", data);
      toast.success("Profile updated successfully");
      fetchProfile();
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-[#0A1A4A]">My Profile</h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 max-w-4xl md:grid-cols-2"
      >
        <Card className="bg-[#E6E9F5] col-span-2 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-[#0A1A4A]">
              Personal Information
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-[#2D3748]">
                Full Name
              </label>
              <Input
                value={profile.name}
                readOnly
                className="h-9 text-sm bg-gray-100 border border-[#1A3A8F]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#2D3748]">Email</label>
              <Input
                type="email"
                value={profile.email}
                readOnly
                className="h-9 text-sm bg-gray-100 border border-[#1A3A8F]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#2D3748]">Mobile</label>
              <Input
                type="text"
                value={profile.mobile}
                readOnly
                className="h-9 text-sm bg-gray-100 border border-[#1A3A8F]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#2D3748]">
                Qualification
              </label>
              <Input
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
                required
                className="h-9 text-sm border border-[#1A3A8F] focus:border-[#7F5AF0] focus:ring-2 focus:ring-[#7F5AF0]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#2D3748]">
                Experience
              </label>
              <select
                name="experience"
                value={form.experience}
                onChange={handleChange}
                className="h-9 w-full text-sm border border-[#1A3A8F] rounded focus:border-[#7F5AF0] focus:ring-2 focus:ring-[#7F5AF0]"
              >
                <option value="">Select</option>
                <option value="Fresher">Fresher</option>
                <option value="1-2 years">1-2 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-[#2D3748]">
                Location
              </label>
              <Input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className="h-9 text-sm border border-[#1A3A8F] focus:border-[#7F5AF0] focus:ring-2 focus:ring-[#7F5AF0]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-[#2D3748]">
                Upload Resume
              </label>
              <Input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="h-9 text-sm border border-[#1A3A8F] focus:border-[#7F5AF0] focus:ring-2 focus:ring-[#7F5AF0]"
              />
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="mt-2 col-span-2 h-9 bg-[#1A3A8F] text-white hover:bg-[#0A1A4A] text-sm"
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
}
