require("dotenv").config(); // Load .env first

const mongoose = require("mongoose");
const User = require("../models/User");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const recruiters = await User.find({ role: "recruiter" });

  for (const recruiter of recruiters) {
    if (!recruiter.approvalStatus) {
      recruiter.approvalStatus = recruiter.isApproved ? "approved" : "pending";
      await recruiter.save();
      console.log(`Updated: ${recruiter.email}`);
    }
  }

  console.log("✅ Migration completed.");
  mongoose.disconnect();
});
