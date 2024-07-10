const mongoose=require("mongoose");

const mongoURL="mongodb://localhost:27017/sachindb"

//setup mongo db connection
mongoose.connect(mongoURL)

//get default connection
//mongoose maintain a default connection object  representing the mongodb connection

const db=mongoose.connection;

//define event listener for database connection

db.on("connected",()=>console.log("connected"));

db.on("error",()=>console.log("mongo connection error"));

db.on("disconnected",()=>console.log("mongo disconnected"));

module.exports=db;