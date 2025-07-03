


// import React, { useEffect, useState } from "react";
// import API from "../../services/api";
// import { toast } from "react-toastify";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "@/components/ui/card";

// export default function MyProfile() {
//   const [profile, setProfile] = useState(null);
//   const [previewPic, setPreviewPic] = useState(null);
//   const [form, setForm] = useState({
//     qualification: "",
//     experience: "",
//     location: "",
//     profilePic: null,
//   });

//   const fetchProfile = async () => {
//     try {
//       const res = await API.get("/auth/profile");
//       setProfile(res.data.user);
//       setForm({
//         qualification: res.data.user.qualification || "",
//         experience: res.data.user.experience || "",
//         location: res.data.user.location || "",
//         profilePic: null,
//       });
//     } catch (err) {
//       toast.error("Failed to fetch profile.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       const file = files[0];
//       if (name === "profilePic") {
//         setPreviewPic(URL.createObjectURL(file));
//       }
//       setForm((prev) => ({ ...prev, [name]: file }));
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = new FormData();
//       data.append("qualification", form.qualification);
//       data.append("experience", form.experience);
//       data.append("location", form.location);
//       if (form.profilePic) data.append("profilePic", form.profilePic);

//       await API.put("/auth/profile", data);
//       toast.success("Profile updated successfully");
//       fetchProfile();
//       setPreviewPic(null);
//     } catch (err) {
//       toast.error("Failed to update profile.");
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   if (!profile) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4 text-[#0A1A4A]">My Profile</h2>

//       <form
//         onSubmit={handleSubmit}
//         className="grid gap-4 max-w-4xl md:grid-cols-2"
//       >
//         <Card className="bg-[#E6E9F5] col-span-2 shadow-md">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-lg text-[#0A1A4A]">
//               Personal Information
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="grid gap-4 md:grid-cols-2">
//             <div className="flex flex-col items-start md:col-span-2 gap-2">
//               <label className="text-sm font-medium text-[#2D3748]">
//                 Profile Picture
//               </label>
//               <div className="flex items-center gap-4">
//                 <img
//                   src={
//                     previewPic
//                       ? previewPic
//                       : profile.profilePic || "/default-avatar.png"
//                   }
//                   alt="Profile Preview"
//                   className="w-20 h-20 rounded-full object-cover border border-[#1A3A8F]"
//                 />
//                 <Input
//                   type="file"
//                   name="profilePic"
//                   accept="image/*"
//                   onChange={handleChange}
//                   className="text-sm"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="text-sm font-medium text-[#2D3748]">Full Name</label>
//               <Input
//                 value={profile.name}
//                 readOnly
//                 className="h-9 text-sm bg-gray-100 border border-[#1A3A8F]"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium text-[#2D3748]">Email</label>
//               <Input
//                 type="email"
//                 value={profile.email}
//                 readOnly
//                 className="h-9 text-sm bg-gray-100 border border-[#1A3A8F]"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium text-[#2D3748]">Mobile</label>
//               <Input
//                 type="text"
//                 value={profile.mobile}
//                 readOnly
//                 className="h-9 text-sm bg-gray-100 border border-[#1A3A8F]"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium text-[#2D3748]">
//                 Qualification
//               </label>
//               <Input
//                 name="qualification"
//                 value={form.qualification}
//                 onChange={handleChange}
//                 required
//                 className="h-9 text-sm border border-[#1A3A8F] focus:border-[#7F5AF0] focus:ring-2 focus:ring-[#7F5AF0]"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium text-[#2D3748]">Experience</label>
//               <select
//                 name="experience"
//                 value={form.experience}
//                 onChange={handleChange}
//                 className="h-9 w-full text-sm border border-[#1A3A8F] rounded focus:border-[#7F5AF0] focus:ring-2 focus:ring-[#7F5AF0]"
//               >
//                 <option value="">Select</option>
//                 <option value="Fresher">Fresher</option>
//                 <option value="1-2 years">1-2 years</option>
//                 <option value="3-5 years">3-5 years</option>
//                 <option value="5+ years">5+ years</option>
//               </select>
//             </div>

//             <div>
//               <label className="text-sm font-medium text-[#2D3748]">Location</label>
//               <Input
//                 name="location"
//                 value={form.location}
//                 onChange={handleChange}
//                 required
//                 className="h-9 text-sm border border-[#1A3A8F] focus:border-[#7F5AF0] focus:ring-2 focus:ring-[#7F5AF0]"
//               />
//             </div>
//           </CardContent>
//         </Card>

//         <Button
//           type="submit"
//           className="mt-2 col-span-2 h-9 bg-[#1A3A8F] text-white hover:bg-[#0A1A4A] text-sm"
//         >
//           Update Profile
//         </Button>
//       </form>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // ✅ Import Skeleton

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [previewPic, setPreviewPic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    qualification: "",
    experience: "",
    location: "",
    profilePic: null,
  });

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setProfile(res.data.user);
      setForm({
        qualification: res.data.user.qualification || "",
        experience: res.data.user.experience || "",
        location: res.data.user.location || "",
        profilePic: null,
      });
    } catch (err) {
      toast.error("Failed to fetch profile.");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed.");
        return;
      }
      const previewURL = URL.createObjectURL(file);
      setPreviewPic(previewURL);
      setForm((prev) => ({ ...prev, [name]: file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("qualification", form.qualification);
      data.append("experience", form.experience);
      data.append("location", form.location);
      if (form.profilePic) data.append("profilePic", form.profilePic);

      await API.put("/auth/profile", data);
      toast.success("Profile updated successfully");
      await fetchProfile();
      setPreviewPic(null);
    } catch (err) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    return () => {
      if (previewPic) URL.revokeObjectURL(previewPic);
    };
  }, [previewPic]);

  // ✅ Show Skeleton loader if profile is not yet loaded
  if (!profile) {
    return (
      <div className="p-6 max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4 text-[#0A1A4A]">
          My Profile
        </h2>
        <Card className="bg-[#E6E9F5] shadow-md p-4">
          <CardHeader>
            <CardTitle className="text-lg text-[#0A1A4A]">
              <Skeleton className="h-6 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-4 md:col-span-2">
              <Skeleton className="w-20 h-20 rounded-full" />
              <Skeleton className="h-9 w-64" />
            </div>
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <div className="flex flex-col items-start md:col-span-2 gap-2">
              <label className="text-sm font-medium text-[#2D3748]">
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                <img
                  src={
                    previewPic
                      ? previewPic
                      : profile.profilePic || "/default-avatar.png"
                  }
                  alt="Profile Preview"
                  className="w-20 h-20 rounded-full object-cover border border-[#1A3A8F]"
                />
                <Input
                  type="file"
                  name="profilePic"
                  accept="image/*"
                  onChange={handleChange}
                  className="text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[#2D3748]">Full Name</label>
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
              <label className="text-sm font-medium text-[#2D3748]">Experience</label>
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
              <label className="text-sm font-medium text-[#2D3748]">Location</label>
              <Input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className="h-9 text-sm border border-[#1A3A8F] focus:border-[#7F5AF0] focus:ring-2 focus:ring-[#7F5AF0]"
              />
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          disabled={loading}
          className="mt-2 col-span-2 h-9 bg-[#1A3A8F] text-white hover:bg-[#0A1A4A] text-sm disabled:opacity-70"
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </div>
  );
}
