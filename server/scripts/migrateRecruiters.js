const mongoose = require("mongoose");
const User = require("../models/User");

const MONGO_URI = "mongodb+srv://sravan:hireWave@cluster0.jrwbojm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 

mongoose.connect(MONGO_URI).then(async () => {
  const recruiters = await User.find({ role: "recruiter" });

  for (const recruiter of recruiters) {
    if (!recruiter.approvalStatus) {
      recruiter.approvalStatus = recruiter.isApproved ? "approved" : "pending";
      await recruiter.save();
      console.log(`Updated: ${recruiter.email}`);
    }
  }

  console.log("Migration completed.");
  mongoose.disconnect();
});
