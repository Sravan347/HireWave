const express = require("express");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const app = express();
const connectedDB = require("./DB/connection");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/application",applicationRoutes)

const server = async () => {
  try {
    await connectedDB(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(`the server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(`Error connecting to the database: ${error.message}`);
  }
};

server();
