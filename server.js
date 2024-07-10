const express = require("express"); // import
const app = express();
const db = require("./db"); //connecting to db
require("dotenv").config()

const bodyParser = require("body-parser"); //parses the information coming from http into req's body
app.use(bodyParser.json()); //req.body

const Person = require("./models/Person"); //importing model to use it
const MenuItem = require("./models/MenuItems");
// const MenuItem=require("./models/MenuItem");

app.get("/", function (req, res) {
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
app.use("/", menuItemRouters);

const PORT = process.env.PORT||3000;
app.listen(PORT, () => {
  console.log("server is running");
}); //started server on 3000:port
