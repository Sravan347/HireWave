
const User = require("../models/User");

//  Get all recruiters
const getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await User.find({ role: "recruiter" }).select("-password");
    res.status(200).json(recruiters);
  } catch (error) {
    console.error("Error fetching recruiters:", error);
    res.status(500).json({ message: "Failed to fetch recruiters" });
  }
};

//  Approve recruiter
const approveRecruiter = async (req, res) => {
  try {
    const recruiter = await User.findById(req.params.id);
    if (!recruiter || recruiter.role !== "recruiter") {
      return res.status(404).json({ message: "Recruiter not found" });
    }
    recruiter.approvalStatus = "approved";
    await recruiter.save();
    res.status(200).json({ message: "Recruiter approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to approve recruiter" });
  }
};

//  Decline recruiter
const declineRecruiter = async (req, res) => {
  try {
    const recruiter = await User.findById(req.params.id);
    if (!recruiter || recruiter.role !== "recruiter") {
      return res.status(404).json({ message: "Recruiter not found" });
    }
    recruiter.approvalStatus = "declined";
    await recruiter.save();
    res.status(200).json({ message: "Recruiter declined successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to decline recruiter" });
  }
};



module.exports = {
  getAllRecruiters,
  approveRecruiter,
  declineRecruiter,
};
