const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const app = express();
const connectedDB = require("./DB/connection");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/application",applicationRoutes)

// app.use((err, req, res, next) => {
//   console.error(" Unhandled Error:", JSON.stringify(err, null, 2));
//   res.status(500).json({
//     message: "Unhandled Server Error",
//     error: err.message,
//   });
// });


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
