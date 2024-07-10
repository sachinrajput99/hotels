const express = require("express");
const MenuItem = require("../models/MenuItems");
const router = express.Router();

//POST method to add a new menu
router.post("/menu", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server  error" });
  }
});
router.get("/menu", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server  error" });
  }
});

router.get("/menu/:taste", async (req, res) => {
  try {
    const taste=req.params.taste;//extract the work type from url params

    if (taste == "sour" || taste == "sweet" || taste == "spicy") {

    //   const response = await MenuItem.find({taste: taste});
    const response=await MenuItem.find({taste:taste});//finding based on sone data

      console.log("data fetched");
      res.status(200).json(response);
    }else{
        res.status(404).json("Invalid work type")
      }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server  error" });
  }
});
module.exports = router;

