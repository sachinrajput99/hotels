const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGODB_URL_LOCAL;
// const mongoURL = process.env.DB_URL;

//setup mongo db connection//
// mongoose.connect(mongoURL);

///////////////code to increase time out
mongoose
  .connect(mongoURL, {
    serverSelectionTimeoutMS: 5000, // Increase the timeout to 5 seconds
    socketTimeoutMS: 45000, // Keep the socket open for 45 seconds
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

///////////////////////////////

//get default connection
//mongoose maintain a default connection object  representing the mongodb connection

const db = mongoose.connection;

//define event listener for database connection

db.on("connected", () => console.log("connected"));

db.on("error", () => console.log("mongo connection error"));

db.on("disconnected", () => console.log("mongo disconnected"));

module.exports = db;
