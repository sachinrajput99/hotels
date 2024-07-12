const express = require("express"); // import
const Person = require("../models/Person");
const { findByIdAndDelete } = require("../models/MenuItems");
const router = express.Router(); //router is like traffic cop
const { jwtAuthMiddleware, generate, generateToken } = require("../jwt");

//POST route to add a person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; //assuming the data is in req's body

    const newPerson = new Person(data); //creating new person based on Person model
    const response = await newPerson.save(); //saving new person to data base

    console.log("data saved");

    const payload = { id: response.id, username: response.username };
    // generating Token

    const token = generateToken(payload);
    console.log("Token is:", payload);

    res.status(200).json({ response: response, token: token }); //sending response to user
  } catch (error) {
    console.log(err);
    req.status(500).json({ error: "Internal Server Error" }); //sending error message in case of error
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    // Extract username and password from request  body
    const { username, password } = req.body;

    // Find the user by username
    const user = await Person.findOne({ username: username });

    // /If user does not exist or password doesnt match
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // generate Token
    const payload = {
      id: user.id,
      username: user.username,
    };
    // creating token from payload
    const token = generateToken(payload);

    // return json as response
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// profile route

router.get("/profile",jwtAuthMiddleware,async(req,res)=>{
  try{
    const userData=req.user;
    console.log("User Data:",userData);

    const userId=userData.id;
    const user=await Person.findById(userId);

    res.status(200).json({user});
  }catch(err){
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }

})



router.get("/", jwtAuthMiddleware,async (req, res) => {
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
