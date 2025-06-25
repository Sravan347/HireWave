const express = require("express");
const connectedDB = require("./DB/connect");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const companyRoute = require("./routes/companyRoute");
const jobRoute = require("./routes/jobRoute");
const applicationRoute = require("./routes/applicationRoute");


const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

app.use("/api/auth", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);


const server = async () => {
  try {
    await connectedDB(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(`Error connecting to the database: ${error.message}`);
  }
};

server();

