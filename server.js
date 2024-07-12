const express = require("express"); // import
const app = express();
const db = require("./db"); //connecting to db
require("dotenv").config();
const passport=require("./auth");

const bodyParser = require("body-parser"); //parses the information coming from http into req's body
app.use(bodyParser.json()); //req.body

const MenuItem = require("./models/MenuItems");
// const MenuItem=require("./models/MenuItem");

// Middleware Function(logging the visited routes by user)
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleDateString()}] Request Made to :${req.originalUrl}`
  );
  next();
};

app.use(logRequest);//sare routes k liye available hai


app.use(passport.initialize());//initialize the password

const localAuthMiddleware=passport.authenticate("local",{session:false});//our middle ware function for authenticating user(using local-username ,password)

app.get("/" ,function (req, res) {
  res.send("welcome to my hotel how can i help you");
});
//////express middle ware
//person's api
//import the router file
const personRoutes = require("./routes/personRoutes");
// use the router
app.use("/person", personRoutes);

// menu item api
const menuItemRouters = require("./routes/menuItemRoutes");
app.use("/",menuItemRouters);//menu route needs authentication

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is running");
}); //started server on 3000:port
