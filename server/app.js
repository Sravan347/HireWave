const express = require("express");
const connectedDB = require("./DB/connect");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

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
