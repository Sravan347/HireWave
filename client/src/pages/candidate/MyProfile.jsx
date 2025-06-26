import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

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
      fetchProfile(); // refresh
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
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            value={profile.name}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={profile.email}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Mobile</label>
          <input
            type="text"
            value={profile.mobile}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Qualification</label>
          <input
            name="qualification"
            value={form.qualification}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Experience</label>
          <select
            name="experience"
            value={form.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="Fresher">Fresher</option>
            <option value="1-2 years">1-2 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5+ years">5+ years</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Upload Resume</label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
