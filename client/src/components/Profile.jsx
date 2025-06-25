import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const isResume = !!user?.profile?.resume;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white shadow-md border border-gray-200 rounded-2xl my-8 p-8">
        {/* Top Profile Section */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-5">
            <Avatar className="h-24 w-24 ring-2 ring-gray-300">
              <AvatarImage
                src={user?.profile?.profilePhoto || "/default-avatar.png"}
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-semibold text-2xl text-gray-800">
                {user?.fullname || "Unnamed"}
              </h1>
              <p className="text-sm text-gray-500">
                {user?.profile?.bio || "No bio provided."}
              </p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant="outline" size="sm">
            <Pen className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-6 space-y-3 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <span>{user?.email || "No email provided"}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="w-5 h-5 text-gray-500" />
            <span>{user?.phoneNumber || "No phone number provided"}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="my-6">
          <h2 className="font-semibold text-lg mb-2 text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, index) => (
                <Badge key={index} className="text-sm">
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/*  Education */}

        <div className="my-6">
          <h2 className="font-semibold text-lg mb-2 text-gray-800">
            Education
          </h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.education?.length > 0 ? (
              user.profile.education.map((edu, index) => (
                <Badge key={index} className="text-sm">
                  {edu}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500 text-sm">NA</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="my-6">
          <Label className="text-md font-semibold">Resume</Label>
          <div className="mt-1">
            {isResume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={user.profile.resume}
                className="text-blue-600 hover:underline break-all text-sm"
              >
                {user.profile.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-500 text-sm">NA</span>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 mb-10">
        <h2 className="font-bold text-lg mb-4 text-gray-800">Applied Jobs</h2>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
