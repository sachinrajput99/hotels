const express = require("express"); // import
const Person = require("../models/Person");
const { findByIdAndDelete } = require("../models/MenuItems");
const router = express.Router(); //router is like traffic cop

router.post("/", async (req, res) => {
  try {
    const data = req.body; //assuming the data is in req's body

    const newPerson = new Person(data); //creating new person based on Person model
    const response = await newPerson.save(); //saving new person to data base

    console.log("data saved");
    res.status(200).json(response); //sending response to user
  } catch (error) {
    console.log(err);
    req.status(500).json({ error: "Internal Server Error" }); //sending error message in case of error
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data); //sending response with status code
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" }); //sending error in case of error
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //extract the work type from url params

    //sending response based on url params
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType }); //finding based on sone data
      res.status(200).json(response);
    } else {
      res.status(404).json("Invalid work type");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract the id from url params
    const updatePersonData = req.body; //update data from person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      {
        new: true, //run the updated document
        runValidators: true, //run mongoose validation
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "Person Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
