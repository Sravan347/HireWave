// createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email: "admin@hirewave.com" });
  if (existing) {
    console.log("Admin already exists");
    process.exit();
  }

  
  await User.create({
  name: "Admin",
  email: "admin@hirewave.com",
  password: "admin123", 
  role: "admin",
});


  console.log("✅ Admin created successfully!");
  process.exit();
}

createAdmin();
